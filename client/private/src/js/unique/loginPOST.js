async function loginPOST(body) {
  try {
    const res = await fetch(`${API}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    switch (res.status) {
      case 200:
        try {
          let token = await res.json();

          localStorage.setItem("token", token);

          const selfData = await fetch(`${API}/usuario/self`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const selfDataJSON = await selfData.json();

          localStorage.setItem("condicion", selfDataJSON.condicion);
          localStorage.setItem("nombre", selfDataJSON.nombre);
          localStorage.setItem("apellido", selfDataJSON.apellido);
          localStorage.setItem("foto", selfDataJSON.foto);
          localStorage.setItem("carreraID", selfDataJSON.carreraid);

          window.location.href = `/${selfDataJSON.condicion}.html`;
        } catch (e) {
          console.error(e);
        }
        break;

      case 401:
        soundAndRedirect("/401.html");
        break;

      case 500:
        soundAndRedirect("/500.html");
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
