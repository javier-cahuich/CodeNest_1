import { flashcardDeckSlug, flashcardTopics, type FlashcardTopic } from "@/data/flashcard-topics";
import { basicConceptCards } from "@/data/flashcards/basic-concepts";
import { variableTypeCards } from "@/data/flashcards/variables-and-types";
import { operatorCards } from "@/data/flashcards/operators";
import { controlStructureCards } from "@/data/flashcards/control-structures";
import { dataStructureCards } from "@/data/flashcards/data-structures";
import { javascriptLessonCards } from "@/data/flashcards/javascript-lessons";
import {
  getLegacyProgressKey,
  isLegacyFlashcardTopic,
  legacyFlashcards,
} from "@/data/flashcards/legacy-progress";
import {
  NEW_FLASHCARD_PROGRESS_TOPIC,
  type FlashcardContent,
  type FlashcardProgressKey,
} from "@/data/flashcards/content";

export interface FlashcardItem extends FlashcardContent {
  // A card's storage identity is independent of its current course/section grouping.
  progressKey: FlashcardProgressKey;
}

export interface FlashcardDeck extends FlashcardTopic {
  topicSlug: string;
  topicTitle: string;
  cards: FlashcardItem[];
}

const contentByDeck: Record<string, FlashcardContent[]> = {
  [flashcardDeckSlug("fundamentos-programacion", "basic-concepts")]: basicConceptCards,
  [flashcardDeckSlug("fundamentos-programacion", "variables-and-types")]: variableTypeCards,
  [flashcardDeckSlug("fundamentos-programacion", "operators")]: operatorCards,
  [flashcardDeckSlug("fundamentos-programacion", "control-structures")]: controlStructureCards,
  [flashcardDeckSlug("fundamentos-programacion", "data-structures")]: dataStructureCards,
  [flashcardDeckSlug("fundamentos-javascript", "lessons")]: javascriptLessonCards,
};

export const flashcardDecks: FlashcardDeck[] = flashcardTopics.map((topic) => ({
  ...topic,
  topicSlug: topic.slug,
  topicTitle: topic.title,
  cards: (contentByDeck[topic.slug] ?? []).map((card) => ({
    ...card,
    progressKey: getLegacyProgressKey(card.id) ?? {
      topicSlug: NEW_FLASHCARD_PROGRESS_TOPIC,
      cardId: card.id,
    },
  })),
}));

export function getFlashcardDeck(topicSlug: string) {
  return flashcardDecks.find((deck) => deck.topicSlug === topicSlug);
}

export function getFlashcardTopic(topicSlug: string) {
  return flashcardTopics.find((topic) => topic.slug === topicSlug);
}

export function getLegacyFlashcardDestinations(topicSlug: string) {
  if (!isLegacyFlashcardTopic(topicSlug)) return [];
  const replacements = new Set(legacyFlashcards[topicSlug].map((card) => card.replacementId));
  return flashcardDecks.filter((deck) => deck.cards.some((card) => replacements.has(card.id)));
}
