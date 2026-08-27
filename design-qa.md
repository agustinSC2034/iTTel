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
- Falta la verificación visual final en el hosting de cPanel después de que el contenido de `main` sea desplegado.

## Revalidación específica — Hero TELCO / IT

### Evidencia

- Verdad visual TELCO: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-9396f5ab-25d4-40cb-8612-b8c02c9dcbef.png` (`1912 × 932`, densidad de referencia normalizada a la captura del navegador).
- Implementación TELCO: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-qa-telco-final2.png` (viewport configurado `1912 × 932`; contenido capturado `1897 × 925`, DPR 1).
- Comparación TELCO lado a lado: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-comparison-telco-final.jpg`.
- Verdad visual IT: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-40861a52-6c8a-4ab2-8a0f-a5e406dac4ce.png` (`1779 × 884`).
- Implementación IT: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-qa-it-final2.png` (viewport configurado `1792 × 896`; contenido capturado `1777 × 889`, DPR 1).
- Comparación IT lado a lado: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-comparison-it-final.jpg`.
- Responsive: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-qa-mobile-final.png` (`390 × 844`).

### Historial de comparación y correcciones

- [P1 resuelto] La imagen TELCO ocupaba solo el 68% derecho y recortaba la antena. Se restauró como fondo completo, manteniendo el encuadre y la antena visible también en mobile.
- [P1 resuelto] El recorte anterior del observatorio agrandaba y desplazaba el centro de control. Se generó un fondo limpio específico, sin navbar ni textos incrustados, y se alineó la composición con la referencia.
- [P2 resuelto] La tipografía difería en tamaño, peso, color, espaciado y saltos de línea. Se ajustaron Inter, peso 400, mayúsculas, tracking, line-height, ancho y cortes exactos.
- [P2 resuelto] El bloque `01 / 02` era demasiado protagonista. Se eliminó el contador visible y se conservaron tres controles circulares mínimos; el estado sigue disponible para lectores de pantalla.
- [P2 resuelto] La posición del contenido variaba según el ancho desktop. Se fijó al 19.5% del viewport para conservar la proporción de ambas referencias.

### Superficies de fidelidad

- Tipografía: familia, peso, tamaño, tracking, color, interlínea y quiebres alineados con las capturas.
- Espaciado y composición: navbar, bloque de marca, texto, degradado y focos fotográficos alineados en los dos tamaños de referencia.
- Color: azul oscuro, grises, blanco translúcido y tratamiento fotográfico coherentes con el original.
- Imágenes: TELCO usa el fondo limpio existente sin desplazarlo; IT usa `operation-center-clean.webp`, optimizada a `1779 × 884` y 149 KB.
- Contenido: se mantiene literalmente el mensaje aprobado en español y su equivalente inglés.
- Interacción: anterior, pausa/reproducción y siguiente operativos; pausa tras interacción, teclado y `aria-live` preservados.
- Consola: 0 errores en las escenas finales. Mobile sin overflow horizontal (`scrollWidth 375`, viewport 390).

No quedan hallazgos P0, P1 o P2 en el Hero. Como P3 aceptable, la fotografía limpia del observatorio puede presentar microvariaciones en detalles de oficina respecto de la captura compuesta original.

final result: passed
