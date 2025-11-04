// ==========================================================================
// Theme Toggle System
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeBlogPreview();
    preventEasyEditing();
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
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
// Blog Preview
// ==========================================================================

// Check if a blog post file exists
async function blogPostExists(postId) {
    try {
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`blog/posts/${postId}.html${cacheBuster}`, {
            method: 'HEAD', // Only check if file exists, don't download content
            cache: 'no-store'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Extract date from blog post HTML file
// Always fetches fresh to ensure dates update when blog posts are modified
async function fetchBlogPostDate(postId) {
    try {
        // Add cache-busting query parameter to ensure fresh fetch
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`blog/posts/${postId}.html${cacheBuster}`, {
            cache: 'no-store' // Force fresh fetch, bypass browser cache
        });
        if (!response.ok) {
            console.warn(`Failed to fetch blog post: ${postId}`);
            return null;
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find JSON-LD script tag
        const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
        if (!jsonLdScript) {
            console.warn(`No JSON-LD found in blog post: ${postId}`);
            return null;
        }
        
        try {
            const jsonLd = JSON.parse(jsonLdScript.textContent);
            // Prefer dateModified over datePublished if both exist (more recent)
            const datePublished = jsonLd.dateModified || jsonLd.datePublished;
            
            if (datePublished) {
                return datePublished;
            }
        } catch (e) {
            console.warn(`Failed to parse JSON-LD for blog post: ${postId}`, e);
        }
        
        return null;
    } catch (error) {
        console.warn(`Error fetching blog post date for ${postId}:`, error);
        return null;
    }
}

async function initializeBlogPreview() {
    const blogPreviewGrid = document.getElementById('blogPreviewGrid');
    if (!blogPreviewGrid) return;

    // Blog posts data (same as in blog.js)
    const blogPosts = [
        {
            id: 'future-of-agentic-ai',
            title: 'The Future of Agentic AI: Beyond Simple Automation',
            excerpt: 'Explore how agentic AI is revolutionizing business operations by creating autonomous systems that can reason, plan, and execute complex tasks.',
            category: 'AI Trends',
            date: '2025-01-15', // Fallback date
            image: 'assets/images/blog/agentic-ai-future.jpg'
        },
        {
            id: 'implementing-ai-workflows',
            title: 'Implementing AI Workflows: A Practical Guide',
            excerpt: 'Learn the step-by-step process of integrating AI into your existing workflows, from initial assessment to full deployment.',
            category: 'Implementation',
            date: '2025-01-12', // Fallback date
            image: 'assets/images/blog/ai-workflows.jpg'
        },
        {
            id: 'ai-security-best-practices',
            title: 'AI Security Best Practices: Protecting Your Systems',
            excerpt: 'Essential security considerations for AI implementations, including data protection, model security, and compliance.',
            category: 'Security',
            date: '2025-01-10', // Fallback date
            image: 'assets/images/blog/ai-security.jpg'
        },
        {
            id: 'agentic-vs-traditional-vs-generative-ai',
            title: 'Agentic AI vs Traditional AI vs Generative AI: A Complete Comparison Guide',
            excerpt: 'Understand the key differences between Agentic AI, Traditional AI, and Generative AI. Learn which approach is right for your business needs.',
            category: 'AI Technology',
            date: '2025-10-29', // Fallback date
            image: 'assets/images/blog/ai-comparison.jpg'
        }
    ];

    // Filter to only include posts that actually exist
    const existenceChecks = await Promise.all(
        blogPosts.map(async (post) => ({
            post,
            exists: await blogPostExists(post.id)
        }))
    );
    
    const existingPosts = existenceChecks
        .filter(check => check.exists)
        .map(check => check.post);

    // Fetch dates for all existing posts in parallel
    const datePromises = existingPosts.map(async (post) => {
        const fetchedDate = await fetchBlogPostDate(post.id);
        if (fetchedDate) {
            post.date = fetchedDate;
        }
        return post;
    });

    // Wait for all dates to be fetched
    const postsWithDates = await Promise.all(datePromises);

    // Get latest 3 posts, sorted by date
    const latestPosts = postsWithDates
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // Render blog preview cards
    latestPosts.forEach(post => {
        const card = createBlogPreviewCard(post);
        blogPreviewGrid.appendChild(card);
    });
}

function createBlogPreviewCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-preview-card';
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-preview-image" onerror="this.style.display='none'">
        <div class="blog-preview-content">
            <div class="blog-preview-meta">
                <span class="blog-preview-date">${formatDate(post.date)}</span>
                <span class="blog-preview-category">${post.category}</span>
            </div>
            <h3>${post.title}</h3>
            <p class="blog-preview-excerpt">${post.excerpt}</p>
            <a href="blog/posts/${post.id}.html" class="blog-preview-link">
                Read More
            </a>
        </div>
    `;
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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