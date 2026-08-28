// Sistema de traducciones para iTTel
const translations = {
    es: {
        // Navegación
        'nav.inicio': 'INICIO',
        'nav.nosotros': 'NOSOTROS',
        'nav.servicios': 'IT & TELCO',
        'nav.obras': 'SOLUCIONES',
        'nav.proyectos': 'PROYECTOS',
        'nav.clientes': 'CLIENTES',
        'nav.contacto': 'CONTACTO',

        // Hero
        'hero.eyebrow': 'GRUPO ITTEL \u00a0|\u00a0 INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        'hero.title': 'Somos l\u00edderes en el desarrollo y operaci\u00f3n de infraestructura cr\u00edtica.',
        'hero.lead': 'Conectamos el futuro garantizando el cumplimiento de los SLAs m\u00e1s exigentes para operadores, gobiernos y empresas.',
        'hero.anchor': 'Líderes en Argentina en el desarrollo, operación e integración IT & TELCO a gran escala.',

        // Unidades de Negocio
        'bu.eyebrow': 'UNIDADES DE NEGOCIO',
        'bu.title': 'UNIDADES DE NEGOCIO',
        'bu.subtitle': 'Tres unidades especializadas e integradas',
        'bu.lead': 'Contamos con tres unidades de negocio que pueden trabajar de manera especializada o integrarse bajo un mismo concepto de ciudad inteligente.',

        'bu.unit1.title': 'Compartición de infraestructura',
        'bu.unit1.desc': 'Torres, fibra óptica y capacidad de red para múltiples operadores.',
        'bu.unit2.title': 'Operación y mantenimiento',
        'bu.unit2.desc': 'Supervisión 24/7 y respuesta técnica preventiva y correctiva.',
        'bu.unit3.title': 'Servicios ISP',
        'bu.unit3.desc': 'Conectividad de Internet y televisión por fibra para hogares y empresas.',
        'bu.unit4.title': 'Apps y analítica predictiva',
        'bu.unit4.desc': 'Plataformas para seguimiento, control, eficiencia productiva y anticipación de desvíos.',
        'bu.unit5.title': 'SICE Partners',
        'bu.unit5.desc': 'Plataformas ITS y Smart City para movilidad, iluminación, analítica y gestión urbana.',
        'bu.unit6.title': 'Soluciones IoT',
        'bu.unit6.desc': 'Sensores, dispositivos y datos conectados para automatizar y optimizar operaciones.',
        'bu.unit7.title': 'Obras',
        'bu.unit7.desc': 'Ejecutamos obras integrales de fibra óptica y energía, con canalizaciones y tendidos preparados para escalar. Construimos torres reticuladas, monopostes y estructuras arriostradas, además de soluciones críticas para radiofrecuencia, telefonía móvil, datacenters, racks y tableros eléctricos.',
        'bu.unit8.title': 'Servicios',
        'bu.unit8.desc': 'Brindamos mantenimiento preventivo y correctivo con cuadrillas de campo, trazabilidad de cada intervención y tecnología aplicada al control predictivo de la operación.',

        'sice.ecosystem.title': 'UN ECOSISTEMA PENSADO PARA SMART CITIES.',
        
        // Sección Nuestras Credenciales / Alcance
        'credentials.eyebrow': 'NOSOTROS',
        'credentials.title': 'GRUPO ITTEL',
        'credentials.subtitle': 'INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        'credentials.lead': 'Somos pioneros en Argentina en el desarrollo y compartición de infraestructura de telecomunicaciones a gran escala.',
        'credentials.pillar1.title': 'Oferta Integral',
        'credentials.pillar1.desc': 'Integración de Torres, Fibra Óptica y servicios de valor agregado para operadores y organismos públicos.',
        'credentials.pillar2.title': 'Redes Neutrales',
        'credentials.pillar2.desc': 'Compartición de infraestructura que optimiza costos y acelera el despliegue comercial.',
        'credentials.pillar3.title': 'Soluciones de Alta Criticidad',
        'credentials.pillar3.desc': 'Obras civiles de infraestructura, tecnología aplicada (Smart Cities) y soporte operativo 24/7.',

        'credentials.item1.label': 'Operadores Móviles',
        'credentials.item1.note': 'Acuerdos comerciales vigentes con la totalidad de los operadores móviles de Argentina.',

        'credentials.item2.label': 'Operadores de Fibra',
        'credentials.item2.note': 'Red neutral con acceso para los principales carriers de fibra del país.',

        'credentials.item3.label': 'Alcance Institucional',
        'credentials.item3.note': 'Presencia en todas las jurisdicciones del territorio nacional.',

        // Sección Capacidad de Infraestructura
        'infra.eyebrow': 'IT & TELCO',
        'infra.title': 'Capacidad de Infraestructura',

        // Pilares de Servicio
        'services.pillar1.title': 'INFRAESTRUCTURA',
        'services.pillar1.desc': 'Construcción integral de redes fijas y móviles, despliegues civiles de alta criticidad y mantenimiento preventivo con respuesta rápida.',
        'services.pillar2.title': 'TECNOLOGÍA',
        'services.pillar2.desc': 'Soluciones de Smart Cities, radares, videovigilancia avanzada y sensores IoT para entornos corporativos y públicos.',
        'services.pillar3.title': 'CONECTIVIDAD',
        'services.pillar3.desc': 'Desarrollo y gestión de redes neutrales de alta capacidad para compartición entre múltiples operadores.',

        'infra.stat1.unit': 'km de Fibra Óptica',
        'infra.stat1.label': 'desplegados a nivel nacional',

        'infra.stat2.unit': 'Torres Telco',
        'infra.stat2.label': 'en operación a nivel nacional',

        'infra.region1.name': 'CABA',
        'infra.region1.fo': 'FO operativa',
        'infra.region1.torres': 'torres críticas',

        'infra.region2.name': 'PROVINCIA DE BS. AS.',
        'infra.region2.fo': 'de FO',
        'infra.region2.torres': 'torres estratégicas',

        'infra.region3.name': 'RED FERROVIARIA NACIONAL',
        'infra.region3.desc': 'Despliegue paralelo de torres y anillos de fibra en la red de nodos ferroviarios de Trenes Argentinos.',

        'infra.region4.name': 'LA MATANZA',
        'infra.region4.fo': 'nodo FO centralizado',

        'infra.projection.label': 'TANDIL',
        'infra.projection.tandil': 'manzanas FTTH actualmente',
        
        // Obras en Campo
        'obras.eyebrow': 'OBRAS',
        'obras.title': 'Obras en Campo',
        'obras.description': 'Registro fotográfico de obras ejecutadas en campo a lo largo del territorio nacional.',
        'obras.card1.tag': 'Despliegue de Torres',
        'obras.card1.text': 'Instalación de monopostes y estructuras portantes para operadores móviles en corredores urbanos de alta demanda.',
        'obras.card2.tag': 'Tendido de Fibra Óptica',
        'obras.card2.text': 'Zanjado, canalizado y empalme de FO en autopistas y corredores provinciales de alta criticidad.',
        'obras.card3.tag': 'Trabajo en Altura',
        'obras.card3.text': 'Montaje de antenas y equipos RF en estructuras existentes — 60+ m de altura operativa.',
        'obras.card4.tag': 'Nodos Estratégicos',
        'obras.card4.text': 'Construcción e integración de nodos de distribución en la red ferroviaria nacional.',
        'obras.card5.tag': 'Ingeniería Civil',
        'obras.card5.text': 'Fundaciones, bases de hormigón y obra civil para infraestructura crítica telco.',
        'obras.card6.tag': 'Infraestructura Compartida',
        'obras.card6.text': 'Torres multi-operador con gestión integral de accesos, energía y SLA diferenciado.',
        
        // Estadísticas
        'stats.years': '+ Años de',
        'stats.years.sub': 'experiencia',
        'stats.projects': '+ Proyectos',
        'stats.projects.sub': 'de éxito',
        'stats.sla': '% de SLA',
        'stats.sla.sub': 'garantizado',
        
        // Proyectos Destacados
        'projects.eyebrow': 'PROYECTOS',
        'projects.title': 'Proyectos Destacados',
        'projects.description': 'Cada implementación demuestra nuestra capacidad de ejecución a escala.',
        'projects.readmore': 'Ver Más',
        'projects.close': 'Cerrar',
        
        // Clientes
        'clients.eyebrow': 'CLIENTES',
        'clients.title': 'Nuestros Clientes',
        'clients.description': 'Operadores, concesionarios y organismos que confían en nuestra infraestructura.',
        
        // Contacto
        'contact.eyebrow': 'CONTACTO',
        'contact.title': 'Contacto',
        'contact.subtitle': 'Estamos aquí para ayudarte',
        'contact.description': 'Consultas comerciales, técnicas o institucionales.',
        
        'contact.form.name': 'Nombre completo',
        'contact.form.email': 'Correo electrónico',
        'contact.form.phone': 'Teléfono',
        'contact.form.message': 'Mensaje',
        'contact.form.submit': 'Enviar mensaje',
        
        'contact.info.phone': 'Teléfono',
        'contact.info.email': 'Email',
        'contact.info.address': 'Dirección',
        
        'contact.note': 'Nuestro equipo de profesionales brinda soporte y atención técnica las 24 horas de los 365 días del año, superando los requerimientos más altos en SLA.',
        
        // Footer
        'footer.about.title': 'Sobre Nosotros',
        'footer.about.text': 'Nos caracteriza la innovación continua, integrando IT y Telecomunicaciones, brindamos servicios estratégicos y de valor agregado.',
        
        'footer.links.title': 'Enlaces Rápidos',
        'footer.links.services': 'Soluciones',
        'footer.links.projects': 'Proyectos',
        'footer.links.clients': 'Clientes',
        'footer.links.contact': 'Contacto',
        
        'footer.contact.title': 'Contacto',
        
        'footer.copyright': 'GRUPO ITTEL S.A | INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        
        // Botones generales
        'button.back-to-top': 'Volver arriba'
    },
    
    en: {
        // Navigation
        'nav.inicio': 'HOME',
        'nav.nosotros': 'ABOUT US',
        'nav.servicios': 'IT & TELCO',
        'nav.obras': 'SOLUTIONS',
        'nav.proyectos': 'PROJECTS',
        'nav.clientes': 'CLIENTS',
        'nav.contacto': 'CONTACT',

        // Hero
        'hero.eyebrow': 'GRUPO ITTEL \u00a0|\u00a0 INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        'hero.title': 'We lead the development and operation of critical infrastructure.',
        'hero.lead': 'Connecting the future while ensuring compliance with the most demanding SLAs for operators, governments and enterprises.',
        'hero.anchor': 'Leaders in Argentina in the development, operation and integration across IT & TELCO at scale.',

        // Business Units
        'bu.eyebrow': 'BUSINESS UNITS',
        'bu.title': 'BUSINESS UNITS',
        'bu.subtitle': 'Three specialised and integrated units',
        'bu.lead': 'We operate through three business units that can work independently or integrate under a single smart-city approach.',

        'bu.unit1.title': 'Infrastructure sharing',
        'bu.unit1.desc': 'Towers, fibre optics and network capacity for multiple operators.',
        'bu.unit2.title': 'Operations and maintenance',
        'bu.unit2.desc': '24/7 supervision and preventive and corrective technical response.',
        'bu.unit3.title': 'ISP services',
        'bu.unit3.desc': 'Fibre Internet and television connectivity for homes and businesses.',
        'bu.unit4.title': 'Apps and predictive analytics',
        'bu.unit4.desc': 'Platforms for monitoring, control, productive efficiency and early detection of deviations.',
        'bu.unit5.title': 'SICE Partners',
        'bu.unit5.desc': 'ITS and Smart City platforms for mobility, lighting, analytics and urban management.',
        'bu.unit6.title': 'IoT solutions',
        'bu.unit6.desc': 'Sensors, devices and connected data to automate and optimize operations.',
        'bu.unit7.title': 'Works',
        'bu.unit7.desc': 'We deliver end-to-end fibre-optic and energy works, with conduits and cabling designed to scale. We build lattice, monopole and guyed towers, as well as critical solutions for radio frequency, mobile telephony, data centres, server racks and electrical panels.',
        'bu.unit8.title': 'Services',
        'bu.unit8.desc': 'We provide preventive and corrective maintenance through field crews, full intervention traceability and technology applied to predictive operational control.',

        'sice.ecosystem.title': 'AN ECOSYSTEM DESIGNED FOR SMART CITIES.',
        
        // Credentials / Reach Section
        'credentials.eyebrow': 'ABOUT US',
        'credentials.title': 'GRUPO ITTEL',
        'credentials.subtitle': 'INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        'credentials.lead': 'We are pioneers in Argentina in the development and sharing of large-scale telecommunications infrastructure.',
        'credentials.pillar1.title': 'Comprehensive Offering',
        'credentials.pillar1.desc': 'Integration of Towers, Fiber Optics, and value-added services for operators and public entities.',
        'credentials.pillar2.title': 'Neutral Networks',
        'credentials.pillar2.desc': 'Infrastructure sharing that optimizes costs and accelerates commercial deployment.',
        'credentials.pillar3.title': 'Mission-Critical Solutions',
        'credentials.pillar3.desc': 'Civil infrastructure works, applied technology (Smart Cities), and 24/7 operational support.',

        'credentials.item1.label': 'Mobile Operators',
        'credentials.item1.note': 'Active commercial agreements with all mobile operators in Argentina.',

        'credentials.item2.label': 'Fiber Operators',
        'credentials.item2.note': "Neutral network with access for the country's leading fiber carriers.",

        'credentials.item3.label': 'Institutional Reach',
        'credentials.item3.note': 'Active agreements across all jurisdictions of the national territory.',

        // Infrastructure Capability Section
        'infra.eyebrow': 'IT & TELCO',
        'infra.title': 'Infrastructure Capacity',

        // Service Pillars
        'services.pillar1.title': 'INFRASTRUCTURE',
        'services.pillar1.desc': 'End-to-end construction of fixed and mobile networks, high-criticality civil deployments and preventive maintenance with rapid response.',
        'services.pillar2.title': 'TECHNOLOGY',
        'services.pillar2.desc': 'Smart Cities solutions, radars, advanced video surveillance and IoT sensors for corporate and public environments.',
        'services.pillar3.title': 'CONNECTIVITY',
        'services.pillar3.desc': 'Development and management of high-capacity neutral networks for multi-operator sharing.',

        'infra.stat1.unit': 'km of Fiber Optics',
        'infra.stat1.label': 'deployed nationwide',

        'infra.stat2.unit': 'Telecom Towers',
        'infra.stat2.label': 'in operation nationwide',

        'infra.region1.name': 'CABA',
        'infra.region1.fo': 'of operational FO',
        'infra.region1.torres': 'critical towers',

        'infra.region2.name': 'BUENOS AIRES PROVINCE',
        'infra.region2.fo': 'of FO',
        'infra.region2.torres': 'strategic towers',

        'infra.region3.name': 'NATIONAL RAIL NETWORK',
        'infra.region3.desc': 'Parallel deployment of towers and fiber rings across the Trenes Argentinos national rail node network.',

        'infra.region4.name': 'LA MATANZA',
        'infra.region4.fo': 'centralized FO node',

        'infra.projection.label': 'TANDIL',
        'infra.projection.tandil': 'FTTH blocks currently',
        
        // Field Works
        'obras.eyebrow': 'FIELD WORKS',
        'obras.title': 'Field Works',
        'obras.description': 'Photographic record of field works executed across the national territory.',
        'obras.card1.tag': 'Tower Deployment',
        'obras.card1.text': 'Installation of monopoles and support structures for mobile operators across high-demand urban corridors.',
        'obras.card2.tag': 'Fiber Optic Trenching',
        'obras.card2.text': 'Trenching, conduit routing and FO splicing on highways and high-criticality provincial corridors.',
        'obras.card3.tag': 'Height Work',
        'obras.card3.text': 'Antenna and RF equipment mounting on existing structures — 60+ m operational height.',
        'obras.card4.tag': 'Strategic Nodes',
        'obras.card4.text': 'Construction and integration of distribution nodes on the national rail network.',
        'obras.card5.tag': 'Civil Engineering',
        'obras.card5.text': 'Foundations, concrete bases and civil works for critical telco infrastructure.',
        'obras.card6.tag': 'Shared Infrastructure',
        'obras.card6.text': 'Multi-operator towers with comprehensive access management, power and differentiated SLA.',
        
        // Statistics
        'stats.years': '+ Years of',
        'stats.years.sub': 'experience',
        'stats.projects': '+ Successful',
        'stats.projects.sub': 'Projects',
        'stats.sla': '% SLA',
        'stats.sla.sub': 'guaranteed',
        
        // Featured Projects
        'projects.eyebrow': 'PROJECTS',
        'projects.title': 'Featured Projects',
        'projects.description': 'Each implementation demonstrates our execution capability at scale.',
        'projects.readmore': 'Read More',
        'projects.close': 'Close',
        
        // Clients
        'clients.eyebrow': 'CLIENTS',
        'clients.title': 'Our Clients',
        'clients.description': 'Operators, concessionaires and agencies that trust our infrastructure.',
        
        // Contact
        'contact.eyebrow': 'CONTACT',
        'contact.title': 'Contact',
        'contact.subtitle': 'We\'re here to help you',
        'contact.description': 'Commercial, technical or institutional inquiries.',
        
        'contact.form.name': 'Full name',
        'contact.form.email': 'Email address',
        'contact.form.phone': 'Phone',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send message',
        
        'contact.info.phone': 'Phone',
        'contact.info.email': 'Email',
        'contact.info.address': 'Address',
        
        'contact.note': 'Our team of professionals provides support and technical assistance 24 hours a day, 365 days a year, exceeding the highest SLA requirements.',
        
        // Footer
        'footer.about.title': 'About Us',
        'footer.about.text': 'We are characterized by continuous innovation, integrating IT and Telecommunications, providing strategic and value-added services.',
        
        'footer.links.title': 'Quick Links',
        'footer.links.services': 'Solutions',
        'footer.links.projects': 'Projects',
        'footer.links.clients': 'Clients',
        'footer.links.contact': 'Contact',
        
        'footer.contact.title': 'Contact',
        
        'footer.copyright': 'ITTEL GROUP LLC | INFORMATION TECHNOLOGY & TELECOMMUNICATIONS',
        
        // General buttons
        'button.back-to-top': 'Back to top'
    }
};

// Exportar las traducciones para el navegador
window.translations = translations;

// Exportar también para Node.js si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
