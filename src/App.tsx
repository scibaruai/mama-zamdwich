import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SandwichScene from './components/SandwichScene';
import { 
    Menu, 
    X, 
    PawPrint, 
    Cloud, 
    Beef, 
    MapPin, 
    Clock, 
    Phone, 
    ShoppingBag, 
    Sparkles, 
    ChefHat, 
    Flame 
} from 'lucide-react';

// Sede Data definitions
interface SedeInfo {
    title: string;
    desc: string;
    address: string;
    schedule: string;
    phone: string;
    whatsapp: string;
    mapIframeUrl: string;
}

const SEDE_DATA: Record<string, SedeInfo> = {
    altamira: {
        title: "Sede Altamira",
        desc: "Nuestro punto clásico al aire libre. Un espacio acogedor rodeado de plantas y perfecto para disfrutar con tu mascota. Cuenta con zona de juegos pet-friendly y terraza al cielo abierto.",
        address: "Carrera 25 #48-11, Altamira, Palmira",
        schedule: "Miércoles a Domingo, 5:00 PM – 10:00 PM (Incluyendo Festivos)",
        phone: "318 828 1074",
        whatsapp: "https://wa.me/573188281074",
        mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.678912!2d-76.30123!3d3.546342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzInNDYuOCJOIDc2wrAxOCcwNC40Ilc!5e0!3m2!1ses!2sco!4v1719000000000!5m2!1ses!2sco"
    },
    santa_barbara: {
        title: "Sede Bulevar Santa Bárbara",
        desc: "Ubicada en el exclusivo bulevar gastronómico. Un ambiente moderno pero artesanal, con zona interior climatizada, barra de café de especialidad y parqueadero vigilado.",
        address: "Carrera 44 #26-32 Local 5, Bulevar Santa Bárbara, Palmira",
        schedule: "Martes a Domingo, 4:00 PM – 9:30 PM (Incluyendo Festivos)",
        phone: "312 880 5120",
        whatsapp: "https://wa.me/573128805120",
        mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.701234!2d-76.28456!3d3.53987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMzInMjMuNSJOIDc2wrAxNycwNC40Ilc!5e0!3m2!1ses!2sco!4v1719000000000!5m2!1ses!2sco"
    },
    cobertura: {
        title: "Cobertura de Domicilios en Palmira",
        desc: "Llegamos a todo Palmira con despachos rápidos y empaques térmicos biodegradables que conservan la temperatura y el hojaldre crujiente de tus sándwiches gourmet.",
        address: "Toda la zona urbana de Palmira (consulta tarifas mínimas y recargo en zonas de la periferia)",
        schedule: "Martes a Domingo, 4:00 PM – 10:00 PM (Servicio activo durante todo el horario de la cocina)",
        phone: "Línea central WhatsApp Domicilios: 318 828 1074",
        whatsapp: "https://wa.me/573188281074?text=Hola!%20Quiero%20conocer%20la%20cobertura%20y%20pedir%20domicilio%20de%20Mamá%20Zamdwich",
        mapIframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63721.233261680585!2d-76.32635905!3d3.5413158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a04efc3d82f7d%3A0x6b4f7a1f5581a0b5!2sPalmira%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1719000000000!5m2!1ses!2sco"
    }
};

