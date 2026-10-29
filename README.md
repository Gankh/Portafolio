# Portafolio personal · Gabriel Benavides

Página de una sola pantalla con varias secciones, hecha con HTML5, CSS3, Bootstrap 5.3 y JavaScript sin dependencias propias. Incluye un selector de temas de color y una tipografía monoespaciada (JetBrains Mono).

## Estructura

```
├── index.html          Página principal (todas las secciones)
├── css/
│   └── styles.css      Estilos propios: variables de color, hero, tarjetas, temas
├── js/
│   └── main.js         Navbar, formulario, selector de temas, contador de habilidades
├── assets/
│   ├── cv.pdf          Currículum (pendiente: aún no está en el repositorio)
│   └── img/            Logos, banner, fotos y certificado
└── README.md
```

## Cómo verlo

1. Clona el repositorio o descarga la carpeta.
2. Abre `index.html` con doble clic, o usa una extensión como *Live Server* en VS Code.
3. Necesitas conexión a internet: Bootstrap, los íconos y la tipografía se cargan desde CDN.

## Secciones

| Sección | `id` | Contenido |
|---|---|---|
| Navbar | `#mainNav` | Logo, enlaces (Inicio, Sobre mí, Proyectos, Contacto) y botón de brocha para cambiar de tema. |
| Panel de temas | `#themePanel` | Seis temas de color. Se abre al pasar el cursor por la brocha y se cierra solo a los 2 segundos si el cursor sale. |
| Hero | `#home` | Nombre, rol, correo, dirección, redes y foto. Al pasar el cursor sobre la foto gira y muestra el enlace de descarga del CV. |
| Sobre mí | `#about` | Datos personales (residencia, correo, teléfono, disponibilidad), logo con enlace al certificado y banner. |
| Habilidades | `#services` | Cuatro tarjetas. Las cifras suben desde 0 al entrar en pantalla. |
| Proyectos | `#portfolio` | Tres tarjetas con imagen, etiqueta y descripción. |
| Contacto | `#contact` | Formulario con validación de Bootstrap. |
| Botón de WhatsApp | (flotante) | Enlace fijo en la esquina inferior derecha que abre un chat de WhatsApp. |

Cada sección del menú ocupa la pantalla completa, excepto Sobre mí, que se ajusta a su contenido para que las habilidades aparezcan al entrar.

## Personalización

### Datos personales
En `index.html` están el nombre, el correo, la dirección, el teléfono y el número de WhatsApp (`wa.me/56…`). Cámbialos ahí.

### Redes sociales
Los tres íconos del hero (Instagram, GitHub y LinkedIn) están en `.social-btn`. Mientras tengan `href="#"`, no llevan a ningún perfil: reemplaza `#` por la URL de cada uno.

### Imágenes
| Archivo | Dónde aparece |
|---|---|
| `assets/img/foto-portafolio.jpg` | Foto de perfil del hero (cara frontal) |
| `assets/img/img-cv.jfif` | Imagen que aparece al girar la foto |
| `assets/img/logo solo letras.png` | Logo del navbar |
| `assets/img/desafiolatam-sin-fondo.png` | Logo con enlace al certificado |
| `assets/img/aprobacion-…-g25-12971.png` | Certificado |
| `assets/img/cropped-cropped-banner_ipg_300x113.webp` | Banner de Sobre mí |
| `assets/img/proyecto-1.jpg`, `proyecto-2.jpg`, `proyecto-3.jpg` | Tarjetas de Proyectos (pendientes: no están en el repositorio) |

### Currículum
Coloca tu PDF en `assets/cv.pdf`. El botón de descarga de la foto y el enlace del CV ya apuntan a ese archivo (pendiente).

### Habilidades
Cada tarjeta tiene el porcentaje en dos lugares. Cámbialos juntos:

```html
<div class="skill-card" style="--value: 80;">
  <div class="skill-value">80<span>%</span></div>
  <div class="skill-label">Python</div>
</div>
```

### Colores y temas
Los colores base están en `:root` en `css/styles.css`. Los seis temas del selector están en la sección 5 de `js/main.js`, en el arreglo `THEMES`. Cada tema define las mismas variables (`--bg-dark`, `--surface`, `--text`, `--accent`, etc.), así que para añadir uno basta con copiar una entrada y cambiar sus valores.

El tema elegido se guarda en el navegador con `localStorage`.

### Formulario de contacto
`js/main.js` valida el formulario y muestra un mensaje de confirmación, pero no envía los datos a ningún lado. Para recibir los mensajes, conecta el formulario con un servicio como Formspree o con tu propio backend en el evento `submit`.

## Responsive

| Ancho | Comportamiento |
|---|---|
| Menor de 992 px | El menú se vuelve hamburguesa y el botón de temas queda a la derecha. |
| Menor de 576 px | Las filas de datos se apilan y se reduce el espaciado vertical. |
| Tarjetas de habilidades | 2 por fila en móvil, 4 en escritorio. |

## Accesibilidad

- `aria-label` en los botones de solo ícono (redes, brocha, temas).
- Respeta `prefers-reduced-motion`: sin animaciones ni scroll suave para quien lo pida.
- Los estados de foco son visibles (`:focus-visible`).
- Cada imagen tiene texto `alt`.

## Publicarlo

- **GitHub Pages**: en *Settings → Pages*, elige la rama `main` y la carpeta `/ (root)`. El sitio queda en `https://gankh.github.io/Portafolio/`.
- **Netlify** o **Vercel**: arrastra la carpeta al panel y obtienes un enlace al instante.

## Créditos

- Bootstrap 5.3.3 (licencia MIT): https://getbootstrap.com
- Bootstrap Icons 1.11.3 (licencia MIT): https://icons.getbootstrap.com
- Tipografía JetBrains Mono (Google Fonts, licencia OFL).
- Los textos, datos e imágenes son personales. Si reutilizas este diseño, revisa primero que no quede información de otra persona.
