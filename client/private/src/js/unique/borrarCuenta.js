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
        
        switch (getUserURL.status) {
            case 200:
                localStorage.clear();
                try{
                    sound6.play();
                    sound6.onended = function(){
                        window.location.href = '/index.html';
                    }
                } catch(e){
                    window.location.href = '/index.html';
                }
            break;

            case 500:
                soundAndRedirect('/500.html');
            break;

            default:
                soundAndRedirect('/error-inesperado.html');
            break;
        }

    }
    catch(e){
        console.error(e);
        soundAndRedirect('/error-inesperado.html');
    }
});
