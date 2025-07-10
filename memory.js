document.addEventListener('DOMContentLoaded', function() {

    const memoryGameContainer = document.getElementById('memory-game');
    const gameMessage = document.getElementById('game-message');
    const nextPageBtn = document.getElementById('next-page-btn');

    const cardImages = [
        'gato1.jpg',
        'gato2.jpg',
        'gato3.jpg',
        'gato4.jpg',
        'gato5.jpg'
    ];

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; // Impede cliques durante a verificação de pares
    let matchedPairs = 0; // Conta quantos pares foram encontrados

    // Função para embaralhar um array (algoritmo de Fisher-Yates)
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    // Função para criar os cards do jogo
    function createCards() {
        // Duplica as imagens para formar os pares e embaralha
        cards = [...cardImages, ...cardImages]; // Agora temos 10 itens
        shuffle(cards);

        memoryGameContainer.innerHTML = ''; // Limpa o container caso o jogo seja reiniciado

        cards.forEach((imageName, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.image = imageName; // Guarda o nome da imagem para comparação
            cardElement.dataset.index = index; // Guarda o índice para referenciar

            // Frente do card (a imagem)
            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.style.backgroundImage = `url('assets/${imageName}')`; // Caminho para suas imagens!

            // Verso do card (o coração, por exemplo)
            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            cardElement.addEventListener('click', flipCard);
            memoryGameContainer.appendChild(cardElement);
        });
        gameMessage.textContent = "Clique nos cards para encontrar os pares!";
    }

    // Função para virar um card
    function flipCard() {
        if (lockBoard) return; // Se o tabuleiro estiver bloqueado, não faz nada
        if (this === firstCard) return; // Impede clicar duas vezes no mesmo card

        this.classList.add('flip'); // Adiciona a classe para virar o card

        if (!firstCard) {
            // Primeiro card virado
            firstCard = this;
            return;
        }

        // Segundo card virado
        secondCard = this;
        lockBoard = true; // Bloqueia o tabuleiro para comparar

        checkForMatch();
    }

    // Função para verificar se os cards virados formam um par
    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;

        isMatch ? disableCards() : unflipCards();
    }

    // Se for um par, desabilita os cards (deixa eles virados e inativos)
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('found'); // Adiciona classe para estilizar como encontrado
        secondCard.classList.add('found');
        matchedPairs++;
        resetBoard();

        if (matchedPairs === cardImages.length) { // Todos os pares encontrados (5 pares)
            gameMessage.textContent = "Parabéns! Você encontrou todos os pares! 🎉";
            nextPageBtn.classList.remove('d-none'); // Mostra o botão para ir para a próxima página
        }
    }

    // Se não for um par, desvira os cards após um pequeno atraso
    function unflipCards() {
        gameMessage.textContent = "Ops! Não foi dessa vez. Tente novamente!"; // Mensagem de erro
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
            gameMessage.textContent = "Clique nos corações para encontrar os pares!"; // Reseta a mensagem
        }, 1000); // Desvira após 1 segundo
    }

    // Reseta o estado dos cards selecionados
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // --- Inicia o Jogo da Memória ---
    // Verifica se estamos na página 'memoria.html' (ou se o #memory-game existe)
    if (memoryGameContainer) {
        createCards(); // Cria e exibe os cards quando a página carrega

        // Listener para o botão de próxima página
        nextPageBtn.addEventListener('click', function() {
            // Redireciona para a próxima página do seu roteiro
            window.location.href = 'message.html'; // Altere para o nome do seu arquivo
        });
    }

    const memoryGameTitle = document.getElementById('memory-game-title');
    if (memoryGameTitle && memoryGameTitle.dataset.originalText) {
        typeWriter(memoryGameTitle, memoryGameTitle.dataset.originalText, 70);
    }
});