import { create } from "zustand";
import { supabase } from "@/lib/supabase";

type LessonProgressState = {
  completedLessons: Record<string, true>;
  lessonScores: Record<string, number>;
  totalExperience: number;
  progressError: string | null;
  progressStatus: "idle" | "loading" | "ready" | "error";
  loadedUserId: string | null;
  clearLessonProgress: () => void;
  loadCompletedLessons: (options?: { force?: boolean }) => Promise<{ error: string | null }>;
  markLessonCompleted: (slug: string, score: number, expEarned: number) => Promise<{ error: string | null }>;
};

let activeProgressLoad: Promise<{ error: string | null }> | null = null;
let activeProgressLoadUserId: string | null = null;

function getProgressErrorMessage(message?: string) {
  if (!message) {
    return "No pudimos sincronizar tu progreso. Inténtalo de nuevo.";
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("auth session missing") || normalized.includes("not authenticated")) {
    return "Inicia sesión para guardar tu progreso.";
  }

  if (normalized.includes("network") || normalized.includes("failed to fetch")) {
    return "No se pudo conectar con Supabase. Revisa tu conexión e inténtalo de nuevo.";
  }

  return message;
}

function normalizeScore(score: unknown) {
  if (typeof score !== "number" || !Number.isFinite(score)) {
    return null;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export const useLessonProgressStore = create<LessonProgressState>((set, get) => ({
  completedLessons: {},
  lessonScores: {},
  totalExperience: 0,
  progressError: null,
  progressStatus: "idle",
  loadedUserId: null,
  clearLessonProgress: () =>
    set({
      completedLessons: {},
      lessonScores: {},
      totalExperience: 0,
      progressError: null,
      progressStatus: "idle",
      loadedUserId: null,
    }),
  loadCompletedLessons: async ({ force = false } = {}) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      set({
          completedLessons: {},
          lessonScores: {},
          totalExperience: 0,
        progressError: null,
        progressStatus: "idle",
        loadedUserId: null,
      });
      return { error: userError ? getProgressErrorMessage(userError.message) : null };
    }

    const currentState = get();

    if (!force && currentState.loadedUserId === user.id && currentState.progressStatus === "ready") {
      return { error: null };
    }

    if (activeProgressLoad && activeProgressLoadUserId === user.id) {
      return activeProgressLoad;
    }

    activeProgressLoadUserId = user.id;
    activeProgressLoad = (async () => {
      try {
        set((state) => {
          if (!force && state.loadedUserId === user.id && state.progressStatus === "ready") {
            return state;
          }

          return {
            progressStatus: "loading",
            progressError: null,
          };
        });

        const latestState = get();

        if (
          !force &&
          latestState.loadedUserId === user.id &&
          latestState.progressStatus === "ready"
        ) {
          return { error: null };
        }

        const [lessonProgressResult, userProgressResult] = await Promise.all([
          supabase
            .from("lesson_progress")
            .select("lesson_id, score")
            .eq("user_id", user.id)
            .eq("completed", true),
          supabase.from("user_progress").select("total_exp").eq("user_id", user.id).maybeSingle(),
        ]);

        if (lessonProgressResult.error || userProgressResult.error) {
          const mappedError = getProgressErrorMessage(
            lessonProgressResult.error?.message ?? userProgressResult.error?.message,
          );
          set({
            progressError: mappedError,
            progressStatus: "error",
            loadedUserId: user.id,
          });
          return { error: mappedError };
        }

        const completedLessons = (lessonProgressResult.data ?? []).reduce<Record<string, true>>((lessons, item) => {
          if (typeof item.lesson_id === "string" && item.lesson_id.trim()) {
            lessons[item.lesson_id] = true;
          }

          return lessons;
        }, {});
        const lessonScores = (lessonProgressResult.data ?? []).reduce<Record<string, number>>((scores, item) => {
          if (typeof item.lesson_id !== "string" || !item.lesson_id.trim()) {
            return scores;
          }

          const score = normalizeScore(item.score);
          if (score !== null) {
            scores[item.lesson_id] = score;
          }

          return scores;
        }, {});

        const {
          data: { user: latestUser },
        } = await supabase.auth.getUser();

        if (latestUser?.id !== user.id) {
          return { error: null };
        }

        set({
          completedLessons,
          lessonScores,
          totalExperience: Math.max(0, userProgressResult.data?.total_exp ?? 0),
          progressError: null,
          progressStatus: "ready",
          loadedUserId: user.id,
        });

        return { error: null };
      } catch {
        const error = getProgressErrorMessage();
        set({
          progressError: error,
          progressStatus: "error",
        });
        return { error };
      } finally {
        activeProgressLoad = null;
        activeProgressLoadUserId = null;
      }
    })();

    return activeProgressLoad;
  },
  markLessonCompleted: async (slug, score, expEarned) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return { error: getProgressErrorMessage(userError?.message) };
      }

      const finalScore = normalizeScore(score);
      if (finalScore === null) {
        return { error: "No pudimos calcular el puntaje final de la lección." };
      }

      if (!Number.isInteger(expEarned) || expEarned < 0) {
        return { error: "No pudimos calcular la EXP obtenida en la lección." };
      }

      const { data: completionResult, error: saveError } = await supabase.rpc("complete_lesson_with_exp", {
        p_lesson_id: slug,
        p_score: finalScore,
        p_exp_earned: expEarned,
      });

      if (saveError) {
        return { error: getProgressErrorMessage(saveError.message) };
      }

      const completion = completionResult?.[0];
      const normalizedBestScore = normalizeScore(completion?.best_score) ?? finalScore;
      const totalExperience = Math.max(0, completion?.total_exp ?? 0);

      set((state) => ({
        completedLessons: {
          ...state.completedLessons,
          [slug]: true,
        },
        lessonScores: {
          ...state.lessonScores,
          [slug]: normalizedBestScore,
        },
        totalExperience,
        progressError: null,
        progressStatus: "ready",
        loadedUserId: user.id,
      }));

      return { error: null };
    } catch {
      return { error: getProgressErrorMessage() };
    }
  },
}));
