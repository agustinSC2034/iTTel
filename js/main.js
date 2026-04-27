// Main JavaScript for iTTel Website



document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        // Más rápido en desktop
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0,
        // Desactivar en mobile por viewport
        disable: function() { return window.innerWidth <= 768; }
    });
    
    // Initialize all components
    initNavigation();
    initHero();
    initInnovationTech(); // Nueva función para la sección innovadora
    initStats();
    initProjectsFull();
    initClients();
    initContactForm(); // Nueva función para el formulario de contacto
    initInnovationParticles(); // Partículas en IT & TELCO
    initScrollEffects();
    initBackToTop();
    initLanguageSelector();
    initProjectsInteractive(); // Nueva funcionalidad de slices interactivos
    //initItGallery(); // Galería anterior deshabilitada al reemplazar 'Obras en Campo'
    initModalImageFullscreen(); // Fullscreen imagen en modal
    initObrasGallery(); // Nueva galería de Obras en Campo
    initImageStoryCarousels();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarGlass = document.querySelector('.navbar-glass'); // Soporte para navbar glass
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-glass'); // Soporte para ambos tipos
    
    // Navbar scroll effect (para ambos tipos de navbar)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
            if (navbarGlass) navbarGlass.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (navbarGlass) navbarGlass.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Update active link
                updateActiveNavLink(link);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Hero section functionality
function initHero() {
    const hero = document.querySelector('.hero-image');
    const heroCopy = document.querySelector('.hero-image__copy');
    if (!hero) return;

    document.body.classList.add('hero-image-active');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (heroCopy && scrolled < window.innerHeight) {
            heroCopy.style.transform = `translateY(${Math.min(scrolled * 0.14, 36)}px)`;
        }
    });
}

// Statistics counter animation
function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number, .stat-v2-number');
    if (statNumbers.length === 0) return;

    const formatStatValue = (value) => {
        if (!Number.isFinite(value)) return '0';
        if (!Number.isInteger(value)) return value.toFixed(2);
        return Math.floor(value).toLocaleString('es-AR');
    };

    const animateStat = (stat) => {
        if (stat.dataset.animated === 'true') return;

        const target = parseFloat(stat.getAttribute('data-target'));
        if (!Number.isFinite(target)) return;

        stat.dataset.animated = 'true';

        const duration = 1400;
        const startTime = performance.now();

        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = target * easedProgress;

            stat.textContent = formatStatValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                stat.textContent = formatStatValue(target);
            }
        };

        requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
        statNumbers.forEach(animateStat);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

