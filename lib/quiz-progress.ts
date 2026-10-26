import { getQuizTopicSession } from "@/data/quiz-topics";
import type { QuizProgress, QuizQuestionStatus } from "@/lib/quizzes";
import { supabase } from "@/lib/supabase";

export class QuizAuthError extends Error {
  constructor() {
    super("Inicia sesión nuevamente para continuar. Tus respuestas guardadas se conservan.");
    this.name = "QuizAuthError";
  }
}

function quizProgressError(error: { code?: string; status?: number; message?: string }) {
  if (
    error.status === 401 ||
    error.status === 403 ||
    error.code === "PGRST301" ||
    error.code === "PGRST302" ||
    error.code === "PGRST303" ||
    error.code === "42501"
  ) {
    return new QuizAuthError();
  }
  return new Error("No pudimos sincronizar el cuestionario. Revisa tu conexión e inténtalo de nuevo.");
}

export async function loadQuizProgress(userId: string, topicSlug: string, signal: AbortSignal) {
  const { data, error, status } = await supabase
    .from("quiz_progress")
    .select("question_id, status")
    .eq("user_id", userId)
    .eq("topic_slug", topicSlug)
    .abortSignal(signal);

  if (error) throw quizProgressError({ ...error, status });

  const validIds = new Set(getQuizTopicSession(topicSlug)?.questions.map((question) => question.id));
  const progress: QuizProgress = {};
  for (const row of data ?? []) {
    if (validIds.has(row.question_id) && (row.status === "correct" || row.status === "incorrect")) {
      progress[row.question_id] = row.status;
    }
  }
  return progress;
}

export async function saveQuizAnswer(input: {
  userId: string;
  topicSlug: string;
  questionId: string;
  status: QuizQuestionStatus;
}) {
  if (!getQuizTopicSession(input.topicSlug)?.questions.some((question) => question.id === input.questionId)) {
    throw new Error("La pregunta ya no pertenece a este cuestionario.");
  }

  const { data, error: authError } = await supabase.auth.getUser();
  if (authError) {
    if (authError.name === "AuthSessionMissingError") throw new QuizAuthError();
    throw quizProgressError(authError);
  }
  if (!data.user || data.user.id !== input.userId) throw new QuizAuthError();

  const { error, status } = await supabase.from("quiz_progress").upsert(
    {
      user_id: input.userId,
      topic_slug: input.topicSlug,
      question_id: input.questionId,
      status: input.status,
    },
    { onConflict: "user_id,topic_slug,question_id" },
  );

  if (error) throw quizProgressError({ ...error, status });
}
