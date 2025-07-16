let modo = "editar";
let degreeId = ""

function habilitarEditarCampos(){
    const boton = document.getElementById("editar-carrera");
    if (modo === "editar"){
    document.getElementById("description").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("foto").disabled = false;
    
    boton.textContent = "Guardar cambios";
    modo = "guardar";
    }

    else{

    editarCarrera(document.getElementById("description").value,
    document.getElementById("nombre").value,
    document.getElementById("foto").value,
)

    document.getElementById("description").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("foto").disabled = true;
    
    boton.textContent = "Editar carrera";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    const botonEditar = document.getElementById("editar-carrera");
    if (botonEditar) {
        botonEditar.addEventListener("click", habilitarEditarCampos);
    }

    const getUserURL = await fetch("http://localhost:3000/usuario/self",{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    })
    const userInfo = await getUserURL.json()
    degreeId = userInfo.id
    
    document.querySelector(".materias-title").textContent = "Bienvenido, director de carrera " + userInfo.nombre

    const getDegreeURL = await fetch("http://localhost:3000/carrera/" + degreeId, {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    })
    const degreeInfo = await getDegreeURL.json()
    
    document.getElementById("nombre").value = degreeInfo.nombre
    document.getElementById("description").value = degreeInfo.description
    document.getElementById("foto").value = degreeInfo.foto


    const getSubjects = await fetch("http://localhost:3000/materia?carrera=" + degreeId,{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    }
    )
    const subjects = await getSubjects.json()
    for (const materia of subjects) {
        
    }

});

async function editarCarrera(descripcion,nombre,foto) {

    const updateUserURL = await fetch("http://localhost:3000/carrera/" + degreeId, {
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
    })
    const newData = await updateUserURL.json()

}