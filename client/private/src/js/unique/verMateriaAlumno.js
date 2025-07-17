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
  console.log(notasParciales);

  if (!notasParciales.length) return 0;
  const sum = notasParciales.reduce((acc, cur) => acc + cur);
  return truncarPromedio(sum / notasParciales.length);
};

window.addEventListener("DOMContentLoaded", async () => {
  let token = localStorage.token;

  const getSubjectURL = await fetch(`${API}/materia?id=1`, {
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

  const getGradesURL = await fetch(`${API}/nota?materia=1`, {
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

    document.getElementById(description).textContent = `Nota ${description}: ${
      nota ? nota : ""
    }`;
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
});
