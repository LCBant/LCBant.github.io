document.addEventListener('DOMContentLoaded', function() {
    function typeWriter(elementId, text, speed) {
        let i = 0;
        const element = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
        if (!element) return;

        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const introductionTitle = document.getElementById('introduction-title');
    const introductionTextParagraph = document.querySelector('.introduction-text');

    if (introductionTitle && introductionTitle.dataset.originalText) {
        typeWriter(introductionTitle, introductionTitle.dataset.originalText, 70);
    }
    if (introductionTextParagraph && introductionTextParagraph.dataset.originalText) {
        typeWriter(introductionTextParagraph, introductionTextParagraph.dataset.originalText, 50);
    }

    const quizData = [
        {
            id: 'question-1',
            correctAnswer: 'a', // Verifique a letra correta no seu HTML
            feedbackCorrect: "Acertou! Sou graduado em Desenvolvimento de Software e essa foi minha profissão até dezembro do ano passado.",
            feedbackWrong: "Errou feio, sempre deixei minha profissão na bio do meu insta! Mas tudo bem, é normal esquecer ou se confundir."
        },
        {
            id: 'question-2',
            correctAnswer: 'a', // Verifique a letra correta no seu HTML
            feedbackCorrect: "Isso aí! Nos conhecemos em setembro de 2023. Espero q tu n tenha chutado a resposta kkkk",
            feedbackWrong: "Tudo bem errar essa. Nos conhecemos em setembro de 2023."
        },
        {
            id: 'question-3',
            correctAnswer: 'c', // Verifique a letra correta no seu HTML
            feedbackCorrect: "Óiaaa, vc lembrou! 😁",
            feedbackWrong: "É no dia 11, bom saber pq aí tu sabe quando me dar presente 😝."
        },
        {
            id: 'question-4',
            correctAnswer: 'b', // Verifique a letra correta no seu HTML
            feedbackCorrect: "Gosto muito de FF, mas o Mine sempre estará no meu coração. Cresci jogando esse jogo.",
            feedbackWrong: "Apesar de ter jogado muito FF, ainda sim prefiro o Mine."
        },
        {
            id: 'question-5',
            correctAnswer: 'c',
            feedbackCorrect: "Por um momento achei q tu iria se confundir e errar. Usava o nick de Holandês e depois de alguns dias troquei meu nick para Bant.",
            feedbackWrong: "Tudo bem errar essa. Meu nick era Holandês. Pouco tempo depois de nos conhecermos, troquei meu nick para Bant."
        }
        // Adicione mais perguntas aqui se desejar, seguindo o mesmo formato
    ];

    let currentQuestionIndex = 0;
    let score = 0; // Váriavel para a pontuação!
    const allQuizQuestions = document.querySelectorAll('.quiz-question');
    const quizContainer = document.getElementById('quiz-container');

    if (quizContainer) {
        function showQuestion(index) {
            allQuizQuestions.forEach(q => {
                q.classList.add('d-none');
                q.classList.remove('active');
                const feedbackText = q.querySelector('.feedback-text');
                const nextBtn = q.querySelector('.next-btn');
                if (feedbackText) {
                    feedbackText.textContent = '';
                    feedbackText.classList.remove('correct', 'wrong');
                }
                if (nextBtn) nextBtn.classList.add('d-none');
                q.querySelectorAll('.option-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('btn-success', 'btn-danger');
                });
            });

            const currentQuestionElement = document.getElementById(quizData[index].id);
            if (currentQuestionElement) {
                currentQuestionElement.classList.remove('d-none');
                currentQuestionElement.classList.add('active');

                currentQuestionElement.style.animation = 'none';
                void currentQuestionElement.offsetWidth;
                currentQuestionElement.style.animation = '';

                const questionTextElement = currentQuestionElement.querySelector('.question-text');
                if (questionTextElement && questionTextElement.dataset.originalText) {
                    typeWriter(questionTextElement, questionTextElement.dataset.originalText, 50);
                }
            }
        }

        function handleOptionClick(event) {
            const selectedButton = event.target;
            const currentQuestion = quizData[currentQuestionIndex];
            const currentQuestionElement = document.getElementById(currentQuestion.id);
            const feedbackText = currentQuestionElement.querySelector('.feedback-text');
            const nextBtn = currentQuestionElement.querySelector('.next-btn');

            currentQuestionElement.querySelectorAll('.option-btn').forEach(btn => {
                btn.disabled = true;
            });

            if (selectedButton.dataset.answer === currentQuestion.correctAnswer) {
                feedbackText.textContent = currentQuestion.feedbackCorrect;
                feedbackText.classList.add('correct');
                selectedButton.classList.add('btn-success');
                score++; // Incrementa a pontuação se a resposta estiver correta
            } else {
                feedbackText.textContent = currentQuestion.feedbackWrong;
                feedbackText.classList.add('wrong');
                selectedButton.classList.add('btn-danger');
                currentQuestionElement.querySelector(`[data-answer="${currentQuestion.correctAnswer}"]`).classList.add('btn-success');
            }

            nextBtn.classList.remove('d-none');
        }

        function goToNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion(currentQuestionIndex);
            } else {
                // Fim do quiz: exibe a tela de resultado e o texto personalizado
                allQuizQuestions.forEach(q => q.classList.add('d-none'));
                document.getElementById('quiz-result').classList.remove('d-none');
                document.getElementById('quiz-result').style.animation = 'fadeIn 1s ease-out forwards';

                const resultTitleElement = document.getElementById('quiz-result').querySelector('.question-text');
                let finalMessage = "";

                // Lógica para textos finais baseados na pontuação
                if (score === quizData.length) { // Acertou todas
                    finalMessage = `UAU! ${score}/${quizData.length} acertos! Você realmente me conhece como a palma da sua mão! ❤️`;
                } else if (score >= quizData.length / 2) { // Acertou a maioria
                    finalMessage = `Muito bom! ${score}/${quizData.length} acertos! Você sabe bastante sobre mim, nossa conexão é forte! 😉`;
                } else { // Menos da metade
                    finalMessage = `Hmm... ${score}/${quizData.length} acertos. Parece que ainda temos muito o que conversar. Mas obrigado por jogar! 😊`;
                }

                // Atualiza o texto do título da tela de resultado
                if (resultTitleElement) {
                    resultTitleElement.dataset.originalText = finalMessage; // Armazena a mensagem gerada
                    typeWriter(resultTitleElement, finalMessage, 50);
                }
            }
        }
        allQuizQuestions.forEach(q => {
            q.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', handleOptionClick);
            });
            const nextButton = q.querySelector('.next-btn');
            if (nextButton) {
                nextButton.addEventListener('click', goToNextQuestion);
            }
        });

        const finishQuizBtn = document.getElementById('finish-quiz-btn');
        if (finishQuizBtn) {
            finishQuizBtn.addEventListener('click', function() {
                window.location.href = 'memory.html'; // Redireciona para o próximo jogo
            });
        }

        // Inicia o quiz
        showQuestion(currentQuestionIndex);
    }
});