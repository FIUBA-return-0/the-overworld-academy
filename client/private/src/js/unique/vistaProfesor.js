let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdlcm9jYXJ1c2hvIiwiY29uZGljaW9uIjoiYWx1bW5vIiwiaWQiOjEwLCJpYXQiOjE3NTI0MzAwMDh9._Mi-CacyHAFLexQF12tZJF39fvSO7Pgw6TXBvLkuhHU";
let teacherSubject = "";
let alumnosInscriptos = [];

async function cargarInfoProfesor() {
  console.log("HOLA");
  const getSubjectURL = await fetch("http://localhost:3000/materia?profesor=", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const infoMateria = await getSubjectURL.json();

  document.querySelector(".materias-title").value = infoMateria.carrera;
  teacherSubject = infoMateria[0].id;

  let grades = await fetch(
    `http://localhost:3000/nota/?materia=${teacherSubject}`,
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
    if (!sortedGrades[g.id_alumno]) {
      sortedGrades[g.id_alumno] = {
        id_alumno: g.id_alumno,
        nombre: g.nombre,
        apellido: g.apellido,
        notas: {},
      };
    }
  }
}

const tabla = document.querySelector(".notas-table");

for (const alumno of grades) {
  const fila = document.createElement("tr");

  const tdNombre = document.createElement("td");
  tdNombre.textContent = `${alumno.apellido}, ${alumno.nombre}`;
  fila.appendChild(tdNombre);

  const tdPadron = document.createElement("td");
  tdPadron.textContent = alumno.id_alumno ?? "-";
  fila.appendChild(tdPadron);

  const tdTP1 = document.createElement("td");
  tdTP1.textContent = alumno.TP1 ?? "-";
  tdTP1.classList.add("table-nota");
  fila.appendChild(tdTP1);

  const tdTP2 = document.createElement("td");
  tdTP2.textContent = alumno.TP2 ?? "-";
  tdTP2.classList.add("table-nota");
  fila.appendChild(tdTP2);

  const tdP1 = document.createElement("td");
  tdP1.textContent = alumno.P1 ?? "-";
  tdP1.classList.add("table-nota");
  fila.appendChild(tdP1);

  const tdP2 = document.createElement("td");
  tdP2.textContent = alumno.P2 ?? "-";
  tdP2.classList.add("table-nota");
  fila.appendChild(tdP2);

  tabla.appendChild(fila);
}

document
  .getElementById("pruebitas")
  .addEventListener("click", cargarInfoProfesor);
