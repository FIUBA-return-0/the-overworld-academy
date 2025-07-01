const sound = new Audio("./sounds/mc-click-menu.mp3");

const buttons = document.getElementsByClassName("sound-button");

for (e of buttons){    
    e.addEventListener("click", () => {
        sound.currentTime = 0;
        sound.play().catch((e) => console.error("No se pudo reproducir el sonido", e));
    });
};
