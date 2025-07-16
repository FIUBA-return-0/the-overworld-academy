const boton = document.getElementById("edit-save");
const reloadButton = () => {
  if (boton.textContent === "Guardar") {
    window.location.reload();
  }
};
boton.addEventListener("click", reloadButton);
