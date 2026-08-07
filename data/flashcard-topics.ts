export interface FlashcardTopic {
  slug: string;
  title: string;
  description: string;
}

export const flashcardTopics: FlashcardTopic[] = [
  {
    slug: "variables",
    title: "Variables",
    description: "Cómo guardar valores y reutilizarlos dentro de un programa.",
  },
  {
    slug: "tipos-de-datos",
    title: "Tipos de datos",
    description: "Texto, números y booleanos para representar información básica.",
  },
  {
    slug: "condicionales",
    title: "Condicionales",
    description: "Decisiones que cambian el flujo según una condición.",
  },
  {
    slug: "bucles",
    title: "Bucles",
    description: "Repeticiones controladas para automatizar tareas.",
  },
  {
    slug: "funciones",
    title: "Funciones",
    description: "Bloques reutilizables para organizar mejor la lógica.",
  },
  {
    slug: "arreglos",
    title: "Arreglos",
    description: "Listas ordenadas para trabajar con varios elementos.",
  },
  {
    slug: "objetos",
    title: "Objetos",
    description: "Estructuras con propiedades para describir entidades.",
  },
  {
    slug: "manejo-de-errores",
    title: "Manejo de errores",
    description: "Formas básicas de anticipar fallos y responder correctamente.",
  },
];
