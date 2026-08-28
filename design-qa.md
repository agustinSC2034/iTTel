# Design QA — Renovación web iTTel + SICE

Fecha: 2026-08-27
Rama: `main` (cambios locales de esta revisión todavía sin push)

## Resultado

La renovación quedó verificada visual y funcionalmente en los cuatro anchos solicitados. La composición conserva la identidad de iTTel, equilibra IT y Telecomunicaciones y presenta la alianza iTTel + SICE como una narrativa continua antes de los casos de éxito.

| Viewport | Verificación principal | Resultado |
| --- | --- | --- |
| 1440 × 900 | Hero, navegación flotante, bloque SICE sticky 01/05–05/05, casos y clientes | PASS |
| 1024 × 768 | Menú responsive, escenas SICE apiladas, lectura y foco | PASS |
| 768 × 1024 | Hero, soluciones, ausencia de overflow horizontal | PASS |
| 390 × 844 | Lectura mobile, controles táctiles, experiencias SICE y formulario | PASS |

## Flujos verificados

- Hero TELCO/IT con dos escenas, controles accesibles, pausa por interacción y por visibilidad, teclado y estado anunciado.
- Cuatro soluciones presentes en el recorrido vertical, sin contenido esencial detrás de tabs o clics.
- Cinco escenas iTTel + SICE: sticky y vinculadas al scroll en desktop; apiladas en tablet, mobile y `prefers-reduced-motion`.
- Mapa global SICE simplificado, sin interacción por país, seguido por una escena con las once experiencias internacionales verificadas visibles en conjunto.
- Tres casos de éxito, cifras aprobadas, carrusel completo de clientes, contacto, mapa, idioma y footer.
- Navegación por anclas, sección activa, menú responsive y cierre con `Escape`.
- Versión inglesa equivalente y sin romper el selector de idioma.

## Comprobaciones técnicas

- `node --check js/main.js`: sin errores.
- Consola del navegador: 0 errores durante el recorrido completo.
- Recursos locales activos: 0 referencias faltantes en español y en inglés.
- Imágenes del recorrido completo: 0 rotas y 0 pendientes después del scroll.
- Sin IDs duplicados ni overflow horizontal en los viewports probados.
- Comparación lado a lado contra `1HERO.png` y `8_1.png`; se corrigieron jerarquía del hero, comportamiento sticky y densidad visual de la narrativa SICE.

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

## Revalidación específica — Tipografía del hero

### Evidencia

- Referencia anterior: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-d8022ba4-c043-4add-95ef-f5552048a168.png`.
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-text-after.png`.
- Vista mobile: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/hero-text-mobile.png` (`390 × 844`).

### Correcciones y resultado

- [P2 resuelto] El subtítulo y el texto principal habían quedado más chicos y claros que en la versión anterior. Se restauró una escala mayor, el gris corporativo `#344054` y el interlineado original más amplio.
- Fondo, posición de la antena, logo, navegación y controles del hero no fueron modificados.
- El ajuste desktop mantiene la adaptación mobile existente; no hay overflow horizontal a `390 px`.

No quedan hallazgos P0, P1 o P2 para este ajuste.

final result: passed

## Revalidación específica — Selector de idioma minimalista

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-4392b187-3c0c-4c5f-bb7e-febd994b987a.png` (`1604 × 161`).
- Implementación desktop: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/language-selector-minimal-closed.png` (`1280 × 720`, DPR 1).
- Comparación focal normalizada: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/language-selector-comparison.png`.
- Implementación mobile: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/language-selector-minimal-mobile.png` (`390 × 844`, DPR 1).
- Estado: navbar sobre el hero, selector cerrado y desplegable abierto verificados.

### Historial de comparación y correcciones

- [P2 resuelto] El selector tenía forma de píldora, fondo celeste, borde y texto `ARG/ENG`, generando un bloque visual innecesario. Se retiraron texto, fondo, borde, sombra y blur; quedan únicamente la bandera real y el chevron existente.
- [P2 resuelto] El listener anterior abría el menú pero bloqueaba la sincronización de `aria-expanded`. El mismo control actualiza ahora el estado accesible al abrir y al cerrar fuera del menú.
- [P2 resuelto] La variante mobile conservaba el fondo y borde forzados del diseño anterior. El selector también es transparente dentro del menú móvil y mantiene un área táctil de `46 × 34 px`.

### Superficies de fidelidad

- Tipografía y contenido: se eliminó solamente la etiqueta redundante; la elección completa sigue visible dentro del desplegable.
- Espaciado: control compacto, centrado y alineado con los links del navbar, sin alterar la cápsula principal.
- Color e imagen: bandera de FlagCDN preservada; fondo y borde del control son completamente transparentes.
- Interacción y accesibilidad: apertura/cierre operativos, `aria-expanded` sincronizado y foco visible conservado.
- Responsive: desktop y `390 px` sin overflow horizontal.
- Bilingüe y consola: banderas correctas en español e inglés; 0 errores o advertencias.

No quedan hallazgos P0, P1 o P2 para este ajuste.

final result: passed

## Revalidación específica — Retiro de la alianza local

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-ada50d7f-2a94-4c6e-ae96-dad19f857336.png` (`1892 × 927`), escena señalada para retirar.
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/sice-four-scenes-platform-settled.png` (`1425 × 891`).
- Comparación normalizada: `sice-alliance-removal-comparison.png`, ambas vistas ajustadas a `1440 × 900`, DPR 1.
- Estado final: SIDERA pasa a ser la escena `03/04`, inmediatamente después de `PROYECTOS`.

### Hallazgos resueltos

- [P1 resuelto] Se eliminó por completo la escena `Tecnología global, integrada en Argentina` de las versiones española e inglesa.
- [P2 resuelto] Se recalcularon índices, progreso y altura sticky de cinco a cuatro escenas, evitando un tramo de scroll vacío.
- [P2 resuelto] En tablet y mobile la secuencia estática conserva las cuatro escenas restantes en orden natural y sin overflow horizontal.

### Superficies de fidelidad

- Composición: la transición visual ahora conecta `PROYECTOS` directamente con SIDERA, sin panel intermedio redundante.
- Progreso: numeración consistente `01/04` a `04/04` en desktop.
- Responsive: cuatro escenas relativas y legibles a `390 × 844`; sin desborde horizontal.
- Bilingüe: mismo retiro y misma secuencia en español e inglés.
- Validación técnica: cuatro escenas reales, ausencia del bloque retirado, `node --check js/main.js` y `git diff --check` correctos.

No quedan hallazgos P0, P1 o P2 para este cambio.

final result: passed

## Revalidación específica — Narrativa iTTel + SICE en mobile

### Evidencia normalizada

