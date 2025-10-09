// ==========================================================================
// Site Configuration & Content Population
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTechScroll();
    initializeServices();
    initializeScrollAnimations();
    preventEasyEditing();
});

// ==========================================================================
// Technology Scroll
// ==========================================================================

function initializeTechScroll() {
    const technologies = [
        '🤖 OpenAI GPT-4',
        '⚡ Claude AI',
        '🔷 Azure AI',
        '🟢 LangChain',
        '🐍 Python',
        '⚛️ React',
        '📊 TensorFlow',
        '🔥 PyTorch',
        '☁️ AWS',
        '🌐 Node.js',
        '🎯 FastAPI',
        '🔵 Docker',
        '📈 Kubernetes',
        '💾 PostgreSQL',
        '🔴 Redis'
    ];

    const scrollContent = document.getElementById('techScroll');
    if (!scrollContent) return;

    // Duplicate for infinite scroll effect
    const duplicatedTech = [...technologies, ...technologies];
    
    scrollContent.innerHTML = duplicatedTech.map(tech => 
        `<div class="tech-item">${tech}</div>`
    ).join('');
}

// ==========================================================================
// Services Population
// ==========================================================================

function initializeServices() {
    const services = [
        {
            icon: '⚡',
            title: 'Process Integrations',
            description: 'Seamlessly embed AI into your existing workflows to enhance efficiency. We connect disparate systems to create a unified, intelligent operation.'
        },
        {
            icon: '🤖',
            title: 'Agentic Implementation',
            description: 'Deploy autonomous AI agents that work continuously to optimize strategies and anticipate business needs without manual intervention.'
        },
        {
            icon: '💡',
            title: 'Consultation & Training',
            description: 'Expert guidance and comprehensive training to help your team effectively leverage AI capabilities and drive sustainable innovation.'
        },
        {
            icon: '🎯',
            title: 'Custom AI Solutions',
            description: 'Bespoke AI systems designed specifically for your business requirements. Fully owned and controlled by you, with no vendor lock-in.'
        }
    ];

    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
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
// Smooth Scroll for Navigation
// ==========================================================================

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

// ==========================================================================
// Contact Form Handler
// ==========================================================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send to your backend
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ==========================================================================
// Prevent Easy Editing
// ==========================================================================

function preventEasyEditing() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable common developer shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
        }
    });
}