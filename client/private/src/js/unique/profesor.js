function truncarPromedio(n){
    let strNum = String(n);
    const decimal = strNum.indexOf(".");
    if (decimal === -1) {
        return n;
    }
    return strNum.substring(0, decimal + 2);
};

async function cargarDatosProfesor(){
    const token = localStorage.getItem('token');

    try{
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
                document.getElementById("cartelera").textContent = infoMateria[0].cartelera;

                teacherSubject = infoMateria[0].id;
                localStorage.teacherSubject = teacherSubject;

                let grades = await fetch(`${API}/nota?materia=${teacherSubject}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                switch(grades.status){
                    case 200:
                        grades = await grades.json();

                        let inscriptos = await fetch(`${API}/inscripcion/?materia=${teacherSubject}&condicion=cursando`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        inscriptos = await inscriptos.json();
                        
                        let idsInscriptos = [];
                        inscriptos.forEach((alumno) => {
                            idsInscriptos.push(alumno.idalumno);
                        });

                        let finalGrades = [];

                        grades.forEach((n) => {
                            idsInscriptos.includes(n.padron) && finalGrades.push(n);
                        });

                        const sortedGrades = {};

                        for (const g of finalGrades) {
                            const alumnoId = g.padron;

                            if (!sortedGrades[alumnoId]) {
                                sortedGrades[alumnoId] = {
                                    id_alumno: alumnoId,
                                    nombre: g.nombre,
                                    apellido: g.apellido,
                                    notas: {},
                                    promedio: 0,
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

                        for (const key in sortedGrades) {
                            const alumno = sortedGrades[key]
                            createNotaCard(alumno.id_alumno, `${alumno.apellido}, ${alumno.nombre}`, alumno.notas.TP1, alumno.notas.TP2, alumno.notas.P1, alumno.notas.P2);
                        }

                        setTimeout(() => {
                            document.getElementById("loader-container").classList.add("hidden");
                        }, 1 * 1000);
                    break;

                    case 404:
                        let error = document.createElement("p");
                        error.innerText = "Esta materia no tiene alumnos.";
                        error.classList.add("minecraft-p");
                        document.getElementById("notas-container").append(error);
                        document.getElementsByClassName("nota-card-alumno")[0].classList.add("hidden");

                        setTimeout(() => {
                            document.getElementById("loader-container").classList.add("hidden");
                        }, 1 * 1000);
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
    catch(e){
        console.log(e);
        soundAndRedirect('/error-inesperado.html');
    }
}

document.addEventListener("DOMContentLoaded", cargarDatosProfesor);

let estadoEditarCartelera = "disabled";
async function editarCartelera(){
    let cartelera = document.getElementById("cartelera");
    
    //enable
    if(estadoEditarCartelera === "disabled"){
        estadoEditarCartelera = "editar";
        document.getElementById("editar-cartelera").innerText = "Guardar";
        cartelera.disabled = false;
    }
    
    //disable
    else if(estadoEditarCartelera === "editar"){
        estadoEditarCartelera = "disabled";
        document.getElementById("editar-cartelera").innerText = "Editar";
        cartelera.disabled = true;

        try{
            const token = localStorage.token;
            const teacherSubject = localStorage.teacherSubject;
            const res = await fetch(`${API}/materia/${teacherSubject}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "cartelera": cartelera.value
                }),
            });

            switch (res.status) {
                case 200:
                return;

                case 404:
                    soundAndRedirect("/404.html");
                    break;

                case 500:
                    soundAndRedirect("/500.html");
                break;

                case 401:
                    soundAndRedirect("/401.html");
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
}

document.getElementById("editar-cartelera").addEventListener("click", editarCartelera);

