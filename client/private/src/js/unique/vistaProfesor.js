const truncarPromedio = (n) => {
  let strNum = String(n);
  const decimal = strNum.indexOf(".");
  if (decimal === -1) {
    return n;
  }
  return strNum.substring(0, decimal + 2);
};

async function cargarInfoProfesor() {
  const token = window.localStorage.getItem("token");

  const getSubjectURL = await fetch(
    "http://localhost:3000/materia?profesor=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const infoMateria = await getSubjectURL.json();

  document.querySelector(
    ".materias-title"
  ).textContent = `Propuesta: ${infoMateria[0].materia}`;
  document.getElementById("cartelera").value = infoMateria.descripcion

  document.querySelector(".materias-title").value = infoMateria.carrera;
  teacherSubject = infoMateria[0].id;

  let grades = await fetch(
    `http://localhost:3000/nota?materia=${teacherSubject}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  grades = await grades.json();

  const sortedGrades = {};

  for (const g of grades) {
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
  const tabla = document.querySelector(".notas-table");

  const encabezado = tabla.querySelector("tr");
  tabla.innerHTML = "";
  tabla.appendChild(encabezado);

  for (const key in sortedGrades) {
    const alumno = sortedGrades[key];
    const fila = document.createElement("tr");

    const tdNombre = document.createElement("th");
    tdNombre.textContent = `${alumno.apellido}, ${alumno.nombre}`;
    fila.appendChild(tdNombre);

    const tdPadron = document.createElement("th");
    tdPadron.textContent = alumno.id_alumno ?? "-";
    fila.appendChild(tdPadron);

    const tdTP1 = document.createElement("th");
    tdTP1.textContent = alumno.notas.TP1 ?? "-";
    tdTP1.classList.add("table-nota");
    fila.appendChild(tdTP1);

    const tdTP2 = document.createElement("th");
    tdTP2.textContent = alumno.notas.TP2 ?? "-";
    tdTP2.classList.add("table-nota");
    fila.appendChild(tdTP2);

    const tdP1 = document.createElement("th");
    tdP1.textContent = alumno.notas.P1 ?? "-";
    tdP1.classList.add("table-nota");
    fila.appendChild(tdP1);

    const tdP2 = document.createElement("th");
    tdP2.textContent = alumno.notas.P2 ?? "-";
    tdP2.classList.add("table-nota");
    fila.appendChild(tdP2);

    const tdProm = document.createElement("th");
    tdProm.textContent = alumno.promedio ?? "-";
    tdProm.classList.add("table-nota");
    fila.appendChild(tdProm);

    tabla.appendChild(fila);
  }
}

function habilitarEditarCartelera(){
  const boton = document.getElementById("editar-cartelera");
  if (modo === "editar"){
  document.getElementById("cartelera").disabled = false;
  
  boton.textContent = "Guardar cambios";
  modo = "guardar";
  }

  else{

  editarCartelera(
  document.getElementById("cartelera").value,
)

  document.getElementById("cartelera").disabled = true;
  
  boton.textContent = "Editar perfil";
  modo = "editar";
  }
};

async function editarCartelera(cartelera){

  await fetch("http://localhost:3000/materia?profesor=1",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        descripcion:cartelera
      })
    })
}
document.addEventListener("DOMContentLoaded", cargarInfoProfesor(), habilitarEditarCartelera());
