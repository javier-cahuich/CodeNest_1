import type { ReactNode } from "react";
import { Redirect } from "expo-router";
import { FlashcardNotice } from "@/components/codenest/flashcard-access";
import { getQuizTopicSession } from "@/data/quiz-topics";
import { quizLoginHref } from "@/lib/quizzes";
import { useAuthStore } from "@/stores/auth-store";

export function QuizAccess({
  topicSlug,
  children,
}: {
  topicSlug: string;
  children: (userId: string) => ReactNode;
}) {
  const status = useAuthStore((state) => state.status);
  const userId = useAuthStore((state) => state.user?.id);

  if (!getQuizTopicSession(topicSlug)) {
    return (
      <FlashcardNotice
        title="Cuestionario no disponible"
        message="Elige un tema para practicar."
        backHref="/practice/quiz-topics"
        backLabel="Volver a cuestionarios"
      />
    );
  }
  if (status === "loading") {
    return (
      <FlashcardNotice
        title="Preparando tu cuestionario"
        message="Comprobando tu sesión…"
        backHref="/practice/quiz-topics"
        backLabel="Volver a cuestionarios"
      />
    );
  }
  if (status !== "authenticated" || !userId) {
    return <Redirect href={quizLoginHref(topicSlug)} />;
  }
  return children(userId);
}
