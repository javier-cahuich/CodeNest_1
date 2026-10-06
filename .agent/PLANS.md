# Estándar de ExecPlans de CodeNest

Este documento define cómo Codex debe analizar, documentar, implementar y validar cambios complejos en CodeNest. No es un plan de implementación, un backlog ni un roadmap del producto. Su función es establecer el formato y las reglas que deben seguir los ExecPlans individuales.

Cada ExecPlan debe ser un documento ejecutable, autocontenido y actualizado durante el trabajo. Una persona que conozca el repositorio, pero no la conversación que originó la tarea, debe poder entender el objetivo, continuar la implementación y comprobar el resultado leyendo el plan y el código señalado.

Los ExecPlans individuales se almacenan en `.agent/plans/`. Usar nombres descriptivos en minúsculas y separados por guiones, por ejemplo `.agent/plans/sincronizacion-progreso.md`. No guardar planes individuales en este archivo.

## Cuándo se requiere un ExecPlan

Crear un ExecPlan antes de implementar cualquiera de estos trabajos:

- funcionalidades nuevas que tengan varios estados, pantallas, flujos o integraciones;
- cambios de arquitectura o de responsabilidades entre rutas, componentes, stores, datos y servicios;
- refactorizaciones importantes o migraciones graduales;
- cambios en la integración con Supabase;
- modificaciones del modelo de datos, tablas, columnas, funciones, triggers o políticas;
- cambios en autenticación, persistencia o ciclo de vida de sesión;
- cambios en progreso, puntuación, finalización de lecciones o EXP;
- cambios de navegación que afecten varias rutas o layouts;
- funcionalidades que atraviesen varias partes de la aplicación;
- incorporación o sustitución de una dependencia que afecte Expo, React Native o web;
- trabajos cuya implementación deba dividirse en hitos verificables para conservar la estabilidad.

Un cambio local, aislado y de bajo riesgo puede ejecutarse sin ExecPlan si su comportamiento, alcance y validación son evidentes. Si aparecen dependencias ocultas, cambios de contrato o riesgos transversales durante el análisis, se debe crear un ExecPlan antes de continuar.

## Base técnica verificada del proyecto

Cada plan debe comenzar desde el código actual, no desde supuestos. Al momento de redactar este estándar, el repositorio contiene:

- Expo 53, React 19 y React Native 0.79;
- Expo Router 5 con rutas basadas en archivos dentro de `app/`;
- TypeScript 5.8 con `strict: true`;
- NativeWind 4, Tailwind CSS y temas propios;
- primitivas reutilizables de `rn-primitives` en `components/ui/`;
- Zustand para autenticación, selección de curso y progreso local;
- Supabase JS para Auth, consultas a datos y llamadas RPC;
- AsyncStorage como almacenamiento de la sesión de Supabase;
- soporte nativo y web mediante Expo;
- Yarn 4 como gestor declarado en `package.json`.

Esta lista es contexto, no una autorización para asumir que permanecerá igual. Antes de escribir un ExecPlan, volver a comprobar `package.json`, `tsconfig.json`, los archivos afectados y cualquier documento de instrucciones vigente.

## Arquitectura actual que debe respetarse

- `app/` contiene rutas y layouts de Expo Router.
- `app/_layout.tsx` configura el Stack, proveedores globales, fuentes, temas y el ciclo de renovación de Supabase Auth.
- `app/(tabs)/_layout.tsx` configura la navegación principal por pestañas.
- `components/ui/` contiene primitivas genéricas.
- `components/layout/` contiene estructuras compartidas de pantalla.
- `components/codenest/` contiene componentes del dominio educativo.
- `data/` contiene cursos, módulos, cuestionarios y tarjetas definidos localmente.
- `stores/` contiene estado compartido con Zustand.
- `lib/supabase.ts` exporta la instancia compartida del cliente Supabase.
- `theming/` y `global.css` contienen las fuentes de verdad visuales.

La autenticación actual usa correo y contraseña con Supabase Auth. `stores/auth-store.ts` restaura y observa la sesión, carga progreso al autenticar y limpia el progreso al cerrar sesión o quedar anónimo.

El progreso se administra en `stores/lesson-progress-store.ts`. `lesson_progress` es la fuente remota de lecciones completadas y puntajes, mientras que `user_progress` proporciona `total_exp`. El identificador persistido de una lección es su `slug`. La finalización llama al RPC `complete_lesson_with_exp` para guardar el mejor puntaje y actualizar la EXP de forma atómica. La interfaz calcula actualmente 50 EXP para puntajes de 80 o más, 30 EXP para puntajes entre 50 y 79, y 20 EXP para puntajes menores a 50. Una repetición puede mejorar el puntaje, pero no debe otorgar EXP de nuevo.

