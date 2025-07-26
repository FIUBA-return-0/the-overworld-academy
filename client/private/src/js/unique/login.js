async function validateLoggedIn(){
    if(localStorage.getItem("token") !== null){
        window.location.href = `/${localStorage.getItem("condicion")}.html`;
    }
}

document.addEventListener("DOMContentLoaded", validateLoggedIn);
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("contrasenia").addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            document.getElementById("login").click();
        }
    })
});

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

    if(invalidFlag){
        try{
            sound5.play();
            return;
        } catch(e){ return; };
    }

    const body = {
        "username": usuario.value,
        "password": contrasenia.value
    };

    await loginPOST(body);
}

document.getElementById("login").addEventListener("click", login);
