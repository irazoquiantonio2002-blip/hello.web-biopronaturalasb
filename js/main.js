const WA_NUMBER = "525664298155";

document.body.classList.add("loader-active");

const hideLoader = () => {
  const loader = document.getElementById("loader");
  loader?.classList.add("is-hidden");
  document.body.classList.remove("loader-active");
};

window.setTimeout(hideLoader, 2600);
window.addEventListener("load", () => window.setTimeout(hideLoader, 500), { once: true });

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 22);
});

const hamburger = document.getElementById("hamburger");
const mobMenu = document.getElementById("mob-menu");
hamburger?.addEventListener("click", () => {
  const isOpen = mobMenu?.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobMenu.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  });
});

const marquee = document.getElementById("marquee");
if (marquee) {
  const items = [
    "Mas de 15 anos de experiencia",
    "Mas de 400 formulas personalizables",
    "Ingredientes naturales y organicos",
    "Avisos de funcionamiento Cofepris",
    "Diseno de logo y etiqueta",
    "Produccion desde 50 piezas",
    "Fichas tecnicas disponibles",
    "Fabricacion en Mexico"
  ];
  marquee.innerHTML = [...items, ...items].map((item) => `<span>${item}</span>`).join("");
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const finalValue = Number(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(finalValue * eased);
      el.textContent = `${prefix}${current.toLocaleString("es-MX")}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-num").forEach((el) => countObserver.observe(el));

const typeTarget = document.querySelector(".type-target");
if (typeTarget) {
  const words = typeTarget.dataset.words.split(",");
  let wordIndex = 0;
  const swapWord = () => {
    wordIndex = (wordIndex + 1) % words.length;
    typeTarget.classList.add("word-switching");
    window.setTimeout(() => {
      typeTarget.textContent = words[wordIndex];
      typeTarget.classList.remove("word-switching");
    }, 180);
  };

  window.setInterval(swapWord, 2600);
}

function createParticles(canvas, density = 70) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let rafId = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles.length = 0;
    const amount = Math.max(22, Math.floor((width * height) / 18000 * (density / 70)));
    for (let i = 0; i < amount; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + .5,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        hue: Math.random() > .45 ? "212,175,55" : "192,192,192"
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue}, .72)`;
      ctx.shadowBlur = 18;
      ctx.shadowColor = `rgba(${p.hue}, .45)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = i + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 118) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212,175,55, ${0.12 * (1 - dist / 118)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });
    rafId = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize, { passive: true });

  return () => cancelAnimationFrame(rafId);
}

createParticles(document.getElementById("hero-canvas"), 90);
document.querySelectorAll(".section-particles").forEach((canvas) => createParticles(canvas, 42));

const marcasTrack = document.getElementById("marcasTrack");
if (marcasTrack) {
  const slides = Array.from(marcasTrack.children);
  const prevBtn = document.getElementById("marcasPrev");
  const nextBtn = document.getElementById("marcasNext");
  const dotsWrap = document.getElementById("marcasDots");

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Ir a la marca ${i + 1} de ${slides.length}`);
    dot.addEventListener("click", () => {
      slides[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    dotsWrap?.appendChild(dot);
  });
  const dots = Array.from(dotsWrap?.children || []);

  const updateActiveDot = () => {
    const trackLeft = marcasTrack.getBoundingClientRect().left;
    let closest = 0;
    let closestDist = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === closest));
  };

  let scrollTimer = 0;
  marcasTrack.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(updateActiveDot, 90);
  }, { passive: true });

  const scrollByCard = (dir) => {
    const gap = 20;
    const amount = (slides[0].getBoundingClientRect().width + gap) * dir;
    marcasTrack.scrollBy({ left: amount, behavior: "smooth" });
  };

  prevBtn?.addEventListener("click", () => scrollByCard(-1));
  nextBtn?.addEventListener("click", () => scrollByCard(1));

  updateActiveDot();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    let autoplay = window.setInterval(() => {
      const atEnd = marcasTrack.scrollLeft + marcasTrack.clientWidth >= marcasTrack.scrollWidth - 4;
      if (atEnd) {
        marcasTrack.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, 4200);

    ["mouseenter", "touchstart", "focusin"].forEach((evt) => {
      marcasTrack.addEventListener(evt, () => window.clearInterval(autoplay), { passive: true });
    });
  }
}

const form = document.getElementById("wa-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("f-name").value.trim();
  const interest = document.getElementById("f-interest").value;
  const phone = document.getElementById("f-phone").value.trim();
  const qty = document.getElementById("f-qty").value.trim();
  const msg = document.getElementById("f-msg").value.trim();

  if (!name || !msg) {
    form.reportValidity();
    return;
  }

  const text = [
    `Hola Karla, soy ${name}.`,
    `Quiero crear mi propia marca con Biopronatura Lab.`,
    `Linea de interes: ${interest}.`,
    phone ? `Mi WhatsApp: ${phone}.` : "",
    qty ? `Cantidad estimada: ${qty}.` : "",
    `Detalle: ${msg}`
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
