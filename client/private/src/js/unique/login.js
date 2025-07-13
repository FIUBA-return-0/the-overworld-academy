async function validateLoggedIn(){
    if(localStorage.getItem("token") !== null){
        //TODO getSelf
        window.location.href = "/alumno.html";
    }
}

document.addEventListener("DOMContentLoaded", validateLoggedIn);

function validarUsuario(usuario){
    const usuarioRegEx = /^[a-z]{5,}$/;
    return usuario.match(usuarioRegEx) !== null;
}

function ocultarErrores(){
    document.getElementById("error-usuario").classList.add("hidden");
    document.getElementById("error-usuario-invalido").classList.add("hidden");
    document.getElementById("error-contrasenia").classList.add("hidden");
}

function validarEmptyFields(usuario, contrasenia){
    let flag = true;
    if(usuario.value === ""){
        document.getElementById("error-usuario").classList.remove("hidden");
        flag = false;
    }
    if(contrasenia.value === ""){
        document.getElementById("error-contrasenia").classList.remove("hidden");
        flag = false;
    }

    return flag;
}

async function login(){
    const usuario = document.getElementById("usuario");
    const contrasenia = document.getElementById("contrasenia");

    ocultarErrores();

    let invalidFlag = false;
    const valEmpty = validarEmptyFields(usuario, contrasenia);
    if(!valEmpty) invalidFlag = true;

    const valUsuario = validarUsuario(usuario.value);
    if(!valUsuario && usuario.value !== ""){
        document.getElementById("error-usuario-invalido").classList.remove("hidden");
        invalidFlag = true;
    }

    if(invalidFlag) return;

    const body = {
        "username": usuario.value,
        "password": contrasenia.value
    };

    await loginPOST(body);
}

document.getElementById("login").addEventListener("click", login);
