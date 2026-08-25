// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Mode Switcher Functionality
function toggleMode() {
    const body = document.body;
    const modeSwitcher = document.getElementById('modeSwitcher');
    const currentMode = body.getAttribute('data-mode');
    
    if (currentMode === 'normal') {
        body.setAttribute('data-mode', 'data-science');
        modeSwitcher.innerHTML = '<i class="fas fa-user"></i><span>Normal Mode</span>';
    } else {
        body.setAttribute('data-mode', 'normal');
        modeSwitcher.innerHTML = '<i class="fas fa-flask"></i><span>Data Science Mode</span>';
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
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

// Add scroll event listener for navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            const currentMode = document.body.getAttribute('data-mode');
            if (currentMode === 'data-science') {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            const currentMode = document.body.getAttribute('data-mode');
            if (currentMode === 'data-science') {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
});
