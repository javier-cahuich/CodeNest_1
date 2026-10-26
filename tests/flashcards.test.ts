import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext, Script } from "node:vm";
import { getModuleBySlug, getModulesByCourseId } from "@/data/codenest-modules";
import { getCourseModuleSections } from "@/data/course-module-sections";
import { courses } from "@/data/courses";
import { flashcardDecks, getLegacyFlashcardDestinations } from "@/data/flashcard-decks";
import { flashcardDeckSlug } from "@/data/flashcard-topics";
import { quizTopics, quizTopicSessions } from "@/data/quiz-topics";
import { FLASHCARD_CATALOG_VERSION, NEW_FLASHCARD_PROGRESS_TOPIC } from "@/data/flashcards/content";
import { legacyFlashcards } from "@/data/flashcards/legacy-progress";
import {
  decodeFlashcardProgress,
  getRoundCardIds,
  resolveFlashcardHref,
  summarizeFlashcards,
  type FlashcardProgressRow,
} from "@/lib/flashcards";
import {
  isCurrentFlashcardRound,
  useFlashcardSessionStore,
} from "@/stores/flashcard-session-store";

const variablesDeck = flashcardDeckSlug("fundamentos-programacion", "variables-and-types");
const jsDeck = flashcardDeckSlug("fundamentos-javascript", "lessons");
const cards = flashcardDecks.flatMap((deck) => deck.cards);

test("los cuestionarios resuelven sus ocho temas independientemente de los mazos por sección", () => {
  assert.equal(quizTopics.length, 8);
  assert.deepEqual(
    quizTopics.map((topic) => topic.slug),
    quizTopicSessions.map((session) => session.topicSlug),
  );
  assert.ok(quizTopicSessions.every((session) => session.questions.length === 5));
});

test("cada sección publicada tiene exactamente un mazo de 15 tarjetas y fuentes de sus propias lecciones", () => {
  assert.equal(flashcardDecks.length, 6);
  assert.equal(cards.length, 90);
  assert.equal(new Set(cards.map((card) => card.id)).size, 90);
  assert.equal(new Set(cards.map((card) => JSON.stringify(card.progressKey))).size, 90);

  for (const course of courses) {
    const sections = getCourseModuleSections(course.id, getModulesByCourseId(course.id));
    const decks = flashcardDecks.filter((deck) => deck.courseId === course.id);
    assert.deepEqual(
      decks.map((deck) => deck.sectionId),
      sections.map((section) => section.id),
    );
    for (const deck of decks) {
      assert.equal(deck.cards.length, 15, deck.title);
      assert.equal(deck.title, sections.find((section) => section.id === deck.sectionId)?.title);
      for (const card of deck.cards) {
        assert.ok(deck.lessonSlugs.includes(card.source.lessonSlug), card.id);
        const lesson = getModuleBySlug(card.source.lessonSlug);
        assert.equal(lesson?.courseId, deck.courseId, card.id);
        assert.ok(
          lesson?.steps.some((step) => "title" in step && step.title === card.source.stepTitle),
          `${card.id}: ${card.source.stepTitle}`,
        );
        assert.ok(card.title.trim() && card.body.trim() && card.code.trim(), card.id);
      }
      // All the section's lessons contribute at least one selected concept.
      assert.deepEqual(
        new Set(deck.cards.map((card) => card.source.lessonSlug)),
        new Set(deck.lessonSlugs),
      );
    }
  }
});

test("los ejemplos JavaScript son válidos y expresan el resultado enseñado", () => {
  for (const card of cards.filter((item) => item.codeLabel === "JavaScript")) {
    assert.doesNotThrow(() => new Script(card.code), card.id);
    assert.doesNotThrow(
      () => runInNewContext(card.code, { console: { log: () => undefined } }, { timeout: 500 }),
      card.id,
    );
  }
  const outputs: Record<string, string[]> = {};
  for (const id of [
    "fp-or",
    "fp-and",
    "fp-map",
    "fp-indexof",
    "fp-do-while",
    "fp-bucles-anidados",
  ]) {
    outputs[id] = [];
    runInNewContext(
      cards.find((card) => card.id === id)!.code,
      {
        console: { log: (...args: unknown[]) => outputs[id].push(JSON.stringify(args)) },
      },
      { timeout: 500 },
    );
  }
  assert.deepEqual(outputs["fp-or"], ["[true]"]);
  assert.deepEqual(outputs["fp-and"], ["[false]"]);
  assert.deepEqual(outputs["fp-map"], ["[[200,400]]"]);
  assert.deepEqual(outputs["fp-indexof"], ["[1]", "[-1]"]);
  assert.deepEqual(outputs["fp-do-while"], ["[1]", "[2]", "[3]"]);
  assert.equal(outputs["fp-bucles-anidados"].length, 6);
});

test("las 40 identidades anteriores quedan documentadas sin fusionar o duplicar progreso", () => {
  const oldCards = Object.values(legacyFlashcards).flat();
  assert.equal(oldCards.length, 40);
  const mapped = oldCards.filter((card) => card.replacementId !== null);
  assert.equal(new Set(mapped.map((card) => card.replacementId)).size, mapped.length);
  for (const [topicSlug, entries] of Object.entries(legacyFlashcards)) {
    for (const entry of entries) {
      assert.ok(entry.reason.length > 0);
      if (!entry.replacementId) continue;
      const replacement = cards.find((card) => card.id === entry.replacementId);
      assert.deepEqual(replacement?.progressKey, { topicSlug, cardId: entry.cardId });
    }
  }
  assert.equal(
    cards.find((card) => card.id === "js-number")?.progressKey.cardId,
    "tipos-de-datos-2",
  );
  assert.notEqual(
    cards.find((card) => card.id === "fp-numero-decimal")?.progressKey.cardId,
    "tipos-de-datos-2",
  );
  assert.notEqual(
    cards.find((card) => card.id === "fp-numero-entero")?.progressKey.cardId,
    "tipos-de-datos-2",
  );
});

