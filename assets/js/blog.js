// ==========================================================================
// Blog JavaScript
// ==========================================================================

// Blog posts data
const BLOG_POSTS = [
    {
        id: 'future-of-agentic-ai',
        title: 'The Future of Agentic AI: Beyond Simple Automation',
        excerpt: 'Explore how agentic AI is revolutionizing business operations by creating autonomous systems that can reason, plan, and execute complex tasks without human intervention.',
        category: 'AI Trends',
        date: '2025-01-15',
        readTime: '8 min read',
        image: '../assets/images/blog/agentic-ai-future.jpg',
        author: 'Danial Amin',
        featured: true
    },
    {
        id: 'implementing-ai-workflows',
        title: 'Implementing AI Workflows: A Practical Guide for Businesses',
        excerpt: 'Learn the step-by-step process of integrating AI into your existing workflows, from initial assessment to full deployment and optimization.',
        category: 'Implementation',
        date: '2025-01-12',
        readTime: '12 min read',
        image: '../assets/images/blog/ai-workflows.jpg',
        author: 'Aqib Aziz',
        featured: true
    },
    {
        id: 'ai-security-best-practices',
        title: 'AI Security Best Practices: Protecting Your Intelligent Systems',
        excerpt: 'Essential security considerations for AI implementations, including data protection, model security, and compliance requirements.',
        category: 'Security',
        date: '2025-01-10',
        readTime: '10 min read',
        image: '../assets/images/blog/ai-security.jpg',
        author: 'Danial Amin',
        featured: true
    },
    {
        id: 'measuring-ai-roi',
        title: 'Measuring AI ROI: Metrics That Matter for Business Success',
        excerpt: 'Discover the key performance indicators and metrics that help quantify the return on investment for your AI initiatives.',
        category: 'Business',
        date: '2025-01-08',
        readTime: '6 min read',
        image: '../assets/images/blog/ai-roi.jpg',
        author: 'Aqib Aziz',
        featured: false
    },
    {
        id: 'ai-ethics-responsible-deployment',
        title: 'AI Ethics and Responsible Deployment: A Framework for Success',
        excerpt: 'Understanding the ethical considerations in AI deployment and how to build responsible, transparent systems that benefit all stakeholders.',
        category: 'Ethics',
        date: '2025-01-05',
        readTime: '9 min read',
        image: '../assets/images/blog/ai-ethics.jpg',
        author: 'Danial Amin',
        featured: false
    },
    {
        id: 'automation-vs-intelligence',
        title: 'Automation vs Intelligence: Understanding the Difference',
        excerpt: 'Distinguish between traditional automation and intelligent AI systems, and learn when to apply each approach for maximum business impact.',
        category: 'Strategy',
        date: '2025-01-03',
        readTime: '7 min read',
        image: '../assets/images/blog/automation-intelligence.jpg',
        author: 'Aqib Aziz',
        featured: false
    }
];

// Blog functionality
class BlogManager {
    constructor() {
        this.postsPerPage = 6;
        this.currentPage = 1;
        this.allPosts = BLOG_POSTS;
        this.displayedPosts = [];
        
        this.init();
    }
    
    init() {
        this.renderBlogPosts();
        this.setupEventListeners();
        this.setupNewsletterForm();
    }
    
    renderBlogPosts() {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;
        
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.allPosts.slice(startIndex, endIndex);
        
        this.displayedPosts = [...this.displayedPosts, ...postsToShow];
        
        postsToShow.forEach(post => {
            const blogCard = this.createBlogCard(post);
            blogGrid.appendChild(blogCard);
        });
        
        this.updateLoadMoreButton();
    }
    
    createBlogCard(post) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-card-image" onerror="this.style.display='none'">
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <span>📅</span>
                        ${this.formatDate(post.date)}
                    </span>
                    <span class="blog-card-category">${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="posts/${post.id}.html" class="blog-card-link">
                    Read More
                </a>
            </div>
        `;
        
        return card;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        const totalPosts = this.allPosts.length;
        const displayedCount = this.displayedPosts.length;
        
        if (displayedCount >= totalPosts) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    setupEventListeners() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderBlogPosts();
            });
        }
    }
    
    setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                // Simulate newsletter subscription
                this.showNotification('Thank you for subscribing! You\'ll receive our latest insights soon.', 'success');
                newsletterForm.reset();
            });
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10B981' : '#3B82F6'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Get latest posts for homepage
    getLatestPosts(count = 3) {
        return this.allPosts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count);
    }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blogGrid')) {
        new BlogManager();
    }
});

// Export for use in other files
window.BlogManager = BlogManager;
window.BLOG_POSTS = BLOG_POSTS;
