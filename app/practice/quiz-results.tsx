import * as React from "react";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { QuizAccess } from "@/components/codenest/quiz-access";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getQuizTopicSession } from "@/data/quiz-topics";
import LucideIcon from "@/lib/icons/LucideIcon";
import { QuizAuthError } from "@/lib/quiz-progress";
import {
  getQuizRoundQuestionIds,
  quizLoginHref,
  summarizeSavedQuizProgress,
  summarizeQuizStatuses,
  type QuizMode,
  type QuizProgress,
} from "@/lib/quizzes";
import { useQuizProgress } from "@/lib/use-quiz-progress";
import {
  isCurrentQuizRound,
  useQuizSessionStore,
  type QuizRound,
} from "@/stores/quiz-session-store";

const resultCards = [
  { key: "correct", label: "Aciertos", icon: "Check", tone: "success" },
  { key: "incorrect", label: "Errores", icon: "X", tone: "destructive" },
  { key: "omitted", label: "Omisiones", icon: "Minus", tone: "secondary" },
] as const;

function getCompletedRound(
  round: QuizRound | null,
  input: { phase?: string; roundId?: string; userId: string; topicSlug: string },
) {
  if (!round || input.phase === "start") return null;
  if (round.id !== input.roundId || round.userId !== input.userId) return null;
  if (round.topicSlug !== input.topicSlug || !isCurrentQuizRound(round)) return null;
  if (Object.keys(round.answers).length !== round.questionIds.length) return null;
  return round;
}

export default function QuizResultsScreen() {
  const params = useLocalSearchParams<{ topic?: string; phase?: string; round?: string }>();
  const topicSlug = params.topic ?? "";

  return (
    <QuizAccess topicSlug={topicSlug}>
      {(userId) => (
        <QuizFeedback
          key={`${userId}:${topicSlug}:${params.phase}:${params.round}`}
          userId={userId}
          topicSlug={topicSlug}
          phase={params.phase}
          roundId={params.round}
        />
      )}
    </QuizAccess>
  );
}

function QuizFeedback({
  userId,
  topicSlug,
  phase,
  roundId,
}: {
  userId: string;
  topicSlug: string;
  phase?: string;
  roundId?: string;
}) {
  const topic = getQuizTopicSession(topicSlug)!;
  const query = useQuizProgress(userId, topicSlug);
  const round = useQuizSessionStore((state) => state.round);
  const starting = React.useRef(false);
  const completedRound = getCompletedRound(round, { phase, roundId, userId, topicSlug });
  const isStartingSession = !completedRound;
  const roundStatuses = Object.fromEntries(
    Object.entries(completedRound?.answers ?? {}).map(([questionId, answer]) => [
      questionId,
      answer.status,
    ]),
  ) as QuizProgress;
  const savedSummary = summarizeSavedQuizProgress(
    query.data ?? {},
    topic.questions.length,
  );
  const summary = completedRound ? summarizeQuizStatuses(roundStatuses) : savedSummary;
  const incorrectIds = getQuizRoundQuestionIds(topicSlug, "incorrect", query.data ?? {});
  const progressReady = query.isSuccess && !query.isFetching;

  const startRound = (mode: QuizMode) => {
    if (!progressReady || starting.current) return;
    const questionIds = getQuizRoundQuestionIds(topicSlug, mode, query.data ?? {});
    const id = useQuizSessionStore.getState().startRound({
      userId,
      topicSlug,
      mode,
      questionIds,
    });
    if (!id) return;
    starting.current = true;
    router.replace({
      pathname: "/practice/quiz-session",
      params: { topic: topicSlug, round: id },
    });
  };

  if (query.error instanceof QuizAuthError) {
    return <Redirect href={quizLoginHref(topicSlug, true)} />;
  }

  return (
    <Screen scroll contentClassName="flex-1 justify-center gap-5">
      <Stack.Screen
        options={{ title: isStartingSession ? "Preparar cuestionario" : "Resultados" }}
      />

      <View className="gap-3">
        {resultCards.map((card) => {
          const value = summary[card.key];
          const toneClassName =
            card.tone === "success"
              ? "bg-success/10 border-success"
              : card.tone === "destructive"
                ? "bg-destructive/10 border-destructive"
                : "bg-secondary border-border";
          const iconClassName =
            card.tone === "success"
              ? "text-success"
              : card.tone === "destructive"
                ? "text-destructive"
                : "text-secondary-foreground";

          return (
            <View
              key={card.key}
              className={`flex-row items-center gap-4 rounded-[28px] border px-5 py-5 ${toneClassName}`}
            >
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-card">
                <LucideIcon name={card.icon} size={22} className={iconClassName} />
              </View>
              <View className="flex-1">
                <Text className="text-h4 text-foreground">{card.label}</Text>
                <Text className="mt-1 text-body text-muted-foreground">
                  {card.key === "correct"
                    ? isStartingSession
                      ? "Respuestas correctas guardadas."
                      : "Respuestas correctas de esta ronda."
                    : card.key === "incorrect"
                      ? isStartingSession
                        ? "Respuestas incorrectas pendientes de repaso."
                        : "Respuestas incorrectas de esta ronda."
                      : isStartingSession
                        ? "Preguntas sin responder desde que comenzaste."
                        : "Preguntas sin responder de esta ronda."}
                </Text>
              </View>
              <Text className="text-h2 text-foreground">{value}</Text>
            </View>
          );
        })}
      </View>

      <View className="gap-3">
        <Button
          className="h-12 rounded-2xl"
          disabled={!progressReady}
          onPress={() => startRound("all")}
        >
          <Text className="text-button text-primary-foreground">Iniciar</Text>
        </Button>
        <Button
          variant="secondary"
          className="h-12 rounded-2xl"
          disabled={!progressReady || incorrectIds.length === 0}
          accessibilityState={{ disabled: !progressReady || incorrectIds.length === 0 }}
          onPress={() => startRound("incorrect")}
        >
          <Text className="text-button text-secondary-foreground">Repasar errores</Text>
        </Button>
        <Button
          variant="outline"
          className="h-12 rounded-2xl"
          onPress={() => router.replace("/practice/quiz-topics")}
        >
          <Text className="text-button text-foreground">Salir</Text>
        </Button>
      </View>
    </Screen>
  );
}
