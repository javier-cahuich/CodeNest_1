import * as React from "react";
import { useFocusEffect } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loadFlashcardProgress, saveFlashcardAnswer } from "@/lib/flashcard-progress";
import type { FlashcardClassification, FlashcardProgress } from "@/lib/flashcards";
import { useAuthStore } from "@/stores/auth-store";
import { FLASHCARD_CATALOG_VERSION } from "@/data/flashcards/content";

const progressKey = (userId: string, topicSlug: string) =>
  ["flashcards", FLASHCARD_CATALOG_VERSION, userId, topicSlug] as const;

export function useFlashcardProgress(userId: string, topicSlug: string) {
  const query = useQuery({
    queryKey: progressKey(userId, topicSlug),
    queryFn: ({ signal }) => loadFlashcardProgress(userId, topicSlug, signal),
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

export function useSaveFlashcardAnswer(userId: string, topicSlug: string) {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["flashcard-answer", userId, topicSlug],
    mutationFn: (answer: { cardId: string; classification: FlashcardClassification }) =>
      saveFlashcardAnswer({ userId, topicSlug, ...answer }),
    retry: false,
    onSuccess: (_data, answer) => {
      if (useAuthStore.getState().user?.id !== userId) return;
      client.setQueryData<FlashcardProgress>(progressKey(userId, topicSlug), (progress) => ({
        ...progress,
        [answer.cardId]: answer.classification,
      }));
      void client.invalidateQueries({
        queryKey: progressKey(userId, topicSlug),
        refetchType: "none",
      });
    },
  });
}