function initSuccessCaseModal() {
    const modal = document.getElementById('success-case-modal');
    const overlay = document.getElementById('success-case-modal-overlay');
    const closeButton = document.getElementById('success-case-modal-close');
    const title = document.getElementById('success-case-modal-title');
    const image = document.getElementById('success-case-modal-image');
    const video = document.getElementById('success-case-modal-video');
    const description = document.getElementById('success-case-modal-description');
    const triggers = document.querySelectorAll('.success-case-modal-btn');
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
    const assetBase = isEnglish ? '../' : '';

    if (!modal || triggers.length === 0) return;

    const cases = {
        ausa: {
            title: isEnglish ? 'ITTEL – AUSA Agreement' : 'Acuerdo ITTEL – AUSA',
            video: `${assetBase}assets/video/videoIttel2.mp4`,
            description: isEnglish
                ? `<p>We manage more than <strong>1,000 km</strong> of leased lines and <strong>100+</strong> antenna structures distributed across strategic highways and avenues in Buenos Aires City.</p><p>This deployment integrates the city’s most relevant TELCO infrastructure, ensuring critical connectivity and an <strong>SLA &gt; 99.9%</strong> with 24×7×365 support.</p><p>Design, implementation and operations under high-availability standards.</p>`
                : `<p>Gestionamos más de <strong>1.000 km</strong> de hilos arrendados y <strong>100+</strong> estructuras de antenas distribuidas a lo largo de autopistas y avenidas estratégicas de CABA.</p><p>Este despliegue integra la infraestructura TELCO más relevante de la ciudad, asegurando conectividad crítica y un <strong>SLA &gt; 99,9%</strong> con atención 24×7×365.</p><p>Diseño, implementación y operación bajo estándares de alta disponibilidad.</p>`
        },
        aubasa: {
            title: isEnglish ? 'ITTEL – AUBASA Agreement' : 'Acuerdo ITTEL – AUBASA',
            image: `${assetBase}assets/images/proyectos/ruta_AUBASA.webp`,
            description: isEnglish
                ? `<p>Implementation of a <strong>redundant fiber optic</strong> network that acts as a strategic <strong>backbone</strong> between Buenos Aires City and La Plata.</p><p>Core highway services coexist with transmission services for TELCO clients.</p><p>By connecting to our network, we provide <strong>Dark Fiber</strong> between CABASE and the La Plata NAP, as well as a safer redundant path to the international gateway at Las Toninas.</p><p>The route runs alongside multiple towns and gated communities; the project includes road-safety and environmental commitments.</p><ul><li>Contractual SLA above <strong>99.99%</strong>.</li><li>On-site crew with immediate response time.</li><li>Leasing of support structures for mobile and wireless networks.</li></ul>`
                : `<p>Implementación de una red de <strong>fibra óptica</strong> con topología <strong>redundante</strong> que opera como <strong>backbone</strong> estratégico entre CABA y La Plata.</p><p>Conviven los servicios CORE que requiere la Autopista con servicios de transmisión para Clientes TELCO.</p><p>Al empalmar con nuestra red, ofrecemos <strong>Fibra Oscura</strong> entre CABASE y el NAP La Plata, además de un camino redundante y más seguro hacia la salida internacional (Las Toninas).</p><p>El trazado lindera con múltiples localidades y barrios privados; el proyecto contempla Seguridad Vial y compromiso ambiental.</p><ul><li>SLA contractual &gt; <strong>99,99%</strong>.</li><li>Cuadrilla in situ con TRS inmediato.</li><li>Alquiler de estructuras portantes para redes móviles e inalámbricas.</li></ul>`
        }
    };

    const openModal = (caseKey) => {
        const data = cases[caseKey];
        if (!data) return;

        title.textContent = data.title;
        description.innerHTML = data.description;

        if (data.image) {
            image.style.display = 'block';
            image.src = data.image;
            image.alt = data.title;
        } else {
            image.style.display = 'none';
            image.removeAttribute('src');
        }

        if (data.video) {
            video.style.display = 'block';
            video.src = data.video;
            video.muted = false;
            video.volume = 1;
        } else {
            video.pause();
            video.style.display = 'none';
            video.removeAttribute('src');
            video.load();
        }

        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        video.pause();
        modal.classList.remove('show');
        modal.classList.remove('hiding');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const bindPress = (element, handler) => {
        if (!element) return;

        let lastTouchTime = 0;

        element.addEventListener('touchend', (event) => {
            lastTouchTime = Date.now();
            event.preventDefault();
            handler(event);
        }, { passive: false });

        element.addEventListener('click', (event) => {
            if (Date.now() - lastTouchTime < 500) return;
            handler(event);
        });
    };

    triggers.forEach(trigger => {
        bindPress(trigger, () => openModal(trigger.dataset.case));
    });

    bindPress(closeButton, closeModal);
    bindPress(overlay, closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Projects carousel functionality
function initProjects() {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.project-dot');
    const prevBtn = document.getElementById('project-prev');
    const nextBtn = document.getElementById('project-next');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 8000);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Clients carousel functionality
function initClients() {
    const clientsTrack = document.getElementById('clients-track');
    if (!clientsTrack) return;

    const originalLogos = Array.from(clientsTrack.querySelectorAll('.client-logo'));
    if (originalLogos.length === 0) return;

    if (!clientsTrack.dataset.cloned) {
        originalLogos.forEach((logo) => {
            const clone = logo.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clientsTrack.appendChild(clone);
        });
        clientsTrack.dataset.cloned = 'true';
    }

    const updateClientsCarousel = () => {
        const allLogos = Array.from(clientsTrack.querySelectorAll('.client-logo'));
        const visibleOriginals = allLogos.slice(0, allLogos.length / 2);
        if (visibleOriginals.length === 0) return;

        const styles = window.getComputedStyle(clientsTrack);
        const gap = parseFloat(styles.columnGap || styles.gap || '0');
        const distance = visibleOriginals.reduce((sum, logo) => {
            return sum + logo.getBoundingClientRect().width;
        }, 0) + gap * Math.max(visibleOriginals.length - 1, 0);

        const pixelsPerSecond = window.innerWidth <= 768 ? 210 : 260;
        const duration = Math.max(distance / pixelsPerSecond, 8);

        clientsTrack.style.setProperty('--clients-scroll-distance', `${distance}px`);
        clientsTrack.style.setProperty('--clients-scroll-duration', `${duration}s`);
        clientsTrack.style.animationPlayState = 'running';
    };

    const logoLoadPromises = Array.from(clientsTrack.querySelectorAll('.client-logo')).map((logo) => {
        if (logo.complete) return Promise.resolve();
        return new Promise((resolve) => {
            logo.addEventListener('load', resolve, { once: true });
            logo.addEventListener('error', resolve, { once: true });
        });
    });

    Promise.all(logoLoadPromises).then(updateClientsCarousel);

    clientsTrack.addEventListener('mouseenter', () => {
        clientsTrack.style.animationPlayState = 'paused';
    });

    clientsTrack.addEventListener('mouseleave', () => {
        clientsTrack.style.animationPlayState = 'running';
    });

    clientsTrack.addEventListener('touchstart', () => {
        clientsTrack.style.animationPlayState = 'paused';
    }, { passive: true });

    clientsTrack.addEventListener('touchend', () => {
        clientsTrack.style.animationPlayState = 'running';
    });

    window.addEventListener('resize', debounce(updateClientsCarousel, 200));
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.mission-card, .services-image, .services-text, .strategy-point, .contact-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS class for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Language selector functionality (SIMPLIFICADA PARA SITIO ESTÁTICO)
function initLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    
    // Validamos que existan los elementos
    if (!languageBtn || !languageDropdown) return;
    
    // ELIMINAMOS TODA LA LÓGICA DE LOCALSTORAGE Y TRADUCCIÓN AUTOMÁTICA
    // Ya no queremos que JS decida qué bandera mostrar al inicio.
    // El HTML de cada página (es/en) ya tiene la bandera correcta.

    // Toggle dropdown (Abrir/Cerrar menú)
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
    });
    
    // NOTA: Ya no necesitamos los listeners para los clicks en las opciones
    // porque ahora son enlaces <a> normales que llevan a otra URL.
}

// Puedes borrar o comentar las funciones updateLanguageButton y applyTranslations 
// ya que no se usarán más, o dejarlas ahí (no harán daño si no se llaman).

function updateLanguageButton(lang) {
    const languageBtn = document.getElementById('language-btn');
    if (!languageBtn) return;
    
    const flagImg = languageBtn.querySelector('.flag-icon');
    const span = languageBtn.querySelector('span');
    
    if (lang === 'es') {
        if (flagImg) flagImg.src = 'https://flagcdn.com/w20/ar.png';
        if (span) span.textContent = 'ARG';
    } else {
        if (flagImg) flagImg.src = 'https://flagcdn.com/w20/us.png';
        if (span) span.textContent = 'ENG';
    }
}

function applyTranslations(lang) {
    if (!window.translations || !translations[lang]) {
        console.warn('Translations not loaded');
        return;
    }
    
    const t = translations[lang];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link-glass');
    // Orden debe coincidir con los links en el DOM
    const navKeys = ['inicio', 'nosotros', 'servicios', 'proyectos', 'clientes', 'contacto'];
    navLinks.forEach((link, index) => {
        const key = `nav.${navKeys[index]}`;
        if (t[key]) link.textContent = t[key];
    });
    
    // Update project slices (interactive projects)
    const slices = document.querySelectorAll('.project-slice');
    const isEnglish = lang === 'en';
    slices.forEach(slice => {
        const titleEs = slice.getAttribute('data-title');
        const titleEn = slice.getAttribute('data-title-en');
        const briefEs = slice.getAttribute('data-brief-es');
        const briefEn = slice.getAttribute('data-brief-en');
        const descEs = slice.getAttribute('data-description');
        const descEn = slice.getAttribute('data-description-en');
        const descMobileEs = slice.getAttribute('data-description-mobile');
        const descMobileEn = slice.getAttribute('data-description-mobile-en');

        // Update visible content in slice
        const detailTitle = slice.querySelector('.slice-detail-title');
        const detailDesc = slice.querySelector('.slice-detail-desc');
        
        if (detailTitle) {
            detailTitle.textContent = isEnglish && titleEn ? titleEn : titleEs || '';
        }
        if (detailDesc) {
            detailDesc.textContent = isEnglish && briefEn ? briefEn : briefEs || '';
        }
        
        // Store current language descriptions for modal
        slice.setAttribute('data-current-title', isEnglish && titleEn ? titleEn : titleEs || '');
        slice.setAttribute('data-current-description', isEnglish && descEn ? descEn : descEs || '');
        if (descMobileEs || descMobileEn) {
            slice.setAttribute('data-current-description-mobile', isEnglish && descMobileEn ? descMobileEn : descMobileEs || '');
        }
    });
    
    // Update stats section
    const statItems = document.querySelectorAll('.stat-v2-item');
    statItems.forEach((item, index) => {
        const label = item.querySelector('.stat-v2-label');
        if (!label) return;
        
        const br = label.querySelector('br');
        if (!br) return;
        
        // Parse current structure
        const parts = label.innerHTML.split('<br>');
        if (parts.length !== 2) return;
        
        let firstPart = parts[0].trim();
        let secondPart = parts[1].trim();
        
        // Update based on index
        if (index === 0) { // Years
            firstPart = lang === 'es' ? '+ Años de' : '+ Years of';
            secondPart = lang === 'es' ? 'experiencia' : 'experience';
        } else if (index === 1) { // Projects
            firstPart = lang === 'es' ? '+ Proyectos' : '+ Successful';
            secondPart = lang === 'es' ? 'de éxito' : 'Projects';
        } else if (index === 2) { // SLA
            firstPart = lang === 'es' ? '% de SLA' : '% SLA';
            secondPart = lang === 'es' ? 'garantizado' : 'guaranteed';
        }
        
        label.innerHTML = `${firstPart}<br>${secondPart}`;
    });
    
    // Update modal buttons if modal exists
    const modalReadMore = document.querySelectorAll('.open-modal-btn');
    modalReadMore.forEach(btn => {
        btn.textContent = lang === 'es' ? 'Ver Más' : 'Read More';
    });
    
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.setAttribute('aria-label', lang === 'es' ? 'Cerrar' : 'Close');
    }
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
window.addEventListener('scroll', throttle(() => {
    // Throttled scroll events to improve performance
}, 16)); // ~60fps

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to content functionality
    if (e.key === 'Tab' && !document.querySelector('.skip-link:focus')) {
        // Add skip link if not present
        const skipLink = document.createElement('a');
        skipLink.href = '#nosotros';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #227db3;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// Reduced motion support
// Innovation Tech Section functionality
function initInnovationTech() {
    // Typing animation for subtitle - se activa cuando el usuario llega a la sección
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.getAttribute('data-text') || '';
        let isAnimating = false;
        
        // Observer para detectar cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimating) {
                    isAnimating = true;
                    startTypingAnimation();
                }
            });
        }, { threshold: 0.3 });
        
        // Observar la sección
        const innovationSection = document.querySelector('.innovation-tech');
        if (innovationSection) {
            observer.observe(innovationSection);
        }
        
        function startTypingAnimation() {
            let index = 0;
            let isDeleting = false;
            const typeSpeed = 40;
            const deleteSpeed = 25;
            const pauseTime = 2000;
            
            function typeEffect() {
                if (!isDeleting) {
                    // Escribiendo
                    typingText.textContent = text.slice(0, index + 1);
                    index++;
                    
                    if (index >= text.length) {
                        isDeleting = true;
                        setTimeout(typeEffect, pauseTime);
                    } else {
                        setTimeout(typeEffect, typeSpeed);
                    }
                } else {
                    // Borrando
                    typingText.textContent = text.slice(0, index);
                    index--;
                    
                    if (index < 0) {
                        isDeleting = false;
                        setTimeout(typeEffect, 500);
                    } else {
                        setTimeout(typeEffect, deleteSpeed);
                    }
                }
            }
            
            typeEffect();
        }
    }

    // Enhanced card hover effects (sutiles)
    const innovationCards = document.querySelectorAll('.innovation-card');
    innovationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const floatingIcon = card.querySelector('.floating-icon');
            if (floatingIcon) {
                floatingIcon.style.transform = 'translateY(-6px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const floatingIcon = card.querySelector('.floating-icon');
            if (floatingIcon) {
                floatingIcon.style.transform = '';
            }
        });
    });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable auto-playing carousel for users who prefer reduced motion
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsSection.style.animation = 'none';
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// =============================================
// FORMULARIO DE CONTACTO MODERNO
// =============================================
// =============================================
// FORMULARIO DE CONTACTO (CORREGIDO)
// =============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar reCAPTCHA
        if (typeof grecaptcha === 'undefined') {
             showNotification('Error al cargar reCAPTCHA', 'error');
             return;
        }
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showNotification('Por favor completa el reCAPTCHA', 'error');
            return;
        }
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.nombre || !data.email || !data.mensaje) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Obtener el botón submit
        const submitBtn = contactForm.querySelector('button[type="submit"], .btn-primary') || contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Crear FormData para envío
        const formDataToSend = new FormData(contactForm);
        
        // --- AQUÍ ESTÁ LA MAGIA PARA QUE FUNCIONE EN LOS DOS IDIOMAS ---
        // Si la URL tiene '/en/', buscamos el PHP una carpeta atrás (../contacto.php)
        // Si no, buscamos en la misma carpeta (contacto.php)
        const contactUrl = '/contacto.php';
        
        // Enviar al servidor PHP
        fetch(contactUrl, {
            method: 'POST',
            body: formDataToSend
        })
        .then(response => {
            // Primero obtener el texto de la respuesta
            return response.text().then(text => {
                try {
                    // Intentar parsear como JSON
                    const json = JSON.parse(text);
                    return { ok: response.ok, data: json };
                } catch (e) {
                    console.error('Respuesta del servidor no es JSON:', text);
                    throw new Error('Error en el servidor. Respuesta inesperada.');
                }
            });
        })
        .then(({ ok, data }) => {
            if (data.success) {
                showNotification(data.message, 'success');
                contactForm.reset();
                if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
            } else {
                showNotification(data.message || 'Error al enviar el mensaje', 'error');
                if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
            }
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error de conexión o del servidor. Intenta más tarde.', 'error');
            if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Efectos visuales inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() { this.parentElement.classList.add('focused'); });
        input.addEventListener('blur', function() { if (!this.value) this.parentElement.classList.remove('focused'); });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-size: 14px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
        font-size: 12px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove después de 5 segundos
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Botón de cierre
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Console message for developers

// ==============================
// Utilidad viewport
function isInViewport(el){
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top <= vh*0.8 && r.bottom >= vh*0.2;
}

// ==============================
// Slider de proyectos full-screen pinneado
function initProjectsFull(){
    const section = document.getElementById('proyectos');
    const bullets = document.querySelectorAll('.nav-bullet');
    const slides = document.querySelectorAll('.project-slide');
    
    if(!section || bullets.length === 0 || slides.length === 0) return;

    // Limpiar event listeners anteriores para evitar duplicados
    const newSection = section.cloneNode(true);
    section.parentNode.replaceChild(newSection, section);
    const sectionRef = document.getElementById('proyectos'); // Obtener nueva referencia

    let index = 0;
    let isAnimating = false;
    let isProjectsActive = false;
    let scrollDirection = 0;

    // Establecer altura total para scroll-pin
    const totalHeight = window.innerHeight * (slides.length + 2); // +2 para entrada y salida
    sectionRef.style.height = totalHeight + 'px';

    const setActive = (i) => {
        if(i < 0 || i >= slides.length || isAnimating) return;
        
        isAnimating = true;
        
        // Remover active de todos con animación stagger
        slides.forEach((s, idx) => {
            s.classList.remove('active', 'prev', 'next');
            if(idx < i) s.classList.add('prev');
            if(idx > i) s.classList.add('next');
        });
        bullets.forEach(b => b.classList.remove('active'));
        
        // Animación de entrada del slide actual
        setTimeout(() => {
            slides[i].classList.add('active');
            bullets[i]?.classList.add('active');
            index = i;
        }, 200);
        
        setTimeout(() => isAnimating = false, 1000);
    };

    // Función para detectar si estamos en la sección de proyectos
    const checkProjectsInView = () => {
        const rect = sectionRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Está completamente visible cuando top <= 0 y bottom >= windowHeight
        return rect.top <= 0 && rect.bottom >= windowHeight;
    };

    // Scroll principal del documento
    let lastScrollY = window.pageYOffset;
    
    const handleScroll = () => {
        const currentScrollY = window.pageYOffset;
        scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
        lastScrollY = currentScrollY;
        
        const rect = sectionRef.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        
        // Determinar slide basado en progreso
        const targetSlide = Math.floor(progress * slides.length);
        
        if(checkProjectsInView()) {
            if(!isProjectsActive) {
                isProjectsActive = true;
                document.body.style.overflow = 'hidden';
                setActive(Math.max(0, Math.min(slides.length - 1, targetSlide)));
            }
        } else {
            if(isProjectsActive) {
                isProjectsActive = false;
                document.body.style.overflow = 'auto';
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    // Navegación con wheel cuando está activa la sección
    const handleWheel = (e) => {
        if(!isProjectsActive || isAnimating) return;
        
        e.preventDefault();
        const dir = Math.sign(e.deltaY);
        
        if(dir > 0 && index < slides.length - 1) {
            // Scroll hacia abajo - siguiente proyecto
            setActive(index + 1);
        } else if(dir < 0 && index > 0) {
            // Scroll hacia arriba - proyecto anterior
            setActive(index - 1);
        } else if(dir > 0 && index === slides.length - 1) {
            // Salir de la sección hacia abajo
            isProjectsActive = false;
            document.body.style.overflow = 'auto';
            window.scrollTo(0, sectionRef.offsetTop + sectionRef.offsetHeight);
        } else if(dir < 0 && index === 0) {
            // Salir de la sección hacia arriba
            isProjectsActive = false;
            document.body.style.overflow = 'auto';
            window.scrollTo(0, sectionRef.offsetTop - window.innerHeight);
        }
    };
    
    sectionRef.addEventListener('wheel', handleWheel, {passive: false});

    // Touch para mobile
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e) => {
        if(!isProjectsActive) return;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    };
    
    const handleTouchMove = (e) => {
        if(!isProjectsActive || isAnimating) return;
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        const deltaTime = Date.now() - touchStartTime;
        
        if(Math.abs(deltaY) < 50 || deltaTime < 100) return;
        
        e.preventDefault();
        
        if(deltaY > 0 && index < slides.length - 1) {
            setActive(index + 1);
        } else if(deltaY < 0 && index > 0) {
            setActive(index - 1);
        }
    };
    
    sectionRef.addEventListener('touchstart', handleTouchStart, {passive: true});
    sectionRef.addEventListener('touchmove', handleTouchMove, {passive: false});

    // Navegación por bullets
    bullets.forEach((bullet, i) => {
        bullet.addEventListener('click', () => {
            if(i !== index && isProjectsActive) setActive(i);
        });
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if(!isProjectsActive || isAnimating) return;
        
        if(e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if(index < slides.length - 1) setActive(index + 1);
        } else if(e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if(index > 0) setActive(index - 1);
        } else if(e.key === 'Escape') {
            isProjectsActive = false;
            document.body.style.overflow = 'auto';
        }
    });

    // Auto-iniciar el primer slide
    setActive(0);
}

// ==============================
// Partículas sutiles en IT & TELCO - FUNCIÓN DESHABILITADA
function initInnovationParticles(){
    // Esta función está deshabilitada porque las partículas rompían el diseño
    return;
    /*
    const canvas = document.getElementById('particles-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr = window.devicePixelRatio || 1;
    let particles = [];
    const COUNT = 60; // sutil

    function resize(){
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    window.addEventListener('resize', resize);
    resize();

    function rand(a,b){return Math.random()*(b-a)+a}
    for(let i=0;i<COUNT;i++){
        particles.push({
            x: rand(0, w), y: rand(0, h),
            vx: rand(-0.2, 0.2), vy: rand(-0.2, 0.2), r: rand(1, 2.2)
        });
    }

    function step(){
        ctx.clearRect(0,0,w,h);
        // vínculos
        for(let i=0;i<particles.length;i++){
            const p = particles[i];
            for(let j=i+1;j<particles.length;j++){
                const q = particles[j];
                const dx=p.x-q.x, dy=p.y-q.y; const dist=Math.hypot(dx,dy);
                if(dist<120){
                    ctx.strokeStyle = 'rgba(0, 180, 255, ' + (0.16*(1-dist/120)) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
                }
            }
        }
        // puntos
        for(const p of particles){
            p.x += p.vx; p.y += p.vy;
            if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
            ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
        requestAnimationFrame(step);
    }
    step();
    */
}

// Sección de Proyectos Interactiva - Slices y Modal
function initProjectsInteractive() {
    // --- Interactive Project Slices ---
    const projectSlices = document.querySelectorAll('.project-slice');
    const projectNavPrev = document.querySelector('.project-nav-prev');
    const projectNavNext = document.querySelector('.project-nav-next');
    let currentProjectIndex = 0;
    
    if (projectSlices.length > 0) {
        // Función para actualizar los botones de navegación
        const updateNavButtons = () => {
            if (projectNavPrev) {
                projectNavPrev.disabled = currentProjectIndex === 0;
            }
            if (projectNavNext) {
                projectNavNext.disabled = currentProjectIndex === projectSlices.length - 1;
            }
        };
        
        // Función para encontrar el índice del slice activo
        const findActiveIndex = () => {
            for (let i = 0; i < projectSlices.length; i++) {
                if (projectSlices[i].classList.contains('active')) {
                    return i;
                }
            }
            return 0;
        };
        
        // Event listeners para clicks en slices (funcionalidad original)
        projectSlices.forEach((slice, index) => {
            slice.addEventListener('click', (e) => {
                // Ignorar clicks en botones "Ver Más" y enlaces
                if (e.target.closest('.open-modal-btn') || e.target.closest('.slice-links')) {
                    return;
                }
                
                // Remover clase active de todos los slices
                projectSlices.forEach(s => s.classList.remove('active'));
                
                // Agregar clase active al slice clickeado
                slice.classList.add('active');
                
                // Actualizar el índice actual
                currentProjectIndex = index;
                updateNavButtons();
            });
        });
        
        // Event listeners para botones de navegación
        if (projectNavPrev) {
            projectNavPrev.addEventListener('click', () => {
                if (currentProjectIndex > 0) {
                    const newIndex = currentProjectIndex - 1;
                    projectSlices.forEach(s => s.classList.remove('active'));
                    projectSlices[newIndex].classList.add('active');
                    currentProjectIndex = newIndex;
                    updateNavButtons();
                }
            });
        }
        
        if (projectNavNext) {
            projectNavNext.addEventListener('click', () => {
                if (currentProjectIndex < projectSlices.length - 1) {
                    const newIndex = currentProjectIndex + 1;
                    projectSlices.forEach(s => s.classList.remove('active'));
                    projectSlices[newIndex].classList.add('active');
                    currentProjectIndex = newIndex;
                    updateNavButtons();
                }
            });
        }
        
        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (!projectSlices.length) return;
            
            const projectsSection = document.getElementById('proyectos');
            if (!projectsSection) return;
            
            const sectionRect = projectsSection.getBoundingClientRect();
            const isInViewport = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
            
            if (!isInViewport) return;

            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentProjectIndex > 0) {
                    const newIndex = currentProjectIndex - 1;
                    projectSlices.forEach(s => s.classList.remove('active'));
                    projectSlices[newIndex].classList.add('active');
                    currentProjectIndex = newIndex;
                    updateNavButtons();
                }
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentProjectIndex < projectSlices.length - 1) {
                    const newIndex = currentProjectIndex + 1;
                    projectSlices.forEach(s => s.classList.remove('active'));
                    projectSlices[newIndex].classList.add('active');
                    currentProjectIndex = newIndex;
                    updateNavButtons();
                }
            }
        });
        
        // Inicializar: encontrar el slice activo actual y configurar los botones
        currentProjectIndex = findActiveIndex();
        updateNavButtons();
    }

    // --- Mobile expandable cards (en lugar de modal) ---
    const enableMobileExpand = () => {
        if (window.innerWidth > 768) return; // sólo mobile
        
        // Cambiar imagen de fondo de USITTEL solo en móvil
        document.querySelectorAll('.project-slice').forEach(slice => {
            const title = slice.dataset.title || '';
            if (title.includes('USITTEL')) {
                const bgImg = slice.querySelector('.slice-bg');
                if (bgImg) {
                    bgImg.src = 'assets/images/proyectos/USITTEL_horizontal.png';
                }
            }
        });
        
        document.querySelectorAll('.project-slice').forEach((slice, sliceIndex) => {
            const indicator = slice.querySelector('.slice-expand-indicator');
            if (!indicator) return;

            // Crear contenedor de expansión único por slice si no existe
            let expandedContent = slice.nextElementSibling;
            if (!expandedContent || !expandedContent.classList.contains('mobile-expanded-content')) {
                expandedContent = document.createElement('div');
                expandedContent.className = 'mobile-expanded-content';
                expandedContent.setAttribute('aria-hidden', 'true');
                expandedContent.innerHTML = `
                    <button class="mobile-close-btn" aria-label="Cerrar"><i class="fas fa-times"></i></button>
                    <div class="content-wrapper"></div>
                `;
                slice.parentNode.insertBefore(expandedContent, slice.nextSibling);
                
                // Event listener para botón de cierre
                const closeBtn = expandedContent.querySelector('.mobile-close-btn');
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    collapseContent(slice, expandedContent, indicator);
                });
            }

            const renderContent = () => {
                // Determinar idioma actual desde localStorage (fallback 'es')
                const lang = (localStorage.getItem('language') || 'es').toLowerCase();
                const isEn = lang === 'en';
                let html = '';
                const img = slice.dataset.image;
                const video = slice.dataset.video;
                let desc = '';
                
                // Debug: verificar datos
                // Usar versiones móviles más concisas
                if (isEn) {
                    desc = slice.dataset.descriptionMobileEn || slice.dataset.descriptionEn || slice.dataset.description || '';
                } else {
                    desc = slice.dataset.descriptionMobile || slice.dataset.description || '';
                }

                // Si no hay versión móvil, crear una más concisa
                if (!slice.dataset.descriptionMobile && !slice.dataset.descriptionMobileEn) {
                    // Versiones concisas para móvil según el proyecto
                    const title = slice.dataset.title || '';
                    if (title.includes('AUSA')) {
                        desc = isEn 
                            ? `<p>Comprehensive TELCO infrastructure management in Buenos Aires City with <strong>SLA > 99.9%</strong> and 24×7×365 support.</p><p><strong>Key achievements:</strong> 1,000+ km leased lines, 100+ antenna structures across strategic highways.</p>`
                            : `<p>Gestión integral de infraestructura TELCO en CABA con <strong>SLA > 99,9%</strong> y atención 24×7×365.</p><p><strong>Logros clave:</strong> 1.000+ km de hilos arrendados, 100+ estructuras de antenas en autopistas estratégicas.</p>`;
                    } else if (title.includes('AUBASA')) {
                        desc = isEn 
                            ? `<p><strong>Redundant fiber network</strong> between Buenos Aires and La Plata acting as strategic backbone.</p><p><strong>Services:</strong> Dark Fiber between CABASE and La Plata NAP, redundant path to international gateway.</p><p><strong>SLA:</strong> > 99.99% with on-site crew.</p>`
                            : `<p><strong>Red de fibra óptica redundante</strong> entre CABA y La Plata que funciona como backbone estratégico.</p><p><strong>Servicios:</strong> Fibra Oscura entre CABASE y NAP La Plata, camino redundante hacia salida internacional.</p><p><strong>SLA:</strong> > 99,99% con cuadrilla in situ.</p>`;
                    } else if (title.includes('ADIFSE')) {
                        desc = isEn 
                            ? `<p><strong>Railway infrastructure assessment</strong> project for ADIF S.E telecommunications network development.</p><p>Comprehensive survey of available infrastructure, current status, occupation levels and development potential for sustainable growth.</p>`
                            : `<p><strong>Relevamiento de infraestructura ferroviaria</strong> para desarrollo de redes de telecomunicaciones de ADIF S.E.</p><p>Evaluación integral de infraestructura disponible, estado actual, ocupación y potencial de desarrollo sustentable.</p>`;
                    } else if (title.includes('USITTEL')) {
                        desc = isEn 
                            ? `<p><strong>High-speed Internet and Digital TV</strong> service in alliance with La Usina de Tandil.</p><p>Cutting-edge technology with strategic coverage in urban and rural areas. More info: www.usittel.com.ar</p>`
                            : `<p><strong>Internet de alta velocidad y TV Digital</strong> desarrollado en alianza con La Usina de Tandil.</p><p>Tecnología de vanguardia con cobertura estratégica en zonas urbanas y rurales. Más info: www.usittel.com.ar</p>`;
                    }
                }

                if (img) {
                    const title = slice.dataset.title || '';
                    const isAubasa = title.includes('AUBASA');
                    
                    if (isAubasa) {
                        // Para AUBASA, agregar botón de pantalla completa
                        html += `<div style="margin-bottom:15px; position:relative; display:inline-block;">
                            <img src="${img}" alt="${slice.dataset.title}" style="width:100%;height:auto;border-radius:8px;" class="mobile-expandable-img"/>
                            <button class="mobile-fullscreen-btn" aria-label="Ver en pantalla completa" style="position:absolute; top:10px; right:10px; background:rgba(17,24,39,.8); color:#fff; border:none; border-radius:8px; padding:8px 10px; cursor:pointer; z-index:100; opacity:0.9;">
                                <i class="fas fa-expand" style="font-size:14px;"></i>
                            </button>
                        </div>`;
                    } else {
                        html += `<div style="margin-bottom:15px"><img src="${img}" alt="${slice.dataset.title}" style="width:100%;height:auto;border-radius:8px;"/></div>`;
                    }
                }
                if (video && !img) {
                    // Añadir poster específico para el video de AUSA
                    const poster = video.includes('ausa.mp4') ? 'assets/images/proyectos/acuerdo_ittel_ausa.png' : '';
                    const posterAttr = poster ? ` poster="${poster}"` : '';
                    html += `<div style="margin-bottom:15px"><video src="${video}" controls${posterAttr} style="width:100%;height:auto;border-radius:8px;"></video></div>`;
                }
                html += desc || '';
                
                const contentWrapper = expandedContent.querySelector('.content-wrapper');
                contentWrapper.innerHTML = html;
            };

            const expandContent = () => {
                renderContent();
                slice.classList.add('mobile-expanding'); // Para continuidad visual
                indicator.classList.add('expanded');

                // Forzar layout antes de animar
                expandedContent.style.display = 'block';
                expandedContent.style.height = 'auto';
                expandedContent.style.visibility = 'hidden'; // Oculto pero ocupa espacio
                expandedContent.classList.add('show');
                expandedContent.setAttribute('aria-hidden', 'false');
                
                // Forzar reflow para medir altura real
                const contentWrapper = expandedContent.querySelector('.content-wrapper');
                expandedContent.offsetHeight; // trigger reflow
                const targetHeight = contentWrapper.scrollHeight + 40; // +40 para padding
                
                // Reset para animación suave desde 0
                expandedContent.style.visibility = 'visible'; // Mostrar para animar
                expandedContent.style.height = '0px';
                expandedContent.style.opacity = '0';
                expandedContent.style.overflow = 'hidden';
                
                // Forzar layout antes de animar
                requestAnimationFrame(() => {
                    expandedContent.style.height = targetHeight + 'px';
                    expandedContent.style.opacity = '1';
                    
                    // Cambiar overflow después de la animación para evitar cortes
                    setTimeout(() => {
                        if (expandedContent.classList.contains('show')) {
                            expandedContent.style.overflow = 'visible';
                        }
                    }, 500); // Duración de la transición CSS
                });

                // Ajustar altura si el contenido interno cambia (imágenes/videos cargan)
                const adjustHeight = () => {
                    if (!expandedContent.classList.contains('show')) return;
                    // medir con contenido visible
                    expandedContent.style.overflow = 'hidden';
                    expandedContent.style.height = 'auto';
                    const newHeight = contentWrapper.scrollHeight + 40;
                    expandedContent.style.height = newHeight + 'px';
                };

                // ResizeObserver para contenido dinámico
                let ro;
                if ('ResizeObserver' in window) {
                    ro = new ResizeObserver(() => {
                        adjustHeight();
                    });
                    ro.observe(contentWrapper);
                }

                // Eventos load en imágenes y videos
                contentWrapper.querySelectorAll('img, video').forEach(el => {
                    if (el.tagName.toLowerCase() === 'video') {
                        el.addEventListener('loadedmetadata', adjustHeight, { once: true });
                    } else {
                        if (el.complete) setTimeout(adjustHeight, 0);
                        else el.addEventListener('load', adjustHeight, { once: true });
                    }
                });

                // Event listener para botón de pantalla completa (solo AUBASA)
                const fullscreenBtn = contentWrapper.querySelector('.mobile-fullscreen-btn');
                if (fullscreenBtn) {
                    fullscreenBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const img = contentWrapper.querySelector('.mobile-expandable-img');
                        if (img && img.src) {
                            openMobileFullscreen(img.src, img.alt || 'Imagen AUBASA');
                        }
                    });
                }

                // Eliminado el scroll automático para que el usuario permanezca donde está
            };

            const collapseContent = (targetSlice, targetExpanded, targetIndicator) => {
                targetSlice.classList.remove('mobile-expanding'); // Restaurar aspecto original
                targetExpanded.classList.remove('show');
                targetExpanded.setAttribute('aria-hidden', 'true');
                targetExpanded.style.height = '0px';
                targetExpanded.style.opacity = '0';
                targetExpanded.style.overflow = 'hidden';
                targetIndicator.classList.remove('expanded');
                
                // Ocultar completamente después de la animación
                setTimeout(() => {
                    if (!targetExpanded.classList.contains('show')) {
                        targetExpanded.style.display = 'none';
                    }
                }, 500);
            };

            const toggle = (e) => {
                e && e.stopPropagation();
                
                // Cerrar todas las otras expansiones abiertas
                document.querySelectorAll('.mobile-expanded-content.show').forEach(openContent => {
                    if (openContent !== expandedContent) {
                        const openSlice = openContent.previousElementSibling;
                        const openIndicator = openSlice?.querySelector('.slice-expand-indicator');
                        if (openSlice && openIndicator) {
                            collapseContent(openSlice, openContent, openIndicator);
                        }
                    }
                });
                
                const isOpen = expandedContent.classList.contains('show');
                if (isOpen) {
                    collapseContent(slice, expandedContent, indicator);
                } else {
                    expandContent();
                }
            };

            // Event listener para el indicador de expansión
            indicator.onclick = toggle;
            
            // También permitir tocar en cualquier parte del slice (pero no en botones de enlaces)
            slice.addEventListener('click', (ev) => {
                const t = ev.target;
                if (t.closest('.slice-links') || t.classList.contains('open-modal-btn')) return; // no interferir
                toggle(ev);
            });
        });
    };

    enableMobileExpand();
    
    window.addEventListener('resize', debounce(() => {
        // Al cambiar breakpoint, cerrar expansiones y limpiar
        document.querySelectorAll('.mobile-expanded-content.show').forEach(content => {
            content.classList.remove('show');
            content.setAttribute('aria-hidden', 'true');
            const prevSlice = content.previousElementSibling;
            if (prevSlice) {
                prevSlice.classList.remove('mobile-expanding'); // Limpiar estado de expansión
            }
            const indicator = prevSlice?.querySelector('.slice-expand-indicator');
            if (indicator) {
                indicator.classList.remove('expanded');
            }
            content.style.height = '0px';
            content.style.overflow = 'hidden';
            // Ocultar por completo tras la transición
            setTimeout(() => { if(!content.classList.contains('show')) content.style.display = 'none'; }, 350);
        });
        
        // Re-inicializar handlers móviles si corresponde
        enableMobileExpand();

        // Si pasamos a desktop, eliminar del DOM los contenedores móviles para no romper el layout flex
        if (window.innerWidth > 768) {
            // Restaurar imagen original de USITTEL al volver a desktop
            document.querySelectorAll('.project-slice').forEach(slice => {
                const title = slice.dataset.title || '';
                if (title.includes('USITTEL')) {
                    const bgImg = slice.querySelector('.slice-bg');
                    if (bgImg && bgImg.src.includes('USITTEL_horizontal.png')) {
                        bgImg.src = 'assets/images/proyectos/usittel_internet.png';
                    }
                }
            });
            
            document.querySelectorAll('.mobile-expanded-content').forEach(node => {
                const parent = node.parentNode; if (parent) parent.removeChild(node);
            });
            // Asegurar que los slices conserven un único activo
            const slices = Array.from(document.querySelectorAll('.project-slice'));
            if (slices.length) {
                const anyActive = slices.some(s => s.classList.contains('active'));
                if (!anyActive) slices[0].classList.add('active');
            }
        }
    }, 300)); // Aumentado a 300ms para dar más tiempo al resize

    // --- Project Modal Functionality ---
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    let previouslyFocusedElement = null;

    if (!modal) return; // Exit si no existe el modal

    // Función para abrir el modal
    const openModal = (slice) => {
        const projectTitle = slice.dataset.title;
        const projectImage = slice.dataset.image;
        const projectVideo = slice.dataset.video;
        const hideImageFullscreen = slice.dataset.hideImageFullscreen === 'true';
        
    // Detectar si es mobile y usar descripción mobile si está disponible
    const isMobileView = window.innerWidth <= 768;
    // Usar localStorage para determinar el idioma actual (más robusto que leer del DOM)
    const currentLang = (localStorage.getItem('language') || 'es').toLowerCase();
    const isEnglish = currentLang === 'en';
        
        let projectDescription;
        if (isMobileView) {
            // Priorizar versión mobile
            if (isEnglish && slice.dataset.descriptionMobileEn) {
                projectDescription = slice.dataset.descriptionMobileEn;
            } else if (!isEnglish && slice.dataset.descriptionMobile) {
                projectDescription = slice.dataset.descriptionMobile;
            } else {
                // Fallback a versión completa
                projectDescription = isEnglish && slice.dataset.descriptionEn ? slice.dataset.descriptionEn : slice.dataset.description;
            }
        } else {
            // Desktop usa versión completa
            projectDescription = isEnglish && slice.dataset.descriptionEn ? slice.dataset.descriptionEn : slice.dataset.description;
        }

        modalTitle.textContent = projectTitle;
        
        // Obtener elementos del modal
        const modalImage = document.getElementById('modal-image');
        const modalVideo = document.getElementById('modal-video');
        const modalDescription = document.getElementById('modal-description');
        const modalImageFullscreenBtn = document.getElementById('modal-image-fullscreen');
        
        // Si hay video e imagen: mostrar ambos (imagen arriba, video abajo). Si no, mostrar lo disponible.
        const hasImage = Boolean(projectImage);
        const hasVideo = Boolean(projectVideo);
        if (hasImage) {
            modalImage.style.display = 'block';
            modalImage.src = projectImage;
            modalImage.alt = `Imagen de ${projectTitle}`;
            modalImage.dataset.allowFullscreen = hideImageFullscreen ? 'false' : 'true';
        } else {
            modalImage.style.display = 'none';
            modalImage.removeAttribute('src');
            modalImage.dataset.allowFullscreen = 'false';
        }

        if (modalImageFullscreenBtn) {
            modalImageFullscreenBtn.style.display = hasImage && !hideImageFullscreen ? 'inline-flex' : 'none';
        }

        if (hasVideo) {
            modalVideo.style.display = 'block';
            modalVideo.src = projectVideo;
            
            // Añadir poster específico para el video de AUSA
            if (projectVideo.includes('videoIttel2.mp4')) {
                modalVideo.poster = 'assets/images/proyectos/acuerdo_ittel_ausa.webp';
            } else {
                modalVideo.removeAttribute('poster');
            }
        } else {
            modalVideo.style.display = 'none';
            modalVideo.removeAttribute('src');
        }
        
        modalDescription.innerHTML = projectDescription;
        
        // Prevenir scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden';

        // Guardar el elemento enfocado previamente
        previouslyFocusedElement = document.activeElement;

        // Mostrar modal con animación y accesibilidad
        modal.classList.add('show');
        modal.removeAttribute('aria-hidden');
        
        // Enfocar primer elemento interactivo dentro del modal
        requestAnimationFrame(() => {
            const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusables.length) {
                focusables[0].focus();
            } else {
                modal.focus();
            }
        });

        // Activar trampa de foco
        trapFocus(modal);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        // Pausar video si está reproduciéndose
        const modalVideo = document.getElementById('modal-video');
        if (modalVideo && !modalVideo.paused) {
            modalVideo.pause();
        }
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Ocultar modal con animación de salida
        modal.classList.add('hiding');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');

        // Liberar trampa de foco
        releaseFocusTrap();

        // Esperar transición y limpiar
        setTimeout(() => {
            modal.classList.remove('hiding');
            if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
                previouslyFocusedElement.focus();
            }
        }, 320);
    };

    // Event listeners para los botones "Ver Más"
    if (openModalButtons.length > 0) {
        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el click se propague al slice
                const slice = button.closest('.project-slice');
                if (slice) {
                    openModal(slice);
                }
            });
        });
    }

    // Event listener para cerrar modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    
    // Event listener para cerrar modal clickeando el overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Focus trap helpers
    let focusTrapHandler = null;
    function trapFocus(container) {
        const selectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';
        const getFocusable = () => Array.from(container.querySelectorAll(selectors)).filter(el => (el.offsetParent !== null) || el === container);
        
        focusTrapHandler = (e) => {
            if (e.key !== 'Tab') return;
            const focusables = getFocusable();
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', focusTrapHandler);
    }
    function releaseFocusTrap() {
        if (focusTrapHandler) {
            document.removeEventListener('keydown', focusTrapHandler);
            focusTrapHandler = null;
        }
    }
}

