import * as React from "react";
import { useFocusEffect } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loadQuizProgress, saveQuizAnswer } from "@/lib/quiz-progress";
import { QUIZ_CATALOG_VERSION, type QuizProgress, type QuizQuestionStatus } from "@/lib/quizzes";
import { useAuthStore } from "@/stores/auth-store";

const quizProgressKey = (userId: string, topicSlug: string) =>
  ["quiz-progress", QUIZ_CATALOG_VERSION, userId, topicSlug] as const;

export function useQuizProgress(userId: string, topicSlug: string) {
  const query = useQuery({
    queryKey: quizProgressKey(userId, topicSlug),
    queryFn: ({ signal }) => loadQuizProgress(userId, topicSlug, signal),
    retry: false,
    staleTime: 0,
  });
  const { refetch } = query;

  useFocusEffect(
    React.useCallback(() => {
      void refetch({ cancelRefetch: false });
    }, [refetch]),
  );
  return query;
}

export function useSaveQuizAnswer(userId: string, topicSlug: string) {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["quiz-answer", userId, topicSlug],
    mutationFn: (answer: { questionId: string; status: QuizQuestionStatus }) =>
      saveQuizAnswer({ userId, topicSlug, ...answer }),
    retry: false,
    onSuccess: (_data, answer) => {
      if (useAuthStore.getState().user?.id !== userId) return;
      client.setQueryData<QuizProgress>(quizProgressKey(userId, topicSlug), (progress) => ({
        ...progress,
        [answer.questionId]: answer.status,
      }));
      void client.invalidateQueries({ queryKey: quizProgressKey(userId, topicSlug), refetchType: "none" });
    },
  });
}
