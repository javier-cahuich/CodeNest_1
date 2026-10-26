import * as React from "react";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { FlashcardAccess } from "@/components/codenest/flashcard-access";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getFlashcardDeck, getFlashcardTopic } from "@/data/flashcard-decks";
import { FlashcardAuthError } from "@/lib/flashcard-progress";
import {
  flashcardLoginHref,
  flashcardTopicsHref,
  getRoundCardIds,
  summarizeFlashcards,
  type FlashcardMode,
} from "@/lib/flashcards";
import LucideIcon from "@/lib/icons/LucideIcon";
import { useFlashcardProgress } from "@/lib/use-flashcard-progress";
import {
  isCurrentFlashcardRound,
  useFlashcardSessionStore,
} from "@/stores/flashcard-session-store";

const summaryCards = [
  {
    key: "known",
    label: "Conocidos",
    description: "Conceptos que ya reconoces con seguridad.",
    icon: "Check",
    toneClassName: "border-success bg-success/10",
    iconClassName: "text-success",
  },
  {
    key: "inProgress",
    label: "En progreso",
    description: "Conceptos que conviene volver a repasar.",
    icon: "RotateCcw",
    toneClassName: "border-border bg-secondary",
    iconClassName: "text-secondary-foreground",
  },
] as const;

export default function FlashcardCompletionScreen() {
  const params = useLocalSearchParams<{ topic?: string; phase?: string; round?: string }>();
  const topicSlug = params.topic ?? "";

  return (
    <FlashcardAccess topicSlug={topicSlug}>
      {(userId) => (
        <FlashcardSummary
          key={`${userId}:${topicSlug}:${params.phase}:${params.round}`}
          userId={userId}
          topicSlug={topicSlug}
          phase={params.phase}
          roundId={params.round}
        />
      )}
    </FlashcardAccess>
  );
}

