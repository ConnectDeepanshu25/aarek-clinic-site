// AaRek Fresh - Interactive JavaScript
// Modern, accessible, and performant interactions

class AaRekFresh {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupMenuFilters();
        this.setupVendingMachine();
        this.setupFormValidation();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.initializeIntersectionObserver();
        this.setupMobileEnhancements();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
    }

    onDOMReady() {
        // Add loaded class for CSS animations
        document.body.classList.add('page-loaded');
        
        // Initialize components that need DOM
        this.initializeComponents();
    }

    initializeComponents() {
        this.setupProductCarousel();
        this.setupStatsAnimation();
        this.setupTestimonialCarousel();
    }

    // Utility function for throttling
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Special handling for Cart button
                    if (link.classList.contains('cta-button') && targetId === '#menu') {
                        setTimeout(() => {
                            this.highlightMenuSection();
                        }, 500);
                    }
                }
            });
            
            // Prevent hover events from triggering clicks
            link.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
            });
        });
    }

    highlightMenuSection() {
        const menuSection = document.querySelector('#menu');
        if (menuSection) {
            menuSection.classList.add('highlight-section');
            setTimeout(() => {
                menuSection.classList.remove('highlight-section');
            }, 2000);
        }
    }

    // Mobile navigation toggle
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            // Touch-friendly hamburger menu
            hamburger.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent double-tap zoom
                this.toggleMobileMenu();
            });
            
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on swipe up
            let startY = 0;
            navMenu.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
            }, { passive: true });
            
            navMenu.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const diff = startY - currentY;
                
                if (diff > 50) { // Swipe up threshold
                    this.closeMobileMenu();
                }
            }, { passive: true });

            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
    }

    // Menu filtering functionality
    setupMenuFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                
                menuItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Vending machine product carousel
    setupVendingMachine() {
        const productItems = document.querySelectorAll('.product-item');
        let currentIndex = 0;

        if (productItems.length > 0) {
            const rotateProducts = () => {
                productItems[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % productItems.length;
                productItems[currentIndex].classList.add('active');
            };

            // Rotate products every 3 seconds
            setInterval(rotateProducts, 3000);
        }
    }

    // Product carousel setup
    setupProductCarousel() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }

    // Stats animation
    setupStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateStats = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (!isNaN(numericValue)) {
                        this.animateNumber(target, 0, numericValue, finalValue, 2000);
                        observer.unobserve(target);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(animateStats, {
            threshold: 0.5
        });

        stats.forEach(stat => observer.observe(stat));
    }

    // Number animation utility
    animateNumber(element, start, end, suffix, duration) {
        const startTime = Date.now();
        const originalText = element.textContent;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = originalText.includes('+') ? `${current}+` : 
                                 originalText.includes('K') ? `${current}K+` : 
                                 originalText.includes('/') ? `${current}/7` : 
                                 `${current}`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Testimonial carousel (if multiple testimonials)
    setupTestimonialCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length > 3) {
            // Add carousel functionality for mobile
            let currentSlide = 0;
            
            const createCarouselControls = () => {
                const container = document.querySelector('.testimonials-grid');
                const prevBtn = document.createElement('button');
                const nextBtn = document.createElement('button');
                
                prevBtn.className = 'carousel-btn prev-btn';
                nextBtn.className = 'carousel-btn next-btn';
                prevBtn.innerHTML = '‹';
                nextBtn.innerHTML = '›';
                
                container.parentNode.insertBefore(prevBtn, container);
                container.parentNode.appendChild(nextBtn);
                
                prevBtn.addEventListener('click', () => this.moveCarousel(-1));
                nextBtn.addEventListener('click', () => this.moveCarousel(1));
            };
            
            if (window.innerWidth <= 768) {
                createCarouselControls();
            }
        }
    }

    // Form validation
    setupFormValidation() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleFormSubmission(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Get form data
            const formData = {
                company_name: form.querySelector('#companyName').value,
                contact_name: form.querySelector('#contactName').value,
                employees: form.querySelector('#employees').value,
                message: form.querySelector('#message').value,
                to_email: 'aarekteam@gmail.com'
            };

            // Send email using EmailJS
            this.sendEmail(formData).then(() => {
                this.showNotification('Thank you! Your inquiry has been sent successfully. We\'ll be in touch soon.', 'success');
                form.reset();
            }).catch((error) => {
                console.error('Email sending failed:', error);
                this.showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at aarekteam@gmail.com', 'error');
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        } else {
            this.showNotification('Please fix the errors below', 'error');
        }
    }

    // Email sending function using EmailJS
    async sendEmail(formData) {
        try {
            // EmailJS configuration - Replace these with your actual EmailJS credentials
            const serviceID = 'default_service';
            const templateID = 'template_aarek';
            const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your EmailJS public key

            // Initialize EmailJS with your public key
            if (typeof emailjs !== 'undefined') {
                emailjs.init(publicKey);

                // Email template parameters
                const templateParams = {
                    to_email: 'aarekteam@gmail.com',
                    from_name: formData.contact_name,
                    company_name: formData.company_name,
                    employee_count: formData.employees,
                    message: formData.message,
                    subject: `Corporate Inquiry from ${formData.company_name}`
                };

                // Send email using EmailJS
                const response = await emailjs.send(serviceID, templateID, templateParams);
                console.log('Email sent successfully:', response);
                return response;
            } else {
                throw new Error('EmailJS not loaded');
            }
        } catch (error) {
            console.error('EmailJS error:', error);
            
            // Fallback to mailto link
            const subject = encodeURIComponent(`Corporate Inquiry from ${formData.company_name}`);
            const body = encodeURIComponent(`
Company: ${formData.company_name}
Contact Person: ${formData.contact_name}
Number of Employees: ${formData.employees}
Message: ${formData.message}

---
This inquiry was submitted through the AaRek Fresh website.
            `);

            // Create mailto link as fallback
            const mailtoLink = `mailto:aarekteam@gmail.com?subject=${subject}&body=${body}`;
            
            // Open default email client
            window.open(mailtoLink, '_blank');

            // Return resolved promise
            return Promise.resolve();
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: 'var(--secondary-green)',
            error: 'var(--coral)',
            info: 'var(--primary-teal)'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Intersection Observer for animations
    initializeIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.step, .benefit, .testimonial-card, .menu-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Handle scroll events
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Handle resize events
    handleResize() {
        // Recalculate any size-dependent layouts
        this.handleMobileLayout();
    }

    handleMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroStats) {
            if (isMobile) {
                heroStats.style.flexDirection = 'column';
            } else {
                heroStats.style.flexDirection = 'row';
            }
        }
    }

    // Animations
    initializeAnimations() {
        // Add entrance animations to key elements
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('[data-animate]');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        };

        window.addEventListener('scroll', this.throttle(animateOnScroll, 100));
        animateOnScroll(); // Run once on load
    }

    // Mobile-specific enhancements
    setupMobileEnhancements() {
        // Prevent zoom on iOS when focusing inputs
        this.preventIOSZoom();
        
        // Add touch feedback to buttons
        this.addTouchFeedback();
        
        // Optimize scrolling for mobile
        this.optimizeMobileScrolling();
        
        // Handle orientation changes
        this.handleOrientationChange();
        
        // Improve performance on mobile
        this.optimizeMobilePerformance();
    }

    preventIOSZoom() {
        // Prevent zoom on form input focus for iOS devices
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Ensure font-size is at least 16px to prevent zoom
            const computedStyle = window.getComputedStyle(input);
            const fontSize = parseFloat(computedStyle.fontSize);
            
            if (fontSize < 16) {
                input.style.fontSize = '16px';
            }
        });
    }

    addTouchFeedback() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .menu-item, .filter-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }

    optimizeMobileScrolling() {
        // Smooth scrolling optimization for mobile
        if ('scrollBehavior' in document.documentElement.style) {
            // Browser supports native smooth scrolling
            document.documentElement.style.scrollBehavior = 'smooth';
        }
        
        // Add momentum scrolling for iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Optimize scroll performance
        let ticking = false;
        
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }

    handleOrientationChange() {
        // Handle orientation changes on mobile devices
        window.addEventListener('orientationchange', () => {
            // Small delay to let the viewport adjust
            setTimeout(() => {
                this.handleMobileLayout();
                this.adjustForOrientation();
            }, 300);
        });
    }

    adjustForOrientation() {
        const isLandscape = window.orientation === 90 || window.orientation === -90;
        const hero = document.querySelector('.hero');
        const navbar = document.querySelector('.navbar');
        
        if (isLandscape && window.innerWidth <= 768) {
            // Landscape mobile adjustments
            if (hero) {
                hero.style.minHeight = 'auto';
                hero.style.padding = 'var(--spacing-lg) 0';
            }
            
            if (navbar) {
                navbar.style.height = '60px';
            }
        } else {
            // Portrait mobile adjustments
            if (hero) {
                hero.style.minHeight = '';
                hero.style.padding = '';
            }
            
            if (navbar) {
                navbar.style.height = '';
            }
        }
    }

    optimizeMobilePerformance() {
        // Disable animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Lazy load images on mobile
        this.lazyLoadImages();
        
        // Reduce background animations on mobile
        if (window.innerWidth <= 768) {
            const floatingElements = document.querySelectorAll('.floating-salad');
            floatingElements.forEach(element => {
                element.style.animationPlayState = 'paused';
            });
        }
    }

    lazyLoadImages() {
        // Implement lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Improved mobile navigation
    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            // Touch-friendly hamburger menu
            hamburger.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent double-tap zoom
                this.toggleMobileMenu();
            });
            
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on swipe up
            let startY = 0;
            navMenu.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
            }, { passive: true });
            
            navMenu.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const diff = startY - currentY;
                
                if (diff > 50) { // Swipe up threshold
                    this.closeMobileMenu();
                }
            }, { passive: true });

            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        document.body.style.overflow = '';
    }
}

