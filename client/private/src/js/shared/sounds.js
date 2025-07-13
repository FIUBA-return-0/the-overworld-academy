const sound1 = new Audio("/sounds/mc-click-menu.mp3");
const sound2 = new Audio("/sounds/sound-2.mp3");
const sound3 = new Audio("/sounds/sound-3.mp3");
const sound4 = new Audio("/sounds/sound-4.mp3");
const sound5 = new Audio("/sounds/sound-5.mp3");

const buttons = document.getElementsByClassName("sound-button");

for (const e of buttons) {
    e.addEventListener("click", () => {
        const destino = e.getAttribute("data-href"); // a donde tiene que redirigir

        sound1.currentTime = 0;
        if (destino){
            sound1.onended = function(){
                window.location.href = destino;
            }
        }

        sound1.play().catch(()=> {
            if(destino){
                window.location.href = destino;
            }
        });
    });
}
