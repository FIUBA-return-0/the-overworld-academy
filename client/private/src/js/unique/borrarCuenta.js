function abrirModalEasterEgg(){
    sound2.pause();
    document.getElementById("easteregg-1").classList.add("hidden");
    document.getElementById("modal-opcion-borrar-cuenta").classList.remove("hidden");
}


// cancelar borrar cuenta =)
document.getElementById("easteregg-1").addEventListener("click",abrirModalEasterEgg);
document.getElementById("cancelar-borrar").addEventListener("click", () => {
    document.getElementById("modal-opcion-borrar-cuenta").classList.add("hidden");
});


// borrar cuenta =(
document.getElementById("borrar-cuenta").addEventListener("click", async () => {
    try{
        const res = await fetch(`${API}/usuario`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            }
        });
        
        if(res.status === 200){
            localStorage.clear();
            sound6.play();
                sound6.onended = function(){
                    window.location.href = '/index.html';
                }
        }

        else if(res.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
            }
        }
        
        else{
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/error-inesperado.html';
            }
        }

    }

    catch(e){
        console.error(e);
        sound5.play();
        sound5.onended = function(){
            window.location.href = '/error-inesperado.html';
        }
    }

});