- Verdad visual y problema reportado: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-7020b283-d8bf-4248-87e5-1ec5bdab9f87.png` y `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-a95aef95-174f-4a43-8574-437bcb7b7d5d.png`.
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/sice-mobile-final/global-390x844.png` y `alliance-390x844.png`.
- Viewport CSS de Chrome: `390 × 844`, DPR 1. El área activa capturada fue `375 × 811` y se normalizó a `390 × 844` para la comparación.
- Comparación completa conjunta: `sice-mobile-final/comparison-global.png`.
- Comparación focal de orden y alianza: `sice-mobile-final/comparison-alliance.png`.
- Estado: navegación móvil cerrada, sección SICE al inicio y alianza local en lectura natural; español. La estructura equivalente también se verificó en inglés.

### Historial de hallazgos y correcciones

- [P1 resuelto] Las escenas heredaban la lógica absoluta y sticky de escritorio, generando pantallas vacías, medios desconectados y títulos fuera del viewport. En `max-width: 900px` las cinco escenas ahora son bloques estáticos independientes, siempre visibles y sin transformaciones heredadas.
- [P1 resuelto] La alianza local mostraba primero un mapa aislado y saltaba directamente a SIDERA. Se reordenó cada escena como copy → marca/roles → imagen, conservando global → experiencias → alianza → SIDERA → Auditoría Urbana.
- [P2 resuelto] El logo SICE se veía como una tarjeta blanca dominante. Se recortó visualmente el asset corporativo existente dentro de un lockup compacto, sin recrear ni alterar la marca.
- [P2 resuelto] Las once experiencias se comprimían en dos columnas a 390 px. Ahora son tarjetas de una columna con texto legible; desde 600 px pasan a dos columnas.
- [P2 resuelto] Los dashboards y mapas usaban alturas rígidas y recortes agresivos. Ahora se presentan en contenedores con proporción controlada, `object-fit: contain` para interfaces y `cover` sólo para el mapa de Buenos Aires.
- [P2 resuelto] Al ocultar saltos `<br>` en mobile se unían palabras en las bajadas. Se preservaron espacios reales en español e inglés.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, pesos, tamaños, tracking e interlíneas conservan el sistema aprobado; los títulos quiebran sin desbordar a 390 y 768 px.
- Espaciado y ritmo: cada capítulo tiene entrada, copy, marca y media con separadores sutiles; no quedan huecos vacíos ni solapamientos con la navbar.
- Color: blanco, azul noche, turquesa SICE, grises fríos y bordes `#d8e3ec` mantienen el lenguaje corporativo y contraste legible.
- Calidad de imagen: mapa mundial, mapa Buenos Aires, SIDERA y Auditoría Urbana usan los WebP existentes, completos y sin estiramiento; no se agregaron placeholders ni gráficos dibujados en CSS.
- Copy: se preservan las cifras aprobadas, las once experiencias verificadas y el contenido bilingüe; no se inventaron métricas o proyectos.
- Responsive y accesibilidad: cinco escenas visibles, once tarjetas presentes, cero imágenes rotas, cero pendientes de carga, sin overflow horizontal y sin dependencia de tabs, hover o sticky.
- Consola: cero errores o advertencias durante el recorrido móvil completo.
- Desktop: a `1440 × 900` la sección conserva `4500 px`, contenedor sticky y una única escena activa; la hoja móvil no interviene.

No quedan hallazgos P0, P1 o P2 en el bloque iTTel + SICE mobile.

final result: passed

## Revalidación final — Responsive mobile y minimalismo

Esta revisión toma como patrón la implementación pública anterior de `https://ittel.com.ar/` y corrige la adaptación móvil de la renovación sin alterar la composición desktop aprobada.

### Evidencia comparada

- Fuente mobile: 30 capturas consecutivas de la web pública a `390 × 844 px` en `mobile-responsive-source/`.
- Implementación previa: 33 capturas consecutivas a `390 × 844 px` en `mobile-responsive-before/`.
- Implementación corregida: capturas por bloque a `390 × 844 px` y `768 × 900 px` en `mobile-responsive-after/`.
- Comparación conjunta, mismo viewport: `mobile-responsive-after/compare-hero-source-vs-local.png`.
- Desktop preservado: `1440 × 900 px`, sin intervención de la hoja responsive dedicada.

### Correcciones verificadas

- Hero: vuelve a usar una escena fotográfica de viewport completo con copy integrado, antena visible en TELCO y centro de operaciones completo en IT; los controles quedan pequeños y translúcidos.
- Presentación: matriz compacta, sin `NOSOTROS` ni numeración ornamental.
- Soluciones: Redes neutrales, Operación inteligente, Obras y Mantenimiento usan fotografías de fondo y copy superpuesto con contraste AA; los logos institucionales se presentan monocromos sobre fondo oscuro.
- SICE: las cinco escenas se apilan en móvil sin sticky, tabs ni pantallas vacías; mapa, experiencias, alianza, SIDERA y Auditoría Urbana mantienen orden natural y logos recortados sin recuadros dominantes.
- Casos de éxito: Redes en Argentina conserva el patrón inmersivo; Autopistas e ISP se convierten en composiciones editoriales claras con mapas y fichas apiladas.
- Cierre: cifras, carrusel de clientes, contacto y footer mantienen la arquitectura y el contenido existentes con espaciado móvil más corto.
- Minimalismo: eliminados todos los conectores `SIGUIENTE…` y `NEXT…` en español e inglés.

### Validación técnica y funcional

- Viewports comprobados: `390 × 844`, `768 × 900` y `1440 × 900`.
- Español e inglés: `scrollWidth <= innerWidth`, cero imágenes rotas y secuencia completa visible.
- Navbar: menú móvil abierto y cerrado con estado `aria-expanded` correcto.
- Consola española: sin errores ni advertencias; sólo el mensaje `debug` esperado del mapa embebido de Google.
- Código: `node --check js/main.js`, balance CSS `190/190` y `git diff --check` sin errores.
- Movimiento reducido: transiciones y revelados desactivados mediante `prefers-reduced-motion: reduce`.

No quedan hallazgos P0, P1 o P2 para la adaptación responsive solicitada.

final result: passed

## Revalidación específica — Casos de éxito, cifras, clientes, contacto y footer

### Evidencia

