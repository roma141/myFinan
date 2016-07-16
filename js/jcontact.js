/**
 * @author botpi
 */
function inicioContact()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado==""){
		encabezado="'',''";
		window.location.assign("index.html");
	}
	leeServidor();
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
		$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
	}
	else {
		$('#usuario').html("Welcome " + gdatos.usuario.nombre);
	}
	refrescar();
}

function refrescar()
{
	$("#email").val(localStorage.getItem("encabezado"));
	$("#concepto").val("");
}