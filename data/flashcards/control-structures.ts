import { cardsFromLesson } from "@/data/flashcards/content";

export const controlStructureCards = [
  ...cardsFromLesson("estructuras-control-condicionales", "JavaScript", [
    {
      id: "fp-if",
      title: "Condicional if",
      stepTitle: "Estructuras condicionales",
      body: "Estructura que ejecuta un bloque de instrucciones solamente cuando su condición se cumple.",
      code: 'const nota = 80;\nif (nota >= 60) {\n  console.log("Aprobaste");\n}',
    },
    {
      id: "fp-if-else",
      title: "Condicional if...else",
      stepTitle: "Condicional simple: Si / Sino",
      body: "Estructura que elige entre dos bloques: uno cuando la condición se cumple y otro cuando no se cumple.",
      code: 'const nota = 50;\nif (nota >= 60) {\n  console.log("Aprobaste");\n} else {\n  console.log("Reprobaste");\n}',
    },
    {
      id: "fp-switch",
      title: "Condicional switch",
      stepTitle: "Ejemplo en un lenguaje de programación",
      body: "Estructura que selecciona un caso según el valor de una expresión. break permite salir del bloque después del caso elegido.",
      code: 'const opcion = 1;\nswitch (opcion) {\n  case 1: console.log("Registrar"); break;\n  case 2: console.log("Consultar"); break;\n}',
    },
  ]),
  ...cardsFromLesson("condicionales-a-profundidad", "JavaScript", [
    {
      id: "fp-else-if",
      title: "Cadena else if",
      stepTitle: "Ordena de lo específico a lo general",
      body: "Secuencia de condiciones que se revisan en orden. Se ejecuta únicamente el primer bloque cuya condición se cumple.",
      code: 'const total = 700;\nif (total >= 1000) {\n  console.log("20%");\n} else if (total >= 500) {\n  console.log("10%");\n}',
    },
    {
      id: "fp-clausula-guarda",
      title: "Cláusula de guarda",
      stepTitle: "Resuelve primero los casos inválidos",
      body: "Condición que termina pronto una función cuando falta un requisito, dejando más claro el camino principal.",
      code: 'function calcularEnvio(total) {\n  if (total <= 0) return "Carrito vacío";\n  return "Envío: $99";\n}',
    },
    {
      id: "fp-ternario",
      title: "Operador ternario (? :)",
      stepTitle: "Elige un valor con una condición breve",
      body: "Expresión que elige uno de dos valores según una condición. Es útil para asignaciones breves.",
      code: 'const puntos = 82;\nconst estado = puntos >= 70 ? "Aprobado" : "Practicar";',
    },
  ]),
  ...cardsFromLesson("estructuras-control-bucles", "JavaScript", [
    {
      id: "fp-bucle",
      title: "Bucle",
      stepTitle: "Estructuras de control: bucles",
      body: "Estructura de control que repite un bloque de instrucciones de acuerdo con una condición o un recorrido.",
      code: "for (let paso = 1; paso <= 3; paso += 1) {\n  console.log(paso);\n}",
    },
    {
      id: "fp-condicion-parada",
      title: "Condición de parada de un bucle",
      stepTitle: "Estructura de un bucle",
      body: "Regla que determina cuándo termina la repetición. En while, el ciclo se detiene cuando su condición deja de ser verdadera.",
      code: "let intentos = 0;\nwhile (intentos < 3) {\n  intentos += 1;\n} // Termina cuando intentos llega a 3",
    },
    {
      id: "fp-while",
      title: "Bucle while",
      stepTitle: "Bucle mientras (while)",
      body: "Bucle que comprueba su condición antes de cada ejecución. Puede no ejecutar su bloque si la condición comienza siendo falsa.",
      code: "let contador = 1;\nwhile (contador <= 3) {\n  console.log(contador);\n  contador += 1;\n}",
    },
    {
      id: "fp-do-while",
      title: "Bucle do...while",
      stepTitle: "Lo esencial de los bucles",
      body: "Bucle que ejecuta primero su bloque y después comprueba la condición. En JavaScript repite mientras sea verdadera y se ejecuta al menos una vez.",
      code: "let contador = 1;\ndo {\n  console.log(contador);\n  contador += 1;\n} while (contador <= 3);",
    },
    {
      id: "fp-for",
      title: "Bucle for",
      stepTitle: "Bucle para (for)",
      body: "Bucle que reúne inicialización, condición y actualización. Resulta útil cuando se conoce el número de repeticiones.",
      code: "for (let numero = 1; numero <= 5; numero += 1) {\n  console.log(numero);\n}",
    },
  ]),
  ...cardsFromLesson("bucles-a-profundidad", "JavaScript", [
    {
      id: "fp-acumulador",
      title: "Acumulador",
      stepTitle: "Construye un resultado durante el recorrido",
      body: "Variable inicializada antes de un bucle que combina resultados a medida que se ejecutan sus iteraciones.",
      code: "let suma = 0;\nfor (let numero = 1; numero <= 4; numero += 1) {\n  suma += numero;\n} // suma vale 10",
    },
    {
      id: "fp-break",
      title: "break en un bucle",
      stepTitle: "Detén la búsqueda cuando ya terminaste",
      body: "Instrucción que termina inmediatamente el bucle más cercano que la contiene.",
      code: "for (let numero = 1; numero <= 10; numero += 1) {\n  if (numero === 4) break;\n  console.log(numero);\n} // Muestra 1, 2, 3",
    },
    {
      id: "fp-continue",
      title: "continue en un bucle",
      stepTitle: "Omite solo la iteración actual",
      body: "Instrucción que omite el resto de la iteración actual y permite continuar con la siguiente.",
      code: "for (let numero = 1; numero <= 3; numero += 1) {\n  if (numero === 2) continue;\n  console.log(numero);\n} // Muestra 1, 3",
    },
    {
      id: "fp-bucles-anidados",
      title: "Bucles anidados",
      stepTitle: "Combina recorridos por niveles",
      body: "Bucles situados dentro de otros bucles. El recorrido interior se ejecuta para cada iteración del exterior.",
      code: "for (let fila = 0; fila < 2; fila += 1) {\n  for (let columna = 0; columna < 3; columna += 1) {\n    console.log(fila, columna);\n  }\n} // 6 pares de coordenadas",
    },
  ]),
];
