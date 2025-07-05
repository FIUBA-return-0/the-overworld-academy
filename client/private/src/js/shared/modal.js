// desoculta modal
const botonSalir = document.getElementById("boton-salir");

if (botonSalir !== null){
  botonSalir.addEventListener("click", function(){
	document.getElementById("modal-opcion").classList.remove("hidden");
  });

}


// cancelar salida - oculta modal
const cancelarSalida = document.getElementById("cancelar-salida");

if (cancelarSalida !== null){
  	cancelarSalida.addEventListener("click", function(){
		document.getElementById("modal-opcion").classList.add("hidden");
  	});

}


// logout
const confirmarSalida = document.getElementById("cancelar-salida");

if (confirmarSalida !== null){
	document.getElementById("confirmar-salida").addEventListener("click", function() {
  		window.location.href = "index.html";
  	});
}