// ==============================
// Galería minimalista IT & Telco (mejorada)
function initItGallery(){
    // Desactivar en mobile
    if (window.innerWidth <= 768) return;
    const track = document.getElementById('itGalleryTrack');
    if(!track) return;
    
    const prev = document.querySelector('.it-gallery-prev');
    const next = document.querySelector('.it-gallery-next');
    const viewport = track.parentElement;
    const images = Array.from(track.querySelectorAll('.it-gallery-item'));
    const fullscreenBtns = track.querySelectorAll('.it-gallery-fullscreen-btn');
    const dotsContainer = document.getElementById('itGalleryDots');
    
    // Detectar orientación de imágenes y ajustar width
    images.forEach(img => {
        img.addEventListener('load', () => {
            if(img.naturalHeight > img.naturalWidth) {
                img.setAttribute('data-orientation', 'portrait');
            } else {
                img.setAttribute('data-orientation', 'landscape');
            }
        });
        // Si ya está cargada
        if(img.complete && img.naturalHeight > 0) {
            if(img.naturalHeight > img.naturalWidth) {
                img.setAttribute('data-orientation', 'portrait');
            }
        }
    });

    const itemWidth = () => {
        const first = track.querySelector('.it-gallery-item-container');
        if(!first) return 320;
        const styles = window.getComputedStyle(first);
        return first.getBoundingClientRect().width + parseFloat(styles.marginRight || '8');
    };

    const scrollBy = (dir) => {
        const delta = itemWidth() * (window.innerWidth < 768 ? 1 : 1.5);
        track.scrollBy({ left: dir * delta, behavior: 'smooth' });
    };

    prev && prev.addEventListener('click', () => scrollBy(-1));
    next && next.addEventListener('click', () => scrollBy(1));

    // Teclado cuando el viewport está en foco/hover
    const keyHandler = (e) => {
        if(e.key === 'ArrowLeft') scrollBy(-1);
        if(e.key === 'ArrowRight') scrollBy(1);
    };
    viewport.addEventListener('mouseenter', () => document.addEventListener('keydown', keyHandler));
    viewport.addEventListener('mouseleave', () => document.removeEventListener('keydown', keyHandler));

    // Dots de paginación sólo visibles en mobile
    let dots = [];
    const isMobile = () => window.matchMedia('(max-width: 640px)').matches;
    const progressBar = document.getElementById('itGalleryProgressBar');
    let currentMobileIndex = 0;
    
    const createDots = () => {
        if(!dotsContainer) return;
        dotsContainer.innerHTML = '';
        dots = images.map((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'it-gallery-dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir a imagen ${i+1}`);
            dot.addEventListener('click', () => {
                // Desplazar al inicio del ítem i
                const item = track.children[i];
                if(item){ 
                    item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                    currentMobileIndex = i;
                    updateProgress();
                }
            });
            dotsContainer.appendChild(dot);
            return dot;
        });
        updateDots(0);
    };

    const updateDots = (activeIndex) => {
        dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
        currentMobileIndex = activeIndex;
        updateProgress();
    };

    const updateProgress = () => {
        if(progressBar && isMobile()) {
            const progress = images.length > 0 ? ((currentMobileIndex + 1) / images.length) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }
    };

    // Detectar índice visible en mobile mediante IntersectionObserver
    let io;
    const setupObserver = () => {
        if(!isMobile()) return;
        if(!('IntersectionObserver' in window)) return;
        if(io) { io.disconnect(); }
        io = new IntersectionObserver((entries) => {
            // Elegir el que tenga mayor intersección
            let best = { index: 0, ratio: 0 };
            entries.forEach(entry => {
                const idx = Array.prototype.indexOf.call(track.children, entry.target);
                if(entry.isIntersecting && entry.intersectionRatio > best.ratio){
                    best = { index: idx, ratio: entry.intersectionRatio };
                }
            });
            updateDots(best.index);
        }, { root: viewport, threshold: [0.5, 0.75, 1] });

        Array.from(track.children).forEach(item => io.observe(item));
    };

    // Fallback: actualizar dots en base al scrollLeft si no hay IO
    let scrollHandler;
    const setupScrollFallback = () => {
        if(!isMobile()) return;
        if('IntersectionObserver' in window) return; // no usar fallback si hay IO
        if(scrollHandler) track.removeEventListener('scroll', scrollHandler);
        scrollHandler = throttle(() => {
            if(!isMobile()) return;
            const trackWidth = track.scrollWidth;
            const containerWidth = track.clientWidth;
            const scrollLeft = track.scrollLeft;
            const totalItems = images.length;
            
            // Calcular índice basado en scroll position
            const itemWidth = trackWidth / totalItems;
            const newIndex = Math.round(scrollLeft / itemWidth);
            const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
            
            if(clampedIndex !== currentMobileIndex) {
                updateDots(clampedIndex);
            }
        }, 100);
        track.addEventListener('scroll', scrollHandler, { passive: true });
    };

    // Inicialización de dots y observer si mobile
    if(isMobile()){
        createDots();
        setupObserver();
        setupScrollFallback();
    }

    // Reconfigurar al redimensionar
    window.addEventListener('resize', debounce(() => {
        if(isMobile()){
            createDots();
            setupObserver();
            setupScrollFallback();
        } else {
            if(dotsContainer) dotsContainer.innerHTML = '';
            if(io) io.disconnect();
            if(scrollHandler) track.removeEventListener('scroll', scrollHandler);
        }
    }, 200));

    // Inicializar fullscreen viewer para cada imagen
    initItGalleryFullscreen(images, fullscreenBtns);
}

