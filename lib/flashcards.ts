import { getFlashcardDeck, getLegacyFlashcardDestinations } from "@/data/flashcard-decks";
import { isLegacyFlashcardTopic } from "@/data/flashcards/legacy-progress";
import type { CourseId } from "@/data/courses";

export type FlashcardClassification = "known" | "inProgress";
export type FlashcardMode = "all" | "inProgress";
export type FlashcardProgress = Record<string, FlashcardClassification>;

export type FlashcardProgressRow = { topic_slug: string; card_id: string; status: string };

export function decodeFlashcardProgress(
  topicSlug: string,
  rows: FlashcardProgressRow[],
): FlashcardProgress {
  const deck = getFlashcardDeck(topicSlug);
  const cardByKey = new Map(
    deck?.cards.map((card) => [
      JSON.stringify([card.progressKey.topicSlug, card.progressKey.cardId]),
      card.id,
    ]),
  );
  const progress: FlashcardProgress = {};
  for (const row of rows) {
    const cardId = cardByKey.get(JSON.stringify([row.topic_slug, row.card_id]));
    if (cardId && (row.status === "known" || row.status === "inProgress")) {
      progress[cardId] = row.status;
    }
  }
  return progress;
}

export function flashcardTopicsHref(courseId?: CourseId) {
  return { pathname: "/practice/topics" as const, params: courseId ? { course: courseId } : {} };
}

// Resolve old bookmarks before starting a round or returning from authentication.
export function resolveFlashcardHref(topicSlug: string) {
  if (getFlashcardDeck(topicSlug)) return flashcardStartHref(topicSlug);
  if (isLegacyFlashcardTopic(topicSlug)) {
    const destinations = getLegacyFlashcardDestinations(topicSlug);
    if (destinations.length === 1) return flashcardStartHref(destinations[0].slug);
    return { pathname: "/practice/topics" as const, params: { legacyTopic: topicSlug } };
  }
  return flashcardTopicsHref();
}

export function getRoundCardIds(
  topicSlug: string,
  mode: FlashcardMode,
  progress: FlashcardProgress,
) {
  return (getFlashcardDeck(topicSlug)?.cards ?? [])
    .filter((card) => mode === "all" || progress[card.id] === "inProgress")
    .map((card) => card.id);
}

export function summarizeFlashcards(answers: FlashcardProgress) {
  const values = Object.values(answers);
  return {
    known: values.filter((status) => status === "known").length,
    inProgress: values.filter((status) => status === "inProgress").length,
    total: values.length,
  };
}

export function flashcardStartHref(topicSlug: string) {
  return {
    pathname: "/practice/completion" as const,
    params: { topic: topicSlug, phase: "start" },
  };
}

export function flashcardLoginHref(topicSlug: string, reauthenticate = false) {
  return {
    pathname: "/login" as const,
    params: { flashcardTopic: topicSlug, ...(reauthenticate ? { reauthenticate: "1" } : {}) },
  };
}