// Initialize the application
const app = AaRekFresh.getInstance();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AaRekFresh;
}

// Additional CSS for JavaScript-enhanced features
const additionalStyles = `
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow-lg);
        padding: var(--spacing-md);
        border-radius: 0 0 var(--radius-md) var(--radius-md);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: var(--shadow-md);
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--coral);
        box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }

    .error-message {
        color: var(--coral);
        font-size: 0.875rem;
        margin-top: var(--spacing-xs);
    }

    .page-loaded .floating-salad {
        animation-play-state: running;
    }

    .animated {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .hamburger {
            display: flex !important;
        }
    }

    /* Loading states */
    .loading-btn {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .loading-btn:hover {
        transform: none;
    }

    /* Carousel controls for mobile testimonials */
    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: var(--primary-teal);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background 0.3s ease;
        z-index: 10;
    }

    .carousel-btn:hover {
        background: var(--primary-teal-dark);
    }

    .prev-btn {
        left: -20px;
    }

    .next-btn {
        right: -20px;
    }

    @media (max-width: 768px) {
        .testimonials {
            position: relative;
        }
        
        .testimonials-grid {
            overflow: hidden;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance monitoring
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('aarek-fresh-app-init-complete');
}

console.log('🥗 AaRek Fresh website loaded successfully!');