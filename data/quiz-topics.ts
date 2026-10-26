import { getModulesByCourseId } from "@/data/codenest-modules";
import { getCourseModuleSections } from "@/data/course-module-sections";
import { courses, type CourseId } from "@/data/courses";
import { basicConceptQuestions } from "@/data/quizzes/basic-concepts";
import { controlStructureQuestions } from "@/data/quizzes/control-structures";
import { dataStructureQuestions } from "@/data/quizzes/data-structures";
import { javascriptLessonQuestions } from "@/data/quizzes/javascript-lessons";
import { operatorQuestions } from "@/data/quizzes/operators";
import { QUESTIONS_PER_QUIZ, type QuizQuestion } from "@/data/quizzes/types";
import { variableTypeQuestions } from "@/data/quizzes/variables-and-types";

export type { QuizQuestion } from "@/data/quizzes/types";

export interface QuizTopic {
  slug: string;
  title: string;
  description: string;
  courseId: CourseId;
  courseTitle: string;
  sectionId: string;
  lessonSlugs: string[];
}

export interface QuizTopicSession {
  topicSlug: string;
  topicTitle: string;
  questions: QuizQuestion[];
}

const sectionDescriptions: Record<string, string> = {
  "basic-concepts": "Algoritmos, diagramas de flujo, pseudocódigo y estructura de programas.",
  "variables-and-types": "Variables, constantes, tipos de datos y estados booleanos.",
  operators: "Cálculos, asignaciones, comparaciones y expresiones lógicas.",
  "control-structures": "Decisiones, ciclos y control preciso de la ejecución.",
  "data-structures": "Arreglos, vectores, transformaciones y matrices.",
  lessons: "Variables, condicionales, bucles, funciones, arreglos y objetos en JavaScript.",
};

export function quizTopicSlug(courseId: CourseId, sectionId: string) {
  return `${courseId}--${sectionId}`;
}

// Course sections are the source of truth for quiz names, order and lesson membership.
export const quizTopics: QuizTopic[] = courses.flatMap((course) => {
  if (!course.hasContent) return [];

  return getCourseModuleSections(course.id, getModulesByCourseId(course.id)).map((section) => ({
    slug: quizTopicSlug(course.id, section.id),
    title: section.title,
    description:
      sectionDescriptions[section.id] ?? `Comprueba lo aprendido en ${section.title}.`,
    courseId: course.id,
    courseTitle: course.title,
    sectionId: section.id,
    lessonSlugs: section.data.map((lesson) => lesson.slug),
  }));
});

const questionsByTopic: Record<string, QuizQuestion[]> = {
  [quizTopicSlug("fundamentos-programacion", "basic-concepts")]: basicConceptQuestions,
  [quizTopicSlug("fundamentos-programacion", "variables-and-types")]: variableTypeQuestions,
  [quizTopicSlug("fundamentos-programacion", "operators")]: operatorQuestions,
  [quizTopicSlug("fundamentos-programacion", "control-structures")]:
    controlStructureQuestions,
  [quizTopicSlug("fundamentos-programacion", "data-structures")]: dataStructureQuestions,
  [quizTopicSlug("fundamentos-javascript", "lessons")]: javascriptLessonQuestions,
};

function buildQuizTopic(topic: QuizTopic): QuizTopicSession {
  const questions = questionsByTopic[topic.slug] ?? [];

  if (questions.length !== QUESTIONS_PER_QUIZ) {
    throw new Error(
      `Quiz topic "${topic.slug}" must contain exactly ${QUESTIONS_PER_QUIZ} questions.`,
    );
  }

  if (new Set(questions.map((question) => question.id)).size !== questions.length) {
    throw new Error(`Quiz topic "${topic.slug}" must define unique stable question IDs.`);
  }

  for (const question of questions) {
    if (!topic.lessonSlugs.includes(question.sourceLessonSlug)) {
      throw new Error(
        `Question "${question.id}" references a lesson outside quiz topic "${topic.slug}".`,
      );
    }
    if (question.correctOptionIndex < 0 || question.correctOptionIndex >= question.options.length) {
      throw new Error(`Question "${question.id}" has an invalid correct option.`);
    }
  }

  return {
    topicSlug: topic.slug,
    topicTitle: topic.title,
    questions,
  };
}

export const quizTopicSessions = quizTopics.map(buildQuizTopic);

const allQuestionIds = quizTopicSessions.flatMap((topic) =>
  topic.questions.map((question) => question.id),
);
if (new Set(allQuestionIds).size !== allQuestionIds.length) {
  throw new Error("Quiz question IDs must be unique across the complete catalog.");
}

export function getQuizTopicsByCourseId(courseId: CourseId) {
  return quizTopics.filter((topic) => topic.courseId === courseId);
}

export function getQuizTopicSession(topicSlug: string) {
  return quizTopicSessions.find((topic) => topic.topicSlug === topicSlug);
}
