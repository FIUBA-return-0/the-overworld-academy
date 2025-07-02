const frases_menu = ["la clase mas fria del año",
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
    "rm -rf /",
    "aceptenme el pr",
    "y las notas??",
    "maniana no hay clase =)",
    "maniana si hay clase =(",
    "I use arch btw",
    "arregle los conflictos (que yo mismo genere por accidente)",
    "me cambie a admin. de empresas!"
];

const fraseAleatoria = frases_menu[Math.floor(Math.random() * frases_menu.length)];
document.querySelector(".login-amarillo-texto").textContent = fraseAleatoria;