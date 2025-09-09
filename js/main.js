// Main JavaScript for iTTel Website

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
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
    initItGallery(); // Galería minimalista IT & Telco
    initModalImageFullscreen(); // Fullscreen imagen en modal
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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
    const hero = document.querySelector('.hero');
    const heroVideo = document.querySelector('#hero-video');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    console.log('Hero video:', heroVideo); // Debug
    console.log('Fullscreen button:', fullscreenBtn); // Debug
    
    // Optimize video loading
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.style.opacity = '1';
        });
        
        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        observer.observe(hero);
    }
    
    // Fullscreen functionality
    if (fullscreenBtn && heroVideo) {
        fullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Fullscreen button clicked'); // Debug
            
            try {
                if (heroVideo.requestFullscreen) {
                    heroVideo.requestFullscreen().catch(err => console.error('Error:', err));
                } else if (heroVideo.webkitRequestFullscreen) {
                    heroVideo.webkitRequestFullscreen();
                } else if (heroVideo.msRequestFullscreen) {
                    heroVideo.msRequestFullscreen();
                } else {
                    console.log('Fullscreen not supported');
                }
            } catch (error) {
                console.error('Fullscreen error:', error);
            }
        });

        // Mostrar/ocultar botón basado en la visibilidad del video
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            // Función para verificar si el hero está visible en pantalla
            const checkVideoVisibility = () => {
                const heroRect = heroSection.getBoundingClientRect();
                
                // El botón debe estar visible solo si alguna parte del hero está visible
                const isHeroVisible = heroRect.bottom > 80 && heroRect.top < window.innerHeight - 100;
                
                if (isHeroVisible) {
                    fullscreenBtn.style.opacity = '0.8';
                    fullscreenBtn.style.visibility = 'visible';
                } else {
                    fullscreenBtn.style.opacity = '0';
                    fullscreenBtn.style.visibility = 'hidden';
                }
            };

            // Verificar visibilidad en scroll
            window.addEventListener('scroll', throttle(checkVideoVisibility, 100));
            
            // Verificar visibilidad inicial
            checkVideoVisibility();
            
            // Mostrar más opaco al pasar mouse (solo si está visible)
            heroSection.addEventListener('mouseenter', () => {
                const heroRect = heroSection.getBoundingClientRect();
                const isHeroVisible = heroRect.bottom > 80 && heroRect.top < window.innerHeight - 100;
                
                if (isHeroVisible) {
                    fullscreenBtn.style.opacity = '1';
                }
            });
            
            heroSection.addEventListener('mouseleave', () => {
                const heroRect = heroSection.getBoundingClientRect();
                const isHeroVisible = heroRect.bottom > 80 && heroRect.top < window.innerHeight - 100;
                
                if (isHeroVisible) {
                    setTimeout(() => {
                        fullscreenBtn.style.opacity = '0.8';
                    }, 1500);
                }
            });
        }
    }
    
    // Parallax effect for hero content
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            const parallax = scrolled * 0.5;
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Statistics counter animation
function initStats() {
    // Buscar tanto las estadísticas antiguas como las nuevas
    const statNumbers = document.querySelectorAll('.stat-number, .stat-v2-number');
    let animated = false;
    
    const animateStats = () => {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target === 99.99) {
                        stat.textContent = current.toFixed(2);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target === 99.99) {
                        stat.textContent = target.toFixed(2);
                    } else {
                        stat.textContent = target;
                    }
                }
            };
            
            updateCounter();
        });
        
        animated = true;
    };
    
    // Trigger animation when stats section is in view
    const statsSection = document.querySelector('.stats, .stats-v2');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
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

    // Nuevo: trabajar con imágenes .client-logo directamente
    const logos = Array.from(clientsTrack.querySelectorAll('.client-logo'));
    if (logos.length === 0) return;

    // Para loop infinito suave duplicamos el set de logos solo 1 vez si aún no se clonó
    if (!clientsTrack.dataset.cloned) {
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            clientsTrack.appendChild(clone);
        });
        clientsTrack.dataset.cloned = 'true';
    }

    // Establecer velocidad inicial correcta basada en viewport
    const setInitialSpeed = () => {
        const isMobileView = window.innerWidth <= 768;
        const duration = isMobileView ? '6s' : '10s';
        clientsTrack.style.animationDuration = duration;
    };
    setInitialSpeed();

    // Variables para el control del carrusel
    let isDragging = false;
    let startX = 0;
    let currentTransform = 0;
    let animationPaused = false;

    // Pausar animación al pasar el mouse
    clientsTrack.addEventListener('mouseenter', () => {
        if (!isDragging) {
            clientsTrack.style.animationPlayState = 'paused';
            animationPaused = true;
        }
    });

    clientsTrack.addEventListener('mouseleave', () => {
        if (!isDragging) {
            clientsTrack.style.animationPlayState = 'running';
            animationPaused = false;
        }
    });

    // Funcionalidad mejorada de arrastrar
    clientsTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        currentTransform = getTransformValue();
        clientsTrack.style.animationPlayState = 'paused';
        clientsTrack.style.cursor = 'grabbing';
        clientsTrack.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const deltaX = e.pageX - startX;
        const newTransform = currentTransform + deltaX;
        
        // Aplicar el transform manualmente
        clientsTrack.style.animation = 'none';
        clientsTrack.style.transform = `translateX(${newTransform}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            clientsTrack.style.cursor = 'grab';
            clientsTrack.style.userSelect = 'auto';
            
            // Reanudar animación después de un delay
            setTimeout(() => {
                if (!animationPaused) {
                    resetAnimation();
                }
            }, 1500);
        }
    });

    // Función para obtener el valor actual del transform
    function getTransformValue() {
        const style = window.getComputedStyle(clientsTrack);
        const matrix = style.transform;
        if (matrix === 'none') return 0;
        
        const values = matrix.split('(')[1].split(')')[0].split(',');
        return parseFloat(values[4]) || 0;
    }

    // Función para resetear la animación
    function resetAnimation() {
        const isMobileView = window.innerWidth <= 768;
        const duration = isMobileView ? '6s' : '10s';
        clientsTrack.style.animation = `scroll ${duration} linear infinite`;
        clientsTrack.style.transform = '';
        clientsTrack.style.animationPlayState = 'running';
    }

    // Soporte para touch en dispositivos móviles
    let touchStartX = 0;
    
    clientsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        currentTransform = getTransformValue();
        clientsTrack.style.animationPlayState = 'paused';
    });

    clientsTrack.addEventListener('touchmove', (e) => {
        if (touchStartX === 0) return;
        
        const deltaX = e.touches[0].pageX - touchStartX;
        const newTransform = currentTransform + deltaX;
        
        clientsTrack.style.animation = 'none';
        clientsTrack.style.transform = `translateX(${newTransform}px)`;
        e.preventDefault();
    });

    clientsTrack.addEventListener('touchend', () => {
        touchStartX = 0;
        setTimeout(() => {
            resetAnimation();
        }, 1500);
    });

    // Actualizar velocidad al cambiar tamaño de ventana
    window.addEventListener('resize', debounce(() => {
        setInitialSpeed();
    }, 250));
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

// Language selector functionality
function initLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (!languageBtn || !languageDropdown) return;
    
    // Define translations
    const translations = {
        es: {
            navItems: ['Inicio', 'Nosotros', 'Servicios', 'Estrategia', 'Proyectos', 'Clientes', 'Contacto'],
            sectionTitles: {
                nosotros: 'NOSOTROS',
                servicios: 'IT & TEL Information Technology & Telecommunications',
                estrategia: 'Estrategia de diferenciación',
                estadisticas: 'Estadísticas',
                proyectos: 'Proyectos',
                // Ajuste de título visible en la sección
                proyectos: 'Proyectos Destacados',
                clientes: 'Nuestros Clientes',
                contacto: 'Contacto'
            },
            sectionDescriptions: {
                nosotros: 'Somos una Empresa con vasta experiencia en el mercado de las telecomunicaciones, que reconoce el impacto y el Valor Agregado que la innovación tecnológica genera en las organizaciones y comunidades.',
                servicios: 'Ofrecemos soluciones tecnológicas integrales y servicios de telecomunicaciones de vanguardia.',
                clientes: 'Empresas que confían en nuestros servicios y soluciones tecnológicas.',
                contacto: 'Estamos aquí para ayudarte. Contáctanos para más información sobre nuestros servicios.'
            },
            missionCards: {
                mission: {
                    title: 'Nuestra Misión',
                    content: 'Brindar soluciones integrales en tecnología y telecomunicaciones, adaptadas a las necesidades de cada cliente, garantizando calidad, eficiencia y un servicio de postventa excepcional.'
                },
                vision: {
                    title: 'Nuestra Visión', 
                    content: 'Ser la empresa de tecnología y telecomunicaciones líder en la región, reconocida por nuestra innovación, confiabilidad y el compromiso con el éxito de nuestros clientes.'
                },
                values: {
                    title: 'Nuestros Valores',
                    content: 'Compromiso, Calidad, Innovación, Confianza y Orientación al cliente. Estos pilares guían cada uno de nuestros proyectos y relaciones comerciales.'
                }
            },
            services: {
                title: 'IT & TEL Information Technology & Telecommunications',
                description: [
                    'Somos especialistas en brindar soluciones tecnológicas integrales que impulsan el crecimiento y la eficiencia de su organización.',
                    'Nuestro equipo de expertos está comprometido con la excelencia en cada proyecto, desde la consultoría inicial hasta la implementación y el soporte continuo.',
                    'Trabajamos con las últimas tecnologías y mejores prácticas de la industria para garantizar resultados que superen sus expectativas.'
                ]
            },
            strategy: {
                title: 'Estrategia de diferenciación',
                points: [
                    {
                        title: 'Experiencia Comprobada',
                        content: 'Más de 15 años en el mercado de las telecomunicaciones nos respaldan.'
                    },
                    {
                        title: 'Tecnología de Vanguardia',
                        content: 'Utilizamos las últimas tecnologías para ofrecer soluciones innovadoras.'
                    },
                    {
                        title: 'Soporte 24/7',
                        content: 'Brindamos atención continua para garantizar el funcionamiento óptimo.'
                    },
                    {
                        title: 'Soluciones Personalizadas',
                        content: 'Cada proyecto se adapta específicamente a las necesidades del cliente.'
                    }
                ]
            },
            stats: {
                title: 'Estadísticas',
                items: [
                    { number: '150', label: 'Proyectos Completados' },
                    { number: '50', label: 'Clientes Satisfechos' },
                    { number: '15', label: 'Años de Experiencia' },
                    { number: '99.99', label: '% Uptime Garantizado' }
                ]
            },
            projects: {
                title: 'Proyectos',
                items: [
                    {
                        title: 'Acuerdo ITTEL - AUSA',
                        description: [
                            'Integramos el despliegue de infraestructura TELCO más importante de la Ciudad de Buenos Aires:',
                            'Sólo en este proyecto superamos los 1.000 kilómetros de hilos arrendados.',
                            'Gestionamos desde el diseño, pasando por la implementación y operación de más de 100 estructuras portantes de antenas, instaladas a lo largo de las Autopistas y Avenidas que delimitan TODA la Ciudad de Buenos Aires.'
                        ]
                    },
                    {
                        title: 'Acuerdo ITTEL - AUBASA',
                        description: [
                            'Se ha implementado una red de fibra óptica con topología redundante para AUBASA, que integra servicios esenciales para la autopista y transmisiones para clientes TELCO.',
                            'Esta red actúa como un backbone estratégico, conectando Buenos Aires con La Plata y enlazando con otras redes para ofrecer fibra óptica oscura y un camino redundante hacia la salida internacional de Internet en Las Toninas.',
                            'El proyecto busca equilibrar la operatividad, seguridad vial y compromiso ambiental.'
                        ]
                    },
                    {
                        title: 'PROYECTO ADIFSE',
                        description: [
                            'En el Marco del Proyecto de desarrollo de las redes de Telecomunicaciones en los trazados ferroviarios que administra la ADIF S.E, trabajamos la primer Etapa, la cual constó del relevamiento de la infraestructura disponible, su estado, ocupación, y potencialidad.',
                            'El objetivo del proyecto fue informar la situación actual y las posibilidades de desarrollo sustentable.'
                        ]
                    },
                    {
                        title: 'USITTEL - Internet y TV',
                        description: [
                            'USITTEL es nuestro servicio de Internet y Televisión desarrollado en alianza con La Usina de Tandil, ofreciendo conectividad de alta calidad en la región.',
                            'Brindamos servicios de Internet de alta velocidad y televisión digital con tecnología de vanguardia y cobertura estratégica en zonas urbanas y rurales.',
                            'Más información disponible en www.usittel.com.ar'
                        ]
                    }
                ]
            },
            contact: {
                title: 'Contacto',
                description: 'Estamos aquí para ayudarte. Contáctanos para más información sobre nuestros servicios.',
                info: {
                    phone: 'Teléfono',
                    email: 'Email',
                    address: 'Dirección',
                    hours: 'Horarios de Atención'
                },
                values: {
                    phone: '+54 11 1234-5678',
                    email: 'administracion@it-tel.com.ar',
                    address: 'Buenos Aires, Argentina',
                    hours: 'Lunes a Viernes: 9:00 - 18:00'
                }
            },
            footer: {
                sections: {
                    links: 'Links',
                    company: 'Grupo iTTel S.R.L',
                    contact: 'Contacto'
                },
                links: ['Quienes somos', 'Servicios', 'Proyectos', 'Clientes', 'Contacto'],
                copyright: '© 2024 GRUPO ITTEL SRL | INFORMATION TECHNOLOGY & TELECOMMUNICATIONS'
            }
        },
        en: {
            navItems: ['Home', 'About Us', 'Services', 'Strategy', 'Projects', 'Clients', 'Contact'],
            sectionTitles: {
                nosotros: 'ABOUT US',
                servicios: 'IT & TEL Information Technology & Telecommunications',
                estrategia: 'Differentiation Strategy',
                estadisticas: 'Statistics',
                // Ajuste de título visible en la sección
                proyectos: 'Featured Projects',
                clientes: 'Our Clients',
                contacto: 'Contact'
            },
            sectionDescriptions: {
                nosotros: 'We are a company with extensive experience in the telecommunications market, recognizing the impact and added value that technological innovation generates in organizations and communities.',
                servicios: 'We offer comprehensive technological solutions and cutting-edge telecommunications services.',
                clientes: 'Companies that trust our services and technological solutions.',
                contacto: 'We are here to help you. Contact us for more information about our services.'
            },
            missionCards: {
                mission: {
                    title: 'Our Mission',
                    content: 'Provide comprehensive technology and telecommunications solutions, adapted to the needs of each client, ensuring quality, efficiency and exceptional after-sales service.'
                },
                vision: {
                    title: 'Our Vision',
                    content: 'To be the leading technology and telecommunications company in the region, recognized for our innovation, reliability and commitment to our clients\' success.'
                },
                values: {
                    title: 'Our Values',
                    content: 'Commitment, Quality, Innovation, Trust and Customer Orientation. These pillars guide each of our projects and business relationships.'
                }
            },
            services: {
                title: 'IT & TEL Information Technology & Telecommunications',
                description: [
                    'We specialize in providing comprehensive technological solutions that drive the growth and efficiency of your organization.',
                    'Our team of experts is committed to excellence in every project, from initial consulting to implementation and ongoing support.',
                    'We work with the latest technologies and industry best practices to ensure results that exceed your expectations.'
                ]
            },
            strategy: {
                title: 'Differentiation Strategy',
                points: [
                    {
                        title: 'Proven Experience',
                        content: 'More than 15 years in the telecommunications market back us up.'
                    },
                    {
                        title: 'Cutting-edge Technology',
                        content: 'We use the latest technologies to offer innovative solutions.'
                    },
                    {
                        title: '24/7 Support',
                        content: 'We provide continuous attention to ensure optimal operation.'
                    },
                    {
                        title: 'Customized Solutions',
                        content: 'Each project is specifically adapted to the client\'s needs.'
                    }
                ]
            },
            stats: {
                title: 'Statistics',
                items: [
                    { number: '150', label: 'Completed Projects' },
                    { number: '50', label: 'Satisfied Clients' },
                    { number: '15', label: 'Years of Experience' },
                    { number: '99.99', label: '% Guaranteed Uptime' }
                ]
            },
            projects: {
                title: 'Projects',
                items: [
                    {
                        title: 'ITTEL - AUSA Agreement',
                        description: [
                            'We integrated the most important TELCO infrastructure deployment in Buenos Aires City:',
                            'In this project alone, we exceeded 1,000 kilometers of leased lines.',
                            'We manage from design, through implementation and operation of more than 100 antenna supporting structures, installed along the highways and avenues that delimit the ENTIRE City of Buenos Aires.'
                        ]
                    },
                    {
                        title: 'ITTEL - AUBASA Agreement',
                        description: [
                            'A fiber optic network with redundant topology has been implemented for AUBASA, integrating essential services for the highway and transmissions for TELCO clients.',
                            'This network acts as a strategic backbone, connecting Buenos Aires with La Plata and linking with other networks to offer dark fiber optics and a redundant path to the international Internet outlet in Las Toninas.',
                            'The project seeks to balance operability, road safety and environmental commitment.'
                        ]
                    },
                    {
                        title: 'ADIFSE PROJECT',
                        description: [
                            'Within the framework of the Telecommunications network development project in the railway routes administered by ADIF S.E, we worked on the first stage, which consisted of surveying the available infrastructure, its condition, occupation, and potential.',
                            'The objective of the project was to report the current situation and the possibilities for sustainable development.'
                        ]
                    },
                    {
                        title: 'USITTEL - Internet and TV',
                        description: [
                            'USITTEL is our Internet and Television service developed in alliance with La Usina de Tandil, offering high-quality connectivity in the region.',
                            'We provide high-speed Internet and digital television services with cutting-edge technology and strategic coverage in urban and rural areas.',
                            'More information available at www.usittel.com.ar'
                        ]
                    }
                ]
            },
            contact: {
                title: 'Contact',
                description: 'We are here to help you. Contact us for more information about our services.',
                info: {
                    phone: 'Phone',
                    email: 'Email',
                    address: 'Address',
                    hours: 'Business Hours'
                },
                values: {
                    phone: '+54 11 1234-5678',
                    email: 'administracion@it-tel.com.ar',
                    address: 'Buenos Aires, Argentina',
                    hours: 'Monday to Friday: 9:00 AM - 6:00 PM'
                }
            },
            footer: {
                sections: {
                    links: 'Links',
                    company: 'Grupo iTTel S.R.L',
                    contact: 'Contact'
                },
                links: ['About Us', 'Services', 'Projects', 'Clients', 'Contact'],
                copyright: '© 2024 GRUPO ITTEL SRL | INFORMATION TECHNOLOGY & TELECOMMUNICATIONS'
            }
        }
    };
    
    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
    });
    
    // Language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active language
            languageOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update button text
            const selectedLang = option.textContent.trim();
            const langCode = selectedLang === 'Español' ? 'ES' : 'EN';
            languageBtn.querySelector('span').textContent = langCode;
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            
            // Apply translations
            const lang = langCode === 'ES' ? 'es' : 'en';
            applyTranslations(lang, translations);
        });
    });
}

function applyTranslations(lang, translations) {
    const t = translations[lang];
    
    // Update navigation items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        if (t.navItems[index]) {
            link.textContent = t.navItems[index];
        }
    });
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const section = title.closest('.section');
        if (section) {
            const sectionId = section.getAttribute('id');
            if (t.sectionTitles[sectionId]) {
                title.textContent = t.sectionTitles[sectionId];
            }
        }
    });

    // Update section descriptions
    const sectionDescriptions = document.querySelectorAll('.section-description');
    sectionDescriptions.forEach(desc => {
        const section = desc.closest('.section');
        if (section) {
            const sectionId = section.getAttribute('id');
            if (t.sectionDescriptions[sectionId]) {
                desc.textContent = t.sectionDescriptions[sectionId];
            }
        }
    });
    
    // Update mission cards
    const missionCards = document.querySelectorAll('.mission-card');
    const cardKeys = ['mission', 'vision', 'values'];
    missionCards.forEach((card, index) => {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (h3 && p && t.missionCards[cardKeys[index]]) {
            h3.textContent = t.missionCards[cardKeys[index]].title;
            p.textContent = t.missionCards[cardKeys[index]].content;
        }
    });

    // Update services section
    const servicesText = document.querySelector('.services-text');
    if (servicesText && t.services) {
        const h2 = servicesText.querySelector('h2');
        const paragraphs = servicesText.querySelectorAll('.services-description p');
        
        if (h2) h2.textContent = t.services.title;
        paragraphs.forEach((p, index) => {
            if (t.services.description[index]) {
                p.textContent = t.services.description[index];
            }
        });
    }

    // Update strategy section
    const strategyText = document.querySelector('.strategy-text');
    if (strategyText && t.strategy) {
        const h2 = strategyText.querySelector('h2');
        const strategyPoints = strategyText.querySelectorAll('.strategy-point');
        
        if (h2) h2.textContent = t.strategy.title;
        strategyPoints.forEach((point, index) => {
            const h3 = point.querySelector('h3');
            const p = point.querySelector('p');
            if (h3 && p && t.strategy.points[index]) {
                h3.textContent = t.strategy.points[index].title;
                p.textContent = t.strategy.points[index].content;
            }
        });
    }

    // Update stats section
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        const label = item.querySelector('.stat-label');
        if (label && t.stats.items[index]) {
            label.textContent = t.stats.items[index].label;
        }
    });

    // Update projects section
    // 1) Proyectos tipo fullscreen (si existieran)
    const projectSlides = document.querySelectorAll('.project-slide');
    projectSlides.forEach((slide, index) => {
        const h3 = slide.querySelector('.project-info h3');
        const paragraphs = slide.querySelectorAll('.project-description p');
        if (t.projects.items && t.projects.items[index]) {
            if (h3) h3.textContent = t.projects.items[index].title;
            paragraphs.forEach((p, pIndex) => {
                if (t.projects.items[index].description[pIndex]) {
                    p.textContent = t.projects.items[index].description[pIndex];
                }
            });
        }
    });

    // 2) Proyectos Slices Interactivos
    const slices = document.querySelectorAll('.project-slice');
    const isEnglish = lang === 'en';
    slices.forEach(slice => {
        const titleEs = slice.getAttribute('data-title');
        const titleEn = slice.getAttribute('data-title-en');
        const briefEs = slice.getAttribute('data-brief-es');
        const briefEn = slice.getAttribute('data-brief-en');
        const descEs = slice.getAttribute('data-description');
        const descEn = slice.getAttribute('data-description-en');

        // Actualizar título del modal
        slice.setAttribute('data-title', isEnglish && titleEn ? titleEn : titleEs || '');
        
        // Actualizar breve visible en tarjeta
        const detailTitle = slice.querySelector('.slice-detail-title');
        const detailDesc = slice.querySelector('.slice-detail-desc');
        if (detailTitle) {
            detailTitle.textContent = isEnglish && titleEn ? titleEn : titleEs || '';
        }
        if (detailDesc) {
            detailDesc.textContent = isEnglish && briefEn ? briefEn : (briefEs || detailDesc.textContent);
        }

        // Guardar ambas descripciones y setear la activa
        if (descEs) slice.setAttribute('data-description', isEnglish && descEn ? descEn : descEs);
        if (descEn) slice.setAttribute('data-description-en', descEn);
    });

    // 3) IT & Telco Gallery header
    const galleryTitle = document.querySelector('.it-gallery-title');
    const gallerySubtitle = document.querySelector('.it-gallery-subtitle');
    if (galleryTitle) galleryTitle.textContent = isEnglish ? 'Field Works' : 'Obras en Campo';
    if (gallerySubtitle) gallerySubtitle.textContent = isEnglish ? 'Records of our implementations and deployments' : 'Registros de nuestras implementaciones y despliegues';

    // Update contact section
    const contactSection = document.querySelector('#contacto');
    if (contactSection && t.contact) {
        const description = contactSection.querySelector('.section-description');
        if (description) description.textContent = t.contact.description;

        // Update contact info labels
        const contactItems = contactSection.querySelectorAll('.contact-item');
        const infoKeys = ['phone', 'email', 'address', 'hours'];
        
        contactItems.forEach((item, index) => {
            const strong = item.querySelector('strong');
            if (strong && t.contact.info[infoKeys[index]]) {
                strong.textContent = t.contact.info[infoKeys[index]] + ':';
            }
        });
    }

    // Update footer section
    if (t.footer) {
        const footerSections = document.querySelectorAll('.footer-section h4');
        const footerSectionKeys = ['links', 'company', 'contact'];
        
        footerSections.forEach((h4, index) => {
            if (t.footer.sections[footerSectionKeys[index]]) {
                h4.textContent = t.footer.sections[footerSectionKeys[index]];
            }
        });

        // Update footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach((link, index) => {
            if (t.footer.links[index]) {
                link.textContent = t.footer.links[index];
            }
        });

        // Update copyright
        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom && t.footer.copyright) {
            footerBottom.textContent = t.footer.copyright;
        }
    }
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
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
        
    // Simular envío del formulario (buscar el botón submit de forma robusta)
    const submitBtn = contactForm.querySelector('button[type="submit"], .btn-primary') || contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular proceso de envío (en producción aquí iría la integración con el backend)
        setTimeout(() => {
            showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
            contactForm.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Agregar efectos a los campos del formulario
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
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
console.log('%c👋 ¡Hola! Sitio web desarrollado para Grupo iTTel', 'color: #227db3; font-size: 16px; font-weight: bold;');
console.log('%cSi estás interesado en nuestros servicios, contáctanos: administracion@it-tel.com.ar', 'color: #666; font-size: 12px;');

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

    let index = 0;
    let isAnimating = false;
    let isProjectsActive = false;
    let scrollDirection = 0;

    // Establecer altura total para scroll-pin
    const totalHeight = window.innerHeight * (slides.length + 2); // +2 para entrada y salida
    section.style.height = totalHeight + 'px';

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
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Está completamente visible cuando top <= 0 y bottom >= windowHeight
        return rect.top <= 0 && rect.bottom >= windowHeight;
    };

    // Scroll principal del documento
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
        lastScrollY = currentScrollY;
        
        const rect = section.getBoundingClientRect();
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
    });

    // Navegación con wheel cuando está activa la sección
    section.addEventListener('wheel', (e) => {
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
            window.scrollTo(0, section.offsetTop + section.offsetHeight);
        } else if(dir < 0 && index === 0) {
            // Salir de la sección hacia arriba
            isProjectsActive = false;
            document.body.style.overflow = 'auto';
            window.scrollTo(0, section.offsetTop - window.innerHeight);
        }
    }, {passive: false});

    // Touch para mobile
    let touchStartY = 0;
    let touchStartTime = 0;
    
    section.addEventListener('touchstart', (e) => {
        if(!isProjectsActive) return;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, {passive: true});
    
    section.addEventListener('touchmove', (e) => {
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
    }, {passive: false});

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
            slice.addEventListener('click', () => {
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
        
        // Detectar si es mobile y usar descripción mobile si está disponible
        const isMobileView = window.innerWidth <= 768;
        const currentLang = document.querySelector('.language-btn span').textContent.toLowerCase();
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
        
        // Si hay video e imagen: mostrar ambos (imagen arriba, video abajo). Si no, mostrar lo disponible.
        const hasImage = Boolean(projectImage);
        const hasVideo = Boolean(projectVideo);
        if (hasImage) {
            modalImage.style.display = 'block';
            modalImage.src = projectImage;
            modalImage.alt = `Imagen de ${projectTitle}`;
        } else {
            modalImage.style.display = 'none';
            modalImage.removeAttribute('src');
        }

        if (hasVideo) {
            modalVideo.style.display = 'block';
            modalVideo.src = projectVideo;
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
// Fullscreen en imagen del modal
function initModalImageFullscreen(){
    const img = document.getElementById('modal-image');
    const btn = document.getElementById('modal-image-fullscreen');
    if(!img || !btn) return;

    // Mostrar/ocultar botón según si hay src
    const toggleBtn = () => {
        btn.style.display = img && img.src ? 'inline-flex' : 'none';
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
