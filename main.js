function typeWriter(elementId, text, speed) {
    let i = 0
    const element = document.getElementById(elementId)
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

if (document.getElementById('introduction-title')) {
    const text = "Olá, senhorita Vivi!"
    typeWriter('introduction-title', text, 70);
}