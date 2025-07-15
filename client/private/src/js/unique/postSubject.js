const token = window.localStorage("token")

async function crearMateria() {

    const getUserURL = await fetch("http://localhost:3000/usuario/self", {
        method:"GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
    })
    const userInfo = await getUserURL.json()
    const directorDegree = userInfo.carreraid

    const nombre_materia = document.getElementById("nombre-materia").value
    const id_profesor = document.getElementById("nombre-profesor").value
    const foto_materia = document.getElementById("materia-img").value
    const carga_horaria = document.getElementById("carga_horaria").value

    const createSubjectURL = await fetch("http://localhost:3000/materia", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({
            nombre:nombre_materia,
            foto:foto_materia,
            profesor:id_profesor,
            carga_horaria:carga_horaria,
            carrera:directorDegree
        })
    })

    const newSubject = await createSubjectURL.json()
    console.log(newSubject)
}
