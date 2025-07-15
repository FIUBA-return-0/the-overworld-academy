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

    const getUserURL = await fetch("localhost:3000/usuario/self",{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    })
    const userInfo = await getUserURL.json()

    document.getElementById("usuario").values = userInfo.username
    document.getElementById("apellido").values = userInfo.apellido
    document.getElementById("nombre").values = userInfo.nombre
    document.getElementById("padron").values = userInfo.id
    document.getElementById("carrera").values = userInfo.carrera
    document.getElementById("biografia").values = userInfo.bio

    document.getElementById("usuario").disabled = true;
    document.getElementById("apellido").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("padron").disabled = true;
    document.getElementById("carrera").disabled = true;
    document.getElementById("biografia").disabled = true;


});
