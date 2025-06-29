function fix_viewport(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let scrollbar_width = window.innerWidth - document.body.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbar_width}px`);
}

fix_viewport();
