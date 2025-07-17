async function inscripcionAlumno() {
  const token = localStorage.token;
  let inscripciones = await fetch(`${API}/inscripcion/?alumno=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  inscripciones = await inscripciones.json();
  console.log(inscripciones);

  let inscripto = [];
  let aprobado = [];
  inscripciones.forEach((i) => {
    i.condicion === "aprobado" && aprobado.push(parseInt(i.idcarrera));
    i.condicion === "cursando" && inscripto.push(parseInt(i.idcarrera));
  });

  localStorage.setItem("inscripto", JSON.stringify(inscripto));
  localStorage.setItem("aprobado", JSON.stringify(aprobado));
}

async function fetchfillMateriasAlumno() {
  await inscripcionAlumno();
  try {
    const idCarrera = localStorage.getItem("carreraID");
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/materia?carrera=${idCarrera}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    switch (res.status) {
      case 200:
        const materias = await res.json();

        document.getElementById(
          "materias-title"
        ).innerHTML = `Propuesta: ${materias[0].carrera}`;
        const inscripto = JSON.parse(localStorage.inscripto || "[]");
        const aprobado = JSON.parse(localStorage.aprobado || "[]");

        for (const materia of materias) {
          console.log(materia);

          if (materia.foto === null)
            materia.foto = "https://i.imgur.com/DJKWYUo.webp";
          if (materia.descripcion === null) materia.descripcion = "";
          if (aprobado.includes(materia.id)) {
            materia.clase = "materia-aprobado";
          } else if (inscripto.includes(materia.id)) {
            materia.clase = "materia-inscripto";
          } else {
            materia.clase = "";
          }

          createMateriaCard(
            materia.id,
            materia.foto,
            materia.materia,
            materia.apeprofesor,
            materia.descripcion,
            materia.clase,
            "materias-wrapper",
            "/ver-materia.html?id="
          );
        }

        setTimeout(() => {
          document.getElementById("loader-container").classList.add("hidden");
        }, 1 * 1000);
        break;

      case 404:
        let error = document.createElement("p");
        error.innerText = "Esta carrera no tiene materias.";
        error.classList.add("minecraft-p");
        document.getElementById("materias-wrapper").append(error);

        setTimeout(() => {
          document.getElementById("loader-container").classList.add("hidden");
        }, 1 * 1000);
        break;

      case 500:
        soundAndRedirect("/500.html");
        break;

      case 401:
        localStorage.clear();
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

document.addEventListener("DOMContentLoaded", fetchfillMateriasAlumno);
