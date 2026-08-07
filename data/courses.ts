import type { IconName } from "@/lib/icons/LucideIcon";
import type { ModuleTone } from "@/data/codenest-modules";

export type CourseId = "fundamentos-programacion" | "fundamentos-javascript" | "poo-javascript";

export interface Course {
  id: CourseId;
  title: string;
  shortTitle: string;
  description: string;
  icon: IconName;
  tone: ModuleTone;
  hasContent: boolean;
}

export const courses: Course[] = [
  {
    id: "fundamentos-programacion",
    title: "Fundamentos de programación",
    shortTitle: "Fundamentos de programación",
    description: "Conceptos esenciales del pensamiento computacional.",
    icon: "Cpu",
    tone: "emerald",
    hasContent: true,
  },
  {
    id: "fundamentos-javascript",
    title: "Fundamentos de JavaScript",
    shortTitle: "Fundamentos de JavaScript",
    description: "Variables, condicionales, bucles, funciones y más.",
    icon: "Braces",
    tone: "amber",
    hasContent: true,
  },
  {
    id: "poo-javascript",
    title: "Programación orientada a objetos con JS",
    shortTitle: "POO con JavaScript",
    description: "Clases, objetos, herencia y encapsulamiento en JS.",
    icon: "Boxes",
    tone: "violet",
    hasContent: false,
  },
];

export function getCourseById(id: CourseId): Course | undefined {
  return courses.find((course) => course.id === id);
}

export const DEFAULT_COURSE_ID: CourseId = "fundamentos-programacion";