async function editarNotas(padron){
    const state = document.getElementById(`tp1-${padron}`).disabled;
    
    if(state === true){
        document.getElementById(`editar-${padron}`).innerText="Guardar";
        document.getElementById(`tp1-${padron}`).disabled = false;
        document.getElementById(`tp2-${padron}`).disabled = false;
        document.getElementById(`p1-${padron}`).disabled = false;
        document.getElementById(`p2-${padron}`).disabled = false;
    }
    
    else{
        document.getElementById(`editar-${padron}`).innerText="Editar";
        
        const tp1I = document.getElementById(`tp1-${padron}`);
        const tp2I = document.getElementById(`tp2-${padron}`);
        const p1I = document.getElementById(`p1-${padron}`);
        const p2I = document.getElementById(`p2-${padron}`);
        const promedioI = document.getElementById(`promedio-${padron}`);
        
        tp1I.disabled = true;
        tp2I.disabled = true;
        p1I.disabled = true;
        p2I.disabled = true;
        
        const tp1 = tp1I.value;
        const tp2 = tp2I.value;
        const p1 = p1I.value;
        const p2 = p2I.value;
        
        if(p1!=="" && p2!=="" && tp1!=="" && tp2!==""){
            const ntp1=parseFloat(tp1);
            const ntp2=parseFloat(tp2);
            const np1=parseFloat(p1);
            const np2=parseFloat(p2);
            promedioI.value=(((np1+np2)/2)+((ntp1+ntp2)/2))/2;
        }
        else{
            promedioI.value="";
        }

        try{
            const notas = {"TP1":tp1, "TP2":tp2, "P1":p1, "P2":p2};
            for(const key in notas){
                const res = await fetch(`${API}/nota`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        alumno: padron,
                        materia: localStorage.teacherSubject,
                        description: key,
                        nota: notas[key]
                    })
                });

                switch (res.status) {
                    case 200:
                    return;

                    case 404:
                        soundAndRedirect("/404.html");
                        break;

                    case 500:
                        soundAndRedirect("/500.html");
                    break;

                    case 401:
                        soundAndRedirect("/401.html");
                    break;

                    default:
                        soundAndRedirect("/error-inesperado.html");
                    break;
                }
            }
        }
        catch (e) {
            console.error(e);
            soundAndRedirect("/error-inesperado.html");
        }
    }
}

function createNotaCard(padron, nombre, tp1, tp2, p1, p2){
    let notaCardAlumno = document.createElement("div")
    notaCardAlumno.classList.add("nota-card-alumno");
    notaCardAlumno.id=padron;
    
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
    tp1I.id=`tp1-${padron}`;
    notaCardAlumno.append(tp1I);
    
    let tp2I = document.createElement("input");
    tp2I.type="number";
    tp2I.value=tp2;
    tp2I.disabled=true;
    tp2I.id=`tp2-${padron}`;
    notaCardAlumno.append(tp2I);

    let p1I = document.createElement("input");
    p1I.type="number";
    p1I.value=p1;
    p1I.disabled=true;
    p1I.id=`p1-${padron}`;
    notaCardAlumno.append(p1I);

    let p2I = document.createElement("input");
    p2I.type="number";
    p2I.value=p2;
    p2I.disabled=true;
    p2I.id=`p2-${padron}`;
    notaCardAlumno.append(p2I);
    
    let promedioI = document.createElement("input");
    promedioI.type="number";
    promedioI.disabled=true;
    promedioI.id=`promedio-${padron}`;
    if(p1!=="" && p2!=="" && tp1!=="" && tp2!==""){
        promedioI.value=(((p1+p2)/2)+((tp1+tp2)/2))/2;
    }
    else{
        promedioI.value="";
    }
    notaCardAlumno.append(promedioI);

    let editarB = document.createElement("button");
    editarB.innerText = "Editar";
    editarB.id=`editar-${padron}`;
    editarB.addEventListener("click", ()=>{
        editarNotas(padron);
    });
    notaCardAlumno.append(editarB);
    
    document.getElementById("notas-container").append(notaCardAlumno);
}
