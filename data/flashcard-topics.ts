import { getModulesByCourseId } from "@/data/codenest-modules";
import { getCourseModuleSections } from "@/data/course-module-sections";
import { courses, type CourseId } from "@/data/courses";

export interface FlashcardTopic {
  slug: string;
  title: string;
  description: string;
  courseId: CourseId;
  courseTitle: string;
  sectionId: string;
  lessonSlugs: string[];
}

export function flashcardDeckSlug(courseId: CourseId, sectionId: string) {
  return `${courseId}--${sectionId}`;
}

const sectionDescriptions: Record<string, string> = {
  "basic-concepts": "Algoritmos, diagramas de flujo, pseudocódigo y partes de un programa.",
  "variables-and-types": "Variables, constantes, asignaciones, tipos de datos y estados booleanos.",
  operators: "Cálculos, asignaciones, comparaciones y operadores lógicos.",
  "control-structures": "Condicionales, bucles y control de la ejecución.",
  "data-structures": "Vectores, búsquedas, transformaciones y matrices.",
  lessons: "Variables, condicionales, bucles, funciones, arreglos y objetos en JavaScript.",
};

// The course sections used by Home are also the source of deck names, order and membership.
export const flashcardTopics: FlashcardTopic[] = courses.flatMap((course) => {
  if (!course.hasContent) return [];
  return getCourseModuleSections(course.id, getModulesByCourseId(course.id)).map((section) => ({
    slug: flashcardDeckSlug(course.id, section.id),
    title: section.title,
    description: sectionDescriptions[section.id] ?? `Repasa los conceptos de ${section.title}.`,
    courseId: course.id,
    courseTitle: course.title,
    sectionId: section.id,
    lessonSlugs: section.data.map((lesson) => lesson.slug),
  }));
});

export function getFlashcardTopicsByCourseId(courseId: CourseId) {
  return flashcardTopics.filter((topic) => topic.courseId === courseId);
}
