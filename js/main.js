// Main JavaScript for iTTel Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHero();
    initStats();
    initProjects();
    initClients();
    initScrollEffects();
    initBackToTop();
    initLanguageSelector();
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
    const statNumbers = document.querySelectorAll('.stat-number');
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
    const statsSection = document.querySelector('.stats');
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
        clientsTrack.style.animation = 'scroll 20s linear infinite';
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
                proyectos: 'Projects',
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
    const projectSlides = document.querySelectorAll('.project-slide');
    projectSlides.forEach((slide, index) => {
        const h3 = slide.querySelector('.project-info h3');
        const paragraphs = slide.querySelectorAll('.project-description p');
        
        if (t.projects.items[index]) {
            if (h3) h3.textContent = t.projects.items[index].title;
            paragraphs.forEach((p, pIndex) => {
                if (t.projects.items[index].description[pIndex]) {
                    p.textContent = t.projects.items[index].description[pIndex];
                }
            });
        }
    });

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

// Console message for developers
console.log('%c👋 ¡Hola! Sitio web desarrollado para Grupo iTTel', 'color: #227db3; font-size: 16px; font-weight: bold;');
console.log('%cSi estás interesado en nuestros servicios, contáctanos: administracion@it-tel.com.ar', 'color: #666; font-size: 12px;');
