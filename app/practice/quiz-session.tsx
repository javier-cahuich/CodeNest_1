import * as React from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CodeBlock } from "@/components/codenest/code-block";
import { QuizAccess } from "@/components/codenest/quiz-access";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { getQuizTopicSession } from "@/data/quiz-topics";
import LucideIcon from "@/lib/icons/LucideIcon";
import { QuizAuthError } from "@/lib/quiz-progress";
import { quizLoginHref, quizStartHref, type QuizQuestionStatus } from "@/lib/quizzes";
import { useSaveQuizAnswer } from "@/lib/use-quiz-progress";
import { useAuthStore } from "@/stores/auth-store";
import {
  isCurrentQuizRound,
  useQuizSessionStore,
  type QuizRound,
} from "@/stores/quiz-session-store";

const optionLabels = ["A", "B", "C", "D"] as const;

export default function QuizSessionScreen() {
  const params = useLocalSearchParams<{ topic?: string; round?: string }>();
  const topicSlug = params.topic ?? "";

  return (
    <QuizAccess topicSlug={topicSlug}>
      {(userId) => (
        <QuizSessionGate userId={userId} topicSlug={topicSlug} roundId={params.round} />
      )}
    </QuizAccess>
  );
}

function QuizSessionGate({
  userId,
  topicSlug,
  roundId,
}: {
  userId: string;
  topicSlug: string;
  roundId?: string;
}) {
  const round = useQuizSessionStore((state) => state.round);
  if (
    !round ||
    round.id !== roundId ||
    round.userId !== userId ||
    round.topicSlug !== topicSlug ||
    !isCurrentQuizRound(round)
  ) {
    return <Redirect href={quizStartHref(topicSlug)} />;
  }
  return <QuizRoundScreen key={round.id} round={round} />;
}

