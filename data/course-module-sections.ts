import type { LearningModule } from "@/data/codenest-modules";
import type { CourseId } from "@/data/courses";

type ModuleSectionDefinition = {
  id: string;
  title: string;
  moduleSlugs: string[];
};

export type CourseModuleSection = {
  id: string;
  title: string;
  data: LearningModule[];
};

const fundamentalsProgrammingSections: ModuleSectionDefinition[] = [
  {
    id: "basic-concepts",
    title: "Conceptos básicos",
    moduleSlugs: [
      "que-es-un-algoritmo",
      "representacion-algoritmos-diagramas-flujo",
      "representacion-algoritmos-pseudocodigo",
      "estructura-de-un-programa",
    ],
  },
  {
    id: "variables-and-types",
    title: "Variables y tipos",
    moduleSlugs: [
      "variables-y-constantes",
      "uso-de-variables-y-constantes",
      "tipos-de-datos",
      "uso-tipo-dato-booleano",
    ],
  },
  {
    id: "operators",
    title: "Operadores",
    moduleSlugs: [
      "operadores",
      "operadores-aritmeticos",
      "operadores-asignacion",
      "operadores-comparacion",
      "operadores-logicos",
    ],
  },
  {
    id: "control-structures",
    title: "Estructuras de control",
    moduleSlugs: [
      "estructuras-control-condicionales",
      "condicionales-a-profundidad",
      "estructuras-control-bucles",
    ],
  },
  {
    id: "data-structures",
    title: "Estructuras de datos",
    moduleSlugs: [
      "estructuras-datos-arreglos",
      "arreglos-unidimensionales-vectores",
      "arreglos-bidimensionales-matrices",
    ],
  },
];

export function getCourseModuleSections(
  courseId: CourseId,
  modules: LearningModule[],
): CourseModuleSection[] {
  if (courseId !== "fundamentos-programacion") {
    return modules.length > 0
      ? [
          {
            id: "lessons",
            title: "Lecciones",
            data: modules,
          },
        ]
      : [];
  }

  const modulesBySlug = new Map(modules.map((module) => [module.slug, module]));

  return fundamentalsProgrammingSections
    .map((section) => ({
      id: section.id,
      title: section.title,
      data: section.moduleSlugs.flatMap((slug) => {
        const module = modulesBySlug.get(slug);
        return module ? [module] : [];
      }),
    }))
    .filter((section) => section.data.length > 0);
}
