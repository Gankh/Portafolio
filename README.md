# Portafolio personal · HTML, CSS y Bootstrap

Página de portafolio de una sola página, inspirada en el diseño de referencia (tema oscuro, acento morado, hero con foto y rayos, tabla de datos, tarjetas de habilidades y proyectos). Está hecha con HTML5, CSS3, Bootstrap 5.3 y JavaScript sin dependencias propias.

## Estructura de carpetas

```
portafolio/
├── index.html          Página principal (todas las secciones)
├── css/
│   └── styles.css      Estilos propios (tokens de color, hero, tarjetas)
├── js/
│   └── main.js         Menú, validación del formulario y año automático
├── assets/
│   ├── cv.pdf          Tu currículum (lo añades tú)
│   └── img/            Fotos: perfil.jpg, equipo.jpg, proyecto-1/2/3.jpg
└── README.md           Esta documentación
```

## Cómo verlo

1. Descarga o copia la carpeta `portafolio`.
2. Abre `index.html` con doble clic. También funciona con una extensión como *Live Server* de VS Code.
3. Necesitas conexión a internet, porque Bootstrap, los íconos y la tipografía se cargan desde CDN.

> Consejo: si el CSS no se aplica, revisa que `css/styles.css` esté en esa ruta exacta (distingue mayúsculas y minúsculas).

## Qué usa cada tecnología

| Tecnología | Para qué | Dónde |
|---|---|---|
| HTML5 semántico | `nav`, `header`, `main`, `section`, `article`, `footer`, `address` | `index.html` |
| Bootstrap 5.3 | Rejilla (`container`, `row`, `col-*`), navbar responsive, formularios, botones, badges | `index.html` (CDN) |
| Bootstrap Icons | Íconos (`bi bi-*`) | `index.html` (CDN) |
| Google Fonts (JetBrains Mono) | Tipografía principal | `index.html` |
| CSS propio | Colores, fondo, hero, rayos, barras de progreso, tarjetas | `css/styles.css` |
| JavaScript | Navbar que cambia al hacer scroll, cierre del menú móvil, validación | `js/main.js` |

El orden de carga importa: primero Bootstrap y después `styles.css`, para que tus reglas puedan sobrescribir las de Bootstrap. `main.js` va al final del `body`, después de Bootstrap, porque usa `bootstrap.Collapse`.

## Secciones de la página

| Sección | `id` | Descripción |
|---|---|---|
| Navbar | `#mainNav` | Logo, enlaces, botón de descarga de CV. En móvil se convierte en menú hamburguesa. |
| Hero | `#home` | Nombre, rol, correo, dirección, redes y foto con rayos morados. |
| Sobre mí | `#about` | Tabla de datos personales y una imagen de equipo. |
| Habilidades | `#services` | Cuatro tarjetas con porcentaje. Cambia el valor en `style="--value: N"`. |
| Proyectos | `#portfolio` | Tarjetas con imagen, etiqueta y descripción. |
| Blog | `#blog` | Tres entradas de ejemplo. Puedes quitarla si no escribes. |
| Contacto | `#contact` | Formulario con validación de Bootstrap. |
| Pie | (`footer`) | Año automático y enlace para volver arriba. |

## Cómo personalizarlo

### 1. Datos personales
Busca y reemplaza en `index.html`:
- `Gabriel Benavides` → tu nombre.
- `tu-correo@ejemplo.com` → tu correo (aparece en el hero, la tabla y el pie).
- `Calle Ejemplo 123, Ciudad de México` y `+52 55 1234 5678` → tu dirección y teléfono.
- Los enlaces de redes en `.social-btn` (`href="#"`) → tus perfiles reales.

### 2. Imágenes
Guarda tus archivos en `assets/img/` con estos nombres, o cambia la ruta en el `src`:

| Archivo | Dónde aparece | Tamaño sugerido |
|---|---|---|
| `perfil.jpg` | Foto grande del hero | Vertical, unos 800 × 1000 px |
| `equipo.jpg` | Imagen de la sección Sobre mí | Horizontal, unos 1000 × 700 px |
| `proyecto-1.jpg`, `proyecto-2.jpg`, `proyecto-3.jpg` | Tarjetas de proyectos | 4:3, unos 800 × 600 px |

Usa fotos tuyas o libres de derechos. Las capturas de proyectos funcionan muy bien para esta sección.

### 3. Currículum
Pon tu PDF en `assets/cv.pdf`. El botón "Descargar CV" ya apunta a ese archivo.

### 4. Colores
Todos los colores están en `:root` dentro de `css/styles.css`:

```css
:root {
  --bg-dark: #121528;     /* fondo del hero */
  --bg-darker: #0b0d1c;   /* fondo alterno */
  --surface: #1a1d33;     /* tarjetas */
  --accent: #7c4dff;      /* morado principal */
  --accent-soft: #b9a6ff; /* morado claro */
}
```

Cambia estos valores y todo el sitio cambia con ellos.

### 5. Habilidades
En `index.html`, cada tarjeta tiene su porcentaje en dos lugares: el número visible y `--value`. Cámbialos juntos:

```html
<div class="skill-card" style="--value: 80;">
  <div class="skill-value">80<span>%</span></div>
  <div class="skill-label">Python</div>
</div>
```

### 6. Formulario de contacto
`js/main.js` solo valida y muestra un mensaje. Para que los mensajes lleguen a tu correo:
- **Formspree**: crea un formulario gratuito y pon su URL en `action` del `<form>`, o envía los datos con `fetch` dentro del evento `submit`.
- **Backend propio**: envía los datos a tu servidor en el mismo lugar.

## Responsive

Usa los breakpoints de Bootstrap:

| Ancho | Comportamiento |
|---|---|
| Menor de 992 px | El menú se vuelve hamburguesa. La foto del hero queda debajo del texto. |
| Menor de 576 px | Las filas de datos se apilan y se reduce el espaciado vertical. |
| Tarjetas de habilidades | 2 por fila en móvil, 4 en escritorio. |

Comprueba el resultado con las herramientas de desarrollador del navegador (F12, modo de dispositivo).

## Accesibilidad

- Usa etiquetas `label` en el formulario y `aria-label` en los botones solo con ícono.
- Respeta `prefers-reduced-motion`: desactiva transiciones y el scroll suave para quien lo pida.
- Los estados de foco son visibles (`:focus-visible`).
- Cada imagen tiene un texto `alt`. Actualízalo cuando cambies la foto.

## Publicarlo gratis

- **GitHub Pages**: sube la carpeta a un repositorio, ve a *Settings → Pages* y elige la rama `main`. Tu sitio quedará en `https://tu-usuario.github.io/portafolio`.
- **Netlify** o **Vercel**: arrastra la carpeta al panel y obtienes un enlace al instante.

## Créditos y notas

- Bootstrap 5.3.3 (licencia MIT): https://getbootstrap.com
- Bootstrap Icons 1.11.3 (licencia MIT): https://icons.getbootstrap.com
- Tipografía JetBrains Mono (Google Fonts, licencia OFL).
- El diseño toma como referencia una plantilla de portafolio. El nombre, los textos, los datos y las imágenes son de ejemplo. Si usas una plantilla de terceros para un proyecto público, revisa su licencia.
