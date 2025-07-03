const imagenesFondo = [ "/img/background-1.png",
    "/img/background-3.png",
    "/img/background-4.png",
    "/img/background-5.png"
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