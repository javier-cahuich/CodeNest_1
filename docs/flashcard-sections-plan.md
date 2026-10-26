# Flashcards por sección — implementación

## Objetivo
- Cinco mazos de 15 tarjetas para Fundamentos de programación y uno de 15 para la sección Lecciones de JavaScript.
- Cada tarjeta incluye término, definición, ejemplo y referencia a la lección/paso que lo enseña.
- Conservar las clasificaciones equivalentes mediante claves persistentes independientes de la agrupación visual.

## Preguntas abiertas
- Ninguna. POO permanece sin mazos hasta disponer de lecciones.

## Tareas
- [ ] Contenido de 90 tarjetas y correspondencias explícitas con el catálogo anterior.
- [ ] Catálogo derivado de las mismas secciones que Inicio.
- [ ] Lectura y escritura con las claves históricas; tarjetas nuevas sin clasificar.
- [ ] Selector de curso, enlaces antiguos y retorno tras autenticación.
- [ ] Protección de rondas y caché ante cambios de catálogo.

## QA
- [ ] Conteos, fuentes, ejemplos, IDs y correspondencias validados automáticamente.
- [ ] Progreso anterior, aislamiento de mazos y rondas comprobados.
- [ ] Autenticación, revelado, clasificación, repaso y salida en web.
- [ ] TypeScript, lint y contraste claro/oscuro.

## Seguimiento
- La tabla `flashcard_progress` sigue siendo la fuente de verdad. Las tarjetas equivalentes conservan su par `(topic_slug, card_id)`; los registros retirados se conservan como históricos.
