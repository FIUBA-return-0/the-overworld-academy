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

    editarPerfil(document.getElementById("apellido").value,
    document.getElementById("nombre").value,
    document.getElementById("biografia").value,
)

    document.getElementById("apellido").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("biografia").disabled = true;
    
    boton.textContent = "Editar perfil";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    try{

    
        const botonEditar = document.getElementById("editar-perfil");
        if (botonEditar) {
            botonEditar.addEventListener("click", habilitarEditarCampos);
        }

        document.getElementById("apellido").disabled = false;
        document.getElementById("nombre").disabled = false;
        document.getElementById("biografia").disabled = false;
        document.getElementById("carrera").disabled = false;
        document.getElementById("padron").disabled = false;
        document.getElementById("usuario").disabled = false;

        const getUserURL = await fetch(`${API}/usuario/self`,{
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                },
        })
        
        // check errores

        if (userInfo.status === 404){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/404.html';
            }
        }
        
        else if (userInfo.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
            }
        }

        else if (userInfo.status === 401){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/401.html';
            }
        }

        else{
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/error-inesperado.html';
            }
        }

        const userInfo = await getUserURL.json()
        console.log(userInfo)

        document.getElementById("biografia").value = userInfo.bio
        document.getElementById("apellido").value = userInfo.apellido
        document.getElementById("nombre").value = userInfo.nombre
        document.getElementById("padron").value = userInfo.id
        document.getElementById("carrera").value = userInfo.carrera
        document.getElementById("usuario").value = userInfo.username
       
        document.getElementById("apellido").disabled = true;
        document.getElementById("nombre").disabled = true;
        document.getElementById("biografia").disabled = true;
        document.getElementById("carrera").disabled = true;
        document.getElementById("padron").disabled = true;
        document.getElementById("usuario").disabled = true;
    }
    catch(e){
        console.error(e);
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }

});

async function editarPerfil(apellido,nombre,biografia) {

    const updateUserURL = await fetch(`${API}/usuario`, {
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({
            nombre:nombre,
            apellido:apellido,
            bio:biografia
        })
    })
    const newData = await updateUserURL.json()
    console.log(newData)
}