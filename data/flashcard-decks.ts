import { flashcardTopics } from "@/data/flashcard-topics";

export interface FlashcardItem {
  id: string;
  title: string;
  body: string;
  codeLabel: string;
  code: string;
}

export interface FlashcardDeck {
  topicSlug: string;
  topicTitle: string;
  cards: FlashcardItem[];
}

function buildDeck(
  topicSlug: string,
  topicTitle: string,
  cards: Omit<FlashcardItem, "id">[],
): FlashcardDeck {
  return {
    topicSlug,
    topicTitle,
    cards: cards.map((card, index) => ({
      id: `${topicSlug}-${index + 1}`,
      ...card,
    })),
  };
}

export const flashcardDecks: FlashcardDeck[] = [
  buildDeck("variables", "Variables", [
    {
      title: "Qué es una variable",
      body: "Una variable guarda un valor para poder usarlo más adelante dentro del programa.",
      codeLabel: "Definición básica",
      code: `const nombre = "Lucía";\nconsole.log(nombre);`,
    },
    {
      title: "Asignar datos",
      body: "Puedes almacenar texto, números u otros valores según lo que quieras representar.",
      codeLabel: "Asignación",
      code: `const edad = 21;\nconst ciudad = "Bogotá";`,
    },
    {
      title: "Nombres claros",
      body: "Un buen nombre hace que el código se entienda más rápido y evita confusiones.",
      codeLabel: "Buenas prácticas",
      code: `const totalCursos = 4;\nconst usuarioActivo = true;`,
    },
    {
      title: "Cambios de valor",
      body: "Algunas variables pueden cambiar con el tiempo si la lógica de tu programa lo necesita.",
      codeLabel: "Actualizar valor",
      code: `let progreso = 1;\nprogreso = progreso + 1;`,
    },
    {
      title: "Usar variables",
      body: "Una variable cobra valor real cuando la reutilizas para mostrar, calcular o decidir algo.",
      codeLabel: "Uso práctico",
      code: `const tema = "Variables";\nconsole.log(\`Hoy estudias \${tema}\`);`,
    },
  ]),
  buildDeck("tipos-de-datos", "Tipos de datos", [
    {
      title: "Texto",
      body: "El tipo string sirve para palabras, frases y cualquier contenido textual.",
      codeLabel: "String",
      code: `const lenguaje = "JavaScript";`,
    },
    {
      title: "Números",
      body: "Los números permiten hacer operaciones como sumar, restar o comparar cantidades.",
      codeLabel: "Number",
      code: `const ejercicios = 12;\nconst puntos = ejercicios * 10;`,
    },
    {
      title: "Booleanos",
      body: "Un booleano solo puede tener dos valores: verdadero o falso.",
      codeLabel: "Boolean",
      code: `const cursoCompletado = false;`,
    },
    {
      title: "Detectar el tipo",
      body: "Saber qué tipo tiene un valor ayuda a evitar errores al trabajar con él.",
      codeLabel: "typeof",
      code: `const precio = 19.99;\nconsole.log(typeof precio);`,
    },
    {
      title: "Elegir el tipo correcto",
      body: "Cada dato debe representarse con el tipo que mejor describa su propósito.",
      codeLabel: "Ejemplo mixto",
      code: `const nombre = "Ana";\nconst edad = 18;\nconst inscrita = true;`,
    },
  ]),
  buildDeck("condicionales", "Condicionales", [
    {
      title: "Tomar decisiones",
      body: "Las condicionales permiten ejecutar una acción distinta según una regla.",
      codeLabel: "if",
      code: `if (puntaje >= 70) {\n  console.log("Aprobado");\n}`,
    },
    {
      title: "Ruta alternativa",
      body: "Con else defines qué debe ocurrir cuando la condición no se cumple.",
      codeLabel: "if / else",
      code: `if (usuarioActivo) {\n  console.log("Bienvenido");\n} else {\n  console.log("Inicia sesión");\n}`,
    },
    {
      title: "Comparaciones",
      body: "Comparar valores es la base para decidir si una condición es verdadera o falsa.",
      codeLabel: "Comparar",
      code: `const acceso = edad >= 18;`,
    },
    {
      title: "Varias reglas",
      body: "Puedes evaluar más de una posibilidad antes de llegar a la opción final.",
      codeLabel: "else if",
      code: `if (nivel === "básico") {\n  console.log("Empieza aquí");\n} else if (nivel === "medio") {\n  console.log("Sigue practicando");\n}`,
    },
    {
      title: "Condicional con intención",
      body: "La lógica funciona mejor cuando cada condición responde a una pregunta concreta.",
      codeLabel: "Pregunta simple",
      code: `const puedeAvanzar = progreso >= 5;\nconsole.log(puedeAvanzar);`,
    },
  ]),
  buildDeck("bucles", "Bucles", [
    {
      title: "Repetir una tarea",
      body: "Un bucle te ahorra repetir la misma instrucción muchas veces a mano.",
      codeLabel: "for",
      code: `for (let paso = 1; paso <= 3; paso += 1) {\n  console.log(paso);\n}`,
    },
    {
      title: "Controlar el final",
      body: "Todo bucle necesita una condición de salida para no repetirse infinitamente.",
      codeLabel: "while",
      code: `let vidas = 3;\nwhile (vidas > 0) {\n  vidas -= 1;\n}`,
    },
    {
      title: "Recorrer listas",
      body: "Los bucles suelen usarse para revisar o mostrar cada elemento de un arreglo.",
      codeLabel: "Recorrido",
      code: `const temas = ["Variables", "Funciones"];\nfor (const tema of temas) {\n  console.log(tema);\n}`,
    },
    {
      title: "Cambios por iteración",
      body: "En cada vuelta debe cambiar algo para acercarte al resultado final.",
      codeLabel: "Incremento",
      code: `let contador = 0;\ncontador += 1;`,
    },
    {
      title: "Uso consciente",
      body: "Un bucle es útil cuando la acción es repetitiva y el patrón está claro.",
      codeLabel: "Aplicación",
      code: `for (let tarjeta = 1; tarjeta <= 5; tarjeta += 1) {\n  console.log(\`Tarjeta \${tarjeta}\`);\n}`,
    },
  ]),
  buildDeck("funciones", "Funciones", [
    {
      title: "Bloques reutilizables",
      body: "Una función agrupa instrucciones bajo un nombre para usarlas varias veces.",
      codeLabel: "Declaración",
      code: `function saludar() {\n  console.log("Hola");\n}`,
    },
    {
      title: "Recibir datos",
      body: "Los parámetros permiten que una función trabaje con información de entrada.",
      codeLabel: "Parámetros",
      code: `function saludar(nombre) {\n  console.log(nombre);\n}`,
    },
    {
      title: "Devolver resultados",
      body: "El retorno entrega el valor final que produjo la función.",
      codeLabel: "return",
      code: `function doble(numero) {\n  return numero * 2;\n}`,
    },
    {
      title: "Funciones con intención",
      body: "Una buena función suele tener una responsabilidad clara y limitada.",
      codeLabel: "Responsabilidad",
      code: `function crearMensaje(tema) {\n  return \`Repasa \${tema}\`;\n}`,
    },
    {
      title: "Reutilizar mejor",
      body: "Cuando encapsulas lógica en funciones, tu código se vuelve más ordenado y flexible.",
      codeLabel: "Uso",
      code: `const mensaje = crearMensaje("Funciones");\nconsole.log(mensaje);`,
    },
  ]),
  buildDeck("arreglos", "Arreglos", [
    {
      title: "Listas ordenadas",
      body: "Un arreglo guarda varios valores dentro de una misma estructura.",
      codeLabel: "Array",
      code: `const modulos = ["Variables", "Bucles", "Funciones"];`,
    },
    {
      title: "Posición de un dato",
      body: "Cada elemento tiene una posición numérica que empieza en cero.",
      codeLabel: "Índice",
      code: `console.log(modulos[0]);`,
    },
    {
      title: "Agregar elementos",
      body: "Puedes añadir nuevos valores a medida que la lista crece.",
      codeLabel: "push",
      code: `modulos.push("Objetos");`,
    },
    {
      title: "Recorrer arreglos",
      body: "Muchas veces usarás bucles o métodos para revisar cada elemento de la lista.",
      codeLabel: "for...of",
      code: `for (const modulo of modulos) {\n  console.log(modulo);\n}`,
    },
    {
      title: "Aplicación real",
      body: "Los arreglos aparecen en listas de cursos, usuarios, tareas o resultados.",
      codeLabel: "Lista práctica",
      code: `const niveles = ["Inicial", "Intermedio", "Avanzado"];`,
    },
  ]),
  buildDeck("objetos", "Objetos", [
    {
      title: "Datos agrupados",
      body: "Un objeto reúne información relacionada dentro de una sola entidad.",
      codeLabel: "Objeto",
      code: `const estudiante = {\n  nombre: "Luis",\n  progreso: 3,\n};`,
    },
    {
      title: "Propiedades",
      body: "Cada dato dentro del objeto tiene una clave y un valor asociado.",
      codeLabel: "Clave y valor",
      code: `console.log(estudiante.nombre);`,
    },
    {
      title: "Actualizar campos",
      body: "También puedes cambiar o ampliar la información del objeto cuando sea necesario.",
      codeLabel: "Actualizar",
      code: `estudiante.progreso = 4;`,
    },
    {
      title: "Objetos y listas",
      body: "Es común tener arreglos de objetos para representar colecciones más completas.",
      codeLabel: "Colección",
      code: `const cursos = [{ titulo: "Variables" }, { titulo: "Funciones" }];`,
    },
    {
      title: "Modelar entidades",
      body: "Los objetos ayudan a representar usuarios, perfiles, módulos y cualquier entidad de la app.",
      codeLabel: "Modelo simple",
      code: `const perfil = {\n  usuario: "Ana",\n  nivel: "Inicial",\n};`,
    },
  ]),
  buildDeck("manejo-de-errores", "Manejo de errores", [
    {
      title: "Prever fallos",
      body: "El manejo de errores busca evitar que una falla rompa por completo la experiencia.",
      codeLabel: "Idea base",
      code: `console.log("Preparado para validar errores");`,
    },
    {
      title: "try y catch",
      body: "Estas estructuras permiten intentar una operación y capturar fallos si aparecen.",
      codeLabel: "try/catch",
      code: `try {\n  JSON.parse("{ invalido }");\n} catch (error) {\n  console.log("Algo salió mal");\n}`,
    },
    {
      title: "Mensajes claros",
      body: "Un error bien comunicado ayuda a entender qué ocurrió y qué hacer después.",
      codeLabel: "Mensaje",
      code: `catch (error) {\n  console.log("No se pudo leer la información");\n}`,
    },
    {
      title: "Validar antes",
      body: "Muchas veces puedes evitar el error comprobando datos antes de usarlos.",
      codeLabel: "Validación",
      code: `if (!usuario) {\n  console.log("Falta el usuario");\n}`,
    },
    {
      title: "Experiencia estable",
      body: "Capturar errores es parte de construir apps confiables y fáciles de mantener.",
      codeLabel: "Resultado",
      code: `const estado = "controlado";\nconsole.log(estado);`,
    },
  ]),
];

export function getFlashcardDeck(topicSlug: string) {
  return flashcardDecks.find((deck) => deck.topicSlug === topicSlug);
}

export function getFlashcardTopic(topicSlug: string) {
  return flashcardTopics.find((topic) => topic.slug === topicSlug);
}