const MENU_ITEMS = [
    {
        id: 1,
        title: "Sándwich Zamdwich Especial",
        tag: "El Favorito",
        desc: "Pan artesanal de masa madre tostado con mantequilla de ajo, jamón curado, queso mozzarella fundido, lechuga orgánica, tomate jugoso y salsa de albahaca de la casa.",
        price: "$18.900 COP",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400&auto=format&fit=crop",
        category: "sandwiches"
    },
    {
        id: 2,
        title: "Zamdwich de Pollo Pesto",
        tag: "Recomendado",
        desc: "Pollo desmechado sateado al pesto rústico, queso mozzarella fundido, tomates secos marinados y rúgula fresca en pan artesanal crujiente.",
        price: "$19.900 COP",
        image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400&auto=format&fit=crop",
        category: "sandwiches"
    },
    {
        id: 3,
        title: "Zamdwich Especial de Lomo",
        tag: "Gourmet Premium",
        desc: "Tiras de lomo de res salteadas con cebolla caramelizada, mayonesa de chimichurri artesanal y queso mozzarella fundido en pan rústico.",
        price: "$23.900 COP",
        image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=400&auto=format&fit=crop",
        category: "sandwiches"
    },
    {
        id: 4,
        title: "Zamdwich Caprese Vegetariano",
        tag: "Fresco & Liviano",
        desc: "Queso mozzarella de búfala, pesto de albahaca fresca, tomates secos de origen local y reducción de balsámico sobre pan rústico de masa madre.",
        price: "$17.500 COP",
        image: "https://images.unsplash.com/photo-1540713786045-6d050fef53bc?q=80&w=400&auto=format&fit=crop",
        category: "sandwiches"
    },
    {
        id: 5,
        title: "Hogaza de Masa Madre Tradicional",
        tag: "Panadería Rústica",
        desc: "Hogaza rústica de masa madre de fermentación lenta (24 horas) con corteza crujiente y miga suave muy alveolada. Horneado diariamente sobre piedra.",
        price: "$12.000 COP",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=400&auto=format&fit=crop",
        category: "bakery"
    },
    {
        id: 6,
        title: "Hogaza con Chips de Chocolate",
        tag: "Dulce Artesanal",
        desc: "Pan rústico de masa madre enriquecido con chips de chocolate belga semi-amargo, horneado diariamente para lograr un contraste dulce y crujiente.",
        price: "$14.500 COP",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=400&auto=format&fit=crop",
        category: "bakery"
    },
    {
        id: 7,
        title: "Croissant de Almendras",
        tag: "Hojaldre de Mantequilla",
        desc: "Croissant francés tradicional 100% mantequilla de la casa, relleno de crema frangipane dulce de almendras y cubierto de almendras fileteadas tostadas.",
        price: "$8.500 COP",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop",
        category: "bakery"
    },
    {
        id: 8,
        title: "Rollo de Canela y Caramelo",
        tag: "Recién Horneado",
        desc: "Masa brioche enrollada con canela de Ceilán, azúcar morena y mantequilla, bañada en frosting de queso crema y un toque de caramelo salado.",
        price: "$7.500 COP",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
        category: "bakery"
    },
    {
        id: 9,
        title: "Café Latte de Especialidad",
        tag: "Barista Selección",
        desc: "Doble shot de café espresso origen local (finca seleccionada de la región), combinado con leche vaporizada sedosa para un balance perfecto.",
        price: "$6.500 COP",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 10,
        title: "Combo 2x Sándwich Personal",
        tag: "Promo Pareja",
        desc: "Lleva dos sándwiches personales clásicos a elección (Jamón y Queso o Pollo Campestre) acompañados de dos bebidas frías de la casa por un precio especial.",
        price: "$32.000 COP",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=400&auto=format&fit=crop",
        category: "combos"
    },
    {
        id: 11,
        title: "Mochaccino Supremo",
        tag: "Chocolate & Café",
        desc: "Doble espresso mezclado con rico chocolate belga derretido, leche cremosa vaporizada y una corona de crema batida con lluvia de cocoa.",
        price: "$8.500 COP",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 12,
        title: "Té Cold Brew Frutos Rojos",
        tag: "Refrescante Natural",
        desc: "Té negro y frutos del bosque locales infusionados en frío por 12 horas. Servido bien frío con rodajas de limón y hojas de menta fresca.",
        price: "$7.500 COP",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 13,
        title: "Espresso Macchiato",
        tag: "Clásico Barista",
        desc: "Un shot corto de café espresso concentrado de la casa, marcado con una densa nube de espuma de leche al vapor para suavizar el sabor.",
        price: "$4.500 COP",
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 14,
        title: "Combo Desayuno Masa Madre",
        tag: "Mañanas Gourmet",
        desc: "Un croissant francés horneado relleno de frangipane, acompañado de un Café Latte de especialidad y un vaso de jugo de naranja natural.",
        price: "$16.000 COP",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&auto=format&fit=crop",
        category: "combos"
    },
    {
        id: 15,
        title: "Combo Tarde Dulce",
        tag: "Merienda Perfecta",
        desc: "Lleva un rollo de canela con caramelo salado recién horneado o un croissant de almendras, acompañado de tu café caliente favorito.",
        price: "$12.500 COP",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
        category: "combos"
    },
    {
        id: 16,
        title: "Súper Combo Zamdwich",
        tag: "Almuerzo Completo",
        desc: "El clásico Sándwich Zamdwich Especial, acompañado de un té frío artesanal de frutos rojos y un rollo de canela para endulzar el día.",
        price: "$24.900 COP",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400&auto=format&fit=crop",
        category: "combos"
    },
    {
        id: 17,
        title: "Cappuccino Italiano Clásico",
        tag: "Tradición Barista",
        desc: "Café espresso corto con partes iguales de leche vaporizada y una gruesa, sedosa capa de espuma de leche, decorado con cacao belga en polvo.",
        price: "$7.000 COP",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 18,
        title: "Té Chai Latte Especiado",
        tag: "Infusión Cremosa",
        desc: "Infusión de té negro con especias tradicionales (canela, cardamomo, jengibre y clavo de olor), combinada con leche vaporizada y un toque de miel.",
        price: "$9.000 COP",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 19,
        title: "Cold Brew Tonic Citrus",
        tag: "Firme & Refrescante",
        desc: "Café infusionado en frío por 16 horas, servido con agua tónica premium, abundante hielo y una rodaja de naranja fresca deshidratada.",
        price: "$9.500 COP",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 20,
        title: "Espresso Romano con Limón",
        tag: "Toque Cítrico",
        desc: "Un shot doble de espresso intenso servido con una tira de piel de limón fresca en el borde, que realza de forma natural la acidez del grano.",
        price: "$5.000 COP",
        image: "https://images.unsplash.com/photo-151097252790b-af4f42ded62e?q=80&w=400&auto=format&fit=crop",
        category: "drinks"
    },
    {
        id: 21,
        title: "Masa Madre Activa en Frasco",
        tag: "Masa Madre Cultivo",
        desc: "Lleva a casa un frasco de nuestro cultivo original de masa madre activa (150g), alimentado y listo para que empieces a hornear tus propios panes artesanales.",
        price: "$15.000 COP",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop",
        category: "mercadito"
    },
    {
        id: 22,
        title: "Café en Grano Origen Palmira (500g)",
        tag: "Barista Café Grano",
        desc: "Café de especialidad origen local, cultivado en las montañas de la región. Notas de chocolate, caramelo y cítricos suaves, tostado medio.",
        price: "$28.000 COP",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400&auto=format&fit=crop",
        category: "mercadito"
    },
    {
        id: 23,
        title: "Mermelada Artesanal de Frutos Rojos",
        tag: "Dulces de la Casa",
        desc: "Elaborada en casa con frutos rojos frescos y un toque de albahaca, reducida lentamente con azúcar orgánica para acompañar tus panes.",
        price: "$12.500 COP",
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=400&auto=format&fit=crop",
        category: "mercadito"
    },
    {
        id: 24,
        title: "Kit Panadero en Casa",
        tag: "Accesorios Panadería",
        desc: "Incluye un banneton de caña, una cuchilla lame profesional para cortes de corteza y nuestra guía impresa paso a paso para hacer pan de masa madre.",
        price: "$45.000 COP",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
        category: "mercadito"
    }
];

