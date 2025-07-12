let modo = "editar";

function habilitarEditarMateria(){
    const boton = document.getElementById("editar-materia");
    if (modo === "editar"){
    document.getElementById("nombre-materia").disabled = false;
    document.getElementById("nombre-profesor").disabled = false;
    document.getElementById("materia-img").disabled = false;
    document.getElementById("descripcion").disabled = false;
    
    boton.textContent = "Guardar cambios";
    modo = "guardar";
    }

    else{
    document.getElementById("nombre-materia").disabled = true;
    document.getElementById("nombre-profesor").disabled = true;
    document.getElementById("materia-img").disabled = true;
    document.getElementById("descripcion").disabled = true;
    
    boton.textContent = "Editar materia";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", () => {
    const botonEditar = document.getElementById("editar-materia");
    if (botonEditar) {
        botonEditar.addEventListener("click", habilitarEditarMateria);
    }
});
