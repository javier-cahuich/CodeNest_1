import { router } from "expo-router";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CodeBlock } from "@/components/codenest/code-block";
import { FlowchartStepAnimation } from "@/components/codenest/flowchart-step-animation";
import { FlowchartSymbol, isFlowchartSymbolKey } from "@/components/codenest/flowchart-symbol";
import { TriangleFlowchart } from "@/components/codenest/triangle-flowchart";
import { ConditionalFlowchart } from "@/components/codenest/conditional-flowchart";
import { MultiConditionalFlowchart } from "@/components/codenest/multi-conditional-flowchart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import LucideIcon from "@/lib/icons/LucideIcon";
import type { LearningModule, LessonStep, ModuleTone } from "@/data/codenest-modules";
import { useLessonProgressStore } from "@/stores/lesson-progress-store";

type ToneClasses = {
  accentText: string;
  accentBg: string;
  accentSoftBg: string;
  accentBorder: string;
  progressBar: string;
  iconWrap: string;
  iconText: string;
};

const toneMap: Record<ModuleTone, ToneClasses> = {
  cyan: {
    accentText: "text-cyan-600 dark:text-cyan-300",
    accentBg: "bg-cyan-600 dark:bg-cyan-400",
    accentSoftBg: "bg-cyan-50 dark:bg-cyan-500/10",
    accentBorder: "border-cyan-200 dark:border-cyan-500/30",
    progressBar: "bg-cyan-500 dark:bg-cyan-400",
    iconWrap: "bg-cyan-100 dark:bg-cyan-400/15",
    iconText: "text-cyan-600 dark:text-cyan-300",
  },
  amber: {
    accentText: "text-amber-600 dark:text-amber-300",
    accentBg: "bg-amber-500 dark:bg-amber-400",
    accentSoftBg: "bg-amber-50 dark:bg-amber-500/10",
    accentBorder: "border-amber-200 dark:border-amber-500/30",
    progressBar: "bg-amber-500 dark:bg-amber-400",
    iconWrap: "bg-amber-100 dark:bg-amber-400/15",
    iconText: "text-amber-600 dark:text-amber-300",
  },
  emerald: {
    accentText: "text-emerald-600 dark:text-emerald-300",
    accentBg: "bg-emerald-600 dark:bg-emerald-400",
    accentSoftBg: "bg-emerald-50 dark:bg-emerald-500/10",
    accentBorder: "border-emerald-200 dark:border-emerald-500/30",
    progressBar: "bg-emerald-500 dark:bg-emerald-400",
    iconWrap: "bg-emerald-100 dark:bg-emerald-400/15",
    iconText: "text-emerald-600 dark:text-emerald-300",
  },
  violet: {
    accentText: "text-violet-600 dark:text-violet-300",
    accentBg: "bg-violet-600 dark:bg-violet-400",
    accentSoftBg: "bg-violet-50 dark:bg-violet-500/10",
    accentBorder: "border-violet-200 dark:border-violet-500/30",
    progressBar: "bg-violet-500 dark:bg-violet-400",
    iconWrap: "bg-violet-100 dark:bg-violet-400/15",
    iconText: "text-violet-600 dark:text-violet-300",
  },
  rose: {
    accentText: "text-rose-600 dark:text-rose-300",
    accentBg: "bg-rose-600 dark:bg-rose-400",
    accentSoftBg: "bg-rose-50 dark:bg-rose-500/10",
    accentBorder: "border-rose-200 dark:border-rose-500/30",
    progressBar: "bg-rose-500 dark:bg-rose-400",
    iconWrap: "bg-rose-100 dark:bg-rose-400/15",
    iconText: "text-rose-600 dark:text-rose-300",
  },
};

type ChoiceAnswer = { type: "choice"; selectedId: string; correct: boolean };
type MatchingAnswer = { type: "matching"; matches: Record<string, string>; correct: boolean };
type BlockPuzzleAnswer = { type: "blockPuzzle"; order: string[]; correct: boolean };
type ChoiceSetAnswer = {
  type: "choiceSet";
  selections: Record<string, string>;
  submitted: boolean;
  correct: boolean;
};
type LessonAnswer = ChoiceAnswer | MatchingAnswer | BlockPuzzleAnswer | ChoiceSetAnswer;

type QuestionReview = {
  stepIndex: number;
  eyebrow: string;
  question: string;
  selectedLabel: string;
  correctLabel: string;
  explanation: string;
  isCorrect: boolean;
};

type FeedbackSummary = {
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  scorePercent: number;
  scoreLabel: string;
  gradeLabel: string;
  reviewItems: QuestionReview[];
};

function shuffleItems<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function createMatchingColumnOrders<T extends { id: string }>(items: T[]) {
  const left = shuffleItems(items);

  if (items.length <= 1) {
    return { left, right: shuffleItems(items) };
  }

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const right = shuffleItems(items);
    const hasAlignedPair = right.some((item, index) => item.id === left[index]?.id);

    if (!hasAlignedPair) {
      return { left, right };
    }
  }

  return {
    left,
    right: left.map((_, index) => left[(index + 1) % left.length]),
  };
}

function isQuestionStep(
  step: LessonStep,
): step is Extract<
  LessonStep,
  | { kind: "quiz" }
  | { kind: "practice" }
  | { kind: "matching" }
  | { kind: "choiceSet" }
  | { kind: "blockPuzzle" }
> {
  return (
    step.kind === "quiz" ||
    step.kind === "practice" ||
    step.kind === "matching" ||
    step.kind === "choiceSet" ||
    step.kind === "blockPuzzle"
  );
}

function isChoiceAnswer(answer: LessonAnswer | undefined): answer is ChoiceAnswer {
  return answer?.type === "choice";
}

function isMatchingAnswer(answer: LessonAnswer | undefined): answer is MatchingAnswer {
  return answer?.type === "matching";
}

function isBlockPuzzleAnswer(answer: LessonAnswer | undefined): answer is BlockPuzzleAnswer {
  return answer?.type === "blockPuzzle";
}

function isChoiceSetAnswer(answer: LessonAnswer | undefined): answer is ChoiceSetAnswer {
  return answer?.type === "choiceSet";
}

