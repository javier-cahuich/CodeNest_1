import type { FlashcardProgressKey } from "@/data/flashcards/content";

type LegacyCard = {
  cardId: string;
  title: string;
  replacementId: string | null;
  reason: string;
};

// An editorial, one-to-one correspondence. Never infer identity from a title or position.
// null means the saved row remains historical; it is not reassigned to a different concept.
export const legacyFlashcards: Record<string, LegacyCard[]> = {
  variables: [
    {
      cardId: "variables-1",
      title: "Qué es una variable",
      replacementId: "fp-variable",
      reason: "Mismo concepto de almacenamiento mediante una variable.",
    },
    {
      cardId: "variables-2",
      title: "Asignar datos",
      replacementId: "fp-asignacion",
      reason: "Misma operación de guardar un valor en una variable.",
    },
    {
      cardId: "variables-3",
      title: "Nombres claros",
      replacementId: "fp-nombre-descriptivo",
      reason: "Mismo uso de nombres que explican el dato.",
    },
    {
      cardId: "variables-4",
      title: "Cambios de valor",
      replacementId: "fp-reasignacion",
      reason: "Misma sustitución del valor de una variable.",
    },
    {
      cardId: "variables-5",
      title: "Usar variables",
      replacementId: null,
      reason:
        "Consejo general sobre reutilización; no equivale específicamente a consultar, declarar o inicializar.",
    },
  ],
  "tipos-de-datos": [
    {
      cardId: "tipos-de-datos-1",
      title: "Texto",
      replacementId: "fp-cadena-texto",
      reason: "Mismo concepto de cadena de caracteres.",
    },
    {
      cardId: "tipos-de-datos-2",
      title: "Números",
      replacementId: "js-number",
      reason:
        "La tarjeta original usa Number de JavaScript; no se transfiere a entero o decimal por separado.",
    },
    {
      cardId: "tipos-de-datos-3",
      title: "Booleanos",
      replacementId: "fp-booleano",
      reason: "Mismo tipo de dos valores lógicos.",
    },
    {
      cardId: "tipos-de-datos-4",
      title: "Detectar el tipo",
      replacementId: null,
      reason: "typeof no forma parte de las lecciones actuales.",
    },
    {
      cardId: "tipos-de-datos-5",
      title: "Elegir el tipo correcto",
      replacementId: null,
      reason: "Consejo general; no acredita un tipo de dato específico.",
    },
  ],
  condicionales: [
    {
      cardId: "condicionales-1",
      title: "Tomar decisiones",
      replacementId: "fp-if",
      reason: "Misma condición simple y ejemplo if.",
    },
    {
      cardId: "condicionales-2",
      title: "Ruta alternativa",
      replacementId: "fp-if-else",
      reason: "Misma alternativa con else.",
    },
    {
      cardId: "condicionales-3",
      title: "Comparaciones",
      replacementId: "fp-comparacion",
      reason: "Misma comparación de valores con resultado booleano.",
    },
    {
      cardId: "condicionales-4",
      title: "Varias reglas",
      replacementId: "fp-else-if",
      reason: "Misma cadena de condiciones else if.",
    },
    {
      cardId: "condicionales-5",
      title: "Condicional con intención",
      replacementId: null,
      reason: "Consejo de legibilidad; no corresponde a una estructura concreta del nuevo mazo.",
    },
  ],
  bucles: [
    {
      cardId: "bucles-1",
      title: "Repetir una tarea",
      replacementId: "fp-bucle",
      reason: "Mismo concepto general de repetición.",
    },
    {
      cardId: "bucles-2",
      title: "Controlar el final",
      replacementId: "fp-condicion-parada",
      reason: "Misma necesidad de una condición de terminación.",
    },
    {
      cardId: "bucles-3",
      title: "Recorrer listas",
      replacementId: "js-for-of",
      reason: "Se conserva el recorrido de valores con for...of mostrado en el ejemplo original.",
    },
    {
      cardId: "bucles-4",
      title: "Cambios por iteración",
      replacementId: "fp-incremento",
      reason: "El ejemplo original aumenta el contador exactamente en una unidad.",
    },
    {
      cardId: "bucles-5",
      title: "Uso consciente",
      replacementId: null,
      reason: "Consejo general de uso; no acredita otro tipo concreto de bucle.",
    },
  ],
  funciones: [
    {
      cardId: "funciones-1",
      title: "Bloques reutilizables",
      replacementId: "js-funcion",
      reason: "Mismo concepto de función reutilizable.",
    },
    {
      cardId: "funciones-2",
      title: "Recibir datos",
      replacementId: "js-parametro",
      reason: "Mismo concepto de parámetro de entrada.",
    },
    {
      cardId: "funciones-3",
      title: "Devolver resultados",
      replacementId: "js-return",
      reason: "Mismo retorno con return.",
    },
    {
      cardId: "funciones-4",
      title: "Funciones con intención",
      replacementId: null,
      reason: "Responsabilidad única no tiene tarjeta equivalente entre las 15 seleccionadas.",
    },
    {
      cardId: "funciones-5",
      title: "Reutilizar mejor",
      replacementId: null,
      reason: "Consejo general; no se fusiona con la clasificación independiente de Función.",
    },
  ],
  arreglos: [
    {
      cardId: "arreglos-1",
      title: "Listas ordenadas",
      replacementId: "fp-vector",
      reason: "Misma lista de una dimensión con valores ordenados.",
    },
    {
      cardId: "arreglos-2",
      title: "Posición de un dato",
      replacementId: "fp-indice",
      reason: "Mismo índice base cero.",
    },
    {
      cardId: "arreglos-3",
      title: "Agregar elementos",
      replacementId: "fp-push",
      reason: "Misma operación push al final del arreglo.",
    },
    {
      cardId: "arreglos-4",
      title: "Recorrer arreglos",
      replacementId: "fp-recorrido-vector",
      reason: "Misma visita de elementos para procesar una lista.",
    },
    {
      cardId: "arreglos-5",
      title: "Aplicación real",
      replacementId: null,
      reason: "Ejemplos de uso generales sin un concepto equivalente seleccionado.",
    },
  ],
  objetos: [
    {
      cardId: "objetos-1",
      title: "Datos agrupados",
      replacementId: "js-objeto",
      reason: "Misma entidad con propiedades.",
    },
    {
      cardId: "objetos-2",
      title: "Propiedades",
      replacementId: "js-propiedad",
      reason: "Mismo dato identificado por clave.",
    },
    {
      cardId: "objetos-3",
      title: "Actualizar campos",
      replacementId: null,
      reason: "La actualización de propiedades no se enseña en la lección actual de objetos.",
    },
    {
      cardId: "objetos-4",
      title: "Objetos y listas",
      replacementId: "js-arreglo-objetos",
      reason: "Misma colección de objetos.",
    },
    {
      cardId: "objetos-5",
      title: "Modelar entidades",
      replacementId: null,
      reason: "Consejo de modelado; no se fusiona con la tarjeta independiente Objeto.",
    },
  ],
  "manejo-de-errores": [
    {
      cardId: "manejo-de-errores-1",
      title: "Prever fallos",
      replacementId: null,
      reason: "Sin lección equivalente de manejo de errores.",
    },
    {
      cardId: "manejo-de-errores-2",
      title: "try y catch",
      replacementId: null,
      reason: "try/catch no se enseña en las lecciones actuales.",
    },
    {
      cardId: "manejo-de-errores-3",
      title: "Mensajes claros",
      replacementId: null,
      reason: "El ejemplo catch no corresponde al contenido actual.",
    },
    {
      cardId: "manejo-de-errores-4",
      title: "Validar antes",
      replacementId: null,
      reason: "La validación genérica no equivale a una cláusula de guarda con retorno anticipado.",
    },
    {
      cardId: "manejo-de-errores-5",
      title: "Experiencia estable",
      replacementId: null,
      reason: "Consejo general sin concepto equivalente en las lecciones.",
    },
  ],
};

export function isLegacyFlashcardTopic(topicSlug: string) {
  return Object.prototype.hasOwnProperty.call(legacyFlashcards, topicSlug);
}

export function getLegacyProgressKey(cardId: string): FlashcardProgressKey | undefined {
  for (const [topicSlug, cards] of Object.entries(legacyFlashcards)) {
    const previous = cards.find((card) => card.replacementId === cardId);
    if (previous) return { topicSlug, cardId: previous.cardId };
  }
  return undefined;
}
