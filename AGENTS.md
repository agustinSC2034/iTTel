# iTTel — Agent Instructions
# Instrucciones para agentes IA
- Responder siempre en español.
- Explicar planes y decisiones en español.
- Mantener código, nombres de variables, componentes, carpetas y commits en inglés cuando corresponda.
- No modificar archivos fuera del alcance pedido.
- Para tareas de diseño frontend, respetar el sistema visual existente del proyecto.
- Antes de cambios grandes, primero proponer plan.
- Para documentación actualizada de librerías, usar Context7 si está disponible.

## Project Type
Static corporate website (HTML5 + CSS3 + vanilla JS) for Grupo iTTel, an Argentine IT & Telecom infrastructure company. No build system, no bundler, no framework.

## Quick Start
- **Dev**: Open `index.html` in a browser or use VS Code Live Server.
- **Contact form requires PHP**: needs a PHP server (Apache + PHP 8.0) to test `contacto.php` locally.
- **Deploy**: Upload to cPanel hosting. `.htaccess` handles GZIP, caching, HTTPS redirect, and PHP 8.0 handler.

## Architecture
```
iTTel/
├── index.html          # Spanish (primary) landing page
├── en/index.html       # English version (separate static file)
├── contacto.php        # Contact form handler (PHP 8.0, reCAPTCHA v2)
├── .htaccess           # Apache config: caching, GZIP, security, PHP handler
├── js/
│   ├── main.js         # All UI logic: nav, hero, stats, projects, clients, contact form, modals
│   └── translations.js # ES/EN translation dictionary (exposed as window.translations)
├── assets/
│   ├── css/main.css    # All styles
│   └── images/         # Logos, project photos, client logos, hero backgrounds
└── docs/               # Project constitution and spec docs
```

## Key Conventions & Gotchas

### i18n / Bilingual
- **Two separate HTML files**, not a SPA with dynamic language switching. `index.html` = Spanish, `en/index.html` = English.
- `translations.js` provides `window.translations` for runtime text swaps (used by `applyTranslations()`), but language switching is done via `<a>` links to `/en/`, not localStorage.
- When editing bilingual content, update **both** `index.html` and `en/index.html` plus `translations.js`.

### External CDN Dependencies (no local copies)
- Google Fonts (Inter + Poppins)
- Font Awesome 6.4.0
- AOS (Animate On Scroll) 2.3.1 from unpkg
- flagcdn.com for flag icons
- Google reCAPTCHA v2 (contact form)

### Contact Form
- `contacto.php` sends email to `administracion@it-tel.com.ar`.
- Uses Google reCAPTCHA v2; secret key is in `contacto.php` (do not commit if rotating).
- Form POSTs to `/contacto.php` — works from both `/` and `/en/` paths.
- Returns JSON responses; JS in `main.js` handles success/error notifications.

### No Build Step
- `package-lock.json` exists but is empty (no npm dependencies). Do not add build tooling unless explicitly requested.
- Edit files directly; changes are live on refresh.

### Design System (from `docs/01-constitucion.md`)
- Style: "Soft corporate brutalism" — clean, minimal, data-driven B2B.
- Primary accent: `#227db3` (iTTel blue).
- No decorative FontAwesome icons in service descriptions.
- Subtle borders (1px solid #E2E8F0), minimal shadows.

### PHP Version
- Hosted on cPanel with **PHP 8.0** (`ea-php80`). Do not use PHP 8.1+ features.
