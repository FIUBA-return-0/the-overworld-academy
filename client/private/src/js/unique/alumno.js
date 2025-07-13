function createMateriaCard(id, foto, nombre, profesor, descripcion){
    // materia-card
    // materia-card-img-wrapper
    //      materia-card-img
    // materia-card-text-wrapper
    //      materia-card-title
    //      materia-card-profesor
    //      materia-card-description

    let link = document.createElement("a");
    link.href = `/ver-materia.html?id=${id}`;
    link.classList.add("materia-card-link");

    let materiaCard = document.createElement("div");
    materiaCard.classList.add("materia-card");
    link.appendChild(materiaCard);
    
    let materiaCardImgWrapper = document.createElement("div");
    materiaCardImgWrapper.classList.add("materia-card-img-wrapper");
    materiaCard.appendChild(materiaCardImgWrapper);

    let materiaCardImg = document.createElement("img");
    materiaCardImg.classList.add("materia-card-img");
    materiaCardImg.src=foto;
    materiaCardImgWrapper.appendChild(materiaCardImg);

    let materiaCardTextWrapper = document.createElement("div");
    materiaCardTextWrapper.classList.add("materia-card-text-wrapper");
    materiaCard.appendChild(materiaCardTextWrapper);

    let materiaCardTitle = document.createElement("h2");
    materiaCardTitle.classList.add("materia-card-title");
    materiaCardTitle.innerText = nombre;
    materiaCardTextWrapper.appendChild(materiaCardTitle);

    let materiaCardProfesor = document.createElement("h2");
    materiaCardProfesor.classList.add("materia-card-profesor");
    materiaCardProfesor.innerText = `Catedra: ${profesor}`;
    materiaCardTextWrapper.appendChild(materiaCardProfesor);
    
    let materiaCardDescription = document.createElement("p");
    materiaCardDescription.classList.add("materia-card-description");
    materiaCardDescription.innerText = descripcion;
    materiaCardTextWrapper.appendChild(materiaCardDescription);

    document.getElementById("materias-wrapper").appendChild(link);
}

createMateriaCard(1, "https://skinsmonkey.com/blog/wp-content/uploads/sites/2/csgo-bomb-code-ingame.jpg", "Plantar la bomba sin morir en el intento", "Camejo", "Se te pasa el tiempo cubriendo B y derrepente explotaste? no más.");
