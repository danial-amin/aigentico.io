// ==========================================================================
// Theme Toggle System
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeMobileMenu();
    preventEasyEditing();
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');
    const html = document.documentElement;
    
    // Function to get time-based theme
    const getTimeBasedTheme = () => {
        const hour = new Date().getHours();
        // Dark mode from 6 PM (18:00) to 6 AM (6:00)
        return (hour >= 18 || hour < 6) ? 'dark' : 'light';
    };
    
    // Check for saved theme preference or use time-based default
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || getTimeBasedTheme();
    html.setAttribute('data-theme', currentTheme);
    
    const updateThemeButtons = (theme) => {
        const icon = theme === 'dark' ? '☀️' : '🌙';
        const text = theme === 'dark' ? 'Light' : 'Dark';
        themeToggle.innerHTML = `${icon} <span>${text}</span>`;
        themeToggleDesktop.innerHTML = `${icon} <span>${text}</span>`;
    };
    
    updateThemeButtons(currentTheme);
    
    const toggleTheme = () => {
        const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeButtons(theme);
    };
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleDesktop.addEventListener('click', toggleTheme);
}

// ==========================================================================
// Mobile Menu
// ==========================================================================

function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .process-step, .team-member').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================================================
// Smooth Scroll for Navigation Links
// ==========================================================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================================================
// Prevent Easy Editing
// ==========================================================================

function preventEasyEditing() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable common shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });
}