const truncarPromedio = (n) => {
  let strNum = String(n);
  const decimal = strNum.indexOf(".");
  if (decimal === -1) {
    return n;
  }
  return strNum.substring(0, decimal + 2);
};

const promedioMateria = (promTp, promP) => {
  promTP = parseFloat(promTp);
  promP = parseFloat(promP);
  return truncarPromedio((promTp + promP) / 2);
};

const promedio = (notasParciales) => {
  if (!notasParciales.length) return 0;
  let sum = 0;
  for(nota of notasParciales){
    sum+=parseFloat(notasParciales);
  }
  return truncarPromedio(sum / notasParciales.length);
};

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("continuar-inscripcion-correcta").addEventListener("click", ()=>{
    document.getElementById("modal-inscripcion-correcta").classList.add("hidden");
    document.getElementById("notas").classList.remove("hidden");
    document.getElementById("notas-text").classList.remove("hidden");
    document.getElementById("inscripcion").classList.add("hidden");
    fixViewport();
  });

  let token = localStorage.getItem("token");

  const params = new URLSearchParams(window.location.search);
  const idMateria = params.get("id");

  const getSubjectURL = await fetch(`${API}/materia?id=` + idMateria, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const subjectInfo = await getSubjectURL.json();

  document.querySelector(".materias-title").textContent = subjectInfo.materia;
  document.querySelector(".materia-catedra").textContent =
    "Cátedra: " + subjectInfo.nombprofesor + " " + subjectInfo.apeprofesor;
  document.getElementById("cartelera").textContent = subjectInfo.cartelera;

  const materiasInscripto = JSON.parse(localStorage.getItem("inscripto")) || [];
  const materiasAprobadas = JSON.parse(localStorage.getItem("aprobado")) || [];

  if (
    materiasInscripto.includes(parseInt(idMateria)) ||
    materiasAprobadas.includes(parseInt(idMateria))
  ) {
    document.getElementById("notas").classList.remove("hidden");
    document.getElementById("notas-text").classList.remove("hidden");
    document.getElementById("inscripcion").classList.add("hidden");
    const getGradesURL = await fetch(`${API}/nota?materia=` + idMateria, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const notas = await getGradesURL.json();
    let parciales = [];
    let tps = [];

    notas.forEach((notaObj) => {
      const { description, nota } = notaObj;
      description.includes("TP") ? tps.push(nota) : parciales.push(nota);

      document.getElementById(
        description
      ).textContent = `Nota ${description}: ${nota ? nota : ""}`;
    });

    let promTp = promedio(tps);
    let promP = promedio(parciales);
    let promMateria = promedioMateria(promP, promTp);

    document.getElementById(
      "promedio-parciales"
    ).textContent = `Promedio parciales: ${promP}`;
    document.getElementById(
      "promedio-TPs"
    ).textContent = `Promedio TPs: ${promTp}`;
    document.getElementById(
      "promedio-materia"
    ).textContent = `Promedio materia: ${promMateria}`;
  }

  const botonInscripcion = document.getElementById("inscripcion");
  botonInscripcion.addEventListener("click", async () => {
    try {
      const postInscripcion = await fetch(`${API}/inscripcion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          materia: idMateria,
          alumno: 1,
          condicion: "cursando",
        }),
      });

      console.log(postInscripcion.status);
      switch (postInscripcion.status) {
        case 200:
          const materiasInscripto =
            await JSON.parse(localStorage.getItem("inscripto")) || [];
          await materiasInscripto.push(parseInt(idMateria));
          localStorage.setItem("inscripto", JSON.stringify(materiasInscripto));
          document.getElementById("modal-inscripcion-correcta").classList.remove("hidden");
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
    } catch (er) {
      console.error(er);
      soundAndRedirect("/error-inesperado.html");
    }
  });
});
