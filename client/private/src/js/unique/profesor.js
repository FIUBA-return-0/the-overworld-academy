function truncarPromedio(n){
    let strNum = String(n);
    const decimal = strNum.indexOf(".");
    if (decimal === -1) {
        return n;
    }
    return strNum.substring(0, decimal + 2);
};

async function cargarDatosProfesor(){
    const sortedGrades = {};
    const token = localStorage.getItem('token');

    const getSubjectURL = await fetch(`${API}/materia?profesor=1`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    switch(getSubjectURL.status){
        case 200:
            const infoMateria = await getSubjectURL.json();
            
            document.getElementById("materia-title").textContent = `${infoMateria[0].materia}`;

            teacherSubject = infoMateria[0].id;

            const grades = await fetch(`${API}/nota?materia=${teacherSubject}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            switch(grades.status){
                case 200:
                    const gradesData = await grades.json();

                    for (const g of gradesData) {
                        const alumnoId = g.padron;

                        if (!sortedGrades[alumnoId]) {
                            sortedGrades[alumnoId] = {
                                id_alumno: alumnoId,
                                nombre: g.nombre,
                                apellido: g.apellido,
                                notas: {},
                                prom: 0,
                            };
                        }

                        const claveNota = g.description.replace(/\s+/g, "");
                        sortedGrades[alumnoId].notas[claveNota] = g.nota;
                    }

                    for (const key in sortedGrades) {
                        const notas = Object.values(sortedGrades[key].notas);
                        const sum = notas.reduce((a, b) => a + b, 0);
                        sortedGrades[key].promedio = truncarPromedio(sum / notas.length);
                    }
                break;

                case 404:
                    let error = document.createElement("p");
                    error.innerText = "Esta materia no tiene alumnos.";
                    error.classList.add("minecraft-p");
                    document.getElementById("notas-container").append(error);
                    document.getElementsByClassName("nota-card-alumno")[0].classList.add("hidden");
                break;

                case 401:
                    soundAndRedirect("/401.html");
                break;

                case 500:
                    soundAndRedirect("/500.html");
                break;

                default:
                    soundAndRedirect("/error-inesperado.html");
                break;
            }
        break;

        case 401:
            soundAndRedirect("/401.html");
        break;

        case 500:
            soundAndRedirect("/500.html");
        break;

        default:
            soundAndRedirect("/error-inesperado.html");
        break;
    }
}

document.addEventListener("DOMContentLoaded", cargarDatosProfesor);

function createNotaCard(padron, nombre, tp1, tp2, p1, p2){
    let notaCardAlumno = document.createElement("div")
    notaCardAlumno.classList.add("nota-card-alumno");
    
    let padronP = document.createElement("p");
    padronP.classList.add("nota-p");
    padronP.innerText=padron;
    notaCardAlumno.append(padronP);
    
    let nombreP = document.createElement("p");
    nombreP.classList.add("nota-p");
    nombreP.innerText=nombre;
    notaCardAlumno.append(nombreP);

    let tp1I = document.createElement("input");
    tp1I.type="number";
    tp1I.value=tp1;
    tp1I.disabled=true;
    notaCardAlumno.append(tp1I);

    let tp2I = document.createElement("input");
    tp2I.type="number";
    tp2I.value=tp2;
    tp2I.disabled=true;
    notaCardAlumno.append(tp2I);

    let p1I = document.createElement("input");
    p1I.type="number";
    p1I.value=p1;
    p1I.disabled=true;
    notaCardAlumno.append(p1I);

    let p2I = document.createElement("input");
    p2I.type="number";
    p2I.value=p2;
    p2I.disabled=true;
    notaCardAlumno.append(p2I);
    
    
    let promedioI = document.createElement("input");
    promedioI.type="number";
    promedioI.disabled=true;
    if(p1!==null && p2!==null && tp1!==null && tp2!==null){
        promedioI.value=(((p1+p2)/2)+((tp1+tp2)/2))/2;
    }
    else{
        promedioI.value=null;
    }
    notaCardAlumno.append(promedioI);

    let editarB = document.createElement("button");
    editarB.innerText = "Editar";
    editarB.id=`editar-${padron}`;
    // editarB.addEventListener("click", )
    notaCardAlumno.append(editarB);
    
    document.getElementById("notas-container").append(notaCardAlumno);
}

createNotaCard(113931, "Lattandi, Facundo", 10, 9, 6, 9);
createNotaCard(113931, "Lattandi, Facundo", 10, 9, 6, 9);
createNotaCard(113931, "Lattandi, Facundo", 10, 9, 6, 9);
createNotaCard(113931, "Lattandi, Facundo", 10, 9, 6, 9);
