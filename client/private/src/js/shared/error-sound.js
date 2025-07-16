async function soundAndRedirect(page){
    try{
        sound5.play();
        sound5.onended = () =>{
            window.location.href = page;
        }
    }catch(e){
        window.location.href = page;
    };
};