El repositorio no contiene actualmente un directorio visible de migraciones de Supabase ni un script de pruebas automatizadas. Un plan no debe inventarlos ni afirmar que existen. Si una tarea necesita incorporarlos, debe tratarlo como una decisión explícita, con autorización y alcance documentados.

## Investigación obligatoria antes de redactar

Antes de proponer cambios, Codex debe:

1. Leer las instrucciones vigentes del repositorio, incluido `AGENTS.md` y cualquier instrucción más específica aplicable al área.
2. Revisar `git status` para identificar y preservar cambios preexistentes.
3. Localizar los puntos de entrada, tipos, consumidores y flujos de datos afectados.
4. Leer la implementación actual completa de los módulos relevantes, no solo sus nombres o interfaces.
5. Buscar referencias globales antes de renombrar, mover o cambiar contratos.
6. Verificar scripts y dependencias directamente en `package.json`.
7. Confirmar qué comportamiento es local y qué comportamiento depende de Supabase.
8. Identificar diferencias entre web y nativo, áreas seguras, navegación y persistencia cuando sean relevantes.
9. Separar hechos verificados, inferencias y preguntas abiertas.
10. Pedir aclaración cuando una decisión faltante cambie materialmente el producto, los datos, la seguridad o el alcance.

El apartado de contexto del ExecPlan debe citar rutas y símbolos concretos. No copiar grandes bloques de código; describir la responsabilidad actual y explicar por qué será afectada.

## Principios de ejecución

- Favorecer cambios incrementales, verificables y reversibles.
- No reescribir funcionalidades existentes si una extensión localizada resuelve el problema.
- Reutilizar componentes, hooks, stores, servicios, utilidades, tipos y patrones existentes cuando sean apropiados.
- No crear abstracciones anticipadas sin al menos un uso real y una mejora clara.
- No inventar APIs, tablas, columnas, funciones RPC, políticas, rutas, scripts o dependencias.
- No asumir que el nombre de una función remota describe toda su implementación; documentar qué contrato observa el cliente y qué información falta.
- Mantener compatibilidad con Expo, React Native y web. Cualquier dependencia nativa debe evaluarse también para Expo y web o contar con una separación por plataforma.
- Mantener TypeScript estricto sin errores y evitar `any`.
- Preferir NativeWind, tokens temáticos y componentes existentes para UI.
- No importar iconos directamente desde `lucide-react-native`; usar el wrapper existente si el trabajo toca iconografía.
- Evitar dependencias nuevas salvo que sean necesarias y se documente por qué el stack actual no basta.
- No ejecutar cambios de configuración, dependencias, prebuild o base de datos como efecto secundario no declarado.
- No exponer secretos, sesiones, tokens ni variables de entorno. Los planes deben nombrar variables por su identificador, nunca incluir valores reales.
- No sobrescribir modificaciones locales ajenas al alcance.

## Carácter vivo del ExecPlan

El ExecPlan debe mantenerse actualizado durante toda la implementación. No es suficiente escribirlo al inicio y abandonarlo.

Como mínimo, cada plan debe contener y mantener estas secciones operativas:

- **Progreso:** lista de tareas con estados pendientes y completados. Actualizarla después de cada hito material.
- **Descubrimientos:** hechos relevantes descubiertos durante la implementación, con evidencia o referencias al código.
- **Desviaciones:** diferencias respecto al plan inicial, su causa y su impacto.
- **Decisiones:** elecciones técnicas o de producto, alternativas consideradas y motivo de la opción tomada.
- **Resultados:** resumen final de lo implementado, lo pendiente y las validaciones realizadas.

Si la implementación contradice una premisa del plan, corregir primero el documento. No mantener instrucciones obsoletas para aparentar que el trabajo siguió el camino original.

## Estructura obligatoria de cada ExecPlan

Usar la siguiente estructura en todos los documentos de `.agent/plans/`. Se pueden añadir subsecciones, pero no omitir las requeridas. Cuando una sección no aplique, escribir `No aplica` y explicar brevemente por qué.

### 1. Título

Un nombre corto, específico y orientado al resultado. Evitar títulos genéricos como “Cambios varios” o “Mejoras”.

### 2. Objetivo

Explicar qué resultado observable se busca, quién se beneficia y cuál es el límite del trabajo. Incluir explícitamente lo que queda fuera del alcance cuando pueda confundirse con el objetivo.

### 3. Contexto y estado actual

Describir cómo funciona hoy el flujo afectado. Referenciar rutas, componentes, stores, funciones, tipos y contratos relevantes. Registrar limitaciones conocidas, cambios locales preexistentes y cualquier incertidumbre pendiente.

### 4. Requisitos funcionales

