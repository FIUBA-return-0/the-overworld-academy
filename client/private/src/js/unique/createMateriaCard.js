function createMateriaCard(
  id,
  foto,
  nombre,
  profesor,
  descripcion,
  clase,
  parent,
  redLink
) {
  let link = document.createElement("a");
  link.href = `${redLink}${id}`;
  link.classList.add("materia-card-link");

  let materiaCard = document.createElement("div");
  materiaCard.classList.add("materia-card");
  clase && materiaCard.classList.add(clase);
  link.appendChild(materiaCard);

  let materiaCardImgWrapper = document.createElement("div");
  materiaCardImgWrapper.classList.add("materia-card-img-wrapper");
  materiaCard.appendChild(materiaCardImgWrapper);

  let materiaCardImg = document.createElement("img");
  materiaCardImg.classList.add("materia-card-img");
  materiaCardImg.src = foto;
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

  document.getElementById(parent).appendChild(link);
}
