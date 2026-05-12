// ─── TYPING ANIMATION (fixed: vanilla JS, runs on load, not inside sendBtn) ───
const nameText = "Richard Copat";
const typedName = document.getElementById("typed-name"); // ✅ real DOM element, no jQuery

if (typedName) {
  let index = 0;
  let deleting = false;

  const typeLoop = () => {
    typedName.textContent = nameText.slice(0, index);

    if (!deleting && index === nameText.length) {
      deleting = true;
      return setTimeout(typeLoop, 1200);
    }

    if (deleting && index === 0) {
      deleting = false;
      return setTimeout(typeLoop, 500);
    }

    index += deleting ? -1 : 1;
    setTimeout(typeLoop, deleting ? 60 : 100);
  };

  typeLoop();
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
revealElements.forEach(el => revealObserver.observe(el));

// ─── NAV SCROLL TRACKING ──────────────────────────────────────────────────────
const sectionsMap = {
  home: "home-section",
  about: "about-section",
  skills: "skills-section",
  projects: "projects-section",
  education: "education-section",  
  contact: "contact-section"
};
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = "";
  const scrollPosition = window.scrollY + 120;
  for (const [key, id] of Object.entries(sectionsMap)) {
    const el = document.getElementById(id);
    if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
      current = key;
      break;
    }
  }
  navLinks.forEach(link => {
    if (link.dataset.section === current) link.classList.add('active');
    else link.classList.remove('active');
  });
}

function scrollToSection(section) {
  const targetId = sectionsMap[section];
  const target = document.getElementById(targetId);
  if (target) {
    const offset = 80;
    const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: topPos, behavior: "smooth" });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToSection(link.getAttribute('data-section'));
  });
});

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ─── EXPLORE BUTTON ───────────────────────────────────────────────────────────
const exploreBtn = document.getElementById('exploreWorkBtn');
if (exploreBtn) exploreBtn.addEventListener('click', () => scrollToSection('projects'));

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const sendBtn = document.getElementById('sendMsgBtnV2');
const feedbackDiv = document.getElementById('formFeedbackV2');

function showNiceFeedback(msg, isError = false) {
  if (feedbackDiv) {
    feedbackDiv.innerHTML = `<div class="toast-custom" style="background:${isError ? 'rgba(200,60,60,0.7)' : 'rgba(59,130,246,0.7)'}; color:white;">${msg}</div>`;
    setTimeout(() => { if (feedbackDiv) feedbackDiv.innerHTML = ''; }, 3500);
  }
}

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name  = document.getElementById('contactNameV2')?.value.trim();
    const email = document.getElementById('contactEmailV2')?.value.trim();
    const msg   = document.getElementById('contactMsgV2')?.value.trim();

    if (!name || !email || !msg) {
      showNiceFeedback("✨ Please fill out all fields — let's connect!", true);
    } else if (!email.includes('@') || !email.includes('.')) {
      showNiceFeedback("📧 Please provide a valid email address.", true);
    } else {
      showNiceFeedback(`🎉 Thanks ${name}! I'll get back to you within 48 hours. Excited to create!`, false);
      document.getElementById('contactNameV2').value  = '';
      document.getElementById('contactEmailV2').value = '';
      document.getElementById('contactMsgV2').value   = '';
    }
  });
}