Enumerar comportamientos observables desde la perspectiva del usuario o del sistema. Cada requisito debe poder comprobarse. Incluir estados de carga, error, vacío, reintento y permisos cuando correspondan.

### 5. Requisitos técnicos

Definir restricciones comprobables: TypeScript estricto, soporte web/nativo, rendimiento, accesibilidad, compatibilidad de dependencias, persistencia, atomicidad o idempotencia. No convertir preferencias en requisitos sin justificación.

### 6. Arquitectura afectada

Explicar qué capas cambian y cómo fluye la información entre ellas. Indicar responsabilidades nuevas o modificadas y confirmar qué capas permanecerán intactas. Si hay un cambio de contrato, documentar productores y consumidores.

### 7. Archivos y componentes afectados

Listar archivos existentes que se leerán o modificarán, archivos nuevos previstos y la responsabilidad de cada uno. Distinguir cambios confirmados de ubicaciones tentativas. Actualizar la lista si el alcance real cambia.

### 8. Cambios de base de datos, si aplica

Si no hay cambios, declarar explícitamente que no se modificarán esquema, datos ni políticas.

Si los hay, documentar:

- estado actual verificado y fuente de esa verificación;
- tablas, columnas, índices, restricciones, funciones, triggers o políticas afectadas;
- migración versionada propuesta;
- compatibilidad con el cliente actual;
- RLS, propiedad de filas y permisos por operación;
- validación de entradas, atomicidad e idempotencia;
- backfill, valores nulos y datos existentes;
- estrategia de despliegue y orden entre base de datos y cliente;
- reversión o recuperación;
- consultas o pruebas que demostrarán el resultado.

No incluir credenciales, claves administrativas ni datos reales. No aplicar cambios remotos sin autorización explícita.

### 9. Plan de implementación paso a paso

Dividir el trabajo en hitos pequeños y ordenados. Para cada paso indicar:

- cambio concreto;
- archivos o símbolos implicados;
- resultado esperado;
- validación inmediata;
- condición para avanzar al siguiente paso.

Cuando un refactor pueda romper el proyecto, crear primero interfaces, adaptadores o implementaciones compatibles y migrar consumidores gradualmente.

### 10. Casos límite

Enumerar entradas y estados poco comunes que deben conservar un comportamiento seguro. Considerar, según aplique:

- sesión ausente, expirada o cambiada durante una solicitud;
- red interrumpida, respuesta tardía o reintentos;
- doble toque, llamadas duplicadas y operaciones concurrentes;
- datos faltantes, inválidos o heredados;
- rutas dinámicas con parámetros inexistentes;
- lecciones repetidas y puntajes peores o mejores;
- primer uso sin filas de progreso;
- listas vacías o contenido no encontrado;
- diferencias entre web, Android e iOS;
- tema claro/oscuro, teclado, áreas seguras y tamaños de pantalla.

### 11. Riesgos y posibles regresiones

Identificar riesgos específicos, no frases genéricas. Para cada riesgo indicar impacto, probabilidad razonada, señal de detección y mitigación. Incluir riesgos para navegación, sesión, datos entre usuarios, EXP duplicada, compatibilidad web, rendimiento y cambios locales existentes cuando correspondan.

### 12. Estrategia de pruebas

Definir cómo se comprobará cada requisito y riesgo. Usar solamente comandos y herramientas disponibles, o documentar claramente cualquier incorporación propuesta.

El repositorio dispone de:

```bash
yarn typecheck
yarn lint
yarn doctor
yarn start
yarn web
yarn android
yarn ios
```

`yarn format` modifica archivos y no debe tratarse como una prueba. `yarn prebuild` y `yarn update-dependencies` pueden modificar el proyecto y solo deben ejecutarse cuando formen parte autorizada del trabajo.

No existe actualmente un comando `yarn test`. Cada plan debe incluir pruebas manuales del flujo afectado y, si propone pruebas automatizadas, documentar la selección de herramienta y la autorización necesaria para agregarla.

La estrategia debe cubrir, según el cambio:

- comprobación de tipos y lint;
- inicio y navegación en web;
- smoke test de rutas, formularios, modales y listas tocados;
- estados claro y oscuro;
- flujos autenticado y anónimo;
- persistencia y aislamiento de progreso entre usuarios;
- respuestas de éxito y error de Supabase;
- comportamiento nativo cuando pueda verificarse en el entorno.

No afirmar que una prueba pasó si no se ejecutó. Registrar comando, resultado y cualquier limitación del entorno.

### 13. Criterios de aceptación

Redactar una lista verificable y binaria que defina el resultado terminado. Cada criterio debe corresponder a un requisito funcional, técnico o de seguridad. Evitar expresiones subjetivas sin una forma de comprobación.

### 14. Validación final

Incluir la secuencia exacta de revisión final:

