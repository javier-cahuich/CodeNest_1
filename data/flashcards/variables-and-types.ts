import { cardsFromLesson } from "@/data/flashcards/content";

export const variableTypeCards = [
  ...cardsFromLesson("variables-y-constantes", "Pseudocódigo", [
    {
      id: "fp-variable",
      title: "Variable",
      stepTitle: "¿Qué es una variable?",
      body: "Espacio identificado por un nombre que guarda un dato cuyo valor puede cambiar durante la ejecución.",
      code: "edad <- 20\nedad <- 21",
    },
    {
      id: "fp-constante",
      title: "Constante",
      stepTitle: "Constante",
      body: "Dato con nombre cuyo valor se mantiene fijo durante la ejecución del programa.",
      code: "Constante IVA <- 0.16\nimpuesto <- 100 * IVA",
    },
    {
      id: "fp-nombre-descriptivo",
      title: "Nombre descriptivo de una variable",
      stepTitle: "Resumen de buenas y malas prácticas",
      body: "Nombre que comunica qué información guarda una variable, sin tener que adivinar su significado.",
      code: "cantidadProductos <- 4\nprecioProducto <- 25",
    },
    {
      id: "fp-camel-case",
      title: "camelCase",
      stepTitle: "Reglas para nombrar variables y constantes",
      body: "Convención de nombres que comienza en minúscula y une palabras iniciando las siguientes con mayúscula, sin espacios.",
      code: 'nombreUsuario <- "Ana"\nfechaNacimiento <- "2005-06-12"',
    },
  ]),
  ...cardsFromLesson("uso-de-variables-y-constantes", "Pseudocódigo", [
    {
      id: "fp-declarar-variable",
      title: "Declarar una variable",
      stepTitle: "Cuatro acciones con un dato",
      body: "Introducir el nombre de una variable y, en este pseudocódigo, indicar el tipo de dato que almacenará.",
      code: "Definir puntos Como Entero",
    },
    {
      id: "fp-inicializar",
      title: "Inicializar una variable",
      stepTitle: "Cuatro acciones con un dato",
      body: "Asignar el primer valor a una variable antes de utilizarla en operaciones.",
      code: "Definir puntos Como Entero\npuntos <- 0",
    },
    {
      id: "fp-asignacion",
      title: "Asignación",
      stepTitle: "Cuatro acciones con un dato",
      body: "Operación que guarda un valor o el resultado de una expresión en una variable. En este pseudocódigo se representa con <-.",
      code: "precio <- 25\ntotal <- precio * 4",
    },
    {
      id: "fp-reasignacion",
      title: "Reasignación",
      stepTitle: "El valor actual de una variable",
      body: "Asignación que sustituye el valor que ya tenía una variable por uno nuevo.",
      code: "puntos <- 10\npuntos <- puntos + 5\nEscribir puntos // 15",
    },
    {
      id: "fp-consultar-variable",
      title: "Consultar el valor de una variable",
      stepTitle: "Cuatro acciones con un dato",
      body: "Utilizar el valor actual de una variable sin modificarlo ni pedir un dato nuevo al usuario.",
      code: "puntos <- 15\nEscribir puntos // puntos sigue valiendo 15",
    },
    {
      id: "fp-numero-magico",
      title: "Número mágico",
      stepTitle: "Evita los números mágicos",
      body: "Número escrito directamente en una operación sin explicar qué representa. Una constante con nombre comunica esa regla.",
      code: "// 10 representa los puntos de cada reto\nConstante PUNTOS_POR_RETO <- 10\npuntos <- 20 + PUNTOS_POR_RETO",
    },
  ]),
  ...cardsFromLesson("tipos-de-datos", "Pseudocódigo", [
    {
      id: "fp-numero-entero",
      title: "Número entero",
      stepTitle: "Enteros",
      body: "Número sin parte fraccionaria. Se utiliza para cantidades completas, como puntos, edades o intentos.",
      code: "Definir intentos Como Entero\nintentos <- 3",
    },
    {
      id: "fp-numero-decimal",
      title: "Número decimal",
      stepTitle: "Decimales (float o double)",
      body: "Dato numérico que permite representar una parte fraccionaria, útil para precios o medidas.",
      code: "Definir estatura Como Real\nestatura <- 1.68",
    },
    {
      id: "fp-cadena-texto",
      title: "Cadena de texto",
      stepTitle: "Cadena de texto (string)",
      body: "Secuencia de caracteres que representa información escrita y se expresa entre comillas.",
      code: 'Definir nombre Como Cadena\nnombre <- "Sofía"',
    },
    {
      id: "fp-booleano",
      title: "Booleano",
      stepTitle: "Booleanos (boolean)",
      body: "Tipo de dato que admite únicamente Verdadero o Falso para representar condiciones o estados de dos posibilidades.",
      code: "Definir tieneCuenta Como Logico\ntieneCuenta <- Verdadero",
    },
  ]),
  ...cardsFromLesson("uso-tipo-dato-booleano", "Pseudocódigo", [
    {
      id: "fp-bandera-booleana",
      title: "Bandera booleana",
      stepTitle: "De un valor a un estado",
      body: "Variable booleana que conserva el estado actual de algo y responde una pregunta de sí o no.",
      code: "libroDisponible <- Verdadero\n// Al prestar el libro:\nlibroDisponible <- Falso",
    },
  ]),
];