// ==============================
// Fullscreen viewer para galería IT
function initItGalleryFullscreen(images, fullscreenBtns) {
    const viewer = document.getElementById('itGalleryFullscreenViewer');
    const fullscreenImg = document.getElementById('itGalleryFullscreenImage');
    const closeBtn = viewer.querySelector('.it-gallery-fullscreen-close');
    const prevBtn = viewer.querySelector('.it-gallery-fullscreen-prev');
    const nextBtn = viewer.querySelector('.it-gallery-fullscreen-next');
    const currentIndexEl = document.getElementById('itGalleryCurrentIndex');
    const totalCountEl = document.getElementById('itGalleryTotalCount');
    
    if(!viewer || !fullscreenImg) return;
    
    let currentIndex = 0;
    
    // Actualizar contador total
    totalCountEl.textContent = images.length;
    
    const showImage = (index) => {
        if(index < 0 || index >= images.length) return;
        currentIndex = index;
        const img = images[index];
        fullscreenImg.src = img.src;
        fullscreenImg.alt = img.alt;
        currentIndexEl.textContent = index + 1;
    };
    
    const openViewer = (startIndex) => {
        showImage(startIndex);
        viewer.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    
    const closeViewer = () => {
        viewer.classList.remove('show');
        document.body.style.overflow = '';
    };
    
    const goToPrev = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        showImage(newIndex);
    };
    
    const goToNext = () => {
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        showImage(newIndex);
    };
    
    // Event listeners para botones fullscreen de miniaturas
    fullscreenBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openViewer(index);
        });
    });
    
    // Event listeners para controles del viewer
    closeBtn.addEventListener('click', closeViewer);
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    // Cerrar al hacer click fuera de la imagen
    viewer.addEventListener('click', (e) => {
        if(e.target === viewer) closeViewer();
    });
    
    // Controles de teclado
    const keyHandler = (e) => {
        if(!viewer.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeViewer();
                break;
            case 'ArrowLeft':
                goToPrev();
                break;
            case 'ArrowRight':
                goToNext();
                break;
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    
    // Click en imagen también abre fullscreen
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            openViewer(index);
        });
    });
}

