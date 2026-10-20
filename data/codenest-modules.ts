import type { CourseId } from "@/data/courses";
import type { IconName } from "@/lib/icons/LucideIcon";

export type ModuleTone = "cyan" | "amber" | "emerald" | "violet" | "rose";
export type ModuleLevel = "Inicial" | "Intermedio";
export type ModuleEvaluationMode = "mastery" | "graded";

export type CodeSnippet = {
  label: string;
  content: string;
};

export type TheoryBullet = {
  bold: string;
  text: string;
};

export type TheoryTable = {
  headers: string[];
  rows: string[][];
};

export type TheoryCallout = {
  icon: IconName;
  title: string;
  description: string;
};

export type QuizOption = {
  id: string;
  label: string;
};

export type MatchingPair = {
  id: string;
  left: string;
  right: string;
};

export type ChoiceSetQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation?: string;
};

export type BlockPuzzleItem = {
  id: string;
  text: string;
};

export type LessonStep =
  | {
      kind: "concept";
      eyebrow: string;
      title: string;
      paragraphs: string[];
      code: CodeSnippet;
    }
  | {
      kind: "theory";
      eyebrow: string;
      title: string;
      description?: string;
      bullets?: TheoryBullet[];
      table?: TheoryTable;
      callouts?: TheoryCallout[];
    }
  | {
      kind: "codeExample";
      eyebrow: string;
      title: string;
      description: string;
      code: CodeSnippet;
      notes?: string[];
    }
  | {
      kind: "imagePlaceholder";
      eyebrow: string;
      title: string;
      description: string;
      placeholderLabel: string;
      note: string;
      icon: IconName;
      customComponent?:
        | "flowchartSimulation"
        | "triangleFlowchart"
        | "conditionalFlowchart"
        | "multiConditionalFlowchart";
    }
  | {
      kind: "practice";
      eyebrow: string;
      title: string;
      explanation: string;
      code?: CodeSnippet;
      question: string;
      options: QuizOption[];
      correctId: string;
      answerExplanation: string;
    }
  | {
      kind: "tip";
      eyebrow: string;
      title: string;
      body: string;
      icon: IconName;
      variant: "tip" | "warning";
    }
  | {
      kind: "quiz";
      eyebrow: string;
      question: string;
      prompt?: string;
      code?: CodeSnippet;
      options: QuizOption[];
      correctId: string;
      explanation: string;
    }
  | {
      kind: "matching";
      eyebrow: string;
      title: string;
      instructions: string;
      pairs: MatchingPair[];
      explanation: string;
    }
  | {
      kind: "choiceSet";
      eyebrow: string;
      title: string;
      instructions: string;
      questions: ChoiceSetQuestion[];
      explanation: string;
    }
  | {
      kind: "blockPuzzle";
      eyebrow: string;
      title: string;
      instructions: string;
      blocks: BlockPuzzleItem[];
      correctOrder: string[];
      explanation: string;
    }
  | {
      kind: "blank";
      eyebrow: string;
      title: string;
      message: string;
      icon: IconName;
    }
  | {
      kind: "recap";
      eyebrow: string;
      title: string;
      takeaways: string[];
    }
  | {
      kind: "completion";
      eyebrow: string;
      title: string;
      message: string;
    }
  | {
      kind: "feedback";
      eyebrow: string;
      title: string;
      message: string;
    };

export interface LearningModule {
  courseId: CourseId;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: ModuleLevel;
  icon: IconName;
  tone: ModuleTone;
  steps: LessonStep[];
  evaluationMode?: ModuleEvaluationMode;
  nextSlug?: string;
}

export type LearningStats = {
  currentStreak: string;
  completedModules: number;
  totalModules: number;
  nextFocus: string;
};

const algoritmosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Introducción · 1 de 12",
    title: "¿Qué es un algoritmo?",
    paragraphs: [
      "Imagínate que quieres preparar una taza de café por la mañana. El proceso siempre es el mismo: caminas a la cocina, pones agua a calentar, colocas el filtro, agregas el café, viertes el agua caliente y lo sirves.",
      "Sin saberlo, acabas de ejecutar un **algoritmo**.",
    ],
    code: {
      label: "Algoritmo: preparar café",
      content: `INICIO\n1. Caminar a la cocina\n2. Poner agua a calentar\n3. Colocar el filtro\n4. Agregar el café\n5. Verter el agua caliente\n6. Servir el café\nFIN`,
    },
  },
  {
    kind: "concept",
    eyebrow: "Definición · 2 de 12",
    title: "Definición",
    paragraphs: [
      "En el mundo de la informática, un **algoritmo** es simplemente una secuencia de pasos **ordenados**, **lógicos** y **finitos** que se siguen para resolver un problema o cumplir un objetivo.",
    ],
    code: {
      label: "Algoritmo: sumar dos números",
      content: `INICIO\n1. Recibir el primer número\n2. Recibir el segundo número\n3. Sumar ambos números\n4. Mostrar el resultado\nFIN`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Partes · 3 de 12",
    title: "Partes de un algoritmo",
    description:
      "Todo algoritmo, desde el más simple hasta el que usa Netflix para recomendarte una serie, tiene la misma estructura:",
    bullets: [
      { bold: "Entrada (Input):", text: "son los datos que necesitas para empezar." },
      { bold: "Proceso:", text: "son los pasos lógicos que transforman la entrada." },
      { bold: "Salida (Output):", text: "el resultado final que obtienes." },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Características · 4 de 12",
    title: "Características",
    description:
      "Para que una computadora (o un humano) pueda entender y ejecutar un algoritmo sin errores, este debe cumplir con cuatro condiciones:",
    bullets: [
      { bold: "Preciso:", text: "cada paso debe estar claramente definido." },
      { bold: "Ordenado:", text: "los pasos deben seguir una secuencia lógica." },
      { bold: "Finito:", text: "debe terminar después de un número determinado de pasos." },
      {
        bold: "Eficiente:",
        text: "idealmente debe resolver el problema utilizando la menor cantidad posible de recursos.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo 1 · 5 de 12",
    title: "Ejemplo 1: Preparar un sándwich",
    description:
      "Los algoritmos no viven solo dentro de una app. Un proceso cotidiano también puede expresarse como una secuencia clara de instrucciones.",
    code: {
      label: "Pseudocódigo",
      content: `INICIO\n1. Tomar dos rebanadas de pan\n2. Colocar jamón y queso entre ellas\n3. Cerrar el sándwich\n4. Servir\nFIN`,
    },
    notes: [
      "Si cambias el orden de los pasos, el resultado puede salir mal.",
      "El objetivo es que cualquier persona pueda repetir el proceso sin dudas.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo 2 · 6 de 12",
    title: "Ejemplo 2: Calcular el promedio de tres notas",
    description:
      "En programación los algoritmos reciben datos, los procesan y entregan una respuesta concreta.",
    code: {
      label: "Pseudocódigo",
      content: `INICIO\n1. Leer nota1, nota2 y nota3\n2. Sumar nota1 + nota2 + nota3\n3. Dividir el total entre 3\n4. Mostrar el promedio\nFIN`,
    },
    notes: ["La entrada son las tres notas.", "La salida es el promedio calculado al final."],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 7 de 12",
    question: "¿Cuál describe mejor qué es un algoritmo?",
    options: [
      { id: "a", label: "Un lenguaje de programación como JavaScript." },
      { id: "b", label: "Una serie ordenada de pasos para resolver un problema." },
      { id: "c", label: "Un programa que siempre usa pantallas y botones." },
      { id: "d", label: "Una lista de palabras técnicas." },
    ],
    correctId: "b",
    explanation:
      "Un algoritmo es un conjunto ordenado de pasos para resolver un problema. No es solo código ni una respuesta improvisada.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 8 de 12",
    question: "¿Cuál es la estructura básica más común de un algoritmo?",
    options: [
      { id: "a", label: "Entrada -> salida -> proceso" },
      { id: "b", label: "Proceso -> entrada -> salida" },
      { id: "c", label: "Entrada -> proceso -> salida" },
      { id: "d", label: "Inicio -> error -> final" },
    ],
    correctId: "c",
    explanation:
      "Primero el algoritmo recibe datos de entrada, luego los procesa y finalmente produce una salida.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 9 de 12",
    question:
      "¿Qué característica debe cumplir un algoritmo para no quedarse ejecutándose para siempre?",
    options: [
      { id: "a", label: "Ser decorativo." },
      { id: "b", label: "Ser finito." },
      { id: "c", label: "Tener muchas variables." },
      { id: "d", label: "Usar colores llamativos." },
    ],
    correctId: "b",
    explanation:
      "Un algoritmo debe ser finito, es decir, terminar después de una cantidad limitada de pasos.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 4 · 10 de 12",
    question: "Observa el algoritmo. ¿Cuál es la salida?",
    code: {
      label: "Pseudocódigo",
      content: `INICIO\n1. Leer largo y ancho\n2. area = largo * ancho\n3. Mostrar area\nFIN`,
    },
    options: [
      { id: "a", label: "El valor de largo." },
      { id: "b", label: "El valor de ancho." },
      { id: "c", label: "El valor de area." },
      { id: "d", label: "La multiplicación en sí misma." },
    ],
    correctId: "c",
    explanation:
      "La salida es el dato que se muestra al final del algoritmo. En este caso, el valor de area.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Resumen",
    takeaways: [
      "Un algoritmo es una secuencia de pasos ordenados, lógicos y finitos.",
      "Sirve para resolver un problema o cumplir un objetivo.",
      "Sus partes principales son entrada, proceso y salida.",
      "Debe ser preciso, ordenado, finito y eficiente.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 12 de 12",
    title: "Pantalla de retroalimentación",
    message:
      "Aquí puedes revisar tus aciertos, tus errores y tu puntaje final antes de cerrar la lección.",
  },
];

const representacionAlgoritmosSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 11",
    title: "Representación de algoritmos: diagramas de flujo",
    description:
      "Antes de escribir un programa, es fundamental planificar cómo se resolverá el problema. Los diagramas de flujo y el pseudocódigo permiten representar con claridad la lógica de un algoritmo antes de convertirlo en código.",
    bullets: [
      { bold: "Claridad:", text: "ayudan a visualizar el orden de los pasos antes de programar." },
      { bold: "Comunicación:", text: "facilitan explicar una solución a otras personas." },
      {
        bold: "Detección de errores:",
        text: "permiten encontrar pasos faltantes o decisiones confusas temprano.",
      },
      {
        bold: "Traducción a código:",
        text: "sirven como puente entre la idea y el programa final.",
      },
    ],
  },
  {
    kind: "imagePlaceholder",
    eyebrow: "Concepto · 2 de 11",
    title: "¿Qué es un diagrama de flujo?",
    description:
      "Un diagrama de flujo es la representación gráfica de un algoritmo. Se basa en símbolos para representar operaciones, y la secuencia de cada operación se establece mediante líneas que las interconectan.",
    placeholderLabel: "Diagrama interactivo",
    note: "Simulación del flujo de datos y procesos en un algoritmo.",
    icon: "GitBranch",
    customComponent: "flowchartSimulation",
  },
  {
    kind: "theory",
    eyebrow: "Simbología · 3 de 11",
    title: "Simbología",
    description:
      "Cada figura geométrica en un diagrama de flujo cumple una función estandarizada para describir las acciones de un algoritmo:",
    table: {
      headers: ["Figura", "Nombre", "¿Que representa?"],
      rows: [
        ["1.inicio-fin", "inicio/fin", "El inicio y final de un proceso"],
        [
          "2.entradaSalidad",
          "entrada/Salida",
          "La lectura de datos en la entrada y la impresion de datos en la salida",
        ],
        ["3.proceso", "proceso", "Cualquier tipo de operacion"],
        ["4.decicion", "desicion", "un punto donde se debe tomar una elección."],
      ],
    },
  },
  {
    kind: "imagePlaceholder",
    eyebrow: "Ejemplo · 4 de 11",
    title: "Algoritmo de ejemplo",
    description:
      "A continuación se muestra el diagrama de flujo para calcular el área de un triángulo.",
    placeholderLabel: "Diagrama del área de un triángulo",
    note: "Flujo paso a paso para el cálculo del área utilizando entrada, proceso y salida.",
    icon: "GitBranch",
    customComponent: "triangleFlowchart",
  },
  {
    kind: "codeExample",
    eyebrow: "Pseudocódigo · 5 de 11",
    title: "Equivalencia en pseudocódigo",
    description: "El diagrama anterior es equivalente al siguiente pseudocódigo:",
    code: {
      label: "Algoritmo CalcularAreaTriangulo",
      content: `Algoritmo CalcularAreaTriangulo\n    // 1. Declaración de variables (Definir el tipo de datos)\n    Definir base, altura, area Como Real\n\n    // 2. Entrada de datos (paralelogramo del diagrama)\n    Escribir "Por favor, ingresa la base del triángulo:"\n    Leer base\n\n    Escribir "Por favor, ingresa la altura del triángulo:"\n    Leer altura\n\n    // 3. Proceso / Cálculo (Rectángulo del diagrama)\n    area <- (base * altura) / 2\n\n    // 4. Salida de datos (Equivale al paralelogramo final)\n    Escribir "El área del triángulo es: ", area\n\nFinAlgoritmo`,
    },
    notes: [
      "El pseudocódigo conserva la misma lógica del diagrama, pero la expresa con instrucciones escritas.",
      "Entrada, proceso y salida siguen apareciendo en el mismo orden.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 6 de 11",
    question: "¿Para qué se usa principalmente un diagrama de flujo?",
    options: [
      { id: "a", label: "Para decorar la documentación del programa." },
      { id: "b", label: "Para representar gráficamente la lógica de un algoritmo." },
      { id: "c", label: "Para reemplazar todos los lenguajes de programación." },
      { id: "d", label: "Para guardar datos en una base de datos." },
    ],
    correctId: "b",
    explanation:
      "Un diagrama de flujo representa gráficamente los pasos y decisiones de un algoritmo antes de escribir código.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 7 de 11",
    question: "En el ejemplo del área de un triángulo, ¿cuál es el proceso principal?",
    options: [
      { id: "a", label: "Leer la base." },
      { id: "b", label: "Leer la altura." },
      { id: "c", label: "Calcular area <- (base * altura) / 2." },
      { id: "d", label: "Mostrar el mensaje final." },
    ],
    correctId: "c",
    explanation:
      "El proceso transforma los datos de entrada. Aquí consiste en calcular el área usando base y altura.",
  },
  {
    kind: "matching",
    eyebrow: "Ejercicio 1 · 8 de 11",
    title: "Two-Column Card Matching",
    instructions: "Empareja los siguientes conceptos:",
    pairs: [
      { id: "leer", left: "Leer", right: "Capturar datos del usuario" },
      { id: "mostrar", left: "Mostrar", right: "Mostrar información en pantalla" },
      { id: "si-entonces", left: "SI...ENTONCES", right: "Tomar una decisión según una condición" },
      { id: "para", left: "PARA", right: "Repetir instrucciones varias veces" },
      { id: "asignacion", left: "←", right: "Asignar un valor a una variable" },
    ],
    explanation:
      "Cada palabra reservada o símbolo expresa una acción frecuente en pseudocódigo: entrada, salida, decisión, repetición o asignación.",
  },
  {
    kind: "blank",
    eyebrow: "Ejercicio 2 · 9 de 11",
    title: "Ejercicio 2",
    message: "Pantalla reservada para agregar el segundo ejercicio.",
    icon: "ClipboardPenLine",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 10 de 11",
    title: "Lo esencial de los diagramas de flujo",
    takeaways: [
      "Planificar antes de programar reduce errores y ordena la solución.",
      "Un diagrama de flujo representa un algoritmo con símbolos conectados por líneas.",
      "El pseudocódigo expresa la misma lógica con instrucciones escritas.",
      "Entrada, proceso y salida deben mantenerse claros en cualquier representación.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 11 de 11",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que entiendes cómo pasar de una idea a un diagrama y luego a pseudocódigo.",
  },
];

const pseudocodigoSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Introducción · 1 de 12",
    title: "Representación de algoritmos: pseudocódigo",
    paragraphs: [
      "Si el diagrama de flujo es la representación gráfica de un algoritmo, el **pseudocódigo** es su representación escrita.",
      'La palabra "pseudo" significa falso, por lo tanto, pseudocódigo significa literalmente "falso código". Es una forma de expresar los pasos de un algoritmo utilizando el lenguaje humano; en nuestro caso, español.',
    ],
    code: {
      label: "Idea central",
      content: `Diagrama de flujo -> dibujo de la lógica\nPseudocódigo -> escritura de la lógica`,
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Estructura · 2 de 12",
    title: "Estructura estándar",
    description:
      "Aunque no hay una regla mundial única para escribir pseudocódigo, la mayoría de los programadores y herramientas, como PSeInt, siguen una estructura similar.",
    code: {
      label: "Plantilla de pseudocódigo",
      content: `Algoritmo NombreDelPrograma\n    [1. Declarar Variables]\n    [2. Datos de Entrada]\n    [3. Procesamiento / Cálculos]\n    [4. Mostrar Resultados]\nFinAlgoritmo`,
    },
    notes: [
      "La primera línea nombra el algoritmo.",
      "Las instrucciones del centro describen qué debe hacer el programa.",
      "FinAlgoritmo marca que ya no quedan pasos por ejecutar.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Palabras clave · 3 de 12",
    title: "Palabras clave",
    description:
      "Para representar las acciones de los diagramas de flujo, el pseudocódigo utiliza palabras claras y fáciles de leer.",
    table: {
      headers: ["Acción en el diagrama", "Palabra en pseudocódigo", "¿Qué hace?"],
      rows: [
        [
          "Inicio / Fin (óvalo)",
          "Algoritmo / FinAlgoritmo",
          "Delimita dónde empieza y termina el programa.",
        ],
        [
          "Entrada (paralelogramo)",
          "Leer",
          "Detiene el programa y espera a que el usuario escriba un dato.",
        ],
        [
          "Salida (paralelogramo)",
          "Escribir o Mostrar",
          "Imprime un texto o un resultado en la pantalla.",
        ],
        [
          "Proceso (rectángulo)",
          "<- o =",
          "Asigna un valor o el resultado de un cálculo a una variable.",
        ],
        [
          "Decisión (rombo)",
          "Si ... Entonces ... Sino ... FinSi",
          "Evalúa una condición y divide el flujo en dos caminos.",
        ],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Variables · 4 de 12",
    title: "Variables y asignación",
    description:
      "Las variables permiten almacenar datos temporalmente durante la ejecución del algoritmo.",
    code: {
      label: "Asignación de valores",
      content: `INICIO\n    edad <- 20\n    nombre <- "Juan"\nFIN`,
    },
    notes: [
      "edad almacena el valor 20.",
      'nombre almacena el texto "Juan".',
      'El símbolo <- significa "asignar un valor".',
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo 1 · 5 de 12",
    title: "Número positivo, negativo o cero",
    description: "Problema: solicitar un número y determinar si es positivo, negativo o cero.",
    code: {
      label: "Pseudocódigo",
      content: `INICIO\n\n    Leer numero\n\n    SI numero > 0 ENTONCES\n        Mostrar "El número es positivo"\n    SINO\n        SI numero < 0 ENTONCES\n            Mostrar "El número es negativo"\n        SINO\n            Mostrar "El número es cero"\n        FIN SI\n    FIN SI\n\nFIN`,
    },
    notes: [
      "Leer obtiene el dato de entrada.",
      "La decisión separa el flujo según el valor del número.",
      "Solo uno de los tres mensajes se muestra al final.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo 2 · 6 de 12",
    title: "Promedio de tres calificaciones",
    description: "Problema: solicitar tres calificaciones y calcular el promedio.",
    code: {
      label: "Pseudocódigo",
      content: `Leer calificacion1\nLeer calificacion2\nLeer calificacion3\n\npromedio <- (calificacion1 + calificacion2 + calificacion3) / 3\n\nMostrar "Promedio: ", promedio`,
    },
    notes: [
      "Las tres calificaciones son datos de entrada.",
      "El promedio se obtiene con una operación aritmética.",
      "Mostrar entrega el resultado al usuario.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 7 de 12",
    question: "¿Qué representa el pseudocódigo dentro del diseño de algoritmos?",
    options: [
      { id: "a", label: "Una versión escrita y legible de los pasos del algoritmo." },
      { id: "b", label: "Un lenguaje que solo entiende una computadora." },
      { id: "c", label: "Un dibujo con símbolos conectados por flechas." },
      { id: "d", label: "Un archivo obligatorio para publicar una app." },
    ],
    correctId: "a",
    explanation:
      "El pseudocódigo describe los pasos del algoritmo con lenguaje humano, antes de llevarlo a un lenguaje de programación real.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 8 de 12",
    question: "¿Qué palabra clave se usa para pedir un dato al usuario?",
    options: [
      { id: "a", label: "Mostrar" },
      { id: "b", label: "Leer" },
      { id: "c", label: "FinAlgoritmo" },
      { id: "d", label: "Entonces" },
    ],
    correctId: "b",
    explanation:
      "Leer detiene el algoritmo para recibir un dato de entrada escrito por el usuario.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Ejercicio 1 · 9 de 12",
    title: "Ordena el algoritmo para calcular un promedio",
    instructions:
      "Reordena los bloques para que el algoritmo lea dos notas, calcule el promedio y muestre el resultado.",
    blocks: [
      { id: "inicio", text: "INICIO" },
      { id: "leer-1", text: "Leer nota1" },
      { id: "leer-2", text: "Leer nota2" },
      { id: "calcular", text: "promedio <- (nota1 + nota2) / 2" },
      { id: "mostrar", text: 'Mostrar "Promedio: ", promedio' },
      { id: "fin", text: "FIN" },
    ],
    correctOrder: ["inicio", "leer-1", "leer-2", "calcular", "mostrar", "fin"],
    explanation:
      "Primero se abre el algoritmo, luego se leen los datos, después se calcula el promedio y al final se muestra el resultado.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Ejercicio 2 · 10 de 12",
    title: "Ordena una decisión con Si...Entonces",
    instructions: "Acomoda los bloques para decidir si una persona puede entrar según su edad.",
    blocks: [
      { id: "inicio", text: "INICIO" },
      { id: "leer", text: "Leer edad" },
      { id: "si", text: "SI edad >= 18 ENTONCES" },
      { id: "mayor", text: 'Mostrar "Puede entrar"' },
      { id: "sino", text: "SINO" },
      { id: "menor", text: 'Mostrar "No puede entrar"' },
      { id: "fin-si", text: "FIN SI" },
      { id: "fin", text: "FIN" },
    ],
    correctOrder: ["inicio", "leer", "si", "mayor", "sino", "menor", "fin-si", "fin"],
    explanation:
      "La condición se evalúa después de leer la edad. Si se cumple, muestra el primer mensaje; si no, muestra el mensaje alternativo y cierra la decisión con FIN SI.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial del pseudocódigo",
    takeaways: [
      "El pseudocódigo representa un algoritmo por escrito usando lenguaje humano.",
      "Una estructura común empieza con Algoritmo y termina con FinAlgoritmo.",
      "Leer, Mostrar, asignar con <- y Si...Entonces ayudan a expresar entrada, salida, proceso y decisión.",
      "Ordenar correctamente los pasos hace que el algoritmo sea claro y fácil de convertir a código real.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 12 de 12",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas y ejercicios para confirmar que puedes leer, escribir y ordenar pseudocódigo básico.",
  },
];

const estructuraProgramaSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 15",
    title: "¿Qué es un programa?",
    description:
      "Un programa es un conjunto de instrucciones escritas en un lenguaje de programación. Esas instrucciones implementan uno o más algoritmos para que una computadora pueda ejecutarlos.",
    bullets: [
      { bold: "Librerías:", text: "herramientas externas que el programa puede usar." },
      {
        bold: "Declaración de datos:",
        text: "variables y constantes que reservan o nombran información.",
      },
      { bold: "Cuerpo:", text: "la sección principal donde se ejecuta el algoritmo." },
      { bold: "Subprogramas:", text: "bloques independientes que resuelven tareas específicas." },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Diferencia · 2 de 15",
    title: "¿Cuál es la diferencia con un algoritmo?",
    description:
      "La diferencia principal es que un algoritmo es la solución a un problema, mientras que un programa es la implementación de esa solución en un lenguaje de programación para que una computadora pueda ejecutarla.",
    code: {
      label: "Programa en JavaScript",
      content: `let base = 8;\nlet altura = 5;\n\nlet area = base * altura;\n\nconsole.log("El área es:", area);`,
    },
    notes: [
      "El algoritmo sería la idea: multiplicar base por altura para obtener el área.",
      "El programa es esa idea escrita con instrucciones reales que JavaScript puede ejecutar.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Librerías · 3 de 15",
    title: "Librerías",
    description:
      "Aquí le dices a la computadora qué herramientas externas vas a usar. Por ejemplo, si tu programa necesita calcular una raíz cuadrada, necesitas importar la librería matemática. Si necesita la fecha actual, importas la librería del reloj.",
    code: {
      label: "Importar una librería en Python",
      content: `import math`,
    },
    notes: [
      "Importar una librería evita escribir desde cero herramientas que ya existen.",
      "Después de importarla, el programa puede usar sus funciones cuando las necesite.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Datos · 4 de 15",
    title: "Declaración de datos",
    description:
      "Antes de hacer cálculos, la computadora necesita saber con qué elementos va a trabajar y apartar memoria RAM para ellos.",
    code: {
      label: "Ejemplo de constantes",
      content: `IVA = 0.16\nPI = 3.1416\nMAX_INTENTOS = 3`,
    },
    notes: [
      "Variables: espacios de memoria donde guardamos datos que pueden cambiar durante el programa, como puntuacion_jugador o correo_usuario.",
      "Constantes: datos fijos que no cambian durante el programa, como PI, IVA o el número máximo de intentos.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 5 de 15",
    question: "¿Cuál opción describe mejor una constante dentro de un programa?",
    options: [
      { id: "a", label: "Un dato fijo que no debería cambiar durante la ejecución." },
      { id: "b", label: "Una instrucción que siempre imprime texto en pantalla." },
      { id: "c", label: "Un bloque que se ejecuta fuera del cuerpo principal." },
      { id: "d", label: "Una librería matemática importada por el programa." },
    ],
    correctId: "a",
    explanation:
      "Una constante representa un valor fijo, como PI o IVA, que se mantiene igual mientras el programa se ejecuta.",
  },
  {
    kind: "theory",
    eyebrow: "Cuerpo · 6 de 15",
    title: "Cuerpo del programa",
    description:
      "Es el corazón del software. Aquí adentro vive el algoritmo. La computadora entra a esta sección y empieza a ejecutar las instrucciones línea por línea, de arriba hacia abajo.",
    bullets: [
      {
        bold: "Entrada de datos (input):",
        text: 'le pide información al usuario, por ejemplo: "Escribe tu nombre".',
      },
      {
        bold: "Proceso:",
        text: "realiza cálculos, toma decisiones con Si/Sino y repite tareas si hace falta.",
      },
      {
        bold: "Salida de datos (output):",
        text: 'muestra el resultado final, por ejemplo: "Bienvenido, Carlos".',
      },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Subprogramas · 7 de 15",
    title: "Subprogramas",
    description:
      'Son pequeños "bloques de código independientes" que se colocan fuera del cuerpo principal. Sirven para realizar tareas específicas que se repiten mucho, evitando que tengas que escribir el mismo código una y otra vez.',
    callouts: [
      {
        icon: "Calculator",
        title: "Ejemplo: calcular un descuento",
        description:
          "Puedes crear una función pequeña que solo sirva para calcular un descuento. Cada vez que el cuerpo principal la necesite, la llama, le pasa los datos, la función hace el cálculo y regresa el resultado.",
      },
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 8 de 15",
    question: "¿Para qué sirven principalmente los subprogramas?",
    options: [
      {
        id: "a",
        label: "Para repetir tareas específicas sin escribir el mismo código muchas veces.",
      },
      { id: "b", label: "Para borrar todas las variables antes de ejecutar el programa." },
      { id: "c", label: "Para reemplazar las librerías externas." },
      { id: "d", label: "Para que los comentarios sí sean ejecutados por la computadora." },
    ],
    correctId: "a",
    explanation:
      "Un subprograma agrupa una tarea específica, como calcular un descuento, y permite reutilizarla desde el cuerpo principal.",
  },
  {
    kind: "codeExample",
    eyebrow: "Comentarios · 9 de 15",
    title: "Comentarios en el código",
    description:
      "Los comentarios son notas, apuntes o explicaciones que el programador escribe directamente dentro del código, pero con un superpoder: la computadora los ignora por completo.",
    code: {
      label: "Comentarios de una línea",
      content: `// Esto es un comentario en JS\n# Esto es un comentario en Python`,
    },
    notes: [
      "En pseudocódigo, C++, Java y JavaScript se usan dos diagonales: //.",
      "En Python se usa el símbolo de almohadilla o hashtag: #.",
      "En JavaScript, C++ y Java, los comentarios multilínea se abren con /* y se cierran con */.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 10 de 15",
    title: "Ejemplo de un programa",
    description:
      "Este ejemplo está hecho en Python, un lenguaje de programación. Observa cómo se separan cabecera, declaración de datos y subprogramas.",
    code: {
      label: "Python · parte 1",
      content: `# CABECERA\nimport math  # Traemos la librería matemática\n\n# DECLARACIÓN DE DATOS\nMENSAJE_BIENVENIDA = "Bienvenido al calculador de círculos"\n\n# SUBPROGRAMAS\ndef calcular_area(radio):\n    resultado = math.pi * (radio ** 2)\n    return resultado`,
    },
    notes: [
      "import math carga la librería matemática.",
      "MENSAJE_BIENVENIDA es una constante de texto.",
      "calcular_area es un subprograma que recibe un radio y regresa el área.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 11 de 15",
    title: "Segunda parte del ejemplo",
    description:
      "Ahora aparece el cuerpo principal. Ahí se muestra el mensaje, se pide el radio, se llama al subprograma y se imprime el resultado.",
    code: {
      label: "Python · parte 2",
      content: `# CUERPO PRINCIPAL (Instrucciones)\ndef main():\n    print(MENSAJE_BIENVENIDA) # Salida\n\n    # Entrada de datos\n    radio_usuario = float(input("Introduce el radio del círculo en cm: "))\n\n    # Proceso (Llamamos a la función de la parte 4)\n    area_final = calcular_area(radio_usuario)\n\n    # Salida de datos\n    print("El área calculada es de:", area_final, "cm cuadrados")\n\n# Esto le indica a la computadora dónde iniciar la ejecución\nif __name__ == "__main__":\n    main()`,
    },
    notes: [
      "main contiene la secuencia principal del programa.",
      "input representa la entrada, calcular_area realiza el proceso y print muestra la salida.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 12 de 15",
    question: "En Python, ¿qué símbolo se usa para escribir un comentario de una sola línea?",
    options: [
      { id: "a", label: "#" },
      { id: "b", label: "//" },
      { id: "c", label: "/* */" },
      { id: "d", label: "<!-- -->" },
    ],
    correctId: "a",
    explanation:
      "Python usa # para comentarios de una línea. JavaScript, Java, C++ y pseudocódigo suelen usar //.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 4 · 13 de 15",
    question: "En el ejemplo de Python, ¿qué parte representa el cuerpo principal del programa?",
    options: [
      { id: "a", label: "La función main(), donde se ejecutan entrada, proceso y salida." },
      { id: "b", label: "La línea import math, porque carga una herramienta externa." },
      { id: "c", label: "La constante MENSAJE_BIENVENIDA." },
      { id: "d", label: "El comentario # CABECERA." },
    ],
    correctId: "a",
    explanation:
      "El cuerpo principal está en main(): ahí el programa muestra el mensaje, recibe el radio, llama a la función y entrega el resultado.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 14 de 15",
    title: "Lo esencial de la estructura de un programa",
    takeaways: [
      "Un programa implementa uno o más algoritmos en un lenguaje que la computadora puede ejecutar.",
      "Las librerías agregan herramientas externas listas para usar.",
      "La declaración de datos prepara variables y constantes antes de trabajar con ellas.",
      "El cuerpo principal ejecuta entrada, proceso y salida.",
      "Los subprogramas separan tareas repetibles y los comentarios explican el código sin ejecutarse.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 15 de 15",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que reconoces las partes de un programa y cómo se relacionan con un algoritmo.",
  },
];

const variablesConstantesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "¿Qué es una variable?",
    paragraphs: [
      "Una **variable** es un espacio de memoria, como una caja, al que se le asigna un nombre y que se utiliza para almacenar información que puede cambiar durante la ejecución del programa.",
      "Las variables permiten que un programa guarde información ingresada por el usuario, realice operaciones matemáticas, tome decisiones y mantenga datos mientras se ejecuta.",
    ],
    code: {
      label: "Variables en pseudocódigo",
      content: `nombre = "Ana"\nedad = 20\nprecio = 150.50`,
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Constantes · 2 de 12",
    title: "Constante",
    description:
      "Una constante es exactamente igual a una variable, un espacio de memoria con nombre, pero con una regla estricta: su valor no puede cambiar nunca una vez que el programa arranca. Es como meter un dato a la caja y ponerle un candado.",
    code: {
      label: "Ejemplo de constantes",
      content: `PI = 3.1416\nIVA = 0.16\nMAX_INTENTOS = 3`,
    },
    notes: [
      "PI representa un valor matemático fijo.",
      "IVA guarda un porcentaje que el programa reutiliza.",
      "MAX_INTENTOS limita cuántas veces puede repetirse una acción.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Comparación · 3 de 12",
    title: "Diferencias",
    description:
      "Variables y constantes se parecen porque ambas tienen nombre y guardan información, pero se usan con intenciones distintas.",
    table: {
      headers: ["Aspecto", "Variable", "Constante"],
      rows: [
        [
          "Cambio de valor",
          "Puede cambiar durante la ejecución.",
          "No debe cambiar después de iniciar el programa.",
        ],
        [
          "Uso común",
          "Datos ingresados, contadores, resultados temporales.",
          "Valores fijos como PI, IVA o límites.",
        ],
        ["Ejemplo", "edad = 20", "PI = 3.1416"],
        ["Idea mental", "Una caja que puedes abrir y actualizar.", "Una caja cerrada con candado."],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 12",
    question: "¿Cuál dato conviene guardar como constante?",
    options: [
      { id: "a", label: "El nombre que escribe un usuario en un formulario." },
      { id: "b", label: "El valor fijo de PI dentro de un cálculo." },
      { id: "c", label: "La puntuación de un jugador durante una partida." },
      { id: "d", label: "El precio ingresado por el usuario." },
    ],
    correctId: "b",
    explanation:
      "PI es un valor fijo, por eso conviene declararlo como constante. Los datos que pueden cambiar se guardan como variables.",
  },
  {
    kind: "theory",
    eyebrow: "Nombres · 5 de 12",
    title: "Reglas para nombrar variables y constantes",
    description:
      "Un buen nombre permite entender qué guarda el dato sin tener que adivinarlo. Estas reglas reducen errores y hacen que el programa sea más fácil de leer.",
    bullets: [
      {
        bold: "Usa nombres descriptivos:",
        text: "deben indicar claramente qué información almacenan.",
      },
      {
        bold: "No utilices espacios:",
        text: "une las palabras con un estilo claro, como camelCase.",
      },
      { bold: "Evita caracteres especiales:", text: "no uses acentos, símbolos ni la letra ñ." },
      {
        bold: "No uses palabras reservadas:",
        text: "evita nombres que el lenguaje ya usa para instrucciones propias.",
      },
      {
        bold: "Usa camelCase para variables:",
        text: "por ejemplo nombreUsuario o fechaNacimiento.",
      },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Resumen de buenas y malas prácticas",
    description:
      "Los nombres deben explicar el dato que guardan. También conviene mantener un solo estilo en todo el programa.",
    table: {
      headers: ["Buena práctica", "Mala práctica"],
      rows: [
        ["nombreUsuario", "x"],
        ["precioProducto", "dato1"],
        ["cantidadProductos", "cp"],
        ["esMayorEdad", "bandera"],
        ["const IVA = 0.16", "const x = 0.16"],
        ["Mantener un solo estilo (camelCase)", "Mezclar camelCase - snake_case y PascalCase"],
      ],
    },
    callouts: [
      {
        icon: "Lightbulb",
        title: "CamelCase",
        description:
          "Es una forma de escribir nombres donde varias palabras se unen sin espacios y cada palabra después de la primera inicia con mayúscula: nombreUsuario, fechaNacimiento.",
      },
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Ejercicio · 7 de 12",
    title: "Variable o constante",
    instructions:
      "Elige si cada dato debería definirse como variable o constante. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "edad-usuario",
        question: "¿Cómo debería definirse la edad de un usuario en una aplicación?",
        options: [
          { id: "constante", label: "A) Constante" },
          { id: "variable", label: "B) Variable" },
        ],
        correctId: "variable",
      },
      {
        id: "saldo-cuenta",
        question: "El saldo de una cuenta bancaria debe definirse como:",
        options: [
          { id: "variable", label: "A) Variable" },
          { id: "constante", label: "B) Constante" },
        ],
        correctId: "variable",
      },
      {
        id: "velocidad-luz",
        question: "La velocidad de la luz en el vacío debe definirse como:",
        options: [
          { id: "variable", label: "A) Variable" },
          { id: "constante", label: "B) Constante" },
        ],
        correctId: "constante",
      },
      {
        id: "temperatura-sensor",
        question: "La temperatura registrada por un sensor cada minuto debe definirse como:",
        options: [
          { id: "variable", label: "A) Variable" },
          { id: "constante", label: "B) Constante" },
        ],
        correctId: "variable",
      },
    ],
    explanation:
      "Los datos que pueden cambiar durante la ejecución son variables. Los valores fijos, como una constante física, se modelan como constantes.",
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 8 de 12",
    title: "Calcular precio final",
    description:
      "Este algoritmo usa una constante para el IVA y variables para guardar el precio, el impuesto y el total calculado.",
    code: {
      label: "Pseudocódigo",
      content: `Algoritmo CalcularPrecioFinal\n\n// Declaración de constante\nConstante IVA <- 0.16\n\n// Declaración de variables\nDefinir precio Como Real\nDefinir impuesto Como Real\nDefinir total Como Real\n\n// Entrada de datos\nEscribir "Ingrese el precio del producto:"\nLeer precio\n\n// Proceso\nimpuesto <- precio * IVA\ntotal <- precio + impuesto\n\n// Salida de datos\nEscribir "El precio final es: ", total\n\nFinAlgoritmo`,
    },
    notes: [
      "IVA no cambia durante el algoritmo, por eso es constante.",
      "precio, impuesto y total pueden variar según el producto calculado.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 9 de 12",
    question: "En el algoritmo CalcularPrecioFinal, ¿por qué IVA se declara como constante?",
    options: [
      { id: "a", label: "Porque es un valor fijo que se reutiliza en el cálculo." },
      { id: "b", label: "Porque el usuario debe escribirlo cada vez." },
      { id: "c", label: "Porque es el resultado final del algoritmo." },
      { id: "d", label: "Porque cambia después de calcular el impuesto." },
    ],
    correctId: "a",
    explanation:
      "IVA se declara como constante porque representa un porcentaje fijo que el algoritmo usa para calcular el impuesto.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 10 de 12",
    question: "¿Cuál nombre sigue mejor las reglas para una variable?",
    options: [
      { id: "a", label: "2precio" },
      { id: "b", label: "nombre usuario" },
      { id: "c", label: "cantidadProductos" },
      { id: "d", label: "añoActual" },
    ],
    correctId: "c",
    explanation:
      "cantidadProductos es descriptivo, no tiene espacios, no inicia con número, evita caracteres especiales y usa camelCase.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial de variables y constantes",
    takeaways: [
      "Una variable guarda información que puede cambiar mientras el programa se ejecuta.",
      "Una constante guarda información fija que no debe cambiar después de iniciar el programa.",
      "Los buenos nombres describen con claridad qué dato se está almacenando.",
      "Evita espacios, caracteres especiales, nombres que inicien con número y palabras reservadas.",
      "camelCase ayuda a escribir nombres legibles cuando necesitas unir varias palabras.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 12 de 12",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes distinguir variables, constantes y buenas prácticas de nombrado.",
  },
];

const usoVariablesConstantesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 13",
    title: "Del nombre al dato útil",
    paragraphs: [
      "Ya sabes distinguir una variable de una constante. Ahora aprenderás a **usarlas paso a paso** para que los datos entren al programa, se actualicen y produzcan un resultado.",
      "El primer paso es declarar el nombre y darle un valor inicial. A partir de ahí, el programa puede consultar ese valor o reemplazarlo cuando la situación cambie.",
    ],
    code: {
      label: "Declarar e inicializar",
      content: `Definir puntos Como Entero\npuntos <- 0\n\nConstante PUNTOS_POR_RETO <- 10`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Proceso · 2 de 13",
    title: "Cuatro acciones con un dato",
    description:
      "Una variable resulta útil cuando puedes seguir con claridad qué ocurre con su valor en cada instrucción.",
    table: {
      headers: ["Acción", "Qué hace", "Ejemplo"],
      rows: [
        ["Declarar", "Reserva un nombre para el dato.", "Definir puntos Como Entero"],
        ["Inicializar", "Asigna el primer valor.", "puntos <- 0"],
        ["Consultar", "Usa el valor actual sin cambiarlo.", "Escribir puntos"],
        ["Reasignar", "Sustituye el valor anterior por uno nuevo.", "puntos <- puntos + 10"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Seguimiento · 3 de 13",
    title: "El valor actual de una variable",
    description:
      "Cada reasignación parte del valor que la variable tiene en ese momento. El valor anterior se reemplaza, pero puede participar en el cálculo del nuevo.",
    code: {
      label: "Pseudocódigo",
      content: `puntos <- 0          // valor actual: 0\npuntos <- puntos + 10 // valor actual: 10\npuntos <- puntos + 5  // valor actual: 15\n\nEscribir puntos`,
    },
    notes: [
      "La expresión de la derecha se calcula primero.",
      "Después, el resultado se guarda nuevamente en puntos.",
      "Al final solo permanece el valor más reciente: 15.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 13",
    question: "¿Qué valor muestra este algoritmo?",
    code: {
      label: "Pseudocódigo",
      content: `vidas <- 3\nvidas <- vidas - 1\nvidas <- vidas + 2\nEscribir vidas`,
    },
    options: [
      { id: "a", label: "2" },
      { id: "b", label: "3" },
      { id: "c", label: "4" },
      { id: "d", label: "6" },
    ],
    correctId: "c",
    explanation:
      "vidas inicia en 3, baja a 2 y después aumenta a 4. Cada instrucción trabaja con el valor actualizado.",
  },
  {
    kind: "tip",
    eyebrow: "Prevención · 5 de 13",
    title: "Inicializa antes de usar",
    body: "Una variable sin valor inicial puede producir resultados impredecibles o errores. Los contadores suelen iniciar en 0; los acumuladores también, salvo que el problema indique otro punto de partida.",
    icon: "ShieldCheck",
    variant: "warning",
  },
  {
    kind: "codeExample",
    eyebrow: "Constantes · 6 de 13",
    title: "Evita los números mágicos",
    description:
      "Un número mágico aparece directamente en una operación sin explicar qué representa. Convertirlo en constante documenta la regla y permite reutilizarla sin inconsistencias.",
    code: {
      label: "Pseudocódigo claro",
      content: `Constante PUNTOS_POR_RETO <- 10\n\npuntos <- 20\npuntos <- puntos + PUNTOS_POR_RETO\n\nEscribir puntos`,
    },
    notes: [
      "PUNTOS_POR_RETO explica por qué se suman 10 puntos.",
      "Si la regla cambia, el valor se actualiza en un solo lugar.",
      "La variable puntos conserva el estado que sí cambia.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 7 de 13",
    question: "¿Cuál instrucción rompe la intención de una constante?",
    code: {
      label: "Pseudocódigo",
      content: `Constante LIMITE_INTENTOS <- 3\nintentosUsados <- 1`,
    },
    options: [
      { id: "a", label: "Escribir LIMITE_INTENTOS" },
      { id: "b", label: "intentosUsados <- intentosUsados + 1" },
      { id: "c", label: "intentosRestantes <- LIMITE_INTENTOS - intentosUsados" },
      { id: "d", label: "LIMITE_INTENTOS <- 5" },
    ],
    correctId: "d",
    explanation:
      "LIMITE_INTENTOS representa una regla fija y no debe reasignarse. Si debe cambiar durante la ejecución, entonces fue modelado con la categoría equivocada.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Ejercicio · 8 de 13",
    title: "Construye el seguimiento",
    instructions:
      "Elige la instrucción que cumple cada objetivo. Después, comprueba las tres respuestas.",
    questions: [
      {
        id: "iniciar-contador",
        question: "¿Cómo iniciarías un contador de visitas?",
        options: [
          { id: "a", label: "visitas <- 0" },
          { id: "b", label: "visitas <- visitas + 1" },
          { id: "c", label: "Constante visitas <- 0" },
        ],
        correctId: "a",
        explanation: "El contador necesita un valor inicial conocido antes de incrementarse.",
      },
      {
        id: "registrar-visita",
        question: "¿Cómo registrarías una nueva visita?",
        options: [
          { id: "a", label: "visitas <- 0" },
          { id: "b", label: "visitas <- visitas + 1" },
          { id: "c", label: "Escribir visitas + 1" },
        ],
        correctId: "b",
        explanation: "La reasignación guarda el nuevo total; escribirlo solamente lo mostraría.",
      },
      {
        id: "calcular-disponibles",
        question: "¿Cómo guardarías los lugares disponibles?",
        options: [
          { id: "a", label: "disponibles <- CUPO_MAXIMO - inscritos" },
          { id: "b", label: "CUPO_MAXIMO <- CUPO_MAXIMO - inscritos" },
          { id: "c", label: "inscritos <- CUPO_MAXIMO" },
        ],
        correctId: "a",
        explanation:
          "El resultado se guarda en una variable nueva sin modificar la regla fija CUPO_MAXIMO.",
      },
    ],
    explanation:
      "Inicializar establece el punto de partida, reasignar conserva un cambio y calcular un dato derivado mantiene intactas las constantes.",
  },
  {
    kind: "codeExample",
    eyebrow: "Caso aplicado · 9 de 13",
    title: "Seguimiento de una meta de ahorro",
    description:
      "Este algoritmo combina una meta fija, el estado actual del ahorro, una entrada nueva y dos resultados actualizados.",
    code: {
      label: "Pseudocódigo",
      content: `Algoritmo ActualizarAhorro\n\nConstante META_AHORRO <- 1000\n\nDefinir ahorroActual Como Real\nDefinir deposito Como Real\nDefinir faltante Como Real\n\nahorroActual <- 250\n\nEscribir "Ingrese el nuevo depósito:"\nLeer deposito\n\nahorroActual <- ahorroActual + deposito\nfaltante <- META_AHORRO - ahorroActual\n\nEscribir "Ahorro acumulado: ", ahorroActual\nEscribir "Falta para la meta: ", faltante\n\nFinAlgoritmo`,
    },
    notes: [
      "META_AHORRO no cambia durante la ejecución.",
      "deposito recibe el dato de entrada y ahorroActual conserva el nuevo estado.",
      "faltante es una variable derivada: se vuelve a calcular a partir de los valores actuales.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 10 de 13",
    question: "Si el depósito es de 200, ¿qué valores mostrará el algoritmo?",
    options: [
      { id: "a", label: "Ahorro acumulado: 200 · Falta: 800" },
      { id: "b", label: "Ahorro acumulado: 250 · Falta: 750" },
      { id: "c", label: "Ahorro acumulado: 450 · Falta: 550" },
      { id: "d", label: "Ahorro acumulado: 1000 · Falta: 0" },
    ],
    correctId: "c",
    explanation:
      "El ahorro pasa de 250 a 450 al sumar el depósito. Después, faltante se calcula como 1000 - 450, que da 550.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Ejercicio aplicado · 11 de 13",
    title: "Ordena el flujo de los datos",
    instructions:
      "Ordena las instrucciones para iniciar el ahorro, recibir un depósito, actualizar el total y calcular cuánto falta.",
    blocks: [
      { id: "initial", text: "ahorroActual <- 250" },
      { id: "input", text: "Leer deposito" },
      { id: "update", text: "ahorroActual <- ahorroActual + deposito" },
      { id: "derived", text: "faltante <- META_AHORRO - ahorroActual" },
      { id: "output", text: "Escribir ahorroActual, faltante" },
    ],
    correctOrder: ["initial", "input", "update", "derived", "output"],
    explanation:
      "Primero se establece el estado inicial; luego llega la entrada, se actualiza el estado, se calcula el dato derivado y al final se muestran los resultados.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Lo esencial del uso de datos",
    takeaways: [
      "Declarar crea el nombre e inicializar establece su primer valor.",
      "Reasignar reemplaza el valor anterior de una variable por un resultado nuevo.",
      "Una variable debe inicializarse antes de participar en cálculos o actualizaciones.",
      "Las constantes nombran reglas fijas y evitan números mágicos dentro del algoritmo.",
      "Un caso aplicado conecta estado inicial, entrada, actualización, resultado derivado y salida.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes inicializar, actualizar y seguir variables sin modificar las constantes del problema.",
  },
];

const tiposDatosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 11",
    title: "¿Qué son los tipos de datos?",
    paragraphs: [
      "Los **tipos de datos** indican qué clase de información puede almacenar una variable o una constante.",
      "Cada tipo de dato ocupa memoria de manera distinta y permite realizar determinadas operaciones. Los tipos más comunes son entero, decimal, cadena de texto y booleano.",
    ],
    code: {
      label: "Cuatro tipos comunes",
      content: `edad <- 21              // Entero\nestatura <- 1.68        // Decimal\nnombre <- "Sofía"       // Cadena de texto\ntieneCuenta <- Verdadero // Booleano`,
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Enteros · 2 de 11",
    title: "Enteros",
    description:
      "Un dato entero representa números completos, sin parte decimal. Se usa para cantidades que se pueden contar: edad, intentos, puntos, productos o años.",
    code: {
      label: "Ejemplos de enteros",
      content: `edad <- 21\npuntos <- 150\nintentosRestantes <- 3`,
    },
    notes: [
      "Un entero puede ser positivo, negativo o cero.",
      "Sirve para contar elementos completos, no fracciones.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Decimales · 3 de 11",
    title: "Decimales (float o double)",
    description:
      "Un dato decimal representa números con parte fraccionaria. Se usa cuando necesitas precisión: precios, estatura, peso, promedio o medidas.",
    code: {
      label: "Ejemplos de decimales",
      content: `precio <- 150.50\nestatura <- 1.68\npromedio <- 9.4`,
    },
    notes: [
      "En muchos lenguajes se conocen como float, double o real.",
      "Son útiles para cálculos donde el resultado no siempre es un número entero.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Texto · 4 de 11",
    title: "Cadena de texto (string)",
    description:
      "Una cadena de texto almacena caracteres: nombres, correos, mensajes, direcciones o cualquier información escrita. Normalmente se coloca entre comillas.",
    code: {
      label: "Ejemplos de strings",
      content: `nombre <- "Sofía"\ncorreo <- "sofia@email.com"\nmensaje <- "Bienvenida a CodeNest"`,
    },
    notes: [
      "Aunque un texto tenga números, si está entre comillas se trata como cadena.",
      "Las cadenas permiten mostrar mensajes y guardar información escrita por el usuario.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Lógica · 5 de 11",
    title: "Booleanos (boolean)",
    description:
      "Un dato booleano solo puede tener dos valores: verdadero o falso. Se usa para representar condiciones, estados o respuestas de sí/no.",
    code: {
      label: "Ejemplos de booleanos",
      content: `tieneSuscripcion <- Verdadero\nesMayorEdad <- Falso\nsesionActiva <- Verdadero`,
    },
    notes: [
      "Los booleanos son clave para tomar decisiones dentro de un programa.",
      "Funcionan muy bien con preguntas como: ¿está activo?, ¿puede entrar?, ¿ya pagó?",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 6 de 11",
    question: "¿Qué tipo de dato usarías para guardar la edad de una persona?",
    options: [
      { id: "a", label: "Cadena de texto" },
      { id: "b", label: "Entero" },
      { id: "c", label: "Booleano" },
      { id: "d", label: "Decimal" },
    ],
    correctId: "b",
    explanation:
      "La edad suele representarse como un número completo, por eso el tipo de dato adecuado es entero.",
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 7 de 11",
    title: "Perfil de usuario",
    description:
      "Mira cómo se ve todo esto junto cuando creamos un perfil de usuario en un programa.",
    code: {
      label: "Algoritmo CrearPerfilUsuario",
      content: `Algoritmo CrearPerfilUsuario\n    // 1. CONSTANTES (No cambian)\n    Constante PAIS_ORIGEN <- "México"\n\n    // 2. VARIABLES y su TIPO DE DATO\n    Definir nombre Como Cadena      // Tipo Texto\n    Definir edad Como Entero        // Tipo Entero\n    Definir estatura Como Real      // Tipo Decimal\n    Definir tieneSuscripcion Como Logico // Tipo Boolean\n\n    // 3. Asignamos valores a las variables\n    nombre <- "Sofía"\n    edad <- 21\n    estatura <- 1.68\n    tieneSuscripcion <- Verdadero\n\n    edad <- edad + 1 // Ahora edad vale 22\n\n    // Si intentáramos hacer: PAIS_ORIGEN <- "España", el programa daría ERROR.\nFinAlgoritmo`,
    },
    notes: [
      "nombre es una cadena porque guarda texto.",
      "edad es entero porque guarda un número completo.",
      "estatura es real porque necesita decimales.",
      "tieneSuscripcion es lógico porque solo puede ser verdadero o falso.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 8 de 11",
    question: "En el ejemplo, ¿qué tipo de dato tiene estatura?",
    options: [
      { id: "a", label: "Cadena" },
      { id: "b", label: "Entero" },
      { id: "c", label: "Real o decimal" },
      { id: "d", label: "Lógico" },
    ],
    correctId: "c",
    explanation: "estatura se define como Real porque guarda 1.68, un número con parte decimal.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 9 de 11",
    question: "¿Cuál valor corresponde a un booleano?",
    options: [
      { id: "a", label: '"Sofía"' },
      { id: "b", label: "21" },
      { id: "c", label: "1.68" },
      { id: "d", label: "Verdadero" },
    ],
    correctId: "d",
    explanation:
      "Verdadero es un valor booleano. Los booleanos representan condiciones con dos posibilidades: verdadero o falso.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 10 de 11",
    title: "Lo esencial de los tipos de datos",
    takeaways: [
      "Los tipos de datos indican qué clase de información puede almacenar una variable o constante.",
      "Entero guarda números completos, como edad o intentos.",
      "Decimal guarda números con parte fraccionaria, como precios o estatura.",
      "Cadena de texto guarda información escrita entre comillas.",
      "Booleano guarda valores de verdadero o falso para representar condiciones.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 11 de 11",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes elegir el tipo de dato adecuado según la información que quieres guardar.",
  },
];

const usoBooleanosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 14",
    title: "De un valor a un estado",
    paragraphs: [
      "Ya sabes que un booleano puede guardar **Verdadero** o **Falso**. Su valor práctico aparece cuando esos dos valores representan el estado actual de algo dentro del programa.",
      "Una bandera booleana responde una pregunta concreta: ¿la sesión está activa?, ¿el correo está verificado?, ¿el recurso está disponible?",
    ],
    code: {
      label: "Estados booleanos",
      content: `sesionActiva <- Falso\ncorreoVerificado <- Verdadero\nrecursoDisponible <- Verdadero`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Modelado · 2 de 14",
    title: "Cuándo conviene usar un booleano",
    description:
      "Antes de crear la variable, comprueba que el dato realmente pueda expresarse con solo dos estados opuestos.",
    table: {
      headers: ["Pregunta", "Sí conviene", "No conviene"],
      rows: [
        [
          "¿Solo existen dos estados válidos?",
          "Activo / inactivo",
          "Pendiente / enviado / cancelado",
        ],
        ["¿El nombre se responde con sí o no?", "tienePermiso", "tipoDePermiso"],
        ["¿Los estados son excluyentes?", "correoVerificado", "metodosDePago"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Inicio seguro · 3 de 14",
    title: "Declara e inicializa la bandera",
    description:
      "Una bandera debe comenzar con un estado conocido. El valor inicial debe representar la situación real antes de que ocurra cualquier acción.",
    code: {
      label: "Pseudocódigo",
      content: `Definir sesionActiva Como Logico\nDefinir correoVerificado Como Logico\n\nsesionActiva <- Falso\ncorreoVerificado <- Falso`,
    },
    notes: [
      "Una sesión nueva todavía no está activa.",
      "Un correo nuevo aún no ha sido verificado.",
      "Inicializar evita trabajar con un estado desconocido.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 14",
    question: "¿Cuál es el valor inicial más seguro para una sesión que todavía no ha comenzado?",
    options: [
      { id: "a", label: "sesionActiva <- Verdadero" },
      { id: "b", label: "sesionActiva <- Falso" },
      { id: "c", label: 'sesionActiva <- "Falso"' },
      { id: "d", label: "sesionActiva <- 1" },
    ],
    correctId: "b",
    explanation:
      "Falso representa que la sesión aún no está activa y mantiene el dato como un booleano real.",
  },
  {
    kind: "theory",
    eyebrow: "Tipos · 5 de 14",
    title: "No imites un booleano",
    description:
      "Un texto o un número pueden parecer equivalentes, pero no tienen el mismo tipo ni comunican la intención con la misma claridad.",
    table: {
      headers: ["Valor", "Tipo real", "Uso recomendado"],
      rows: [
        ["Verdadero", "Booleano", "Sí: representa un estado lógico."],
        ['"Verdadero"', "Cadena de texto", "No: es una palabra entre comillas."],
        ["1", "Entero", "No: es un número, no una respuesta lógica explícita."],
        ["0", "Entero", "No: obliga a recordar una equivalencia."],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 6 de 14",
    question: "¿Qué guarda realmente esta variable?",
    code: {
      label: "Pseudocódigo",
      content: `cuentaBloqueada <- "Falso"`,
    },
    options: [
      { id: "a", label: "Un booleano con valor Falso." },
      { id: "b", label: "Una cadena de texto con la palabra Falso." },
      { id: "c", label: "Un número equivalente a cero." },
      { id: "d", label: "Una variable sin valor." },
    ],
    correctId: "b",
    explanation:
      "Las comillas convierten Falso en texto. Un booleano se escribe sin comillas: cuentaBloqueada <- Falso.",
  },
  {
    kind: "codeExample",
    eyebrow: "Actualización · 7 de 14",
    title: "El estado cambia cuando ocurre un evento",
    description:
      "La bandera conserva el estado más reciente. Un préstamo cambia la disponibilidad de un libro y una devolución la restaura.",
    code: {
      label: "Seguimiento de disponibilidad",
      content: `libroDisponible <- Verdadero  // Está en la biblioteca\n\nlibroDisponible <- Falso      // Una persona lo solicita\nlibroDisponible <- Verdadero  // La persona lo devuelve\n\nEscribir libroDisponible`,
    },
    notes: [
      "Cada asignación reemplaza el estado anterior.",
      "El nombre permite interpretar Verdadero o Falso sin información adicional.",
      "Al terminar, el libro vuelve a estar disponible.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 8 de 14",
    question: "¿Qué valor se muestra después de esta secuencia?",
    code: {
      label: "Pseudocódigo",
      content: `alarmaActiva <- Falso\nalarmaActiva <- Verdadero\nalarmaActiva <- Falso\nEscribir alarmaActiva`,
    },
    options: [
      { id: "a", label: "Verdadero" },
      { id: "b", label: "Falso" },
      { id: "c", label: '"Falso"' },
      { id: "d", label: "No se puede saber" },
    ],
    correctId: "b",
    explanation:
      "La última asignación apaga la alarma. Una variable conserva únicamente su valor actual, que en este caso es Falso.",
  },
  {
    kind: "tip",
    eyebrow: "Buena práctica · 9 de 14",
    title: "Mantén una sola fuente de verdad",
    body: "Evita guardar el mismo estado en dos banderas opuestas, como libroDisponible y libroPrestado. Podrían quedar ambas en Verdadero por error. Una sola bandera bien nombrada es más fácil de actualizar y entender.",
    icon: "Lightbulb",
    variant: "tip",
  },
  {
    kind: "codeExample",
    eyebrow: "Decisión · 10 de 14",
    title: "Usa la bandera directamente",
    description:
      "Cuando una decisión depende de una bandera, su valor ya es la condición. No hace falta compararla de nuevo con Verdadero.",
    code: {
      label: "Pseudocódigo",
      content: `cuentaActiva <- Verdadero\n\nSi cuentaActiva Entonces\n    Escribir "Acceso permitido"\nSino\n    Escribir "Activa tu cuenta"\nFinSi`,
    },
    notes: [
      "Si cuentaActiva se lee como una pregunta clara.",
      "Evita escribir Si cuentaActiva = Verdadero cuando la variable ya es booleana.",
      "Más adelante profundizarás en operadores y estructuras condicionales.",
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Ejercicio · 11 de 14",
    title: "Administra la verificación de un correo",
    instructions:
      "Elige la instrucción adecuada para cada momento del proceso y comprueba tus respuestas.",
    questions: [
      {
        id: "new-account",
        question: "Una cuenta acaba de registrarse. ¿Cómo inicia la bandera?",
        options: [
          { id: "a", label: "correoVerificado <- Falso" },
          { id: "b", label: "correoVerificado <- Verdadero" },
          { id: "c", label: 'correoVerificado <- "Pendiente"' },
        ],
        correctId: "a",
        explanation: "El correo todavía no se ha confirmado, así que su estado inicial es Falso.",
      },
      {
        id: "verified-email",
        question: "La persona abre el enlace de verificación. ¿Qué actualización corresponde?",
        options: [
          { id: "a", label: "correoVerificado <- Falso" },
          { id: "b", label: "correoVerificado <- Verdadero" },
          { id: "c", label: "correoVerificado <- 1" },
        ],
        correctId: "b",
        explanation: "El evento de confirmación cambia la bandera a Verdadero.",
      },
      {
        id: "check-email",
        question: "¿Cuál condición consulta la bandera de forma directa?",
        options: [
          { id: "a", label: "Si correoVerificado Entonces" },
          { id: "b", label: 'Si correoVerificado = "Verdadero" Entonces' },
          { id: "c", label: "Si correoVerificado = 1 Entonces" },
        ],
        correctId: "a",
        explanation: "La bandera ya contiene una condición y puede consultarse directamente.",
      },
    ],
    explanation:
      "Una bandera útil inicia con el estado real, se actualiza cuando ocurre el evento y se consulta como una condición directa.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Ejercicio aplicado · 12 de 14",
    title: "Ordena el ciclo de una bandera",
    instructions:
      "Ordena las instrucciones para declarar, iniciar, actualizar y mostrar el estado de un perfil.",
    blocks: [
      { id: "declare", text: "Definir perfilVerificado Como Logico" },
      { id: "initialize", text: "perfilVerificado <- Falso" },
      { id: "event", text: 'Escribir "Verificando perfil..."' },
      { id: "update", text: "perfilVerificado <- Verdadero" },
      { id: "output", text: "Escribir perfilVerificado" },
    ],
    correctOrder: ["declare", "initialize", "event", "update", "output"],
    explanation:
      "Primero se declara e inicializa la bandera. Después ocurre el evento, se actualiza el estado y al final se muestra su valor actual.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 13 de 14",
    title: "Lo esencial del uso de booleanos",
    takeaways: [
      "Usa un booleano cuando el dato tenga exactamente dos estados opuestos.",
      "El nombre de una bandera debe poder leerse como una pregunta de sí o no.",
      "Inicializa la bandera con el estado real antes de que ocurra cualquier evento.",
      "Verdadero y Falso no llevan comillas; con comillas serían cadenas de texto.",
      "Actualiza una sola fuente de verdad y consulta la bandera directamente en las decisiones.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 14 de 14",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes modelar, inicializar, actualizar y consultar estados booleanos en situaciones reales.",
  },
];

const operadoresSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Introducción · 1 de 13",
    title: "Operadores",
    paragraphs: [
      "Los **operadores** son símbolos que permiten realizar operaciones sobre uno o más valores, llamados operandos.",
      "Gracias a ellos, un programa puede efectuar cálculos, comparar datos y evaluar condiciones para tomar decisiones.",
    ],
    code: {
      label: "Expresión básica",
      content: `5 + 3\n\n5 y 3 son los operandos.\n+ es el operador.\nEl resultado es 8.`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Función · 2 de 13",
    title: "Función y tipos",
    description:
      "Los operadores permiten que un programa transforme valores, los compare o combine condiciones para decidir qué hacer.",
    bullets: [
      {
        bold: "Operaciones matemáticas:",
        text: "suma, resta, multiplicación, división y residuo.",
      },
      {
        bold: "Comparación de valores:",
        text: "permiten saber si un dato es mayor, menor, igual o diferente.",
      },
      { bold: "Toma de decisiones:", text: "sus resultados ayudan a ejecutar una ruta u otra." },
      { bold: "Condiciones combinadas:", text: "unen varias reglas en una sola evaluación." },
      { bold: "Modificación de variables:", text: "actualizan un valor y lo guardan de nuevo." },
    ],
    callouts: [
      {
        icon: "ListTree",
        title: "Cuatro grupos principales",
        description:
          "Los operadores más utilizados se clasifican en aritméticos, de asignación, relacionales y lógicos.",
      },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Aritméticos · 3 de 13",
    title: "Operadores aritméticos",
    description: "Se utilizan para realizar operaciones matemáticas.",
    table: {
      headers: ["Operador", "Operación", "Ejemplo"],
      rows: [
        ["+", "Suma", "8 + 2"],
        ["-", "Resta", "8 - 2"],
        ["*", "Multiplicación", "8 * 2"],
        ["/", "División", "8 / 2"],
        ["%", "Módulo (residuo)", "8 % 3"],
      ],
    },
  },
  {
    kind: "theory",
    eyebrow: "Asignación · 4 de 13",
    title: "Operadores de asignación",
    description: "Permiten almacenar un valor en una variable o actualizar el valor que ya tenía.",
    table: {
      headers: ["Operador", "Equivale a"],
      rows: [
        ["=", "asigna un valor"],
        ["+=", "suma y asigna"],
        ["-=", "resta y asigna"],
        ["*=", "multiplica y asigna"],
        ["/=", "divide y asigna"],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 5 de 13",
    question: "¿Qué operador usarías para obtener el residuo de una división?",
    options: [
      { id: "a", label: "+" },
      { id: "b", label: "/" },
      { id: "c", label: "%" },
      { id: "d", label: "=" },
    ],
    correctId: "c",
    explanation:
      "El operador % calcula el módulo, es decir, el residuo que queda después de una división.",
  },
  {
    kind: "theory",
    eyebrow: "Comparación · 6 de 13",
    title: "Operadores relacionales o de comparación",
    description:
      "Se utilizan para comparar valores. El resultado siempre será un valor booleano: verdadero (true) o falso (false).",
    table: {
      headers: ["Operador", "Significado"],
      rows: [
        ["==", "Igual que"],
        ["!=", "Diferente de"],
        [">", "Mayor que"],
        ["<", "Menor que"],
        [">=", "Mayor o igual que"],
        ["<=", "Menor o igual que"],
      ],
    },
  },
  {
    kind: "theory",
    eyebrow: "Lógicos · 7 de 13",
    title: "Operadores lógicos",
    description: "Permiten combinar dos o más condiciones para construir reglas más completas.",
    table: {
      headers: ["Operador", "Significado"],
      rows: [
        ["&&", "AND (Y)"],
        ["||", "OR (O)"],
        ["!", "NOT (NO)"],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 8 de 13",
    question: "¿Qué resultado produce una comparación relacional?",
    options: [
      { id: "a", label: "Siempre produce una cadena de texto." },
      { id: "b", label: "Siempre produce verdadero o falso." },
      { id: "c", label: "Siempre modifica una variable." },
      { id: "d", label: "Siempre produce un número decimal." },
    ],
    correctId: "b",
    explanation:
      "Los operadores relacionales comparan valores y devuelven un booleano: verdadero o falso.",
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 9 de 13",
    title: "Sistema de becas",
    description:
      "Imagina que estás programando el sistema de becas de una universidad. Para ganarla, el alumno necesita un promedio mayor a 90 y que sus ingresos familiares sean menores a $500.",
    code: {
      label: "Algoritmo EvaluarBeca",
      content: `Algoritmo EvaluarBeca\n    Definir promedio Como Real\n    Definir ingresos Como Real\n    Definir aprobado Como Logico\n\n    promedio <- 93\n    ingresos <- 400\n\n    // Usamos operadores relacionales (>, <) y un operador lógico (Y)\n    aprobado <- (promedio > 90) Y (ingresos < 500)\n\n    Escribir "¿El alumno tiene beca?: ", aprobado\n    // El resultado será: Verdadero\nFinAlgoritmo`,
    },
    notes: [
      "promedio > 90 compara si el promedio cumple el requisito académico.",
      "ingresos < 500 compara si los ingresos cumplen el requisito económico.",
      "Y combina ambas condiciones: las dos deben ser verdaderas.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 10 de 13",
    question: "En el ejemplo de la beca, ¿qué operador lógico combina las dos condiciones?",
    options: [
      { id: "a", label: "Y / AND" },
      { id: "b", label: "NO / NOT" },
      { id: "c", label: "Igual que" },
      { id: "d", label: "Módulo" },
    ],
    correctId: "a",
    explanation:
      "El operador Y, también conocido como AND, exige que ambas condiciones sean verdaderas.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 4 · 11 de 13",
    question: "Si puntos vale 10, ¿qué hace la instrucción puntos += 5?",
    options: [
      { id: "a", label: "Compara puntos con 5." },
      { id: "b", label: "Resta 5 y guarda el resultado." },
      { id: "c", label: "Suma 5 y guarda el nuevo valor." },
      { id: "d", label: "Calcula el residuo de puntos entre 5." },
    ],
    correctId: "c",
    explanation:
      "El operador += suma el valor de la derecha al valor actual de la variable y guarda el resultado.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Lo esencial de los operadores",
    takeaways: [
      "Los operadores trabajan sobre valores llamados operandos.",
      "Los operadores aritméticos realizan cálculos matemáticos.",
      "Los operadores de asignación guardan o actualizan valores en variables.",
      "Los operadores relacionales comparan valores y devuelven verdadero o falso.",
      "Los operadores lógicos combinan condiciones para tomar decisiones más completas.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que reconoces cómo calcular, asignar, comparar y combinar condiciones con operadores.",
  },
];

const operadoresAritmeticosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 13",
    title: "Calcula con intención",
    paragraphs: [
      "Ya conoces los operadores de suma (+), resta (-), multiplicación (*), división (/) y residuo (%). Ahora aprenderás a combinarlos de forma predecible en JavaScript.",
      "Una expresión aritmética correcta no solo obtiene un resultado: también deja claro qué se calcula y en qué orden.",
    ],
    code: {
      label: "JavaScript",
      content: `const precio = 80;\nconst cantidad = 3;\nconst total = precio * cantidad;\n\nconsole.log(total); // 240`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Precedencia · 2 de 13",
    title: "JavaScript sigue un orden",
    description:
      "Las operaciones no siempre se resuelven de izquierda a derecha. La precedencia determina cuál se evalúa primero.",
    table: {
      headers: ["Prioridad", "Operadores", "Regla"],
      rows: [
        ["1", "( )", "Primero lo agrupado entre paréntesis."],
        ["2", "**", "Después las potencias."],
        ["3", "*  /  %", "Luego multiplicación, división y residuo."],
        ["4", "+  -", "Al final suma y resta."],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Interpretación · 3 de 13",
    title: "Los paréntesis cambian el resultado",
    description:
      "Compara las dos expresiones. Los mismos números producen resultados distintos porque cambia la agrupación.",
    code: {
      label: "JavaScript",
      content: `const resultadoA = 10 + 2 * 3;\nconst resultadoB = (10 + 2) * 3;\n\nconsole.log(resultadoA); // 16\nconsole.log(resultadoB); // 36`,
    },
    notes: [
      "En resultadoA, la multiplicación ocurre antes que la suma.",
      "En resultadoB, los paréntesis obligan a sumar primero.",
      "Usa paréntesis cuando ayuden a comunicar la intención del cálculo.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 13",
    question: "¿Qué valor guarda resultado?",
    code: {
      label: "JavaScript",
      content: `const resultado = 2 + 3 * 4;`,
    },
    options: [
      { id: "a", label: "20" },
      { id: "b", label: "14" },
      { id: "c", label: "24" },
      { id: "d", label: "11" },
    ],
    correctId: "b",
    explanation: "La multiplicación se calcula primero: 3 * 4 = 12; después 2 + 12 = 14.",
  },
  {
    kind: "codeExample",
    eyebrow: "Agrupación · 5 de 13",
    title: "Calcula un promedio correctamente",
    description:
      "Para obtener un promedio, primero se suman todos los valores y después se divide el total. Los paréntesis hacen explícito ese orden.",
    code: {
      label: "JavaScript",
      content: `const parcial1 = 82;\nconst parcial2 = 90;\nconst parcial3 = 88;\n\nconst promedio = (parcial1 + parcial2 + parcial3) / 3;\nconsole.log(promedio); // 86.666...`,
    },
    notes: [
      "Sin paréntesis, solo parcial3 se dividiría entre 3 antes de las sumas.",
      "JavaScript puede producir resultados decimales aunque los operandos sean enteros.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 6 de 13",
    question: "¿Cuál expresión calcula el promedio de tres notas?",
    options: [
      { id: "a", label: "nota1 + nota2 + nota3 / 3" },
      { id: "b", label: "(nota1 + nota2 + nota3) / 3" },
      { id: "c", label: "nota1 + (nota2 / nota3)" },
      { id: "d", label: "3 / (nota1 + nota2 + nota3)" },
    ],
    correctId: "b",
    explanation:
      "Los paréntesis agrupan la suma completa para dividir el total entre la cantidad de notas.",
  },
  {
    kind: "theory",
    eyebrow: "Residuo · 7 de 13",
    title: "El operador % resuelve patrones",
    description:
      "El módulo devuelve el residuo de una división. Es útil para reconocer ciclos, alternar turnos y comprobar divisibilidad.",
    bullets: [
      { bold: "Par o impar:", text: "numero % 2 produce 0 cuando el número es par." },
      { bold: "Ciclos:", text: "indice % cantidad reinicia una posición dentro de un rango." },
      {
        bold: "Agrupación:",
        text: "objetos % capacidad indica cuántos quedan fuera de grupos completos.",
      },
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 8 de 13",
    question: "¿Qué muestra este código?",
    code: {
      label: "JavaScript",
      content: `const sobrantes = 17 % 5;\nconsole.log(sobrantes);`,
    },
    options: [
      { id: "a", label: "2" },
      { id: "b", label: "3.4" },
      { id: "c", label: "5" },
      { id: "d", label: "15" },
    ],
    correctId: "a",
    explanation: "En 17 caben tres grupos de 5 y sobran 2; ese residuo es el resultado de 17 % 5.",
  },
  {
    kind: "codeExample",
    eyebrow: "Caso práctico · 9 de 13",
    title: "Construye el total de una compra",
    description:
      "Divide un cálculo grande en resultados intermedios con nombres claros. Así es más fácil verificar cada parte.",
    code: {
      label: "JavaScript",
      content: `const precio = 250;\nconst cantidad = 2;\nconst envio = 80;\nconst tasaIva = 0.16;\n\nconst subtotal = precio * cantidad;\nconst iva = subtotal * tasaIva;\nconst total = subtotal + iva + envio;\n\nconsole.log(total); // 660`,
    },
    notes: [
      "subtotal combina precio y cantidad.",
      "iva se calcula sobre el subtotal, no sobre el envío.",
      "total reúne los resultados cuando cada parte ya tiene significado.",
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Interpretación · 10 de 13",
    title: "Predice cada resultado",
    instructions: "Elige el resultado correcto sin ejecutar el código.",
    questions: [
      {
        id: "precedence",
        question: "const valor = 6 + 4 / 2;",
        options: [
          { id: "a", label: "5" },
          { id: "b", label: "8" },
          { id: "c", label: "10" },
        ],
        correctId: "b",
        explanation: "Primero 4 / 2 = 2; luego 6 + 2 = 8.",
      },
      {
        id: "grouping",
        question: "const valor = (6 + 4) / 2;",
        options: [
          { id: "a", label: "5" },
          { id: "b", label: "8" },
          { id: "c", label: "10" },
        ],
        correctId: "a",
        explanation: "Los paréntesis producen 10 y después 10 / 2 = 5.",
      },
      {
        id: "remainder",
        question: "const valor = 23 % 10;",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "2.3" },
          { id: "c", label: "3" },
        ],
        correctId: "c",
        explanation: "Dos grupos de 10 ocupan 20 y quedan 3.",
      },
    ],
    explanation:
      "Interpretar la precedencia y la agrupación permite comprobar una expresión antes de ejecutarla.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 11 de 13",
    title: "Ordena el cálculo de una factura",
    instructions:
      "Ordena las instrucciones para definir los datos, calcular el subtotal, obtener el impuesto y mostrar el total.",
    blocks: [
      { id: "data", text: "const precio = 120; const cantidad = 3;" },
      { id: "rate", text: "const tasaImpuesto = 0.16;" },
      { id: "subtotal", text: "const subtotal = precio * cantidad;" },
      { id: "tax", text: "const impuesto = subtotal * tasaImpuesto;" },
      { id: "output", text: "console.log(subtotal + impuesto);" },
    ],
    correctOrder: ["data", "rate", "subtotal", "tax", "output"],
    explanation:
      "Los operandos deben existir antes de usarse y cada resultado intermedio alimenta el siguiente cálculo.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Aritmética confiable en JavaScript",
    takeaways: [
      "La precedencia determina qué operación se ejecuta primero.",
      "Los paréntesis agrupan operaciones y comunican la intención.",
      "El operador % devuelve un residuo y ayuda a reconocer patrones.",
      "Los resultados intermedios con nombres claros simplifican cálculos grandes.",
      "Conviene predecir y revisar el resultado antes de integrarlo a una aplicación.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Resultados de operadores aritméticos",
    message:
      "Revisa tu puntuación para confirmar que puedes interpretar precedencia, agrupación, residuos y cálculos aplicados.",
  },
];

const operadoresAsignacionSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 13",
    title: "Actualiza el estado de un programa",
    paragraphs: [
      "El operador **=** guarda un valor. Los operadores compuestos actualizan una variable usando su valor actual.",
      "Esta idea aparece en contadores, inventarios, saldos, marcadores y cualquier dato que cambia durante la ejecución.",
    ],
    code: {
      label: "JavaScript",
      content: `let puntos = 10;\npuntos += 5;\n\nconsole.log(puntos); // 15`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Equivalencias · 2 de 13",
    title: "Asignación compuesta",
    description:
      "Cada operador compuesto calcula un nuevo valor y lo guarda de nuevo en la misma variable.",
    table: {
      headers: ["Forma corta", "Equivale a", "Uso frecuente"],
      rows: [
        ["x += 4", "x = x + 4", "Acumular"],
        ["x -= 4", "x = x - 4", "Descontar"],
        ["x *= 4", "x = x * 4", "Escalar"],
        ["x /= 4", "x = x / 4", "Repartir"],
        ["x %= 4", "x = x % 4", "Conservar el residuo"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Seguimiento · 3 de 13",
    title: "Lee las actualizaciones en secuencia",
    description:
      "Cada instrucción trabaja con el valor que dejó la anterior. Seguir el estado paso a paso evita suposiciones.",
    code: {
      label: "JavaScript",
      content: `let saldo = 100;\nsaldo += 50; // 150\nsaldo -= 30; // 120\nsaldo *= 2;  // 240\n\nconsole.log(saldo); // 240`,
    },
    notes: [
      "La variable saldo puede cambiar porque fue declarada con let.",
      "Los comentarios muestran el valor después de cada asignación.",
      "El orden de las actualizaciones sí altera el resultado final.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 13",
    question: "¿Qué valor final tiene intentos?",
    code: {
      label: "JavaScript",
      content: `let intentos = 2;\nintentos += 3;\nintentos -= 1;`,
    },
    options: [
      { id: "a", label: "2" },
      { id: "b", label: "3" },
      { id: "c", label: "4" },
      { id: "d", label: "5" },
    ],
    correctId: "c",
    explanation: "La secuencia produce 2 + 3 = 5 y después 5 - 1 = 4.",
  },
  {
    kind: "codeExample",
    eyebrow: "Incremento · 5 de 13",
    title: "Cambios de una unidad",
    description:
      "Los operadores ++ y -- son atajos relacionados para aumentar o reducir una variable exactamente en una unidad.",
    code: {
      label: "JavaScript",
      content: `let pagina = 1;\npagina++; // equivale a pagina += 1\npagina++;\npagina--;\n\nconsole.log(pagina); // 2`,
    },
    notes: [
      "++ sirve para contadores ascendentes.",
      "-- sirve para retroceder o reducir una unidad.",
      "Para cambios distintos de uno, usa += o -=.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 6 de 13",
    question: "¿Qué instrucción aumenta cantidad en una unidad?",
    options: [
      { id: "a", label: "cantidad = 1" },
      { id: "b", label: "cantidad++" },
      { id: "c", label: "cantidad == 1" },
      { id: "d", label: "cantidad *= 1" },
    ],
    correctId: "b",
    explanation: "cantidad++ toma el valor actual, suma uno y guarda el nuevo valor.",
  },
  {
    kind: "tip",
    eyebrow: "Mutabilidad · 7 de 13",
    title: "Usa let cuando el valor deba cambiar",
    body: "Una variable declarada con const no puede recibir una nueva asignación. Si puntos debe actualizarse, declárala con let. Reserva const para referencias que no serán reasignadas.",
    icon: "Lightbulb",
    variant: "tip",
  },
  {
    kind: "codeExample",
    eyebrow: "Caso práctico · 8 de 13",
    title: "Controla un inventario",
    description:
      "El inventario cambia con entradas y ventas. Una sola variable conserva la cantidad disponible más reciente.",
    code: {
      label: "JavaScript",
      content: `let existencias = 20;\n\nconst recibidas = 8;\nexistencias += recibidas; // 28\n\nconst vendidas = 5;\nexistencias -= vendidas; // 23\n\nconsole.log(existencias);`,
    },
    notes: [
      "Las cantidades de cada movimiento no cambian y pueden ser const.",
      "existencias usa let porque representa un estado que se actualiza.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 9 de 13",
    question: "¿Qué muestra este código?",
    code: {
      label: "JavaScript",
      content: `let nivel = 3;\nnivel *= 2;\nnivel += 1;\nconsole.log(nivel);`,
    },
    options: [
      { id: "a", label: "6" },
      { id: "b", label: "7" },
      { id: "c", label: "8" },
      { id: "d", label: "9" },
    ],
    correctId: "b",
    explanation: "Primero nivel se duplica a 6 y después aumenta a 7.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Decisiones · 10 de 13",
    title: "Elige la actualización adecuada",
    instructions: "Selecciona la instrucción que representa cada cambio.",
    questions: [
      {
        id: "earn-points",
        question: "Una persona gana 25 puntos.",
        options: [
          { id: "a", label: "puntos += 25" },
          { id: "b", label: "puntos = 25" },
          { id: "c", label: "puntos -= 25" },
        ],
        correctId: "a",
        explanation: "+= conserva los puntos anteriores y agrega 25.",
      },
      {
        id: "use-life",
        question: "El jugador pierde una vida.",
        options: [
          { id: "a", label: "vidas++" },
          { id: "b", label: "vidas--" },
          { id: "c", label: "vidas *= 1" },
        ],
        correctId: "b",
        explanation: "-- reduce el valor actual exactamente en una unidad.",
      },
      {
        id: "double-score",
        question: "Un bono duplica el marcador actual.",
        options: [
          { id: "a", label: "marcador += 2" },
          { id: "b", label: "marcador = 2" },
          { id: "c", label: "marcador *= 2" },
        ],
        correctId: "c",
        explanation: "*= 2 multiplica por dos el valor que ya tenía el marcador.",
      },
    ],
    explanation:
      "La operación correcta depende de cómo debe transformarse el estado actual, no solo del número involucrado.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 11 de 13",
    title: "Actualiza un carrito",
    instructions:
      "Ordena el flujo para iniciar el carrito, agregar productos, retirar uno y mostrar la cantidad final.",
    blocks: [
      { id: "start", text: "let productos = 0;" },
      { id: "add-first", text: "productos += 3;" },
      { id: "add-second", text: "productos += 2;" },
      { id: "remove", text: "productos--;" },
      { id: "show", text: "console.log(productos); // 4" },
    ],
    correctOrder: ["start", "add-first", "add-second", "remove", "show"],
    explanation:
      "El estado inicia en cero y cada operación modifica el valor producido por la instrucción anterior.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Asignaciones que expresan cambios",
    takeaways: [
      "= reemplaza el valor de una variable.",
      "Los operadores compuestos calculan y reasignan en una sola instrucción.",
      "++ y -- cambian un contador exactamente en una unidad.",
      "Las actualizaciones se interpretan en orden y usan el estado más reciente.",
      "Declara con let los valores que deben ser reasignados y con const los que no.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Resultados de operadores de asignación",
    message:
      "Revisa tus respuestas para confirmar que puedes elegir, seguir y aplicar actualizaciones de estado en JavaScript.",
  },
];

const operadoresComparacionSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 13",
    title: "Convierte reglas en respuestas booleanas",
    paragraphs: [
      "Una comparación responde **true** o **false**. Ese resultado permite validar datos, controlar límites y preparar decisiones.",
      "La clave no es memorizar símbolos: es traducir con precisión una regla del problema a una expresión de JavaScript.",
    ],
    code: {
      label: "JavaScript",
      content: `const edad = 20;\nconst puedeRegistrarse = edad >= 18;\n\nconsole.log(puedeRegistrarse); // true`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Igualdad estricta · 2 de 13",
    title: "Compara valor y tipo",
    description:
      "En JavaScript se recomienda la igualdad estricta porque evita conversiones automáticas inesperadas.",
    table: {
      headers: ["Operador", "Pregunta", "Ejemplo"],
      rows: [
        ["===", "¿Mismo valor y mismo tipo?", "5 === 5  // true"],
        ["!==", "¿Distinto valor o tipo?", '5 !== "5"  // true'],
        [">", "¿Mayor que?", "8 > 3  // true"],
        ["<", "¿Menor que?", "8 < 3  // false"],
        [">=", "¿Mayor o igual?", "18 >= 18  // true"],
        ["<=", "¿Menor o igual?", "10 <= 9  // false"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Tipos · 3 de 13",
    title: "Un número y un texto no son lo mismo",
    description:
      'Aunque se vean parecidos, 10 y "10" representan tipos diferentes. La comparación estricta conserva esa diferencia.',
    code: {
      label: "JavaScript",
      content: `const cantidad = 10;\nconst entrada = "10";\n\nconsole.log(cantidad === entrada); // false\nconsole.log(cantidad === Number(entrada)); // true`,
    },
    notes: [
      "=== no convierte los valores antes de compararlos.",
      "Number(entrada) realiza una conversión explícita y visible.",
      "Evita == cuando quieras resultados predecibles para principiantes y equipos de trabajo.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 13",
    question: "¿Qué resultado produce la expresión?",
    code: {
      label: "JavaScript",
      content: `"25" === 25`,
    },
    options: [
      { id: "a", label: "true, porque ambos representan 25." },
      { id: "b", label: "false, porque sus tipos son diferentes." },
      { id: "c", label: "25, porque JavaScript los suma." },
      { id: "d", label: "Un error de sintaxis." },
    ],
    correctId: "b",
    explanation: "=== compara tanto el valor como el tipo: uno es string y el otro es number.",
  },
  {
    kind: "codeExample",
    eyebrow: "Límites · 5 de 13",
    title: "Decide si el borde cuenta",
    description:
      "Los operadores con igualdad incluyen el valor límite. Esta diferencia es importante en edades, cupos, calificaciones y rangos.",
    code: {
      label: "JavaScript",
      content: `const calificacion = 70;\n\nconst superaSetenta = calificacion > 70;   // false\nconst alcanzaSetenta = calificacion >= 70; // true`,
    },
    notes: [
      "> excluye el valor del límite.",
      ">= incluye el valor del límite.",
      "La palabra 'al menos' suele indicar >= y 'como máximo' suele indicar <=.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 6 de 13",
    question:
      "Una promoción aplica a compras de al menos $500. ¿Qué comparación representa la regla?",
    options: [
      { id: "a", label: "total > 500" },
      { id: "b", label: "total >= 500" },
      { id: "c", label: "total === 500" },
      { id: "d", label: "total <= 500" },
    ],
    correctId: "b",
    explanation: "Al menos incluye 500 y todos los valores mayores, por eso se usa >=.",
  },
  {
    kind: "theory",
    eyebrow: "Texto · 7 de 13",
    title: "Las cadenas se comparan por orden",
    description:
      "JavaScript compara cadenas carácter por carácter. Por eso, si esperas números provenientes de un formulario, conviene convertirlos antes de comparar.",
    callouts: [
      {
        icon: "CaseSensitive",
        title: "Mayúsculas y minúsculas importan",
        description: '"admin" === "Admin" produce false porque las cadenas no son idénticas.',
      },
      {
        icon: "BadgeAlert",
        title: "Convierte entradas numéricas",
        description:
          "Usa Number(valor) antes de comparar cantidades recibidas como texto desde una interfaz.",
      },
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 8 de 13",
    question: '¿Qué expresión comprueba que el rol sea exactamente el texto "admin"?',
    options: [
      { id: "a", label: 'rol = "admin"' },
      { id: "b", label: 'rol === "admin"' },
      { id: "c", label: 'rol !== "admin"' },
      { id: "d", label: 'rol >= "admin"' },
    ],
    correctId: "b",
    explanation: "=== comprueba igualdad estricta sin modificar la variable rol.",
  },
  {
    kind: "codeExample",
    eyebrow: "Caso práctico · 9 de 13",
    title: "Valida un rango de inventario",
    description:
      "Guarda comparaciones con nombres que expresen la regla. Luego pueden reutilizarse en mensajes o decisiones.",
    code: {
      label: "JavaScript",
      content: `const existencias = 4;\nconst minimo = 5;\nconst maximo = 40;\n\nconst necesitaReposicion = existencias < minimo;\nconst excedeCapacidad = existencias > maximo;\n\nconsole.log(necesitaReposicion); // true\nconsole.log(excedeCapacidad);    // false`,
    },
    notes: [
      "Las comparaciones no cambian existencias.",
      "Cada resultado booleano responde una pregunta distinta.",
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Traducción · 10 de 13",
    title: "Convierte reglas en comparaciones",
    instructions: "Selecciona la expresión que representa cada requisito.",
    questions: [
      {
        id: "capacity",
        question: "El cupo no puede superar 30 personas.",
        options: [
          { id: "a", label: "personas < 30" },
          { id: "b", label: "personas <= 30" },
          { id: "c", label: "personas === 30" },
        ],
        correctId: "b",
        explanation: "No superar 30 permite cualquier valor menor o igual a 30.",
      },
      {
        id: "different-user",
        question: "El usuario nuevo debe ser distinto del usuario actual.",
        options: [
          { id: "a", label: "nuevoUsuario !== usuarioActual" },
          { id: "b", label: "nuevoUsuario === usuarioActual" },
          { id: "c", label: "nuevoUsuario = usuarioActual" },
        ],
        correctId: "a",
        explanation: "!== devuelve true cuando los valores o sus tipos son diferentes.",
      },
      {
        id: "adult",
        question: "La edad mínima es 18 años.",
        options: [
          { id: "a", label: "edad > 18" },
          { id: "b", label: "edad === 18" },
          { id: "c", label: "edad >= 18" },
        ],
        correctId: "c",
        explanation: "La edad mínima incluye 18 y cualquier valor mayor.",
      },
    ],
    explanation:
      "Palabras como mínimo, máximo, exactamente y distinto ayudan a elegir el operador correcto.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 11 de 13",
    title: "Compara una entrada de formulario",
    instructions:
      "Ordena las instrucciones para recibir una edad como texto, convertirla, compararla y mostrar el resultado.",
    blocks: [
      { id: "input", text: 'const entradaEdad = "21";' },
      { id: "convert", text: "const edad = Number(entradaEdad);" },
      { id: "compare", text: "const esMayorDeEdad = edad >= 18;" },
      { id: "show", text: "console.log(esMayorDeEdad);" },
    ],
    correctOrder: ["input", "convert", "compare", "show"],
    explanation:
      "La conversión explícita prepara un número real antes de aplicar la comparación del requisito.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Comparaciones precisas",
    takeaways: [
      "Toda comparación produce true o false.",
      "=== y !== consideran tanto el valor como el tipo.",
      ">= y <= incluyen el valor del límite; > y < lo excluyen.",
      "Las entradas de texto deben convertirse explícitamente antes de compararlas como números.",
      "Un nombre booleano claro documenta la regla que se evaluó.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Resultados de operadores de comparación",
    message:
      "Revisa tus resultados para confirmar que puedes comparar tipos, interpretar límites y traducir requisitos a JavaScript.",
  },
];

const operadoresLogicosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Aplicación · 1 de 13",
    title: "Combina preguntas booleanas",
    paragraphs: [
      "Los operadores lógicos trabajan con condiciones que ya producen **true** o **false**.",
      "Con **&&**, **||** y **!** puedes expresar reglas compuestas sin perder de vista qué debe cumplirse.",
    ],
    code: {
      label: "JavaScript",
      content: `const tieneCuenta = true;\nconst correoVerificado = true;\n\nconst puedeEntrar = tieneCuenta && correoVerificado;\nconsole.log(puedeEntrar); // true`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Tabla de verdad · 2 de 13",
    title: "Cuándo devuelve true cada operador",
    description:
      "Una tabla de verdad permite comprobar el resultado de combinar dos condiciones sin depender de un caso concreto.",
    table: {
      headers: ["A", "B", "A && B", "A || B"],
      rows: [
        ["true", "true", "true", "true"],
        ["true", "false", "false", "true"],
        ["false", "true", "false", "true"],
        ["false", "false", "false", "false"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "AND · 3 de 13",
    title: "&& exige todas las condiciones",
    description:
      "Usa AND cuando cada requisito sea obligatorio. Si una sola condición es false, el resultado completo será false.",
    code: {
      label: "JavaScript",
      content: `const promedio = 88;\nconst asistencia = 92;\n\nconst apruebaCurso = promedio >= 70 && asistencia >= 80;\nconsole.log(apruebaCurso); // true`,
    },
    notes: [
      "promedio >= 70 produce true.",
      "asistencia >= 80 también produce true.",
      "Como ambos requisitos se cumplen, && produce true.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 4 de 13",
    question: "¿Qué valor tiene acceso?",
    code: {
      label: "JavaScript",
      content: `const tienePase = true;\nconst eventoActivo = false;\nconst acceso = tienePase && eventoActivo;`,
    },
    options: [
      { id: "a", label: "true" },
      { id: "b", label: "false" },
      { id: "c", label: "undefined" },
      { id: "d", label: "Un error" },
    ],
    correctId: "b",
    explanation: "&& solo produce true cuando las dos condiciones son true; eventoActivo es false.",
  },
  {
    kind: "codeExample",
    eyebrow: "OR · 5 de 13",
    title: "|| acepta alternativas",
    description: "Usa OR cuando basta con cumplir una de varias opciones válidas.",
    code: {
      label: "JavaScript",
      content: `const esAdministrador = false;\nconst esEditor = true;\n\nconst puedePublicar = esAdministrador || esEditor;\nconsole.log(puedePublicar); // true`,
    },
    notes: [
      "No es obligatorio que ambas condiciones sean true.",
      "El permiso de editor ya hace verdadera la regla completa.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 6 de 13",
    question:
      "Una persona puede pagar con tarjeta o con efectivo. ¿Qué operador combina las alternativas?",
    options: [
      { id: "a", label: "&&" },
      { id: "b", label: "||" },
      { id: "c", label: "!" },
      { id: "d", label: "===" },
    ],
    correctId: "b",
    explanation: "|| produce true cuando al menos una de las alternativas es válida.",
  },
  {
    kind: "codeExample",
    eyebrow: "NOT · 7 de 13",
    title: "! invierte una condición",
    description:
      "NOT transforma true en false y false en true. Resulta útil cuando la regla se expresa como ausencia o negación.",
    code: {
      label: "JavaScript",
      content: `const cuentaBloqueada = false;\nconst puedeIniciarSesion = !cuentaBloqueada;\n\nconsole.log(puedeIniciarSesion); // true`,
    },
    notes: [
      "! no cambia cuentaBloqueada; produce un valor booleano nuevo.",
      "Evita dobles negaciones difíciles de leer mediante nombres positivos cuando sea posible.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Agrupación · 8 de 13",
    title: "Haz explícita la prioridad",
    description:
      "JavaScript evalúa primero !, después && y al final ||. En reglas mixtas, los paréntesis muestran la intención y evitan lecturas ambiguas.",
    table: {
      headers: ["Regla", "Expresión clara"],
      rows: [
        ["Debe tener cuenta y además ser admin o editor", "tieneCuenta && (esAdmin || esEditor)"],
        ["No debe estar suspendido", "!estaSuspendido"],
        ["Debe aceptar ambas políticas", "aceptaTerminos && aceptaPrivacidad"],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 9 de 13",
    question: "¿Qué valor produce la expresión?",
    code: {
      label: "JavaScript",
      content: `const activo = true;\nconst suspendido = false;\nconst disponible = activo && !suspendido;`,
    },
    options: [
      { id: "a", label: "true" },
      { id: "b", label: "false" },
      { id: "c", label: "suspendido" },
      { id: "d", label: "undefined" },
    ],
    correctId: "a",
    explanation: "!false produce true; por lo tanto true && true produce true.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Reglas prácticas · 10 de 13",
    title: "Elige la composición correcta",
    instructions: "Selecciona la expresión que representa cada regla de negocio.",
    questions: [
      {
        id: "download",
        question: "Para descargar, la sesión debe estar activa y el archivo disponible.",
        options: [
          { id: "a", label: "sesionActiva && archivoDisponible" },
          { id: "b", label: "sesionActiva || archivoDisponible" },
          { id: "c", label: "!sesionActiva" },
        ],
        correctId: "a",
        explanation: "Las dos condiciones son obligatorias, por eso se usa &&.",
      },
      {
        id: "support",
        question: "Puede responder soporte una persona administradora o moderadora.",
        options: [
          { id: "a", label: "esAdmin && esModerador" },
          { id: "b", label: "esAdmin || esModerador" },
          { id: "c", label: "!esModerador" },
        ],
        correctId: "b",
        explanation: "Cualquiera de los dos roles es suficiente, por eso se usa ||.",
      },
      {
        id: "unblocked",
        question: "La cuenta debe no estar bloqueada.",
        options: [
          { id: "a", label: "cuentaBloqueada && true" },
          { id: "b", label: "cuentaBloqueada || false" },
          { id: "c", label: "!cuentaBloqueada" },
        ],
        correctId: "c",
        explanation: "! invierte el valor de cuentaBloqueada.",
      },
    ],
    explanation:
      "Busca si la regla exige todo, acepta alternativas o niega un estado para elegir &&, || o !.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 11 de 13",
    title: "Construye una regla de acceso",
    instructions:
      "Ordena las instrucciones para definir estados, crear una regla agrupada y mostrar el permiso.",
    blocks: [
      { id: "session", text: "const sesionActiva = true;" },
      { id: "admin", text: "const esAdmin = false;" },
      { id: "editor", text: "const esEditor = true;" },
      {
        id: "rule",
        text: "const puedeEditar = sesionActiva && (esAdmin || esEditor);",
      },
      { id: "show", text: "console.log(puedeEditar); // true" },
    ],
    correctOrder: ["session", "admin", "editor", "rule", "show"],
    explanation:
      "Primero existen las condiciones simples; después se agrupan los roles alternativos y se exige una sesión activa.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Reglas lógicas legibles",
    takeaways: [
      "&& exige que todas las condiciones sean true.",
      "|| produce true cuando al menos una alternativa es true.",
      "! invierte el valor booleano de una condición.",
      "La prioridad es !, luego && y finalmente ||.",
      "Los paréntesis y los nombres claros hacen comprensibles las reglas mixtas.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Resultados de operadores lógicos",
    message:
      "Revisa tu puntuación para confirmar que puedes combinar, negar y agrupar condiciones en reglas prácticas.",
  },
];

const estructurasCondicionalesSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 13",
    title: "Estructuras de control",
    description:
      "Llegamos al momento donde tus programas cobran vida propia. Las estructuras de control son las herramientas que te permiten romper la monotonía del código.",
    bullets: [
      {
        bold: "Condicionales:",
        text: "toman decisiones y eligen un camino según una condición.",
      },
      {
        bold: "Cíclicas o bucles:",
        text: "repiten tareas mientras se cumpla una regla o hasta recorrer una colección.",
      },
    ],
    callouts: [
      {
        icon: "GitBranch",
        title: "En esta lección",
        description:
          "Nos enfocaremos en las condicionales: estructuras que ayudan al programa a decidir qué instrucciones ejecutar.",
      },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Condicionales · 2 de 13",
    title: "Estructuras condicionales",
    description:
      "Permiten que tu programa elija un camino u otro basándose en una condición, usando operadores relacionales y lógicos. Es el equivalente exacto al rombo de los diagramas de flujo.",
    bullets: [
      {
        bold: "Condicional simple:",
        text: "Si / Sino o if / else. Sirve cuando hay una condición principal y una alternativa.",
      },
      {
        bold: "Condicional múltiple:",
        text: "Según / Caso o switch / case. Sirve cuando una variable puede tomar varias opciones.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Si / Sino · 3 de 13",
    title: "Condicional simple: Si / Sino",
    description:
      "Es la más usada. Evalúa una condición: si se cumple, hace una cosa; si no se cumple, hace otra. En la vida real sería: si está lloviendo, llevo paraguas; si no, llevo lentes de sol.",
    code: {
      label: "Pseudocódigo",
      content: `Si calificacion >= 60 Entonces\n    Escribir "¡Aprobaste!"\nSino\n    Escribir "Reprobaste, a estudiar más."\nFinSi`,
    },
    notes: [
      "La condición es calificacion >= 60.",
      "Si la condición es verdadera, se muestra el mensaje de aprobación.",
      "Si la condición es falsa, se ejecuta el bloque Sino.",
    ],
  },
  {
    kind: "imagePlaceholder",
    eyebrow: "Diagrama · 4 de 13",
    title: "Ejemplo en diagrama de flujo",
    description:
      "A continuación se muestra el diagrama de flujo para evaluar si una persona es mayor o menor de edad con una estructura condicional Si / Sino.",
    placeholderLabel: "Diagrama de condicional Si / Sino",
    note: "Flujo de decisión basado en la condición ¿Edad >= 18? con caminos para Sí y No.",
    icon: "GitBranch",
    customComponent: "conditionalFlowchart",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 5 de 13",
    question: "¿Qué estructura usarías cuando hay una condición y una alternativa?",
    options: [
      { id: "a", label: "Si / Sino" },
      { id: "b", label: "Según / Caso" },
      { id: "c", label: "Un comentario" },
      { id: "d", label: "Una constante" },
    ],
    correctId: "a",
    explanation:
      "Si / Sino permite ejecutar un bloque cuando la condición se cumple y otro bloque cuando no se cumple.",
  },
  {
    kind: "codeExample",
    eyebrow: "Según / Caso · 6 de 13",
    title: "Condicional múltiple",
    description:
      'Se usa cuando tienes muchas opciones posibles para una sola variable y no quieres escribir veinte Si / Sino seguidos. Funciona como un menú, por ejemplo: "Presione 1 para Ventas, 2 para Soporte, 3 para hablar con un asesor".',
    code: {
      label: "Pseudocódigo",
      content: `Segun opcion Elegir\n    1: Escribir "Eligió idioma Español"\n    2: Escribir "Eligió idioma Inglés"\n    De Otro Modo: Escribir "Opción inválida"\nFinSegun`,
    },
    notes: [
      "La variable opcion determina qué caso se ejecuta.",
      "De Otro Modo funciona como salida para opciones no contempladas.",
    ],
  },
  {
    kind: "imagePlaceholder",
    eyebrow: "Diagrama · 7 de 13",
    title: "Ejemplo en diagrama de flujo",
    description:
      "A continuación se muestra el diagrama de flujo para evaluar diferentes opciones usando una condicional múltiple (Según / Caso).",
    placeholderLabel: "Diagrama de condicional múltiple",
    note: "Flujo de decisiones encadenadas evaluando la variable mes para elegir el camino correcto.",
    icon: "GitBranch",
    customComponent: "multiConditionalFlowchart",
  },
  {
    kind: "codeExample",
    eyebrow: "JavaScript · 8 de 13",
    title: "Ejemplo en un lenguaje de programación",
    description: "A continuación un ejemplo de condicional múltiple (switch) en JavaScript.",
    code: {
      label: "JavaScript",
      content: `let opcion = 2;\n\nswitch(opcion) {\n\ncase 1:\n    console.log("Registrar usuario");\n    break;\n\ncase 2:\n    console.log("Consultar usuario");\n    break;\n\ncase 3:\n    console.log("Salir");\n    break;\n\n}`,
    },
    notes: [
      "switch revisa el valor de opcion.",
      "case 2 se ejecuta porque opcion vale 2.",
      "break evita que el programa continúe ejecutando otros casos.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 9 de 13",
    question: "¿Cuándo conviene usar switch / case?",
    options: [
      { id: "a", label: "Cuando una sola variable puede tener varias opciones." },
      { id: "b", label: "Cuando solo quieres escribir un comentario." },
      { id: "c", label: "Cuando necesitas repetir una tarea muchas veces." },
      { id: "d", label: "Cuando necesitas declarar una constante." },
    ],
    correctId: "a",
    explanation:
      "switch / case es útil cuando una variable funciona como menú o selector con varias opciones posibles.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 3 · 10 de 13",
    question: "En el ejemplo de JavaScript, ¿qué mensaje se muestra si opcion vale 2?",
    options: [
      { id: "a", label: "Registrar usuario" },
      { id: "b", label: "Consultar usuario" },
      { id: "c", label: "Salir" },
      { id: "d", label: "Opción inválida" },
    ],
    correctId: "b",
    explanation: "Como opcion vale 2, se ejecuta case 2 y el programa muestra Consultar usuario.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Ejercicio · 11 de 13",
    title: "Elige la estructura adecuada",
    instructions:
      "Selecciona si cada situación se resuelve mejor con if, if...else o switch. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "calificacion",
        question:
          "Un estudiante obtiene una calificación. Si es mayor o igual a 70, aprobó. Si es menor a 70, reprobó.",
        options: [
          { id: "if", label: "if" },
          { id: "if-else", label: "if...else" },
          { id: "switch", label: "switch" },
        ],
        correctId: "if-else",
      },
      {
        id: "sesion",
        question:
          "Un sistema debe mostrar un mensaje de bienvenida únicamente cuando el usuario haya iniciado sesión.",
        options: [
          { id: "if", label: "if" },
          { id: "if-else", label: "if...else" },
          { id: "switch", label: "switch" },
        ],
        correctId: "if",
      },
      {
        id: "idioma",
        question:
          "Una aplicación permite seleccionar un idioma, cada opción carga un idioma diferente.",
        options: [
          { id: "if", label: "if" },
          { id: "if-else", label: "if...else" },
          { id: "switch", label: "switch" },
        ],
        correctId: "switch",
      },
      {
        id: "mayoria-edad",
        question:
          "Una aplicación solicita la edad de una persona y debe mostrar un mensaje únicamente si es mayor o igual a 18 años.",
        options: [
          { id: "if", label: "if" },
          { id: "if-else", label: "if...else" },
          { id: "switch", label: "switch" },
        ],
        correctId: "if",
      },
    ],
    explanation:
      "Usa if cuando solo necesitas actuar si una condición se cumple, if...else cuando hay dos caminos y switch cuando una variable puede tomar varias opciones.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Lo esencial de las condicionales",
    takeaways: [
      "Las estructuras de control permiten alterar el flujo normal del programa.",
      "Las condicionales toman decisiones a partir de condiciones verdaderas o falsas.",
      "Si / Sino o if...else sirve para dos caminos: se cumple o no se cumple.",
      "Según / Caso o switch / case sirve para elegir entre varias opciones de una misma variable.",
      "Las condicionales usan operadores relacionales y lógicos para evaluar reglas.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes elegir entre if, if...else y switch según el tipo de decisión.",
  },
];

const condicionalesProfundidadSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Profundización · 1 de 17",
    title: "Diseña decisiones completas",
    description:
      "Ya sabes elegir entre if, if...else y switch. Ahora aprenderás a construir decisiones que sigan funcionando en los límites, comuniquen su intención y sean fáciles de modificar.",
    bullets: [
      {
        bold: "Cobertura:",
        text: "cada valor posible debe tener un camino previsto o una salida segura.",
      },
      {
        bold: "Exclusividad:",
        text: "si los casos no deben ejecutarse juntos, ordénalos dentro de una sola cadena if...else if...else.",
      },
      {
        bold: "Claridad:",
        text: "nombra reglas complejas y evita niveles innecesarios de anidación.",
      },
    ],
    callouts: [
      {
        icon: "GitBranch",
        title: "Objetivo práctico",
        description:
          "Interpretar, depurar y refactorizar decisiones reales escritas en JavaScript.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Rangos · 2 de 17",
    title: "Ordena de lo específico a lo general",
    description:
      "En una cadena else if, JavaScript ejecuta el primer caso verdadero. Por eso conviene comprobar primero el rango más exigente.",
    code: {
      label: "JavaScript",
      content: `const total = 1250;
let descuento;

if (total >= 1000) {
  descuento = 0.2;
} else if (total >= 500) {
  descuento = 0.1;
} else {
  descuento = 0;
}

console.log(descuento); // 0.2`,
    },
    notes: [
      "Si total cumple el primer caso, los casos restantes ya no se evalúan.",
      "Comprobar total >= 500 primero impediría alcanzar el descuento de 20 %.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 3 de 17",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `const temperatura = 30;

if (temperatura >= 20) {
  console.log("Templado");
} else if (temperatura >= 30) {
  console.log("Caluroso");
} else {
  console.log("Frío");
}`,
    },
    options: [
      { id: "a", label: '"Templado"' },
      { id: "b", label: '"Caluroso"' },
      { id: "c", label: '"Frío"' },
      { id: "d", label: '"Templado" y "Caluroso"' },
    ],
    correctId: "a",
    explanation:
      "30 cumple temperatura >= 20 y la cadena se detiene. El caso más específico, temperatura >= 30, debería aparecer primero.",
  },
  {
    kind: "theory",
    eyebrow: "Límites · 4 de 17",
    title: "Evita huecos y solapamientos",
    description:
      "Los errores suelen aparecer justo en valores como 0, 18 o 100. Define cada intervalo antes de escribir el código y decide quién incluye el límite.",
    table: {
      headers: ["Regla", "Condición en JavaScript"],
      rows: [
        ["Menor de edad", "edad < 18"],
        ["De 18 a 64 años", "edad >= 18 && edad < 65"],
        ["65 años o más", "edad >= 65"],
      ],
    },
    bullets: [
      {
        bold: "Prueba mínima:",
        text: "comprueba un valor debajo, uno exactamente en el límite y uno encima.",
      },
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Depuración · 5 de 17",
    question: "La mayoría de edad comienza a los 18. ¿Qué cambio corrige la condición?",
    code: {
      label: "JavaScript",
      content: `const edad = 18;

if (edad > 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor de edad");
}`,
    },
    options: [
      { id: "a", label: "Cambiar edad > 18 por edad >= 18" },
      { id: "b", label: "Cambiar edad > 18 por edad < 18" },
      { id: "c", label: "Eliminar el bloque else" },
      { id: "d", label: "Cambiar const por let" },
    ],
    correctId: "a",
    explanation: "> excluye el valor 18. >= incluye el límite y representa correctamente la regla.",
  },
  {
    kind: "codeExample",
    eyebrow: "Anidación · 6 de 17",
    title: "Anida solo cuando una decisión depende de otra",
    description:
      "Un if anidado es útil cuando la segunda pregunta solo tiene sentido después de cumplir la primera.",
    code: {
      label: "JavaScript",
      content: `const sesionActiva = true;
const saldo = 900;
const total = 750;

if (sesionActiva) {
  if (saldo >= total) {
    console.log("Compra autorizada");
  } else {
    console.log("Saldo insuficiente");
  }
} else {
  console.log("Inicia sesión");
}`,
    },
    notes: [
      "El saldo solo se evalúa cuando existe una sesión activa.",
      "Si ambas reglas fueran inseparables y hubiera una sola acción, podrían combinarse con &&.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Cláusulas de guarda · 7 de 17",
    title: "Resuelve primero los casos inválidos",
    description:
      "Una cláusula de guarda termina pronto una función cuando falta un requisito. Así el camino principal queda visible y se reduce la anidación.",
    code: {
      label: "JavaScript",
      content: `function calcularEnvio(total, direccion) {
  if (!direccion) {
    return "Falta la dirección";
  }

  if (total <= 0) {
    return "El carrito está vacío";
  }

  return total >= 800 ? "Envío gratis" : "Envío: $99";
}`,
    },
    notes: [
      "return evita que la función continúe después de detectar un caso inválido.",
      "El último return describe el flujo exitoso sin envolverlo en otro else.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 8 de 17",
    question: "¿Qué devuelve calcularAcceso(false, true)?",
    code: {
      label: "JavaScript",
      content: `function calcularAcceso(sesionActiva, cuentaBloqueada) {
  if (!sesionActiva) {
    return "Inicia sesión";
  }

  if (cuentaBloqueada) {
    return "Cuenta bloqueada";
  }

  return "Acceso permitido";
}`,
    },
    options: [
      { id: "a", label: '"Inicia sesión"' },
      { id: "b", label: '"Cuenta bloqueada"' },
      { id: "c", label: '"Acceso permitido"' },
      { id: "d", label: "undefined" },
    ],
    correctId: "a",
    explanation:
      "!sesionActiva es true, así que el primer return termina la función. cuentaBloqueada ya no se evalúa.",
  },
  {
    kind: "theory",
    eyebrow: "Valores booleanos · 9 de 17",
    title: "Una condición también interpreta valores",
    description:
      "JavaScript convierte ciertos valores a false dentro de una condición. Entenderlo ayuda a leer código real, aunque una comparación explícita puede comunicar mejor la intención.",
    table: {
      headers: ["Se interpreta como false", "Se interpreta como true"],
      rows: [
        ['false, 0, ""', "números distintos de 0"],
        ["null, undefined, NaN", "texto no vacío"],
        ["—", "arreglos y objetos, incluso vacíos"],
      ],
    },
    callouts: [
      {
        icon: "Lightbulb",
        title: "Cuidado con los arreglos",
        description:
          "[] se interpreta como true. Para saber si contiene elementos, usa arreglo.length > 0.",
      },
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 10 de 17",
    question: "¿Qué mensaje muestra este código?",
    code: {
      label: "JavaScript",
      content: `const tareas = [];

if (tareas.length) {
  console.log("Hay tareas");
} else {
  console.log("Sin tareas");
}`,
    },
    options: [
      { id: "a", label: '"Hay tareas"' },
      { id: "b", label: '"Sin tareas"' },
      { id: "c", label: "No muestra nada" },
      { id: "d", label: "Produce un error" },
    ],
    correctId: "b",
    explanation:
      "tareas.length vale 0 y 0 se interpreta como false, por lo que se ejecuta el bloque else.",
  },
  {
    kind: "codeExample",
    eyebrow: "Operador ternario · 11 de 17",
    title: "Elige un valor con una condición breve",
    description:
      "El ternario condición ? valorSiEsTrue : valorSiEsFalse funciona bien para asignaciones cortas con dos resultados.",
    code: {
      label: "JavaScript",
      content: `const puntos = 82;
const estado = puntos >= 70 ? "Aprobado" : "Requiere práctica";

console.log(estado); // "Aprobado"`,
    },
    notes: [
      "El ternario produce un valor; por eso encaja bien en una asignación.",
      "Si necesitas varias instrucciones o ternarios anidados, usa if...else para conservar la legibilidad.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 12 de 17",
    question: "¿Cuál es el valor final de etiqueta?",
    code: {
      label: "JavaScript",
      content: `const stock = 0;
const etiqueta = stock > 0 ? "Disponible" : "Agotado";`,
    },
    options: [
      { id: "a", label: '"Disponible"' },
      { id: "b", label: '"Agotado"' },
      { id: "c", label: "false" },
      { id: "d", label: "0" },
    ],
    correctId: "b",
    explanation:
      "stock > 0 es false, así que el ternario elige el valor situado después de los dos puntos.",
  },
  {
    kind: "codeExample",
    eyebrow: "Switch avanzado · 13 de 17",
    title: "Agrupa casos que comparten resultado",
    description:
      "Varios case pueden compartir el mismo bloque. Al omitir break entre ellos, el flujo avanza hasta la implementación común.",
    code: {
      label: "JavaScript",
      content: `const dia = "domingo";
let tipoDeDia;

switch (dia) {
  case "sábado":
  case "domingo":
    tipoDeDia = "Fin de semana";
    break;
  default:
    tipoDeDia = "Día laboral";
}`,
    },
    notes: [
      "sábado y domingo llegan a la misma asignación de forma intencional.",
      "default conserva una salida segura para cualquier valor no contemplado.",
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Práctica guiada · 14 de 17",
    title: "Elige la solución más clara",
    instructions:
      "Selecciona el patrón que mejor expresa cada necesidad. Después comprueba tus respuestas.",
    questions: [
      {
        id: "invalid-input",
        question: "Una función debe detenerse de inmediato si falta el correo.",
        options: [
          { id: "guard", label: "Una cláusula de guarda con return" },
          { id: "nested", label: "Tres if anidados" },
          { id: "switch", label: "Un switch sin default" },
        ],
        correctId: "guard",
        explanation: "La cláusula de guarda resuelve el dato inválido y termina la función.",
      },
      {
        id: "short-value",
        question: 'Debes asignar "Activo" o "Inactivo" a una sola variable.',
        options: [
          { id: "ternary", label: "Un operador ternario breve" },
          { id: "nested", label: "Dos if anidados" },
          { id: "loop", label: "Un ciclo for" },
        ],
        correctId: "ternary",
        explanation: "El ternario es apropiado para elegir entre dos valores simples.",
      },
      {
        id: "dependent-rule",
        question: "Solo debes revisar el saldo después de confirmar que existe una sesión.",
        options: [
          { id: "nested", label: "Una condición dependiente dentro de otra" },
          { id: "ternary", label: "Tres ternarios encadenados" },
          { id: "unrelated", label: "Dos if sin relación" },
        ],
        correctId: "nested",
        explanation: "La anidación comunica que la segunda decisión depende de la primera.",
      },
      {
        id: "weekend",
        question: "Sábado y domingo deben producir exactamente el mismo resultado.",
        options: [
          { id: "grouped", label: "Casos agrupados en switch" },
          { id: "duplicate", label: "Duplicar el mismo bloque dos veces" },
          { id: "guard", label: "Una guarda sin condición" },
        ],
        correctId: "grouped",
        explanation: "Agrupar case evita duplicar la implementación compartida.",
      },
    ],
    explanation:
      "La mejor estructura no solo funciona: también hace evidente la regla y reduce código repetido.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 15 de 17",
    title: "Construye una decisión robusta",
    instructions:
      "Ordena los bloques para validar una compra y devolver el mensaje correcto sin anidación innecesaria.",
    blocks: [
      { id: "function", text: "function evaluarCompra(total, saldo) {" },
      { id: "invalid", text: 'if (total <= 0) return "Total inválido";' },
      { id: "funds", text: 'if (saldo < total) return "Saldo insuficiente";' },
      {
        id: "success",
        text: 'return total >= 800 ? "Compra con envío gratis" : "Compra autorizada";',
      },
      { id: "close", text: "}" },
    ],
    correctOrder: ["function", "invalid", "funds", "success", "close"],
    explanation:
      "Primero se descartan los casos inválidos, después se valida el saldo y al final se devuelve el resultado exitoso.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 16 de 17",
    title: "Condicionales confiables y legibles",
    takeaways: [
      "Ordena los rangos de lo específico a lo general y prueba sus límites.",
      "Anida únicamente cuando una decisión dependa realmente de otra.",
      "Usa cláusulas de guarda para resolver casos inválidos y reducir niveles de anidación.",
      "Recuerda que 0 y el texto vacío son falsy, mientras que arreglos y objetos son truthy.",
      "Reserva el ternario para elegir valores breves y agrupa los case que comparten resultado.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 17 de 17",
    title: "Resultados de condicionales a profundidad",
    message:
      "Revisa tu puntuación y cada explicación para confirmar que puedes interpretar, depurar y construir decisiones robustas en JavaScript.",
  },
];

const estructurasBuclesSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 16",
    title: "Estructuras de control: bucles",
    description:
      'Si las condicionales (Si/Sino) son el "cerebro" que toma decisiones, los bucles son el "músculo" de la programación: le permiten a una computadora realizar millones de tareas repetitivas en milisegundos sin cansarse y sin equivocarse.',
    bullets: [
      {
        bold: "Bucle mientras (while):",
        text: "repite instrucciones mientras una condición sea verdadera.",
      },
      {
        bold: "Bucle hacer...mientras (do-while):",
        text: "ejecuta primero y luego revisa si debe repetir.",
      },
      {
        bold: "Bucle para (for):",
        text: "repite una tarea una cantidad conocida de veces.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Importancia · 2 de 16",
    title: "¿Por qué importan los bucles?",
    description:
      "Imagina que tu jefe te pide imprimir en pantalla los números del 1 al 100. Sin bucles, tendrías que escribir una línea por cada número.",
    code: {
      label: "Sin bucles",
      content: `Escribir 1\nEscribir 2\nEscribir 3\n... (96 líneas de código aburrido después)\nEscribir 100`,
    },
    notes: [
      "Con un bucle, resuelves el problema del 1 al millón en solo unas pocas líneas.",
      "Los bucles reducen repetición, errores y trabajo manual.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Estructura · 3 de 16",
    title: "Estructura de un bucle",
    description:
      'Para que un bucle funcione correctamente y no "rompa" tu programa, siempre debe tener tres partes bien definidas.',
    bullets: [
      {
        bold: "Variable de control o estado inicial:",
        text: "el punto de partida, por ejemplo contador = 1.",
      },
      {
        bold: "Condición de parada:",
        text: "la pregunta que el bucle revisa para saber si debe continuar, por ejemplo contador <= 100.",
      },
      {
        bold: "Paso o incremento:",
        text: "la acción que modifica la variable de control en cada vuelta, por ejemplo contador = contador + 1.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "While · 4 de 16",
    title: "Bucle mientras (while)",
    description:
      "El bucle while ejecuta instrucciones mientras la condición sea verdadera. La condición se evalúa antes de entrar al ciclo, por eso puede ejecutarse cero veces si la condición comienza en falso.",
    code: {
      label: "Estructura",
      content: `Mientras condición Hacer\n\n    Instrucciones\n\nFin Mientras`,
    },
    notes: [
      "Primero pregunta si la condición se cumple.",
      "Si la condición es falsa desde el inicio, el bloque no se ejecuta.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "While · 5 de 16",
    title: "Ejemplo: pedir una contraseña",
    description: "Problema: pedir una contraseña hasta que sea correcta.",
    code: {
      label: "Pseudocódigo",
      content: `Inicio\nLeer contraseña\nMientras contraseña ≠ "1234" Hacer\n    Escribir "Contraseña incorrecta"\n    Leer contraseña\nFin Mientras\nEscribir "Acceso permitido"\nFin`,
    },
    notes: [
      "La contraseña se pide antes de entrar al bucle.",
      "Mientras el valor sea incorrecto, el programa vuelve a pedirla.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Resultado · 6 de 16",
    title: "Resultado del ejemplo",
    description:
      "Así se vería la interacción si el usuario escribe dos contraseñas incorrectas y luego la correcta.",
    code: {
      label: "Consola",
      content: `Ingrese contraseña:\n1111\nContraseña incorrecta\nIngrese contraseña:\n0000\nContraseña incorrecta\nIngrese contraseña:\n1234\nAcceso permitido`,
    },
    notes: ['El bucle termina cuando la condición contraseña ≠ "1234" deja de ser verdadera.'],
  },
  {
    kind: "codeExample",
    eyebrow: "Do-while · 7 de 16",
    title: "Bucle repetir hasta que (do-while)",
    description:
      "El ciclo do-while es parecido al while, pero tiene una diferencia muy importante: el bloque de instrucciones se ejecuta al menos una vez, incluso si la condición es falsa desde el principio.",
    code: {
      label: "Estructura",
      content: `Repetir\n\n    Instrucciones\n\nHasta Que condición`,
    },
    notes: [
      "Primero ejecuta el bloque.",
      "Después revisa la condición para saber si debe detenerse.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Do-while · 8 de 16",
    title: "Ejemplo: mostrar un menú",
    description: "Problema: mostrar un menú hasta que el usuario elija salir.",
    code: {
      label: "Pseudocódigo",
      content: `Inicio\n\nRepetir\n\n    Escribir "1. Consultar saldo"\n\n    Escribir "2. Depositar"\n\n    Escribir "3. Salir"\n\n    Leer opcion\n\nHasta Que opcion = 3\n\nEscribir "Programa finalizado"\n\nFin`,
    },
    notes: ["El menú aparece al menos una vez.", "El bucle termina cuando opcion vale 3."],
  },
  {
    kind: "codeExample",
    eyebrow: "For · 9 de 16",
    title: "Bucle para (for)",
    description:
      "Se utiliza cuando conocemos desde el principio cuántas veces se repetirá una tarea.",
    code: {
      label: "Estructura",
      content: `Para contador ← valorInicial Hasta valorFinal Hacer\n\n    Instrucciones\n\nFin Para`,
    },
    notes: [
      "El contador avanza desde un valor inicial hasta un valor final.",
      "Es ideal para recorridos con cantidad conocida.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "For · 10 de 16",
    title: "Ejemplo: mostrar números",
    description: "Problema: mostrar los números del 1 al 5.",
    code: {
      label: "Pseudocódigo",
      content: `Inicio\n\nPara contador ← 1 Hasta 5 Hacer\n\n    Escribir contador\n\nFin Para\n\nFin`,
    },
    notes: ["El bucle se repite cinco veces.", "En cada vuelta, contador toma el siguiente valor."],
  },
  {
    kind: "theory",
    eyebrow: "Comparación · 11 de 16",
    title: "Resumen de uso",
    description:
      "Cada tipo de bucle responde a una necesidad distinta. Elegir bien hace que el programa sea más claro.",
    table: {
      headers: ["Estructura", "¿Cuándo usarla?"],
      rows: [
        ["for", "Cuando conoces el número de repeticiones."],
        ["while", "Cuando la repetición depende de una condición."],
        ["do-while", "Cuando el bloque debe ejecutarse al menos una vez."],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 1 · 12 de 16",
    question: "¿Qué parte del bucle evita que se repita para siempre?",
    options: [
      { id: "a", label: "La condición de parada." },
      { id: "b", label: "El nombre del algoritmo." },
      { id: "c", label: "La cadena de texto." },
      { id: "d", label: "El comentario inicial." },
    ],
    correctId: "a",
    explanation:
      "La condición de parada permite saber cuándo el bucle debe terminar. Sin ella, el ciclo podría repetirse indefinidamente.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta 2 · 13 de 16",
    question: "¿Qué bucle se ejecuta al menos una vez antes de revisar la condición?",
    options: [
      { id: "a", label: "for" },
      { id: "b", label: "while" },
      { id: "c", label: "do-while" },
      { id: "d", label: "if...else" },
    ],
    correctId: "c",
    explanation:
      "do-while primero ejecuta el bloque y después evalúa la condición, por eso siempre corre al menos una vez.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Actividad · 14 de 16",
    title: "Elige el bucle adecuado",
    instructions:
      "Selecciona si cada situación se resuelve mejor con for, while o do-while. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "calificaciones",
        question: "Registrar las calificaciones de 30 estudiantes.",
        options: [
          { id: "for", label: "for" },
          { id: "while", label: "while" },
          { id: "do-while", label: "do-while" },
        ],
        correctId: "for",
      },
      {
        id: "descarga",
        question: "Verificar si una descarga ha finalizado.",
        options: [
          { id: "for", label: "for" },
          { id: "while", label: "while" },
          { id: "do-while", label: "do-while" },
        ],
        correctId: "while",
      },
      {
        id: "numero-positivo",
        question: "Solicitar un número hasta que sea positivo.",
        options: [
          { id: "for", label: "for" },
          { id: "while", label: "while" },
          { id: "do-while", label: "do-while" },
        ],
        correctId: "do-while",
      },
      {
        id: "productos",
        question: "Recorrer una lista de 20 productos y mostrar sus nombres.",
        options: [
          { id: "for", label: "for" },
          { id: "while", label: "while" },
          { id: "do-while", label: "do-while" },
        ],
        correctId: "for",
      },
      {
        id: "conexion",
        question: "Esperar hasta que un usuario se conecte al sistema.",
        options: [
          { id: "for", label: "for" },
          { id: "while", label: "while" },
          { id: "do-while", label: "do-while" },
        ],
        correctId: "while",
      },
    ],
    explanation:
      "Usa for cuando conoces el número de repeticiones, while cuando dependes de una condición y do-while cuando necesitas ejecutar el bloque al menos una vez.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 15 de 16",
    title: "Lo esencial de los bucles",
    takeaways: [
      "Los bucles permiten repetir tareas sin escribir la misma instrucción muchas veces.",
      "Todo bucle necesita estado inicial, condición de parada e incremento o actualización.",
      "while revisa la condición antes de ejecutar.",
      "do-while ejecuta primero y revisa la condición después.",
      "for es ideal cuando ya conoces cuántas veces debe repetirse una tarea.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 16 de 16",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes elegir entre for, while y do-while según el tipo de repetición.",
  },
];

const buclesProfundidadSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Profundización · 1 de 18",
    title: "Controla cada repetición",
    description:
      "Ya conoces for, while y do...while. Ahora aprenderás a diseñar recorridos precisos, interpretar su ejecución y resolver tareas reales sin caer en repeticiones infinitas o límites incorrectos.",
    bullets: [
      {
        bold: "Precisión:",
        text: "decide exactamente qué valores debe visitar el bucle y cuándo debe terminar.",
      },
      {
        bold: "Estado:",
        text: "usa contadores y acumuladores para conservar resultados entre iteraciones.",
      },
      {
        bold: "Control:",
        text: "omite o detén iteraciones de forma intencional con continue y break.",
      },
    ],
    callouts: [
      {
        icon: "Repeat2",
        title: "Objetivo práctico",
        description:
          "Leer, depurar y construir bucles de JavaScript que procesen datos de manera clara y segura.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Límites · 2 de 18",
    title: "Evita el error de una repetición extra",
    description:
      "Los errores de límite aparecen cuando el bucle comienza o termina una posición antes o después de lo necesario. Escribe primero el conjunto esperado y luego elige < o <=.",
    code: {
      label: "JavaScript",
      content: `for (let numero = 1; numero <= 5; numero += 1) {
  console.log(numero);
}

// Resultado: 1, 2, 3, 4, 5`,
    },
    notes: [
      "<= incluye el 5; usar < 5 terminaría en 4.",
      "Prueba mentalmente el primer valor, el último válido y el primer valor que ya no debe entrar.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 3 de 18",
    question: "¿Cuántas veces se muestra el mensaje?",
    code: {
      label: "JavaScript",
      content: `for (let intento = 0; intento < 3; intento += 1) {
  console.log("Intentando...");
}`,
    },
    options: [
      { id: "a", label: "2 veces" },
      { id: "b", label: "3 veces" },
      { id: "c", label: "4 veces" },
      { id: "d", label: "Nunca termina" },
    ],
    correctId: "b",
    explanation:
      "intento toma los valores 0, 1 y 2. Cuando llega a 3, la condición intento < 3 es falsa.",
  },
  {
    kind: "codeExample",
    eyebrow: "Recorridos · 4 de 18",
    title: "Visita cada elemento con for...of",
    description:
      "Cuando necesitas el valor de cada elemento y no su posición, for...of expresa el recorrido de forma directa. También funciona con textos, visitando un carácter a la vez.",
    code: {
      label: "JavaScript",
      content: `const palabra = "CODE";

for (const letra of palabra) {
  console.log(letra);
}

// C, O, D, E`,
    },
    notes: [
      "letra recibe el siguiente carácter en cada iteración.",
      "Usa un for clásico cuando sí necesites controlar el índice o el tamaño del salto.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Acumuladores · 5 de 18",
    title: "Construye un resultado durante el recorrido",
    description:
      "Un acumulador se declara antes del bucle y se actualiza en cada vuelta. Puede guardar una suma, un conteo o un texto construido paso a paso.",
    code: {
      label: "JavaScript",
      content: `let suma = 0;

for (let numero = 1; numero <= 4; numero += 1) {
  suma += numero;
}

console.log(suma); // 10`,
    },
    notes: [
      "suma conserva lo obtenido en las iteraciones anteriores.",
      "El valor inicial debe ser neutro: 0 para sumar y 1 para multiplicar.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 6 de 18",
    question: "¿Qué valor final tiene total?",
    code: {
      label: "JavaScript",
      content: `let total = 1;

for (let numero = 1; numero <= 3; numero += 1) {
  total *= numero;
}`,
    },
    options: [
      { id: "a", label: "3" },
      { id: "b", label: "6" },
      { id: "c", label: "7" },
      { id: "d", label: "9" },
    ],
    correctId: "b",
    explanation: "total comienza en 1 y después vale 1 × 1 × 2 × 3, cuyo resultado es 6.",
  },
  {
    kind: "codeExample",
    eyebrow: "Continue · 7 de 18",
    title: "Omite solo la iteración actual",
    description:
      "continue salta el resto del bloque y comienza la siguiente iteración. Es útil cuando ciertos valores no deben procesarse, sin detener todo el recorrido.",
    code: {
      label: "JavaScript",
      content: `for (let numero = 1; numero <= 5; numero += 1) {
  if (numero === 3) {
    continue;
  }

  console.log(numero);
}

// 1, 2, 4, 5`,
    },
    notes: [
      "El 3 se omite, pero el bucle continúa con 4 y 5.",
      "Una condición clara alrededor del trabajo principal puede ser más legible que varios continue.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Break · 8 de 18",
    title: "Detén la búsqueda cuando ya terminaste",
    description:
      "break finaliza el bucle completo. Conviene usarlo cuando ya encontraste el dato buscado y las iteraciones restantes no pueden cambiar el resultado.",
    code: {
      label: "JavaScript",
      content: `let encontrado = false;

for (let numero = 1; numero <= 10; numero += 1) {
  if (numero === 4) {
    encontrado = true;
    break;
  }
}

console.log(encontrado); // true`,
    },
    notes: [
      "El bucle termina al encontrar el 4; nunca visita del 5 al 10.",
      "break controla el bucle más cercano que lo contiene.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 9 de 18",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `for (let n = 1; n <= 6; n += 1) {
  if (n === 2) continue;
  if (n === 5) break;
  console.log(n);
}`,
    },
    options: [
      { id: "a", label: "1, 2, 3, 4, 5, 6" },
      { id: "b", label: "1, 3, 4" },
      { id: "c", label: "1, 3, 4, 6" },
      { id: "d", label: "2, 5" },
    ],
    correctId: "b",
    explanation:
      "continue omite el 2. Luego se imprimen 3 y 4; break termina el bucle antes de imprimir el 5.",
  },
  {
    kind: "codeExample",
    eyebrow: "Anidación · 10 de 18",
    title: "Combina recorridos por niveles",
    description:
      "Un bucle anidado ejecuta un recorrido completo dentro de cada vuelta del recorrido exterior. Sirve para trabajar con filas y columnas, horarios o combinaciones.",
    code: {
      label: "JavaScript",
      content: `for (let fila = 1; fila <= 2; fila += 1) {
  for (let columna = 1; columna <= 3; columna += 1) {
    console.log(\`Fila \${fila}, columna \${columna}\`);
  }
}`,
    },
    notes: [
      "Por cada una de las 2 filas se recorren las 3 columnas.",
      "El trabajo total es 2 × 3 = 6 iteraciones internas.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Interpretación · 11 de 18",
    question: "¿Cuántas veces se ejecuta console.log?",
    code: {
      label: "JavaScript",
      content: `for (let turno = 0; turno < 3; turno += 1) {
  for (let tarea = 0; tarea < 2; tarea += 1) {
    console.log(turno, tarea);
  }
}`,
    },
    options: [
      { id: "a", label: "2 veces" },
      { id: "b", label: "3 veces" },
      { id: "c", label: "5 veces" },
      { id: "d", label: "6 veces" },
    ],
    correctId: "d",
    explanation:
      "El bucle exterior tiene 3 vueltas y en cada una el interior realiza 2: 3 × 2 = 6.",
  },
  {
    kind: "theory",
    eyebrow: "Diseño · 12 de 18",
    title: "Haz visible el avance y el costo",
    description:
      "Un bucle confiable deja claro qué cambia y cuánto trabajo realiza. Antes de ejecutarlo, revisa su estado, su salida y la cantidad aproximada de iteraciones.",
    table: {
      headers: ["Pregunta", "Señal de un diseño claro"],
      rows: [
        ["¿Qué cambia?", "La variable actualizada se reconoce fácilmente."],
        ["¿Cuándo termina?", "La condición puede volverse falsa."],
        ["¿Cuánto recorre?", "Los límites representan solo los datos necesarios."],
        ["¿Hay anidación?", "Cada nivel tiene una responsabilidad distinta."],
      ],
    },
    callouts: [
      {
        icon: "TriangleAlert",
        title: "Señal de alerta",
        description:
          "Si la condición depende de una variable que nunca cambia, el bucle puede ser infinito.",
      },
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Práctica guiada · 13 de 18",
    title: "Elige la herramienta de control",
    instructions:
      "Selecciona la opción que expresa mejor cada necesidad. Después comprueba tus respuestas.",
    questions: [
      {
        id: "skip-invalid",
        question: "Ignorar un dato inválido y continuar con el siguiente.",
        options: [
          { id: "continue", label: "continue" },
          { id: "break", label: "break" },
          { id: "nested", label: "Un bucle anidado" },
        ],
        correctId: "continue",
        explanation: "continue omite la iteración actual sin cancelar las demás.",
      },
      {
        id: "stop-search",
        question: "Terminar una búsqueda en cuanto aparece el resultado.",
        options: [
          { id: "continue", label: "continue" },
          { id: "break", label: "break" },
          { id: "accumulator", label: "Un acumulador" },
        ],
        correctId: "break",
        explanation: "break evita recorridos innecesarios cuando el objetivo ya se cumplió.",
      },
      {
        id: "sum-sales",
        question: "Conservar la suma de varias ventas durante el recorrido.",
        options: [
          { id: "accumulator", label: "Un acumulador" },
          { id: "break", label: "break" },
          { id: "nested", label: "Dos bucles anidados" },
        ],
        correctId: "accumulator",
        explanation: "El acumulador guarda y actualiza el resultado parcial.",
      },
      {
        id: "seats",
        question: "Visitar cada asiento organizado por fila y columna.",
        options: [
          { id: "nested", label: "Bucles anidados" },
          { id: "continue", label: "continue" },
          { id: "single", label: "Un único if" },
        ],
        correctId: "nested",
        explanation: "Un nivel recorre las filas y el otro las columnas.",
      },
    ],
    explanation:
      "Elige cada recurso por su intención: omitir, detener, conservar estado o recorrer niveles.",
  },
  {
    kind: "blockPuzzle",
    eyebrow: "Actividad aplicada · 14 de 18",
    title: "Construye un contador de pares",
    instructions:
      "Ordena los bloques para recorrer del 1 al 6, omitir números impares y contar únicamente los pares.",
    blocks: [
      { id: "state", text: "let cantidadPares = 0;" },
      { id: "loop", text: "for (let numero = 1; numero <= 6; numero += 1) {" },
      { id: "skip", text: "if (numero % 2 !== 0) continue;" },
      { id: "count", text: "cantidadPares += 1;" },
      { id: "close", text: "}" },
      { id: "show", text: "console.log(cantidadPares); // 3" },
    ],
    correctOrder: ["state", "loop", "skip", "count", "close", "show"],
    explanation:
      "El contador existe antes del bucle; cada impar se omite y solo los valores 2, 4 y 6 incrementan el resultado.",
  },
  {
    kind: "codeExample",
    eyebrow: "Aplicación · 15 de 18",
    title: "Procesa datos y conserva un resumen",
    description:
      "En aplicaciones reales, un bucle suele validar cada dato y actualizar un resultado. Este ejemplo anticipa el uso de colecciones que estudiarás en la siguiente sección.",
    code: {
      label: "JavaScript",
      content: `const calificaciones = [80, -1, 95, 70];
let suma = 0;
let validas = 0;

for (const calificacion of calificaciones) {
  if (calificacion < 0) continue;

  suma += calificacion;
  validas += 1;
}

const promedio = suma / validas;
console.log(promedio); // 81.666...`,
    },
    notes: [
      "La calificación -1 se considera inválida y no participa en el cálculo.",
      "suma y validas son acumuladores con responsabilidades diferentes.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Aplicación · 16 de 18",
    question: "¿Qué cambio evita una división entre cero si no hay calificaciones válidas?",
    code: {
      label: "JavaScript",
      content: `const promedio = suma / validas;
console.log(promedio);`,
    },
    options: [
      { id: "a", label: "Comprobar validas > 0 antes de dividir" },
      { id: "b", label: "Cambiar for...of por while" },
      { id: "c", label: "Agregar break en cada iteración" },
      { id: "d", label: "Inicializar suma con 1" },
    ],
    correctId: "a",
    explanation:
      "Si validas vale 0, no existe un divisor útil. La comprobación protege el cálculo y permite mostrar un estado vacío.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 17 de 18",
    title: "Bucles precisos y útiles",
    takeaways: [
      "Comprueba el primer valor, el último incluido y el primer valor excluido para evitar errores de límite.",
      "Usa for...of cuando necesitas visitar valores sin administrar un índice.",
      "Los acumuladores conservan sumas, conteos y otros resultados entre iteraciones.",
      "continue omite una vuelta; break detiene por completo el bucle más cercano.",
      "En bucles anidados, multiplica las vueltas de cada nivel para estimar el trabajo total.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 18 de 18",
    title: "Resultados de bucles a profundidad",
    message:
      "Revisa tu puntuación y cada explicación para confirmar que puedes interpretar, depurar y construir recorridos precisos en JavaScript.",
  },
];

const arreglosSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 9",
    title: "Estructuras de datos",
    description:
      "Una estructura de datos es una forma de organizar y almacenar información dentro de un programa para poder acceder a ella y manipularla de manera eficiente.",
    bullets: [
      {
        bold: "Lineales:",
        text: "arreglos, listas enlazadas, pilas y colas.",
      },
      {
        bold: "No lineales:",
        text: "árboles y grafos.",
      },
    ],
    callouts: [
      {
        icon: "List",
        title: "Primero dominaremos arreglos",
        description:
          "Los arreglos son la estructura de datos más básica y frecuente en programación, por eso son el primer paso antes de estudiar estructuras más avanzadas.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Concepto · 2 de 9",
    title: "¿Qué es un arreglo?",
    description:
      "Un arreglo, también llamado array o vector, es una estructura de datos que permite almacenar varios valores dentro de una sola variable, organizándolos en posiciones consecutivas.",
    code: {
      label: "De variables sueltas a un arreglo",
      content: `calificacion1 = 90\ncalificacion2 = 85\ncalificacion3 = 95\n\n// Con un arreglo:\ncalificaciones = [90, 85, 95]`,
    },
    notes: [
      "El arreglo agrupa datos relacionados bajo un mismo nombre.",
      "Cada valor queda guardado en una posición dentro de la estructura.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Características · 3 de 9",
    title: "Características principales",
    description: "A continuación las características principales de los arreglos:",
    bullets: [
      {
        bold: "Almacenan múltiples datos:",
        text: "permiten guardar varios elementos relacionados en una sola estructura.",
      },
      {
        bold: "Tienen índices:",
        text: "cada elemento ocupa una posición identificada por un índice, que generalmente comienza en 0.",
      },
      {
        bold: "Mantienen un orden:",
        text: "los elementos conservan el orden en el que fueron almacenados.",
      },
      {
        bold: "Acceso rápido:",
        text: "es posible acceder directamente a cualquier elemento mediante su índice.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Memoria · 4 de 9",
    title: "Arreglos y memoria",
    description:
      "Un arreglo almacena sus elementos en espacios consecutivos de memoria. Cada posición tiene un índice que permite encontrar rápidamente un elemento.",
    code: {
      label: "Arreglo con índices",
      content: `[25][30][18][40]\n ↓   ↓   ↓   ↓\n 0   1   2   3`,
    },
    notes: [
      "El valor 25 está en el índice 0.",
      "El valor 40 está en el índice 3.",
      "Por eso, el primer elemento de un arreglo suele leerse con índice 0.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Tipos · 5 de 9",
    title: "Tipos de arreglos",
    description: "Hay tres tipos de arreglos principales:",
    bullets: [
      {
        bold: "Arreglo unidimensional (vector):",
        text: "una sola línea de datos, como una lista de calificaciones.",
      },
      {
        bold: "Arreglo bidimensional (matriz):",
        text: "datos organizados en filas y columnas, como una tabla.",
      },
      {
        bold: "Arreglo multidimensional:",
        text: "estructura con más de dos dimensiones para organizar datos más complejos.",
      },
    ],
    callouts: [
      {
        icon: "Lightbulb",
        title: "Uso más frecuente",
        description:
          "Cuando empieces un proyecto, el 80% de las veces usarás arreglos unidimensionales dinámicos, como ArrayList en Java o list en Python. Solo pasas a matrices cuando trabajas con gráficos, tablas o juegos.",
      },
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Preguntas · 6 de 9",
    title: "Comprueba el concepto",
    instructions:
      "Selecciona la respuesta correcta para cada pregunta. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "funcion-arreglo",
        question: "¿Cuál es la principal función de un arreglo?",
        options: [
          { id: "a", label: "A) Realizar operaciones matemáticas" },
          { id: "b", label: "B) Guardar múltiples datos bajo un mismo nombre" },
          { id: "c", label: "C) Crear funciones" },
          { id: "d", label: "D) Comparar variables" },
        ],
        correctId: "b",
      },
      {
        id: "identificar-elemento",
        question: "¿Cómo se identifica cada elemento dentro de un arreglo?",
        options: [
          { id: "a", label: "A) Mediante una función" },
          { id: "b", label: "B) Mediante un operador" },
          { id: "c", label: "C) Mediante un índice o posición" },
          { id: "d", label: "D) Mediante una condición" },
        ],
        correctId: "c",
      },
    ],
    explanation:
      "Un arreglo agrupa varios datos bajo un mismo nombre y cada elemento se localiza por medio de un índice o posición.",
  },
  {
    kind: "choiceSet",
    eyebrow: "Preguntas · 7 de 9",
    title: "Índices y tipo de datos",
    instructions:
      "Selecciona la respuesta correcta para cada pregunta. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "tipo-datos-arreglo",
        question: "¿Qué tipo de datos puede almacenar un arreglo?",
        options: [
          { id: "a", label: "A) Datos de diferentes tipos al mismo tiempo" },
          { id: "b", label: "B) Únicamente datos del mismo tipo" },
          { id: "c", label: "C) Solo números enteros" },
          { id: "d", label: "D) Solo texto" },
        ],
        correctId: "b",
      },
      {
        id: "primer-elemento",
        question:
          "¿Qué instrucción permite acceder al primer elemento de un arreglo llamado numeros?",
        options: [
          { id: "a", label: "A) numeros(1)" },
          { id: "b", label: "B) numeros[0]" },
          { id: "c", label: "C) numeros{0}" },
          { id: "d", label: "D) numeros<0>" },
        ],
        correctId: "b",
      },
    ],
    explanation:
      "En esta introducción trabajamos con arreglos de elementos del mismo tipo, y el primer elemento se accede normalmente con el índice 0.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 8 de 9",
    title: "Lo esencial de los arreglos",
    takeaways: [
      "Una estructura de datos organiza información para acceder a ella y manipularla de forma eficiente.",
      "Un arreglo guarda varios valores bajo un mismo nombre.",
      "Cada elemento del arreglo ocupa una posición identificada por un índice.",
      "Los índices generalmente comienzan en 0.",
      "Los arreglos más comunes son unidimensionales, bidimensionales y multidimensionales.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 9 de 9",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que entiendes qué es un arreglo, cómo se organiza y cómo se accede a sus elementos.",
  },
];

const vectoresSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 13",
    title: "Arreglos unidimensionales: vectores",
    description:
      "Un arreglo unidimensional, también conocido como vector o array, es una estructura de datos lineal que permite almacenar una colección de elementos del mismo tipo bajo un único nombre.",
    bullets: [
      {
        bold: "Muchos datos, un solo nombre:",
        text: "permiten almacenar listas completas sin crear una variable por cada elemento.",
      },
      {
        bold: "Procesamiento con ciclos:",
        text: "facilitan recorrer y modificar información usando bucles.",
      },
      {
        bold: "Listas cotidianas:",
        text: "son ideales para calificaciones, edades, precios o nombres.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Declaración · 2 de 13",
    title: "Declaración",
    description:
      "En pseudocódigo normalmente se declara indicando el nombre del vector y su tamaño.",
    code: {
      label: "Pseudocódigo",
      content: `Definir numeros Como Entero\nDimension numeros[5]`,
    },
    notes: ["Esto crea un vector llamado numeros.", "El vector tiene espacio para cinco enteros."],
  },
  {
    kind: "theory",
    eyebrow: "Representación · 3 de 13",
    title: "Representación",
    description:
      "Imagina un vector llamado calificaciones con espacio para 5 elementos. Como en las tablas anteriores, usaremos índices desde 0.",
    table: {
      headers: ["Índice", "Valor"],
      rows: [
        ["0", "80"],
        ["1", "90"],
        ["2", "75"],
        ["3", "100"],
        ["4", "85"],
      ],
    },
  },
  {
    kind: "codeExample",
    eyebrow: "Asignación · 4 de 13",
    title: "Asignar valores",
    description:
      "Después de declarar y dimensionar un vector, puedes guardar un valor en cada posición usando su índice.",
    code: {
      label: "Pseudocódigo",
      content: `Definir edades Como Entero\nDimension edades[5]\n\nedades[0] <- 18\nedades[1] <- 20\nedades[2] <- 19\nedades[3] <- 21\nedades[4] <- 18`,
    },
    notes: [
      "Cada asignación guarda un valor en una posición distinta.",
      "El índice indica exactamente dónde se almacena el dato.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Contenido · 5 de 13",
    title: "Ahora el vector contiene",
    description: "Después de las asignaciones, el vector edades queda organizado así:",
    table: {
      headers: ["Índice", "Valor"],
      rows: [
        ["0", "18"],
        ["1", "20"],
        ["2", "19"],
        ["3", "21"],
        ["4", "18"],
      ],
    },
  },
  {
    kind: "choiceSet",
    eyebrow: "Preguntas · 6 de 13",
    title: "Declaración y asignación",
    instructions:
      "Selecciona la respuesta correcta para cada pregunta. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "dimension-numeros",
        question: "¿Qué crea la instrucción Dimension numeros[5]?",
        options: [
          { id: "a", label: "A) Un vector con espacio para cinco enteros" },
          { id: "b", label: "B) Cinco variables con nombres distintos" },
          { id: "c", label: "C) Un ciclo que se repite cinco veces" },
          { id: "d", label: "D) Una condición lógica" },
        ],
        correctId: "a",
      },
      {
        id: "edad-indice-dos",
        question: "Según el vector edades, ¿qué valor queda guardado en edades[2]?",
        options: [
          { id: "a", label: "A) 18" },
          { id: "b", label: "B) 20" },
          { id: "c", label: "C) 19" },
          { id: "d", label: "D) 21" },
        ],
        correctId: "c",
      },
    ],
    explanation:
      "Dimension define el tamaño del vector y cada índice permite ubicar un valor específico dentro de él.",
  },
  {
    kind: "codeExample",
    eyebrow: "Lectura · 7 de 13",
    title: "Leer un elemento",
    description:
      "Para mostrar un valor almacenado, escribes el nombre del vector y el índice del elemento que quieres leer.",
    code: {
      label: "Pseudocódigo",
      content: `Escribir edades[2]\n\nSalida\n19`,
    },
    notes: [
      "edades[2] accede al tercer elemento del vector cuando el índice inicia en 0.",
      "El valor mostrado es 19.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Captura · 8 de 13",
    title: "Capturar datos usando un ciclo",
    description:
      "Una de las mayores ventajas de los vectores es que pueden llenarse utilizando ciclos. En este ejemplo se solicitan cinco números al usuario.",
    code: {
      label: "Pseudocódigo",
      content: `Definir numeros Como Entero\nDimension numeros[5]\n\nPara i <- 0 Hasta 4 Hacer\n    Escribir "Ingrese un número:"\n    Leer numeros[i]\nFinPara`,
    },
    notes: [
      "Cada número se guarda automáticamente en una posición distinta.",
      "El contador i funciona como índice del vector.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Recorrido · 9 de 13",
    title: "Recorrer un vector",
    description:
      "Después de almacenar los datos, normalmente se recorren para procesarlos. Este ejemplo muestra todos los números guardados.",
    code: {
      label: "Pseudocódigo",
      content: `Definir numeros Como Entero\nDimension numeros[5]\n\nPara i <- 0 Hasta 4 Hacer\n    Escribir numeros[i]\nFinPara\n\nSi el usuario ingresó: 8, 15, 4, 20, 11\nLa salida será: 8, 15, 4, 20, 11`,
    },
    notes: [
      "El ciclo pasa por los índices 0, 1, 2, 3 y 4.",
      "En cada vuelta se muestra el elemento que está en numeros[i].",
    ],
  },
  {
    kind: "choiceSet",
    eyebrow: "Preguntas · 10 de 13",
    title: "Captura y recorrido",
    instructions:
      "Selecciona la respuesta correcta para cada pregunta. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "indice-ciclo",
        question: "En Para i <- 0 Hasta 4 Hacer, ¿para qué sirve i al usar numeros[i]?",
        options: [
          { id: "a", label: "A) Para nombrar el algoritmo" },
          { id: "b", label: "B) Para funcionar como índice del vector" },
          { id: "c", label: "C) Para convertir números en texto" },
          { id: "d", label: "D) Para detener siempre el programa" },
        ],
        correctId: "b",
      },
      {
        id: "recorrido-cantidad",
        question:
          "Si un vector tiene 5 elementos con índices 0 a 4, ¿cuántas vueltas necesita el ciclo para recorrerlo completo?",
        options: [
          { id: "a", label: "A) 4" },
          { id: "b", label: "B) 5" },
          { id: "c", label: "C) 6" },
          { id: "d", label: "D) 0" },
        ],
        correctId: "b",
      },
    ],
    explanation:
      "El contador del ciclo puede usarse como índice y debe recorrer todas las posiciones existentes del vector.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta · 11 de 13",
    question: "Observa el pseudocódigo. ¿Cuál es el valor de suma?",
    code: {
      label: "Pseudocódigo",
      content: `numeros = [4, 8, 2, 6]\n\nsuma = numeros[0] + numeros[2]`,
    },
    options: [
      { id: "a", label: "A) 6" },
      { id: "b", label: "B) 8" },
      { id: "c", label: "C) 10" },
      { id: "d", label: "D) 12" },
    ],
    correctId: "a",
    explanation: "numeros[0] vale 4 y numeros[2] vale 2. Por eso suma = 4 + 2 = 6.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 12 de 13",
    title: "Lo esencial de los vectores",
    takeaways: [
      "Un vector almacena elementos del mismo tipo bajo un único nombre.",
      "Dimension define cuántos espacios tendrá el vector.",
      "Cada elemento se guarda y se lee usando un índice.",
      "Los ciclos permiten capturar o recorrer todos los elementos del vector.",
      "Con índices base 0, el primer elemento está en la posición 0.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 13 de 13",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes declarar, llenar, leer y recorrer un vector usando índices.",
  },
];

const matricesSteps: LessonStep[] = [
  {
    kind: "theory",
    eyebrow: "Introducción · 1 de 15",
    title: "Arreglos bidimensionales: matrices",
    description:
      "Un arreglo bidimensional, comúnmente llamado matriz, es el siguiente paso lógico. Si un vector era como un tren con varios vagones en línea recta, una matriz es como un edificio de departamentos o una hoja de cálculo.",
    bullets: [
      {
        bold: "Filas (horizontal):",
        text: "se leen de izquierda a derecha.",
      },
      {
        bold: "Columnas (vertical):",
        text: "se leen de arriba hacia abajo.",
      },
      {
        bold: "Coordenadas o índices:",
        text: "para acceder a un valor, siempre se indica primero la fila y luego la columna: [fila][columna].",
      },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Usos · 2 de 15",
    title: "¿Para qué sirven las matrices?",
    description:
      "Las matrices son útiles cuando la información tiene una estructura de tabla o necesita organizarse en filas y columnas.",
    bullets: [
      { bold: "Calificaciones:", text: "varios alumnos en diferentes materias." },
      { bold: "Juegos:", text: "tableros con filas y columnas." },
      { bold: "Horarios:", text: "clases organizadas por días y horas." },
      { bold: "Mapas digitales:", text: "posiciones organizadas en una cuadrícula." },
      { bold: "Imágenes:", text: "cada píxel tiene una posición." },
      { bold: "Ventas:", text: "registros por día y producto." },
    ],
  },
  {
    kind: "theory",
    eyebrow: "Comparación · 3 de 15",
    title: "Diferencia con un vector",
    description: "A continuación un resumen de las diferencias entre una matriz y un vector:",
    table: {
      headers: ["Vector", "Matriz"],
      rows: [
        ["Tiene una dimensión", "Tiene dos o más dimensiones"],
        ["Usa un solo índice", "Usa dos o más índices"],
        ["Representa una lista", "Representa una tabla"],
        ["Ejemplo: edades", "Ejemplo: calificaciones por alumno y materia"],
      ],
    },
  },
  {
    kind: "theory",
    eyebrow: "Representación · 4 de 15",
    title: "calificaciones[3][4]",
    description:
      "Esta matriz representa 3 alumnos y 4 materias. Cada valor se encuentra cruzando una fila con una columna. Para leer un valor, se indica primero la fila y después la columna: matriz[fila][columna].",
    table: {
      headers: ["", "Matemáticas", "Español", "Física", "Inglés"],
      rows: [
        ["Alumno 1", "8", "9", "7", "10"],
        ["Alumno 2", "7", "8", "9", "6"],
        ["Alumno 3", "10", "9", "8", "7"],
      ],
    },
  },
  {
    kind: "choiceSet",
    eyebrow: "Pregunta · 5 de 15",
    title: "Comprueba la representación",
    instructions:
      "Selecciona la respuesta correcta para cada pregunta. Cuando termines, comprueba tus respuestas.",
    questions: [
      {
        id: "matriz-dimensiones",
        question: "En calificaciones[3][4], ¿qué representan el 3 y el 4?",
        options: [
          { id: "a", label: "A) 3 columnas y 4 filas" },
          { id: "b", label: "B) 3 filas y 4 columnas" },
          { id: "c", label: "C) 3 materias y 4 alumnos" },
          { id: "d", label: "D) 3 vectores separados" },
        ],
        correctId: "b",
      },
      {
        id: "orden-indices",
        question: "¿Cuál es el orden correcto para acceder a un dato en una matriz?",
        options: [
          { id: "a", label: "A) matriz[columna][fila]" },
          { id: "b", label: "B) matriz[fila][columna]" },
          { id: "c", label: "C) matriz[fila]" },
          { id: "d", label: "D) matriz[columna]" },
        ],
        correctId: "b",
      },
    ],
    explanation:
      "Una matriz organiza datos por filas y columnas. Para acceder a un elemento se usa el orden matriz[fila][columna].",
  },
  {
    kind: "codeExample",
    eyebrow: "Declaración · 6 de 15",
    title: "Declaración de una matriz",
    description:
      "Para crear una matriz se indica el nombre de la matriz, la cantidad de filas y la cantidad de columnas.",
    code: {
      label: "Pseudocódigo",
      content: `Definir matriz Como Entero\nDimension matriz[3][4]`,
    },
    notes: [
      "matriz es el nombre.",
      "3 indica la cantidad de filas.",
      "4 indica la cantidad de columnas.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Asignación · 7 de 15",
    title: "Guardar valores en una matriz",
    description: "Para almacenar información se especifican la fila y la columna.",
    code: {
      label: "Pseudocódigo",
      content: `matriz[0][0] <- 5\nmatriz[0][1] <- 8\nmatriz[1][0] <- 10`,
    },
    notes: [
      "matriz[0][0] guarda 5 en la primera fila y primera columna.",
      "matriz[0][1] guarda 8 en la primera fila y segunda columna.",
      "matriz[1][0] guarda 10 en la segunda fila y primera columna.",
    ],
  },
  {
    kind: "theory",
    eyebrow: "Contenido · 8 de 15",
    title: "La matriz queda",
    description:
      "Las posiciones no asignadas permanecen vacías o sin valor definido, según el lenguaje o entorno.",
    table: {
      headers: ["", "0", "1"],
      rows: [
        ["0", "5", "8"],
        ["1", "10", ""],
      ],
    },
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta · 9 de 15",
    question: "Según las asignaciones, ¿qué valor queda en matriz[1][0]?",
    options: [
      { id: "a", label: "A) 5" },
      { id: "b", label: "B) 8" },
      { id: "c", label: "C) 10" },
      { id: "d", label: "D) Vacío" },
    ],
    correctId: "c",
    explanation: "matriz[1][0] indica fila 1, columna 0. En el ejemplo, ahí se guardó el valor 10.",
  },
  {
    kind: "codeExample",
    eyebrow: "Recorrido · 10 de 15",
    title: "Recorrer una matriz",
    description:
      "Para recorrer una matriz se necesitan normalmente dos ciclos: uno para las filas y otro para las columnas.",
    code: {
      label: "Pseudocódigo",
      content: `Para fila <- 0 Hasta 2 Hacer\n\n    Para columna <- 0 Hasta 2 Hacer\n\n        Escribir matriz[fila][columna]\n\n    FinPara\n\nFinPara`,
    },
    notes: [
      "El primer ciclo cambia de fila.",
      "El segundo ciclo recorre las columnas de cada fila.",
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Ejemplo · 11 de 15",
    title: "Ejemplo completo: llenar una matriz",
    description: "Crear una matriz de 3x3 y guardar números.",
    code: {
      label: "Pseudocódigo",
      content: `Definir numeros Como Entero\nDimension numeros[3][3]\n\nPara fila <- 0 Hasta 2 Hacer\n\n    Para columna <- 0 Hasta 2 Hacer\n\n        Escribir "Ingrese un número:"\n        Leer numeros[fila][columna]\n\n    FinPara\n\nFinPara`,
    },
    notes: [
      "El ciclo externo recorre las tres filas.",
      "El ciclo interno recorre las tres columnas de cada fila.",
      "Cada lectura guarda un número en una coordenada distinta.",
    ],
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta · 12 de 15",
    question: "¿Por qué se usan dos ciclos para recorrer una matriz?",
    options: [
      { id: "a", label: "A) Porque una matriz tiene filas y columnas." },
      { id: "b", label: "B) Porque solo puede guardar dos valores." },
      { id: "c", label: "C) Porque no tiene índices." },
      { id: "d", label: "D) Porque reemplaza a las variables constantes." },
    ],
    correctId: "a",
    explanation:
      "Una matriz tiene dos dimensiones principales: filas y columnas. Por eso se usa un ciclo para recorrer filas y otro para recorrer columnas.",
  },
  {
    kind: "quiz",
    eyebrow: "Pregunta · 13 de 15",
    question: "En una matriz numeros[3][3], ¿cuántos valores puede almacenar en total?",
    options: [
      { id: "a", label: "A) 3" },
      { id: "b", label: "B) 6" },
      { id: "c", label: "C) 9" },
      { id: "d", label: "D) 12" },
    ],
    correctId: "c",
    explanation: "Una matriz de 3 filas por 3 columnas puede almacenar 3 x 3 = 9 valores.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 14 de 15",
    title: "Lo esencial de las matrices",
    takeaways: [
      "Una matriz es un arreglo bidimensional que organiza datos en filas y columnas.",
      "Para acceder a un elemento se usa el formato matriz[fila][columna].",
      "Las matrices sirven para datos con estructura de tabla, como calificaciones, horarios o tableros.",
      "Para recorrer una matriz normalmente se usan dos ciclos anidados.",
      "Una matriz de 3x3 puede almacenar 9 valores.",
    ],
  },
  {
    kind: "feedback",
    eyebrow: "Retroalimentación · 15 de 15",
    title: "Pantalla de retroalimentación",
    message:
      "Revisa tus respuestas para confirmar que puedes declarar, leer, asignar y recorrer matrices usando filas y columnas.",
  },
];

const variablesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "¿Qué es una variable?",
    paragraphs: [
      "Una **variable** es un nombre que apunta a un valor. Te permite guardar información para reutilizarla más adelante en tu programa.",
      "Piensa en ella como una etiqueta que pones a un dato para encontrarlo después sin recordar su contenido exacto.",
    ],
    code: {
      label: "Sintaxis básica",
      content: `let nombre = "Ana";\nconst edad = 19;`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Teoría · 2 de 12",
    title: "Tipos de datos primitivos",
    description:
      "En JavaScript hay tres tipos básicos que verás todos los días. Cada uno representa una clase distinta de información.",
    table: {
      headers: ["Tipo", "Ejemplos"],
      rows: [
        ["string", "\"Ana\", 'hola'"],
        ["number", "19, 3.14, -7"],
        ["boolean", "true, false"],
      ],
    },
    bullets: [
      { bold: "string:", text: "texto entre comillas dobles o simples." },
      { bold: "number:", text: "enteros y decimales sin comillas." },
      { bold: "boolean:", text: "solo dos valores posibles, verdadero o falso." },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Teoría + código · 3 de 12",
    title: "Declarando variables con const y let",
    description:
      "Usamos const para valores fijos y let cuando el valor puede cambiar más adelante.",
    code: {
      label: "JavaScript",
      content: `const nombre = "Ana";\nconst edad = 19;\nlet puntos = 0;\n\npuntos = puntos + 10;\nconsole.log(nombre, edad, puntos);`,
    },
    notes: [
      "const fija la referencia: no puedes reasignarla.",
      "let permite cambiar el valor en cualquier momento.",
    ],
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 4 de 12",
    title: "Elegir const o let",
    explanation:
      "Usa **const** por defecto. Solo cambia a **let** cuando sepas que el valor va a cambiar durante la ejecución.",
    question: "¿Cómo declararías la edad de un usuario que no va a cambiar?",
    options: [
      { id: "a", label: "var edad = 19;" },
      { id: "b", label: "let edad = 19;" },
      { id: "c", label: "const edad = 19;" },
      { id: "d", label: "edad = 19;" },
    ],
    correctId: "c",
    answerExplanation:
      "Si el valor no va a cambiar, const es la mejor opción: comunica intención y previene reasignaciones por error.",
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 5 de 12",
    title: "Reconocer tipos de datos",
    explanation:
      "Cada valor en JavaScript tiene un **tipo** que define qué operaciones puedes hacer con él. Reconocerlo rápido te ahorra muchos errores.",
    question: "¿Qué tipo de dato es el valor true?",
    options: [
      { id: "a", label: "string (texto)" },
      { id: "b", label: "number (número)" },
      { id: "c", label: "boolean (booleano)" },
      { id: "d", label: "variable" },
    ],
    correctId: "c",
    answerExplanation:
      "true y false son los dos únicos valores booleanos. Sirven para representar lógica de sí/no.",
  },
  {
    kind: "tip",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Pon nombres que se expliquen solos",
    icon: "Lightbulb",
    variant: "tip",
    body: "Evita nombres como x o data1. Prefiere edad, totalCarrito o estaActivo. Tu yo del futuro lo agradecerá al leer el código.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 7 de 12",
    question: "¿Qué pasa al ejecutar este código?",
    code: {
      label: "JavaScript",
      content: `const total = 100;\ntotal = 200;`,
    },
    options: [
      { id: "a", label: "Se cambia a 200 sin problema." },
      { id: "b", label: "Lanza un error porque const no se reasigna." },
      { id: "c", label: "Suma los dos valores y queda 300." },
      { id: "d", label: "Se convierte automáticamente en let." },
    ],
    correctId: "b",
    explanation:
      "const fija la referencia. Si necesitas cambiar el valor, declárala con let desde el inicio.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 8 de 12",
    question: "¿Cuál de estas variables guarda un string?",
    options: [
      { id: "a", label: "const a = 42;" },
      { id: "b", label: 'const b = "42";' },
      { id: "c", label: "const c = true;" },
      { id: "d", label: "const d = 3.14;" },
    ],
    correctId: "b",
    explanation: 'Las comillas convierten "42" en string. Sin comillas, 42 es un number.',
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 9 de 12",
    question: "¿Cuál es el mejor nombre para una variable que guarda el carrito de compras?",
    options: [
      { id: "a", label: "x" },
      { id: "b", label: "data1" },
      { id: "c", label: "carritoDeCompras" },
      { id: "d", label: "c" },
    ],
    correctId: "c",
    explanation: "Un nombre descriptivo en camelCase comunica de inmediato qué guarda la variable.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 10 de 12",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `let puntos = 5;\npuntos = puntos + 3;\nconsole.log(puntos);`,
    },
    options: [
      { id: "a", label: "5" },
      { id: "b", label: "3" },
      { id: "c", label: "8" },
      { id: "d", label: "Error" },
    ],
    correctId: "c",
    explanation: "puntos parte en 5, se reasigna a 5 + 3 = 8, y eso es lo que imprime console.log.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial de variables",
    takeaways: [
      "Una variable es un nombre que apunta a un valor.",
      "string, number y boolean son los tipos básicos.",
      "Usa const por defecto y let solo cuando el valor cambia.",
      "Nombres claros hacen el código fácil de leer.",
    ],
  },
  {
    kind: "completion",
    eyebrow: "¡Lección completada!",
    title: "Bien hecho, sigues avanzando",
    message:
      "Ya conoces las piezas básicas para guardar información. Ahora veamos cómo tu programa toma decisiones.",
  },
];

const condicionalesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "Decisiones en el código",
    paragraphs: [
      "Una **condicional** ejecuta un bloque de código solo cuando se cumple cierta regla.",
      "Es la base de toda app interactiva: validar formularios, mostrar contenido distinto o reaccionar a un toque.",
    ],
    code: {
      label: "Sintaxis básica",
      content: `if (condicion) {\n  // se ejecuta si es true\n} else {\n  // se ejecuta si es false\n}`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Teoría · 2 de 12",
    title: "Operadores de comparación",
    description:
      "Las condiciones se construyen con operadores que devuelven true o false. Estos son los que más vas a usar.",
    table: {
      headers: ["Operador", "Significado"],
      rows: [
        ["===", "Igual estricto (valor y tipo)"],
        ["!==", "Distinto estricto"],
        [">", "Mayor que"],
        ["<", "Menor que"],
        [">=", "Mayor o igual"],
        ["<=", "Menor o igual"],
      ],
    },
    bullets: [
      { bold: "Estricto:", text: "=== compara valor y tipo. Es el operador recomendado." },
      { bold: "Lógicos:", text: "&& (y), || (o), ! (negación) combinan condiciones." },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Teoría + código · 3 de 12",
    title: "if, else y else if",
    description:
      "Encadena condiciones con else if para revisar varios casos. JavaScript se detiene en el primero que se cumpla.",
    code: {
      label: "JavaScript",
      content: `const puntaje = 88;\n\nif (puntaje >= 90) {\n  console.log("Excelente");\n} else if (puntaje >= 70) {\n  console.log("Bien");\n} else {\n  console.log("A mejorar");\n}`,
    },
    notes: [
      "Solo uno de los tres bloques se ejecuta.",
      "El orden importa: el primero que se cumpla gana.",
    ],
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 4 de 12",
    title: "Cómo se evalúan las condiciones",
    explanation:
      "Cuando la condición es **true**, entra al bloque del if. Cuando es **false**, salta al else (si existe).",
    code: {
      label: "JavaScript",
      content: `const edad = 16;\n\nif (edad >= 18) {\n  console.log("Adulto");\n} else {\n  console.log("Menor");\n}`,
    },
    question: "¿Qué imprime este código?",
    options: [
      { id: "a", label: '"Adulto"' },
      { id: "b", label: '"Menor"' },
      { id: "c", label: "Imprime los dos." },
      { id: "d", label: "Lanza un error." },
    ],
    correctId: "b",
    answerExplanation:
      "16 no cumple 16 >= 18, así que entra al else. Solo uno de los dos bloques se ejecuta.",
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 5 de 12",
    title: "Cuándo usar === vs ==",
    explanation:
      "Usa siempre **===** (igual estricto). Compara valor **y** tipo, evitando conversiones automáticas inesperadas.",
    question: '¿Qué devuelve la expresión 5 === "5"?',
    options: [
      { id: "a", label: "true" },
      { id: "b", label: "false" },
      { id: "c", label: "undefined" },
      { id: "d", label: "Lanza un error" },
    ],
    correctId: "b",
    answerExplanation:
      "Aunque los valores parecen iguales, uno es number y el otro es string. === exige que ambos tipos coincidan.",
  },
  {
    kind: "tip",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Mantén las condiciones simples",
    icon: "Lightbulb",
    variant: "tip",
    body: "Si tu condición tiene más de tres operadores, parte la lógica en variables intermedias con nombres claros. Hace el código mucho más legible.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 7 de 12",
    question: "Si puntaje = 95, ¿qué bloque se ejecuta?",
    code: {
      label: "JavaScript",
      content: `if (puntaje >= 90) {\n  console.log("Excelente");\n} else if (puntaje >= 70) {\n  console.log("Bien");\n} else {\n  console.log("A mejorar");\n}`,
    },
    options: [
      { id: "a", label: 'El de "Excelente".' },
      { id: "b", label: 'El de "Bien".' },
      { id: "c", label: 'El de "A mejorar".' },
      { id: "d", label: "Los tres bloques." },
    ],
    correctId: "a",
    explanation: "95 >= 90 se cumple primero, así que JS entra ahí y se salta el resto.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 8 de 12",
    question: "¿Qué operador usarías para verificar si dos valores son distintos?",
    options: [
      { id: "a", label: "==" },
      { id: "b", label: "!=" },
      { id: "c", label: "!==" },
      { id: "d", label: "<>" },
    ],
    correctId: "c",
    explanation:
      "!== verifica que los valores sean distintos en valor y tipo. Es la versión estricta de !=.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 9 de 12",
    question: "¿Cuál es el resultado de la condición (10 > 5) && (3 < 1)?",
    options: [
      { id: "a", label: "true" },
      { id: "b", label: "false" },
      { id: "c", label: "Error de sintaxis" },
      { id: "d", label: "undefined" },
    ],
    correctId: "b",
    explanation:
      "&& requiere que ambas condiciones sean true. 10 > 5 es true, pero 3 < 1 es false, así que el resultado es false.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 10 de 12",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `const hora = 14;\n\nif (hora < 12) {\n  console.log("Mañana");\n} else if (hora < 18) {\n  console.log("Tarde");\n} else {\n  console.log("Noche");\n}`,
    },
    options: [
      { id: "a", label: '"Mañana"' },
      { id: "b", label: '"Tarde"' },
      { id: "c", label: '"Noche"' },
      { id: "d", label: "Nada" },
    ],
    correctId: "b",
    explanation: '14 no cumple < 12, pero sí < 18, así que entra al else if e imprime "Tarde".',
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial de condicionales",
    takeaways: [
      "if ejecuta un bloque cuando la condición es true.",
      "else ofrece la alternativa si la condición es false.",
      "Usa else if para manejar varios casos en orden.",
      "Prefiere === sobre == para comparar.",
    ],
  },
  {
    kind: "completion",
    eyebrow: "¡Lección completada!",
    title: "Decisiones tomadas",
    message:
      "Ya puedes hacer que tu código reaccione. Lo siguiente: cómo repetir acciones sin copiar y pegar.",
  },
];

const buclesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "Repetir sin copiar y pegar",
    paragraphs: [
      "Un **bucle** ejecuta el mismo bloque de código varias veces, cambiando algún valor en cada vuelta.",
      "Son perfectos para recorrer listas, hacer cálculos sobre muchos datos o esperar a que algo cambie.",
    ],
    code: {
      label: "Sintaxis básica",
      content: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Teoría · 2 de 12",
    title: "Tipos de bucles",
    description:
      "JavaScript tiene varios bucles. Los dos que más vas a usar son for y while. Cada uno brilla en escenarios distintos.",
    table: {
      headers: ["Bucle", "Cuándo usarlo"],
      rows: [
        ["for", "Cuando sabes cuántas veces repetir."],
        ["while", "Mientras se cumpla una condición."],
        ["for...of", "Recorrer cada elemento de un arreglo."],
      ],
    },
    callouts: [
      {
        icon: "ListOrdered",
        title: "for",
        description: "Inicializa, evalúa y avanza en una sola línea.",
      },
      {
        icon: "RotateCw",
        title: "while",
        description: "Repite mientras la condición sea verdadera.",
      },
      {
        icon: "TriangleAlert",
        title: "Cuidado",
        description: "Siempre debe existir una forma de salir del bucle.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Teoría + código · 3 de 12",
    title: "for clásico y while",
    description:
      "El for empaqueta inicialización, condición y avance. El while solo evalúa la condición.",
    code: {
      label: "JavaScript",
      content: `for (let paso = 1; paso <= 3; paso++) {\n  console.log(\`Paso \${paso}\`);\n}\n\nlet intentos = 0;\nwhile (intentos < 3) {\n  console.log("Intento", intentos);\n  intentos++;\n}`,
    },
    notes: ["Ambos bucles imprimen tres veces.", "En el while tú mismo mueves el contador."],
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 4 de 12",
    title: "Cuántas veces se repite un for",
    explanation:
      "El bucle for repite mientras la **condición** sea verdadera. Cada vuelta se ejecuta el bloque y luego el **avance**.",
    code: {
      label: "JavaScript",
      content: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
    },
    question: "¿Cuántas veces se ejecuta console.log?",
    options: [
      { id: "a", label: "4 veces" },
      { id: "b", label: "5 veces" },
      { id: "c", label: "6 veces" },
      { id: "d", label: "Infinitas" },
    ],
    correctId: "b",
    answerExplanation: "i va de 0 a 4 (i < 5). Eso son 5 vueltas: 0, 1, 2, 3 y 4.",
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 5 de 12",
    title: "Elegir el bucle correcto",
    explanation:
      "Usa **for** cuando conoces la cantidad de repeticiones. Usa **while** cuando esperas que cambie una condición.",
    question: "¿Cuál bucle usarías para mostrar los 10 primeros nombres de una lista?",
    options: [
      { id: "a", label: "while sin condición clara" },
      { id: "b", label: "for, porque conoces la cantidad" },
      { id: "c", label: "Ninguno: copiar y pegar 10 veces" },
      { id: "d", label: "for, pero sin salida" },
    ],
    correctId: "b",
    answerExplanation:
      "for brilla cuando conoces de antemano cuántas veces repetir. while es para esperar a que cambie un estado.",
  },
  {
    kind: "tip",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Evita el bucle infinito",
    icon: "TriangleAlert",
    variant: "warning",
    body: "Si olvidas actualizar la variable que controla el while, nunca termina y tu app se congela. Antes de escribirlo, define cómo va a salir.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 7 de 12",
    question: "¿Cuántas veces se ejecuta el bloque?",
    code: {
      label: "JavaScript",
      content: `for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}`,
    },
    options: [
      { id: "a", label: "2 veces" },
      { id: "b", label: "3 veces" },
      { id: "c", label: "4 veces" },
      { id: "d", label: "Infinitas" },
    ],
    correctId: "b",
    explanation: "i va de 1 a 3 incluidos. La condición i <= 3 deja entrar tres iteraciones.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 8 de 12",
    question: "¿Qué hace que un bucle while se detenga?",
    options: [
      { id: "a", label: "Cuando la condición se vuelve false." },
      { id: "b", label: "Cuando llega al número 10." },
      { id: "c", label: "Cuando termina la línea." },
      { id: "d", label: "Nunca se detiene." },
    ],
    correctId: "a",
    explanation:
      "while sigue iterando mientras la condición sea true. En cuanto se vuelve false, el bucle termina.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 9 de 12",
    question: "¿Qué valor imprime al final?",
    code: {
      label: "JavaScript",
      content: `let total = 0;\nfor (let i = 1; i <= 4; i++) {\n  total = total + i;\n}\nconsole.log(total);`,
    },
    options: [
      { id: "a", label: "4" },
      { id: "b", label: "6" },
      { id: "c", label: "10" },
      { id: "d", label: "16" },
    ],
    correctId: "c",
    explanation: "Suma 1 + 2 + 3 + 4 = 10. El bucle acumula el valor de i en total en cada vuelta.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 10 de 12",
    question: "¿Qué problema tiene este código?",
    code: {
      label: "JavaScript",
      content: `let i = 0;\nwhile (i < 3) {\n  console.log(i);\n}`,
    },
    options: [
      { id: "a", label: "Imprime 3 veces y termina." },
      { id: "b", label: "Es un bucle infinito." },
      { id: "c", label: "Lanza un error de sintaxis." },
      { id: "d", label: "No imprime nada." },
    ],
    correctId: "b",
    explanation: "Nunca se actualiza i, así que i < 3 siempre es true. El bucle no se detiene.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial de bucles",
    takeaways: [
      "Un bucle repite el mismo bloque muchas veces.",
      "for: cuando conoces el total de vueltas.",
      "while: mientras una condición sea verdadera.",
      "Siempre define cómo termina el bucle.",
    ],
  },
  {
    kind: "completion",
    eyebrow: "¡Lección completada!",
    title: "Repeticiones bajo control",
    message:
      "Ya puedes automatizar tareas. Lo siguiente: empaquetar lógica reutilizable en funciones.",
  },
];

const funcionesSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "Bloques de lógica con nombre",
    paragraphs: [
      "Una **función** agrupa instrucciones bajo un nombre, para que las puedas reutilizar cuando quieras.",
      "Sin funciones tendrías que repetir el mismo código cada vez que necesitas la misma acción.",
    ],
    code: {
      label: "Sintaxis básica",
      content: `function saludar(nombre) {\n  return \`Hola, \${nombre}\`;\n}`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Teoría · 2 de 12",
    title: "Anatomía de una función",
    description: "Toda función tiene tres elementos clave que definen cómo se usa y qué entrega.",
    callouts: [
      {
        icon: "Tag",
        title: "Nombre",
        description: "Identificador para llamar a la función cuando la necesites.",
      },
      {
        icon: "ArrowDownToLine",
        title: "Parámetros",
        description: "Los datos que recibe entre paréntesis para trabajar.",
      },
      {
        icon: "ArrowUpFromLine",
        title: "Retorno",
        description: "El valor que devuelve con return al terminar.",
      },
    ],
    bullets: [
      { bold: "Declaración:", text: "function nombre(parámetros) { ... }" },
      { bold: "Llamada:", text: "nombre(argumentos) ejecuta la función." },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Teoría + código · 3 de 12",
    title: "Función con parámetros y retorno",
    description: "Pasamos datos al llamar a la función y obtenemos un resultado con return.",
    code: {
      label: "JavaScript",
      content: `function sumar(a, b) {\n  return a + b;\n}\n\nconst total = sumar(4, 7);\nconsole.log(total); // 11`,
    },
    notes: ["a y b son parámetros (la receta).", "4 y 7 son argumentos (los ingredientes reales)."],
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 4 de 12",
    title: "Parámetros vs argumentos",
    explanation:
      "Los **parámetros** son los nombres en la declaración. Los **argumentos** son los valores que pasas al llamarla.",
    code: {
      label: "JavaScript",
      content: `function saludar(nombre) {\n  return \`Hola, \${nombre}\`;\n}\n\nsaludar("Ana");`,
    },
    question: 'En la llamada saludar("Ana"), ¿qué es "Ana"?',
    options: [
      { id: "a", label: "Un parámetro" },
      { id: "b", label: "Un argumento" },
      { id: "c", label: "Una variable global" },
      { id: "d", label: "El nombre de la función" },
    ],
    correctId: "b",
    answerExplanation:
      '"Ana" es el valor real que se pasa al llamar la función, eso lo convierte en argumento. El parámetro es nombre.',
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 5 de 12",
    title: "El valor de return",
    explanation:
      "**return** entrega el resultado al exterior. Si no hay return, la función devuelve undefined automáticamente.",
    code: {
      label: "JavaScript",
      content: `function duplicar(n) {\n  return n * 2;\n}\n\nconst resultado = duplicar(5);`,
    },
    question: "¿Qué valor tiene resultado?",
    options: [
      { id: "a", label: "5" },
      { id: "b", label: "10" },
      { id: "c", label: "undefined" },
      { id: "d", label: "Lanza un error" },
    ],
    correctId: "b",
    answerExplanation:
      "duplicar(5) evalúa n * 2 con n = 5. El return entrega 10, que se asigna a resultado.",
  },
  {
    kind: "tip",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Una función, una responsabilidad",
    icon: "Lightbulb",
    variant: "tip",
    body: "Si una función hace demasiadas cosas, parte la lógica en varias funciones pequeñas. Son más fáciles de leer, probar y reutilizar.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 7 de 12",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `function saludar(nombre) {\n  return \`Hola, \${nombre}\`;\n}\n\nconsole.log(saludar("Luis"));`,
    },
    options: [
      { id: "a", label: '"Hola, nombre"' },
      { id: "b", label: '"Hola, Luis"' },
      { id: "c", label: "undefined" },
      { id: "d", label: "Lanza un error" },
    ],
    correctId: "b",
    explanation: 'El parámetro nombre recibe "Luis" y se interpola en el template literal.',
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 8 de 12",
    question: "¿Qué pasa si una función no tiene return?",
    options: [
      { id: "a", label: "Devuelve null automáticamente." },
      { id: "b", label: "Devuelve undefined." },
      { id: "c", label: "Lanza un error en tiempo de ejecución." },
      { id: "d", label: "Devuelve 0." },
    ],
    correctId: "b",
    explanation:
      "Sin return explícito, la función devuelve undefined. Si esperabas un valor, casi siempre es un bug.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 9 de 12",
    question: "¿Cuál es el resultado de calcular(3, 4)?",
    code: {
      label: "JavaScript",
      content: `function calcular(a, b) {\n  return a * b + 2;\n}`,
    },
    options: [
      { id: "a", label: "12" },
      { id: "b", label: "14" },
      { id: "c", label: "20" },
      { id: "d", label: "9" },
    ],
    correctId: "b",
    explanation:
      "3 * 4 = 12, más 2 da 14. La precedencia de operadores hace que * se evalúe antes que +.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 10 de 12",
    question: "¿Cuántas veces puedes llamar a la misma función?",
    options: [
      { id: "a", label: "Una sola vez." },
      { id: "b", label: "Tantas veces como necesites." },
      { id: "c", label: "Solo dentro del mismo archivo." },
      { id: "d", label: "Solo si la declaras como reusable." },
    ],
    correctId: "b",
    explanation:
      "Esa es la magia de las funciones: una vez declaradas, puedes llamarlas todas las veces que necesites.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo esencial de funciones",
    takeaways: [
      "Una función empaqueta lógica reutilizable.",
      "Los parámetros la hacen flexible.",
      "El return entrega un resultado al exterior.",
      "Una función debe hacer una sola cosa, y hacerla bien.",
    ],
  },
  {
    kind: "completion",
    eyebrow: "¡Lección completada!",
    title: "Reutilizar lógica te ahorra horas",
    message: "Ya sabes empaquetar acciones. Vamos a ver cómo organizar grupos de datos.",
  },
];

const arreglosObjetosSteps: LessonStep[] = [
  {
    kind: "concept",
    eyebrow: "Concepto · 1 de 12",
    title: "Arreglos y objetos",
    paragraphs: [
      "Un **arreglo** guarda varios valores en orden, accesibles por su posición empezando en 0.",
      "Un **objeto** reúne propiedades relacionadas bajo una misma entidad, accesibles por su clave.",
    ],
    code: {
      label: "Sintaxis básica",
      content: `const modulos = ["Variables", "Bucles"];\nconst usuario = { nombre: "Ana", edad: 19 };`,
    },
  },
  {
    kind: "theory",
    eyebrow: "Teoría · 2 de 12",
    title: "Arreglo vs objeto",
    description:
      "Las dos estructuras guardan colecciones, pero responden a preguntas distintas. Elegir la correcta simplifica todo tu código.",
    table: {
      headers: ["Arreglo", "Objeto"],
      rows: [
        ["Lista ordenada", "Entidad con atributos"],
        ["Acceso por índice", "Acceso por clave"],
        ["modulos[0]", "usuario.nombre"],
        ["Mismo tipo de cosas", "Propiedades distintas"],
      ],
    },
    callouts: [
      {
        icon: "List",
        title: "Arreglo",
        description: "Varios elementos similares ordenados.",
      },
      {
        icon: "Box",
        title: "Objeto",
        description: "Una entidad con propiedades nombradas.",
      },
      {
        icon: "Layers",
        title: "Combinados",
        description: "Listas de objetos: lo más común en apps reales.",
      },
    ],
  },
  {
    kind: "codeExample",
    eyebrow: "Teoría + código · 3 de 12",
    title: "Trabajando con ambos",
    description:
      "Accedes a un arreglo por índice y a un objeto por clave. Combinándolos representas la mayoría de los datos reales.",
    code: {
      label: "JavaScript",
      content: `const tareas = [\n  { titulo: "Estudiar", hecha: true },\n  { titulo: "Leer", hecha: false },\n];\n\nconsole.log(tareas[0].titulo); // "Estudiar"\nconsole.log(tareas[1].hecha);  // false`,
    },
    notes: [
      "Los arreglos empiezan en 0, no en 1.",
      "Combinar arreglos y objetos modela datos reales.",
    ],
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 4 de 12",
    title: "Acceso por índice",
    explanation:
      "Los arreglos se indexan desde **0**. El primer elemento es arr[0], el segundo arr[1], y así sucesivamente.",
    code: {
      label: "JavaScript",
      content: `const colores = ["rojo", "verde", "azul"];`,
    },
    question: "¿Qué devuelve colores[2]?",
    options: [
      { id: "a", label: '"rojo"' },
      { id: "b", label: '"verde"' },
      { id: "c", label: '"azul"' },
      { id: "d", label: "undefined" },
    ],
    correctId: "c",
    answerExplanation:
      'colores[0] es "rojo", colores[1] es "verde" y colores[2] es "azul". Los índices empiezan en 0.',
  },
  {
    kind: "practice",
    eyebrow: "Teoría + práctica · 5 de 12",
    title: "Acceso por propiedad",
    explanation:
      'A un objeto se accede con **punto** (obj.prop) o con **corchetes** (obj["prop"]). El punto es más común.',
    code: {
      label: "JavaScript",
      content: `const usuario = {\n  nombre: "Ana",\n  edad: 19,\n};`,
    },
    question: "¿Cómo obtienes el valor de la edad del usuario?",
    options: [
      { id: "a", label: "usuario[1]" },
      { id: "b", label: "usuario.edad" },
      { id: "c", label: "usuario(edad)" },
      { id: "d", label: 'edad("usuario")' },
    ],
    correctId: "b",
    answerExplanation:
      "Los objetos se acceden por nombre de propiedad usando el punto. usuario.edad devuelve 19.",
  },
  {
    kind: "tip",
    eyebrow: "Buenas prácticas · 6 de 12",
    title: "Modela tus datos antes de codificar",
    icon: "Lightbulb",
    variant: "tip",
    body: "Antes de escribir, dibuja en papel cómo se ven tus datos: ¿es una lista? ¿son varios atributos? Esa decisión define la mitad del código.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 7 de 12",
    question: "¿Cómo representarías una lista de 5 productos con nombre y precio?",
    options: [
      { id: "a", label: "Un solo objeto con 5 propiedades." },
      { id: "b", label: "Un arreglo de 5 strings." },
      { id: "c", label: "Un arreglo de 5 objetos { nombre, precio }." },
      { id: "d", label: "Cinco variables sueltas." },
    ],
    correctId: "c",
    explanation:
      "Lista + atributos por elemento = arreglo de objetos. Es el patrón que se repite en todas las apps reales.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 8 de 12",
    question: "¿Qué imprime este código?",
    code: {
      label: "JavaScript",
      content: `const lista = ["a", "b", "c"];\nconsole.log(lista.length);`,
    },
    options: [
      { id: "a", label: "0" },
      { id: "b", label: "2" },
      { id: "c", label: "3" },
      { id: "d", label: "undefined" },
    ],
    correctId: "c",
    explanation:
      "length devuelve la cantidad de elementos del arreglo. Hay 3 elementos, así que imprime 3.",
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 9 de 12",
    question: "¿Qué imprime?",
    code: {
      label: "JavaScript",
      content: `const tareas = [\n  { titulo: "Leer", hecha: true },\n  { titulo: "Correr", hecha: false },\n];\n\nconsole.log(tareas[1].titulo);`,
    },
    options: [
      { id: "a", label: '"Leer"' },
      { id: "b", label: '"Correr"' },
      { id: "c", label: "true" },
      { id: "d", label: "undefined" },
    ],
    correctId: "b",
    explanation: 'tareas[1] es el segundo objeto. Su propiedad titulo es "Correr".',
  },
  {
    kind: "quiz",
    eyebrow: "Ejercicio · 10 de 12",
    question: "¿Qué estructura usarías para guardar los datos de un usuario (nombre, email, edad)?",
    options: [
      { id: "a", label: "Un arreglo." },
      { id: "b", label: "Un objeto con tres propiedades." },
      { id: "c", label: "Tres variables sueltas." },
      { id: "d", label: "Un string con comas." },
    ],
    correctId: "b",
    explanation:
      "Un objeto agrupa propiedades nombradas bajo una entidad. Es ideal para representar un usuario.",
  },
  {
    kind: "recap",
    eyebrow: "Resumen · 11 de 12",
    title: "Lo que ya dominas",
    takeaways: [
      "Arreglo: lista ordenada con acceso por índice.",
      "Objeto: entidad con propiedades, acceso por clave.",
      "Arreglos de objetos son lo más común en apps reales.",
      "El primer paso siempre es modelar los datos.",
    ],
  },
  {
    kind: "completion",
    eyebrow: "¡Ruta inicial completada!",
    title: "Hiciste todo el recorrido",
    message:
      "Cubriste las cinco lecciones esenciales. Ya tienes la base para construir lógica de verdad.",
  },
];

export const learningModules: LearningModule[] = [
  {
    courseId: "fundamentos-programacion",
    slug: "que-es-un-algoritmo",
    title: "¿Qué es un algoritmo?",
    subtitle: "La base para entender cómo piensa un programa",
    description:
      "Comprende qué es un algoritmo, cómo se estructura y cómo reconocerlo tanto en la vida diaria como en programación.",
    duration: "6 min",
    level: "Inicial",
    icon: "Route",
    tone: "emerald",
    steps: algoritmosSteps,
    evaluationMode: "graded",
    nextSlug: "representacion-algoritmos-diagramas-flujo",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "representacion-algoritmos-diagramas-flujo",
    title: "Representación de algoritmos: diagramas de flujo",
    subtitle: "Visualiza la lógica antes de convertirla en código",
    description:
      "Aprende cómo los diagramas de flujo y el pseudocódigo ayudan a planificar algoritmos con claridad.",
    duration: "7 min",
    level: "Inicial",
    icon: "Workflow",
    tone: "cyan",
    steps: representacionAlgoritmosSteps,
    evaluationMode: "graded",
    nextSlug: "representacion-algoritmos-pseudocodigo",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "representacion-algoritmos-pseudocodigo",
    title: "Representación de algoritmos: Pseudocódigo",
    subtitle: "Escribe la lógica de un algoritmo antes de programarlo",
    description:
      "Aprende la estructura básica del pseudocódigo, sus palabras clave y cómo ordenar instrucciones para resolver problemas.",
    duration: "8 min",
    level: "Inicial",
    icon: "Braces",
    tone: "amber",
    steps: pseudocodigoSteps,
    evaluationMode: "graded",
    nextSlug: "estructura-de-un-programa",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "estructura-de-un-programa",
    title: "Estructura de un programa",
    subtitle: "Conecta algoritmos, datos, cuerpo y funciones",
    description:
      "Identifica las partes de un programa: librerías, declaración de datos, cuerpo principal, subprogramas y comentarios.",
    duration: "9 min",
    level: "Inicial",
    icon: "FileCode",
    tone: "violet",
    steps: estructuraProgramaSteps,
    evaluationMode: "graded",
    nextSlug: "variables-y-constantes",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "variables-y-constantes",
    title: "Variables y constantes",
    subtitle: "Nombra datos que cambian y valores que permanecen fijos",
    description:
      "Aprende la diferencia entre variables y constantes, sus reglas de nombrado y buenas prácticas para escribir datos claros.",
    duration: "7 min",
    level: "Inicial",
    icon: "Variable",
    tone: "rose",
    steps: variablesConstantesSteps,
    evaluationMode: "graded",
    nextSlug: "uso-de-variables-y-constantes",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "uso-de-variables-y-constantes",
    title: "Uso de variables y constantes",
    subtitle: "Inicializa, actualiza y sigue los datos de un algoritmo",
    description:
      "Practica cómo inicializar, consultar y actualizar variables, reutilizar constantes y seguir el estado de un problema paso a paso.",
    duration: "8 min",
    level: "Inicial",
    icon: "RefreshCw",
    tone: "violet",
    steps: usoVariablesConstantesSteps,
    evaluationMode: "graded",
    nextSlug: "tipos-de-datos",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "tipos-de-datos",
    title: "Tipos de datos",
    subtitle: "Distingue números, texto y valores lógicos",
    description:
      "Aprende cuándo usar enteros, decimales, cadenas de texto y booleanos para representar información en un programa.",
    duration: "7 min",
    level: "Inicial",
    icon: "Brackets",
    tone: "cyan",
    steps: tiposDatosSteps,
    evaluationMode: "graded",
    nextSlug: "uso-tipo-dato-booleano",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "uso-tipo-dato-booleano",
    title: "Uso del tipo de dato booleano",
    subtitle: "Modela y actualiza estados de verdadero o falso",
    description:
      "Practica cómo inicializar, actualizar y consultar banderas booleanas para representar estados reales dentro de un programa.",
    duration: "8 min",
    level: "Inicial",
    icon: "CircleCheck",
    tone: "amber",
    steps: usoBooleanosSteps,
    evaluationMode: "graded",
    nextSlug: "operadores",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "operadores",
    title: "Operadores",
    subtitle: "Calcula, compara y combina condiciones",
    description:
      "Aprende a usar operadores aritméticos, de asignación, relacionales y lógicos para construir expresiones y decisiones.",
    duration: "8 min",
    level: "Inicial",
    icon: "Calculator",
    tone: "emerald",
    steps: operadoresSteps,
    evaluationMode: "graded",
    nextSlug: "operadores-aritmeticos",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "operadores-aritmeticos",
    title: "Operadores aritméticos",
    subtitle: "Combina cálculos con precedencia y claridad",
    description:
      "Profundiza en la precedencia, la agrupación y el uso del residuo mediante cálculos prácticos en JavaScript.",
    duration: "9 min",
    level: "Inicial",
    icon: "Calculator",
    tone: "cyan",
    steps: operadoresAritmeticosSteps,
    evaluationMode: "graded",
    nextSlug: "operadores-asignacion",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "operadores-asignacion",
    title: "Operadores de asignación",
    subtitle: "Actualiza contadores, saldos e inventarios",
    description:
      "Practica asignaciones simples y compuestas para seguir cambios de estado de forma clara en JavaScript.",
    duration: "9 min",
    level: "Inicial",
    icon: "RefreshCw",
    tone: "violet",
    steps: operadoresAsignacionSteps,
    evaluationMode: "graded",
    nextSlug: "operadores-comparacion",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "operadores-comparacion",
    title: "Operadores de comparación",
    subtitle: "Traduce requisitos a respuestas booleanas",
    description:
      "Compara valores y tipos, interpreta límites y convierte reglas concretas en expresiones booleanas de JavaScript.",
    duration: "9 min",
    level: "Inicial",
    icon: "Scale",
    tone: "amber",
    steps: operadoresComparacionSteps,
    evaluationMode: "graded",
    nextSlug: "operadores-logicos",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "operadores-logicos",
    title: "Operadores lógicos",
    subtitle: "Construye reglas con AND, OR y NOT",
    description:
      "Combina y niega condiciones, interpreta tablas de verdad y agrupa reglas de negocio legibles en JavaScript.",
    duration: "9 min",
    level: "Inicial",
    icon: "Workflow",
    tone: "rose",
    steps: operadoresLogicosSteps,
    evaluationMode: "graded",
    nextSlug: "estructuras-control-condicionales",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "estructuras-control-condicionales",
    title: "Estructuras de control: Condicionales",
    subtitle: "Decide entre caminos con if, if...else y switch",
    description:
      "Aprende cómo las estructuras condicionales permiten que un programa tome decisiones con condiciones simples o múltiples.",
    duration: "8 min",
    level: "Inicial",
    icon: "GitBranch",
    tone: "amber",
    steps: estructurasCondicionalesSteps,
    evaluationMode: "graded",
    nextSlug: "condicionales-a-profundidad",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "condicionales-a-profundidad",
    title: "Condicionales a profundidad",
    subtitle: "Diseña decisiones robustas, claras y sin casos límite olvidados",
    description:
      "Profundiza en rangos, anidación, cláusulas de guarda, valores truthy y falsy, ternarios y casos agrupados con ejercicios prácticos en JavaScript.",
    duration: "12 min",
    level: "Intermedio",
    icon: "GitBranch",
    tone: "cyan",
    steps: condicionalesProfundidadSteps,
    evaluationMode: "graded",
    nextSlug: "estructuras-control-bucles",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "estructuras-control-bucles",
    title: "Estructuras de control: bucles",
    subtitle: "Repite tareas con while, do-while y for",
    description:
      "Aprende cómo los bucles permiten repetir instrucciones de forma controlada usando estado inicial, condición de parada e incremento.",
    duration: "9 min",
    level: "Inicial",
    icon: "Repeat2",
    tone: "violet",
    steps: estructurasBuclesSteps,
    evaluationMode: "graded",
    nextSlug: "bucles-a-profundidad",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "bucles-a-profundidad",
    title: "Bucles a profundidad",
    subtitle: "Controla recorridos, límites y resultados paso a paso",
    description:
      "Profundiza en límites, for...of, acumuladores, break, continue y bucles anidados mediante ejercicios prácticos en JavaScript.",
    duration: "13 min",
    level: "Intermedio",
    icon: "Repeat2",
    tone: "emerald",
    steps: buclesProfundidadSteps,
    evaluationMode: "graded",
    nextSlug: "estructuras-datos-arreglos",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "estructuras-datos-arreglos",
    title: "Estructuras de datos: arreglos",
    subtitle: "Organiza múltiples valores con índices",
    description:
      "Aprende qué es un arreglo, cómo guarda datos en posiciones consecutivas y cómo acceder a sus elementos mediante índices.",
    duration: "7 min",
    level: "Inicial",
    icon: "List",
    tone: "cyan",
    steps: arreglosSteps,
    evaluationMode: "graded",
    nextSlug: "arreglos-unidimensionales-vectores",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "arreglos-unidimensionales-vectores",
    title: "Arreglos unidimensionales: vectores",
    subtitle: "Declara, llena y recorre listas con índices",
    description:
      "Aprende cómo declarar vectores, asignar valores, leer elementos y recorrerlos usando ciclos.",
    duration: "8 min",
    level: "Inicial",
    icon: "ListOrdered",
    tone: "rose",
    steps: vectoresSteps,
    evaluationMode: "graded",
    nextSlug: "arreglos-bidimensionales-matrices",
  },
  {
    courseId: "fundamentos-programacion",
    slug: "arreglos-bidimensionales-matrices",
    title: "Arreglos bidimensionales: matrices",
    subtitle: "Organiza datos en filas y columnas",
    description:
      "Aprende cómo declarar, representar, llenar y recorrer matrices usando coordenadas de fila y columna.",
    duration: "8 min",
    level: "Inicial",
    icon: "Table",
    tone: "amber",
    steps: matricesSteps,
    evaluationMode: "graded",
  },
  {
    courseId: "fundamentos-javascript",
    slug: "variables-y-tipos",
    title: "Variables y Tipos de Datos",
    subtitle: "El punto de partida para guardar y entender información",
    description:
      "Aprende a declarar variables, distinguir texto de números y reconocer cómo representa datos un programa.",
    duration: "5 min",
    level: "Inicial",
    icon: "Database",
    tone: "cyan",
    steps: variablesSteps,
    nextSlug: "condicionales",
  },
  {
    courseId: "fundamentos-javascript",
    slug: "condicionales",
    title: "Condicionales",
    subtitle: "Cómo tomar decisiones dentro de un programa",
    description:
      "Descubre cómo usar condiciones para que tu código responda de forma diferente según una regla.",
    duration: "5 min",
    level: "Inicial",
    icon: "GitBranch",
    tone: "amber",
    steps: condicionalesSteps,
    nextSlug: "bucles",
  },
  {
    courseId: "fundamentos-javascript",
    slug: "bucles",
    title: "Bucles",
    subtitle: "Repite tareas sin escribir el mismo código muchas veces",
    description:
      "Entiende cómo automatizar repeticiones con estructuras que recorren acciones o colecciones.",
    duration: "5 min",
    level: "Inicial",
    icon: "Repeat2",
    tone: "emerald",
    steps: buclesSteps,
    nextSlug: "funciones",
  },
  {
    courseId: "fundamentos-javascript",
    slug: "funciones",
    title: "Funciones",
    subtitle: "Agrupa lógica reutilizable en bloques con intención",
    description:
      "Aprende a encapsular tareas para reutilizar código y organizar mejor tus programas.",
    duration: "5 min",
    level: "Inicial",
    icon: "Braces",
    tone: "violet",
    steps: funcionesSteps,
    nextSlug: "arreglos-y-objetos",
  },
  {
    courseId: "fundamentos-javascript",
    slug: "arreglos-y-objetos",
    title: "Arreglos y Objetos",
    subtitle: "Organiza información simple y estructurada",
    description:
      "Conoce dos estructuras fundamentales para manejar grupos de datos y registros con propiedades.",
    duration: "5 min",
    level: "Intermedio",
    icon: "Blocks",
    tone: "rose",
    steps: arreglosObjetosSteps,
  },
];

const learningStatsConfig: Record<CourseId, Omit<LearningStats, "totalModules">> = {
  "fundamentos-programacion": {
    currentStreak: "1 día",
    completedModules: 0,
    nextFocus: "¿Qué es un algoritmo?",
  },
  "fundamentos-javascript": {
    currentStreak: "4 días",
    completedModules: 2,
    nextFocus: "Condicionales",
  },
  "poo-javascript": {
    currentStreak: "0 días",
    completedModules: 0,
    nextFocus: "Próximamente",
  },
};

export function getModulesByCourseId(courseId: CourseId) {
  return learningModules.filter((module) => module.courseId === courseId);
}

export function getLearningStatsByCourseId(courseId: CourseId): LearningStats {
  const modules = getModulesByCourseId(courseId);
  const configuredStats = learningStatsConfig[courseId];

  return {
    currentStreak: configuredStats.currentStreak,
    completedModules: Math.min(configuredStats.completedModules, modules.length),
    totalModules: modules.length,
    nextFocus: configuredStats.nextFocus || modules[0]?.title || "Tu siguiente lección",
  };
}

export function getModuleBySlug(slug: string) {
  return learningModules.find((module) => module.slug === slug);
}

export function getNextModule(slug: string) {
  const currentModule = getModuleBySlug(slug);
  if (!currentModule?.nextSlug) {
    return undefined;
  }

  return getModuleBySlug(currentModule.nextSlug);
}
