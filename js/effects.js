// Efeitos modernos para o site Finc Consórcio

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Efeito de parallax para seções com classe .parallax
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax');
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionOffset = section.offsetTop;
            const distance = scrollPosition - sectionOffset;
            const speed = 0.5; // Velocidade do efeito parallax
            
            if (section.querySelector('.parallax-bg')) {
                section.querySelector('.parallax-bg').style.transform = `translateY(${distance * speed}px)`;
            }
        });
    });
    
    // Efeito de hover 3D para cards
    const cards = document.querySelectorAll('.investment-card, .advantage-card, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calcular rotação baseada na posição do mouse
            const rotateY = 15 * mouseX / (cardRect.width / 2);
            const rotateX = -15 * mouseY / (cardRect.height / 2);
            
            // Aplicar transformação
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Adicionar efeito de luz
            const glareX = 100 * (mouseX / cardRect.width) + 50;
            const glareY = 100 * (mouseY / cardRect.height) + 50;
            card.style.setProperty('--glare-position', `${glareX}% ${glareY}%`);
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
    
    // Efeito de texto digitando para títulos principais
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach(text => {
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                text.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efeito quando o elemento estiver visível
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(text);
                }
            });
        });
        
        observer.observe(text);
    });
    
    // Efeito de menu flutuante ao rolar
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('floating');
        } else {
            header.classList.remove('floating');
        }
    });
    
    // Efeito de ondas animadas para seções com classe .wave-section
    const waveSections = document.querySelectorAll('.wave-section');
    waveSections.forEach(section => {
        const wave = document.createElement('div');
        wave.classList.add('wave-effect');
        section.appendChild(wave);
    });
});

// Inicializar partículas para o fundo do hero
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.particles-bg')) {
        particlesJS('particles-bg', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
});