// ==============================
// Nueva Galería de Obras en Campo (Masonry + Lightbox)
function initObrasGallery(){
    const grid = document.querySelector('.masonry-grid');
    const lb = document.getElementById('obrasLightbox');
    if(!grid || !lb) return;

    // Función para obtener solo los elementos visibles (no desktop-only ni mobile-hidden en móvil)
    const getVisibleItems = () => {
        const isMobile = window.innerWidth <= 768;
        const allLinks = Array.from(grid.querySelectorAll('.masonry-item'));
        if (isMobile) {
            return allLinks.filter(link => 
                !link.classList.contains('desktop-only') && 
                !link.classList.contains('mobile-hidden')
            );
        }
        return allLinks;
    };

    let links = getVisibleItems();
    
    const imgEl = lb.querySelector('.obras-lightbox-image');
    const videoEl = lb.querySelector('.obras-lightbox-video');
    const btnClose = lb.querySelector('.obras-lightbox-close');
    const btnPrev = lb.querySelector('.obras-lightbox-nav.prev');
    const btnNext = lb.querySelector('.obras-lightbox-nav.next');
    const idxEl = lb.querySelector('#obrasIndex');
    const totalEl = lb.querySelector('#obrasTotal');
    let current = 0;

    const updateTotal = () => {
        links = getVisibleItems();
        totalEl.textContent = String(links.length);
    };

    updateTotal();

    // Actualizar al cambiar el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateTotal();
            if (lb.classList.contains('show')) {
                close();
            }
        }, 250);
    });

    const show = (i) => {
        current = (i + links.length) % links.length;
        const link = links[current];
        const href = link.getAttribute('href');
        const type = link.getAttribute('data-type') || 'image';
        const alt = link.querySelector('img')?.alt || 'Obra';

        // Alternar entre imagen y video
        if(type === 'video'){
            if(imgEl){ imgEl.style.display = 'none'; imgEl.removeAttribute('src'); }
            if(videoEl){
                videoEl.style.display = 'block';
                // Preparar reproducción estilo GIF (autoplay, muted, loop)
                videoEl.controls = true;
                videoEl.muted = true;
                videoEl.loop = true;
                videoEl.playsInline = true;
                videoEl.autoplay = true;
                videoEl.src = href;
                const poster = link.getAttribute('data-poster');
                if(poster) videoEl.poster = poster; else videoEl.removeAttribute('poster');
                // Forzar carga y reproducción (silenciado permite autoplay)
                try { videoEl.load(); } catch(_){}
                setTimeout(() => { videoEl.play().catch(() => {}); }, 50);
            }
        } else {
            if(videoEl){
                try { videoEl.pause(); } catch(_){}
                videoEl.removeAttribute('src');
                videoEl.style.display = 'none';
            }
            if(imgEl){
                imgEl.style.display = 'block';
                imgEl.src = href;
                imgEl.alt = alt;
            }
        }
        idxEl.textContent = String(current + 1);
    };

    const open = (i) => {
        show(i);
        lb.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    const close = () => {
        lb.classList.remove('show');
        document.body.style.overflow = '';
        // Limpiar reproducción de video
        if(videoEl){ try { videoEl.pause(); } catch(_){} videoEl.removeAttribute('src'); videoEl.load(); videoEl.style.display='none'; }
    };
    const prev = () => show(current - 1);
    const next = () => show(current + 1);

    links.forEach((a, i) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            // Recalcular índice basado en elementos visibles
            const visibleLinks = getVisibleItems();
            const clickedIndex = visibleLinks.indexOf(a);
            if (clickedIndex !== -1) {
                open(clickedIndex);
            }
        });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);
    lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
        if(!lb.classList.contains('show')) return;
        if(e.key === 'Escape') close();
        if(e.key === 'ArrowLeft') prev();
        if(e.key === 'ArrowRight') next();
    });
}