- Verdades visuales: `codex-clipboard-6008549b-3f49-44b1-93d5-0ad866a6a7ad.png` (`1773 × 887`), `codex-clipboard-6d0fd3b3-ca89-4f97-b36f-7202f124cb47.png` (`1774 × 887`), `codex-clipboard-796dc5e6-16db-45ca-8053-8ceb67b7eaef.png` (`1774 × 887`) y las tres capturas de cifras/clientes, contacto y footer de aproximadamente `1890 × 1086` con `59 px` de chrome del navegador normalizados fuera del contenido.
- Implementaciones finales: `case-01.png`, `case-02.png`, `case-03.png`, `stats.png`, `clients.png`, `contact.png` y `footer.png` en `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/ittel-final/`.
- Captura desktop: viewport CSS de Chrome `1920 × 889`, área renderizada `1905 × 882`, DPR 1.
- Comparaciones completas lado a lado: `compare-case-01.jpg`, `compare-case-02.jpg`, `compare-case-03.jpg`, `compare-stats.jpg`, `compare-contact.jpg` y `compare-footer.jpg` en la misma carpeta.
- Comparación focal: tarjetas ISP, trazados de red, etiquetas de mapas, copy de casos, formulario, datos de contacto y columnas de footer son legibles en las comparaciones completas; no fue necesario un recorte adicional después de normalizar cada par a `1300 px` por lado.
- Responsive validado en Chrome con viewport explícito `1440 × 900`, `1024 × 768`, `768 × 900` y `390 × 844`.
- Estado: navegación activa en `CASOS DE ÉXITO`, `CLIENTES` y `CONTACTO`; carrusel en movimiento, formulario presente y versión inglesa con los mismos recursos.

### Historial de comparación y correcciones

- [P1 resuelto] Los tres casos anteriores usaban bloques genéricos y no reproducían el recorrido aprobado. Se reconstruyeron en el orden ferroviario → autopistas → ISP con copy, jerarquía, fondos, mapas y llamadas al siguiente bloque de las referencias.
- [P1 resuelto] Las tarjetas ISP utilizaban mapas crudos distintos de los mockups. Se preservaron los trazados aprobados como dos WebP limpios sin textos de interfaz incrustados; logos, títulos, métricas y contenido continúan como HTML accesible.
- [P2 resuelto] Autopistas mostraba mapas superpuestos y dejaba el contenido derecho fuera del primer viewport. Ahora ambos mapas ocupan la columna izquierda completa y todo el resumen, la capacidad nacional y el enlace siguiente permanecen visibles.
- [P2 resuelto] El primer caso tenía el copy demasiado alto y oscurecía en exceso la fotografía. Se ajustaron margen izquierdo, altura editorial, ritmo de beneficios y doble overlay manteniendo visible el trabajo sobre las vías.
- [P2 resuelto] La vista de `390 px` dejaba parte del copy de Autopistas dentro de un contenedor de altura fija. Desde `900 px` la sección crece con su contenido y presenta mapas y texto en lectura vertical natural.
- [P2 resuelto] Contacto comenzaba aproximadamente `50 px` antes que la referencia. Se recalibró el aire superior sin modificar formulario, reCAPTCHA, mapa ni datos existentes.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, mayúsculas, tamaños, pesos, tracking, interlíneas y quiebres verificados contra las seis referencias.
- Espaciado y composición: márgenes de `62–156 px`, relaciones mapa/copy, dos tarjetas ISP, bloque oscuro de métricas, carrusel, formulario y footer conservan la jerarquía objetivo.
- Color: azul marino, blanco frío, cian de acento, overlays y superficies de tarjetas coinciden con el lenguaje corporativo aprobado y mantienen contraste AA en el contenido principal.
- Calidad de imagen: fondo ferroviario y mapas de autopistas reutilizan assets limpios del proyecto; los dos mapas ISP son WebP de `551 × 405` y `591 × 405`, sin capturas completas usadas como interfaz.
- Contenido: copy español literal de las referencias; la versión inglesa mantiene el mismo orden, estructura y recursos sin inventar proyectos ni cifras.
- Iconos: se reutiliza Font Awesome ya presente para flechas y globo, con tamaños y alineación consistentes; no se incorporaron SVG o dibujos CSS sustitutos.
- Interacción: los enlaces “Siguiente” navegan al caso posterior, la sección activa cambia en la navbar y el carrusel de clientes avanza continuamente y conserva pausa/arrastre existentes.
- Accesibilidad: artículos y figuras semánticos, alt útiles, foco visible, enlaces reales, formulario intacto, navegación colapsable y `prefers-reduced-motion` preservado.
- Responsive: `documentElement.scrollWidth === clientWidth` en `1440`, `1024`, `768` y `390 px`; ningún caso, cliente, contacto o footer provoca overflow horizontal. En tablet/mobile las secciones altas crecen con el contenido.
- Validación técnica: recursos de casos cargan con ancho natural válido en español e inglés, todas las anclas internas resuelven, `node --check js/main.js` y `git diff --check` pasan.

No quedan hallazgos P0, P1 o P2. Como P3 aceptable, la navbar global conserva el ancho compacto ya aprobado en las secciones anteriores y el reCAPTCHA muestra el aviso esperado únicamente en `localhost`, porque la clave está autorizada para el dominio productivo.

final result: passed

