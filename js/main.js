/* main.js · Interacciones del portafolio (usa Bootstrap 5 desde el CDN) */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Año actual en el pie de página
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 2. La barra de navegación cambia de estilo al hacer scroll
  const nav = document.getElementById('mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 3. Cierra el menú móvil al pulsar un enlace
  const collapse = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (collapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  // 4. Validación del formulario de contacto (Bootstrap)
  const form = document.getElementById('contactForm');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Aquí conectarías tu backend o un servicio como Formspree.
    // Por ahora solo se muestra un mensaje de confirmación.
    status.textContent = '¡Gracias! Tu mensaje está listo para enviarse.';
    status.classList.add('text-success');
    form.reset();
    form.classList.remove('was-validated');
  });

  // 5. Temas de color: cambian las variables CSS y se recuerdan en el navegador
  const THEMES = [
    { id: 'crema', name: 'Crema', vars: { '--bg-dark': '#2b2c2f', '--bg-darker': '#161617', '--surface': '#202123', '--line': '#3a3b3f', '--text': '#f5efe1', '--muted': '#b5ae9d', '--accent': '#e6d9b8', '--accent-soft': '#f5efe1', '--on-accent': '#161617' } },
    { id: 'azul', name: 'Azul noche', vars: { '--bg-dark': '#1d2b44', '--bg-darker': '#0f1a2c', '--surface': '#16233a', '--line': '#2a3d5e', '--text': '#e8f0fe', '--muted': '#9fb3cf', '--accent': '#7fb2ff', '--accent-soft': '#cfe2ff', '--on-accent': '#0f1a2c' } },
    { id: 'bosque', name: 'Verde bosque', vars: { '--bg-dark': '#213426', '--bg-darker': '#111b14', '--surface': '#172619', '--line': '#2d4431', '--text': '#eef5ea', '--muted': '#a6bba8', '--accent': '#9ed18a', '--accent-soft': '#d4f0c6', '--on-accent': '#111b14' } },
    { id: 'vino', name: 'Vino', vars: { '--bg-dark': '#3b1f2c', '--bg-darker': '#1d0f16', '--surface': '#2a1620', '--line': '#4f2b3b', '--text': '#fbeef2', '--muted': '#d2a7b6', '--accent': '#f08aa6', '--accent-soft': '#ffd1dc', '--on-accent': '#1d0f16' } },
    { id: 'neon', name: 'Neón', vars: { '--bg-dark': '#14141f', '--bg-darker': '#0a0a12', '--surface': '#12121c', '--line': '#2a2a40', '--text': '#e6f7ff', '--muted': '#8ba1b8', '--accent': '#39ff88', '--accent-soft': '#b8ffd6', '--on-accent': '#0a0a12' } },
    { id: 'claro', name: 'Claro', vars: { '--bg-dark': '#e9e4d8', '--bg-darker': '#faf8f3', '--surface': '#ffffff', '--line': '#d8d1c1', '--text': '#22201b', '--muted': '#6b6457', '--accent': '#3d3a33', '--accent-soft': '#1f1d19', '--on-accent': '#faf8f3', '--hero-letter-stroke': '#6b6457' } }
  ];
  const themeOptions = document.getElementById('themeOptions');
  const applyTheme = (theme) => {
    // Quita el valor del tema anterior: no todos los temas definen la letra del hero
    document.documentElement.style.removeProperty('--hero-letter-stroke');
    Object.entries(theme.vars).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
    themeOptions.querySelectorAll('.theme-option').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === theme.id);
    });
  };

  THEMES.forEach((theme) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-option';
    btn.dataset.theme = theme.id;
    btn.style.background = theme.vars['--bg-darker'];
    btn.style.color = theme.vars['--text'];
    const swatches = ['--bg-dark', '--surface', '--text', '--muted', '--accent']
      .map((key) => `<span style="background:${theme.vars[key]}"></span>`)
      .join('');
    btn.innerHTML = `<span class="theme-name">${theme.name}</span><span class="theme-swatches">${swatches}</span>`;
    btn.addEventListener('click', () => {
      applyTheme(theme);
      try { localStorage.setItem('tema', theme.id); } catch (e) { /* modo privado: el tema solo dura esta visita */ }
    });
    themeOptions.appendChild(btn);
  });

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('tema'); } catch (e) { /* sin acceso a localStorage */ }
  applyTheme(THEMES.find((t) => t.id === savedTheme) || THEMES[0]);

  // 6. Las cifras de habilidades suben desde 0 hasta su valor al entrar en pantalla
  const skillCards = document.querySelectorAll('.skill-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countUp = (card) => {
    const number = card.querySelector('.skill-value').firstChild;
    const target = Number(card.style.getPropertyValue('--value'));
    if (reduceMotion) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.nodeValue = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    number.nodeValue = 0;
    requestAnimationFrame(step);
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  skillCards.forEach((card) => skillObserver.observe(card));

  // 7. El panel de temas se desliza al abrirlo y se cierra solo a los 2 segundos si el cursor no está sobre él
  const themePanel = document.getElementById('themePanel');
  const themeToggle = document.getElementById('themeToggle');
  let closeTimer = null;

  const closePanel = () => {
    clearTimeout(closeTimer);
    themePanel.classList.remove('open');
    themeToggle.setAttribute('aria-expanded', 'false');
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closePanel, 2000);
  };
  const openPanel = () => {
    clearTimeout(closeTimer);
    themePanel.classList.add('open');
    themeToggle.setAttribute('aria-expanded', 'true');
  };

  // En equipos con mouse se abre al pasar el cursor; en táctiles, con un toque
  const hasHover = window.matchMedia('(hover: hover)').matches;
  if (hasHover) {
    themeToggle.addEventListener('mouseenter', openPanel);
    themeToggle.addEventListener('mouseleave', scheduleClose);
  } else {
    themeToggle.addEventListener('click', () => {
      if (themePanel.classList.contains('open')) closePanel();
      else openPanel();
    });
  }
  themePanel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  themePanel.addEventListener('mouseleave', scheduleClose);
});
