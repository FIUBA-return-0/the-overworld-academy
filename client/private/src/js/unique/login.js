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

    const body = {
        "username": usuario.value,
        "password": contrasenia.value
    };

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

    try{
        const res = await fetch(`${API}/login/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });

        if(res.status === 200){
            const data = await res.text();
            localStorage.setItem("token", data);
            //TODO getSelf
            window.location.href = "/alumno.html";
        }

        else if(res.status === 401){
            window.location.href = '/401.html';
        }

        else if(res.status === 500){
            window.location.href = '/500.html';
        }
    }
    catch(e){
        console.log(e);
    }
}

document.getElementById("login").addEventListener("click", login);
