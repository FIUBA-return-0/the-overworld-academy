// inicia siempre en modo editar
let modo = "editar";

function habilitarEditarCampos(){
    const boton = document.getElementById("editar-perfil");
    if (modo === "editar"){
    document.getElementById("apellido").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("biografia").disabled = false;
    
    boton.textContent = "Guardar cambios";
    modo = "guardar";
    }

    else{
    document.getElementById("apellido").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("biografia").disabled = true;
    
    boton.textContent = "Editar perfil";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", () => {
    const botonEditar = document.getElementById("editar-perfil");
    if (botonEditar) {
        botonEditar.addEventListener("click", habilitarEditarCampos);
    }
});

