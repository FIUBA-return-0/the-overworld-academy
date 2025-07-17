let modo = "editar";
let token = localStorage.getItem("token")
let degreeID = "";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
let subjectID = params.get("id"); 

function habilitarEditarMateria() {
    const boton = document.getElementById("editar-materia");

    if (subjectID !== 'crear') {
        if (modo === "editar") {
            document.getElementById("nombre-materia").disabled = false;
            document.getElementById("materia-img").disabled = false;
            document.getElementById("descripcion").disabled = false;
            document.getElementById("nombre-profesor").disabled = false;
            document.getElementById("carga-horaria").disabled = false;
            boton.textContent = "Guardar cambios";
            modo = "guardar";
        } else {
            editarMateria(
                document.getElementById("nombre-materia").value,
                document.getElementById("materia-img").value,
                document.getElementById("nombre-profesor").value,
                document.getElementById("carga-horaria").value,
                document.getElementById("descripcion").value,
                degreeID
            );

            boton.textContent = "Editar materia";
            modo = "editar";

            document.getElementById("nombre-materia").disabled = true;
            document.getElementById("materia-img").disabled = true;
            document.getElementById("descripcion").disabled = true;
            document.getElementById("carga-horaria").disabled = true;
            document.getElementById("nombre-profesor").disabled = true;
        }
    } else {
        crearMateria(
            document.getElementById("nombre-materia").value,
            document.getElementById("materia-img").value,
            document.getElementById("nombre-profesor").value,
            document.getElementById("carga-horaria").value,
            document.getElementById("descripcion").value,
            degreeID
        );
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const botonEditar = document.getElementById("editar-materia");
        if (botonEditar) {
            botonEditar.addEventListener("click", habilitarEditarMateria);
        }

        const getUserURL = await fetch(`${API}/usuario/self`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        switch (getUserURL.status) {
            case 200:
                const userInfo = await getUserURL.json();
                degreeID = userInfo.carreraid;

                const boton = document.getElementById("editar-materia");

                if (subjectID !== 'crear') {
                    const getSubjectURL = await fetch(`${API}/materia?id=` + subjectID, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const subjectInfo = await getSubjectURL.json();

                    document.getElementById("nombre-materia").value = subjectInfo.materia;
                    document.getElementById("descripcion").value = subjectInfo.descripcion;
                    document.getElementById("materia-img").value = subjectInfo.foto;
                    document.getElementById("carga-horaria").value = subjectInfo.carga_horaria;
                    document.getElementById("nombre-profesor").value = subjectInfo.padron;

                    document.getElementById("nombre-materia").disabled = true;
                    document.getElementById("descripcion").disabled = true;
                    document.getElementById("materia-img").disabled = true;
                    document.getElementById("carga-horaria").disabled = true;
                    document.getElementById("nombre-profesor").disabled = true;

                    boton.textContent = "Editar materia";
                } else {
                    document.getElementById("nombre-materia").disabled = false;
                    document.getElementById("descripcion").disabled = false;
                    document.getElementById("materia-img").disabled = false;
                    document.getElementById("carga-horaria").disabled = false;
                    document.getElementById("nombre-profesor").disabled = false;

                    boton.textContent = "Crear materia";
                }
                break;
            case 401:
                soundAndRedirect("/401.html");
                break;
            case 404:
                soundAndRedirect("/404.html");
                break;
            case 500:
                soundAndRedirect("/500.html");
                break;
            default:
                soundAndRedirect("/error-inesperado.html")
                break;
        }
    } catch (e) {
        console.error(e);
        soundAndRedirect("/error-inesperado.html");
    }
});

async function editarMateria(nombre_materia, foto_materia, id_profesor, carga_horaria, descripcion, id_carrera) {
    const mensajeError = document.getElementById("error-contrasenia");
    if (!nombre_materia || !id_profesor || !carga_horaria || !id_carrera) {
        errorMsg.classList.remove("hidden");
        return;
    } else {
        mensajeError.classList.add("hidden");
    }
    try{
        const updateSubjectURL = await fetch(`${API}/materia/` + subjectID, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: nombre_materia,
                foto: foto_materia,
                profesor: id_profesor,
                carga_horaria: carga_horaria,
                descripcion: descripcion,
                carrera: id_carrera
                })
        });

        switch (updateSubjectURL.status){
            case 200:
                break;
            case 401:
                soundAndRedirect("/401.html");
                break;
            case 404:
                soundAndRedirect("/404.html");
                break;
            case 500:
                soundAndRedirect("/500.html");
                break;
            default:
                soundAndRedirect("/error-inesperado.html")
                break;
            }
    }
    catch(e){
        console.error(e);
        soundAndRedirect("/error-inesperado.html");
    }
}

async function crearMateria(nombre_materia, foto_materia, id_profesor, carga_horaria, descripcion, id_carrera) {
    try {
        const createSubjectURL = await fetch(`${API}/materia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: nombre_materia,
                foto: foto_materia,
                profesor: id_profesor,
                carga_horaria: carga_horaria,
                descripcion: descripcion,
                carrera: id_carrera
            })
        });

        switch (createSubjectURL.status) {
            case 201:
                // salio todo regio!!!!
                window.location.href = "/director.html";
                break;

            case 401:
                soundAndRedirect("/401.html");
                break;

            case 404:
                soundAndRedirect("/404.html");
                break;

            case 500:
                soundAndRedirect("/500.html");
                break;

            default:
                soundAndRedirect("/error-inesperado.html");
                break;
        }

    } catch (e) {
        console.error(e);
        soundAndRedirect("/error-inesperado.html");
    }
}
