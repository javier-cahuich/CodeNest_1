import { getQuizTopicSession } from "@/data/quiz-topics";
import type { Href } from "expo-router";

export const QUIZ_CATALOG_VERSION = 2;
export type QuizMode = "all" | "incorrect";
export type QuizQuestionStatus = "correct" | "incorrect";
export type QuizProgress = Record<string, QuizQuestionStatus>;

export function getQuizRoundQuestionIds(topicSlug: string, mode: QuizMode, progress: QuizProgress) {
  return (getQuizTopicSession(topicSlug)?.questions ?? [])
    .filter((question) => mode === "all" || progress[question.id] === "incorrect")
    .map((question) => question.id);
}

export function summarizeQuizStatuses(statuses: QuizProgress) {
  const values = Object.values(statuses);
  return {
    correct: values.filter((status) => status === "correct").length,
    incorrect: values.filter((status) => status === "incorrect").length,
    omitted: 0,
    total: values.length,
  };
}

export function summarizeSavedQuizProgress(statuses: QuizProgress, questionCount: number) {
  const summary = summarizeQuizStatuses(statuses);

  if (summary.total === 0) {
    return summary;
  }

  return {
    ...summary,
    omitted: Math.max(questionCount - summary.total, 0),
    total: Math.max(questionCount, summary.total),
  };
}

export function quizStartHref(topicSlug: string): Href {
  return {
    pathname: "/practice/quiz-results" as const,
    params: { topic: topicSlug, phase: "start" },
  };
}

export function quizLoginHref(topicSlug: string, reauthenticate = false): Href {
  return {
    pathname: "/login" as const,
    params: { quizTopic: topicSlug, ...(reauthenticate ? { reauthenticate: "1" } : {}) },
  };
}
