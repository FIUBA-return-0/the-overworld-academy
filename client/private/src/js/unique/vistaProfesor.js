const truncarPromedio = (n) => {
  let strNum = String(n);
  const decimal = strNum.indexOf(".");
  if (decimal === -1) {
    return n;
  }
  return strNum.substring(0, decimal + 2);
};

async function cargarInfoProfesor() {
  const token = localStorage.getItem('token');

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

  const sortedGrades = {};

  for (const g of grades) {
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

    for (const desc of ["TP1", "TP2", "P1", "P2"]) {
      const celda = document.createElement("th");
      celda.textContent = alumno.notas[desc] ?? "-";
      celda.classList.add("table-nota");
      celda.setAttribute("contenteditable", "false");
      celda.dataset.padron = alumno.id_alumno;
      celda.dataset.description = desc;
      fila.appendChild(celda);
    }

    const tdProm = document.createElement("th");
    tdProm.textContent = alumno.promedio ?? "-";
    tdProm.classList.add("table-nota");
    fila.appendChild(tdProm);

    tabla.appendChild(fila);
  }

  const botonEditar = document.querySelector(".notas-table-wrapper button");
  let modoEdicion = false;

  botonEditar.addEventListener("click", () => {
    const celdas = document.querySelectorAll(".table-nota");

    if (!modoEdicion) {
      celdas.forEach((celda) => {
        celda.setAttribute("contenteditable", "true");
        celda.classList.add("editable");
      });
      botonEditar.textContent = "Guardar";
    } else {
      celdas.forEach(async (celda) => {
        celda.setAttribute("contenteditable", "false");
        celda.classList.remove("editable");

        const nuevaNota = celda.textContent;

        const body = {
          alumno: Number(celda.dataset.padron),
          materia: teacherSubject,
          description: celda.dataset.description,
          nota: nuevaNota,
        };
        console.log(body);

        await fetch(`${API}/nota`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      });

      window.location.reload();
      botonEditar.textContent = "Editar";
    }

    modoEdicion = !modoEdicion;
  });

  const textareaCartelera = document.getElementById("cartelera");
  const botonEditarCartelera = document.getElementById("editar-cartelera");
  let modoEdicionCartelera = false;

  botonEditarCartelera.disabled = false;

  textareaCartelera.value = infoMateria[0].descripcion || "";

  botonEditarCartelera.addEventListener("click", async () => {
    if (!modoEdicionCartelera) {
      textareaCartelera.disabled = false;
      botonEditarCartelera.textContent = "Guardar";
    } else {
      textareaCartelera.disabled = true;
      botonEditarCartelera.textContent = "Editar";

      const nuevoContenido = textareaCartelera.value;

      await fetch(`${API}/materia/` + teacherSubject, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descripcion: nuevoContenido,
        }),
      });
    }

    modoEdicionCartelera = !modoEdicionCartelera;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loader-container").classList.add("hidden");
  }, 1 * 1000);
  cargarInfoProfesor();
});