// ==============================
// Fullscreen en imagen del modal
function initModalImageFullscreen(){
    const img = document.getElementById('modal-image');
    const btn = document.getElementById('modal-image-fullscreen');
    if(!img || !btn) return;

    // Mostrar/ocultar botón según si hay src
    const toggleBtn = () => {
        const allowFullscreen = img.dataset.allowFullscreen !== 'false';
        btn.style.display = img && img.src && allowFullscreen ? 'inline-flex' : 'none';
    };

    const openFullscreen = () => {
        if(!img) return;
        // Intentar usar API Fullscreen con un contenedor temporal
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;';
        const clone = new Image();
        clone.src = img.src;
        clone.alt = img.alt || '';
        clone.style.cssText = 'max-width:98vw;max-height:94vh;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.6);';
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label','Cerrar');
        closeBtn.style.cssText = 'position:fixed;top:16px;right:16px;background:rgba(17,24,39,.7);color:#fff;border:none;border-radius:10px;padding:10px 12px;cursor:pointer;z-index:10000;';
        wrapper.appendChild(clone);
        wrapper.appendChild(closeBtn);
        document.body.appendChild(wrapper);

        const exit = () => {
            if(wrapper && wrapper.parentNode){ wrapper.parentNode.removeChild(wrapper); }
            document.removeEventListener('keydown', escHandler);
        };
        const escHandler = (e) => { if(e.key === 'Escape') exit(); };
        closeBtn.addEventListener('click', exit);
        wrapper.addEventListener('click', (e) => { if(e.target === wrapper) exit(); });
        document.addEventListener('keydown', escHandler);
    };

    btn.addEventListener('click', (e) => { e.preventDefault(); openFullscreen(); });

    // Observa cambios en el src al abrir el modal
    const observer = new MutationObserver(toggleBtn);
    observer.observe(img, { attributes: true, attributeFilter: ['src', 'style'] });
    toggleBtn();
}

