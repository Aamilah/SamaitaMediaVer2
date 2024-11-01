// Dark mode toggle script
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme');

// Set default to light mode if no preference is saved
if (!currentTheme) {
    currentTheme = 'light';
    localStorage.setItem('theme', 'light');
}

// Set the theme based on saved preference
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true; 
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.checked = false;
}

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});
