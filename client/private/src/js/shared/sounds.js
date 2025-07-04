const sound1 = new Audio("/sounds/mc-click-menu.mp3");
const sound2 = new Audio("/sounds/sound-2.mp3");
const sound3 = new Audio("/sounds/sound-3.mp3");
const sound4 = new Audio("/sounds/sound-4.mp3");


const buttons = document.getElementsByClassName("sound-button");

for (const e of buttons) {
    e.addEventListener("click", () => {
        const destino = e.getAttribute("data-href"); // a donde tiene que redirigir

        sound1.currentTime = 0;
        sound1.play()
            .then(() => {
                sound1.onended = () => {
                    if (destino){
                        window.location.href = destino;
                    }
                };
            })
            .catch((err) => {
                console.error("No se pudo reproducir el sonido", err);
                window.location.href = destino;
                if (destino){
                        window.location.href = destino;
                    }
            });
    });
}
