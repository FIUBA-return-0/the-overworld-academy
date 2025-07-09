const imagenes = document.querySelectorAll("#modal-cambiar-foto .modal-fotos img");

function abrirModalFoto(){
    document.getElementById("modal-cambiar-foto").classList.remove("hidden");
    
    const actual = document.getElementById("foto-perfil").getAttribute("src");
    imagenes.forEach(img => {
        if (img.getAttribute("src") === actual){
            img.classList.add("seleccionada");
        }
        else {
            img.classList.remove("seleccionada");   
        }
    });
}

imagenes.forEach(img=>{
    img.addEventListener("click", () => {
        const nuevaImagen = img.getAttribute("src");

        document.getElementById("foto-perfil").setAttribute("src", nuevaImagen);
        document.getElementById("modal-cambiar-foto").classList.add('hidden');

        imagenes.forEach(img => {
            if (img.getAttribute("src") === nuevaImagen){
                img.classList.add("seleccionada");
            }
            else {
                img.classList.remove("seleccionada");   
            }
        });
    });
});