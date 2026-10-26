import assert from "node:assert/strict";
import { test } from "node:test";
import { Script } from "node:vm";
import { getModulesByCourseId } from "@/data/codenest-modules";
import { getCourseModuleSections } from "@/data/course-module-sections";
import { courses } from "@/data/courses";
import { quizTopics, quizTopicSessions, quizTopicSlug } from "@/data/quiz-topics";
import { QUESTIONS_PER_QUIZ } from "@/data/quizzes/types";
import {
  getQuizRoundQuestionIds,
  QUIZ_CATALOG_VERSION,
  summarizeSavedQuizProgress,
  summarizeQuizStatuses,
} from "@/lib/quizzes";
import { isCurrentQuizRound, useQuizSessionStore } from "@/stores/quiz-session-store";

const variablesSlug = quizTopicSlug("fundamentos-programacion", "variables-and-types");
const variables = quizTopicSessions.find((topic) => topic.topicSlug === variablesSlug)!;

test("cada sección publicada tiene exactamente un cuestionario de diez preguntas", () => {
  const expectedSections = courses.flatMap((course) =>
    course.hasContent
      ? getCourseModuleSections(course.id, getModulesByCourseId(course.id)).map((section) => ({
          slug: quizTopicSlug(course.id, section.id),
          lessonSlugs: section.data.map((lesson) => lesson.slug),
        }))
      : [],
  );

  assert.equal(quizTopics.length, expectedSections.length);
  assert.deepEqual(
    quizTopics.map((topic) => topic.slug),
    expectedSections.map((section) => section.slug),
  );

  for (const topic of quizTopics) {
    const session = quizTopicSessions.find((item) => item.topicSlug === topic.slug)!;
    assert.equal(session.questions.length, QUESTIONS_PER_QUIZ, topic.slug);
    assert.deepEqual(
      new Set(session.questions.map((question) => question.sourceLessonSlug)),
      new Set(topic.lessonSlugs),
    );
    assert.ok(
      session.questions.every((question) => topic.lessonSlugs.includes(question.sourceLessonSlug)),
      topic.slug,
    );
  }
});

test("las preguntas tienen identidades semánticas únicas y persistentes", () => {
  const questions = quizTopicSessions.flatMap((topic) => topic.questions);
  assert.equal(questions.length, quizTopics.length * QUESTIONS_PER_QUIZ);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
  assert.ok(questions.every((question) => !/-\d+$/.test(question.id)), "No usa IDs por posición");
});

test("los ejemplos JavaScript de los cuestionarios tienen sintaxis válida", () => {
  const questions = quizTopicSessions.flatMap((topic) => topic.questions);
  for (const question of questions.filter((item) => item.codeLabel === "JavaScript")) {
    assert.ok(question.code, question.id);
    const code = question.code;
    assert.doesNotThrow(() => new Script(code), question.id);
  }
});

test("el repaso incluye únicamente errores guardados y converge a cero", () => {
  const [firstId, secondId] = variables.questions.map((question) => question.id);
  const progress = { [firstId]: "incorrect", [secondId]: "incorrect" } as const;
  assert.deepEqual(getQuizRoundQuestionIds(variablesSlug, "incorrect", progress), [
    firstId,
    secondId,
  ]);

  const corrected = { ...progress, [firstId]: "correct", [secondId]: "correct" } as const;
  assert.deepEqual(getQuizRoundQuestionIds(variablesSlug, "incorrect", corrected), []);
  assert.deepEqual(summarizeQuizStatuses(corrected), {
    correct: 2,
    incorrect: 0,
    omitted: 0,
    total: 2,
  });
});

test("el resumen inicial usa progreso real y mantiene todo en cero sin interacción", () => {
  assert.deepEqual(summarizeSavedQuizProgress({}, variables.questions.length), {
    correct: 0,
    incorrect: 0,
    omitted: 0,
    total: 0,
  });

  const [firstId, secondId] = variables.questions.map((question) => question.id);
  assert.deepEqual(
    summarizeSavedQuizProgress(
      { [firstId]: "correct", [secondId]: "incorrect" },
      variables.questions.length,
    ),
    {
      correct: 1,
      incorrect: 1,
      omitted: 8,
      total: 10,
    },
  );
});

test("la ronda conserva una lista fija y rechaza respuestas fuera de orden o duplicadas", () => {
  const store = useQuizSessionStore;
  const questionIds = variables.questions.slice(0, 2).map((question) => question.id);
  const roundId = store.getState().startRound({
    userId: "test-user",
    topicSlug: variablesSlug,
    mode: "incorrect",
    questionIds,
  })!;

  questionIds.pop();
  assert.equal(store.getState().round?.questionIds.length, 2);
  const [firstId, secondId] = store.getState().round!.questionIds;
  store.getState().recordAnswer(roundId, secondId, {
    selectedOptionIndex: 0,
    status: "incorrect",
  });
  assert.deepEqual(store.getState().round?.answers, {});

  store.getState().recordAnswer(roundId, firstId, {
    selectedOptionIndex: 1,
    status: "incorrect",
  });
  store.getState().recordAnswer(roundId, firstId, {
    selectedOptionIndex: 2,
    status: "correct",
  });
  assert.equal(store.getState().round?.answers[firstId]?.status, "incorrect");

  store.getState().recordAnswer(roundId, secondId, {
    selectedOptionIndex: 3,
    status: "correct",
  });
  assert.ok(isCurrentQuizRound(store.getState().round!));
  assert.equal(
    isCurrentQuizRound({
      ...store.getState().round!,
      catalogVersion: QUIZ_CATALOG_VERSION - 1,
    }),
    false,
  );
  assert.equal(
    store.getState().startRound({
      userId: "test-user",
      topicSlug: variablesSlug,
      mode: "incorrect",
      questionIds: [],
    }),
    null,
  );
  store.getState().clearRound();
});
