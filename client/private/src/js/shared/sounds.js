const sound1 = new Audio("/sounds/mc-click-menu.mp3");
const sound2 = new Audio("/sounds/easter-egg.mp3");
const sound3 = new Audio("/sounds/sound-3.mp3");
const sound4 = new Audio("/sounds/sound-4.mp3");
const sound5 = new Audio("/sounds/sound-5.mp3");
const sound6 = new Audio("/sounds/traicion.mp3");
const sound7 = new Audio("/sounds/pero-bueno-lo-vamos-a-tolerar-manu.mp3");
const sound8 = new Audio("/sounds/pipshas-camejo.mp3");
const sound10 = new Audio("/sounds/vamos-con-ese-nico.mp3");
const sound11 = new Audio("/sounds/sound11.mp3");
const sound12 = new Audio("/sounds/sound12.mp3");
const sound13 = new Audio("/sounds/sound13.mp3");
const sound14 = new Audio("/sounds/sound14.mp3");
const sound15 = new Audio("/sounds/sound15.mp3");
const sound16 = new Audio("/sounds/sound16.mp3");
const sound17 = new Audio("/sounds/sound17.mp3");
const sound18 = new Audio("/sounds/sound18.mp3");
const sound19 = new Audio("/sounds/sound19.mp3");
const sound20 = new Audio("/sounds/sound20.mp3");
const sound21 = new Audio("/sounds/sound21.mp3");
const sound22 = new Audio("/sounds/sound22.mp3");
const sound23 = new Audio("/sounds/sound23.mp3");
const sound24 = new Audio("/sounds/sound24.mp3");
const sound25 = new Audio("/sounds/sound25.mp3");
const sound26 = new Audio("/sounds/sound26.mp3");
const sound27 = new Audio("/sounds/sound27.mp3");
const sound28 = new Audio("/sounds/sound28.mp3");
const sound29 = new Audio("/sounds/sound29.mp3");
const sound30 = new Audio("/sounds/sound30.mp3");
const sound31 = new Audio("/sounds/sound31.mp3");
const sound32 = new Audio("/sounds/sound32.mp3");

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

function frenarAudios(){
    const audios = [sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8, sound10, sound11, 
        sound12, sound13, sound14, sound15, sound16, sound17, sound18, sound19, sound20, sound21,
        sound22, sound23, sound24, sound25, sound26, sound27, sound28, sound29, sound30, sound31, sound32];
    
        for (const audio in audios) {
        audios[audio].currentTime = 0;
        audios[audio].pause();
    }
}

function cargarAudios(){
    const audios = [sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8,sound10, sound11, 
        sound12, sound13, sound14, sound15, sound16, sound17, sound18, sound19, sound20, sound21,
        sound22, sound23, sound24, sound25, sound26, sound27, sound28, sound29, sound30, sound31, sound32];
    
        for (const audio in audios) {
        audios[audio].load();
    }
}

document.addEventListener("DOMContentLoaded", cargarAudios);
