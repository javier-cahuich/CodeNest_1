import { cardsFromLesson } from "@/data/flashcards/content";

export const operatorCards = [
  ...cardsFromLesson("operadores", "JavaScript", [
    {
      id: "fp-operando",
      title: "Operando",
      stepTitle: "Operadores",
      body: "Valor sobre el que actúa un operador. En 5 + 3, los operandos son 5 y 3.",
      code: "const resultado = 5 + 3; // 8",
    },
    {
      id: "fp-suma",
      title: "Suma numérica (+)",
      stepTitle: "Operadores aritméticos",
      body: "Operación que obtiene el total de dos valores numéricos.",
      code: "const total = 8 + 2; // 10",
    },
    {
      id: "fp-resta",
      title: "Resta (-)",
      stepTitle: "Operadores aritméticos",
      body: "Operación que obtiene la diferencia entre dos valores numéricos.",
      code: "const restantes = 8 - 2; // 6",
    },
    {
      id: "fp-multiplicacion",
      title: "Multiplicación (*)",
      stepTitle: "Operadores aritméticos",
      body: "Operación que obtiene el producto de dos valores numéricos.",
      code: "const total = 8 * 2; // 16",
    },
    {
      id: "fp-division",
      title: "División (/)",
      stepTitle: "Operadores aritméticos",
      body: "Operación que obtiene el cociente de dos números. En JavaScript, el resultado puede incluir decimales.",
      code: "const porcion = 9 / 2; // 4.5",
    },
    {
      id: "fp-residuo",
      title: "Residuo (%)",
      stepTitle: "Operadores aritméticos",
      body: "Operador que obtiene el resto de una división. Con enteros positivos permite comprobar si la división es exacta.",
      code: "const resto = 8 % 3; // 2\nconst esPar = 8 % 2 === 0; // true",
    },
  ]),
  ...cardsFromLesson("operadores-aritmeticos", "JavaScript", [
    {
      id: "fp-precedencia",
      title: "Precedencia de operadores",
      stepTitle: "JavaScript sigue un orden",
      body: "Reglas que determinan qué operaciones se evalúan primero. Los paréntesis permiten agrupar un cálculo explícitamente.",
      code: "const a = 10 + 2 * 3; // 16\nconst b = (10 + 2) * 3; // 36",
    },
  ]),
  ...cardsFromLesson("operadores-asignacion", "JavaScript", [
    {
      id: "fp-suma-asignacion",
      title: "Suma y asignación (+=)",
      stepTitle: "Asignación compuesta",
      body: "Operador que suma un valor al contenido actual de una variable y guarda el resultado en ella.",
      code: "let puntos = 10;\npuntos += 5; // equivale a puntos = puntos + 5",
    },
    {
      id: "fp-incremento",
      title: "Incremento de una unidad (++)",
      stepTitle: "Cambios de una unidad",
      body: "Operación que aumenta en uno el valor numérico de una variable.",
      code: "let contador = 0;\ncontador++; // contador vale 1",
    },
  ]),
  ...cardsFromLesson("operadores-comparacion", "JavaScript", [
    {
      id: "fp-comparacion",
      title: "Comparación de valores",
      stepTitle: "Convierte reglas en respuestas booleanas",
      body: "Operación que evalúa una relación entre dos valores y produce true o false.",
      code: "const edad = 20;\nconst puedeRegistrarse = edad >= 18; // true",
    },
    {
      id: "fp-igualdad-estricta",
      title: "Igualdad estricta (===)",
      stepTitle: "Compara valor y tipo",
      body: "Comparación de JavaScript que exige igualdad de valor y tipo, sin convertir automáticamente los operandos.",
      code: 'console.log(5 === 5);   // true\nconsole.log(5 === "5"); // false',
    },
    {
      id: "fp-mayor-igual",
      title: "Mayor o igual que (>=)",
      stepTitle: "Decide si el borde cuenta",
      body: "Comparación que es verdadera si el valor de la izquierda supera o iguala al de la derecha; incluye el límite.",
      code: "const nota = 70;\nconsole.log(nota >= 70); // true\nconsole.log(nota > 70);  // false",
    },
  ]),
  ...cardsFromLesson("operadores-logicos", "JavaScript", [
    {
      id: "fp-and",
      title: "Operador lógico AND (&&)",
      stepTitle: "&& exige todas las condiciones",
      body: "Al combinar condiciones booleanas, devuelve true únicamente si ambas son verdaderas.",
      code: "const tieneCuenta = true;\nconst correoVerificado = false;\nconsole.log(tieneCuenta && correoVerificado); // false",
    },
    {
      id: "fp-or",
      title: "Operador lógico OR (||)",
      stepTitle: "|| acepta alternativas",
      body: "Al combinar condiciones booleanas, devuelve true si al menos una es verdadera.",
      code: "const esAdministrador = false;\nconst esEditor = true;\nconsole.log(esAdministrador || esEditor); // true",
    },
    {
      id: "fp-not",
      title: "Operador lógico NOT (!)",
      stepTitle: "! invierte una condición",
      body: "Operador que invierte el resultado booleano de una condición: true pasa a false y false a true.",
      code: "const cuentaBloqueada = false;\nconsole.log(!cuentaBloqueada); // true",
    },
  ]),
];
