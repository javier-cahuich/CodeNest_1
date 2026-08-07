import * as React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CodeBlock } from "@/components/codenest/code-block";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getFlashcardDeck, getFlashcardTopic } from "@/data/flashcard-decks";
import LucideIcon from "@/lib/icons/LucideIcon";

type FlashcardClassification = "known" | "inProgress";

export default function FlashcardSessionScreen() {
  const params = useLocalSearchParams<{ topic?: string }>();
  const topicSlug = params.topic ?? "";
  const deck = getFlashcardDeck(topicSlug);
  const topic = getFlashcardTopic(topicSlug);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);
  const [sessionSummary, setSessionSummary] = React.useState({ known: 0, inProgress: 0 });

  const currentCard = deck?.cards[currentIndex];
  const totalCards = deck?.cards.length ?? 0;
  const progressPercent = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  React.useEffect(() => {
    setIsAnswerVisible(false);
  }, [currentCard?.id]);

  const handleAdvance = React.useCallback(
    (classification: FlashcardClassification) => {
      if (!deck) {
        router.replace("/practice/topics");
        return;
      }

      const nextSummary = {
        known: sessionSummary.known + (classification === "known" ? 1 : 0),
        inProgress: sessionSummary.inProgress + (classification === "inProgress" ? 1 : 0),
      };

      if (currentIndex >= deck.cards.length - 1) {
        router.replace({
          pathname: "/practice/completion",
          params: {
            topic: deck.topicSlug,
            known: String(nextSummary.known),
            inProgress: String(nextSummary.inProgress),
            total: String(deck.cards.length),
          },
        });
        return;
      }

      setSessionSummary(nextSummary);
      setCurrentIndex((index) => index + 1);
    },
    [currentIndex, deck, sessionSummary.inProgress, sessionSummary.known],
  );

  if (!deck || !currentCard || !topic) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-5 pb-8">
          <View className="rounded-[28px] border border-border bg-card px-5 py-6">
            <Text className="text-h2 text-card-foreground">Tema no disponible</Text>
            <Text className="mt-3 text-body leading-6 text-muted-foreground">
              No encontramos una sesión de tarjetas para este tema en la demo actual.
            </Text>
            <Button className="mt-5" onPress={() => router.replace("/practice/topics")}>
              <Text className="text-button text-primary-foreground">
                Volver a Temas de Tarjetas
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} className="flex-1 bg-background">
      <View className="flex-1 px-5 pb-8 pt-4">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-caption uppercase tracking-[0.22em] text-muted-foreground">
              {topic.title}
            </Text>
            <Text className="mt-2 text-h3 text-foreground">
              {currentIndex + 1}/{totalCards}
            </Text>
          </View>
          <Pressable
            onPress={() => router.replace("/practice/topics")}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card active:opacity-80"
          >
            <LucideIcon name="X" size={20} className="text-foreground" />
          </Pressable>
        </View>

        <View className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${progressPercent}%` }}
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
          <Button
            variant="outline"
            className="h-12 w-full rounded-2xl"
            onPress={() => setIsAnswerVisible(true)}
          >
            <Text className="text-button text-foreground">Mostrar respuesta</Text>
          </Button>
          <View className="flex-row gap-3">
            <Button
              variant="secondary"
              className="h-12 flex-1 rounded-2xl"
              onPress={() => handleAdvance("inProgress")}
            >
              <Text className="text-button text-secondary-foreground">En progreso</Text>
            </Button>
            <Button className="h-12 flex-1 rounded-2xl" onPress={() => handleAdvance("known")}>
              <Text className="text-button text-primary-foreground">Conocido</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
