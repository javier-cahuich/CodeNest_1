import type { ReactNode } from "react";
import { Redirect, router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { flashcardLoginHref, resolveFlashcardHref } from "@/lib/flashcards";
import { getFlashcardDeck } from "@/data/flashcard-decks";
import { isLegacyFlashcardTopic } from "@/data/flashcards/legacy-progress";
import { useAuthStore } from "@/stores/auth-store";

export function FlashcardNotice({
  title,
  message,
  onRetry,
  backHref = "/practice/topics",
  backLabel = "Volver a mazos",
}: {
  title: string;
  message: string;
  onRetry?: () => void;
  backHref?: "/practice/topics" | "/practice/quiz-topics";
  backLabel?: string;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center gap-4 px-5 py-6">
        <Text className="text-h2 text-foreground">{title}</Text>
        <Text
          accessibilityLiveRegion="polite"
          className="text-body leading-6 text-muted-foreground"
        >
          {message}
        </Text>
        {onRetry ? (
          <Button onPress={onRetry}>
            <Text>Reintentar</Text>
          </Button>
        ) : null}
        <Button variant="outline" onPress={() => router.replace(backHref)}>
          <Text>{backLabel}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export function FlashcardAccess({
  topicSlug,
  children,
}: {
  topicSlug: string;
  children: (userId: string) => ReactNode;
}) {
  const status = useAuthStore((state) => state.status);
  const userId = useAuthStore((state) => state.user?.id);

  if (!getFlashcardDeck(topicSlug)) {
    return isLegacyFlashcardTopic(topicSlug) ? (
      <Redirect href={resolveFlashcardHref(topicSlug)} />
    ) : (
      <FlashcardNotice
        title="Mazo no disponible"
        message="Elige una sección del curso para practicar."
      />
    );
  }

  if (status === "loading") {
    return <FlashcardNotice title="Preparando tus tarjetas" message="Comprobando tu sesión…" />;
  }
  if (status !== "authenticated" || !userId) {
    return <Redirect href={flashcardLoginHref(topicSlug)} />;
  }
  return children(userId);
}
