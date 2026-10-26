import { create } from "zustand";
import { getQuizTopicSession } from "@/data/quiz-topics";
import { QUIZ_CATALOG_VERSION, type QuizMode, type QuizQuestionStatus } from "@/lib/quizzes";

export type QuizRoundAnswer = { selectedOptionIndex: number; status: QuizQuestionStatus };
export type QuizRound = {
  id: string;
  catalogVersion: number;
  userId: string;
  topicSlug: string;
  mode: QuizMode;
  questionIds: string[];
  answers: Record<string, QuizRoundAnswer>;
};

type QuizSessionState = {
  round: QuizRound | null;
  startRound: (input: Omit<QuizRound, "id" | "catalogVersion" | "answers">) => string | null;
  recordAnswer: (roundId: string, questionId: string, answer: QuizRoundAnswer) => void;
  clearRound: () => void;
};

let roundSequence = 0;

export function isCurrentQuizRound(round: QuizRound) {
  const session = getQuizTopicSession(round.topicSlug);
  return (
    round.catalogVersion === QUIZ_CATALOG_VERSION &&
    round.questionIds.length > 0 &&
    round.questionIds.every((id) => session?.questions.some((question) => question.id === id))
  );
}

export const useQuizSessionStore = create<QuizSessionState>((set) => ({
  round: null,
  startRound: (input) => {
    const questionIds = [...new Set(input.questionIds)];
    const session = getQuizTopicSession(input.topicSlug);
    if (!questionIds.length || !questionIds.every((id) => session?.questions.some((question) => question.id === id))) {
      return null;
    }
    const id = `${Date.now()}-${++roundSequence}`;
    set({ round: { ...input, questionIds, id, catalogVersion: QUIZ_CATALOG_VERSION, answers: {} } });
    return id;
  },
  recordAnswer: (roundId, questionId, answer) =>
    set((state) => {
      const round = state.round;
      if (
        !round ||
        round.id !== roundId ||
        round.questionIds[Object.keys(round.answers).length] !== questionId
      ) {
        return state;
      }
      return { round: { ...round, answers: { ...round.answers, [questionId]: answer } } };
    }),
  clearRound: () => set({ round: null }),
}));
