import { flashcardTopics } from "@/data/flashcard-topics";

export interface QuizQuestion {
  id: string;
  prompt: string;
  codeLabel?: string;
  code?: string;
  options: [string, string, string, string];
  correctOptionIndex: number;
}

export interface QuizTopicSession {
  topicSlug: string;
  topicTitle: string;
  questions: QuizQuestion[];
}

type QuizQuestionInput = Omit<QuizQuestion, "id">;

function buildQuizTopic(topicSlug: string, questions: QuizQuestionInput[]): QuizTopicSession {
  const topic = flashcardTopics.find((item) => item.slug === topicSlug);

  if (!topic) {
    throw new Error(`Quiz topic not found: ${topicSlug}`);
  }

  if (questions.length !== 5) {
    throw new Error(`Quiz topic "${topicSlug}" must contain exactly 5 questions.`);
  }

  return {
    topicSlug,
    topicTitle: topic.title,
    questions: questions.map((question, index) => ({
      id: `${topicSlug}-${index + 1}`,
      ...question,
    })),
  };
}

export const quizTopicSessions: QuizTopicSession[] = [
  buildQuizTopic("variables", [
    {
      prompt: "¿Cuál es la mejor descripción de una variable en JavaScript?",
      options: [
        "Un espacio para guardar un valor y reutilizarlo después",
        "Una función que repite instrucciones automáticamente",
        "Un comentario que explica el código",
        "Un tipo de dato exclusivo para números",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué palabra clave permite cambiar el valor más adelante?",
      codeLabel: "Reasignación",
      code: `let progreso = 1;\nprogreso = 2;`,
      options: ["const", "static", "let", "import"],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué nombre de variable comunica mejor su intención?",
      options: ["x", "dato1", "valor", "totalCursos"],
      correctOptionIndex: 3,
    },
    {
      prompt: "¿Qué línea muestra correctamente el valor guardado en una variable?",
      codeLabel: "Uso básico",
      code: `const nombre = "Lucía";`,
      options: [
        "console.log(nombre);",
        "console.log(const nombre);",
        "print = nombre;",
        "nombre.console();",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Cuándo conviene usar una variable?",
      options: [
        "Cuando quieres reutilizar o actualizar un valor dentro del programa",
        "Solo cuando trabajas con arreglos",
        "Únicamente para mostrar mensajes en pantalla",
        "Solo si el valor nunca se vuelve a usar",
      ],
      correctOptionIndex: 0,
    },
  ]),
  buildQuizTopic("tipos-de-datos", [
    {
      prompt: '¿Qué tipo de dato representa "JavaScript"?',
      options: ["number", "boolean", "string", "array"],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué valor es booleano?",
      options: ['"false"', "0", "true", '"0"'],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué devuelve `typeof 19.99`?",
      codeLabel: "typeof",
      code: `const precio = 19.99;\nconsole.log(typeof precio);`,
      options: ['"number"', '"string"', '"boolean"', '"object"'],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué tipo conviene usar para una edad?",
      options: ["string", "number", "boolean", "null"],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué combinación representa texto, número y booleano en ese orden?",
      options: ['"Ana", 18, true', '18, "Ana", true', "true, 18, false", '"Ana", false, "18"'],
      correctOptionIndex: 0,
    },
  ]),
  buildQuizTopic("condicionales", [
    {
      prompt: "¿Para qué sirve una estructura `if`?",
      options: [
        "Para repetir un bloque un número fijo de veces",
        "Para tomar una decisión según una condición",
        "Para declarar variables globales",
        "Para convertir texto en números",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué ocurre si la condición del `if` no se cumple y existe `else`?",
      options: [
        "El programa se detiene",
        "Se ejecuta el bloque `else`",
        "Se reinicia la condición",
        "La variable cambia a `true`",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Cuál expresión compara si `edad` es mayor o igual a 18?",
      options: ["edad = 18", "edad >= 18", "edad => 18", "edad ===> 18"],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué bloque se usa cuando tienes más de dos caminos posibles?",
      codeLabel: "Varias rutas",
      code: `if (nivel === "básico") {\n  console.log("Empieza aquí");\n} else if (nivel === "medio") {\n  console.log("Sigue practicando");\n} else {\n  console.log("Nivel avanzado");\n}`,
      options: ["switch final", "while", "else if", "return"],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué valor tendrá `puedeAvanzar` si `progreso` vale 6?",
      codeLabel: "Condición booleana",
      code: `const puedeAvanzar = progreso >= 5;`,
      options: ["true", "false", "undefined", '"6"'],
      correctOptionIndex: 0,
    },
  ]),
  buildQuizTopic("bucles", [
    {
      prompt: "¿Cuál es el objetivo principal de un bucle?",
      options: [
        "Guardar datos en un objeto",
        "Repetir una tarea siguiendo una regla",
        "Crear funciones automáticamente",
        "Declarar componentes visuales",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué necesita todo bucle para evitar repetirse para siempre?",
      options: [
        "Una condición de salida",
        "Una variable `const`",
        "Una función `return`",
        "Un arreglo con cuatro elementos",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué imprimirá este código?",
      codeLabel: "for",
      code: `for (let paso = 1; paso <= 3; paso += 1) {\n  console.log(paso);\n}`,
      options: ["1, 2, 3", "0, 1, 2", "1, 2, 3, 4", "Solo 3"],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué bucle encaja mejor para recorrer cada elemento de un arreglo?",
      options: ["for...of", "if...else", "try...catch", "switch"],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué cambio acerca un contador al final del bucle?",
      options: ["contador = contador", "contador += 1", "contador === 1", "contador: 1"],
      correctOptionIndex: 1,
    },
  ]),
  buildQuizTopic("funciones", [
    {
      prompt: "¿Qué es una función?",
      options: [
        "Un bloque reutilizable de instrucciones",
        "Un comentario para describir código",
        "Una lista de datos ordenados",
        "Una condición que siempre devuelve `true`",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Para qué sirven los parámetros?",
      options: [
        "Para guardar errores del sistema",
        "Para pasar datos de entrada a la función",
        "Para cerrar un bucle",
        "Para cambiar el tipo de dato de una variable",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué hace `return` dentro de una función?",
      codeLabel: "Retorno",
      code: `function doble(numero) {\n  return numero * 2;\n}`,
      options: [
        "Repite la función dos veces",
        "Detiene la app",
        "Entrega el resultado calculado",
        "Convierte el valor en texto",
      ],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué característica describe a una buena función?",
      options: [
        "Hace muchas tareas al mismo tiempo",
        "Tiene una responsabilidad clara",
        "Siempre usa variables globales",
        "Nunca recibe parámetros",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué valor tendrá `mensaje`?",
      codeLabel: "Uso de función",
      code: `function crearMensaje(tema) {\n  return \`Repasa \${tema}\`;\n}\n\nconst mensaje = crearMensaje("Funciones");`,
      options: ['"Funciones"', '"Repasa Funciones"', '"crearMensaje"', "undefined"],
      correctOptionIndex: 1,
    },
  ]),
  buildQuizTopic("arreglos", [
    {
      prompt: "¿Qué es un arreglo?",
      options: [
        "Una estructura para guardar varios valores en orden",
        "Una función que devuelve texto",
        "Una condición booleana",
        "Un bloque para capturar errores",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿En qué índice está el primer elemento de un arreglo?",
      options: ["1", "-1", "0", "Depende del navegador"],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué método agrega un elemento al final del arreglo?",
      codeLabel: "Agregar elemento",
      code: `modulos.push("Objetos");`,
      options: ["map()", "push()", "filter()", "join()"],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué imprimiría `modulos[0]`?",
      codeLabel: "Acceso por índice",
      code: `const modulos = ["Variables", "Bucles", "Funciones"];`,
      options: ['"Bucles"', '"Variables"', '"Funciones"', "0"],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Cuál es un uso común de los arreglos en una app?",
      options: [
        "Representar listas de cursos, usuarios o tareas",
        "Reemplazar todas las funciones",
        "Evitar usar variables",
        "Crear estilos visuales automáticamente",
      ],
      correctOptionIndex: 0,
    },
  ]),
  buildQuizTopic("objetos", [
    {
      prompt: "¿Qué representa mejor un objeto?",
      options: [
        "Una lista ordenada de valores sin nombres",
        "Un grupo de propiedades relacionadas en una entidad",
        "Una condición para comparar números",
        "Un bucle que recorre datos",
      ],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Cómo accedes a la propiedad `nombre`?",
      codeLabel: "Propiedad",
      code: `const estudiante = {\n  nombre: "Luis",\n  progreso: 3,\n};`,
      options: [
        "estudiante[nombre]",
        "estudiante->nombre",
        "estudiante.nombre",
        "nombre.estudiante",
      ],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué línea actualiza correctamente el progreso a 4?",
      options: [
        "estudiante.progreso = 4",
        "estudiante = progreso.4",
        "progreso.estudiante = 4",
        "update estudiante.progreso 4",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué estructura describe mejor una colección de cursos con título?",
      options: [
        '["Variables", "Funciones"]',
        '{ titulo: "Variables" }',
        '[{ titulo: "Variables" }, { titulo: "Funciones" }]',
        '"Variables, Funciones"',
      ],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Para qué ayudan los objetos en una app?",
      options: [
        "Para modelar entidades como perfiles, módulos o usuarios",
        "Para evitar usar arreglos",
        "Solo para imprimir mensajes",
        "Para ejecutar código más rápido en todos los casos",
      ],
      correctOptionIndex: 0,
    },
  ]),
  buildQuizTopic("manejo-de-errores", [
    {
      prompt: "¿Cuál es el propósito del manejo de errores?",
      options: [
        "Evitar que una falla rompa por completo la experiencia",
        "Eliminar todas las validaciones",
        "Convertir cualquier dato en string",
        "Hacer que los bucles sean más rápidos",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué bloque captura una excepción en JavaScript?",
      options: ["if", "catch", "finally", "switch"],
      correctOptionIndex: 1,
    },
    {
      prompt: "¿Qué parte intenta ejecutar una operación que podría fallar?",
      codeLabel: "try/catch",
      code: `try {\n  JSON.parse("{ invalido }");\n} catch (error) {\n  console.log("Algo salió mal");\n}`,
      options: ["throw", "catch", "try", "return"],
      correctOptionIndex: 2,
    },
    {
      prompt: "¿Qué ayuda a prevenir errores antes de que ocurran?",
      options: [
        "Validar los datos antes de usarlos",
        "Usar solo variables globales",
        "Quitar todos los `if`",
        "Declarar todo con `var`",
      ],
      correctOptionIndex: 0,
    },
    {
      prompt: "¿Qué aporta un mensaje de error claro?",
      options: [
        "Oculta el problema al usuario",
        "Ayuda a entender qué pasó y qué hacer después",
        "Hace innecesario usar `catch`",
        "Evita por completo los errores de sintaxis",
      ],
      correctOptionIndex: 1,
    },
  ]),
];

export function getQuizTopicSession(topicSlug: string) {
  return quizTopicSessions.find((topic) => topic.topicSlug === topicSlug);
}