const App: React.FC = () => {
    const [selectedSede, setSelectedSede] = useState<string>('altamira');
    const [activeCategory, setActiveCategory] = useState<string>('sandwiches');
    const [scrollFraction, setScrollFraction] = useState<number>(0);
    const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    // Track scroll fractions for Three.js (Sandwich opens fully in the first panel transition)
    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            // The sandwich opens completely within the first 100vh of scroll (First Panel transition)
            const firstStepHeight = window.innerHeight;
            const fraction = firstStepHeight > 0 ? Math.min(st / firstStepHeight, 1) : 0;
            setScrollFraction(fraction);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            setMouse({ x, y });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);



    // Custom Cursor Tracker & Card 3D Tilt Setup
    useEffect(() => {
        const dot = document.querySelector('.custom-cursor-dot');
        const ring = document.querySelector('.custom-cursor-ring');

        // Mousemove Custom Cursor
        const handleCursorMove = (e: MouseEvent) => {
            if (dot && ring) {
                gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, overwrite: "auto" });
                gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, overwrite: "auto" });
            }
        };

        // Hover cursor effect
        const handleMouseEnter = () => {
            dot?.classList.add('cursor-hover');
            ring?.classList.add('cursor-hover');
        };
        const handleMouseLeave = () => {
            dot?.classList.remove('cursor-hover');
            ring?.classList.remove('cursor-hover');
        };

        // Attach Cursor Hovers
        const attachCursorHovers = () => {
            const hoverables = document.querySelectorAll(
                'a, button, .menu-item-card, .proceso-card, .polaroid-item, .sede-tab, .menu-category-tab'
            );
            hoverables.forEach(target => {
                target.addEventListener('mouseenter', handleMouseEnter);
                target.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        window.addEventListener('mousemove', handleCursorMove);
        const hoverTimer = setTimeout(attachCursorHovers, 800);

        // 3D Card Tilt Effects
        const cards = document.querySelectorAll('.menu-item-card, .proceso-card, .polaroid-item');
        const tiltCleanup: Array<{ el: Element; move: (e: Event) => void; leave: () => void }> = [];

        cards.forEach(card => {
            const onMouseMove = (e: Event) => {
                const me = e as MouseEvent;
                const rect = card.getBoundingClientRect();
                const x = me.clientX - rect.left;
                const y = me.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Tilt calculation (up to 12 degrees)
                const rotateX = ((centerY - y) / centerY) * 12;
                const rotateY = ((x - centerX) / centerX) * 12;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    y: -8, // Translate upward on hover
                    scale: 1.03,
                    transformPerspective: 1000,
                    duration: 0.3,
                    overwrite: "auto",
                    ease: "power1.out"
                });
            };

            const onMouseLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    y: 0, // Reset translation
                    scale: 1,
                    duration: 0.5,
                    overwrite: "auto",
                    ease: "power3.out"
                });
            };

            card.addEventListener('mousemove', onMouseMove);
            card.addEventListener('mouseleave', onMouseLeave);
            tiltCleanup.push({ el: card, move: onMouseMove, leave: onMouseLeave });
        });

        return () => {
            window.removeEventListener('mousemove', handleCursorMove);
            clearTimeout(hoverTimer);
            tiltCleanup.forEach(item => {
                item.el.removeEventListener('mousemove', item.move);
                item.el.removeEventListener('mouseleave', item.leave);
            });
        };
    }, [activeCategory, selectedSede]); // Re-attach when tabs or sedes change DOM structure

    // Master ScrollTrigger Timeline: 3D Panel cube transition (Limited to Panel 1 & Panel 2)
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray('.panel') as HTMLElement[];

            // Configure initial 3D transform origin for first 2 panels
            panels.forEach((panel, i) => {
                gsap.set(panel, {
                    transformOrigin: "50% 50% -50vh",
                    backfaceVisibility: "hidden",
                    z: 0
                });
                if (i > 0) {
                    gsap.set(panel, { rotationX: 90, opacity: 0 });
                }
            });

            // Master Pinned Scroll Timeline for Hero to Historia transition
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.panels-container',
                    start: 'top top',
                    end: '+=100%', // Exactly 1 full screen scroll transition
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Rotate Panel 1 out and Panel 2 in, and blend background color smoothly
            tl.to(panels[0], {
                rotationX: -90,
                opacity: 0,
                ease: 'none'
            }, 0)
            .to(panels[1], {
                rotationX: 0,
                opacity: 1,
                ease: 'none'
            }, 0)
            .to('.panels-container', {
                backgroundColor: '#2e1708',
                ease: 'none'
            }, 0)
            .from('.historia-text', { opacity: 0, y: 40, duration: 0.5 }, 0.3)
            .from('.historia-visual-side', { opacity: 0, scale: 0.95, duration: 0.5 }, 0.3);

            // Stagger entrance transitions for other scrolling sections in normal document flow
            gsap.from('.proceso-card', {
                scrollTrigger: {
                    trigger: '.proceso-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 45,
                stagger: 0.15,
                duration: 1.0,
                ease: 'power2.out'
            });

            gsap.from('.menu-item-card', {
                scrollTrigger: {
                    trigger: '.menu-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 45,
                stagger: 0.15,
                duration: 1.0,
                ease: 'power2.out'
            });

            gsap.from('.polaroid-item', {
                scrollTrigger: {
                    trigger: '.atmosphere-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.8,
                stagger: 0.15,
                duration: 1.0,
                ease: 'back.out(1.5)'
            });

            gsap.from('.sedes-main-row', {
                scrollTrigger: {
                    trigger: '.sedes-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 35,
                duration: 1.0,
                ease: 'power3.out'
            });
        });

        // Ensure everything is calculated properly after DOM elements adjust
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 800);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    const activeSede = SEDE_DATA[selectedSede];

    // Filter menu items by active tab category
    const filteredMenuItems = MENU_ITEMS.filter(item => item.category === activeCategory);

    return (
        <div className="bg-dots">
            {/* Organic vignettes */}
            <div className="organic-overlay" />

            {/* Custom pointer cursor */}
            <div className="custom-cursor-dot" />
            <div className="custom-cursor-ring" />

            {/* Navigation Bar */}
            <nav id="main-nav">
                <div className="nav-container">
                    <a href="#inicio" className="nav-logo-link">
                        <img src="/Logo.png" alt="Mamá Zamdwich Logo" className="nav-logo-img" />
                        <h1 className="nav-logo-text">MAMÁ <span>ZAMDWICH</span></h1>
                    </a>
                    
                    <ul className="nav-links">
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#historia">Esencia</a></li>
                        <li><a href="#proceso">Proceso</a></li>
                        <li><a href="#menu">Menú</a></li>
                        <li><a href="#experiencia">Atmósfera</a></li>
                        <li><a href="#sedes">Contacto</a></li>
                    </ul>

                    <a href={activeSede.whatsapp} className="nav-cta-btn" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Pedir Domicilio
                    </a>

                    <button 
                        className="mobile-nav-toggle" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <a href="#inicio" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
                        <a href="#historia" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Esencia</a>
                        <a href="#proceso" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Proceso</a>
                        <a href="#menu" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Menú</a>
                        <a href="#experiencia" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Atmósfera</a>
                        <a href="#sedes" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
                        <a 
                            href={activeSede.whatsapp} 
                            className="mobile-cta-btn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Pedir Domicilio
                        </a>
                    </div>
                )}
            </nav>

            {/* Checkered Gold Border Divider below Nav */}
            <div className="border-checkered-gold" style={{ marginTop: '72px' }} />

            {/* Pinned 3D Panels Scroll Container (Contains Hero & Historia Cube transition) */}
            <div className="panels-container">
                
                {/* Panel 1: Hero Section */}
                <header id="inicio" className="panel hero-section">
                    <div className="hero-content-container">
                        <div className="hero-text-side">
                            <div className="tagline-badge">
                                <Sparkles size={16} className="scroll-icon-anim" /> 
                                <span>Sándwiches Gourmet 100% Artesanales</span>
                            </div>
                            <h1>El sabor artesanal <br /><span className="leaf-text">hecho con amor</span></h1>
                            <p className="hero-description">
                                Disfruta de sándwiches calientes con panes horneados en casa, ingredientes frescos de alta calidad y un ambiente acogedor al aire libre apto para mascotas.
                            </p>
                            
                            <div className="hero-actions">
                                <a href="#proceso" className="btn-primary">
                                    Conocer Proceso <Flame size={18} />
                                </a>
                                <a href="#menu" className="btn-secondary">
                                    Ver Menú <ShoppingBag size={18} />
                                </a>
                            </div>

                            <div className="hero-features">
                                <div className="feature-item">
                                    <PawPrint size={20} />
                                    <span>Pet-Friendly</span>
                                </div>
                                <div className="feature-item">
                                    <Cloud size={20} />
                                    <span>Cielo Abierto</span>
                                </div>
                                <div className="feature-item">
                                    <Beef size={20} />
                                    <span>Ingredientes Selectos</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-3d-side" id="hero-3d-wrapper">
                            {/* ThreeJS R3F Scene */}
                            <SandwichScene scrollFraction={scrollFraction} mouse={mouse} />
                            <div className="scroll-indicator-text">
                                <i className="fas fa-mouse-pointer scroll-icon-anim"></i> Scroll para abrir el sándwich
                            </div>
                        </div>
                    </div>
                </header>

                {/* Panel 2: Brand Story / History Description (Dark Coffee Panel) */}
                <section id="historia" className="panel">
                    <div className="historia-section">
                        <div className="historia-text">
                            <div className="tagline-badge">
                                <ChefHat size={16} className="scroll-icon-anim" /> 
                                <span>Nuestra Esencia</span>
                            </div>
                            <h2>Tradición Familiar & Masa Madre</h2>
                            <p>En Mamá Zamdwich no hacemos comida rápida, hacemos comida con alma. Nuestra pasión por la panadería artesanal nos llevó a rescatar el cultivo tradicional de masa madre, alimentado pacientemente a diario durante más de 5 años para lograr un sabor, textura y ligereza digestiva inigualables.</p>
                            <p>Cada hogaza, baguette y croissant se hornea diariamente sobre piedra refractaria en nuestros puntos a cielo abierto en Palmira, logrando esa combinación perfecta de corteza rústica crujiente y miga suave y alveolada.</p>
                            <div className="historia-quote">
                                "El secreto está en el tiempo: fermentación lenta, ingredientes con alma y la calidez del cielo abierto para compartir con los que más quieres."
                            </div>
                        </div>
                        <div className="historia-visual-side">
                            <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop" alt="Pan artesanal de masa madre" className="historia-visual-bg" />
                            <div className="historia-visual-overlay">
                                <h3>Masa Madre Activa</h3>
                                <p>Fermentación lenta de 24 horas y horneado en piedra</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Decorative Checkered Border */}
            <div className="border-checkered" />

            {/* Section 3: Proceso Artesanal (Normal Scroll Flow) */}
            <section id="proceso" className="proceso-section">
                <div className="section-header-centered" style={{ marginBottom: '3rem' }}>
                    <span className="proceso-tag">Nuestra Mística</span>
                    <h2 className="section-title">El Arte de la Masa Madre</h2>
                    <p className="section-subtitle">Conoce el cuidadoso e inspirador proceso detrás de cada horneado en Mamá Zamdwich</p>
                </div>

                <div className="proceso-grid">
                    <div className="proceso-card">
                        <div className="proceso-icon-box">
                            <Clock size={28} />
                        </div>
                        <h3>Fermentación de 24h</h3>
                        <p>Nuestras masas madre reposan pacientemente durante un día entero. Este tiempo permite el desarrollo de aromas profundos y una textura ligera y fácil de digerir.</p>
                    </div>

                    <div className="proceso-card">
                        <div className="proceso-icon-box">
                            <Flame size={28} />
                        </div>
                        <h3>Horno de Piedra</h3>
                        <p>Horneamos a altas temperaturas sobre piedra refractaria. Esto le da al pan su característica base crujiente y una corteza rústica caramelizada única.</p>
                    </div>

                    <div className="proceso-card">
                        <div className="proceso-icon-box">
                            <ChefHat size={28} />
                        </div>
                        <h3>Ingredientes de Origen</h3>
                        <p>Apoyamos la economía local usando vegetales frescos de las huertas de Palmira y quesos artesanales seleccionados bajo el más alto estándar.</p>
                    </div>

                    <div className="proceso-card">
                        <div className="proceso-icon-box">
                            <Sparkles size={28} />
                        </div>
                        <h3>Masa Madre Activa</h3>
                        <p>Alimentamos a diario nuestro cultivo original de hace 5 años con harinas seleccionadas e infundimos a cada pan un carácter y aroma silvestre único.</p>
                    </div>
                </div>
            </section>

            {/* Decorative Checkered Gold Divider */}
            <div className="border-checkered-gold" />

            {/* Section 4: Menu Section (Normal Scroll Flow, 4 Categories Tabs) */}
            <section id="menu" className="menu-section bg-checkered">
                <div className="section-header-centered" style={{ marginBottom: '2.5rem' }}>
                    <h2 className="section-title">El Menú de la Casa</h2>
                    <p className="section-subtitle">Sándwiches gourmet con masa madre, repostería rústica y cafés de especialidad</p>
                </div>

                {/* 5 Categories Tab Selector */}
                <div className="menu-categories-tabs">
                    <button 
                        className={`menu-category-tab ${activeCategory === 'sandwiches' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('sandwiches')}
                    >
                        Sándwiches Gourmet
                    </button>
                    <button 
                        className={`menu-category-tab ${activeCategory === 'bakery' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('bakery')}
                    >
                        Panadería y Dulces
                    </button>
                    <button 
                        className={`menu-category-tab ${activeCategory === 'drinks' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('drinks')}
                    >
                        Cafés y Bebidas
                    </button>
                    <button 
                        className={`menu-category-tab ${activeCategory === 'combos' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('combos')}
                    >
                        Combos Especiales
                    </button>
                    <button 
                        className={`menu-category-tab ${activeCategory === 'mercadito' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('mercadito')}
                    >
                        Mercadito Artesanal
                    </button>
                </div>

                <div className="menu-container">
                    <div className="menu-grid">
                        {filteredMenuItems.map((item) => (
                            <div className="menu-item-card" key={item.id}>
                                <div className="menu-item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="menu-item-info">
                                    <span className="menu-tag">{item.tag}</span>
                                    <h3>{item.title}</h3>
                                    <p className="menu-item-description">{item.desc}</p>
                                </div>
                                <div className="menu-item-price-panel">
                                    <span className="item-price">{item.price}</span>
                                    <a 
                                        href={activeSede.whatsapp} 
                                        className="btn-order-menu-item" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Pedir <i className="fas fa-cart-shopping"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Decorative Checkered Border */}
            <div className="border-checkered" />

            {/* Section 5: Polaroid Atmosphere Section (Normal Scroll Flow) */}
            <section id="experiencia" className="atmosphere-section">
                <div className="section-header-centered" style={{ marginBottom: '3rem' }}>
                    <h2 className="section-title">Ambiente de Cielo Abierto</h2>
                    <p className="section-subtitle">Un espacio diseñado para desconectarse y compartir momentos inolvidables</p>
                </div>

                <div className="polaroid-collage">
                    <div className="polaroid-item item-rot-left">
                        <div className="photo-frame">
                            <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600&auto=format&fit=crop" alt="Cafetería al aire libre" />
                        </div>
                        <div className="caption">Al aire libre 🍃</div>
                    </div>

                    <div className="polaroid-item item-rot-right">
                        <div className="photo-frame">
                            <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop" alt="Mascotas bienvenidas" />
                        </div>
                        <div className="caption">¡Trae a tu mejor amigo! 🐾</div>
                    </div>

                    <div className="polaroid-item item-rot-left-heavy">
                        <div className="photo-frame">
                            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop" alt="Pan artesanal recién horneado" />
                        </div>
                        <div className="caption">Amor artesanal 🥖</div>
                    </div>

                    <div className="polaroid-item item-rot-right-heavy">
                        <div className="photo-frame">
                            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" alt="Ambiente nocturno" />
                        </div>
                        <div className="caption">Noches mágicas ✨</div>
                    </div>
                </div>
            </section>

            {/* Decorative Checkered Gold Divider */}
            <div className="border-checkered-gold" />

            {/* Section 6: Sedes Section (Normal Scroll Flow) */}
            <section id="sedes" className="sedes-section bg-checkered">
                <div className="section-header-centered" style={{ marginBottom: '3rem' }}>
                    <h2 className="section-title">Nuestras Ubicaciones</h2>
                    <p className="section-subtitle">Selecciona tu sede favorita en Palmira para ver detalles, direcciones y pedir domicilio directo.</p>
                </div>

                <div className="sedes-interactive-container">
                    <div className="sedes-toggle-buttons" style={{ justifyContent: 'center', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                        <button 
                            className={`sede-tab ${selectedSede === 'altamira' ? 'active' : ''}`}
                            onClick={() => setSelectedSede('altamira')}
                        >
                            Sede Altamira
                        </button>
                        <button 
                            className={`sede-tab ${selectedSede === 'santa_barbara' ? 'active' : ''}`}
                            onClick={() => setSelectedSede('santa_barbara')}
                        >
                            Sede Santa Bárbara Bulevar
                        </button>
                        <button 
                            className={`sede-tab ${selectedSede === 'cobertura' ? 'active' : ''}`}
                            onClick={() => setSelectedSede('cobertura')}
                        >
                            Cobertura Domicilios
                        </button>
                    </div>

                    <div className="sede-detail-card" style={{ padding: '3rem' }}>
                        <div className="sedes-main-row">
                            <div className="sede-text-block">
                                <h3 style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{activeSede.title}</h3>
                                <p className="sede-concept-desc" style={{ marginBottom: '1.8rem' }}>
                                    <Sparkles size={16} />
                                    <span>{activeSede.desc}</span>
                                </p>

                                <div className="info-line" style={{ marginBottom: '1.2rem' }}>
                                    <MapPin size={20} />
                                    <div>
                                        <strong>{selectedSede === 'cobertura' ? 'Área de Envío' : 'Dirección'}:</strong>
                                        <p>{activeSede.address}</p>
                                    </div>
                                </div>

                                <div className="info-line" style={{ marginBottom: '1.2rem' }}>
                                    <Clock size={20} />
                                    <div>
                                        <strong>Horario de Atención:</strong>
                                        <p>{activeSede.schedule}</p>
                                    </div>
                                </div>

                                <div className="info-line" style={{ marginBottom: '1.5rem' }}>
                                    <Phone size={20} />
                                    <div>
                                        <strong>{selectedSede === 'cobertura' ? 'Canal de Pedidos' : 'Contacto Directo'}:</strong>
                                        <p>{activeSede.phone}</p>
                                    </div>
                                </div>

                                <a 
                                    href={activeSede.whatsapp} 
                                    className="btn-sede-action" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> {selectedSede === 'cobertura' ? 'Pedir Domicilio por WhatsApp' : 'Escríbenos a esta Sede'}
                                </a>
                            </div>

                            <div className="sede-map-block">
                                <div className="map-container-real" style={{ height: '300px' }}>
                                    <iframe 
                                        title={`Mapa de ${activeSede.title}`}
                                        src={activeSede.mapIframeUrl}
                                        width="100%" 
                                        height="100%" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rich Dark Espresso Footer */}
            <footer className="main-footer">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2>MAMÁ <span>ZAMDWICH</span></h2>
                        <p>Sándwiches gourmet 100% artesanales elaborados con masa madre de fermentación lenta (24h) y horneados diariamente sobre piedra refractaria. Disfruta de nuestros espacios a cielo abierto y de la calidez de nuestro servicio pet-friendly en Palmira.</p>
                    </div>
                    
                    <div className="footer-links">
                        <h4>Enlaces Rápidos</h4>
                        <ul>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#historia">Nuestra Esencia</a></li>
                            <li><a href="#proceso">El Proceso</a></li>
                            <li><a href="#menu">Menú Gourmet</a></li>
                            <li><a href="#experiencia">La Atmósfera</a></li>
                            <li><a href="#sedes">Contacto & Sedes</a></li>
                        </ul>
                    </div>

                    <div className="footer-payments">
                        <h4>Métodos de Pago</h4>
                        <p>Aceptamos efectivo, transferencias directas y todas las tarjetas nacionales e internacionales procesadas a través de datáfono Bold en mesa y a domicilio:</p>
                        <div className="footer-payment-logos">
                            <i className="fab fa-cc-visa" title="Visa"></i>
                            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                            <i className="fab fa-cc-amex" title="American Express"></i>
                            <span className="bold-badge">BOLD</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Pagos 100% rápidos y seguros al recibir tu pedido.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Mamá Zamdwich. Todos los derechos reservados.</p>
                    <div className="footer-bottom-socials">
                        <a href="https://www.instagram.com/mamazamdwich/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href={activeSede.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <p>Desarrollado bajo el sello de calidad de <span className="scibaru-credit">Scibaru AI</span>.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
