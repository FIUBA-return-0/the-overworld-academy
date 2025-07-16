let modo = "editar";
let degreeId = ""

async function habilitarEditarCampos(){
    const boton = document.getElementById("editar-carrera");
    if (modo === "editar"){
        document.getElementById("description").disabled = false;
        document.getElementById("nombre").disabled = false;
        document.getElementById("foto").disabled = false;
    
        boton.textContent = "Guardar cambios";
        modo = "guardar";
    }

    else{
        await editarCarrera(document.getElementById("description").value,
        document.getElementById("nombre").value,
        document.getElementById("foto").value);

        document.getElementById("description").disabled = true;
        document.getElementById("nombre").disabled = true;
        document.getElementById("foto").disabled = true;
    
        boton.textContent = "Editar carrera";
        modo = "editar";
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    try{
        const botonEditar = document.getElementById("editar-carrera");
        if (botonEditar) {
            botonEditar.addEventListener("click", (habilitarEditarCampos));
        }

        const getUserURL = await fetch(`${API}/usuario/self`,{
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                },
        });

        if (getUserURL.status === 200){

            const userInfo = await getUserURL.json();
            degreeId = userInfo.id;
            
            document.querySelector(".materias-title").textContent = "Bienvenido, director de carrera " + userInfo.nombre;

            const getDegreeURL = await fetch(`${API}/carrera/` + degreeId, {
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                    },
            })
            const degreeInfo = await getDegreeURL.json()
            
            document.getElementById("nombre").value = degreeInfo.nombre;
            document.getElementById("description").value = degreeInfo.description;
            document.getElementById("foto").value = degreeInfo.foto;


            const getSubjects = await fetch(`${API}/materia?carrera=` + degreeId,{
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`,
                    },
            });
            const subjects = await getSubjects.json()
            for (const materia of subjects) {
                // Facu todo tuyo !
            }
        }
        
        else if (getUserURL.status === 404){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/404.html';
            }
        }

        else if (getUserURL.status === 401){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/401.html';
            }
        }
        
        else if (getUserURL.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
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


async function editarCarrera(descripcion,nombre,foto) {
    try{
        const updateUserURL = await fetch(`${API}/carrera/` + degreeId, {
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({
            nombre:nombre,
            descripcion:descripcion,
            foto:foto
        })
    });
    
        if (updateUserURL.status === 200){
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
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }
}