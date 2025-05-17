// Função para animar os contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Quanto menor, mais rápido
    
    counters.forEach(counter => {
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
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Iniciar a animação quando a seção estiver visível
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    let animated = false;
    
    // Verificar na rolagem
    window.addEventListener('scroll', function() {
        if (!animated && isElementInViewport(statsSection)) {
            animateCounters();
            animated = true;
        }
    });
    
    // Verificar também quando a página carrega
    if (isElementInViewport(statsSection)) {
        animateCounters();
        animated = true;
    }
});
