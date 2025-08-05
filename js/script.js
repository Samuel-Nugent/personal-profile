const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
document.body.classList.toggle("dark", savedTheme === "dark");

const toggleBtn = document.getElementById("theme-toggle");
const isDarkInitially = savedTheme === "dark";
toggleBtn?.setAttribute(
  "aria-label",
  isDarkInitially ? "Switch to light mode" : "Switch to dark mode"
);

const favicon = document.getElementById("favicon");
const navLogo = document.getElementById("nav-logo");
const homeLogo = document.getElementById("home-logo");

function updateThemeAssets(theme) {
  const logoSrc =
    theme === "dark" ? "assets/favicon-dark.svg" : "assets/favicon-light.svg";

  if (favicon) favicon.href = logoSrc;
  if (navLogo) navLogo.src = logoSrc;
  if (homeLogo) homeLogo.src = logoSrc;
}

updateThemeAssets(savedTheme);

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

toggleBtn?.addEventListener("click", toggleTheme);

document.getElementById("mobile-menu")?.addEventListener("click", function () {
  document.getElementById("nav-links")?.classList.toggle("active");
});

const navLinks = document.querySelectorAll("#nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("nav-links")?.classList.remove("active");
  });
});

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
