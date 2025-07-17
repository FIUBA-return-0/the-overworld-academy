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
  const sum = notasParciales.reduce((acc, cur) => acc + cur);
  return truncarPromedio(sum / notasParciales.length);
};

window.addEventListener("DOMContentLoaded", async () => {
  let token = localStorage.getItem("token");
  const payloadBase64 = token.split(".")[1];
  const payload = JSON.parse(atob(payloadBase64));
  const userId = payload.id;

  const params = new URLSearchParams(window.location.search);
  const idMateria = params.get('id');

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
  document.getElementById("cartelera").textContent = subjectInfo.descripcion;

  const materiasInscripto = JSON.parse(localStorage.getItem("inscripto")) || [];
  const materiasAprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

  if (materiasInscripto.includes(idMateria) || materiasAprobadas.includes(idMateria)) {
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

      document.getElementById(description).textContent = `Nota ${description}: ${nota ? nota : ""}`;
    });

    let promTp = promedio(tps);
    let promP = promedio(parciales);
    let promMateria = promedioMateria(promP, promTp);

    document.getElementById("promedio-parciales").textContent = `Promedio parciales: ${promP}`;
    document.getElementById("promedio-TPs").textContent = `Promedio TPs: ${promTp}`;
    document.getElementById("promedio-materia").textContent = `Promedio materia: ${promMateria}`;
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
          materia:idMateria,
          alumno:userId,
          condicion:"cursando"
         })
      });

      if (postInscripcion.ok) {
        const materiasInscripto = JSON.parse(localStorage.getItem("inscripto")) || [];
        materiasInscripto.push(idMateria);
        localStorage.setItem("inscripto", JSON.stringify(materiasInscripto));

        location.reload();
      } else {
        const error = await postInscripcion.json();
        alert("Error al inscribirse: " + error.message);
      }
    } catch (err) {
      console.error("Fallo en la inscripción:", err);
      alert("Hubo un problema al intentar inscribirse.");
    }
  });
});