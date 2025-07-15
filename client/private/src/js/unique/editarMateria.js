let modo = "editar";
let token = window.localStorage("token")
let teacherID = ""
let degreeID = ""
let subjectID = ""

function habilitarEditarMateria(){
    const boton = document.getElementById("editar-materia");
    if (modo === "editar"){
    document.getElementById("nombre-materia").disabled = false;
    document.getElementById("nombre-profesor").disabled = false;
    document.getElementById("materia-img").disabled = false;
    document.getElementById("descripcion").disabled = false;
    document.getElementById("carga-horaria").disabled = false;
    
    boton.textContent = "Guardar cambios";
    modo = "guardar";
    }

    else{

    editarMateria(document.getElementById("nombre-materia").value,
    document.getElementById("materia-img").value,
    teacherID,
    document.getElementById("carga-horaria").value,
    degreeID)

    document.getElementById("nombre-materia").disabled = true;
    document.getElementById("nombre-profesor").disabled = true;
    document.getElementById("materia-img").disabled = true;
    document.getElementById("descripcion").disabled = true;
    document.getElementById("carga-horaria").disabled = true;
    
    boton.textContent = "Editar materia";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    const botonEditar = document.getElementById("editar-materia");
    if (botonEditar) {
        botonEditar.addEventListener("click", habilitarEditarMateria);
    }

    const getUserURL = await fetch("http://localhost:3000/usuario/self", {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
    const userInfo = await getUserURL.json()
    teacherID = userInfo.id
    degreeID = userInfo.carreraid
    const getSubjectURL = await fetch("http://localhost:3000/materia?profesor=" + teacherID, {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
            },
    })
    const subjectInfo = await getSubjectURL.json()
    const materia = subjectInfo[0]
    subjectID = materia.id



    document.getElementById("nombre-materia").disabled = false;
    document.getElementById("materia-img").disabled = false;
    document.getElementById("carga-horaria").disabled = false;
    document.getElementById("nombre-profesor").disabled = false;


    document.getElementById("nombre-materia").value = materia.materia;
    document.getElementById("materia-img").value = materia.foto;
    document.getElementById("carga-horaria").value = materia.carga_horaria;
    document.getElementById("nombre-profesor").value = teacherID

    document.getElementById("nombre-materia").disabled = true;
    document.getElementById("materia-img").disabled = true;
    document.getElementById("carga-horaria").disabled = true;
    document.getElementById("nombre-profesor").disabled = true;
});

async function editarMateria(nombre_materia,foto_materia,id_profesor,carga_horaria,id_carrera) {
    
    
    const updateSubjectURL = await fetch("http://localhost:3000/materia/" + subjectID, {
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({
            nombre:nombre_materia,
            foto:foto_materia,
            profesor:id_profesor,
            carga_horaria:carga_horaria,
            carrera:id_carrera
        })
    })

    const newSubject = await updateSubjectURL.json()
    console.log(newSubject)
}