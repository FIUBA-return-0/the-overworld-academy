const truncarPromedio = (n) => {
  let strNum = String(n);
  const decimal = strNum.indexOf(".");
  if (decimal === -1) {
    return n;
  }
  return strNum.substring(0, decimal + 2);
};

async function cargarInfoProfesor() {
  const token = localStorage.getItem("token");

  const getSubjectURL = await fetch(`${API}/materia?profesor=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const infoMateria = await getSubjectURL.json();

  document.querySelector(
    ".materias-title"
  ).textContent = `Propuesta: ${infoMateria[0].materia}`;

  teacherSubject = infoMateria[0].id;

  let grades = await fetch(`${API}/nota?materia=${teacherSubject}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  grades = await grades.json();

  let inscriptos = await fetch(
    `${API}/inscripcion/?materia=1&condicion=cursando`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
}

await fetch(`${API}/nota`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: {
    alumno,
    materia,
    description,
    nota,
  },
});

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loader-container").classList.add("hidden");
  }, 1 * 1000);
  cargarInfoProfesor();
});
