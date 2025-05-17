// Função para animar os contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Quanto menor, mais rápido
    
    counters.forEach(counter => {
        // Definir o valor inicial como 0
        counter.innerText = '0';
        
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            // Se o contador ainda não atingiu o alvo
            if (count < target) {
                // Incrementa e arredonda
                counter.innerText = Math.ceil(count + increment);
                // Chama a função novamente após um pequeno delay
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Considerar o elemento visível se pelo menos 30% dele estiver na viewport
    return (
        rect.top <= windowHeight * 0.7 &&
        rect.bottom >= windowHeight * 0.3
    );
}

// Iniciar a animação quando a seção estiver visível
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    let animated = false;
    
    // Função para verificar e animar os contadores
    function checkAndAnimate() {
        if (!animated && statsSection && isElementInViewport(statsSection)) {
            animateCounters();
            animated = true;
        }
    }
    
    // Verificar na rolagem
    window.addEventListener('scroll', checkAndAnimate);
    
    // Verificar também quando a página carrega
    checkAndAnimate();
    
    // Forçar a verificação após um curto período para dispositivos móveis
    setTimeout(checkAndAnimate, 1000);
    
    // Verificar novamente após o carregamento completo da página
    window.addEventListener('load', checkAndAnimate);
    
    // Verificar quando o dispositivo muda de orientação (importante para mobile)
    window.addEventListener('orientationchange', function() {
        // Resetar o estado de animação para permitir nova animação após mudança de orientação
        animated = false;
        setTimeout(checkAndAnimate, 200);
    });
});
