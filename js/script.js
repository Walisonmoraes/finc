// Script para o site Finc Consórcio
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('nav');
    
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuMobile.classList.toggle('active');
        });
    }
    
    // Botão Voltar ao Topo
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animação de scroll suave para links internos
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuMobile.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simulador de Consórcio
    const calcForm = document.getElementById('calc-form');
    const calcResult = document.querySelector('.calculator-result');
    
    if (calcForm) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.getElementById('calc-type').value;
            const credit = parseFloat(document.getElementById('calc-credit').value);
            const term = parseInt(document.getElementById('calc-term').value);
            
            let adminFee, monthlyPayment, totalCost;
            
            // Cálculo simplificado para demonstração
            switch(type) {
                case 'imovel':
                    adminFee = credit * 0.15;
                    break;
                case 'veiculo':
                    adminFee = credit * 0.18;
                    break;
                case 'moto':
                    adminFee = credit * 0.20;
                    break;
                case 'servico':
                    adminFee = credit * 0.22;
                    break;
                case 'rural':
                    adminFee = credit * 0.16;
                    break;
                default:
                    adminFee = credit * 0.18;
            }
            
            totalCost = credit + adminFee;
            monthlyPayment = totalCost / term;
            
            // Atualiza os resultados
            document.getElementById('result-credit').textContent = 
                'R$ ' + credit.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            document.getElementById('result-term').textContent = term + ' meses';
            document.getElementById('result-admin').textContent = 
                'R$ ' + adminFee.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            document.getElementById('result-monthly').textContent = 
                'R$ ' + monthlyPayment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            document.getElementById('result-total').textContent = 
                'R$ ' + totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            
            // Mostra o resultado
            calcResult.style.display = 'block';
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
    
    // Simulador Mobile
    const initMobileSimulator = function() {
        const optionItems = document.querySelectorAll('.option-grid .option-item, .sub-option-grid .option-item');
        const tabOptions = document.querySelectorAll('.tab-selector .tab-option');
        const creditSlider = document.querySelector('.credit-slider');
        const creditValue = document.querySelector('.credit-value');
        const simularButton = document.querySelector('.btn-simular');
        
        // Função para formatar valores em reais
        const formatCurrency = function(value) {
            return 'R$ ' + value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };
        
        // Inicializa o valor do crédito
        if (creditSlider && creditValue) {
            creditValue.textContent = formatCurrency(parseInt(creditSlider.value));
            
            // Atualiza o valor ao mover o slider
            creditSlider.addEventListener('input', function() {
                creditValue.textContent = formatCurrency(parseInt(this.value));
            });
        }
        
        // Ativa/desativa opções ao clicar
        if (optionItems) {
            optionItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Se for da grade principal (option-grid)
                    if (this.closest('.option-grid')) {
                        // Remove a classe active de todos os itens do mesmo grupo
                        this.closest('.option-grid').querySelectorAll('.option-item').forEach(i => {
                            i.classList.remove('active');
                            i.classList.remove('active-red');
                        });
                        
                        // Adiciona a classe active ao item clicado
                        this.classList.add('active-red');
                    } 
                    // Se for da sub-grade (sub-option-grid)
                    else if (this.closest('.sub-option-grid')) {
                        // Remove a classe highlight de todos os itens do mesmo grupo
                        this.closest('.sub-option-grid').querySelectorAll('.option-item').forEach(i => {
                            i.classList.remove('highlight-red');
                        });
                        
                        // Adiciona a classe highlight ao item clicado
                        this.classList.add('highlight-red');
                    }
                });
            });
        }
        
        // Alterna entre as abas (Crédito/Parcela)
        if (tabOptions) {
            tabOptions.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove a classe active de todas as abas
                    tabOptions.forEach(t => t.classList.remove('active'));
                    
                    // Adiciona a classe active à aba clicada
                    this.classList.add('active');
                });
            });
        }
        
        // Ação do botão simular
        if (simularButton) {
            simularButton.addEventListener('click', function() {
                // Obtém o valor do crédito
                const creditAmount = parseInt(creditSlider.value);
                
                // Obtém a opção selecionada
                let selectedOption = '';
                document.querySelectorAll('.option-grid .option-item.active-red').forEach(item => {
                    selectedOption = item.querySelector('span').textContent;
                });
                
                // Obtém a sub-opção selecionada
                let selectedSubOption = '';
                document.querySelectorAll('.sub-option-grid .option-item.highlight-red').forEach(item => {
                    selectedSubOption = item.querySelector('span').textContent;
                });
                
                // Obtém o tipo de simulação (crédito ou parcela)
                let simulationType = '';
                document.querySelectorAll('.tab-selector .tab-option.active').forEach(item => {
                    simulationType = item.textContent;
                });
                
                // Aqui você pode adicionar a lógica para calcular os valores com base nas seleções
                // Por enquanto, apenas mostramos um alerta com os dados selecionados
                alert(`Simulação realizada com sucesso!\n\nTipo: ${selectedOption}\nSubtipo: ${selectedSubOption}\nModalidade: ${simulationType}\nValor: ${formatCurrency(creditAmount)}`);
                
                // Aqui você pode redirecionar para outra página ou mostrar os resultados
            });
        }
    };

    // Inicializa o simulador mobile
    initMobileSimulator();
});
