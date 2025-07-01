const sound = new Audio("./sounds/mc-click-menu.mp3");

const buttons = document.getElementsByClassName("sound-button");

for (const e of buttons) {
    e.addEventListener("click", () => {
        const destino = e.getAttribute("data-href"); // a donde tiene que redirigir

        sound.currentTime = 0;
        sound.play()
            .then(() => {
                sound.onended = () => {
                    window.location.href = destino;
                };
            })
            .catch((err) => {
                console.error("No se pudo reproducir el sonido", err);
                window.location.href = destino;
            });
    });
}
