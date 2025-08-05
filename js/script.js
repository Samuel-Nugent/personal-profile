const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
document.body.classList.toggle("dark", savedTheme === "dark");

const toggleBtn = document.getElementById("theme-toggle");
const navLogo = document.getElementById("nav-logo");
const homeLogo = document.getElementById("home-logo");

function initFavicons() {
  const icons = [
    { rel: "icon", type: "image/svg+xml", id: "favicon-svg" },
    { rel: "icon", type: "image/png", sizes: "32x32", id: "favicon-32" },
    { rel: "icon", type: "image/png", sizes: "16x16", id: "favicon-16" },
    { rel: "apple-touch-icon", id: "favicon-apple" },
  ];

  icons.forEach((icon) => {
    if (!document.getElementById(icon.id)) {
      const link = document.createElement("link");
      Object.assign(link, icon);
      document.head.appendChild(link);
    }
  });
}

function setFavicon(theme) {
  const isDark = theme === "dark";

  document.getElementById("favicon-svg").href = `assets/favicon-${theme}.svg`;
  document.getElementById("favicon-32").href = `assets/favicon-${theme}-32.png`;
  document.getElementById("favicon-16").href = `assets/favicon-${theme}-16.png`;
  document.getElementById(
    "favicon-apple"
  ).href = `assets/favicon-${theme}-180.png`;
}

function updateThemeAssets(theme) {
  setFavicon(theme);
  const logoSrc = `assets/favicon-${theme}.svg`;
  if (navLogo) navLogo.src = logoSrc;
  if (homeLogo) homeLogo.src = logoSrc;
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  document.body.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("theme", newTheme);

  toggleBtn?.setAttribute(
    "aria-label",
    newTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );

  updateThemeAssets(newTheme);
}

initFavicons();
updateThemeAssets(savedTheme);
toggleBtn?.addEventListener("click", toggleTheme);

document.getElementById("mobile-menu")?.addEventListener("click", function () {
  document.getElementById("nav-links")?.classList.toggle("active");
});

document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links")?.classList.remove("active");
  });
});

const elements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = Array.from(entry.target.parentElement.children);
        children.forEach((child, index) => {
          child.style.setProperty("--delay", `${index * 0.15}s`);
          child.classList.add("visible");
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

elements.forEach((el) => observer.observe(el));

document.querySelector("form")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xnnvdnon", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      submitBtn.textContent = "Message Sent!";
      alert("Thanks for your message!");
      form.reset();
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
    alert("Network error. Please try again later.");
  }
});
