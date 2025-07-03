const frases_menu = [
	"la clase mas fria del anio",
	"Nico Riedel la cabra <3",
	"commits atomicos!",
	"playadino matecino",
	"tung tung tung tung sahur",
	"aguante Linux!",
	"el que sabe, sabe...",
	"windows???",
	"en 3 canciones volvemos",
	"a todos les fue mal por SQL",
	"aguante el cuervo!!",
	"aceptenme el pr",
	"cuando suben las notas?",
	"I use arch btw",
	"me cambie a admin. de empresas!",
	"intro al desarrollo personal!"
];

// agrego un feature nuevo para que no se repitan las frases 
const ultimaFrase = localStorage.getItem("ultimaFrase");
let fraseAleatoria = ultimaFrase;

while (fraseAleatoria === ultimaFrase) {
	fraseAleatoria = frases_menu[Math.floor(Math.random() * frases_menu.length)];
}

const elemento = document.querySelector(".login-amarillo-texto");
if (elemento) {
	elemento.textContent = fraseAleatoria;
}

localStorage.setItem("ultimaFrase", fraseAleatoria);
