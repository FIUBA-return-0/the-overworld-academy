let modo = "editar";

async function habilitarEditarCampos() {
  const boton = document.getElementById("editar-perfil");
  if (modo === "editar") {
    document.getElementById("apellido").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("biografia").disabled = false;

    boton.textContent = "Guardar cambios";
    modo = "guardar";
  } else {
    await patchUsuario({
      nombre: document.getElementById("apellido").value,
      apellido: document.getElementById("nombre").value,
      bio: document.getElementById("biografia").value,
    });

    document.getElementById("apellido").disabled = true;
    document.getElementById("nombre").disabled = true;
    document.getElementById("biografia").disabled = true;

    boton.textContent = "Editar perfil";
    modo = "editar";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const botonEditar = document.getElementById("editar-perfil");
    if (botonEditar) {
      botonEditar.addEventListener("click", habilitarEditarCampos);
    }

    const token = localStorage.getItem("token");
    const getUserURL = await fetch(`${API}/usuario/self`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    switch (getUserURL.status) {
      case 200:
        const userInfo = await getUserURL.json();

        document.getElementById("biografia").value = userInfo.bio;
        document.getElementById("apellido").value = userInfo.apellido;
        document.getElementById("nombre").value = userInfo.nombre;
        document.getElementById("padron").value = userInfo.id;
        document.getElementById("carrera").value = userInfo.carrera;
        document.getElementById("usuario").value = userInfo.username;
        document
          .getElementById("foto-perfil")
          .setAttribute("src", userInfo.foto);
        await setSeleccionada();

        if(localStorage.condicion === "profesor" || localStorage.condicion === "director"){
          document.getElementById("bajarse-carrera").classList.add("hidden");
        }

        setTimeout(() => {
          document.getElementById("loader-container").classList.add("hidden");
        }, 1 * 1000);
        break;

      case 404:
        soundAndRedirect("/404.html");
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
});

async function patchUsuario(body) {
  try {
    const token = localStorage.getItem("token");
    const updateUserURL = await fetch(`${API}/usuario`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    switch (updateUserURL.status) {
      case 200:
        return;

      case 404:
        soundAndRedirect("/404.html");
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
