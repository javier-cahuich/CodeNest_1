# README

This app was built with ❤️ using [Draftbit](https://draftbit.com), [Expo](https://expo.dev), and [React Native](https://reactnative.dev).

## Current App State

- The app is a CodeNest-style learning experience built with Expo Router, TypeScript, NativeWind, and reusable React Native UI primitives.
- Course content is currently defined in `data/codenest-modules.ts`.
- "Fundamentos de programación" includes "¿Qué es un algoritmo?", "Representación de algoritmos: diagramas de flujo", "Representación de algoritmos: Pseudocódigo", "Estructura de un programa", "Variables y constantes", "Tipos de datos", "Operadores", "Estructuras de control: Condicionales", "Estructuras de control: bucles", "Estructuras de datos: arreglos", "Arreglos unidimensionales: vectores", and "Arreglos bidimensionales: matrices".
- The diagramas de flujo lesson includes an interactive animated SVG flowchart simulation based on Lucidchart flow specification on step 2, image placeholder screens, reserved blank exercise/symbol screens, and a randomized two-column tap-to-match cards exercise.
- The pseudocódigo lesson includes a three-column keywords table, graded quiz questions, two block-ordering Parsons-style exercises, and a feedback summary.
- The estructura de un programa lesson includes 15 graded steps covering libraries, data declarations, the main body, subprograms, comments, a two-part Python example, a recap, and feedback summary.
- The variables y constantes lesson includes 12 graded steps covering variable and constant definitions, a comparison table, naming rules, good/bad practice table, a camelCase callout, a four-card choice exercise with a "comprobar respuestas" button, a price calculation pseudocode example, recap, and feedback summary.
- The tipos de datos lesson includes 11 graded steps covering integers, decimals, strings, booleans, a user profile pseudocode example, recap, and feedback summary.
- The operadores lesson includes 13 graded steps covering arithmetic, assignment, relational, and logical operators, normal tables converted from CSV content, a scholarship pseudocode example, recap, and feedback summary.
- The estructuras de control: condicionales lesson includes 13 graded steps covering if, if...else, switch/case, reserved diagram placeholder screens, a JavaScript switch example, a four-card choice exercise, recap, and feedback summary.
- The estructuras de control: bucles lesson includes 16 graded steps covering while, do-while, for, loop structure, password/menu/counting pseudocode examples, a comparison table, a five-card choice exercise, recap, and feedback summary.
- The estructuras de datos: arreglos lesson includes 9 graded steps covering data structures, array definition, characteristics, memory/index layout, array types, two grouped question screens, recap, and feedback summary.
- The arreglos unidimensionales: vectores lesson includes 13 graded steps covering vector declaration, index/value representation tables, assignment, reading elements, capturing and traversing with cycles, grouped question screens, recap, and feedback summary.
- The arreglos bidimensionales: matrices lesson includes 15 graded steps covering matrix uses, vector vs matrix comparison, visual table representation, declaration, assignment, nested traversal, complete 3x3 fill example, graded questions, recap, and feedback summary.
- Lesson progress uses Supabase `lesson_progress` as the source of truth: completions and each lesson's best score are saved with `lesson_id = slug`, restored on app/session/Home load, and reflected locally on completed lesson cards.
- Practice flashcards show only the prompt first; the answer and code sample are revealed in-card with "Mostrar respuesta". Completing a deck shows a summary of "Conocido" and "En progreso" counts, with restart and finish actions.
- The Practice tab opens flashcard topics directly from the "Flash drills" card.
- The Practice tab opens quiz topics directly from the "Quick review" card.
- Home shows points and streak at the top; the selected course is presented in an expanded card with its full title, progress, and a direct link to the course catalog.
- Home derives a constancy availability label after the selected course's lesson list from `lesson_progress`: every lesson must be completed and the course's average stored score must be at least 80.
- Lesson cards show their title and main description, with the “Finalizada” status shown only for completed lessons.
- Lesson screens keep a visual progress bar without the step counter, place back and next controls together at the bottom, and confirm before exiting with the close button.
- Feedback screens are centered and show final score, correct/incorrect answers, and a display-only EXP reward based on the score; the restart action clears the current lesson's temporary state.

## Docs

Check out the [documentation site](https://help.draftbit.com) for in-depth info on working with Draftbit, publishing your app locally, and other helpful info.

## Community

Join the Draftbit [online community](https://community.draftbit.com) to connect with other users, ask questions, share progress, and more.

## Videos

Check out our [YouTube](https://youtube.com/draftbit) channel for tutorials, office hours, and other helpful content.
