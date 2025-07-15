let modo = "editar";
let token = localStorage.getItem('token');
let teacherID = "";
let degreeID = "";
let subjectID = "";

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

    editarMateria(document.getElementById("nombre-materia").value,
    document.getElementById("materia-img").value,
    teacherID,
    document.getElementById("carga-horaria").value,
    document.getElementById("descripcion").value,
    degreeID)

    document.getElementById("nombre-materia").disabled = true;
    document.getElementById("materia-img").disabled = true;
    document.getElementById("descripcion").disabled = true;
    document.getElementById("carga-horaria").disabled = true;
    document.getElementById("nombre-profesor").disabled = true;
    
    boton.textContent = "Editar materia";
    modo = "editar";
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    try{
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
        teacherID = userInfo.id
        degreeID = userInfo.carreraid
        const getSubjectURL = await fetch(`${API}/usuario/materia?profesor=` + teacherID, {
            method:"GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
                },
        })

        // check de errores

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

        // check de errores

        const subjectInfo = await getSubjectURL.json()
        const materia = subjectInfo[0]
        subjectID = materia.id

        document.getElementById("nombre-materia").disabled = false;
        document.getElementById("descripcion").disabled = false;
        document.getElementById("materia-img").disabled = false;
        document.getElementById("carga-horaria").disabled = false;
        document.getElementById("nombre-profesor").disabled = false;

        document.getElementById("nombre-materia").value = materia.materia;
        document.getElementById("descripcion").value = materia.descripcion;
        document.getElementById("materia-img").value = materia.foto;
        document.getElementById("carga-horaria").value = materia.carga_horaria;
        document.getElementById("nombre-profesor").value = teacherID

        document.getElementById("nombre-materia").disabled = true;
        document.getElementById("descripcion").disabled = true;
        document.getElementById("materia-img").disabled = true;
        document.getElementById("carga-horaria").disabled = true;
        document.getElementById("nombre-profesor").disabled = true;
    }

    catch(e){
        console.error(e);
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }
    });


async function editarMateria(nombre_materia,foto_materia,id_profesor,carga_horaria,descripcion,id_carrera) {
    
    const updateSubjectURL = await fetch(`${API}/usuario/materia/` + subjectID, {
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