function QuizRoundScreen({ round }: { round: QuizRound }) {
  const quiz = getQuizTopicSession(round.topicSlug)!;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [pendingSelection, setPendingSelection] = React.useState<number | null>(null);
  const save = useSaveQuizAnswer(round.userId, round.topicSlug);
  const busy = React.useRef(false);
  const mounted = React.useRef(true);
  const questionId = round.questionIds[currentIndex];
  const currentQuestion = quiz.questions.find((question) => question.id === questionId);
  const savedAnswer = questionId ? round.answers[questionId] : undefined;
  const selectedOptionIndex = savedAnswer?.selectedOptionIndex ?? pendingSelection;
  const totalQuestions = round.questionIds.length;
  const answeredCount = Object.keys(round.answers).length;
  const progressValue = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    setPendingSelection(null);
    save.reset();
  }, [questionId]);

  const saveSelection = async (optionIndex: number) => {
    const activeRound = useQuizSessionStore.getState().round;
    if (
      busy.current ||
      !currentQuestion ||
      savedAnswer ||
      activeRound?.id !== round.id ||
      activeRound.questionIds[Object.keys(activeRound.answers).length] !== currentQuestion.id
    ) {
      return;
    }

    const status: QuizQuestionStatus =
      optionIndex === currentQuestion.correctOptionIndex ? "correct" : "incorrect";
    busy.current = true;
    setPendingSelection(optionIndex);
    try {
      await save.mutateAsync({ questionId: currentQuestion.id, status });
      if (!mounted.current || useAuthStore.getState().user?.id !== round.userId) return;
      useQuizSessionStore.getState().recordAnswer(round.id, currentQuestion.id, {
        selectedOptionIndex: optionIndex,
        status,
      });
      setPendingSelection(null);
    } catch {
      // Keep the selected option on screen so the user can retry the same classification.
    } finally {
      busy.current = false;
    }
  };

  const handlePrevious = () => {
    if (save.isPending) return;
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const handleNext = () => {
    if (!savedAnswer || save.isPending) return;
    if (currentIndex >= totalQuestions - 1) {
      router.replace({
        pathname: "/practice/quiz-results",
        params: { topic: round.topicSlug, round: round.id },
      });
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  if (save.error instanceof QuizAuthError) {
    return <Redirect href={quizLoginHref(round.topicSlug, true)} />;
  }
  if (!currentQuestion) return <Redirect href={quizStartHref(round.topicSlug)} />;

  const hasAnsweredCurrentQuestion = Boolean(savedAnswer);
  const isCorrectSelection = savedAnswer?.status === "correct";

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
      <View className="flex-1 px-5 pb-8 pt-4">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className="text-caption uppercase tracking-[0.22em] text-muted-foreground">
              {quiz.topicTitle}
            </Text>
            <Text className="mt-2 text-h3 text-foreground">
              {round.mode === "incorrect" ? "Repaso · " : ""}Pregunta {currentIndex + 1} de {totalQuestions}
            </Text>
            <Text className="mt-2 text-body text-muted-foreground">
              {answeredCount} de {totalQuestions} respondidas
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Salir del cuestionario"
            onPress={() => {
              mounted.current = false;
              router.replace("/practice/quiz-topics");
            }}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card active:opacity-80"
          >
            <LucideIcon name="X" size={20} className="text-foreground" />
          </Pressable>
        </View>

        <Progress value={progressValue} className="mt-5 h-3 rounded-full" indicatorClassName="bg-primary" />

        <ScrollView className="mt-5 flex-1" contentContainerClassName="gap-4 pb-6" showsVerticalScrollIndicator={false}>
          <Animated.View
            key={currentQuestion.id}
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(120)}
            className="rounded-[32px] border border-border bg-card px-5 py-6 shadow-sm shadow-foreground/10"
          >
            <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">Sesión de cuestionario</Text>
            <Text className="mt-4 text-h2 leading-9 text-card-foreground">{currentQuestion.prompt}</Text>

            {currentQuestion.code ? (
              <View className="mt-5">
                <CodeBlock label={currentQuestion.codeLabel ?? "Ejemplo"} code={currentQuestion.code} />
              </View>
            ) : null}

            <View className="mt-6 gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOptionIndex === optionIndex;
                const isCorrectOption = currentQuestion.correctOptionIndex === optionIndex;
                let optionClassName = "rounded-[24px] border border-border bg-background px-4 py-4";
                let labelClassName = "h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary";
                let labelTextClassName = "text-button text-secondary-foreground";
                let titleClassName = "text-body leading-6 text-foreground";
                let iconName: React.ComponentProps<typeof LucideIcon>["name"] = "Circle";
                let iconClassName = "text-muted-foreground";

                if (hasAnsweredCurrentQuestion) {
                  if (isSelected && isCorrectSelection) {
                    optionClassName = "rounded-[24px] border border-success bg-success/15 px-4 py-4";
                    labelClassName = "h-9 w-9 items-center justify-center rounded-full border border-success bg-success";
                    labelTextClassName = "text-button text-success-foreground";
                    iconName = "Check";
                    iconClassName = "text-success";
                  } else if (isSelected) {
                    optionClassName = "rounded-[24px] border border-destructive bg-destructive/15 px-4 py-4";
                    labelClassName = "h-9 w-9 items-center justify-center rounded-full border border-destructive bg-destructive";
                    labelTextClassName = "text-button text-destructive-foreground";
                    iconName = "X";
                    iconClassName = "text-destructive";
                  } else if (isCorrectOption) {
                    optionClassName = "rounded-[24px] border border-success bg-success/10 px-4 py-4";
                    labelClassName = "h-9 w-9 items-center justify-center rounded-full border border-success bg-success/15";
                    labelTextClassName = "text-button text-success";
                    iconName = "Check";
                    iconClassName = "text-success";
                  } else {
                    titleClassName = "text-body leading-6 text-muted-foreground";
                  }
                } else if (isSelected) {
                  optionClassName = "rounded-[24px] border border-primary bg-primary/10 px-4 py-4";
                } else if (!save.isPending && !save.isError) {
                  optionClassName += " active:opacity-90";
                }

                return (
                  <Pressable
                    key={`${currentQuestion.id}-${optionIndex}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Opción ${optionLabels[optionIndex]}: ${option}`}
                    disabled={hasAnsweredCurrentQuestion || save.isPending || save.isError}
                    onPress={() => void saveSelection(optionIndex)}
                    className={optionClassName}
                  >
                    <View className="flex-row items-start gap-4">
                      <View className={labelClassName}><Text className={labelTextClassName}>{optionLabels[optionIndex]}</Text></View>
                      <View className="flex-1"><Text className={titleClassName}>{option}</Text></View>
                      <LucideIcon name={iconName} size={18} className={`mt-1 ${iconClassName}`} />
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {save.isError && pendingSelection !== null ? (
              <View className="mt-6 gap-3 rounded-[24px] border border-destructive/20 bg-destructive/10 p-4">
                <Text accessibilityRole="alert" className="text-body leading-6 text-destructive">
                  No pudimos guardar tu respuesta. Revisa tu conexión y vuelve a intentarlo.
                </Text>
                <Button variant="outline" onPress={() => void saveSelection(pendingSelection)}>
                  <Text>Reintentar guardado</Text>
                </Button>
              </View>
            ) : null}

            {hasAnsweredCurrentQuestion ? (
              <View className={`mt-6 rounded-[24px] border px-4 py-4 ${isCorrectSelection ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>
                <Text className={`text-button ${isCorrectSelection ? "text-success" : "text-destructive"}`}>
                  {isCorrectSelection ? "Respuesta correcta" : "Respuesta incorrecta"}
                </Text>
                <Text className="mt-2 text-body leading-6 text-muted-foreground">
                  {isCorrectSelection
                    ? "Buen trabajo. Esta pregunta dejará de aparecer en tus repasos de errores."
                    : "La opción correcta quedó resaltada y esta pregunta permanecerá para el siguiente repaso."}
                </Text>
              </View>
            ) : null}
          </Animated.View>
        </ScrollView>

        <Text accessibilityLiveRegion="polite" className="mb-3 text-caption text-center text-muted-foreground">
          {save.isPending ? "Guardando respuesta…" : "Cada respuesta guardada se conserva al salir."}
        </Text>
        <View className="flex-row gap-3">
          <Button variant="outline" className="h-12 flex-1 rounded-2xl" disabled={currentIndex === 0 || save.isPending} onPress={handlePrevious}>
            <Text className="text-button text-foreground">Anterior</Text>
          </Button>
          <Button className="h-12 flex-1 rounded-2xl" disabled={!hasAnsweredCurrentQuestion || save.isPending} onPress={handleNext}>
            <Text className="text-button text-primary-foreground">{currentIndex === totalQuestions - 1 ? "Finalizar" : "Siguiente"}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
