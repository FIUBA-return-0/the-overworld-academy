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
            try{
                let token = await res.json();

                localStorage.setItem("token", token);
                
                const selfData = await fetch(`${API}/usuario/self`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const selfDataJSON = await selfData.json();
                console.log(selfDataJSON);

                localStorage.setItem("condicion", selfDataJSON.condicion);

                window.location.href = `/${selfDataJSON.condicion}.html`;
            } catch(e){ console.error(e) }
        }

        else if(res.status === 401){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/401.html';
            }
        }

        else if(res.status === 500){
            sound5.play();
            sound5.onended = function(){
                window.location.href = '/500.html';
            }
        }
    }
    catch(e){ console.log(e); }
}