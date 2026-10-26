import { create } from "zustand";
import type { FlashcardClassification, FlashcardMode, FlashcardProgress } from "@/lib/flashcards";
import { FLASHCARD_CATALOG_VERSION } from "@/data/flashcards/content";
import { getFlashcardDeck } from "@/data/flashcard-decks";

export type FlashcardRound = {
  id: string;
  catalogVersion: number;
  userId: string;
  topicSlug: string;
  mode: FlashcardMode;
  cardIds: string[];
  answers: FlashcardProgress;
};

type FlashcardSessionState = {
  round: FlashcardRound | null;
  startRound: (input: Omit<FlashcardRound, "id" | "answers" | "catalogVersion">) => string | null;
  recordAnswer: (roundId: string, cardId: string, status: FlashcardClassification) => void;
  clearRound: () => void;
};

let roundSequence = 0;

export function isCurrentFlashcardRound(round: FlashcardRound) {
  const deck = getFlashcardDeck(round.topicSlug);
  return (
    round.catalogVersion === FLASHCARD_CATALOG_VERSION &&
    round.cardIds.length > 0 &&
    round.cardIds.every((id) => deck?.cards.some((card) => card.id === id))
  );
}

// Only the current round lives here. Persistent classifications belong to Supabase/React Query.
export const useFlashcardSessionStore = create<FlashcardSessionState>((set) => ({
  round: null,
  startRound: (input) => {
    const cardIds = [...new Set(input.cardIds)];
    const deck = getFlashcardDeck(input.topicSlug);
    if (!cardIds.length || !cardIds.every((id) => deck?.cards.some((card) => card.id === id)))
      return null;

    const id = `${Date.now()}-${++roundSequence}`;
    set({
      round: { ...input, cardIds, id, catalogVersion: FLASHCARD_CATALOG_VERSION, answers: {} },
    });
    return id;
  },
  recordAnswer: (roundId, cardId, status) =>
    set((state) => {
      const round = state.round;
      if (
        !round ||
        round.id !== roundId ||
        round.cardIds[Object.keys(round.answers).length] !== cardId
      ) {
        return state;
      }

      return { round: { ...round, answers: { ...round.answers, [cardId]: status } } };
    }),
  clearRound: () => set({ round: null }),
}));
