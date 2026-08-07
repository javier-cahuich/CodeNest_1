import * as React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CodeBlock } from "@/components/codenest/code-block";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { getQuizTopicSession } from "@/data/quiz-topics";
import LucideIcon from "@/lib/icons/LucideIcon";

const optionLabels = ["A", "B", "C", "D"] as const;

export default function QuizSessionScreen() {
  const params = useLocalSearchParams<{ topic?: string }>();
  const topicSlug = params.topic ?? "";
  const quizSession = getQuizTopicSession(topicSlug);
  const totalQuestions = quizSession?.questions.length ?? 0;

  const initialAnswers = React.useMemo(
    () => quizSession?.questions.map(() => null) ?? [],
    [quizSession?.topicSlug],
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] =
    React.useState<Array<number | null>>(initialAnswers);

  React.useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers(initialAnswers);
  }, [initialAnswers]);

  const currentQuestion = quizSession?.questions[currentIndex];
  const selectedOptionIndex = selectedAnswers[currentIndex];
  const answeredCount = selectedAnswers.filter((answer) => answer !== null).length;
  const progressValue = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const handleSelectOption = React.useCallback(
    (optionIndex: number) => {
      if (!quizSession || selectedOptionIndex !== null) {
        return;
      }

      setSelectedAnswers((previousAnswers) =>
        previousAnswers.map((answer, index) => (index === currentIndex ? optionIndex : answer)),
      );
    },
    [currentIndex, quizSession, selectedOptionIndex],
  );

  const handlePrevious = React.useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const handleNext = React.useCallback(() => {
    if (!quizSession || selectedOptionIndex === null) {
      return;
    }

    if (currentIndex >= quizSession.questions.length - 1) {
      const correctAnswers = selectedAnswers.filter(
        (answer, index) => answer === quizSession.questions[index]?.correctOptionIndex,
      ).length;
      const incorrectAnswers = selectedAnswers.filter(
        (answer, index) =>
          answer !== null && answer !== quizSession.questions[index]?.correctOptionIndex,
      ).length;
      const omittedAnswers = quizSession.questions.length - correctAnswers - incorrectAnswers;

      router.replace({
        pathname: "/practice/quiz-results",
        params: {
          topic: quizSession.topicSlug,
          correct: String(correctAnswers),
          incorrect: String(incorrectAnswers),
          omitted: String(omittedAnswers),
        },
      });
      return;
    }

    setCurrentIndex((index) => index + 1);
  }, [currentIndex, quizSession, selectedAnswers, selectedOptionIndex]);

  if (!quizSession || !currentQuestion) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-5 pb-8">
          <View className="rounded-[28px] border border-border bg-card px-5 py-6">
            <Text className="text-h2 text-card-foreground">Tema no disponible</Text>
            <Text className="mt-3 text-body leading-6 text-muted-foreground">
              No encontramos preguntas para este tema dentro de la demo actual.
            </Text>
            <Button
              className="mt-5 h-12 rounded-2xl"
              onPress={() => router.replace("/practice/quiz-topics")}
            >
              <Text className="text-button text-primary-foreground">
                Volver a Temas de Cuestionario
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const hasAnsweredCurrentQuestion = selectedOptionIndex !== null;
  const currentQuestionNumber = currentIndex + 1;
  const isLastQuestion = currentQuestionNumber === totalQuestions;
  const isCorrectSelection =
    selectedOptionIndex !== null && selectedOptionIndex === currentQuestion.correctOptionIndex;

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
      <View className="flex-1 px-5 pb-8 pt-4">
        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className="text-caption uppercase tracking-[0.22em] text-muted-foreground">
              {quizSession.topicTitle}
            </Text>
            <Text className="mt-2 text-h3 text-foreground">
              Pregunta {currentQuestionNumber} de {totalQuestions}
            </Text>
            <Text className="mt-2 text-body text-muted-foreground">
              {answeredCount} de {totalQuestions} respondidas
            </Text>
          </View>
          <Pressable
            onPress={() => router.replace("/practice/quiz-topics")}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card active:opacity-80"
          >
            <LucideIcon name="X" size={20} className="text-foreground" />
          </Pressable>
        </View>

        <Progress
          value={progressValue}
          className="mt-5 h-3 rounded-full"
          indicatorClassName="bg-primary"
        />

        <ScrollView
          className="mt-5 flex-1"
          contentContainerClassName="gap-4 pb-6"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            key={currentQuestion.id}
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(120)}
            className="rounded-[32px] border border-border bg-card px-5 py-6 shadow-sm shadow-foreground/10"
          >
            <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
              Sesión de Cuestionario
            </Text>
            <Text className="mt-4 text-h2 leading-9 text-card-foreground">
              {currentQuestion.prompt}
            </Text>

            {currentQuestion.code ? (
              <View className="mt-5">
                <CodeBlock
                  label={currentQuestion.codeLabel ?? "Ejemplo"}
                  code={currentQuestion.code}
                />
              </View>
            ) : null}

            <View className="mt-6 gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOptionIndex === optionIndex;
                const isCorrectOption = currentQuestion.correctOptionIndex === optionIndex;

                let optionClassName = "rounded-[24px] border border-border bg-background px-4 py-4";
                let labelClassName =
                  "h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary";
                let labelTextClassName = "text-button text-secondary-foreground";
                let titleClassName = "text-body leading-6 text-foreground";
                let iconName: React.ComponentProps<typeof LucideIcon>["name"] = "Circle";
                let iconClassName = "text-muted-foreground";

                if (!hasAnsweredCurrentQuestion) {
                  optionClassName += " active:opacity-90";
                }

                if (hasAnsweredCurrentQuestion) {
                  if (isSelected && isCorrectSelection) {
                    optionClassName =
                      "rounded-[24px] border border-success bg-success/15 px-4 py-4";
                    labelClassName =
                      "h-9 w-9 items-center justify-center rounded-full border border-success bg-success";
                    labelTextClassName = "text-button text-success-foreground";
                    iconName = "Check";
                    iconClassName = "text-success";
                  } else if (isSelected && !isCorrectSelection) {
                    optionClassName =
                      "rounded-[24px] border border-destructive bg-destructive/15 px-4 py-4";
                    labelClassName =
                      "h-9 w-9 items-center justify-center rounded-full border border-destructive bg-destructive";
                    labelTextClassName = "text-button text-destructive-foreground";
                    iconName = "X";
                    iconClassName = "text-destructive";
                  } else if (isCorrectOption) {
                    optionClassName =
                      "rounded-[24px] border border-success bg-success/10 px-4 py-4";
                    labelClassName =
                      "h-9 w-9 items-center justify-center rounded-full border border-success bg-success/15";
                    labelTextClassName = "text-button text-success";
                    titleClassName = "text-body leading-6 text-foreground";
                    iconName = "Check";
                    iconClassName = "text-success";
                  } else {
                    titleClassName = "text-body leading-6 text-muted-foreground";
                  }
                }

                return (
                  <Pressable
                    key={`${currentQuestion.id}-${optionIndex}`}
                    disabled={hasAnsweredCurrentQuestion}
                    onPress={() => handleSelectOption(optionIndex)}
                    className={optionClassName}
                  >
                    <View className="flex-row items-start gap-4">
                      <View className={labelClassName}>
                        <Text className={labelTextClassName}>{optionLabels[optionIndex]}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className={titleClassName}>{option}</Text>
                      </View>
                      <LucideIcon name={iconName} size={18} className={`mt-1 ${iconClassName}`} />
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {hasAnsweredCurrentQuestion ? (
              <View
                className={`mt-6 rounded-[24px] border px-4 py-4 ${
                  isCorrectSelection
                    ? "border-success bg-success/10"
                    : "border-destructive bg-destructive/10"
                }`}
              >
                <Text
                  className={`text-button ${
                    isCorrectSelection ? "text-success" : "text-destructive"
                  }`}
                >
                  {isCorrectSelection ? "Respuesta correcta" : "Respuesta incorrecta"}
                </Text>
                <Text className="mt-2 text-body leading-6 text-muted-foreground">
                  {isCorrectSelection
                    ? "Buen trabajo. Ya puedes avanzar a la siguiente pregunta."
                    : "La opción correcta quedó resaltada para que puedas revisar el concepto."}
                </Text>
              </View>
            ) : null}
          </Animated.View>
        </ScrollView>

        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="h-12 flex-1 rounded-2xl"
            disabled={currentIndex === 0}
            onPress={handlePrevious}
          >
            <Text className="text-button text-foreground">Anterior</Text>
          </Button>
          <Button
            className="h-12 flex-1 rounded-2xl"
            disabled={!hasAnsweredCurrentQuestion}
            onPress={handleNext}
          >
            <Text className="text-button text-primary-foreground">
              {isLastQuestion ? "Siguiente" : "Siguiente"}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