// Función específica para pantalla completa en móvil (tarjetas expandidas)
function openMobileFullscreen(imageSrc, imageAlt = '') {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:9999;';
    
    const clone = new Image();
    clone.src = imageSrc;
    clone.alt = imageAlt;
    clone.style.cssText = 'max-width:98vw;max-height:94vh;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.6);';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label','Cerrar');
    closeBtn.style.cssText = 'position:fixed;top:16px;right:16px;background:rgba(17,24,39,.8);color:#fff;border:none;border-radius:10px;padding:12px 14px;cursor:pointer;z-index:10000;font-size:16px;';
    
    wrapper.appendChild(clone);
    wrapper.appendChild(closeBtn);
    document.body.appendChild(wrapper);

    // Agregar animación de entrada
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity 0.3s ease-in-out';
    requestAnimationFrame(() => {
        wrapper.style.opacity = '1';
    });

    const exit = () => {
        wrapper.style.opacity = '0';
        setTimeout(() => {
            if(wrapper && wrapper.parentNode){ 
                wrapper.parentNode.removeChild(wrapper); 
            }
        }, 300);
        document.removeEventListener('keydown', escHandler);
    };
    
    const escHandler = (e) => { 
        if(e.key === 'Escape') exit(); 
    };
    
    closeBtn.addEventListener('click', exit);
    wrapper.addEventListener('click', (e) => { 
        if(e.target === wrapper) exit(); 
    });
    document.addEventListener('keydown', escHandler);
}

