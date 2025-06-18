const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.body.classList.toggle('dark', savedTheme === 'dark');

const toggleBtn = document.getElementById("theme-toggle");
const isDarkInitially = savedTheme === 'dark';
toggleBtn?.setAttribute(
    "aria-label",
    isDarkInitially ? "Switch to light mode" : "Switch to dark mode"
);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);

    toggleBtn?.setAttribute(
        "aria-label",
        newTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"
    );
}

toggleBtn?.addEventListener("click", toggleTheme);

document.getElementById("mobile-menu")?.addEventListener("click", function () {
    document.getElementById("nav-links")?.classList.toggle("active");
});

document.querySelector('form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Message Sent';

    alert('Thanks for your message!');
    this.reset();
});