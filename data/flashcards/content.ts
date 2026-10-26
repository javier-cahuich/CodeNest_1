export const FLASHCARD_CATALOG_VERSION = 2;
export const FLASHCARDS_PER_DECK = 15;
// Permanent storage namespace, independent of the display deck and catalog version.
export const NEW_FLASHCARD_PROGRESS_TOPIC = "course-concepts";

export type FlashcardProgressKey = { topicSlug: string; cardId: string };

export type FlashcardContent = {
  // Semantic, explicit and stable. Never derive this ID from the card's position.
  id: string;
  title: string;
  body: string;
  codeLabel: "Pseudocódigo" | "JavaScript" | "Python";
  code: string;
  source: { lessonSlug: string; stepTitle: string };
};

type LessonCard = Omit<FlashcardContent, "source" | "codeLabel"> & { stepTitle: string };

export function cardsFromLesson(
  lessonSlug: string,
  codeLabel: FlashcardContent["codeLabel"],
  cards: LessonCard[],
): FlashcardContent[] {
  return cards.map(({ stepTitle, ...card }) => ({
    ...card,
    codeLabel,
    source: { lessonSlug, stepTitle },
  }));
}
