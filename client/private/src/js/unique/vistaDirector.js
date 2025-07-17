let modo = "editar";
let degreeId = "";

async function habilitarEditarCampos() {
  const boton = document.getElementById("editar-carrera");
  if (modo === "editar") {
    document.getElementById("description").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("foto").disabled = false;

    boton.textContent = "Guardar cambios";
    modo = "guardar";
  } else {
    await editarCarrera(
      document.getElementById("description").value,
      document.getElementById("nombre").value,
      document.getElementById("foto").value
    );

    document.getElementById("description").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("foto").disabled = true;

    boton.textContent = "Editar carrera";
    modo = "editar";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  if (localStorage.condicion == "profesor") {
    window.location.href = "/401.html";
    return;
  } else if (localStorage.condicion == "alumno") {
    window.location.href = "/401.html";
    return;
  }

  try {
    const botonEditar = document.getElementById("editar-carrera");
    if (botonEditar) {
      botonEditar.addEventListener("click", habilitarEditarCampos);
    }

    const token = localStorage.token;
    const getUserURL = await fetch(`${API}/usuario/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    switch (getUserURL.status) {
      case 200:
        const userInfo = await getUserURL.json();
        degreeId = userInfo.carreraid;

        document.querySelector(".materias-title").textContent =
          "Bienvenido, director de carrera " + userInfo.nombre;

        const getDegreeURL = await fetch(`${API}/carrera/` + degreeId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        switch (getUserURL.status){
            case 200:
                const userInfo = await getUserURL.json();
                degreeId = userInfo.carreraid;
                
                document.querySelector(".materias-title").textContent = "Bienvenido, director de carrera " + userInfo.nombre;

                const getDegreeURL = await fetch(`${API}/carrera/` + degreeId, {
                    method:"GET",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                switch (getDegreeURL.status){
                    case 200:
                        const degreeInfo = await getDegreeURL.json()
                
                        document.getElementById("nombre").value = degreeInfo.carrera;
                        document.getElementById("description").value = degreeInfo.description;
                        document.getElementById("foto").value = degreeInfo.foto;

                        const getSubjects = await fetch(`${API}/materia?carrera=` + degreeId,{
                            method:"GET",
                            headers: {
                                "Content-Type":"application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        });

                        switch (getSubjects.status){
                            case 200:
                                const subjects = await getSubjects.json()
                                for (const materia of subjects) {
                                    if (materia.foto === null)
                                        materia.foto = "https://i.imgur.com/DJKWYUo.webp";
                                    if (materia.descripcion === null) materia.descripcion = "";
                                    createMateriaCard(
                                        materia.id,
                                        materia.foto,
                                        materia.materia,
                                        materia.apeprofesor,
                                        materia.descripcion,
                                        "",
                                        "materias-wrapper",
                                        "/editar-materia.html?id=",
                                    );
                                }
                                setTimeout(() => {
                                    document.getElementById("loader-container").classList.add("hidden");
                                }, 1 * 1000);
                            break;

                            case 404:
                                let p = document.createElement("p");
                                p.innerText = "Esta carrera no tiene materias.";
                                p.classList.add("minecraft-p");
                                document.getElementById("materias-wrapper").append(p);
                                setTimeout(() => {
                                    document.getElementById("loader-container").classList.add("hidden");
                                }, 1 * 1000);
                            break;

                            case 500:
                                soundAndRedirect('/500.html');
                            break;

                            case 401:
                                soundAndRedirect('/401.html');
                            break;

                            default:
                                soundAndRedirect('/error-inesperado.html');
                            break;
                        }
                    break;

                    case 404:
                        soundAndRedirect('/404.html');
                    break;

                    case 500:
                        soundAndRedirect('/500.html');
                    break;

                    case 401:
                        soundAndRedirect('/401.html');
                    break;

                    default:
                        soundAndRedirect('/error-inesperado.html');
                    break;
                }
                setTimeout(() => {
                  document
                    .getElementById("loader-container")
                    .classList.add("hidden");
                }, 1 * 1000);
                break;

              case 404:
                let p = document.createElement("p");
                p.innerText = "Esta carrera no tiene materias.";
                p.classList.add("minecraft-p");
                document.getElementById("materias-wrapper").append(p);
                setTimeout(() => {
                  document
                    .getElementById("loader-container")
                    .classList.add("hidden");
                }, 1 * 1000);
                break;

              case 500:
                soundAndRedirect("/500.html");
                break;

              case 401:
                soundAndRedirect("/401.html");
                break;

              default:
                soundAndRedirect("/error-inesperado.html");
                break;
            }
            break;

          case 404:
            soundAndRedirect("/404.html");
            break;

          case 500:
            soundAndRedirect("/500.html");
            break;

          case 401:
            soundAndRedirect("/401.html");
            break;

          default:
            soundAndRedirect("/error-inesperado.html");
            break;
        }
        break;

      case 404:
        soundAndRedirect("/404.html");
        break;

      case 500:
        soundAndRedirect("/500.html");
        break;

      case 401:
        soundAndRedirect("/401.html");
        break;

      default:
        soundAndRedirect("/error-inesperado.html");
        break;
    }
  } catch (e) {
    console.log(e);
    soundAndRedirect("/error-inesperado.html");
  }
});

async function editarCarrera(descripcion, nombre, foto) {
  try {
    const token = localStorage.token;
    const mensajeError = document.getElementById("error-edicion");
    if (!descripcion || !nombre || !foto) {
      mensajeError.classList.remove("hidden");
      return;
    } else {
      mensajeError.classList.add("hidden");
    }
    const updateCarrera = await fetch(`${API}/carrera/` + degreeId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: nombre,
        description: descripcion,
        foto: foto,
      }),
    });

    switch (updateCarrera.status) {
      case 200:
        return;

      case 404:
        soundAndRedirect("/404.html");
        break;

      case 500:
        soundAndRedirect("/500.html");
        break;

      case 401:
        soundAndRedirect("/401.html");
        break;

      default:
        soundAndRedirect("/error-inesperado.html");
        break;
    }
  } catch (e) {
    console.log(e);
    soundAndRedirect("/error-inesperado.html");
  }
}
