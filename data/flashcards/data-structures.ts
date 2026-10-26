import { cardsFromLesson } from "@/data/flashcards/content";

export const dataStructureCards = [
  ...cardsFromLesson("estructuras-datos-arreglos", "Pseudocódigo", [
    {
      id: "fp-vector",
      title: "Vector (arreglo unidimensional)",
      stepTitle: "Tipos de arreglos",
      body: "Colección de datos organizada en una sola dimensión, como una lista. Cada elemento ocupa una posición identificada por un índice.",
      code: "Dimension edades[3]\nedades[0] <- 18\nedades[1] <- 20\nedades[2] <- 19",
    },
    {
      id: "fp-indice",
      title: "Índice de un arreglo",
      stepTitle: "Características principales",
      body: "Número que identifica la posición de un elemento. Con los índices base cero usados en el curso, la primera posición es 0.",
      code: "edades[0] <- 18\nedades[1] <- 20\nEscribir edades[1] // 20",
    },
  ]),
  ...cardsFromLesson("arreglos-unidimensionales-vectores", "Pseudocódigo", [
    {
      id: "fp-dimension",
      title: "Dimension (en pseudocódigo)",
      stepTitle: "Declaración",
      body: "Instrucción que establece cuántas posiciones tendrá un vector o cuántas filas y columnas tendrá una matriz.",
      code: "Definir numeros Como Entero\nDimension numeros[5]",
    },
    {
      id: "fp-recorrido-vector",
      title: "Recorrido de un vector",
      stepTitle: "Recorrer un vector",
      body: "Visita de sus elementos mediante un ciclo para consultar o procesar sus valores.",
      code: "Para i <- 0 Hasta 4 Hacer\n    Escribir numeros[i]\nFinPara",
    },
  ]),
  ...cardsFromLesson("uso-de-vectores", "JavaScript", [
    {
      id: "fp-longitud",
      title: "Longitud de un arreglo (length)",
      stepTitle: "El arreglo conoce su tamaño",
      body: "Propiedad que indica la cantidad de posiciones del arreglo. En los arreglos del curso, el último índice es length - 1.",
      code: "const edades = [18, 20, 19];\nconsole.log(edades.length); // 3\nconsole.log(edades[edades.length - 1]); // 19",
    },
    {
      id: "fp-push",
      title: "Método push",
      stepTitle: "Agrega elementos con push",
      body: "Método que agrega elementos al final del arreglo existente y actualiza su longitud.",
      code: 'const tareas = ["Leer"];\ntareas.push("Repasar");\nconsole.log(tareas); // ["Leer", "Repasar"]',
    },
    {
      id: "fp-includes",
      title: "Método includes",
      stepTitle: "Encuentra datos sin recorrer a mano",
      body: "Método que indica con true o false si un arreglo contiene el valor buscado.",
      code: 'const colores = ["rojo", "azul"];\nconsole.log(colores.includes("azul")); // true',
    },
    {
      id: "fp-indexof",
      title: "Método indexOf",
      stepTitle: "Encuentra datos sin recorrer a mano",
      body: "Método que devuelve el índice de la primera aparición de un valor, o -1 si no lo encuentra.",
      code: 'const colores = ["rojo", "azul"];\nconsole.log(colores.indexOf("azul")); // 1\nconsole.log(colores.indexOf("verde")); // -1',
    },
    {
      id: "fp-find",
      title: "Método find",
      stepTitle: "Encuentra datos sin recorrer a mano",
      body: "Método que devuelve el primer elemento que cumple una condición, o undefined si ninguno la cumple.",
      code: "const edades = [15, 20, 30];\nconst mayor = edades.find((edad) => edad >= 18);\nconsole.log(mayor); // 20",
    },
    {
      id: "fp-map",
      title: "Método map",
      stepTitle: "Crea un arreglo nuevo con map",
      body: "Método que transforma los elementos de un arreglo y devuelve otro arreglo con la misma cantidad de posiciones.",
      code: "const precios = [100, 200];\nconst dobles = precios.map((precio) => precio * 2);\nconsole.log(dobles); // [200, 400]",
    },
    {
      id: "fp-filter",
      title: "Método filter",
      stepTitle: "Conserva solo lo necesario con filter",
      body: "Método que crea un arreglo nuevo con los elementos que cumplen una condición.",
      code: "const temperaturas = [18, 31, 35];\nconst altas = temperaturas.filter((t) => t >= 30);\nconsole.log(altas); // [31, 35]",
    },
  ]),
  ...cardsFromLesson("arreglos-bidimensionales-matrices", "Pseudocódigo", [
    {
      id: "fp-matriz",
      title: "Matriz (arreglo bidimensional)",
      stepTitle: "Arreglos bidimensionales: matrices",
      body: "Estructura que organiza los datos en filas y columnas. Un elemento se localiza mediante dos índices.",
      code: "Definir notas Como Entero\nDimension notas[3][4] // 3 filas y 4 columnas",
    },
    {
      id: "fp-fila",
      title: "Fila de una matriz",
      stepTitle: "Arreglos bidimensionales: matrices",
      body: "Conjunto horizontal de posiciones de una matriz. Su índice se indica primero al acceder a un elemento.",
      code: "matriz[1][0] <- 8\nmatriz[1][1] <- 9\n// Ambos valores están en la fila de índice 1",
    },
    {
      id: "fp-columna",
      title: "Columna de una matriz",
      stepTitle: "Arreglos bidimensionales: matrices",
      body: "Conjunto vertical de posiciones de una matriz. Su índice se indica después del índice de fila.",
      code: "matriz[0][2] <- 7\nmatriz[1][2] <- 9\n// Ambos valores están en la columna de índice 2",
    },
    {
      id: "fp-acceso-matriz",
      title: "Acceso por fila y columna",
      stepTitle: "Guardar valores en una matriz",
      body: "Uso de dos índices para guardar o consultar un elemento: primero la fila y después la columna.",
      code: "matriz[1][0] <- 10\nEscribir matriz[1][0] // 10",
    },
  ]),
];
