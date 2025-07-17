function validarContrasenia(password1, password2){
    if(password1 !== password2){
        return 1;
    }
    
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?^&#.$($)$-$_])[A-Za-z\d$@$!%*?^&#.$($)$-$_]{8,500}$/;
    if(!password1.match(passwordRegEx)){
        return 2;
    }

    return true;
}

async function cambiarContraseniaPATCH(contrasenia){
    try{
        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/usuario/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "password": contrasenia
            })
        });

        switch (res.status) {
            case 200:
                try {
                    sound32.play();
                    sound32.onended = async () => {
                        window.location.href = "/perfil.html";
                    };
                } catch (e) {
                    window.location.href = "/perfil.html";
                }
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
    }catch (e){
        console.error(e);
        soundAndRedirect("/error-inesperado.html");
    }
}

async function cambiarContrasenia(){
    const contrasenia = document.getElementById("contrasenia");
    const repContrasenia = document.getElementById("rep-contrasenia");
    document.getElementById("error-rep-contrasenia").classList.add("hidden");
    document.getElementById("error-contrasenia").classList.add("hidden");

    let invalidFlag = false;

    const valContrasenia = validarContrasenia(contrasenia.value, repContrasenia.value);
    if(valContrasenia === 1){
        document.getElementById("error-rep-contrasenia").classList.remove("hidden");
        invalidFlag = true;
    }
    else if(valContrasenia === 2){
        document.getElementById("error-contrasenia").classList.remove("hidden");
        invalidFlag = true;
    }

    if(invalidFlag){
        sound5.play();
        return;
    }

    cambiarContraseniaPATCH(contrasenia.value);
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("change-button").addEventListener("click", cambiarContrasenia);
});
