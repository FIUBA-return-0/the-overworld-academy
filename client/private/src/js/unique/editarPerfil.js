let modo = "editar";

async function habilitarEditarCampos(){
    const boton = document.getElementById("editar-perfil");
    if (modo === "editar"){
        document.getElementById("apellido").disabled = false;
        document.getElementById("nombre").disabled = false;
        document.getElementById("biografia").disabled = false;
        
        boton.textContent = "Guardar cambios";
        modo = "guardar";
    }

    else{
        await patchUsuario({
            nombre: document.getElementById("apellido").value,
            apellido: document.getElementById("nombre").value,
            bio: document.getElementById("biografia").value
        });

        document.getElementById("apellido").disabled = true;
        document.getElementById("nombre").disabled = true;
        document.getElementById("biografia").disabled = true;
    
        boton.textContent = "Editar perfil";
        modo = "editar";
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    try{
        const botonEditar = document.getElementById("editar-perfil");
        if (botonEditar) {
            botonEditar.addEventListener("click", habilitarEditarCampos);
        }

        const token = localStorage.getItem("token");
        const getUserURL = await fetch(`${API}/usuario/self`, {
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if(getUserURL.status === 200){
            const userInfo = await getUserURL.json();

            document.getElementById("biografia").value = userInfo.bio;
            document.getElementById("apellido").value = userInfo.apellido;
            document.getElementById("nombre").value = userInfo.nombre;
            document.getElementById("padron").value = userInfo.id;
            document.getElementById("carrera").value = userInfo.carrera;
            document.getElementById("usuario").value = userInfo.username;
            document.getElementById("foto-perfil").setAttribute("src", userInfo.foto);
            setSeleccionada();            
        }
        
        // check errores
        else if (getUserURL.status === 404){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/404.html';
            }
        }
        
        else if (getUserURL.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
            }
        }

        else if (getUserURL.status === 401){
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
    }
    catch(e){
        console.error(e);
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }
});

async function patchUsuario(body){
    try{
        const token = localStorage.getItem("token");
        const updateUserURL = await fetch(`${API}/usuario`, {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });

        if(updateUserURL.status === 200){
            return;
        }

        else if (updateUserURL.status === 404){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/404.html';
            }
        }
        
        else if (updateUserURL.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
            }
        }

        else if (updateUserURL.status === 401){
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
    }
    catch(e){
        console.error(e);
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }
}