1. revisar el diff y confirmar que solo contiene el alcance autorizado;
2. ejecutar `yarn typecheck`;
3. ejecutar `yarn lint`;
4. ejecutar las pruebas manuales y específicas definidas en el plan;
5. comprobar navegación y vista web para cambios de interfaz;
6. comprobar aislamiento de usuario, mejores puntajes y no duplicación de EXP si se tocó progreso;
7. comprobar RLS, permisos, atomicidad y migración si se tocó Supabase;
8. confirmar que no se incluyeron secretos, archivos generados ni cambios ajenos;
9. actualizar documentación y el propio ExecPlan;
10. registrar resultados, fallos conocidos y trabajo pendiente.

Si un comando falla por un problema preexistente, registrar la salida relevante, demostrar que no fue introducido por el cambio cuando sea posible y no ocultarlo.

### 15. Documentación de decisiones tomadas

Mantener un registro cronológico breve con:

- fecha;
- decisión;
- contexto o problema;
- alternativas consideradas;
- motivo de la elección;
- consecuencias o seguimiento.

Registrar también descubrimientos y desviaciones que alteren alcance, arquitectura, datos o estrategia de validación.

## Reglas específicas para Supabase y seguridad

- Documentar todo cambio de Supabase, incluso si solo modifica una consulta o el contrato consumido por el cliente.
- Inspeccionar y considerar RLS para cualquier tabla con datos de usuario. Si las políticas no pueden verificarse desde el repositorio, declararlo como incógnita y exigir verificación antes de desplegar.
- No resolver errores desactivando RLS ni usando una clave `service_role` en el cliente.
- Conservar el cliente compartido de `lib/supabase.ts` salvo que exista una razón aprobada y documentada.
- Verificar al usuario autenticado antes de acceder a datos ligados a `user_id`.
- Preferir operaciones atómicas para cambios que afectan múltiples registros o agregados.
- Proteger contra reintentos, doble envío y concesión duplicada de EXP.
- Tratar los slugs persistidos como identificadores estables. Cualquier cambio requiere migración de datos coordinada.
- Mantener `.env` fuera del repositorio y usar `.env.example` únicamente para nombres y valores ficticios.
- No copiar tokens, IDs de usuarios reales, credenciales ni respuestas sensibles en el ExecPlan.

## Reglas para dependencias y plataforma

Antes de proponer una dependencia:

1. comprobar si el proyecto ya ofrece la capacidad necesaria;
2. verificar soporte para la versión actual de Expo y React Native;
3. verificar soporte web o diseñar una separación segura por plataforma;
4. confirmar autolinking o plugin de configuración cuando aplique;
5. documentar tamaño, mantenimiento, riesgos y alternativa sin dependencia;
6. obtener autorización antes de modificar `package.json` o lockfiles.

No introducir una dependencia solo para una utilidad pequeña que pueda implementarse con APIs existentes de forma clara y mantenible. No ejecutar `expo prebuild`, instalaciones nativas manuales ni `pod install` como parte implícita de una tarea.

## Criterio general de finalización

Una tarea regida por un ExecPlan puede considerarse terminada únicamente cuando:

- todos los criterios de aceptación aplicables están cumplidos;
- el plan refleja la implementación real y no conserva pasos o supuestos obsoletos;
- las decisiones, descubrimientos y desviaciones relevantes están registrados;
- `yarn typecheck` y `yarn lint` no presentan errores nuevos;
- se ejecutaron y documentaron las validaciones disponibles y las pruebas manuales necesarias;
- los flujos tocados funcionan en las plataformas verificables, incluida web cuando aplica;
- los cambios de autenticación o progreso preservan el aislamiento entre usuarios;
- los cambios de puntuación o EXP preservan la regla acordada y evitan recompensas duplicadas;
- los cambios de Supabase tienen migración y seguridad documentadas cuando aplican;
- no se expusieron secretos ni se incluyeron archivos generados;
- el diff final se limita al alcance autorizado;
- cualquier limitación, validación no ejecutada o seguimiento pendiente se comunica explícitamente.

Completar código sin actualizar y cerrar el ExecPlan no equivale a completar la tarea.

## Plantilla mínima

Cada archivo nuevo en `.agent/plans/` debe partir de esta plantilla:

```markdown
# [Título]

## Objetivo

## Contexto y estado actual

## Requisitos funcionales

## Requisitos técnicos

## Arquitectura afectada

## Archivos y componentes afectados

## Cambios de base de datos, si aplica

## Plan de implementación paso a paso

## Casos límite

## Riesgos y posibles regresiones

## Estrategia de pruebas

## Criterios de aceptación

## Validación final

## Documentación de decisiones tomadas

## Progreso

## Descubrimientos

## Desviaciones

## Resultados
```
