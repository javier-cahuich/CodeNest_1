import { cardsFromLesson } from "@/data/flashcards/content";

export const basicConceptCards = [
  ...cardsFromLesson("que-es-un-algoritmo", "Pseudocódigo", [
    {
      id: "fp-algoritmo",
      title: "Algoritmo",
      stepTitle: "Definición",
      body: "Secuencia de pasos ordenados, lógicos y finitos que resuelve un problema o cumple un objetivo.",
      code: "Leer a, b\nsuma <- a + b\nEscribir suma",
    },
    {
      id: "fp-entrada",
      title: "Entrada de datos",
      stepTitle: "Partes de un algoritmo",
      body: "Información que recibe un algoritmo para realizar su tarea.",
      code: "Leer nota1, nota2, nota3",
    },
    {
      id: "fp-proceso",
      title: "Proceso de un algoritmo",
      stepTitle: "Partes de un algoritmo",
      body: "Instrucciones que transforman los datos de entrada para obtener un resultado.",
      code: "promedio <- (nota1 + nota2 + nota3) / 3",
    },
    {
      id: "fp-salida",
      title: "Salida de datos",
      stepTitle: "Partes de un algoritmo",
      body: "Resultado que entrega un algoritmo después de procesar sus datos.",
      code: 'Escribir "Promedio: ", promedio',
    },
    {
      id: "fp-finitud",
      title: "Finitud de un algoritmo",
      stepTitle: "Características",
      body: "Propiedad que exige que un algoritmo termine después de un número finito de pasos.",
      code: 'Algoritmo Saludar\n    Escribir "Hola"\nFinAlgoritmo',
    },
  ]),
  ...cardsFromLesson("representacion-algoritmos-diagramas-flujo", "Pseudocódigo", [
    {
      id: "fp-diagrama-flujo",
      title: "Diagrama de flujo",
      stepTitle: "Lo esencial de los diagramas de flujo",
      body: "Representación gráfica de un algoritmo mediante símbolos conectados que indican el orden de sus pasos.",
      code: "// Entrada → proceso → salida\nLeer base, altura\narea <- (base * altura) / 2\nEscribir area",
    },
    {
      id: "fp-rombo-decision",
      title: "Rombo de decisión",
      stepTitle: "Simbología",
      body: "Símbolo del diagrama de flujo que representa una condición y separa los caminos según su resultado.",
      code: 'Si edad >= 18 Entonces\n    Escribir "Mayor de edad"\nSino\n    Escribir "Menor de edad"\nFinSi',
    },
  ]),
  ...cardsFromLesson("representacion-algoritmos-pseudocodigo", "Pseudocódigo", [
    {
      id: "fp-pseudocodigo",
      title: "Pseudocódigo",
      stepTitle: "Representación de algoritmos: pseudocódigo",
      body: "Forma escrita de expresar la lógica de un algoritmo con instrucciones claras, sin depender de un lenguaje de programación concreto.",
      code: 'Algoritmo Saludo\n    Leer nombre\n    Escribir "Hola, ", nombre\nFinAlgoritmo',
    },
    {
      id: "fp-leer",
      title: "Leer (en pseudocódigo)",
      stepTitle: "Palabras clave",
      body: "Instrucción que espera un dato introducido por el usuario y lo guarda en la variable indicada.",
      code: "Definir edad Como Entero\nLeer edad",
    },
    {
      id: "fp-escribir",
      title: "Escribir (en pseudocódigo)",
      stepTitle: "Palabras clave",
      body: "Instrucción que muestra un texto, un valor o un resultado en pantalla. También puede llamarse Mostrar.",
      code: 'promedio <- 9.4\nEscribir "Promedio: ", promedio',
    },
  ]),
  ...cardsFromLesson("estructura-de-un-programa", "Python", [
    {
      id: "fp-programa",
      title: "Programa",
      stepTitle: "¿Qué es un programa?",
      body: "Conjunto de instrucciones escritas en un lenguaje de programación que implementa uno o más algoritmos.",
      code: "base = 8\naltura = 5\nprint(base * altura)",
    },
    {
      id: "fp-libreria",
      title: "Librería",
      stepTitle: "Librerías",
      body: "Conjunto de herramientas ya disponibles que un programa puede importar para realizar tareas específicas.",
      code: "import math\nprint(math.pi)",
    },
    {
      id: "fp-cuerpo-programa",
      title: "Cuerpo principal del programa",
      stepTitle: "Cuerpo del programa",
      body: "Parte del programa que coordina la entrada de datos, su procesamiento y la salida de resultados.",
      code: 'radio = float(input("Radio: "))\narea = 3.1416 * radio ** 2\nprint(area)',
    },
    {
      id: "fp-subprograma",
      title: "Subprograma",
      stepTitle: "Subprogramas",
      body: "Bloque de instrucciones que resuelve una tarea específica y puede reutilizarse desde otras partes del programa.",
      code: "def calcular_area(radio):\n    return 3.1416 * radio ** 2\n\nprint(calcular_area(2))",
    },
    {
      id: "fp-comentario",
      title: "Comentario en el código",
      stepTitle: "Comentarios en el código",
      body: "Nota que explica el código y que no se ejecuta como una instrucción del programa.",
      code: "# Mostrar el resultado del cálculo\nprint(20)",
    },
  ]),
];
