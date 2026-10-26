export const QUESTIONS_PER_QUIZ = 10;

export interface QuizQuestion {
  id: string;
  sourceLessonSlug: string;
  prompt: string;
  codeLabel?: string;
  code?: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
}
