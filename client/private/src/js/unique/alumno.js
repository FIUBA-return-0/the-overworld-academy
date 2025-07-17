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
            materia.descripcion,
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
