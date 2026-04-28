/* ============================================
   LOBA CONSULTING — MAIN SCRIPT
   ============================================ */

// ── Hero Image Slideshow ──────────────────────
const heroImages = document.querySelectorAll('.hero-img');
const heroDots   = document.querySelectorAll('.dot');
let currentIndex = 0;

function goToSlide(index) {
    heroImages[currentIndex].classList.remove('active');
    heroDots[currentIndex].classList.remove('active');
    currentIndex = (index + heroImages.length) % heroImages.length;
    heroImages[currentIndex].classList.add('active');
    heroDots[currentIndex].classList.add('active');
}

heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

if (heroImages.length > 0) {
    setInterval(() => goToSlide(currentIndex + 1), 3500);
}

// ── Mobile Nav Toggle ─────────────────────────
const navToggle  = document.querySelector('.nav-toggle');
const navLinks   = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function openNav() {
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.classList.add('nav-open');
}

function closeNav() {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.classList.remove('nav-open');
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        isOpen ? closeNav() : openNav();
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
}

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
});

// Close nav on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
});

// ── Sticky Header Shadow ──────────────────────
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ── Smooth Scrolling ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY
                         - (parseInt(getComputedStyle(document.documentElement)
                            .getPropertyValue('--nav-height')) || 72);
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// ── Tab Functionality (Avoid Pitfalls) ───────
const tabButtons  = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn  => btn.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
        const target = document.getElementById(button.getAttribute('data-tab'));
        if (target) target.classList.add('active');
    });
});

// ── FAQ Accordion ─────────────────────────────
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item   = question.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('open');
            el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ── What We Offer - Card Toggle ───────────────
document.querySelectorAll('.offer-card').forEach(card => {
    const btn = card.querySelector('.offer-details-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = card.classList.contains('active');
            
            // Close all other cards
            document.querySelectorAll('.offer-card').forEach(c => {
                c.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                card.classList.add('active');
            }
        });
    }
});

// Close offer details when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.offer-card')) {
        document.querySelectorAll('.offer-card').forEach(card => {
            card.classList.remove('active');
        });
    }
});

// ── Service Cards Toggle ─────────────────────
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't toggle if clicking on a link inside
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        document.querySelectorAll('.service-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Toggle current
        if (!isActive) {
            card.classList.add('active');
        }
    });
});

// Close service details when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.remove('active');
        });
    }
});

// ── Scroll Reveal Animation ───────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

// Animate section containers and key elements
const revealTargets = [
    '.section-header',
    '.services-grid .service-card',
    '.steps-track .step-item',
    '.features-grid .feature-item',
    '.testimonial-card',
    '.pricing-card',
    '.faq-item',
    '.stat-box',
    '.about-body',
    '.pitfall-card',
    '.contact-grid > *',
    '.payment-details',
    '.portfolio-banner-inner',
    '.offer-card'
];

revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('animate-in');
        // Stagger children within grids
        el.style.transitionDelay = `${Math.min(i * 0.07, 0.42)}s`;
        revealObserver.observe(el);
    });
});

// ── Contact Form Handling ─────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('formMessage');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Collect form data
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            service_type: form.service_type.value,
            message: form.message.value.trim()
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                throw new Error(result.error || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// ── Service Inquiry Form Handling ─────────────
const serviceForm = document.getElementById('serviceForm');

if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('formMessage');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Collect form data
        const formData = {
            service_name: form.service_name.value,
            client_name: form.client_name.value.trim(),
            client_email: form.client_email.value.trim(),
            client_phone: form.client_phone.value.trim(),
            project_details: form.project_details.value.trim(),
            budget_range: form.budget_range.value,
            deadline: form.deadline.value
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your inquiry has been submitted. We will contact you soon.';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                throw new Error(result.error || 'Failed to submit inquiry');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Sorry, there was an error submitting your inquiry. Please try again or contact us directly.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}
