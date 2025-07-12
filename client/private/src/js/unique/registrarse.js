async function getCarreras(){
    try{
        const res = await fetch(`${API}/carrera/`, {
            headers: {
                "Content-Type":"application/json"
            },
        });

        if(res.status === 200){
            let ans = {};
            const data = await res.json();

            data.forEach(carrera => {
                ans[carrera.carrera] = carrera.id;
            });

            localStorage.setItem("dictCarreras", JSON.stringify(ans));
            return ans;
        }

        else if(res.status === 500){
            window.location.href = '/500.html';
        }
    }
    catch(e){
        console.log(e);
    }
}

async function fillData(){
    const carreras = await getCarreras();
    const dropdownCarreras = document.getElementById("carrera");

    for (const [key, value] of Object.entries(carreras)) {
        const option = document.createElement("option");
        option.innerText = key;
        dropdownCarreras.appendChild(option);
    };
}

document.addEventListener("DOMContentLoaded", fillData);

function validarContrasenia(password1, password2){
    if(password1 !== password2){
        return 1;
    }
    
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]){2,}(?=.*\d){2,}(?=.*[$@$!%*?^&#.$($)$-$_]){2,}[A-Za-z\d$@$!%*?^&#.$($)$-$_]{8,500}$/;
    if(!password1.match(passwordRegEx)){
        return 2;
    }

    return true;
}

function validarUsuario(usuario){
    const usuarioRegEx = /^[a-z]{5,}$/;
    return usuario.match(usuarioRegEx) !== null;
}

function ocultarErrores(){
    document.getElementById("error-rep-contrasenia").classList.add("hidden");
    document.getElementById("error-contrasenia").classList.add("hidden");
    document.getElementById("error-usuario").classList.add("hidden");
    document.getElementById("error-usuario-invalido").classList.add("hidden");
    document.getElementById("error-apellido").classList.add("hidden");
    document.getElementById("error-nombre").classList.add("hidden");
    document.getElementById("error-carrera").classList.add("hidden");
}

function validarEmptyFields(usuario, contrasenia, repContrasenia, apellido, nombre, carrera){
    let flag = true;
    if(usuario.value === ""){
        document.getElementById("error-usuario").classList.remove("hidden");
        flag = false;
    }
    if(contrasenia.value === ""){
        document.getElementById("error-contrasenia").classList.remove("hidden");
        flag = false;
    }
    if(repContrasenia.value === ""){
        document.getElementById("error-rep-contrasenia").classList.remove("hidden");
        flag = false;
    }
    if(apellido.value === ""){
        document.getElementById("error-apellido").classList.remove("hidden");
        flag = false;
    }
    if(nombre.value === ""){
        document.getElementById("error-nombre").classList.remove("hidden");
        flag = false;
    }
    if(carrera.value === ""){
        document.getElementById("error-carrera").classList.remove("hidden");
        flag = false;
    }
    return flag;
}

async function postRegister(usuario, contrasenia, nombre, apellido, carrera, foto){
    body = {
        "nombre": nombre,
        "apellido": apellido,
        "username": usuario,
        "password": contrasenia,
        "carrera": carrera,
        "foto": foto
    };

    try{
        const res = await fetch(`${API}/usuario/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        if(res.status === 200){
            //TODO login
        }
        else if(res.status === 409){
            //TODO user repetido
        }
        else if(res.status === 500){
            window.location.href = '/500.html';
        }
    }
    catch (e){
        console.log(e);
    }
}

async function register(){
    ocultarErrores();
    
    const usuario = document.getElementById("usuario");
    const contrasenia = document.getElementById("contrasenia");
    const repContrasenia = document.getElementById("rep-contrasenia");
    const apellido = document.getElementById("apellido");
    const nombre = document.getElementById("nombre");
    const carrera = document.getElementById("carrera");

    let invalidFlag = false;
    const valEmpty = validarEmptyFields(usuario, contrasenia, repContrasenia, apellido, nombre, carrera);
    if(!valEmpty) invalidFlag = true;

    const valContrasenia = validarContrasenia(contrasenia.value, repContrasenia.value);
    if(valContrasenia === 1){
        document.getElementById("error-rep-contrasenia").classList.remove("hidden");
        invalidFlag = true;
    }
    else if(valContrasenia === 2){
        document.getElementById("error-contrasenia").classList.remove("hidden");
        invalidFlag = true;
    }
    
    const valUsuario = validarUsuario(usuario.value);
    if(!valUsuario && usuario.value !== ""){
        document.getElementById("error-usuario-invalido").classList.remove("hidden");
        invalidFlag = true;
    }

    if(invalidFlag) return;

    const dictCarreras = JSON.parse(localStorage.getItem("dictCarreras"));

    await postRegister(
        usuario.value,
        contrasenia.value,
        nombre.value,
        apellido.value,
        dictCarreras[carrera.value],
        `/img/pp${Math.floor(Math.random() * (10 - 1 + 1)) + 1}.jpg`
    );

    sound3.play();
}

document.getElementById("registrarse").addEventListener("click", register);
