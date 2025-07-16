const imagenesFondo = [
    "/img/background-1.webp",
    "/img/background-3.webp",
    "/img/background-4.webp",
    "/img/background-5.webp"
];

const imagenAleatoria = imagenesFondo[Math.floor(Math.random() * imagenesFondo.length)];

window.addEventListener("DOMContentLoaded", () => {
    const fondo = document.querySelector(".perfil-page");
    if (!fondo) {
        console.warn("No se encontro la imágen");
        return;
    }

    const imagenAleatoria = imagenesFondo[Math.floor(Math.random() * imagenesFondo.length)];
    fondo.style.backgroundImage = `url('${imagenAleatoria}')`;
});
