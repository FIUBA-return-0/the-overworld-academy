window.addEventListener("load", ()=>{
    document.documentElement.style.setProperty('--vh', `${window.innerHeight*0.01}px`);
    document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth-document.body.clientWidth}px`);
});
