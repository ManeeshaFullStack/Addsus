// NAVBAR SCROLL
const nav = document.getElementById("main-nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => observer.observe(el));

// COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count);
    const suffix = el.textContent.includes("+") ? "+" : "";
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent =
        current +
        (target >= 14 && target <= 100 ? (target === 98 ? "%" : "+") : "+");
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}
// Trigger counters when hero is visible
const heroObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      heroObs.disconnect();
    }
  },
  { threshold: 0.3 },
);
heroObs.observe(document.getElementById("hero"));

// BAR FILL ANIMATION
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".bar-fill[data-width]").forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 300);
        });
      }
    });
  },
  { threshold: 0.5 },
);
barObs.observe(document.querySelector(".hero-card"));

// FORM VALIDATION + SUBMISSION
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const msg = document.getElementById("contactMessage").value.trim();
  const msgEl = document.getElementById("form-msg");
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length < 2) {
    msgEl.style.color = "#e06d6d";
    msgEl.textContent = "✕ Please enter your full name.";
    return;
  }
  if (!emailRx.test(email)) {
    msgEl.style.color = "#e06d6d";
    msgEl.textContent = "✕ Please enter a valid email address.";
    return;
  }
  if (!msg || msg.length < 20) {
    msgEl.style.color = "#e06d6d";
    msgEl.textContent =
      "✕ Please provide a project brief (at least 20 characters).";
    return;
  }
  msgEl.textContent = "";
  document.getElementById("ref-num").textContent = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
  new bootstrap.Modal(document.getElementById("successModal")).show();
  this.reset();
});

// SMOOTH CLOSE MOBILE NAV ON LINK CLICK
document.querySelectorAll("#navbarCollapse a").forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = bootstrap.Collapse.getInstance(
      document.getElementById("navbarCollapse"),
    );
    if (collapse) collapse.hide();
  });
});