// ========================================
// SHOWROOM SLIDER + LIGHTBOX
// ========================================
(function () {
    var track = document.getElementById('showroom-track');
    if (!track) return;

    var pages = track.querySelectorAll('.showroom-page');
    var dots  = document.querySelectorAll('.showroom-dot');
    var prevBtn = document.getElementById('showroom-prev');
    var nextBtn = document.getElementById('showroom-next');
    var total   = pages.length;
    var current = 0;

    function goTo(n) {
        current = Math.max(0, Math.min(n, total - 1));
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === total - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (d) {
        d.addEventListener('click', function () { goTo(parseInt(d.dataset.page, 10)); });
    });

    // Touch / swipe
    var touchStartX = 0;
    track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
    });

    // Keyboard (only when lightbox is closed)
    document.addEventListener('keydown', function (e) {
        var lb = document.getElementById('sw-lightbox');
        if (lb && lb.getAttribute('aria-hidden') === 'false') return;
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    goTo(0);

    // ---- LIGHTBOX ----
    var lightbox = document.getElementById('sw-lightbox');
    if (!lightbox) return;

    var lbImage   = document.getElementById('sw-lb-image');
    var lbCounter = document.getElementById('sw-lb-counter');
    var lbCloseEl = document.getElementById('sw-lb-close');
    var lbOverlay = document.getElementById('sw-lb-overlay');
    var lbPrev    = document.getElementById('sw-lb-prev');
    var lbNext    = document.getElementById('sw-lb-next');

    var allCards = Array.prototype.slice.call(track.querySelectorAll('.showroom-card'));
    var allSrcs  = allCards.map(function (c) { return c.querySelector('img').src; });
    var lbIndex  = 0;

    function lbShow(idx) {
        lbIndex = (idx + allSrcs.length) % allSrcs.length;
        lbImage.classList.add('loading');
        lbCounter.textContent = (lbIndex + 1) + ' / ' + allSrcs.length;
        var tmp = new Image();
        tmp.onload = function () {
            lbImage.src = allSrcs[lbIndex];
            lbImage.classList.remove('loading');
        };
        tmp.src = allSrcs[lbIndex];
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function lbClose() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    allCards.forEach(function (card, i) {
        card.addEventListener('click', function () { lbShow(i); });
    });
    lbCloseEl.addEventListener('click', lbClose);
    lbOverlay.addEventListener('click', lbClose);
    lbPrev.addEventListener('click', function () { lbShow(lbIndex - 1); });
    lbNext.addEventListener('click', function () { lbShow(lbIndex + 1); });

    document.addEventListener('keydown', function (e) {
        if (lightbox.getAttribute('aria-hidden') !== 'false') return;
        if (e.key === 'Escape')     lbClose();
        if (e.key === 'ArrowLeft')  lbShow(lbIndex - 1);
        if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
    });
}());

function initWorksGallery() {
    const gallery = document.getElementById('works-gallery');
    if (!gallery) return;

    const mainImage = document.getElementById('works-gallery-main');
    const prevButton = document.getElementById('works-gallery-prev');
    const nextButton = document.getElementById('works-gallery-next');
    const dotButtons = Array.from(gallery.querySelectorAll('.works-gallery__dot'));
    const assetBase = document.documentElement.lang.toLowerCase().startsWith('en') ? '../' : '';
    const items = [
        {
            src: `${assetBase}assets/images/image_rediseño/obras/obras2/imagengrua1.png`,
            alt: document.documentElement.lang.toLowerCase().startsWith('en')
                ? 'High-demand telecommunications works with crane deployment'
                : 'Obras de telecomunicaciones con grúa y despliegue de alta exigencia'
        },
        {
            src: `${assetBase}assets/images/image_rediseño/obras/obras2/imagengrua2.png`,
            alt: document.documentElement.lang.toLowerCase().startsWith('en')
                ? 'Telecommunications field works with elevated equipment and on-site crew'
                : 'Obras telco en campo con equipamiento elevado y cuadrilla en sitio'
        },
        {
            src: `${assetBase}assets/images/diseno_nuevo_diapo/obras/imagengrua3.png`,
            alt: document.documentElement.lang.toLowerCase().startsWith('en')
                ? 'Real telecommunications infrastructure works with crane and field deployment'
                : 'Obra real de infraestructura de telecomunicaciones con grúa y despliegue en campo'
        },
        {
            src: `${assetBase}assets/images/diseno_nuevo_diapo/obras/58a89b1d-21f0-4274-89a7-05a034be43df.png`,
            alt: document.documentElement.lang.toLowerCase().startsWith('en')
                ? 'Aerial view of telco infrastructure deployment and heavy works'
                : 'Vista aérea de despliegue de infraestructura telco y obra de alta exigencia'
        }
    ];

    if (!mainImage || items.length === 0) return;

    let currentIndex = 0;
    let autoplayId = null;

    items.forEach((item) => {
        const preloadImage = new Image();
        preloadImage.src = item.src;
    });

    const updateGallery = (nextIndex) => {
        currentIndex = (nextIndex + items.length) % items.length;
        const activeItem = items[currentIndex];
        mainImage.classList.add('is-switching');

        window.setTimeout(() => {
            mainImage.src = activeItem.src;
            mainImage.alt = activeItem.alt;
            dotButtons.forEach((button, index) => {
                button.classList.toggle('active', index === currentIndex);
                button.setAttribute('aria-pressed', index === currentIndex ? 'true' : 'false');
            });
            mainImage.classList.remove('is-switching');
        }, 160);
    };

    const startAutoplay = () => {
        if (items.length < 2) return;
        window.clearInterval(autoplayId);
        autoplayId = window.setInterval(() => updateGallery(currentIndex + 1), 4800);
    };

    const stopAutoplay = () => {
        window.clearInterval(autoplayId);
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            updateGallery(currentIndex - 1);
            startAutoplay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            updateGallery(currentIndex + 1);
            startAutoplay();
        });
    }

    dotButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextIndex = Number(button.dataset.index);
            if (Number.isNaN(nextIndex)) return;
            updateGallery(nextIndex);
            startAutoplay();
        });
    });

    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);
    gallery.addEventListener('focusin', stopAutoplay);
    gallery.addEventListener('focusout', startAutoplay);
    gallery.addEventListener('touchstart', stopAutoplay, { passive: true });
    gallery.addEventListener('touchend', startAutoplay, { passive: true });

    updateGallery(currentIndex);
    startAutoplay();
}

function initImageStoryCarousels() {
    const carousels = document.querySelectorAll('[data-image-story-carousel]');
    if (!carousels.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    carousels.forEach((carousel) => {
        const slides = Array.from(carousel.querySelectorAll('.image-story__slide'));
        if (slides.length === 0) return;

        let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
        if (currentIndex < 0) currentIndex = 0;

        const setActiveSlide = (nextIndex) => {
            currentIndex = (nextIndex + slides.length) % slides.length;

            slides.forEach((slide, index) => {
                const isActive = index === currentIndex;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });
        };

        setActiveSlide(currentIndex);

        slides.forEach((slide) => {
            const image = slide.querySelector('img');
            if (!image?.src) return;
            const preloadImage = new Image();
            preloadImage.src = image.src;
        });

        if (carousel.__imageStoryTimer) {
            window.clearInterval(carousel.__imageStoryTimer);
            carousel.__imageStoryTimer = null;
        }

        if (prefersReducedMotion.matches || slides.length < 2) return;

        const interval = Number.parseInt(carousel.getAttribute('data-carousel-interval') || '3000', 10);
        carousel.__imageStoryTimer = window.setInterval(() => {
            setActiveSlide(currentIndex + 1);
        }, Number.isFinite(interval) ? interval : 3000);
    });
}
