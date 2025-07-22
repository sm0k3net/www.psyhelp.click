// PsyHelp.Click JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header navigation functionality
    initializeNavigation();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Contact form functionality
    initializeContactForm();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Scroll-based animations
    initializeScrollAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            scrollToSection(targetSection);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = formData.get('email');
            const topic = formData.get('topic');
            
            // Basic validation
            if (!email || !topic) {
                showNotification('Пожалуйста, заполните обязательные поля (Email и Тема)', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Пожалуйста, введите корректный email адрес', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send the data to a server here
            // Example:
            // fetch('/submit-form', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => {
            //     // Handle response
            // });
        });
    }
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.psychology-card, .consultation-circle, section').forEach(el => {
        observer.observe(el);
    });
}

// Helper function to scroll to a section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = ['about', 'consultations', 'directions', 'contacts'];
    const scrollPosition = window.scrollY + 100;
    
    let activeSection = '';
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection = section;
                break;
            }
        }
    }
    
    // Update navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const linkSection = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
        if (linkSection === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = notification.querySelector('.notification-text');
    const notificationIcon = notification.querySelector('.notification-icon');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        
        // Update icon and style based on type
        if (type === 'error') {
            notificationIcon.className = 'fas fa-exclamation-circle notification-icon';
            notification.style.backgroundColor = '#ef4444';
        } else {
            notificationIcon.className = 'fas fa-check-circle notification-icon';
            notification.style.backgroundColor = 'var(--primary-color)';
        }
        
        // Show notification
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }, 5000);
    }
}

// Enhanced consultation circle interactions
document.addEventListener('DOMContentLoaded', function() {
    const consultationCircles = document.querySelectorAll('.consultation-circle');
    
    consultationCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        circle.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Выбран формат консультации: ${title}. Свяжитесь с нами для записи!`);
        });
    });
});

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', function() {
    const psychologyCards = document.querySelectorAll('.psychology-card');
    
    psychologyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// CTA button interactions
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Начать консультацию')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToSection('contacts');
                showNotification('Заполните форму ниже, и мы свяжемся с вами для записи на консультацию!');
            });
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Form enhancement - real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const topicTextarea = document.getElementById('topic');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            }
        });
        
        emailInput.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    if (topicTextarea) {
        topicTextarea.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            let counter = this.parentNode.querySelector('.char-counter');
            
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter text-sm text-muted';
                counter.style.textAlign = 'right';
                counter.style.marginTop = '0.25rem';
                this.parentNode.appendChild(counter);
            }
            
            counter.textContent = `Осталось символов: ${Math.max(0, remaining)}`;
            
            if (remaining < 0) {
                counter.style.color = '#ef4444';
                this.style.borderColor = '#ef4444';
            } else {
                counter.style.color = 'var(--muted-color)';
                this.style.borderColor = 'var(--border-color)';
            }
        });
    }
});

// Performance optimization - lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Analytics simulation (replace with real analytics)
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics Event:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track consultation type clicks
    document.querySelectorAll('.consultation-circle').forEach(circle => {
        circle.addEventListener('click', function() {
            const consultationType = this.querySelector('h3').textContent;
            trackEvent('consultation_type_selected', {
                consultation_type: consultationType
            });
        });
    });
    
    // Track form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('contact_form_submitted', {
                page: window.location.pathname
            });
        });
    }
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    trackEvent('section_viewed', {
                        section: sectionId
                    });
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
});
