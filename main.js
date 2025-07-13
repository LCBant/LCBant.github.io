function typeWriter(elementId, text, speed, callback = null) {
    let i = 0
    const element = document.getElementById(elementId)
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    }
    type();
}

if (document.getElementById('introduction-title')) {
    const text = "Olá, senhorita Vivi!"
    typeWriter('introduction-title', text, 70);
}

if (document.getElementById('message-1')) {
    const text = "foi isso kkkkkkkk"
    typeWriter('message-1', text, 75);
}

if (document.getElementById('message-3')) {
    const text = "Na verdade, o que me motivou a fazer esse site pra ti, é porque quero te pedir desculpas pelo que aconteceu aquele dia. Acabei me irritando e fui bem tóxico contigo ao falar com você daquela maneira. Eu não tinha percebido na hora o que fiz, por isso fiquei discutindo desnecessariamente, o que me deixou mais chateado. Eu não estava me divertindo no jogo e estava de péssimo humor, mas não queria recusar o seu convite. Eu deveria ter sido mais honesto contigo naquela hora, você me entenderia facilmente e isso tudo poderia ter sido evitado. Sei que já conversamos e que isso está resolvido, mas achei necessário fazer um pedido de desculpas decente."
    typeWriter('message-3', text, 25, function () {
        const sadCat = document.getElementById('gatito-triste');
        const navButton = document.getElementById('nav-button');
        if (sadCat) {
            sadCat.classList.remove('d-none');
            sadCat.style.animation = 'fadeIn 1s ease-out forwards';
        }

        if (navButton) {
            navButton.classList.remove('d-none');
            navButton.style.animation = 'fadeIn 1s ease-out forwards';
        }
    });
}

if (document.getElementById('message-4')) {
    const text = "Fiz isso também porque quero relembrar o quão especial você é pra mim. Desde que nos reaproximamos, comecei a ficar menos mal humorado e um pouco mais sociável. Você tem um jeito único que é difícil de explicar, só sei que me faz bem. Sua presença é agradável e conversar contigo melhora o meu dia. Sei que sou difícil, mas me esforço para melhorar. Sempre aprendo algo novo contigo, e isso me ajuda a te entender cada vez mais. A cada dia que passa, arranjo mais motivos para te admirar como pessoa.  Mais uma vez, obrigado por ser minha amiga e por tudo que você fez por mim até hoje 🫶🏻. "
    typeWriter('message-4', text, 25, function () {
        const happyCat = document.getElementById('gatito-love');
        const navButton = document.getElementById('nav-button');
        if (happyCat) {
            happyCat.classList.remove('d-none');
            happyCat.style.animation = 'fadeIn 1s ease-out forwards';
        }

        if (navButton) {
            navButton.classList.remove('d-none');
            navButton.style.animation = 'fadeIn 1s ease-out forwards';
        }
    });
}
