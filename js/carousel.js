document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000; // 6 segundos entre cada slide
    
    // Inicializar o carrossel
    function initCarousel() {
        // Adicionar classe active ao primeiro slide
        slides[0].classList.add('active');
        
        // Iniciar o intervalo automático
        startSlideInterval();
        
        // Adicionar event listeners aos indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        if (index === currentSlide) return;
        
        // Remover classe active do slide atual
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Adicionar classe active ao novo slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Atualizar o índice do slide atual
        currentSlide = index;
        
        // Reiniciar o intervalo automático
        resetSlideInterval();
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }
    
    // Iniciar o intervalo automático
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Reiniciar o intervalo automático
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Inicializar o carrossel
    initCarousel();
});
