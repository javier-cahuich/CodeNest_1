import * as React from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CodeBlock } from "@/components/codenest/code-block";
import { FlashcardAccess } from "@/components/codenest/flashcard-access";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getFlashcardDeck, getFlashcardTopic } from "@/data/flashcard-decks";
import { FlashcardAuthError } from "@/lib/flashcard-progress";
import {
  flashcardLoginHref,
  flashcardStartHref,
  flashcardTopicsHref,
  type FlashcardClassification,
} from "@/lib/flashcards";
import LucideIcon from "@/lib/icons/LucideIcon";
import { useSaveFlashcardAnswer } from "@/lib/use-flashcard-progress";
import { useAuthStore } from "@/stores/auth-store";
import {
  isCurrentFlashcardRound,
  useFlashcardSessionStore,
  type FlashcardRound,
} from "@/stores/flashcard-session-store";

export default function FlashcardSessionScreen() {
  const params = useLocalSearchParams<{ topic?: string; round?: string }>();
  const topicSlug = params.topic ?? "";
  return (
    <FlashcardAccess topicSlug={topicSlug}>
      {(userId) => <SessionGate userId={userId} topicSlug={topicSlug} roundId={params.round} />}
    </FlashcardAccess>
  );
}

function SessionGate({
  userId,
  topicSlug,
  roundId,
}: {
  userId: string;
  topicSlug: string;
  roundId?: string;
}) {
  const round = useFlashcardSessionStore((state) => state.round);
  if (
    !round ||
    round.id !== roundId ||
    round.userId !== userId ||
    round.topicSlug !== topicSlug ||
    !isCurrentFlashcardRound(round)
  ) {
    // A reload starts a fresh round from the saved classifications, never from URL counts.
    return <Redirect href={flashcardStartHref(topicSlug)} />;
  }
  return <FlashcardRoundScreen key={round.id} round={round} />;
}

function FlashcardRoundScreen({ round }: { round: FlashcardRound }) {
  const topic = getFlashcardTopic(round.topicSlug)!;
  const deck = getFlashcardDeck(round.topicSlug)!;
  const currentIndex = Object.keys(round.answers).length;
  const currentCard = deck.cards.find((card) => card.id === round.cardIds[currentIndex]);
  const totalCards = round.cardIds.length;
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState<FlashcardClassification | null>(null);
  const save = useSaveFlashcardAnswer(round.userId, round.topicSlug);
  const busy = React.useRef(false);
  const mounted = React.useRef(true);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleAdvance = async (classification: FlashcardClassification) => {
    const activeRound = useFlashcardSessionStore.getState().round;
    if (
      busy.current ||
      !currentCard ||
      activeRound?.id !== round.id ||
      activeRound.cardIds[Object.keys(activeRound.answers).length] !== currentCard.id
    )
      return;

    busy.current = true;
    setSelectedAnswer(classification);
    try {
      await save.mutateAsync({ cardId: currentCard.id, classification });
      if (!mounted.current || useAuthStore.getState().user?.id !== round.userId) return;
      setIsAnswerVisible(false);
      setSelectedAnswer(null);
      useFlashcardSessionStore.getState().recordAnswer(round.id, currentCard.id, classification);
    } catch {
      // The mutation exposes the error; keep this card and the selected classification for retry.
    } finally {
      busy.current = false;
    }
  };

  if (save.error instanceof FlashcardAuthError) {
    return <Redirect href={flashcardLoginHref(round.topicSlug, true)} />;
  }
  if (currentIndex >= totalCards) {
    return (
      <Redirect
        href={{
          pathname: "/practice/completion",
          params: { topic: round.topicSlug, round: round.id },
        }}
      />
    );
  }
  if (!currentCard) return <Redirect href={flashcardStartHref(round.topicSlug)} />;

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="grow px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-caption uppercase tracking-[0.22em] text-muted-foreground">
              {topic.title}
            </Text>
            <Text className="mt-2 text-h3 text-foreground">
              {round.mode === "inProgress" ? "Repaso · " : ""}
              {currentIndex + 1}/{totalCards}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Salir de las tarjetas"
            onPress={() => {
              mounted.current = false;
              router.replace(flashcardTopicsHref(topic.courseId));
            }}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card active:opacity-80"
          >
            <LucideIcon name="X" size={20} className="text-foreground" />
          </Pressable>
        </View>

        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: totalCards, now: currentIndex + 1 }}
          className="mt-4 h-3 overflow-hidden rounded-full bg-secondary"
        >
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </View>

        <View className="flex-1 justify-center py-6">
          <View className="rounded-[32px] border border-border bg-card px-5 py-6 shadow-sm shadow-foreground/10">
            <Text className="text-caption uppercase tracking-[0.2em] text-muted-foreground">
              Tarjeta {currentIndex + 1}
            </Text>
            <Text className="mt-3 text-h2 leading-9 text-card-foreground">{currentCard.title}</Text>
            {isAnswerVisible ? (
              <View>
                <Text className="mt-3 text-body leading-7 text-muted-foreground">
                  {currentCard.body}
                </Text>
                <View className="mt-5">
                  <CodeBlock label={currentCard.codeLabel} code={currentCard.code} />
                </View>
              </View>
            ) : null}
          </View>
        </View>

        <View className="gap-3">
          {save.isError ? (
            <View className="gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
              <Text accessibilityRole="alert" className="text-body leading-6 text-destructive">
                No pudimos guardar tu respuesta «
                {selectedAnswer === "known" ? "Conocido" : "En progreso"}». Revisa tu conexión y
                vuelve a intentarlo.
              </Text>
              <Button
                variant="outline"
                onPress={() => selectedAnswer && void handleAdvance(selectedAnswer)}
              >
                <Text>Reintentar guardado</Text>
              </Button>
            </View>
          ) : null}
          <Text
            accessibilityLiveRegion="polite"
            className="text-caption text-center text-muted-foreground"
          >
            {save.isPending
              ? "Guardando respuesta…"
              : "Tus respuestas guardadas se conservan al salir."}
          </Text>
          <Button
            variant="outline"
            className="h-12 w-full rounded-2xl"
            disabled={isAnswerVisible}
            onPress={() => setIsAnswerVisible(true)}
          >
            <Text className="text-button text-foreground">
              {isAnswerVisible ? "Respuesta visible" : "Mostrar respuesta"}
            </Text>
          </Button>
          <View className="flex-row gap-3">
            <Button
              variant="secondary"
              className="h-12 flex-1 rounded-2xl"
              disabled={save.isPending || save.isError}
              onPress={() => void handleAdvance("inProgress")}
            >
              <Text className="text-button text-secondary-foreground">En progreso</Text>
            </Button>
            <Button
              className="h-12 flex-1 rounded-2xl"
              disabled={save.isPending || save.isError}
              onPress={() => void handleAdvance("known")}
            >
              <Text className="text-button text-primary-foreground">Conocido</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
