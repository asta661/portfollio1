/* ============================================================
   SCRIPT.JS
   ------------------------------------------------------------
   Rendering + interaction logic only. No editable content lives
   in this file — everything it displays comes from the
   PORTFOLIO_DATA object in portfolio-data.js.

   You should not need to edit this file to change portfolio
   content. Edit portfolio-data.js instead.
   ============================================================ */

(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;

  /* ---------- small escaping helper (safety for injected text) ---------- */
  function esc(str) {
    if (str === undefined || str === null) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- built-in project SVG icons (looked up by `visual` key) ---------- */
  const PROJECT_VISUALS = {
    elearning: `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="120" rx="6" stroke="#2a2a33" stroke-width="1.5"/>
        <rect x="34" y="34" width="132" height="18" rx="3" fill="#17171d" stroke="#2a2a33"/>
        <circle cx="44" cy="43" r="3" fill="#45e8d8"/>
        <rect x="34" y="62" width="60" height="60" rx="4" fill="#17171d" stroke="#2a2a33"/>
        <path d="M50 92 L62 82 L74 98" stroke="#7c6cff" stroke-width="2" fill="none"/>
        <rect x="102" y="62" width="64" height="10" rx="2" fill="#1d1d24"/>
        <rect x="102" y="78" width="64" height="10" rx="2" fill="#1d1d24"/>
        <rect x="102" y="94" width="40" height="10" rx="2" fill="#1d1d24"/>
        <rect x="34" y="130" width="30" height="6" rx="2" fill="#45e8d8" opacity="0.6"/>
      </svg>`,
    network: `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="80" r="46" stroke="#2a2a33" stroke-width="1.5"/>
        <circle cx="100" cy="80" r="4" fill="#7c6cff"/>
        <circle cx="70" cy="55" r="4" fill="#45e8d8"/>
        <circle cx="132" cy="60" r="4" fill="#45e8d8"/>
        <circle cx="80" cy="112" r="4" fill="#45e8d8"/>
        <circle cx="126" cy="108" r="4" fill="#45e8d8"/>
        <line x1="100" y1="80" x2="70" y2="55" stroke="#3a3a44" stroke-width="1.2"/>
        <line x1="100" y1="80" x2="132" y2="60" stroke="#3a3a44" stroke-width="1.2"/>
        <line x1="100" y1="80" x2="80" y2="112" stroke="#3a3a44" stroke-width="1.2"/>
        <line x1="100" y1="80" x2="126" y2="108" stroke="#3a3a44" stroke-width="1.2"/>
      </svg>`,
    leaf: `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 30 C70 55 55 85 65 115 C75 140 125 140 135 115 C145 85 130 55 100 30Z" stroke="#2a2a33" stroke-width="1.5"/>
        <path d="M100 45 C112 62 118 78 112 96" stroke="#45e8d8" stroke-width="1.4" fill="none" opacity="0.7"/>
        <rect x="30" y="20" width="20" height="20" rx="3" stroke="#3a3a44"/>
        <rect x="150" y="120" width="20" height="20" rx="3" stroke="#3a3a44"/>
        <path d="M45 30 L100 60" stroke="#7c6cff" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
      </svg>`,
    weather: `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20,120 45,90 65,105 90,60 115,80 140,40 165,70" stroke="#45e8d8" stroke-width="2" fill="none"/>
        <polyline points="20,130 45,110 65,120 90,95 115,105 140,75 165,95" stroke="#7c6cff" stroke-width="1.4" fill="none" opacity="0.55"/>
        <line x1="20" y1="140" x2="180" y2="140" stroke="#2a2a33"/>
        <line x1="20" y1="20" x2="20" y2="140" stroke="#2a2a33"/>
      </svg>`,
    heartbeat: `
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="10,80 35,80 45,55 55,105 65,80 75,80 85,30 95,130 105,80 190,80" stroke="#7c6cff" stroke-width="1.8" fill="none"/>
        <line x1="10" y1="80" x2="190" y2="80" stroke="#2a2a33" stroke-dasharray="2 4"/>
      </svg>`
  };

  /* ---------- compact line-art icons for the project cards (64x64) ---------- */
  const V = "#8f86ff", C = "#45e8d8", Y = "#f5c84b";
  const ICON = (inner) => `<svg viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  Object.assign(PROJECT_VISUALS, {
    documind: ICON(`
      <path d="M16 8h20l10 10v14" stroke="${V}" stroke-width="2"/>
      <path d="M16 8v44h14" stroke="${V}" stroke-width="2"/>
      <path d="M36 8v10h10" stroke="${V}" stroke-width="2"/>
      <path d="M22 26h14M22 33h10M22 40h6" stroke="#4a4a58" stroke-width="2"/>
      <circle cx="43" cy="42" r="8" stroke="${C}" stroke-width="2"/>
      <path d="M49 48l7 7" stroke="${C}" stroke-width="2.4"/>
      <path d="M43 38v8M39 42h8" stroke="${Y}" stroke-width="1.6"/>`),
    rag: ICON(`
      <rect x="8" y="22" width="16" height="20" rx="2.5" stroke="${V}" stroke-width="2"/>
      <path d="M12 29h8M12 34h6" stroke="#4a4a58" stroke-width="2"/>
      <path d="M24 32h10" stroke="#4a4a58" stroke-width="1.6" stroke-dasharray="2 3"/>
      <path d="M34 32L46 16M34 32l12 0M34 32l12 16" stroke="#4a4a58" stroke-width="1.6"/>
      <circle cx="34" cy="32" r="4" fill="${V}"/>
      <circle cx="47" cy="15" r="4" stroke="${C}" stroke-width="2"/>
      <circle cx="49" cy="32" r="4" stroke="${C}" stroke-width="2"/>
      <circle cx="47" cy="49" r="4" stroke="${C}" stroke-width="2"/>
      <circle cx="49" cy="32" r="1.6" fill="${Y}"/>`),
    leaf: ICON(`
      <path d="M12 46C12 26 26 12 52 10c0 26-12 40-32 40" stroke="${C}" stroke-width="2"/>
      <path d="M12 52C20 42 28 34 40 26" stroke="${C}" stroke-width="2"/>
      <circle cx="30" cy="30" r="2.6" fill="${V}"/><circle cx="40" cy="22" r="2.6" fill="${V}"/>
      <circle cx="40" cy="38" r="2.6" fill="${V}"/><circle cx="26" cy="42" r="2.6" fill="${V}"/>
      <path d="M30 30L40 22M30 30L40 38M26 42L40 38" stroke="${V}" stroke-width="1.2"/>
      <circle cx="52" cy="10" r="2" fill="${Y}"/>`),
    elearning: ICON(`
      <path d="M32 12L6 24l26 12 26-12z" stroke="${V}" stroke-width="2"/>
      <path d="M16 29v10c0 4 7 8 16 8s16-4 16-8V29" stroke="${V}" stroke-width="2"/>
      <path d="M58 24v14" stroke="${Y}" stroke-width="2"/>
      <rect x="22" y="44" width="20" height="14" rx="3" fill="#131318" stroke="${C}" stroke-width="2"/>
      <path d="M29 48l7 3-7 3z" fill="${C}" stroke="none"/>`),
    food: ICON(`
      <path d="M14 22h30l-3 30H17z" stroke="${V}" stroke-width="2"/>
      <path d="M22 22v-4a7 7 0 0 1 14 0v4" stroke="${V}" stroke-width="2"/>
      <path d="M24 36l5 5 9-10" stroke="${C}" stroke-width="2.2"/>
      <path d="M48 44h8M50 50h6" stroke="#4a4a58" stroke-width="2"/>
      <circle cx="52" cy="22" r="5" stroke="${Y}" stroke-width="2"/>
      <circle cx="52" cy="22" r="1.4" fill="${Y}"/>`),
    weather: ICON(`
      <path d="M20 34a9 9 0 0 1 1-18 12 12 0 0 1 23 3 8 8 0 0 1 0 15z" stroke="${V}" stroke-width="2"/>
      <path d="M8 56l12-9 9 5 12-13 14 8" stroke="${C}" stroke-width="2"/>
      <circle cx="55" cy="47" r="2.2" fill="${Y}"/>
      <path d="M8 60h50" stroke="#3a3a44" stroke-width="1.4"/>`)
  });

  const DEFAULT_VISUAL = PROJECT_VISUALS.network;

  /* ============================================================
     NAV / HERO / FOOTER — text driven by `personal` + `hero`
     ============================================================ */
  function renderIdentity() {
    document.title = `${data.personal.name} — ${data.personal.role}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content",
        `Portfolio of ${data.personal.name}, an ${data.personal.role} building intelligent applications with machine learning, RAG, MCP servers and modern web technologies.`);
    }

    document.querySelectorAll("[data-bind='nav-name']").forEach(el => el.textContent = data.personal.shortName);
    document.querySelectorAll("[data-bind='footer-name']").forEach(el => el.textContent = data.personal.name);
    document.querySelectorAll("[data-bind='footer-year']").forEach(el => el.textContent = data.footer.year);
    document.querySelectorAll("[data-bind='footer-tagline']").forEach(el => el.textContent = data.footer.tagline);
  }

  function renderHero() {
    document.querySelectorAll("[data-bind='hero-tag']").forEach(el => el.textContent = data.hero.availabilityTag);
    document.querySelectorAll("[data-bind='hero-heading']").forEach(el => el.textContent = data.hero.heading);
    document.querySelectorAll("[data-bind='hero-desc']").forEach(el => el.textContent = data.hero.description);

    const ctaWrap = document.getElementById("hero-ctas");
    if (ctaWrap) {
      ctaWrap.innerHTML = `
        <a href="${esc(data.hero.ctaPrimary.href)}" class="btn btn-primary">${esc(data.hero.ctaPrimary.label)}</a>
        <a href="${esc(data.hero.ctaSecondary.href)}" class="btn btn-ghost">${esc(data.hero.ctaSecondary.label)}</a>
      `;
    }

    const stackWrap = document.getElementById("hero-stack");
    if (stackWrap) {
      stackWrap.innerHTML = data.hero.techStack.map(t => `<span>${esc(t)}</span>`).join('<i class="sep" aria-hidden="true"></i>');
    }
  }

  /* ============================================================
     ABOUT
     ============================================================ */
  function renderAbout() {
    const paraWrap = document.getElementById("about-paragraphs");
    if (paraWrap) {
      paraWrap.innerHTML = data.about.paragraphs.map(p => `<p>${esc(p)}</p>`).join("");
    }
    const factsWrap = document.getElementById("about-facts");
    if (factsWrap) {
      factsWrap.innerHTML = data.about.facts.map(f => `
        <div class="fact"><span class="k">${esc(f.label)}</span><span class="v">${esc(f.value)}</span></div>
      `).join("");
    }
  }

  /* ============================================================
     SKILLS
     ============================================================ */
  function renderSkills() {
    const wrap = document.getElementById("skills-groups");
    if (!wrap) return;

    const groupsHTML = data.skills.groups.map((group, i) => {
      const hot = group.highlight || [];
      const tiles = group.items.map(item => `<span class="skill-tile${hot.includes(item) ? " hot" : ""}">${esc(item)}</span>`).join("");
      const isLast = i === data.skills.groups.length - 1;
      const softBlock = isLast ? `
        <div class="soft-skills">
          <span>${esc(data.skills.softSkills.label)}</span>
          <div class="skill-tiles">
            ${data.skills.softSkills.items.map(s => `<span class="skill-tile">${esc(s)}</span>`).join("")}
          </div>
        </div>` : "";

      return `
        <div class="skill-group reveal">
          <h3>${esc(group.title)}</h3>
          <span class="group-sub">${esc(group.subtitle)}</span>
          <div class="skill-tiles">${tiles}</div>
          ${softBlock}
        </div>`;
    }).join("");

    wrap.innerHTML = groupsHTML;
  }

  /* ============================================================
     PROJECTS
     ============================================================ */
  const ARROW = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  function renderProjectFooter(project) {
    // Existing link rules preserved: only render links that are actually set.
    const links = [];
    if (project.live) links.push(`<a class="proj-link" href="${esc(project.live)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`);
    if (project.github) links.push(`<a class="proj-link" href="${esc(project.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
    const primary = project.live || project.github;
    const arrow = primary
      ? `<a class="proj-arrow" href="${esc(primary)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(project.title)}">${ARROW}</a>`
      : `<span class="proj-arrow" aria-hidden="true">${ARROW}</span>`;
    return `<div class="project-foot"><div class="proj-links">${links.join("")}</div>${arrow}</div>`;
  }

  function renderProjects() {
    const wrap = document.getElementById("projects-list");
    if (!wrap) return;

    const statsWrap = document.getElementById("proj-stats");
    if (statsWrap && data.projectStats) {
      statsWrap.innerHTML = data.projectStats.map(t => `<li>${esc(t)}</li>`).join("");
    }

    wrap.innerHTML = data.projects.map(project => {
      const visual = PROJECT_VISUALS[project.visual] || DEFAULT_VISUAL;
      const features = (project.features || []).slice(0, 3).map(f => `<span class="feature-pill">${esc(f)}</span>`).join("");
      const tech = (project.tech || []).join(" · ");

      return `
        <article class="project-card reveal">
          <div class="project-icon">${visual}</div>
          <div class="project-body">
            <div class="project-top">
              <h3>${esc(project.title)}</h3>
              <span class="project-cat">${esc(project.category)}</span>
            </div>
            <p class="project-desc">${esc(project.description)}</p>
            <div class="project-features">${features}</div>
            ${tech ? `<div class="project-tech"><b>Stack:</b> ${esc(tech)}</div>` : ""}
            ${renderProjectFooter(project)}
          </div>
        </article>`;
    }).join("");
  }

  /* ============================================================
     EXPERIENCE
     ============================================================ */
  function renderExperience() {
    const wrap = document.getElementById("experience-timeline");
    if (wrap) {
      wrap.innerHTML = data.experience.timeline.map(item => `
        <div class="tl-item">
          <div class="tl-date">${esc(item.date)}</div>
          <div class="tl-role">${esc(item.role)}</div>
          <span class="tl-org">${esc(item.org)}</span>
          <ul>${item.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>`).join("");
    }

    const noteWrap = document.getElementById("experience-note");
    if (noteWrap) {
      if (data.experience.note) {
        noteWrap.textContent = data.experience.note;
        noteWrap.style.display = "";
      } else {
        noteWrap.style.display = "none";
      }
    }
  }

  /* ============================================================
     EDUCATION
     ============================================================ */
  function renderEducation() {
    const wrap = document.getElementById("education-list");
    if (!wrap) return;

    wrap.innerHTML = data.education.map(edu => `
      <div class="edu-item">
        <div class="edu-year">${esc(edu.years)}</div>
        <div>
          <div class="edu-degree">${esc(edu.degree)}</div>
          <div class="edu-school">${esc(edu.school)}</div>
        </div>
        <div class="edu-score">${esc(edu.score)}</div>
      </div>`).join("");
  }

  /* ============================================================
     CONTACT
     ============================================================ */
  function renderContact() {
    document.querySelectorAll("[data-bind='contact-heading']").forEach(el => el.textContent = data.contact.heading);
    document.querySelectorAll("[data-bind='contact-subtext']").forEach(el => el.textContent = data.contact.subtext);

    const linksWrap = document.getElementById("contact-links");
    if (linksWrap) {
      linksWrap.innerHTML = `
        <a class="contact-link" href="mailto:${esc(data.personal.email)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          ${esc(data.personal.email)}
        </a>
        <a class="contact-link" href="${esc(data.personal.linkedin.url)}" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4"/></svg>
          ${esc(data.personal.linkedin.label)}
        </a>
        <a class="contact-link" href="${esc(data.personal.github.url)}" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
          ${esc(data.personal.github.label)}
        </a>`;
    }
  }

  /* ============================================================
     INTERACTIONS (nav scroll state, active link, mobile menu,
     scroll-reveal, hero canvas animation) — unchanged behavior
     from the original single-file version, just re-attached
     after the dynamic content is rendered.
     ============================================================ */
  function initInteractions() {
    const navHeader = document.getElementById("navHeader");
    const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const sections = document.querySelectorAll("main section[id]");

    window.addEventListener("scroll", () => {
      navHeader.classList.toggle("scrolled", window.scrollY > 12);
    }, { passive: true });

    navToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
      navToggle.classList.toggle("open", open);
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => io.observe(s));

    // Scroll reveal (re-queried since content was just injected)
    const revealEls = document.querySelectorAll(".reveal");
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => ro.observe(el));

    // Hero network canvas
    const canvas = document.getElementById("hero-canvas");
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W, H, nodes = [];

    function resize() {
      const heroRect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = heroRect.width * devicePixelRatio;
      H = canvas.height = heroRect.height * devicePixelRatio;
      canvas.style.width = heroRect.width + "px";
      canvas.style.height = heroRect.height + "px";
    }

    function initNodes() {
      const count = Math.max(24, Math.floor((W * H) / (22000 * devicePixelRatio * devicePixelRatio)));
      nodes = Array.from({ length: Math.min(count, 60) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        r: (Math.random() * 1.4 + 0.6) * devicePixelRatio
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const maxDist = 150 * devicePixelRatio;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(124,108,255,${0.14 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(69,232,216,0.55)";
        ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); initNodes(); if (reduceMotion) draw(); }, 200);
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function render() {
    renderIdentity();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderContact();
    initInteractions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
