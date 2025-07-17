let modo = "editar";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdlcm9jYXJ1bGxvIiwiY29uZGljaW9uIjoiZGlyZWN0b3IiLCJpZCI6MSwiaWF0IjoxNzUyNzE0Njk2fQ.h9B0MhUzwKoDujYSuUa59EA3CE5PE7DwtVyyvB0rrhU"
let degreeID = "";
let subjectID = 1;

function habilitarEditarMateria(){
    const boton = document.getElementById("editar-materia");
    if (modo === "editar"){
    document.getElementById("nombre-materia").disabled = false;
    document.getElementById("materia-img").disabled = false;
    document.getElementById("descripcion").disabled = false;
    document.getElementById("nombre-profesor").disabled = false;
    document.getElementById("carga-horaria").disabled = false;
    boton.textContent = "Guardar cambios";
    modo = "guardar";
    }

    else{
    if(subjectID !== 'crear'){
    editarMateria(document.getElementById("nombre-materia").value,
    document.getElementById("materia-img").value,
    document.getElementById("nombre-profesor").value,
    document.getElementById("carga-horaria").value,
    document.getElementById("descripcion").value,
    degreeID)

    } else {
    crearMateria(document.getElementById("nombre-materia").value,
    document.getElementById("materia-img").value,
    document.getElementById("nombre-profesor").value,
    document.getElementById("carga-horaria").value,
    document.getElementById("descripcion").value,
    degreeID)
    }
    
    boton.textContent = "Editar materia";
    modo = "editar";

    document.getElementById("nombre-materia").disabled = true;
    document.getElementById("materia-img").disabled = true;
    document.getElementById("descripcion").disabled = true;
    document.getElementById("carga-horaria").disabled = true;
    document.getElementById("nombre-profesor").disabled = true;
}
};

window.addEventListener("DOMContentLoaded", async () => {
        const botonEditar = document.getElementById("editar-materia");
        if (botonEditar) {
            botonEditar.addEventListener("click", habilitarEditarMateria);
        }
        const getUserURL = await fetch(`${API}/usuario/self`, {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        const userInfo = await getUserURL.json()
        degreeID = userInfo.carreraid
        if(subjectID !== 'crear'){
        const getSubjectURL = await fetch(`${API}/materia?id=` + subjectID, {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                },
        })

        const subjectInfo = await getSubjectURL.json()
        console.log(subjectInfo)

        
        document.getElementById("nombre-materia").value = subjectInfo.materia;
        document.getElementById("descripcion").value = subjectInfo.descripcion;
        document.getElementById("materia-img").value = subjectInfo.foto;
        document.getElementById("carga-horaria").value = subjectInfo.carga_horaria;
        document.getElementById("nombre-profesor").value = subjectInfo.padron

        document.getElementById("nombre-materia").disabled = true;
        document.getElementById("descripcion").disabled = true;
        document.getElementById("materia-img").disabled = true;
        document.getElementById("carga-horaria").disabled = true;
        document.getElementById("nombre-profesor").disabled = true;
    }
    
    }

    
    );


async function editarMateria(nombre_materia,foto_materia,id_profesor,carga_horaria,descripcion,id_carrera) {
    
    const updateSubjectURL = await fetch(`${API}/materia/` + subjectID, {
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
            descripcion:descripcion,
            carrera:id_carrera
        })
    })

    const newSubject = await updateSubjectURL.json()
}

async function crearMateria(nombre_materia,foto_materia,id_profesor,carga_horaria,descripcion,id_carrera){
    
    const createSubjectURL = await fetch(`${API}/materia`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({
            nombre:nombre_materia,
            foto:foto_materia,
            profesor:id_profesor,
            carga_horaria:carga_horaria,
            descripcion:descripcion,
            carrera:id_carrera
        })
    })
    const newSubject = await createSubjectURL.json()
    console.log(newSubject)
}