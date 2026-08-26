/**
 * Portfolio Website JavaScript
 * Handles navigation, animations, and user interactions
 */

(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        HEADER_OFFSET: 80,
        SCROLL_THRESHOLD: 100,
        SECTION_OFFSET: 200,
        OBSERVER_THRESHOLD: 0.1,
        OBSERVER_ROOT_MARGIN: '0px 0px -50px 0px'
    };

    // DOM Elements cache
    const elements = {
        burger: null,
        navLinks: null,
        navLinksItems: null,
        navbar: null
    };

    /**
     * Initialize DOM element references
     */
    function initElements() {
        elements.burger = document.querySelector('.burger');
        elements.navLinks = document.querySelector('.nav-links');
        elements.navLinksItems = document.querySelectorAll('.nav-links li');
        elements.navbar = document.querySelector('.navbar');
    }

    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileMenu() {
        if (!elements.navLinks || !elements.burger) return;
        
        elements.navLinks.classList.toggle('active');
        elements.burger.classList.toggle('toggle');
    }

    /**
     * Close mobile menu when clicking on a link
     */
    function closeMobileMenuOnLinkClick() {
        if (!elements.navLinksItems || !elements.navLinks) return;
        
        elements.navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                elements.navLinks.classList.remove('active');
            });
        });
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - CONFIG.HEADER_OFFSET;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= sectionTop - CONFIG.SECTION_OFFSET) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Change navbar background on scroll
     */
    function updateNavbarBackground() {
        if (!elements.navbar) return;
        
        const backgroundColor = window.scrollY > CONFIG.SCROLL_THRESHOLD 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 1)';
        
        elements.navbar.style.backgroundColor = backgroundColor;
    }

    /**
     * Consolidated scroll handler for better performance
     */
    function handleScroll() {
        updateActiveNavigation();
        updateNavbarBackground();
    }

    /**
     * Initialize intersection observer for fade-in animations
     */
    function initAnimations() {
        const observerOptions = {
            threshold: CONFIG.OBSERVER_THRESHOLD,
            rootMargin: CONFIG.OBSERVER_ROOT_MARGIN
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .education-card');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Add hover effects to project cards using CSS classes instead of inline styles
     */
    function initProjectCardEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Display welcome message in console
     */
    function displayConsoleMessage() {
        const welcomeStyle = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;';
        const buildStyle = 'color: #3498db; font-size: 12px;';
        
        console.log('%c Welcome to Md. Alfaz Nawaz Khan Shrabon\'s Portfolio! ', welcomeStyle);
        console.log('%c Built with HTML, CSS, and JavaScript ', buildStyle);
    }

    /**
     * Initialize all event listeners and functionality
     */
    function init() {
        initElements();
        
        // Mobile navigation
        if (elements.burger) {
            elements.burger.addEventListener('click', toggleMobileMenu);
        }
        
        closeMobileMenuOnLinkClick();
        initSmoothScrolling();
        
        // Scroll handlers
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Animations
        initAnimations();
        initProjectCardEffects();
        
        // Console message
        displayConsoleMessage();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
