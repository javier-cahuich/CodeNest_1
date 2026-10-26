import { getFlashcardDeck } from "@/data/flashcard-decks";
import {
  decodeFlashcardProgress,
  type FlashcardClassification,
  type FlashcardProgress,
} from "@/lib/flashcards";
import { supabase } from "@/lib/supabase";

export class FlashcardAuthError extends Error {
  constructor() {
    super("Inicia sesión nuevamente para continuar. Tus respuestas guardadas se conservan.");
    this.name = "FlashcardAuthError";
  }
}

function progressError(error: { code?: string; status?: number; message?: string }) {
  if (
    error.status === 401 ||
    error.status === 403 ||
    error.code === "PGRST301" ||
    error.code === "PGRST302" ||
    error.code === "PGRST303" ||
    error.code === "42501"
  ) {
    return new FlashcardAuthError();
  }
  return new Error("No pudimos sincronizar tus tarjetas. Revisa tu conexión e inténtalo de nuevo.");
}

export async function loadFlashcardProgress(
  userId: string,
  topicSlug: string,
  signal: AbortSignal,
): Promise<FlashcardProgress> {
  const deck = getFlashcardDeck(topicSlug);
  if (!deck || !deck.cards.length) throw new Error("El mazo no está disponible.");
  const { data, error, status } = await supabase
    .from("flashcard_progress")
    .select("topic_slug, card_id, status")
    .eq("user_id", userId)
    .in("topic_slug", [...new Set(deck.cards.map((card) => card.progressKey.topicSlug))])
    .in(
      "card_id",
      deck.cards.map((card) => card.progressKey.cardId),
    )
    .abortSignal(signal);

  if (error) throw progressError({ ...error, status });

  // Both columns must match: a legacy topic can contribute cards to several new decks.
  return decodeFlashcardProgress(topicSlug, data ?? []);
}

export async function saveFlashcardAnswer(input: {
  userId: string;
  topicSlug: string;
  cardId: string;
  classification: FlashcardClassification;
}) {
  const card = getFlashcardDeck(input.topicSlug)?.cards.find((item) => item.id === input.cardId);
  if (!card) throw new Error("La tarjeta ya no pertenece a este mazo.");
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError) {
    if (authError.name === "AuthSessionMissingError") throw new FlashcardAuthError();
    throw progressError(authError);
  }
  if (!data.user || data.user.id !== input.userId) throw new FlashcardAuthError();

  const { error, status } = await supabase.from("flashcard_progress").upsert(
    {
      user_id: input.userId,
      topic_slug: card.progressKey.topicSlug,
      card_id: card.progressKey.cardId,
      status: input.classification,
    },
    { onConflict: "user_id,topic_slug,card_id" },
  );

  if (error) throw progressError({ ...error, status });
}