function buildFeedbackSummary(
  module: LearningModule,
  answers: Record<number, LessonAnswer>,
): FeedbackSummary {
  const reviewItems = module.steps.flatMap((step, index) => {
    if (!isQuestionStep(step)) {
      return [];
    }

    const answer = answers[index];
    if (step.kind === "matching") {
      const matchingAnswer = isMatchingAnswer(answer) ? answer : undefined;
      const completedMatches = Object.keys(matchingAnswer?.matches ?? {}).length;

      return [
        {
          stepIndex: index,
          eyebrow: step.eyebrow,
          question: step.title,
          selectedLabel: `${completedMatches} de ${step.pairs.length} pares completados`,
          correctLabel: "Todos los símbolos emparejados con su función",
          explanation: step.explanation,
          isCorrect: Boolean(matchingAnswer?.correct),
        },
      ];
    }

    if (step.kind === "choiceSet") {
      const choiceSetAnswer = isChoiceSetAnswer(answer) ? answer : undefined;

      return step.questions.map((question) => {
        const selectedOption = question.options.find(
          (option) => option.id === choiceSetAnswer?.selections[question.id],
        );
        const correctOption = question.options.find((option) => option.id === question.correctId);
        const isCorrect = choiceSetAnswer?.selections[question.id] === question.correctId;

        return {
          stepIndex: index,
          eyebrow: step.eyebrow,
          question: question.question,
          selectedLabel: selectedOption?.label ?? "Sin respuesta",
          correctLabel: correctOption?.label ?? "Respuesta no disponible",
          explanation: question.explanation ?? step.explanation,
          isCorrect,
        };
      });
    }

    if (step.kind === "blockPuzzle") {
      const blockAnswer = isBlockPuzzleAnswer(answer) ? answer : undefined;
      const blockById = new Map(step.blocks.map((block) => [block.id, block.text]));
      const selectedLabel =
        blockAnswer?.order
          .map((blockId) => blockById.get(blockId))
          .filter(Boolean)
          .join(" -> ") ?? "Sin respuesta";
      const correctLabel = step.correctOrder
        .map((blockId) => blockById.get(blockId))
        .filter(Boolean)
        .join(" -> ");

      return [
        {
          stepIndex: index,
          eyebrow: step.eyebrow,
          question: step.title,
          selectedLabel,
          correctLabel,
          explanation: step.explanation,
          isCorrect: Boolean(blockAnswer?.correct),
        },
      ];
    }

    const choiceAnswer = isChoiceAnswer(answer) ? answer : undefined;
    const selectedOption = step.options.find((option) => option.id === choiceAnswer?.selectedId);
    const correctOption = step.options.find((option) => option.id === step.correctId);

    return [
      {
        stepIndex: index,
        eyebrow: step.eyebrow,
        question: step.question,
        selectedLabel: selectedOption?.label ?? "Sin respuesta",
        correctLabel: correctOption?.label ?? "Respuesta no disponible",
        explanation: step.kind === "practice" ? step.answerExplanation : step.explanation,
        isCorrect: Boolean(choiceAnswer?.correct),
      },
    ];
  });

  const totalQuestions = reviewItems.length;
  const correctAnswers = reviewItems.filter((item) => item.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const scorePercent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return {
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    scorePercent,
    scoreLabel: `${scorePercent}/100`,
    gradeLabel: `${(scorePercent / 10).toFixed(1)}/10`,
    reviewItems,
  };
}

function getExperienceForScore(score: number) {
  if (score >= 80) {
    return 50;
  }

  if (score >= 50) {
    return 30;
  }

  return 20;
}

export function LessonWizard({ module }: { module?: LearningModule }) {
  if (!module) {
    return (
      <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center gap-3 px-5">
          <Text className="text-center text-h2 text-foreground">Lección no seleccionada</Text>
          <Text className="max-w-sm text-center text-body leading-6 text-muted-foreground">
            Abre una lección desde el curso para ver el contenido completo.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return <ActiveLessonWizard module={module} />;
}

function ActiveLessonWizard({ module }: { module: LearningModule }) {
  const tone = toneMap[module.tone];
  const evaluationMode = module.evaluationMode ?? "mastery";
  const totalSteps = module.steps.length;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, LessonAnswer>>({});
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [isSavingCompletion, setIsSavingCompletion] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const markLessonCompleted = useLessonProgressStore((state) => state.markLessonCompleted);
  const scrollRef = useRef<ScrollView>(null);

  const step = module.steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;
  const isFinishStep = isLastStep || step.kind === "completion" || step.kind === "feedback";
  const isFeedbackStep = step.kind === "feedback";
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const feedbackSummary = useMemo(() => buildFeedbackSummary(module, answers), [module, answers]);

  const currentAnswer = answers[stepIndex];
  const currentChoiceAnswer = isChoiceAnswer(currentAnswer) ? currentAnswer : undefined;
  const currentMatchingAnswer = isMatchingAnswer(currentAnswer) ? currentAnswer : undefined;
  const currentBlockPuzzleAnswer = isBlockPuzzleAnswer(currentAnswer) ? currentAnswer : undefined;
  const currentChoiceSetAnswer = isChoiceSetAnswer(currentAnswer) ? currentAnswer : undefined;
  const needsAnswer = isQuestionStep(step);
  const hasAnsweredCurrentStep =
    step.kind === "matching"
      ? Object.keys(currentMatchingAnswer?.matches ?? {}).length === step.pairs.length
      : step.kind === "blockPuzzle"
        ? Boolean(currentBlockPuzzleAnswer)
        : step.kind === "choiceSet"
          ? Boolean(currentChoiceSetAnswer?.submitted)
          : Boolean(currentChoiceAnswer?.selectedId);
  const isAnswerBlocking =
    needsAnswer &&
    (evaluationMode === "graded" ? !hasAnsweredCurrentStep : !currentAnswer?.correct);

  const handleBack = useCallback(() => {
    if (stepIndex === 0) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(tabs)");
      }
      return;
    }
    setStepIndex((idx) => idx - 1);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [stepIndex]);

  const handleClose = useCallback(() => {
    setIsExitDialogOpen(false);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  }, []);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setCompletionError(null);
    setStepIndex(0);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  const handleNext = useCallback(async () => {
    if (isSavingCompletion) {
      return;
    }

    if (isFinishStep) {
      setCompletionError(null);
      setIsSavingCompletion(true);
      const { error } = await markLessonCompleted(
        module.slug,
        feedbackSummary.scorePercent,
        getExperienceForScore(feedbackSummary.scorePercent),
      );
      setIsSavingCompletion(false);

      if (error) {
        setCompletionError(error);
        return;
      }

      router.replace("/(tabs)");
      return;
    }

    setCompletionError(null);
    setStepIndex((idx) => idx + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [feedbackSummary.scorePercent, isFinishStep, isSavingCompletion, markLessonCompleted, module.slug]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (step.kind !== "quiz" && step.kind !== "practice") return;
      if (evaluationMode === "graded" && currentChoiceAnswer?.selectedId) return;
      const correct = optionId === step.correctId;
      setAnswers((prev) => ({
        ...prev,
        [stepIndex]: { type: "choice", selectedId: optionId, correct },
      }));
    },
    [currentChoiceAnswer?.selectedId, evaluationMode, step, stepIndex],
  );

  const handleSelectMatch = useCallback(
    (leftId: string, rightId: string) => {
      if (step.kind !== "matching") return;
      const previousMatches = currentMatchingAnswer?.matches ?? {};
      const nextMatches = Object.fromEntries(
        Object.entries(previousMatches).filter(([currentLeftId, currentRightId]) => {
          return currentLeftId === leftId || currentRightId !== rightId;
        }),
      );
      nextMatches[leftId] = rightId;
      const correct = step.pairs.every((pair) => nextMatches[pair.id] === pair.id);

      setAnswers((prev) => ({
        ...prev,
        [stepIndex]: { type: "matching", matches: nextMatches, correct },
      }));
    },
    [currentMatchingAnswer?.matches, step, stepIndex],
  );

  const handleSelectChoiceSetOption = useCallback(
    (questionId: string, optionId: string) => {
      if (step.kind !== "choiceSet") return;
      if (evaluationMode === "graded" && currentChoiceSetAnswer?.submitted) return;

      const previousSelections = currentChoiceSetAnswer?.selections ?? {};
      const selections = {
        ...previousSelections,
        [questionId]: optionId,
      };
      const correct = step.questions.every((question) => selections[question.id] === question.correctId);

      setAnswers((prev) => ({
        ...prev,
        [stepIndex]: { type: "choiceSet", selections, submitted: false, correct },
      }));
    },
    [currentChoiceSetAnswer?.selections, currentChoiceSetAnswer?.submitted, evaluationMode, step, stepIndex],
  );

  const handleSubmitChoiceSet = useCallback(() => {
    if (step.kind !== "choiceSet") return;
    if (evaluationMode === "graded" && currentChoiceSetAnswer?.submitted) return;

    const selections = currentChoiceSetAnswer?.selections ?? {};
    const hasAllSelections = step.questions.every((question) => Boolean(selections[question.id]));
    if (!hasAllSelections) return;

    const correct = step.questions.every((question) => selections[question.id] === question.correctId);

    setAnswers((prev) => ({
      ...prev,
      [stepIndex]: { type: "choiceSet", selections, submitted: true, correct },
    }));
  }, [currentChoiceSetAnswer?.selections, currentChoiceSetAnswer?.submitted, evaluationMode, step, stepIndex]);

  const handleSubmitBlockPuzzle = useCallback(
    (order: string[]) => {
      if (step.kind !== "blockPuzzle") return;
      if (evaluationMode === "graded" && currentBlockPuzzleAnswer) return;
      const correct =
        order.length === step.correctOrder.length &&
        order.every((blockId, index) => blockId === step.correctOrder[index]);

      setAnswers((prev) => ({
        ...prev,
        [stepIndex]: { type: "blockPuzzle", order, correct },
      }));
    },
    [currentBlockPuzzleAnswer, evaluationMode, step, stepIndex],
  );

  const nextLabel = useMemo(() => {
    if (isSavingCompletion) {
      return "Guardando...";
    }

    if (isFinishStep) {
      return "Terminar lección";
    }
    return "Siguiente";
  }, [isFinishStep, isSavingCompletion]);

  const blockingMessage = useMemo(() => {
    if (!isAnswerBlocking) return null;
    if (step.kind === "choiceSet") {
      return "Comprueba tus respuestas para continuar.";
    }
    return evaluationMode === "graded"
      ? "Selecciona una respuesta para continuar."
      : "Responde correctamente para continuar.";
  }, [evaluationMode, isAnswerBlocking, step.kind]);

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-3 px-5 pt-2 pb-3">
        <View className="flex-1">
          <View className="h-2 overflow-hidden rounded-full bg-secondary">
            <View
              className={cn("h-full rounded-full", tone.progressBar)}
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        <Pressable
          onPress={() => setIsExitDialogOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Cerrar lección"
          className="h-10 w-10 items-center justify-center rounded-full border border-border bg-card active:opacity-80"
        >
          <LucideIcon name="X" size={18} className="text-foreground" />
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName={cn(
          "px-5 pt-4 pb-8",
          isFeedbackStep && "flex-grow justify-center",
        )}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={stepIndex}
          entering={Platform.OS === "web" ? undefined : FadeInRight.duration(220)}
          exiting={Platform.OS === "web" ? undefined : FadeOutLeft.duration(160)}
        >
          <StepRenderer
            step={step}
            tone={tone}
            answer={currentAnswer}
            evaluationMode={evaluationMode}
            feedbackSummary={feedbackSummary}
            onSelectOption={handleSelectOption}
            onSelectMatch={handleSelectMatch}
            onSelectChoiceSetOption={handleSelectChoiceSetOption}
            onSubmitChoiceSet={handleSubmitChoiceSet}
            onSubmitBlockPuzzle={handleSubmitBlockPuzzle}
          />
        </Animated.View>
      </ScrollView>

      <View className="border-t border-border bg-background px-5 pt-4 pb-5">
        <View className="flex-row gap-3">
          <Button
            onPress={isFeedbackStep ? handleRestart : handleBack}
            size="lg"
            className="flex-1"
            accessibilityLabel={isFeedbackStep ? "Reiniciar lección" : "Volver al paso anterior"}
          >
            {isFeedbackStep ? (
              <Text className="text-button text-primary-foreground">Reiniciar</Text>
            ) : (
              <LucideIcon name="ChevronLeft" size={20} className="text-primary-foreground" />
            )}
          </Button>
          <Button
            onPress={handleNext}
            disabled={isAnswerBlocking || isSavingCompletion}
            size="lg"
            className="flex-[2]"
          >
            <Text className="text-button text-primary-foreground">{nextLabel}</Text>
            <LucideIcon
              name={isSavingCompletion ? "LoaderCircle" : isLastStep ? "Check" : "ArrowRight"}
              size={18}
              className="ml-2 text-primary-foreground"
            />
          </Button>
        </View>
        {completionError ? (
          <Text className="mt-2 text-center text-caption text-destructive">
            {completionError}
          </Text>
        ) : null}
        {blockingMessage ? (
          <Text className="mt-2 text-center text-caption text-muted-foreground">
            {blockingMessage}
          </Text>
        ) : null}
      </View>

      <AlertDialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <AlertDialogContent className="w-[calc(100%-2.5rem)] rounded-[24px] p-5">
          <AlertDialogDescription className="text-body leading-6 text-foreground">
            ¿Seguro que quieres salir? perderás tu progreso
          </AlertDialogDescription>
          <AlertDialogFooter className="mt-2 flex-col gap-3">
            <AlertDialogAction
              onPress={handleClose}
              className="w-full bg-destructive active:opacity-90"
            >
              <Text className="text-button text-destructive-foreground">Sí, estoy seguro</Text>
            </AlertDialogAction>
            <AlertDialogCancel className="w-full">
              <Text className="text-button text-foreground">Seguir en la lección</Text>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}

function StepRenderer({
  step,
  tone,
  answer,
  evaluationMode,
  feedbackSummary,
  onSelectOption,
  onSelectMatch,
  onSelectChoiceSetOption,
  onSubmitChoiceSet,
  onSubmitBlockPuzzle,
}: {
  step: LessonStep;
  tone: ToneClasses;
  answer?: LessonAnswer;
  evaluationMode: "mastery" | "graded";
  feedbackSummary: FeedbackSummary;
  onSelectOption: (id: string) => void;
  onSelectMatch: (leftId: string, rightId: string) => void;
  onSelectChoiceSetOption: (questionId: string, optionId: string) => void;
  onSubmitChoiceSet: () => void;
  onSubmitBlockPuzzle: (order: string[]) => void;
}) {
  switch (step.kind) {
    case "concept":
      return <ConceptStep step={step} tone={tone} />;
    case "theory":
      return <TheoryStep step={step} tone={tone} />;
    case "codeExample":
      return <CodeExampleStep step={step} tone={tone} />;
    case "imagePlaceholder":
      return <ImagePlaceholderStep step={step} tone={tone} />;
    case "practice":
      return (
        <PracticeStep
          step={step}
          tone={tone}
          selectedId={isChoiceAnswer(answer) ? answer.selectedId : undefined}
          isCorrect={isChoiceAnswer(answer) ? answer.correct : false}
          evaluationMode={evaluationMode}
          onSelect={onSelectOption}
        />
      );
    case "tip":
      return <TipStep step={step} tone={tone} />;
    case "quiz":
      return (
        <QuizStep
          step={step}
          tone={tone}
          selectedId={isChoiceAnswer(answer) ? answer.selectedId : undefined}
          isCorrect={isChoiceAnswer(answer) ? answer.correct : false}
          evaluationMode={evaluationMode}
          onSelect={onSelectOption}
        />
      );
    case "matching":
      return (
        <MatchingStep
          step={step}
          tone={tone}
          answer={isMatchingAnswer(answer) ? answer : undefined}
          evaluationMode={evaluationMode}
          onSelect={onSelectMatch}
        />
      );
    case "choiceSet":
      return (
        <ChoiceSetStep
          step={step}
          tone={tone}
          answer={isChoiceSetAnswer(answer) ? answer : undefined}
          evaluationMode={evaluationMode}
          onSelect={onSelectChoiceSetOption}
          onSubmit={onSubmitChoiceSet}
        />
      );
    case "blockPuzzle":
      return (
        <BlockPuzzleStep
          step={step}
          tone={tone}
          answer={isBlockPuzzleAnswer(answer) ? answer : undefined}
          evaluationMode={evaluationMode}
          onSubmit={onSubmitBlockPuzzle}
        />
      );
    case "blank":
      return <BlankStep step={step} tone={tone} />;
    case "recap":
      return <RecapStep step={step} tone={tone} />;
    case "completion":
      return <CompletionStep step={step} tone={tone} />;
    case "feedback":
      return <FeedbackStep tone={tone} summary={feedbackSummary} />;
  }
}

function Eyebrow({ text, tone }: { text: string; tone: ToneClasses }) {
  return (
    <Text className={cn("text-caption uppercase tracking-[0.28em]", tone.accentText)}>{text}</Text>
  );
}

function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <Text className={className}>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={idx} className={cn(className, "font-semibold text-foreground")}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Fragment key={idx}>{part}</Fragment>;
      })}
    </Text>
  );
}

function ConceptStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "concept" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h1 leading-10 text-foreground">{step.title}</Text>
      </View>

      <View className="gap-4">
        {step.paragraphs.map((paragraph) => (
          <RichText
            key={paragraph}
            text={paragraph}
            className="text-body leading-7 text-muted-foreground"
          />
        ))}
      </View>

      <CodeBlock label={step.code.label} code={step.code.content} />
    </View>
  );
}

function TheoryStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "theory" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        {step.description ? (
          <RichText text={step.description} className="text-body leading-7 text-muted-foreground" />
        ) : null}
      </View>

      {step.table ? (() => {
        const isSymbolTable = step.table.headers.some(
          (h) => h.toLowerCase() === "figura" || h.toLowerCase() === "figuras",
        );

        return (
          <View className={cn("overflow-hidden rounded-3xl border", tone.accentBorder)}>
            <View className={cn("flex-row border-b", tone.accentBorder, tone.accentSoftBg)}>
              {step.table.headers.map((header, idx) => {
                const isFiguraCol = isSymbolTable && idx === 0;
                const isDescCol = isSymbolTable && idx === 2;

                return (
                  <View
                    key={header}
                    className={cn(
                      "px-3 py-3 justify-center",
                      isFiguraCol ? "w-24 items-center" : isDescCol ? "flex-[2]" : "flex-1",
                      idx < step.table!.headers.length - 1 && "border-r",
                      idx < step.table!.headers.length - 1 && tone.accentBorder,
                    )}
                  >
                    <Text className={cn("text-caption uppercase tracking-[0.22em]", tone.accentText)}>
                      {header}
                    </Text>
                  </View>
                );
              })}
            </View>
            {step.table.rows.map((row, rowIdx) => (
              <View
                key={`${row[0]}-${rowIdx}`}
                className={cn(
                  "flex-row items-center",
                  rowIdx !== step.table!.rows.length - 1 && "border-b border-border",
                )}
              >
                {row.map((cell, idx) => {
                  const isFiguraCol = isSymbolTable && idx === 0;
                  const isDescCol = isSymbolTable && idx === 2;
                  const isSymbol = isFlowchartSymbolKey(cell);

                  return (
                    <View
                      key={`${cell}-${idx}`}
                      className={cn(
                        "px-3 py-3 justify-center",
                        isFiguraCol ? "w-24 items-center" : isDescCol ? "flex-[2]" : "flex-1",
                        idx < row.length - 1 && "border-r border-border",
                      )}
                    >
                      {isSymbol ? (
                        <FlowchartSymbol name={cell} />
                      ) : (
                        <Text
                          className={cn(
                            "text-body leading-6 text-foreground",
                            idx === 0 && "font-semibold",
                            idx === 1 && isSymbolTable && "font-mono font-medium text-foreground",
                          )}
                        >
                          {cell}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        );
      })() : null}

      {step.bullets && step.bullets.length > 0 ? (
        <View className="gap-2.5">
          {step.bullets.map((bullet) => (
            <View
              key={bullet.bold + bullet.text}
              className="flex-row items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3"
            >
              <View className={cn("mt-2 h-2 w-2 rounded-full", tone.accentBg)} />
              <Text className="flex-1 text-body leading-6 text-card-foreground">
                <Text className={cn("font-semibold", tone.accentText)}>{bullet.bold}</Text>{" "}
                {bullet.text}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {step.callouts && step.callouts.length > 0 ? (
        <View className="gap-3">
          {step.callouts.map((callout) => (
            <View
              key={callout.title}
              className="flex-row items-start gap-4 rounded-3xl border border-border bg-card px-4 py-4"
            >
              <View
                className={cn(
                  "h-11 w-11 items-center justify-center rounded-2xl border border-black/5 dark:border-white/5",
                  tone.iconWrap,
                )}
              >
                <LucideIcon name={callout.icon} size={20} className={tone.iconText} />
              </View>
              <View className="flex-1 gap-1">
                <Text className="text-h3 text-card-foreground">{callout.title}</Text>
                <Text className="text-body leading-6 text-muted-foreground">
                  {callout.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function CodeExampleStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "codeExample" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        <RichText text={step.description} className="text-body leading-7 text-muted-foreground" />
      </View>

      <CodeBlock label={step.code.label} code={step.code.content} />

      {step.notes && step.notes.length > 0 ? (
        <View
          className={cn(
            "gap-2.5 rounded-3xl border px-4 py-4",
            tone.accentBorder,
            tone.accentSoftBg,
          )}
        >
          {step.notes.map((note) => (
            <View key={note} className="flex-row items-start gap-3">
              <LucideIcon name="Sparkles" size={16} className={cn("mt-1", tone.iconText)} />
              <Text className="flex-1 text-body leading-6 text-foreground">{note}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ImagePlaceholderStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "imagePlaceholder" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        <RichText text={step.description} className="text-body leading-7 text-muted-foreground" />
      </View>

      {step.customComponent === "flowchartSimulation" ? (
        <FlowchartStepAnimation />
      ) : step.customComponent === "triangleFlowchart" ? (
        <TriangleFlowchart />
      ) : step.customComponent === "conditionalFlowchart" ? (
        <ConditionalFlowchart />
      ) : step.customComponent === "multiConditionalFlowchart" ? (
        <MultiConditionalFlowchart />
      ) : (
        <View className="overflow-hidden rounded-[28px] border border-dashed border-border bg-card">
          <View
            className={cn("min-h-64 items-center justify-center gap-4 px-5 py-8", tone.accentSoftBg)}
          >
            <View
              className={cn(
                "h-16 w-16 items-center justify-center rounded-[22px] border border-black/5 dark:border-white/5",
                tone.iconWrap,
              )}
            >
              <LucideIcon name={step.icon} size={30} className={tone.iconText} />
            </View>
            <View className="items-center gap-2">
              <Text className="text-center text-h3 text-card-foreground">
                {step.placeholderLabel}
              </Text>
              <Text className="max-w-sm text-center text-body leading-6 text-muted-foreground">
                {step.note}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function PracticeStep({
  step,
  tone,
  selectedId,
  isCorrect,
  evaluationMode,
  onSelect,
}: {
  step: Extract<LessonStep, { kind: "practice" }>;
  tone: ToneClasses;
  selectedId?: string;
  isCorrect: boolean;
  evaluationMode: "mastery" | "graded";
  onSelect: (id: string) => void;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
      </View>

      <View className={cn("rounded-3xl border px-4 py-4", tone.accentBorder, tone.accentSoftBg)}>
        <RichText text={step.explanation} className="text-body leading-7 text-foreground" />
      </View>

      {step.code ? <CodeBlock label={step.code.label} code={step.code.content} /> : null}

      <Text className="text-h3 leading-7 text-foreground">{step.question}</Text>

      <OptionList
        options={step.options}
        correctId={step.correctId}
        selectedId={selectedId}
        locked={evaluationMode === "graded" ? Boolean(selectedId) : isCorrect}
        revealCorrectAnswer={evaluationMode === "graded" && Boolean(selectedId)}
        onSelect={onSelect}
      />

      {selectedId ? (
        <AnswerFeedback
          isCorrect={isCorrect}
          evaluationMode={evaluationMode}
          message={step.answerExplanation}
        />
      ) : null}
    </View>
  );
}

function ChoiceSetStep({
  step,
  tone,
  answer,
  evaluationMode,
  onSelect,
  onSubmit,
}: {
  step: Extract<LessonStep, { kind: "choiceSet" }>;
  tone: ToneClasses;
  answer?: ChoiceSetAnswer;
  evaluationMode: "mastery" | "graded";
  onSelect: (questionId: string, optionId: string) => void;
  onSubmit: () => void;
}) {
  const selections = answer?.selections ?? {};
  const isSubmitted = Boolean(answer?.submitted);
  const isLocked = evaluationMode === "graded" && isSubmitted;
  const selectedCount = step.questions.filter((question) => selections[question.id]).length;
  const allSelected = selectedCount === step.questions.length;
  const correctCount = step.questions.filter(
    (question) => selections[question.id] === question.correctId,
  ).length;

  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        <Text className="text-body leading-6 text-muted-foreground">{step.instructions}</Text>
      </View>

      <View className="gap-3">
        {step.questions.map((question, index) => {
          const selectedId = selections[question.id];
          const questionIsCorrect = selectedId === question.correctId;

          return (
            <View
              key={question.id}
              className={cn(
                "gap-4 rounded-3xl border bg-card px-4 py-4",
                isSubmitted
                  ? questionIsCorrect
                    ? "border-emerald-300 dark:border-emerald-400/50"
                    : "border-rose-300 dark:border-rose-400/50"
                  : "border-border",
              )}
            >
              <View className="flex-row items-start gap-3">
                <View
                  className={cn(
                    "h-8 w-8 items-center justify-center rounded-2xl",
                    isSubmitted
                      ? questionIsCorrect
                        ? "bg-emerald-100 dark:bg-emerald-500/15"
                        : "bg-rose-100 dark:bg-rose-500/15"
                      : tone.iconWrap,
                  )}
                >
                  <Text
                    className={cn(
                      "text-caption font-semibold",
                      isSubmitted
                        ? questionIsCorrect
                          ? "text-emerald-700 dark:text-emerald-200"
                          : "text-rose-700 dark:text-rose-200"
                        : tone.iconText,
                    )}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-h3 leading-7 text-card-foreground">
                  {question.question}
                </Text>
              </View>

              <View className="gap-2.5">
                {question.options.map((option) => {
                  const isSelected = selectedId === option.id;
                  const isCorrectOption = option.id === question.correctId;
                  const showCorrect = isSubmitted && isCorrectOption;
                  const showWrong = isSubmitted && isSelected && !isCorrectOption;

                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => onSelect(question.id, option.id)}
                      disabled={isLocked}
                      accessibilityRole="button"
                      className={cn(
                        "flex-row items-center justify-between gap-3 rounded-2xl border px-4 py-3 active:opacity-90",
                        showCorrect
                          ? "border-emerald-400 bg-emerald-50 dark:border-emerald-400/60 dark:bg-emerald-500/10"
                          : showWrong
                            ? "border-rose-400 bg-rose-50 dark:border-rose-400/60 dark:bg-rose-500/10"
                            : isSelected
                              ? cn(tone.accentBorder, tone.accentSoftBg)
                              : "border-border bg-background",
                        isLocked && !isSelected && !showCorrect && "opacity-60",
                      )}
                    >
                      <Text
                        className={cn(
                          "flex-1 text-body leading-6",
                          showCorrect
                            ? "text-emerald-700 dark:text-emerald-200"
                            : showWrong
                              ? "text-rose-700 dark:text-rose-200"
                              : "text-foreground",
                        )}
                      >
                        {option.label}
                      </Text>
                      {showCorrect ? (
                        <LucideIcon
                          name="Check"
                          size={18}
                          className="text-emerald-600 dark:text-emerald-300"
                        />
                      ) : showWrong ? (
                        <LucideIcon
                          name="X"
                          size={18}
                          className="text-rose-600 dark:text-rose-300"
                        />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>

      <Button onPress={onSubmit} disabled={!allSelected || isLocked} size="lg" className="w-full">
        <Text className="text-button text-primary-foreground">comprobar respuestas</Text>
        <LucideIcon name="CheckCheck" size={18} className="ml-2 text-primary-foreground" />
      </Button>

      {isSubmitted ? (
        <AnswerFeedback
          isCorrect={correctCount === step.questions.length}
          evaluationMode={evaluationMode}
          message={`${correctCount} de ${step.questions.length} respuestas correctas. ${step.explanation}`}
        />
      ) : !allSelected ? (
        <Text className="text-center text-caption text-muted-foreground">
          Responde las {step.questions.length} tarjetas para comprobar.
        </Text>
      ) : null}
    </View>
  );
}

function TipStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "tip" }>;
  tone: ToneClasses;
}) {
  const isWarning = step.variant === "warning";
  return (
    <View className="gap-5">
      <Eyebrow text={step.eyebrow} tone={tone} />
      <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>

      <View
        className={cn(
          "flex-row items-start gap-4 rounded-3xl border px-5 py-5",
          isWarning
            ? "border-rose-200 bg-rose-50 dark:border-rose-400/40 dark:bg-rose-500/10"
            : cn(tone.accentBorder, tone.accentSoftBg),
        )}
      >
        <View
          className={cn(
            "h-12 w-12 items-center justify-center rounded-2xl border border-black/5 dark:border-white/5",
            isWarning ? "bg-rose-100 dark:bg-rose-500/15" : tone.iconWrap,
          )}
        >
          <LucideIcon
            name={step.icon}
            size={22}
            className={cn(isWarning ? "text-rose-600 dark:text-rose-300" : tone.iconText)}
          />
        </View>
        <Text className="flex-1 text-body leading-7 text-foreground">{step.body}</Text>
      </View>
    </View>
  );
}

function MatchingStep({
  step,
  tone,
  answer,
  evaluationMode,
  onSelect,
}: {
  step: Extract<LessonStep, { kind: "matching" }>;
  tone: ToneClasses;
  answer?: MatchingAnswer;
  evaluationMode: "mastery" | "graded";
  onSelect: (leftId: string, rightId: string) => void;
}) {
  const [selectedCard, setSelectedCard] = useState<{
    side: "left" | "right";
    id: string;
  } | null>(null);
  const [incorrectPair, setIncorrectPair] = useState<{
    leftId: string;
    rightId: string;
    fading: boolean;
  } | null>(null);
  const feedbackTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const columnOrdersRef = useRef<ReturnType<
    typeof createMatchingColumnOrders<(typeof step.pairs)[number]>
  > | null>(null);
  const matches = answer?.matches ?? {};
  const isComplete = Object.keys(matches).length === step.pairs.length;
  const locked = evaluationMode === "graded" && isComplete;

  if (!columnOrdersRef.current) {
    columnOrdersRef.current = createMatchingColumnOrders(step.pairs);
  }

  const columnOrders = columnOrdersRef.current;

  useEffect(() => {
    return () => {
      feedbackTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const clearFeedbackTimers = () => {
    feedbackTimersRef.current.forEach((timer) => clearTimeout(timer));
    feedbackTimersRef.current = [];
  };

  const completePair = (leftId: string, rightId: string) => {
    clearFeedbackTimers();
    setSelectedCard(null);

    if (leftId === rightId) {
      setIncorrectPair(null);
      onSelect(leftId, rightId);
      return;
    }

    setIncorrectPair({ leftId, rightId, fading: false });
    feedbackTimersRef.current = [
      setTimeout(() => {
        setIncorrectPair((current) =>
          current?.leftId === leftId && current.rightId === rightId
            ? { ...current, fading: true }
            : current,
        );
      }, 550),
      setTimeout(() => {
        setIncorrectPair((current) =>
          current?.leftId === leftId && current.rightId === rightId ? null : current,
        );
      }, 800),
    ];
  };

  const handleLeftPress = (leftId: string) => {
    if (locked || incorrectPair || matches[leftId] === leftId) return;
    if (selectedCard?.side === "right") {
      completePair(leftId, selectedCard.id);
      return;
    }
    clearFeedbackTimers();
    setIncorrectPair(null);
    setSelectedCard((current) =>
      current?.side === "left" && current.id === leftId ? null : { side: "left", id: leftId },
    );
  };

  const handleRightPress = (rightId: string) => {
    const isRightLocked = step.pairs.some((pair) => matches[pair.id] === rightId);
    if (locked || incorrectPair || isRightLocked) return;
    if (selectedCard?.side === "left") {
      completePair(selectedCard.id, rightId);
      return;
    }
    clearFeedbackTimers();
    setIncorrectPair(null);
    setSelectedCard((current) =>
      current?.side === "right" && current.id === rightId ? null : { side: "right", id: rightId },
    );
  };

  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        <Text className="text-body leading-7 text-muted-foreground">{step.instructions}</Text>
      </View>

      <View
        className={cn(
          "gap-4 rounded-[28px] border px-4 py-4",
          tone.accentBorder,
          tone.accentSoftBg,
        )}
      >
        <View className="flex-row items-start gap-3">
          <View className="flex-1 gap-3">
            <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
              Left Column
            </Text>
            <View className="gap-2.5">
              {columnOrders.left.map((pair) => {
                const matchedRightId = matches[pair.id];
                const isSelected = selectedCard?.side === "left" && selectedCard.id === pair.id;
                const showCorrect = matchedRightId === pair.id;
                const showWrong = incorrectPair?.leftId === pair.id;
                const status = showCorrect
                  ? "correct"
                  : showWrong
                    ? incorrectPair?.fading
                      ? "wrongFading"
                      : "wrong"
                    : isSelected
                      ? "selected"
                      : "idle";

                return (
                  <MatchingCard
                    key={pair.id}
                    onPress={() => handleLeftPress(pair.id)}
                    disabled={locked || showCorrect}
                    status={status}
                    tone={tone}
                  >
                    <View className="flex-row items-center justify-between gap-2">
                      <Text
                        className={cn(
                          "flex-1 text-center text-body font-semibold leading-6 text-card-foreground",
                          pair.left === "←" && "text-h2 leading-8",
                        )}
                      >
                        {pair.left}
                      </Text>
                      {showCorrect ? (
                        <LucideIcon
                          name="Check"
                          size={17}
                          className="text-emerald-600 dark:text-emerald-300"
                        />
                      ) : showWrong ? (
                        <LucideIcon
                          name="X"
                          size={17}
                          className="text-rose-600 dark:text-rose-300"
                        />
                      ) : null}
                    </View>
                  </MatchingCard>
                );
              })}
            </View>
          </View>

          <View className="flex-1 gap-3">
            <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
              Right Column
            </Text>
            <View className="gap-2.5">
              {columnOrders.right.map((option) => {
                const matchedLeft = step.pairs.find((pair) => matches[pair.id] === option.id);
                const isSelected = selectedCard?.side === "right" && selectedCard.id === option.id;
                const showCorrect = matchedLeft?.id === option.id;
                const showWrong = incorrectPair?.rightId === option.id;
                const status = showCorrect
                  ? "correct"
                  : showWrong
                    ? incorrectPair?.fading
                      ? "wrongFading"
                      : "wrong"
                    : isSelected
                      ? "selected"
                      : "idle";

                return (
                  <MatchingCard
                    key={option.id}
                    onPress={() => handleRightPress(option.id)}
                    disabled={locked || showCorrect}
                    status={status}
                    tone={tone}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="flex-1 text-caption leading-5 text-card-foreground">
                        {option.right}
                      </Text>
                      {showCorrect ? (
                        <LucideIcon
                          name="Check"
                          size={17}
                          className="text-emerald-600 dark:text-emerald-300"
                        />
                      ) : showWrong ? (
                        <LucideIcon
                          name="X"
                          size={17}
                          className="text-rose-600 dark:text-rose-300"
                        />
                      ) : null}
                    </View>
                  </MatchingCard>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function MatchingCard({
  children,
  disabled,
  onPress,
  status,
  tone,
}: {
  children: ReactNode;
  disabled: boolean;
  onPress: () => void;
  status: "idle" | "selected" | "correct" | "wrong" | "wrongFading";
  tone: ToneClasses;
}) {
  const wrongOverlayOpacity = useSharedValue(status === "wrong" ? 1 : 0);

  useEffect(() => {
    if (status === "wrong") {
      wrongOverlayOpacity.value = 1;
      return;
    }

    if (status === "wrongFading") {
      wrongOverlayOpacity.value = withTiming(0, { duration: 250 });
      return;
    }

    wrongOverlayOpacity.value = 0;
  }, [status, wrongOverlayOpacity]);

  const wrongOverlayStyle = useAnimatedStyle(() => ({
    opacity: wrongOverlayOpacity.value,
  }));

  const showWrongOverlay = status === "wrong" || status === "wrongFading";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={cn(
        "min-h-20 overflow-hidden rounded-2xl border px-3 py-3 active:opacity-90",
        status === "selected"
          ? "border-primary bg-primary/10"
          : status === "correct"
            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-400/50 dark:bg-emerald-500/10"
            : status === "wrong"
              ? "border-rose-300 bg-card dark:border-rose-400/50"
              : "border-border bg-card",
        disabled && status !== "correct" && "opacity-90",
      )}
    >
      {showWrongOverlay ? (
        <Animated.View
          style={wrongOverlayStyle}
          className="absolute inset-0 bg-rose-50 dark:bg-rose-500/10"
        />
      ) : null}
      <View className="relative z-10 flex-1 justify-center">{children}</View>
      {status === "selected" ? (
        <View className={cn("absolute bottom-0 left-0 right-0 h-1", tone.accentBg)} />
      ) : null}
    </Pressable>
  );
}

function BlockPuzzleStep({
  step,
  tone,
  answer,
  evaluationMode,
  onSubmit,
}: {
  step: Extract<LessonStep, { kind: "blockPuzzle" }>;
  tone: ToneClasses;
  answer?: BlockPuzzleAnswer;
  evaluationMode: "mastery" | "graded";
  onSubmit: (order: string[]) => void;
}) {
  const initialOrderRef = useRef<string[] | null>(null);

  if (!initialOrderRef.current) {
    const shuffledBlocks = shuffleItems(step.blocks);
    initialOrderRef.current = shuffledBlocks.map((block) => block.id);
  }

  const [order, setOrder] = useState(answer?.order ?? initialOrderRef.current);
  const locked = evaluationMode === "graded" ? Boolean(answer) : Boolean(answer?.correct);
  const blockById = useMemo(
    () => new Map(step.blocks.map((block) => [block.id, block])),
    [step.blocks],
  );

  const moveBlock = (blockId: string, direction: -1 | 1) => {
    if (locked) return;
    setOrder((currentOrder) => {
      const currentIndex = currentOrder.indexOf(blockId);
      const nextIndex = currentIndex + direction;

      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= currentOrder.length) {
        return currentOrder;
      }

      const nextOrder = [...currentOrder];
      [nextOrder[currentIndex], nextOrder[nextIndex]] = [
        nextOrder[nextIndex],
        nextOrder[currentIndex],
      ];
      return nextOrder;
    });
  };

  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
        <Text className="text-body leading-7 text-muted-foreground">{step.instructions}</Text>
      </View>

      <View
        className={cn(
          "gap-3 rounded-[28px] border px-4 py-4",
          tone.accentBorder,
          tone.accentSoftBg,
        )}
      >
        {order.map((blockId, index) => {
          const block = blockById.get(blockId);
          const isCorrectPosition = answer?.correct && step.correctOrder[index] === blockId;

          if (!block) {
            return null;
          }

          return (
            <View
              key={block.id}
              className={cn(
                "flex-row items-center gap-3 rounded-2xl border px-3 py-3",
                isCorrectPosition
                  ? "border-emerald-300 bg-emerald-50 dark:border-emerald-400/50 dark:bg-emerald-500/10"
                  : "border-border bg-card",
              )}
            >
              <View className={cn("h-8 w-8 items-center justify-center rounded-xl", tone.iconWrap)}>
                <Text className={cn("text-caption font-semibold", tone.iconText)}>{index + 1}</Text>
              </View>

              <Text className="flex-1 text-body leading-6 text-card-foreground">{block.text}</Text>

              <View className="flex-row gap-1">
                <Pressable
                  onPress={() => moveBlock(block.id, -1)}
                  disabled={locked || index === 0}
                  accessibilityRole="button"
                  accessibilityLabel="Subir bloque"
                  className={cn(
                    "h-9 w-9 items-center justify-center rounded-xl border border-border bg-background active:opacity-80",
                    (locked || index === 0) && "opacity-40",
                  )}
                >
                  <LucideIcon name="ArrowUp" size={16} className="text-foreground" />
                </Pressable>

                <Pressable
                  onPress={() => moveBlock(block.id, 1)}
                  disabled={locked || index === order.length - 1}
                  accessibilityRole="button"
                  accessibilityLabel="Bajar bloque"
                  className={cn(
                    "h-9 w-9 items-center justify-center rounded-xl border border-border bg-background active:opacity-80",
                    (locked || index === order.length - 1) && "opacity-40",
                  )}
                >
                  <LucideIcon name="ArrowDown" size={16} className="text-foreground" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      <Button
        onPress={() => onSubmit(order)}
        disabled={locked}
        variant={answer?.correct ? "secondary" : "default"}
      >
        <Text
          className={cn(
            "text-button",
            answer?.correct ? "text-secondary-foreground" : "text-primary-foreground",
          )}
        >
          Comprobar orden
        </Text>
        <LucideIcon
          name="ListChecks"
          size={18}
          className={cn(
            "ml-2",
            answer?.correct ? "text-secondary-foreground" : "text-primary-foreground",
          )}
        />
      </Button>

      {answer ? (
        <AnswerFeedback
          isCorrect={answer.correct}
          evaluationMode={evaluationMode}
          message={step.explanation}
        />
      ) : null}
    </View>
  );
}

function BlankStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "blank" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>
      </View>

      <View
        className={cn(
          "min-h-72 items-center justify-center gap-4 rounded-[28px] border border-dashed px-5 py-10",
          tone.accentBorder,
          tone.accentSoftBg,
        )}
      >
        <View
          className={cn(
            "h-16 w-16 items-center justify-center rounded-[22px] border border-black/5 dark:border-white/5",
            tone.iconWrap,
          )}
        >
          <LucideIcon name={step.icon} size={30} className={tone.iconText} />
        </View>
        <Text className="max-w-sm text-center text-body leading-7 text-muted-foreground">
          {step.message}
        </Text>
      </View>
    </View>
  );
}

function QuizStep({
  step,
  tone,
  selectedId,
  isCorrect,
  evaluationMode,
  onSelect,
}: {
  step: Extract<LessonStep, { kind: "quiz" }>;
  tone: ToneClasses;
  selectedId?: string;
  isCorrect: boolean;
  evaluationMode: "mastery" | "graded";
  onSelect: (id: string) => void;
}) {
  return (
    <View className="gap-5">
      <View className="gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-h2 leading-9 text-foreground">{step.question}</Text>
        {step.prompt ? (
          <Text className="text-body leading-6 text-muted-foreground">{step.prompt}</Text>
        ) : null}
      </View>

      {step.code ? <CodeBlock label={step.code.label} code={step.code.content} /> : null}

      <OptionList
        options={step.options}
        correctId={step.correctId}
        selectedId={selectedId}
        locked={evaluationMode === "graded" ? Boolean(selectedId) : isCorrect}
        revealCorrectAnswer={evaluationMode === "graded" && Boolean(selectedId)}
        onSelect={onSelect}
      />

      {selectedId ? (
        <AnswerFeedback
          isCorrect={isCorrect}
          evaluationMode={evaluationMode}
          message={step.explanation}
        />
      ) : null}
    </View>
  );
}

function OptionList({
  options,
  correctId,
  selectedId,
  locked,
  revealCorrectAnswer,
  onSelect,
}: {
  options: { id: string; label: string }[];
  correctId: string;
  selectedId?: string;
  locked: boolean;
  revealCorrectAnswer?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <View className="gap-2.5">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isThisCorrect = option.id === correctId;
        const showAsCorrect =
          (isSelected && isThisCorrect) || Boolean(revealCorrectAnswer && locked && isThisCorrect);
        const showAsWrong = isSelected && !isThisCorrect;

        return (
          <Pressable
            key={option.id}
            onPress={() => onSelect(option.id)}
            disabled={locked}
            accessibilityRole="button"
            className={cn(
              "flex-row items-center justify-between gap-3 rounded-2xl border px-4 py-4 active:opacity-90",
              showAsCorrect
                ? "border-emerald-400 bg-emerald-50 dark:border-emerald-400/60 dark:bg-emerald-500/10"
                : showAsWrong
                  ? "border-rose-400 bg-rose-50 dark:border-rose-400/60 dark:bg-rose-500/10"
                  : "border-border bg-card",
              locked && !isSelected && !showAsCorrect && "opacity-60",
            )}
          >
            <Text
              className={cn(
                "flex-1 text-body leading-6",
                showAsCorrect
                  ? "text-emerald-700 dark:text-emerald-200"
                  : showAsWrong
                    ? "text-rose-700 dark:text-rose-200"
                    : "text-card-foreground",
              )}
            >
              {option.label}
            </Text>
            {showAsCorrect ? (
              <LucideIcon
                name="Check"
                size={18}
                className="text-emerald-600 dark:text-emerald-300"
              />
            ) : showAsWrong ? (
              <LucideIcon name="X" size={18} className="text-rose-600 dark:text-rose-300" />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

function AnswerFeedback({
  isCorrect,
  evaluationMode,
  message,
}: {
  isCorrect: boolean;
  evaluationMode: "mastery" | "graded";
  message: string;
}) {
  const isGradedReview = evaluationMode === "graded";

  return (
    <View
      className={cn(
        "flex-row items-start gap-3 rounded-2xl border px-4 py-4",
        isCorrect
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-400/40 dark:bg-emerald-500/10"
          : "border-rose-200 bg-rose-50 dark:border-rose-400/40 dark:bg-rose-500/10",
      )}
    >
      <LucideIcon
        name={isCorrect ? "CheckCheck" : "RefreshCw"}
        size={18}
        className={cn(
          "mt-0.5",
          isCorrect ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300",
        )}
      />
      <View className="flex-1 gap-1">
        <Text
          className={cn(
            "text-caption uppercase tracking-[0.2em]",
            isCorrect
              ? "text-emerald-700 dark:text-emerald-200"
              : "text-rose-700 dark:text-rose-200",
          )}
        >
          {isCorrect
            ? "Correcto"
            : isGradedReview
              ? "Respuesta incorrecta"
              : "Casi, intenta de nuevo"}
        </Text>
        <Text className="text-body leading-6 text-foreground">
          {isCorrect || isGradedReview ? message : "Lee con calma y vuelve a intentarlo."}
        </Text>
      </View>
    </View>
  );
}

function FeedbackStep({
  tone,
  summary,
}: {
  tone: ToneClasses;
  summary: FeedbackSummary;
}) {
  const experience = getExperienceForScore(summary.scorePercent);

  return (
    <View className="w-full items-center gap-5 py-2">
      <View className="items-center gap-3">
        <Text className="text-center text-h1 leading-10 text-foreground">¡Lección completada!</Text>
        <Text className="text-center text-body leading-7 text-muted-foreground">
          ¡Estás un paso más cerca de alcanzar tus metas!
        </Text>
      </View>

      <View
        className={cn(
          "w-full gap-5 rounded-[32px] border px-5 py-5",
          tone.accentBorder,
          tone.accentSoftBg,
        )}
      >
        <View className="flex-row items-center gap-4">
          <View
            className={cn(
              "h-16 w-16 items-center justify-center rounded-[20px] border border-black/5 dark:border-white/5",
              tone.iconWrap,
            )}
          >
            <LucideIcon name="Award" size={30} className={tone.iconText} />
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-caption uppercase tracking-[0.24em] text-muted-foreground">
              Puntaje final
            </Text>
            <Text className="text-h1 leading-none text-foreground">{summary.scoreLabel}</Text>
            <Text className="text-body leading-6 text-muted-foreground">
              Calificación {summary.gradeLabel} • {summary.correctAnswers} de{" "}
              {summary.totalQuestions} correctas
            </Text>
          </View>
        </View>

        <View className="h-3 overflow-hidden rounded-full bg-secondary">
          <View
            className={cn("h-full rounded-full", tone.progressBar)}
            style={{ width: `${summary.scorePercent}%` }}
          />
        </View>
      </View>

      <View className="w-full flex-row gap-2">
        <View className="min-w-0 flex-1 items-center rounded-3xl border border-emerald-200 bg-emerald-50 px-2 py-4 dark:border-emerald-400/40 dark:bg-emerald-500/10">
          <Text className="text-center text-caption uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-200">
            Aciertos
          </Text>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            <View className="h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-400/15">
              <LucideIcon
                name="CheckCheck"
                size={18}
                className="text-emerald-600 dark:text-emerald-300"
              />
            </View>
            <Text className="text-h2 text-foreground">{summary.correctAnswers}</Text>
          </View>
        </View>

        <View className="min-w-0 flex-1 items-center rounded-3xl border border-rose-200 bg-rose-50 px-2 py-4 dark:border-rose-400/40 dark:bg-rose-500/10">
          <Text className="text-center text-caption uppercase tracking-[0.12em] text-rose-700 dark:text-rose-200">
            Errores
          </Text>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            <View className="h-9 w-9 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-400/15">
              <LucideIcon name="X" size={18} className="text-rose-600 dark:text-rose-300" />
            </View>
            <Text className="text-h2 text-foreground">{summary.incorrectAnswers}</Text>
          </View>
        </View>

        <View className="min-w-0 flex-1 items-center rounded-3xl border border-amber-200 bg-amber-50 px-2 py-4 dark:border-amber-400/40 dark:bg-amber-500/10">
          <Text className="text-center text-caption uppercase tracking-[0.12em] text-amber-700 dark:text-amber-200">
            EXP
          </Text>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            <View className="h-9 w-9 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-400/15">
              <LucideIcon name="Zap" size={18} className="text-amber-600 dark:text-amber-300" />
            </View>
            <Text className="text-h2 text-foreground">{experience}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function RecapStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "recap" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="gap-5">
      <Eyebrow text={step.eyebrow} tone={tone} />
      <Text className="text-h2 leading-9 text-foreground">{step.title}</Text>

      <View className="gap-2.5">
        {step.takeaways.map((takeaway) => (
          <View
            key={takeaway}
            className="flex-row items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4"
          >
            <View
              className={cn(
                "mt-0.5 h-7 w-7 items-center justify-center rounded-full",
                tone.iconWrap,
              )}
            >
              <LucideIcon name="Check" size={16} className={tone.iconText} />
            </View>
            <Text className="flex-1 text-body leading-6 text-card-foreground">{takeaway}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function CompletionStep({
  step,
  tone,
}: {
  step: Extract<LessonStep, { kind: "completion" }>;
  tone: ToneClasses;
}) {
  return (
    <View className="items-center gap-6 pt-6">
      <View
        className={cn(
          "h-24 w-24 items-center justify-center rounded-[32px] border border-black/5 dark:border-white/5",
          tone.iconWrap,
        )}
      >
        <LucideIcon name="PartyPopper" size={40} className={tone.iconText} />
      </View>
      <View className="items-center gap-3">
        <Eyebrow text={step.eyebrow} tone={tone} />
        <Text className="text-center text-h1 leading-10 text-foreground">{step.title}</Text>
        <Text className="text-center text-body leading-7 text-muted-foreground">
          {step.message}
        </Text>
      </View>
    </View>
  );
}