function FlashcardSummary({
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
  const topic = getFlashcardTopic(topicSlug)!;
  const deck = getFlashcardDeck(topicSlug)!;
  const query = useFlashcardProgress(userId, topicSlug);
  const round = useFlashcardSessionStore((state) => state.round);
  const starting = React.useRef(false);
  const isCompletedRound =
    phase !== "start" &&
    round?.id === roundId &&
    round?.userId === userId &&
    round?.topicSlug === topicSlug &&
    isCurrentFlashcardRound(round) &&
    Object.keys(round.answers).length === round.cardIds.length;
  const isStartingSession = !isCompletedRound;
  const summary = summarizeFlashcards(isCompletedRound ? round.answers : (query.data ?? {}));
  const pendingIds = getRoundCardIds(topicSlug, "inProgress", query.data ?? {});
  const progressReady = query.isSuccess && !query.isFetching;

  const handleStart = (mode: FlashcardMode) => {
    if (!progressReady || starting.current) return;
    const cardIds = getRoundCardIds(topicSlug, mode, query.data ?? {});
    const id = useFlashcardSessionStore.getState().startRound({ userId, topicSlug, mode, cardIds });
    if (!id) return;
    starting.current = true;
    router.replace({ pathname: "/practice/session", params: { topic: topicSlug, round: id } });
  };

  if (query.error instanceof FlashcardAuthError) {
    return <Redirect href={flashcardLoginHref(topicSlug, true)} />;
  }

  return (
    <Screen scroll contentClassName="grow justify-center gap-5">
      <Stack.Screen
        options={{ title: isStartingSession ? "Practicar tarjetas" : "Resumen de tarjetas" }}
      />
      <View className="items-center rounded-[32px] border border-border bg-card px-5 py-8">
        <Text className="mb-4 text-caption text-center text-muted-foreground">
          {topic.courseTitle}
        </Text>
        <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-primary/10">
          <LucideIcon
            name={isStartingSession ? "Layers" : "FileCheck"}
            size={28}
            className="text-primary"
          />
        </View>
        <Text className="mt-5 text-h1 text-center text-foreground">
          {isStartingSession ? topic.title : "Resumen de tarjetas"}
        </Text>
        <Text className="mt-3 text-body text-center leading-7 text-muted-foreground">
          {isStartingSession
            ? "Practica todas las tarjetas o retoma solo los términos que tienes en progreso. Cada respuesta se guarda en tu cuenta."
            : `Terminaste ${round?.mode === "inProgress" ? "el repaso" : "la sesión"} de ${topic.title}. Tus respuestas ya están guardadas.`}
        </Text>
      </View>

      <View className="gap-3">
        <Text className="text-h4 text-foreground">
          {isStartingSession ? "Tu progreso guardado" : "Resultados de esta ronda"}
        </Text>
        {summaryCards.map((card) => (
          <View
            key={card.key}
            className={`flex-row items-center gap-4 rounded-[28px] border px-5 py-5 ${card.toneClassName}`}
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-card">
              <LucideIcon name={card.icon} size={22} className={card.iconClassName} />
            </View>
            <View className="flex-1">
              <Text className="text-h4 text-foreground">{card.label}</Text>
              <Text className="mt-1 text-body leading-6 text-muted-foreground">
                {card.description}
              </Text>
            </View>
            <Text className="text-h2 text-foreground">
              {isStartingSession && !progressReady ? "—" : summary[card.key]}
            </Text>
          </View>
        ))}
      </View>

      <View className="rounded-[28px] border border-border bg-card px-5 py-5">
        <View className="flex-row items-center justify-between gap-4">
          <Text className="text-h4 text-card-foreground">
            {isStartingSession ? "Tarjetas del mazo" : "Total repasado"}
          </Text>
          <Text className="text-h2 text-card-foreground">
            {isStartingSession ? deck.cards.length : summary.total}
          </Text>
        </View>
        {isStartingSession && progressReady ? (
          <Text className="mt-2 text-caption text-muted-foreground">
            {deck.cards.length - summary.total} sin clasificar · Se actualizarán cuando respondas.
          </Text>
        ) : null}
        <Text
          accessibilityLiveRegion="polite"
          className="mt-2 text-body leading-6 text-muted-foreground"
        >
          {query.isFetching || query.isPending
            ? "Consultando tus términos pendientes…"
            : query.isError
              ? "No pudimos consultar tus pendientes. Reintenta para continuar."
              : pendingIds.length > 0
                ? `Tienes ${pendingIds.length} ${pendingIds.length === 1 ? "término pendiente" : "términos pendientes"}. Puedes repasarlos ahora o volver más tarde.`
                : isStartingSession
                  ? "No tienes términos en progreso. Inicia las tarjetas para practicar el mazo completo."
                  : "¡Ya no tienes términos pendientes! Puedes salir o practicar el mazo completo otra vez."}
        </Text>
        {query.isError && !query.isFetching ? (
          <Button variant="outline" className="mt-3" onPress={() => void query.refetch()}>
            <Text>Reintentar consulta</Text>
          </Button>
        ) : null}
      </View>

      <View className="gap-3">
        <Button
          variant="secondary"
          className="h-12 rounded-2xl"
          disabled={!progressReady || pendingIds.length === 0}
          accessibilityState={{ disabled: !progressReady || pendingIds.length === 0 }}
          onPress={() => handleStart("inProgress")}
        >
          <Text className="text-button text-secondary-foreground">
            Repasar términos en progreso
          </Text>
        </Button>
        <Button
          variant="outline"
          className="h-12 rounded-2xl"
          disabled={!progressReady}
          onPress={() => handleStart("all")}
        >
          <Text className="text-button text-foreground">Iniciar tarjetas</Text>
        </Button>
        <Button
          className="h-12 rounded-2xl"
          onPress={() => router.replace(flashcardTopicsHref(topic.courseId))}
        >
          <Text className="text-button text-primary-foreground">Salir</Text>
        </Button>
      </View>
    </Screen>
  );
}
