const borrarCuentaButton = document.getElementById("borrar-cuenta");

borrarCuentaButton.addEventListener("click", ()=>{
    document.getElementById("easteregg-1").classList.remove("hidden");
    window.scrollTo(0, 0);
});

const easteregg1 = document.getElementById("easteregg-1");
easteregg1.addEventListener("click", ()=>{
    document.getElementById("easteregg-1").classList.add("hidden");
});
