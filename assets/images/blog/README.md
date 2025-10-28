# Blog Images Directory

This directory contains images for blog posts. The following images are referenced in the blog posts:

## Required Images

- `agentic-ai-future.jpg` - Image for "The Future of Agentic AI" post
- `ai-workflows.jpg` - Image for "Implementing AI Workflows" post  
- `ai-security.jpg` - Image for "AI Security Best Practices" post
- `ai-roi.jpg` - Image for "Measuring AI ROI" post
- `ai-ethics.jpg` - Image for "AI Ethics and Responsible Deployment" post
- `automation-intelligence.jpg` - Image for "Automation vs Intelligence" post

## Image Specifications

- **Format**: JPG or PNG
- **Dimensions**: 1200x630px (recommended for social media sharing)
- **File Size**: Under 500KB for optimal loading
- **Alt Text**: Descriptive alt text should be provided in the HTML

## Fallback Behavior

If images are not available, the blog cards will display a gradient background using the site's primary color scheme. The `onerror="this.style.display='none'"` attribute ensures graceful degradation.

## Adding New Images

When adding new blog posts:

1. Add the image file to this directory
2. Update the image path in the blog post HTML
3. Ensure the image follows the specifications above
4. Add appropriate alt text for accessibility