## Revalidación específica — iTTel + SICE / Experiencia global

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-86b3bd87-d26c-477c-bcef-c69cec146222.png` (`1774 × 887`).
- Implementación final: `sice-global-final-desktop.png`, capturada en Chrome con viewport CSS `1774 × 898` y España activa mediante hover real.
- Comparación completa lado a lado: `sice-global-comparison-final.jpg`.
- Responsive: validación de layout en `1024`, `768` y `390` px; en los tres anchos `scrollWidth` coincide con `clientWidth`.
- Versiones: español e inglés comparten estructura, mapa e interacción y conservan textos localizados.

### Historial de comparación y correcciones

- [P1 resuelto] Se descartó el mapa alternativo con pines grandes incrustados y se reutilizó el recurso original limpio `assets/images/sice_sin_ubicaciones.png` (`1672 × 941`), coincidente con la referencia.
- [P1 resuelto] El mapa dejó de ser una imagen informativa estática: cada país dispone de un punto HTML operable por hover, foco y toque, con información proveniente del material original del proyecto.
- [P2 resuelto] La ficha de España se calibró contra la referencia y se vinculó visualmente con el país mediante un conector sutil; no hay textos ni tarjetas incrustados en el mapa.
- [P2 resuelto] Se reprodujeron la jerarquía editorial, el logotipo SICE, la fila de cuatro magnitudes y el progreso `01/04` a `04/04`.
- [P2 resuelto] La sección mantiene `SOLUCIONES` como estado activo de navegación y respeta el recorrido sticky existente.
- [P2 resuelto] En tablet y mobile el contenido pasa a lectura natural, conserva todos los países y evita overflow horizontal.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, mayúsculas, pesos, tracking, color, interlínea y quiebres comparados con la captura.
- Espaciado y composición: navbar flotante, bloque editorial izquierdo, mapa, ficha contextual, métricas y progreso alineados con el encuadre de referencia.
- Color: fondo blanco, azul oscuro corporativo, acento turquesa SICE y países inactivos en gris tenue.
- Imágenes: se reutilizaron el mapa y el logotipo SICE existentes; no se generó ni falsificó material corporativo para esta escena.
- Interacción: hover con mouse, foco de teclado, toque/click y cierre con `Escape`; la ficha no queda visible sin una selección activa.
- Accesibilidad: botones por país con `aria-label`, `aria-expanded`, foco visible y contenido de detalle semántico.
- Movimiento reducido: la escena conserva lectura completa sin depender de transiciones.
- Validación estática: `node --check js/main.js` y `git diff --check` sin errores.

No quedan hallazgos P0, P1 o P2 en la escena Experiencia global.

final result: passed

## Revalidación específica — Soluciones / Mantenimiento preventivo y correctivo

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-84c804ee-dc46-4fcf-8f88-526bbf189ea0.png` (`1774 × 887`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/maintenance-final-desktop.png` (viewport CSS `1774 × 898`, DPR 1; captura física `1759 × 814`).
- Normalización: área activa `1610 × 814`, recortada del relleno de Chrome y normalizada a `1774 × 887` en `maintenance-final-desktop-normalized.png`.
- Comparación completa lado a lado: `maintenance-comparison-final.jpg` en la misma carpeta de evidencia.
- Comparación focal del panel: `maintenance-card-comparison-final.jpg` en la misma carpeta de evidencia.
- Responsive: `maintenance-final-1024.png`, `maintenance-final-768.png` y `maintenance-final-390.png`.
- Versión inglesa: `maintenance-final-en-1024.png`.

### Historial de comparación y correcciones

- [P1 resuelto] El bloque utilizaba la fotografía correcta, pero la tarjeta tenía un título genérico, una descripción extensa y una grilla resumida que no reproducían la referencia. Se conservó el fondo existente y se reconstruyó únicamente el contenido del panel.
- [P2 resuelto] La tarjeta inicial no respetaba las proporciones del mockup. Se calibró a `x 947 / y 141 / 516 × 691 px`, frente al objetivo aproximado `x 947 / y 140 / 516 × 691 px`.
- [P2 resuelto] Kicker, título, bajada y beneficios tenían jerarquía y ritmo distintos. Se ajustaron relleno, tracking, interlínea, color y espacios contra la comparación focal.
- [P2 resuelto] Faltaba el cierre visual de atención permanente. Se incorporó el bloque azul `7x24` con el mensaje aprobado de cobertura durante los 365 días.
- [P2 resuelto] En tablet y mobile la tarjeta superpuesta reducía la legibilidad. Desde 900 px la fotografía queda arriba y el panel continúa debajo mediante scroll natural.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, título en tres líneas, pesos, tracking, interlíneas y escalas comparados con la captura.
- Espaciado y composición: posición, ancho, alto, relleno, tres beneficios y bloque 7x24 alineados con las proporciones de referencia.
- Color: superficie gris fría, azul oscuro del texto, acento cian y cierre azul coherentes con el original.
- Imágenes: se reutiliza sin modificaciones `horizontal/mantenimiento.webp` (`1672 × 941`), ya coincidente con la fotografía y el degradado de la referencia; no se generaron nuevos fondos.
- Contenido: copy español literal de la referencia y equivalente inglés completo.
- Interacción y movimiento: entrada progresiva al hacer scroll; con movimiento reducido se eliminan transiciones y transformaciones.
- Responsive: sin overflow horizontal en 1024, 768 y 390 px; la imagen carga con su resolución natural y el panel permanece completo.
- Navegación: `SOLUCIONES` queda activa al recorrer el bloque y el ancla directa funciona en ambos idiomas.

No quedan hallazgos P0, P1 o P2 en Mantenimiento. Como P3 aceptable, el área detrás de la navbar transparente muestra el final del bloque anterior durante la captura aislada, porque se preservó la navegación global y el recorrido vertical real del sitio.

final result: passed

## Revalidación específica — Soluciones / Operación inteligente

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-2b749528-c0e3-4168-83f1-4a124ccf7062.png` (`1804 × 872`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/operation-final-desktop.png` (viewport CSS `1805 × 871`, DPR 1; captura física `1790 × 829`).
- Normalización: área activa `1683 × 813`, recortada del relleno de Chrome y normalizada a `1804 × 872` en `operation-final-desktop-normalized.png`.
- Comparación completa lado a lado: `operation-comparison-final.jpg` en la misma carpeta de evidencia.
- Comparación focal del panel: `operation-card-comparison-final.jpg` en la misma carpeta de evidencia.
- Responsive: `operation-final-1024.png`, `operation-final-768.png` y `operation-final-390.png`.
- Estado comparado: sección iniciando 81 px debajo del borde superior, navbar flotante visible y animación de entrada finalizada.

### Historial de comparación y correcciones

- [P1 resuelto] El bloque anterior era una composición genérica de dos imágenes. Se reemplazó por un fondo limpio generado específicamente con mapa ITS y cuatro cámaras operativas, sin textos principales incrustados.
- [P1 resuelto] Faltaban la matriz de cámaras, la detección de velocidad y residuos, el panel variable y el vínculo visual con SICE. Se reconstruyeron todos los elementos presentes en la referencia.
- [P2 resuelto] La tarjeta inicial no respetaba posición, tamaño ni contenido. Se calibró a `x 95.2 / y 160.5 / 532.5 × 595 px`, frente al objetivo aproximado `x 96 / y 161 / 530 × 595 px`.
- [P2 resuelto] Los beneficios aparecían inicialmente en dos columnas por una regla heredada. Se aislaron en una columna y se corrigieron interlínea, márgenes, azul del panel y alineación del wordmark SICE.
- [P2 resuelto] En 768 px la composición seguía superpuesta y comprimida. Desde 900 px se muestra primero la matriz operativa y luego la tarjeta completa en lectura vertical natural.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, jerarquía, mayúsculas, pesos, interlíneas, tracking y cortes comparados en región focal.
- Espaciado y composición: panel, cuatro cámaras, rótulos, cajas de detección y panel variable alineados con las proporciones de la captura.
- Color: superficie del panel muestreada en `rgb(2, 25, 52)`, acento cian, bordes de detección rojo/ámbar y mapa azul marino coherentes con la referencia.
- Imágenes: fondo generado en alta resolución, optimizado a WebP y sin navbar, tarjeta ni copy principal incrustado; wordmark SICE aislado como asset raster limpio.
- Contenido: copy español literal de la referencia y equivalente inglés completo.
- Interacción y movimiento: entrada progresiva por scroll mediante `IntersectionObserver`; `prefers-reduced-motion` elimina las transiciones.
- Responsive: sin overflow horizontal ni imágenes rotas en 1024, 768 y 390 px; la lectura mobile no oculta beneficios.
- Consola y recursos: `node --check js/main.js` y `git diff --check` sin errores; español e inglés sin recursos rotos.

No quedan hallazgos P0, P1 o P2 en Operación inteligente. Como P3 aceptable, el fondo generado presenta microvariaciones fotográficas respecto de la composición original, pero conserva sujetos, jerarquía, encuadre y densidad visual.

final result: passed

## Revalidación específica — Soluciones / Redes Neutrales

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-06000dac-a30a-4a73-9a28-45009968783d.png` (`1805 × 871`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/solutions-final-desktop.png` (viewport CSS `1805 × 871`, DPR 1; captura física `1790 × 829`).
- Normalización: el navegador entregó un área activa de `1683 × 813`, recortada del relleno blanco de la captura y normalizada a `1805 × 871` en `solutions-final-desktop-normalized.png`.
- Comparación completa lado a lado: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/solutions-comparison-final.jpg`.
- Comparación focal del panel: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/solutions-panel-comparison-final.jpg`.
- Responsive: `solutions-final-1024-normalized.png`, `solutions-final-768-normalized.png` y `solutions-final-390-normalized.png` en la misma carpeta de evidencia.

### Historial de comparación y correcciones

- [P1 resuelto] La portada intermedia de “Capacidad integral” agregaba un viewport completo que no existe en la referencia. Se retiró del flujo visual y se conservó su encabezado sólo para semántica accesible.
- [P1 resuelto] El panel anterior tenía copy genérico, grilla de cuatro capacidades y no mostraba marcas. Se reconstruyó con el contenido literal de Redes Neutrales, tres beneficios y los 14 logos reales existentes.
- [P1 resuelto] Las cuatro fotografías existentes sólo estaban disponibles en la fuente legada. Se reactivaron como carrusel sobrio de fondo, con fundido y respeto por `prefers-reduced-motion`.
- [P2 resuelto] El primer panel estaba desplazado, sobredimensionado y con demasiado espacio inferior. Se calibró a `497 × 690` px, posición `x 937 / y 134` en el viewport de referencia.
- [P2 resuelto] El fondo y la superficie del panel tenían contraste y temperatura incorrectos. Se ajustó el oscurecimiento lateral azul marino y el bloque de gris frío a blanco suave.
- [P2 resuelto] Logos, títulos y descripciones no respetaban el ritmo de cuatro, cuatro, tres y tres elementos. Se reprodujo esa matriz usando los assets corporativos existentes.

### Superficies de fidelidad

- Tipografía: jerarquía Poppins/Inter, título en mayúsculas, kicker azul, pesos, interlíneas y quiebres comparados en región focal.
- Espaciado y composición: panel, márgenes, padding, tres beneficios y cuatro filas de logos alineados con la captura.
- Color: fondo fotográfico con oscurecimiento progresivo y bloque gris claro de transición vertical coherentes con la referencia.
- Imágenes: cuatro fondos WebP existentes y 14 logos corporativos reales; no se generaron ni falsificaron marcas.
- Contenido: copy español literal de la referencia y equivalente inglés completo.
- Interacción: el carrusel avanza entre cuatro fotografías cada 4,2 segundos y queda estático con movimiento reducido.
- Responsive: sin overflow horizontal en 1024, 768 y 390 px; en mobile el panel continúa por scroll natural sin ocultar logos.
- Consola y recursos: 0 errores, 0 imágenes rotas en español e inglés.

La diferencia P3 aceptada es el ancho de la navbar global: se preservó el componente ya aprobado para no degradar el Hero ni la sección Nosotros.

final result: passed

## Revalidación específica — Nosotros / Grupo iTTel

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-241259f3-0bb7-4683-8abc-1f205764c186.png` (`1857 × 847`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/overview-final-desktop.png` (viewport configurado `1858 × 846`; contenido capturado `1843 × 839`, DPR 1).
- Comparación completa normalizada: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/overview-comparison-final.jpg`.
- Comparación focal del contenido central: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/overview-center-comparison-final.jpg`.
- Responsive: `overview-final-1024.png`, `overview-final-768.png` y `overview-final-390.png` en la misma carpeta de evidencia.

### Historial de comparación y correcciones

- [P1 resuelto] La composición lateral no existía como asset limpio. Se generó `overview-technical-background.webp` con mapa aéreo y señalización a la izquierda, torre técnica a la derecha, red inferior y centro blanco libre de texto incrustado.
- [P1 resuelto] El centro anterior no respetaba la jerarquía ni la matriz de la referencia. Se reconstruyeron título, bajada, seis capacidades y cierre con HTML semántico y copy literal.
- [P2 resuelto] La barra flotante cubría el kicker en desktop. Ahora cede de manera transitoria cuando la sección ocupa el viewport y se conserva visible en tablet y mobile.
- [P2 resuelto] La primera descripción generaba un salto de línea y alteraba las alturas. Se calibraron cuerpo y ancho para mantener la proporción de la captura.
- [P2 resuelto] La regla global `.container` anulaba el espacio superior en 390 px. Se reforzó el padding responsive y el encabezado queda por debajo de la navegación.
- [P2 resuelto] Se restauró el espacio semántico de la bajada en mobile entre “de” e “infraestructura”.

### Superficies de fidelidad

- Tipografía: Poppins e Inter con tamaños, pesos, tracking, color, interlínea y quiebres ajustados contra la referencia.
- Espaciado y composición: contenido central de 1098 px, dos columnas equivalentes, seis filas y cierre alineados al encuadre original.
- Color: azul oscuro, azul de acento, grises fríos, bordes tenues y fondo blanco técnico reproducidos.
- Imágenes: fondo generado y optimizado a WebP (`1858 × 846`, 99 516 bytes), sin textos, navbar ni controles incrustados.
- Contenido: textos en español respetados literalmente y versión inglesa equivalente con seis capacidades.
- Interacción: revelado progresivo con scroll, navegación por ancla y foco visual preservados; en mobile la lectura se apila sin ocultar contenido.
- Responsive: sin overflow horizontal en 1024, 768 y 390 px; `scrollWidth` coincide con `clientWidth`.
- Consola: 0 errores en español e inglés. `node --check js/main.js` y `git diff --check` sin errores.

No quedan hallazgos P0, P1 o P2 en la sección Nosotros.

final result: passed

## Revalidación específica — Soluciones / Obras e integración tecnológica

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-2b56583c-3f34-4a3a-a2a4-612acc97a008.png` (`1774 × 887`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/works-final-desktop.png` (viewport CSS `1774 × 898`; captura física `1759 × 814`, DPR 1).
- Normalización: área activa `1610 × 814`, recortada del relleno de Chrome y normalizada a `1774 × 887` en `works-final-desktop-normalized.png`.
- Comparación completa lado a lado: `works-comparison-final.jpg` en la misma carpeta de evidencia.
- Comparación focal del panel: `works-card-comparison-final.jpg` en la misma carpeta de evidencia.
- Responsive: `works-final-1024.png`, `works-final-768.png` y `works-final-390.png`.
- Versiones: español e inglés comprobados con la misma estructura semántica y recursos compartidos.

### Historial de comparación y correcciones

- [P1 resuelto] El bloque anterior utilizaba una fotografía aérea genérica y una tarjeta que no reproducían la escena solicitada. Se reemplazó por la obra vial con camioneta iTTel, excavadora, zanja, ductos y cuadrillas de la referencia.
- [P1 resuelto] Para evitar texto o interfaz incrustados en la imagen, se preservó la región fotográfica limpia de la referencia y se generó únicamente su continuación derecha, destinada a quedar debajo del degradado y del panel HTML.
- [P2 resuelto] El panel se calibró a `x 918 / y 139 / 495 × 677 px`, frente al objetivo aproximado `x 918 / y 140 / 495 × 677 px`.
- [P2 resuelto] Se ajustaron fondo gris frío, relleno, kicker, título en tres líneas, interlíneas, beneficios y flujo inferior contra una comparación focal directa.
- [P2 resuelto] En tablet y mobile la composición superpuesta comprimía el contenido. Desde 900 px se usa una fotografía dedicada sin empalmes y el panel pasa a lectura vertical natural.
- [P2 resuelto] El cálculo de sección activa usaba offsets relativos y podía dejar otra opción seleccionada. Ahora la navegación marca `SOLUCIONES` al alcanzar este bloque.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, mayúsculas, pesos, tracking, color, interlínea y quiebres comparados en la región focal.
- Espaciado y composición: foto, transición azul marino, panel, beneficios y flujo de tres etapas alineados con la referencia.
- Color: panel `rgb(235, 236, 238)`, azul oscuro corporativo, acento cian y degradado lateral coherentes con la captura.
- Imágenes: fondo desktop WebP `1774 × 800` y recorte mobile WebP `918 × 800`, ambos sin tarjeta ni copy principal incrustado.
- Contenido: copy español literal de la referencia y equivalente inglés completo.
- Interacción y movimiento: entrada progresiva al hacer scroll; `prefers-reduced-motion` elimina transformaciones y transiciones.
- Responsive: sin overflow horizontal ni imágenes rotas en 1024, 768 y 390 px; el contenido no queda oculto detrás del panel.
- Consola y recursos: `node --check js/main.js` y `git diff --check` sin errores.

No quedan hallazgos P0, P1 o P2 en Obras e integración tecnológica. Como P3 aceptable, la continuación generada del extremo derecho puede presentar microvariaciones bajo el degradado respecto de la composición original.

final result: passed

## Revalidación específica — Narrativa iTTel + SICE / escenas 02 a 04

### Evidencia

- Verdades visuales: `codex-clipboard-d0006c9c-eb30-40f5-a9eb-cf06b94ff4a3.png`, `codex-clipboard-d0b69802-c853-4055-9666-1da70cfb0b63.png` y `codex-clipboard-868cc04b-8c77-4a86-97df-1b501ee01495.png`, todas de `1788 × 880`.
- Implementaciones finales: `sice-alliance-final.png`, `sice-sidera-final.png` y `sice-audit-final.png` en `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/`.
- Captura del navegador: viewport CSS `1788 × 880`; captura física `1773 × 821`, DPR 1 y área activa `1638 × 821`.
- Normalización: área activa recortada y normalizada a `1788 × 880` en `sice-alliance-final-normalized.png`, `sice-sidera-final-normalized.png` y `sice-audit-final-normalized.png`.
- Comparaciones completas: `sice-alliance-comparison-final.jpg`, `sice-sidera-comparison-final.jpg` y `sice-audit-comparison-final.jpg` en la misma carpeta.
- Estados: escenas `02/04`, `03/04` y `04/04` en sus posiciones exactas del recorrido sticky.
- Responsive: comprobación de `1024`, `768` y `390` px; versión inglesa comprobada a `1024` px.

### Historial de comparación y correcciones

- [P1 resuelto] Las escenas anteriores no reproducían los mapas e interfaces de las referencias. Se extrajeron solamente las superficies visuales limpias: Buenos Aires, SIDERA y Auditoría Urbana; títulos, navegación y progreso permanecen como HTML accesible.
- [P2 resuelto] Alianza local presentaba el título en tres líneas y desplazaba logotipos y roles. Se amplió la columna editorial, se ajustó la familia tipográfica y se recalibraron márgenes hasta recuperar las dos líneas de la referencia.
- [P2 resuelto] SIDERA dividía “Toda la infraestructura” en dos líneas adicionales. Se ajustaron ancho, tamaño, interlínea y tracking para conservar el bloque de dos líneas.
- [P2 resuelto] Auditoría Urbana partía la bajada en tres líneas y alejaba capacidades y atributos. Se amplió la columna y se redujo el margen intermedio; la jerarquía final coincide con la referencia.
- [P2 resuelto] El cambio entre escenas era un salto por cuartos. Ahora la posición continua del scroll interpola opacidad, desplazamiento, escala, contenido y progreso entre las cuatro escenas, sin interceptar la rueda.
- [P2 resuelto] En tablet y mobile las escenas quedan apiladas, `aria-hidden="false"`, con imágenes completas y lectura natural.

### Superficies de fidelidad

- Tipografía: Inter/Poppins, pesos, tamaños, tracking, interlíneas y quiebres comparados en las tres composiciones completas.
- Espaciado y composición: columnas editoriales, media, logos, encabezados y progreso alineados contra cada captura de `1788 × 880`.
- Color: blanco frío, azul iTTel, turquesa SICE, grises editoriales y superficies oscuras provienen de las referencias y los tokens existentes.
- Calidad de imagen: cuatro WebP nuevos entre `404` y `172448` bytes; no se utilizó una captura completa como fondo y no se recrearon interfaces con divs, SVGs o placeholders.
- Contenido: copy español literal de las referencias; versión inglesa equivalente conserva estructura y recursos.
- Interacción: narrativa sticky de scroll natural, progreso `01/04` a `04/04`, transición continua y escenas no interactivas marcadas `inert` en desktop.
- Accesibilidad: semántica de artículos y figuras, textos alternativos útiles, estado activo con `aria-current` y secuencia estática completa con movimiento reducido.
- Responsive: `scrollWidth === clientWidth` en `1024`, `768` y `390` px; las tres imágenes tienen ancho natural válido y ninguna queda rota.
- Validación técnica: `node --check js/main.js` y `git diff --check` sin errores.

No quedan hallazgos P0, P1 o P2. Como P3 aceptable, la navbar global conserva el ancho ya aprobado en el resto del sitio, levemente más compacto que el de las tres referencias.

final result: passed

## Revalidación final — Simplificación visual solicitada

Esta revisión reemplaza las decisiones anteriores sobre interacción por país y progreso de cuatro escenas. El recorrido SICE vigente tiene cinco escenas y el mapa global es deliberadamente informativo, sin puntos interactivos ni ficha flotante.

### Cambios verificados

- Hero: selector reducido a controles translúcidos de baja presencia visual y rotación automática ajustada a `6000 ms`.
- Presentación: se eliminaron el kicker `NOSOTROS` y la numeración `01–06`, manteniendo la matriz de capacidades y su lectura bilingüe.
- Redes neutrales: se incorporó aire inferior después de la última fila de logos.
- Operación inteligente: se retiraron `LIVE`, los rótulos de velocidad, residuos y panel variable para bajar la carga visual sin modificar el mosaico operativo.
- Obras e integración: se sustituyó el fondo con empalme visible por `works-integration-background-v2.webp`, una continuidad fotográfica limpia y optimizada.
- Narrativa SICE: el mapa global quedó estático; una nueva escena consecutiva presenta las once experiencias verificadas en tarjetas visibles; la alianza local ya no muestra el recuadro del mundo ni la leyenda redundante bajo iTTel.
- Auditoría Urbana: se agregó la marca iTTel junto al nombre del producto para explicitar su propiedad.
- Casos de éxito: se retiró la numeración editorial y se amplió la separación entre la introducción y los despliegues de Redes en Autopistas.
- Footer: títulos ajustados a un celeste más calmo (`#78c8e8`).

### Evidencia y validación

- Capturas finales: `revision-final/works-desktop.png`, `revision-final/works-mobile.png`, `revision-final/sice-experiences-desktop.png` y `revision-final/sice-experiences-mobile.png` dentro de la carpeta de evidencias de esta tarea.
- Español e inglés: cinco escenas SICE, once experiencias, sin puntos por país, etiquetas operativas ni numeración de presentación.
- Responsive: lectura natural y sin overflow horizontal a `390 px`; recorrido desktop comprobado a `1905 × 900`.
- Consola: 0 errores o advertencias en la versión inglesa; comprobación equivalente completada en español.
- Validación estática: `node --check js/main.js` y `git diff --check` sin errores.

No quedan hallazgos P0, P1 o P2 para esta revisión.

final result: passed

## Revalidación específica — Experiencias internacionales SICE

### Evidencia

- Verdad visual: `C:/Users/Agustin/AppData/Local/Temp/codex-clipboard-a3b2be5b-2a2d-4a29-83bb-13c5497fecc5.png` (`1737 × 877`).
- Implementación final: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/sice-experiences-final.png` (`1724 × 869`).
- Comparación normalizada: `sice-experiences-comparison.png`, ambas vistas ajustadas a `1739 × 877`, DPR 1.
- Región focal: `sice-experiences-focused-comparison.png`, recorte común de encabezados, banderas, contenido y metadatos de las once fichas.
- Estado: escena `02/05 · PROYECTOS`, recorrido sticky desktop.

### Historial de comparación y correcciones

- [P1 resuelto] La escena activa se mezclaba permanentemente con la anterior durante el progreso del scroll, dejando textos y métricas fantasma bajo las tarjetas. El cambio de escena conserva desplazamiento y escala fluidos, pero la escena activa pasa a ser completamente opaca después de la transición.
- [P2 resuelto] El panel interior tenía ancho máximo y un fondo gris distinto a la escena, lo que producía el corte lateral reportado. Escena, stage y panel usan ahora blanco sólido de borde a borde.
- [P2 resuelto] Las experiencias carecían de reconocimiento visual por país y los datos aparecían en una sola línea débil. Cada una de las once fichas usa una bandera real, país, proyecto, alcance y período claramente jerarquizados, sin incorporar datos nuevos.
- [P2 resuelto] Las tarjetas tenían escasa presencia y lectura plana. Se ajustaron borde, acento superior, separación interna, sombra y estado hover/focus con movimiento corporativo sutil.
- [P2 resuelto] En mobile las nuevas cabeceras y metadatos necesitaban una composición propia. La ficha se adapta a una columna en `390 px`, dos en `768 px` y tres en `1024 px`, sin overflow horizontal.

### Superficies de fidelidad

- Tipografía: Poppins/Inter, pesos, mayúsculas, tracking, jerarquía y quiebres comparados en vista completa y región focal.
- Espaciado y composición: fondo blanco continuo, grilla `4/3/2/1`, tarjetas de altura consistente y progreso inferior sin superposición.
- Color: blanco puro, azul iTTel, turquesa SICE y grises existentes; contraste conservado sobre cada ficha.
- Calidad de imagen: once banderas raster reales servidas por FlagCDN, con dimensiones declaradas, carga diferida y recorte uniforme; no se usaron emojis ni aproximaciones dibujadas.
- Contenido: se preservaron exactamente las once experiencias, alcances, períodos y cifras existentes en español e inglés.
- Interacción: hover/focus sutil en desktop, secuencia estática legible en tablet/mobile y transición entre escenas sin mezcla residual.
- Responsive: sin overflow a `1440`, `1024`, `768` y `390 px`; grillas verificadas en navegador.
- Consola y validación: 0 errores o advertencias en español e inglés; `node --check js/main.js`, balance de llaves CSS y `git diff --check` correctos.

No quedan hallazgos P0, P1 o P2. Como P3 aceptable, las banderas dependen del mismo proveedor externo que ya utiliza el selector de idioma del sitio.

final result: passed

## Revalidación específica — Ancho del carrusel de clientes

### Evidencia

- Estado anterior: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/clients-carousel-before.png`.
- Implementación final desktop: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/clients-carousel-after.png` (`1280 × 720`, DPR 1).
- Implementación final mobile: `C:/Users/Agustin/.codex/visualizations/2026/08/26/01a03f9b-bc54-7512-822a-4490b4b66aac/clients-carousel-mobile.png` (`390 × 844`, DPR 1).
- Estado: sección `#clientes`, carrusel en reproducción automática.

### Historial de comparación y correcciones

- [P2 resuelto] La banda de logos heredaba el ancho editorial de `1150 px`, por lo que terminaba visualmente demasiado pronto en ambos laterales. El encabezado conserva ese ancho de lectura, mientras el carrusel se extiende ahora hasta `min(1720px, 100vw - 48px)`.
- [P2 resuelto] En mobile el carrusel también quedaba limitado por el contenedor interno. La banda usa ahora `100vw - 24px`, con márgenes laterales mínimos y sin overflow horizontal.

### Superficies de fidelidad

- Tipografía y contenido: sin cambios; títulos, descripción y los 27 logos originales se preservan.
- Espaciado: carrusel centrado respecto del viewport, con márgenes simétricos y encabezado alineado al sistema editorial existente.
- Color e imagen: no se modificaron filtros, tamaños, proporciones ni archivos de logos.
- Interacción: autoplay confirmado en movimiento; arrastre y lógica JavaScript permanecen intactos.
- Responsive: ancho comprobado en desktop y `390 px`, sin overflow horizontal.
- Bilingüe y consola: misma geometría en español e inglés; 0 errores o advertencias.

No quedan hallazgos P0, P1 o P2 para este ajuste.

final result: passed

---

# Design QA — Unidades de negocio

- Source: `C:\\Users\\Agustin\\.codex\\generated_images\\01a03f9b-bc54-7512-822a-4490b4b66aac\\exec-7559a30f-f6a8-418f-bd3c-ba3896873885.png`
- Implementation: `C:\\Users\\Agustin\\.codex\\visualizations\\2026\\08\\26\\01a03f9b-bc54-7512-822a-4490b4b66aac\\business-units-desktop.png`
- Combined comparison: `C:\\Users\\Agustin\\.codex\\visualizations\\2026\\08\\26\\01a03f9b-bc54-7512-822a-4490b4b66aac\\business-units-comparison.png`
- Reference viewport: 1672 × 941 px
- Verified viewports: 1672 × 941, 1440 × 900, 1024 × 768, 768 × 1024, 390 × 844 px

## Comparison history

1. Initial implementation preserved a legacy solid grid background. It was classified as P1 because it materially changed the approved open editorial composition.
2. The grid background, border and gap were removed; the heading and column spacing were aligned with the reference.
3. The first mobile pass inherited the three-column desktop rule. It was classified as P0 because text columns overlapped.
4. The responsive rule was scoped to the renewed section. The 390 px layout now stacks all three units and all nine capabilities without horizontal overflow.
5. Tablet layouts were checked at 768 and 1024 px. The Spanish and English versions preserve all content, hierarchy and readable line lengths.
6. Final browser check returned no console warnings or errors.

## Final result

passed

---

# Design QA — Hero único Argentina tecnológica

- Source: `C:\\Users\\Agustin\\.codex\\generated_images\\01a03f9b-bc54-7512-822a-4490b4b66aac\\exec-36f1d84d-ad3c-46ee-89ef-26fc00f30895.png`
- Implementation desktop: `C:\\Users\\Agustin\\.codex\\visualizations\\2026\\08\\26\\01a03f9b-bc54-7512-822a-4490b4b66aac\\hero-single-desktop.png`
- Implementation mobile: `C:\\Users\\Agustin\\.codex\\visualizations\\2026\\08\\26\\01a03f9b-bc54-7512-822a-4490b4b66aac\\hero-single-mobile.png`
- Combined comparison: `C:\\Users\\Agustin\\.codex\\visualizations\\2026\\08\\26\\01a03f9b-bc54-7512-822a-4490b4b66aac\\hero-single-comparison.png`
- Source dimensions: 1672 × 941 px.
- Browser verification: desktop viewport override 1672 × 941 px (rendered browser surface 1265 × 720 px) and mobile 390 × 844 px (rendered width 375 px).

## Full-view comparison

- The approved image remains the sole photographic layer: blue-hour metropolitan motorway, visible traffic and restrained cyan technology trails.
- The existing white editorial veil is retained only to protect the navy iTTel copy and logo; the road and skyline remain visible across the right half of the composition.
- The floating navigation preserves its solid white treatment and readable contrast at page start.

## Focused region

- Region reviewed: left-to-centre transition between the white text field and the motorway.
- Reason: this is the highest-risk area for either losing the approved image under an excessive white veil or reducing the legibility of the dark corporate copy.
- Result: the transition is gradual, the bridge and traffic continue behind the text field, and the principal road remains visually dominant without competing with the message.

## Comparison history and fixes

1. The two-scene TELCO/IT carousel and its previous/pause/next controls were removed because the approved direction is now a single hero image.
2. The generated PNG was converted to a 208 KB WebP asset with declared 1672 × 941 dimensions and high fetch priority.
3. Desktop uses a centred cover crop. Mobile uses a 70% horizontal focal point so the motorway and technology trails remain visible behind the stacked composition.
4. Spanish and English variants use the same asset and preserve their approved copy.
5. Browser checks confirmed one hero slide, zero obsolete carousel controls, no horizontal overflow and no console warnings or errors.

## Final result

passed

---

# Design QA — corrección responsive mobile

## Flujo objetivo

`Inicio → Soluciones → Casos de éxito → Clientes` a 390 px, con texto legible, imágenes integradas, mapas y marcas ISP sin superposición y navegación estable.

## Referencias del reporte

- Hero: `codex-clipboard-ec7fd506-f3d0-44e9-ac36-f1817c576f06.png`
- Tecnología y operaciones: `codex-clipboard-fb4ab56d-81a6-4cb1-9e44-ac05c01f80a2.png`
- Obras: `codex-clipboard-677ca11c-009b-41b9-879c-c121736fab7c.png`
- Redes en Argentina: `codex-clipboard-3a74e8f6-b267-49e6-aeeb-848e8b45209b.png`
- ISP: `codex-clipboard-fff61dbe-0aef-446e-b058-386279ee0a53.png`
- Clientes: `codex-clipboard-50007f63-8e31-4a23-87e0-7b5f48270d0d.png`

## Evidencia y verificación

- Capturas finales en `ittel-mobile-qa/`: hero, tecnología, obras, mantenimiento, redes, ISP y clientes a 390 px; regresión del hero a 1440 px.
- Viewports comprobados: 320, 390, 768 y 1440 px.
- Hero comprobado en español e inglés.
- Se verificaron las dos escenas de Tecnología y Operaciones.
- Consola del navegador sin errores ni advertencias.
- Hallazgos P0: 0.
- Hallazgos P1: 0.
- Hallazgos P2: 0.

## Resultado final

passed

---

# Design QA — composición SIDERA en Tecnología y Operaciones

## Referencia y evidencia

- Referencia del problema: `codex-clipboard-454054a6-88ba-4ef7-8c84-9d48e49ac550.png`.
- Fuente visual de la plataforma: `assets/images/sice/sidera-platform-reference.webp`.
- Nueva composición: `assets/images/sice/sidera-platform-background-v2.webp` (1862 × 845 px).
- Captura desktop: `operation-platform-v2-desktop.jpg` a 1440 × 900 px.
- Captura mobile ES: `operation-platform-v2-mobile.jpg` a 390 × 844 px.
- Captura mobile EN: `operation-platform-v2-mobile-en.jpg` a 390 × 844 px.

## Comparación visual

- La interfaz dejó de ocupar y estirarse sobre todo el fondo.
- La plataforma completa queda proporcionada y enmarcada en el sector derecho.
- El sector izquierdo conserva un campo azul tecnológico calmo para sostener el bloque de texto sin competencia visual.
- En mobile, la plataforma se mantiene como una pieza panorámica separada sobre el contenido y no se deforma.

## Historial de corrección

1. Se clasificó como P1 la captura expandida porque alteraba la escala de la interfaz y competía con el texto.
2. Se generó una composición específica para el espacio real del bloque, usando la plataforma existente como fuente visual.
3. Se ajustó el encuadre mobile para conservar la proporción 1862:845 y mostrar la interfaz completa.
4. Se verificaron las versiones española e inglesa y la consola no presentó errores ni advertencias.

## Resultado final

passed
