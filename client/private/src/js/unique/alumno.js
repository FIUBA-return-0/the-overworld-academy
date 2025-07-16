function createMateriaCard(id, foto, nombre, profesor, descripcion) {
  // materia-card
  // materia-card-img-wrapper
  //      materia-card-img
  // materia-card-text-wrapper
  //      materia-card-title
  //      materia-card-profesor
  //      materia-card-description

  let link = document.createElement("a");
  link.href = `/ver-materia.html?id=${id}`;
  link.classList.add("materia-card-link");

  let materiaCard = document.createElement("div");
  materiaCard.classList.add("materia-card");
  link.appendChild(materiaCard);

  let materiaCardImgWrapper = document.createElement("div");
  materiaCardImgWrapper.classList.add("materia-card-img-wrapper");
  materiaCard.appendChild(materiaCardImgWrapper);

  let materiaCardImg = document.createElement("img");
  materiaCardImg.classList.add("materia-card-img");
  materiaCardImg.src = foto;
  materiaCardImgWrapper.appendChild(materiaCardImg);

  let materiaCardTextWrapper = document.createElement("div");
  materiaCardTextWrapper.classList.add("materia-card-text-wrapper");
  materiaCard.appendChild(materiaCardTextWrapper);

  let materiaCardTitle = document.createElement("h2");
  materiaCardTitle.classList.add("materia-card-title");
  materiaCardTitle.innerText = nombre;
  materiaCardTextWrapper.appendChild(materiaCardTitle);

  let materiaCardProfesor = document.createElement("h2");
  materiaCardProfesor.classList.add("materia-card-profesor");
  materiaCardProfesor.innerText = `Catedra: ${profesor}`;
  materiaCardTextWrapper.appendChild(materiaCardProfesor);

  let materiaCardDescription = document.createElement("p");
  materiaCardDescription.classList.add("materia-card-description");
  materiaCardDescription.innerText = descripcion;
  materiaCardTextWrapper.appendChild(materiaCardDescription);

  document.getElementById("materias-wrapper").appendChild(link);
}

async function fetchfillMateriasAlumno() {
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

        for (const materia of materias) {
          if (materia.foto === null)
            materia.foto = "https://i.imgur.com/DJKWYUo.webp";
          if (materia.descripcion === null) materia.descripcion = "";
          createMateriaCard(
            materia.id,
            materia.foto,
            materia.materia,
            materia.apeprofesor,
            materia.descripcion
          );
        }

        setTimeout(() => {
          document.getElementById("loader-container").classList.add("hidden");
        }, 1 * 1000);
        break;

      case 404:
        const error = (document.createElement("p").innerText =
          "Esta carrera no tiene materias.");
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
