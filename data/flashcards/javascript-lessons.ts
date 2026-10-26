import { cardsFromLesson } from "@/data/flashcards/content";

export const javascriptLessonCards = [
  ...cardsFromLesson("variables-y-tipos", "JavaScript", [
    {
      id: "js-let",
      title: "Declaración let",
      stepTitle: "Declarando variables con const y let",
      body: "Declaración de una variable de JavaScript a la que se le puede asignar otro valor después.",
      code: "let puntos = 0;\npuntos = puntos + 10;",
    },
    {
      id: "js-const",
      title: "Declaración const",
      stepTitle: "Declarando variables con const y let",
      body: "Declaración de JavaScript que exige un valor inicial e impide reasignar la variable después.",
      code: 'const nombre = "Ana";\nconsole.log(nombre); // Ana',
    },
    {
      id: "js-number",
      title: "Tipo number",
      stepTitle: "Tipos de datos primitivos",
      body: "Tipo numérico de JavaScript que representa tanto enteros como decimales y permite realizar operaciones aritméticas.",
      code: "const cantidad = 3;\nconst precio = 2.5;\nconsole.log(cantidad * precio); // 7.5",
    },
  ]),
  ...cardsFromLesson("condicionales", "JavaScript", [
    {
      id: "js-if-else",
      title: "Condicional if...else",
      stepTitle: "Decisiones en el código",
      body: "Estructura que ejecuta un bloque si una condición se cumple y otro bloque si no se cumple.",
      code: 'const puntaje = 88;\nif (puntaje >= 70) {\n  console.log("Bien");\n} else {\n  console.log("A mejorar");\n}',
    },
    {
      id: "js-igualdad-estricta",
      title: "Igualdad estricta (===)",
      stepTitle: "Operadores de comparación",
      body: "Operador que compara valor y tipo sin convertir automáticamente los datos.",
      code: 'console.log(19 === 19); // true\nconsole.log(19 === "19"); // false',
    },
  ]),
  ...cardsFromLesson("bucles", "JavaScript", [
    {
      id: "js-for",
      title: "Bucle for",
      stepTitle: "for clásico y while",
      body: "Bucle que reúne la inicialización, la condición para continuar y el avance en su encabezado.",
      code: "for (let paso = 1; paso <= 3; paso++) {\n  console.log(paso);\n}",
    },
    {
      id: "js-while",
      title: "Bucle while",
      stepTitle: "for clásico y while",
      body: "Bucle que repite un bloque mientras su condición sea verdadera, comprobándola antes de cada ejecución.",
      code: "let intentos = 0;\nwhile (intentos < 3) {\n  intentos++;\n}",
    },
    {
      id: "js-for-of",
      title: "Recorrido for...of",
      stepTitle: "Tipos de bucles",
      body: "Bucle que permite recorrer directamente los valores de un arreglo, sin administrar un índice.",
      code: 'const temas = ["Variables", "Funciones"];\nfor (const tema of temas) {\n  console.log(tema);\n}',
    },
  ]),
  ...cardsFromLesson("funciones", "JavaScript", [
    {
      id: "js-funcion",
      title: "Función",
      stepTitle: "Bloques de lógica con nombre",
      body: "Bloque de instrucciones reutilizable que se ejecuta al llamarlo por su nombre.",
      code: 'function saludar() {\n  return "Hola";\n}\nconsole.log(saludar());',
    },
    {
      id: "js-parametro",
      title: "Parámetro de una función",
      stepTitle: "Función con parámetros y retorno",
      body: "Nombre declarado en una función que recibe uno de los valores proporcionados al llamarla.",
      code: 'function saludar(nombre) {\n  return "Hola, " + nombre;\n}\nconsole.log(saludar("Ana"));',
    },
    {
      id: "js-return",
      title: "Retorno de una función (return)",
      stepTitle: "Función con parámetros y retorno",
      body: "Instrucción que entrega un resultado a quien llamó la función y termina esa ejecución.",
      code: "function sumar(a, b) {\n  return a + b;\n}\nconst total = sumar(4, 7); // 11",
    },
  ]),
  ...cardsFromLesson("arreglos-y-objetos", "JavaScript", [
    {
      id: "js-arreglo",
      title: "Arreglo",
      stepTitle: "Arreglos y objetos",
      body: "Colección ordenada de valores a los que se accede mediante índices que comienzan en cero.",
      code: 'const modulos = ["Variables", "Bucles"];\nconsole.log(modulos[0]); // Variables',
    },
    {
      id: "js-objeto",
      title: "Objeto",
      stepTitle: "Arreglos y objetos",
      body: "Estructura que agrupa propiedades relacionadas para representar una entidad.",
      code: 'const usuario = { nombre: "Ana", edad: 19 };\nconsole.log(usuario);',
    },
    {
      id: "js-propiedad",
      title: "Propiedad de un objeto",
      stepTitle: "Arreglo vs objeto",
      body: "Dato de un objeto identificado por una clave y asociado a un valor. Puede consultarse usando esa clave.",
      code: 'const usuario = { nombre: "Ana" };\nconsole.log(usuario.nombre); // Ana',
    },
    {
      id: "js-arreglo-objetos",
      title: "Arreglo de objetos",
      stepTitle: "Trabajando con ambos",
      body: "Lista ordenada cuyos elementos son objetos. Se usa un índice para elegir el objeto y una clave para consultar su propiedad.",
      code: 'const tareas = [{ titulo: "Estudiar", hecha: true }];\nconsole.log(tareas[0].titulo); // Estudiar',
    },
  ]),
];
