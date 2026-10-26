# Repaso persistente de flashcards

## Objetivo
- Repasar solo términos en progreso, repetir rondas y conservar cada respuesta guardada en Supabase.
- Autenticación obligatoria; progreso independiente por usuario y tema.

## Decisiones y preguntas abiertas
- Confirmado: Supabase, guardado por respuesta y conservación al salir con la X.
- Migración aplicada por el usuario en el SQL Editor y verificada mediante la API real de Supabase.
- No quedan preguntas abiertas.

## Tareas
- [x] Identificadores estables y migración con RLS.
- [x] Consultas/mutaciones compartidas y limpieza al cambiar de cuenta.
- [x] Autenticación con regreso al tema seleccionado.
- [x] Rondas completas/de pendientes, guardado y reintento.
- [x] Pantalla inicial y resumen con repaso condicionado a pendientes reales.

## QA
- [x] TypeScript y lint de los cambios.
- [x] Sesión completa → repaso → cero pendientes.
- [x] Salida anticipada, recuperación, errores y pulsaciones repetidas.
- [x] Acceso anónimo y separación de usuarios/temas (RLS).
- [x] Vista previa web y contraste claro/oscuro.
- [x] Migración y persistencia verificadas en Supabase.

### Pruebas realizadas en la vista previa con una cuenta de prueba
- Inicio anónimo redirige al login; autenticarse devuelve al tema Variables.
- Ciclo real de 5 tarjetas → 3 pendientes → 1 pendiente → 0; repaso deshabilitado al terminar.
- Repaso de una sola tarjeta: respuesta oculta inicialmente y revelada con el botón.
- Doble pulsación en la misma tarjeta: un solo guardado y un solo avance.
- Error de escritura simulado: conserva tarjeta/clasificación, muestra reintento y avanza solo tras guardar.
- Salida con X: conserva dos pendientes; una nueva ronda parcial retira uno y conserva el no respondido.
- Recarga completa: restaura cuatro conocidos y un pendiente desde Supabase.
- Error de lectura simulado: muestra error, deshabilita el repaso y permite recuperar los datos; no muestra cero pendientes.
- Cambio a Tipos de datos: cero pendientes; volver a Variables conserva su único pendiente.
- Respuesta 401 simulada: pide autenticación nuevamente, mantiene el tema de retorno y conserva respuestas guardadas.
- API anónima: 401. Con una cuenta autenticada, consultar otro usuario devuelve cero filas y escribir como otro usuario devuelve 403/RLS.
- Comprobación visual en claro y oscuro. La cuenta de prueba queda con el estado original de Variables: cuatro conocidos y `variables-2` en progreso.

## Seguimiento
- Comprobación inicial: `npm run typecheck` excede la pila de Node; `node --stack-size=8192 node_modules/typescript/bin/tsc --noEmit` pasa.
- Lint de los archivos TypeScript modificados sin errores ni advertencias.
- Metro web queda disponible en `http://localhost:8081`.
- El progreso persistente conserva clasificaciones, no la posición de una ronda interrumpida. Tras recargar se elige una nueva ronda desde los pendientes guardados.
