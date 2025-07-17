document.addEventListener("DOMContentLoaded", ()=>{
    const botonMateria = document.getElementById("boton-materias");
    
    botonMateria.addEventListener("click", ()=>{    
        const condicion = localStorage.getItem("condicion");
        if (condicion){
            window.location.href = `/${condicion}.html`;
        }
        else{
            console.alert("El usuario no tiene condicion...");
            window.location.href = '/error-inesperado.html';
            localStorage.clear();
        }
    });        
})