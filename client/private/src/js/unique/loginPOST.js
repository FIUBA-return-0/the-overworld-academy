async function loginPOST(body){
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