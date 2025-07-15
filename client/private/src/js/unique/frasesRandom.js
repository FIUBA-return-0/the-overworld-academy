const frases_menu = [
	"la clase mas fria del anio <span class='emoji-font'>🥶</span>",
	"Nico Riedel la cabraa <span class='emoji-font'>🐐🐐</span>",
	"commits atomicos!",
	"playadino matecino",
	"tung tung tung tung sahur",
	"aguante Linux!",
	"el que sabe, sabe…",
	"windows???",
	"en 3 canciones volvemos",
	"a todos les fue mal por SQL",
	"aguante el cuervo!!",
	"aceptenme el pr",
	"cuando suben las notas?",
	"I use arch btw",
	"me cambie a admin. de empresas en la UADE <span class='emoji-font'>🫣</span>",
	"intro al desarrollo personal!",
	"Geronimo Gran Hermano 2027",
	"el comandante.",
	"lo viejo funciona",
	"maaaamaaaaa, cortaste toda la looz!!",
	"fix: arreglo lo que yo mismo rompi",
	"poneme la repe!",
	"con 15 pesos me hago alto guiso",
	"tenes que cerrar el estadio",
];

// agrego un feature nuevo para que no se repitan las frases 
const ultimaFrase = localStorage.getItem("ultimaFrase");
let fraseAleatoria = ultimaFrase;

while (fraseAleatoria === ultimaFrase) {
	fraseAleatoria = frases_menu[Math.floor(Math.random() * frases_menu.length)];
}

const elemento = document.querySelector(".login-amarillo-texto");
if (elemento) {
	elemento.innerHTML = fraseAleatoria;
}

localStorage.setItem("ultimaFrase", fraseAleatoria);