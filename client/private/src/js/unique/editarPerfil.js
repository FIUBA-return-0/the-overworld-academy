// inicia siempre en modo editar
let modo = "editar";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdlcm9jdWxvIiwiY29uZGljaW9uIjoiYWx1bW5vIiwiaWQiOjMsImlhdCI6MTc1MjU4Mzc3OH0.YxVzC3Mdofw1a-Rf6zw0U5A7MCklIO0fbkeJRqWf3Vw";

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

window.addEventListener("DOMContentLoaded", async () => {
    const botonEditar = document.getElementById("editar-perfil");
    if (botonEditar) {
        botonEditar.addEventListener("click", habilitarEditarCampos);
    }

    document.getElementById("usuario").disabled = false;
    document.getElementById("apellido").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("padron").disabled = false;
    document.getElementById("carrera").disabled = false;
    document.getElementById("biografia").disabled = false;

    const getUserURL = await fetch("http://localhost:3000/usuario/self",{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    })
    const userInfo = await getUserURL.json()
    console.log(userInfo)

    document.getElementById("usuario").value = userInfo.username
    document.getElementById("apellido").value = userInfo.apellido
    document.getElementById("nombre").value = userInfo.nombre
    document.getElementById("padron").value = userInfo.id
    document.getElementById("carrera").value = userInfo.carrera
    document.getElementById("biografia").value = userInfo.bio

    document.getElementById("usuario").disabled = true;
    document.getElementById("apellido").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("padron").disabled = true;
    document.getElementById("carrera").disabled = true;
    document.getElementById("biografia").disabled = true;


});