test("el nuevo agrupamiento recupera claves antiguas y nuevas, excluye históricos y no clasifica tarjetas nuevas", () => {
  const rows: FlashcardProgressRow[] = [
    { topic_slug: "variables", card_id: "variables-1", status: "known" },
    { topic_slug: "variables", card_id: "variables-2", status: "inProgress" },
    { topic_slug: "tipos-de-datos", card_id: "tipos-de-datos-1", status: "known" },
    { topic_slug: "tipos-de-datos", card_id: "tipos-de-datos-3", status: "inProgress" },
    { topic_slug: "tipos-de-datos", card_id: "tipos-de-datos-2", status: "known" },
    { topic_slug: "variables", card_id: "variables-5", status: "inProgress" },
    { topic_slug: "tipos-de-datos", card_id: "tipos-de-datos-4", status: "inProgress" },
    { topic_slug: NEW_FLASHCARD_PROGRESS_TOPIC, card_id: "fp-inicializar", status: "known" },
    // Same card ID with a different topic is not the same persistence identity.
    { topic_slug: "variables", card_id: "tipos-de-datos-1", status: "inProgress" },
  ];
  const progress = decodeFlashcardProgress(variablesDeck, rows);
  assert.deepEqual(progress, {
    "fp-variable": "known",
    "fp-asignacion": "inProgress",
    "fp-cadena-texto": "known",
    "fp-booleano": "inProgress",
    "fp-inicializar": "known",
  });
  assert.deepEqual(summarizeFlashcards(progress), { known: 3, inProgress: 2, total: 5 });
  assert.deepEqual(getRoundCardIds(variablesDeck, "inProgress", progress), [
    "fp-asignacion",
    "fp-booleano",
  ]);
  assert.equal(getRoundCardIds(variablesDeck, "all", progress).length, 15);
  assert.deepEqual(decodeFlashcardProgress(jsDeck, rows), { "js-number": "known" });
  assert.deepEqual(getRoundCardIds(variablesDeck, "inProgress", {}), []);
});

test("las rutas antiguas se resuelven al destino único o a una selección explícita", () => {
  assert.deepEqual(resolveFlashcardHref("variables"), {
    pathname: "/practice/completion",
    params: { topic: variablesDeck, phase: "start" },
  });
  assert.deepEqual(resolveFlashcardHref("tipos-de-datos"), {
    pathname: "/practice/topics",
    params: { legacyTopic: "tipos-de-datos" },
  });
  assert.equal(getLegacyFlashcardDestinations("bucles").length, 3);
  assert.deepEqual(resolveFlashcardHref("objetos"), {
    pathname: "/practice/completion",
    params: { topic: jsDeck, phase: "start" },
  });
  assert.deepEqual(getLegacyFlashcardDestinations("manejo-de-errores"), []);
  assert.deepEqual(resolveFlashcardHref("toString"), { pathname: "/practice/topics", params: {} });
});

test("el repaso mantiene una lista fija, rechaza respuestas duplicadas y converge a cero pendientes", () => {
  const store = useFlashcardSessionStore;
  const progress = { "fp-asignacion": "inProgress", "fp-booleano": "inProgress" } as const;
  const ids = getRoundCardIds(variablesDeck, "inProgress", progress);
  const roundId = store.getState().startRound({
    userId: "test-user",
    topicSlug: variablesDeck,
    mode: "inProgress",
    cardIds: ids,
  })!;
  ids.pop();
  assert.equal(store.getState().round!.cardIds.length, 2);
  store.getState().recordAnswer(roundId, "fp-asignacion", "known");
  store.getState().recordAnswer(roundId, "fp-asignacion", "inProgress");
  assert.equal(store.getState().round!.answers["fp-asignacion"], "known");
  store.getState().recordAnswer(roundId, "fp-booleano", "inProgress");
  const remaining = getRoundCardIds(variablesDeck, "inProgress", store.getState().round!.answers);
  assert.deepEqual(remaining, ["fp-booleano"]);
  const nextRoundId = store.getState().startRound({
    userId: "test-user",
    topicSlug: variablesDeck,
    mode: "inProgress",
    cardIds: remaining,
  })!;
  store.getState().recordAnswer(roundId, "fp-booleano", "known");
  assert.deepEqual(store.getState().round!.answers, {});
  store.getState().recordAnswer(nextRoundId, "fp-booleano", "known");
  assert.deepEqual(
    getRoundCardIds(variablesDeck, "inProgress", store.getState().round!.answers),
    [],
  );
  assert.ok(isCurrentFlashcardRound(store.getState().round!));
  assert.equal(
    isCurrentFlashcardRound({
      ...store.getState().round!,
      catalogVersion: FLASHCARD_CATALOG_VERSION - 1,
    }),
    false,
  );
  assert.equal(
    store.getState().startRound({
      userId: "test-user",
      topicSlug: variablesDeck,
      mode: "inProgress",
      cardIds: [],
    }),
    null,
  );
  assert.equal(
    store.getState().startRound({
      userId: "test-user",
      topicSlug: variablesDeck,
      mode: "all",
      cardIds: ["variables-1"],
    }),
    null,
  );
  store.getState().clearRound();
  assert.equal(store.getState().round, null);
});
