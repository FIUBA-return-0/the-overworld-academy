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
      };
    }

    const claveNota = g.description.replace(/\s+/g, "");
    sortedGrades[alumnoId].notas[claveNota] = g.nota;
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

    tabla.appendChild(fila);
  }
}

document.addEventListener("DOMContentLoaded", cargarInfoProfesor);
