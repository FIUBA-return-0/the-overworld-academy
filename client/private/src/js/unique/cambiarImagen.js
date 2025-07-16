const imagenes = document.querySelectorAll("#modal-cambiar-foto .modal-fotos img");

function abrirModalFoto(){
    frenarAudios();
    document.getElementById("modal-cambiar-foto").classList.remove("hidden");
    document.getElementsByTagName("body")[0].style = "overflow: hidden;";
}

async function setSeleccionada(){
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

document.addEventListener("DOMContentLoaded", async () => {
    imagenes.forEach((img) => {
        img.addEventListener("click", async () => {
            const nuevaImagen = img.getAttribute("src");

            document.getElementById("foto-perfil").setAttribute("src", nuevaImagen);
            document.getElementById("modal-cambiar-foto").classList.add('hidden');
            document.getElementsByTagName("body")[0].style = "";
            
            await patchUsuario({ foto:nuevaImagen });

            setSeleccionada();
        });
    });
});
