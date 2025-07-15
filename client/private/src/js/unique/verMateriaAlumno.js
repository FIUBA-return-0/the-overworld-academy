window.addEventListener("DOMContentLoaded", async () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdlcm9jdWxvIiwiY29uZGljaW9uIjoiYWx1bW5vIiwiaWQiOjMsImlhdCI6MTc1MjU4Mzc3OH0.YxVzC3Mdofw1a-Rf6zw0U5A7MCklIO0fbkeJRqWf3Vw";
  
    let payloadBase64 = token.split('.')[1];
    let decodedPayload = JSON.parse(atob(payloadBase64));
    let userId = decodedPayload.id;

    const getSubjectURL = await fetch("http://localhost:3000/materia?id=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    const subjectInfo = await getSubjectURL.json()

    document.querySelector(".materias-title").textContent = subjectInfo.materia;
        document.querySelector(".materia-catedra").textContent =
          "Cátedra: " + subjectInfo.nombprofesor + " " + subjectInfo.apeprofesor;
        document.getElementById("cartelera").textContent = subjectInfo.descripcion;

        const getGradesURL = await fetch("http://localhost:3000/nota?alumno=" + userId + "&materia=1", {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          })
        const notas = await getGradesURL.json()
        let promedioTPS = 0
        let promedioParciales = 0
              notas.forEach(notaObj => {
                const { nota, description } = notaObj;
                if(description==="TP1" || description==="TP2"){
                    promedioTPS += nota
                }
                if(description==="P1" || description==="P2"){
                    promedioParciales += nota
                }


                document.getElementById(description).textContent = `Nota ${description}: ${nota}`;
              });
              document.getElementById("promedio-parciales").textContent = `Promedio parciales: ${promedioParciales / 2}`;
              document.getElementById("promedio-tps").textContent = `Promedio TPs: ${promedioTPS / 2}`;
              document.getElementById("promedio-materia").textContent = `Promedio materia: ${(promedioParciales + promedioTPS) / 2
              }`;
            });