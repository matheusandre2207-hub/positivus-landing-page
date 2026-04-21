document.querySelectorAll('.accordion-item').forEach(item => {
    item.addEventListener('click', () => {
        // Se você quiser que apenas UM fique aberto por vez, descomente a linha abaixo:
        // document.querySelectorAll('.accordion-item').forEach(i => i !== item && i.classList.remove('active'));
        
        item.classList.toggle('active');
    });
});

/*5 parte*/
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.testimonials-container');
    const dotsContainer = document.getElementById('sliderDots'); // O container ainda é o mesmo
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = dotsContainer.querySelectorAll('.logo-dot'); // Seleciona as novas imagens da logo
    
    let currentIndex = 1; 

    // Função para mover o slider e atualizar a interface
    function moveSlider(index) {
        // Garante que o índice esteja dentro dos limites (0 a 4)
        if (index < 0) {
            currentIndex = 0;
        } else if (index >= cards.length) {
            currentIndex = cards.length - 1;
        } else {
            currentIndex = index;
        }

        // CÁLCULO DE CENTRALIZAÇÃO PERFEITA:
        // 1. Pegamos a largura do container visível
        // 2. Calculamos o centro dele menos a metade do card para achar o "ponto zero" de centralização
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const centerOffset = (containerWidth / 2) - (cardWidth / 2);
        
        // 3. Aplicamos o deslocamento baseado no índice e no gap (30px)
        const totalShift = centerOffset - (currentIndex * (cardWidth + 30));
        
        track.style.transform = `translateX(${totalShift}px)`;

        // Atualiza as bolinhas (dots)
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Eventos de clique para os botões de navegação
    prevBtn.addEventListener('click', () => {
        moveSlider(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        moveSlider(currentIndex + 1);
    });

    // Eventos de clique para as próprias bolinhas (dots)
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('logo-dot')) { // Verifica se o clique foi em uma imagem da logo
            const index = Array.from(dotsContainer.children).indexOf(e.target);
            moveSlider(index);
        }
    });

    // Recalcula a posição se a janela mudar de tamanho
    window.addEventListener('resize', () => {
        moveSlider(currentIndex);
    });

    console.log("Slider Positivus ativado!");
    // Inicializa o slider no segundo card (índice 1) para mostrar os vizinhos cortados
    moveSlider(1);
});