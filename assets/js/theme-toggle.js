// ==========================================================================
// Theme Toggle System
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, themeToggle);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme, themeToggle);
        });
    }
}

function updateThemeIcon(theme, button) {
    if (button) {
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
        button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}