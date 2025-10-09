// ==========================================================================
// Site Configuration
// ==========================================================================

const SITE_CONFIG = {
    name: 'aigentico',
    domain: 'aigentico.io',
    email: 'contact@aigentico.io',
    location: 'Australia',
    social: {
        linkedin: 'https://linkedin.com/company/aigentico',
        twitter: 'https://twitter.com/aigentico'
    },
    
    // Stats
    stats: {
        experience: '5+',
        projects: '25+',
        retention: '100%',
        operations: '24/7'
    },
    
    // Services
    services: [
        {
            id: 'process-integration',
            name: 'Process Integration',
            icon: '⚡',
            shortDesc: 'Seamlessly embed AI into your existing workflows',
            features: [
                'API Integration & Middleware Development',
                'Workflow Automation',
                'Legacy System Modernization',
                'Real-time Data Synchronization'
            ]
        },
        {
            id: 'agentic-ai',
            name: 'Agentic AI Implementation',
            icon: '🤖',
            shortDesc: 'Deploy autonomous AI agents',
            features: [
                'Autonomous Decision-Making Systems',
                'Multi-Agent Orchestration',
                'Predictive Analytics',
                'Self-Optimizing Workflows'
            ]
        },
        {
            id: 'consultation',
            name: 'Consultation & Training',
            icon: '💡',
            shortDesc: 'Expert guidance for your team',
            features: [
                'AI Strategy Development',
                'Team Training & Workshops',
                'Technology Assessment',
                'Implementation Roadmaps'
            ]
        },
        {
            id: 'custom',
            name: 'Custom AI Solutions',
            icon: '🎯',
            shortDesc: 'Bespoke systems for your needs',
            features: [
                'Custom Model Development',
                'System Architecture Design',
                'Full Ownership & Control',
                'Ongoing Support & Maintenance'
            ]
        }
    ],
    
    // Team
    team: [
        {
            name: 'Danial Amin',
            role: 'Founder & AI Strategist',
            bio: 'Leading the vision for intelligent business transformation with 10+ years in AI and machine learning.',
            image: 'assets/images/team/danial-amin.jpg'
        },
        {
            name: 'Emmett Marsh',
            role: 'Technical Lead',
            bio: 'Architecting cutting-edge AI solutions with expertise in distributed systems and automation.',
            image: 'assets/images/team/emmett-marsh.jpg'
        }
    ]
};

// Make config available globally
window.SITE_CONFIG = SITE_CONFIG;