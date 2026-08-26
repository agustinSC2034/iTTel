# Design QA — Renovación web iTTel + SICE

Fecha: 2026-08-26
Rama: `codex/renovacion-web-ittel-sice`

## Resultado

La renovación quedó verificada visual y funcionalmente en los cuatro anchos solicitados. La composición conserva la identidad de iTTel, equilibra IT y Telecomunicaciones y presenta la alianza iTTel + SICE como una narrativa continua antes de los casos de éxito.

| Viewport | Verificación principal | Resultado |
| --- | --- | --- |
| 1440 × 900 | Hero, navegación flotante, bloque SICE sticky 01/04–04/04, casos y clientes | PASS |
| 1024 × 768 | Menú responsive, escenas SICE apiladas, lectura y foco | PASS |
| 768 × 1024 | Hero, soluciones, ausencia de overflow horizontal | PASS |
| 390 × 844 | Lectura mobile, controles táctiles, mapa SICE y formulario | PASS |

## Flujos verificados

- Hero TELCO/IT con dos escenas, controles accesibles, pausa por interacción y por visibilidad, teclado y estado anunciado.
- Cuatro soluciones presentes en el recorrido vertical, sin contenido esencial detrás de tabs o clics.
- Cuatro escenas iTTel + SICE: sticky y vinculadas al scroll en desktop; apiladas en tablet, mobile y `prefers-reduced-motion`.
- Mapa SICE operable con mouse, teclado y toque; `Escape` cierra el detalle y devuelve el foco.
- Tres casos de éxito, cifras aprobadas, carrusel completo de clientes, contacto, mapa, idioma y footer.
- Navegación por anclas, sección activa, menú responsive y cierre con `Escape`.
- Versión inglesa equivalente y sin romper el selector de idioma.

## Comprobaciones técnicas

- `node --check js/main.js`: sin errores.
- Consola del navegador: 0 errores durante el recorrido completo.
- Recursos locales activos: 0 referencias faltantes en español y en inglés.
- Imágenes del recorrido completo: 0 rotas y 0 pendientes después del scroll.
- Sin IDs duplicados ni overflow horizontal en los viewports probados.
- Comparación lado a lado contra `1HERO.png` y `8_1.png`; se corrigieron jerarquía del hero, comportamiento sticky y separación de objetivos táctiles del mapa.

## Pendientes externos

- El procesamiento real de `contacto.php` requiere un servidor PHP 8.0. PHP no está disponible en el entorno local de esta verificación.
- Google reCAPTCHA rechaza `localhost` por dominio, como es esperable; el formulario, su integración y el endpoint existente se preservaron.
- Falta la verificación visual final en el hosting de cPanel después de un despliegue autorizado. Esta rama no despliega ni modifica `main`.
