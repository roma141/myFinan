/**
 * @author botpi
 */

function inicioAnual()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	refrescar();
}

function refrescar()
{
	YearsF(dibujaCuentas);
}

function dibujaCuentas(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gdatos = datos;
	llenaSelector(gdatos.datos, "year");
	year = gdatos.datos[gdatos.datos.length-1].ID;
    poneSelector(year, "year");

	//$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
	seeYear();
}

function seeYear()
{
	YearF($('#year').val(), drawYear);
}

function drawYear(datos)
{
	gdatosyear=datos;
	dibujaCuadro();
}

function dibujaCuadro(datos)
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
	    titulos.push({"titulo":"Cuenta", "ancho":200, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Ene", "ancho":70, "alinea":"right", "campo":"ene"});
	    titulos.push({"titulo":"Feb", "ancho":70, "alinea":"right", "campo":"feb"});
	    titulos.push({"titulo":"Mar", "ancho":70, "alinea":"right", "campo":"mar"});
	    titulos.push({"titulo":"Abr", "ancho":70, "alinea":"right", "campo":"abr"});
	    titulos.push({"titulo":"May", "ancho":70, "alinea":"right", "campo":"may"});
	    titulos.push({"titulo":"Jun", "ancho":70, "alinea":"right", "campo":"jun"});
	    titulos.push({"titulo":"Jul", "ancho":70, "alinea":"right", "campo":"jul"});
	    titulos.push({"titulo":"Ago", "ancho":70, "alinea":"right", "campo":"ago"});
	    titulos.push({"titulo":"Sep", "ancho":70, "alinea":"right", "campo":"sep"});
	    titulos.push({"titulo":"Oct", "ancho":70, "alinea":"right", "campo":"oct"});
	    titulos.push({"titulo":"Nov", "ancho":70, "alinea":"right", "campo":"nov"});
	    titulos.push({"titulo":"Dic", "ancho":70, "alinea":"right", "campo":"dic"});
	}
	else {
	    titulos.push({"titulo":"Account", "ancho":200, "alinea":"left", "campo":"nombre"});
	    titulos.push({"titulo":"Jan", "ancho":70, "alinea":"right", "campo":"ene"});
	    titulos.push({"titulo":"Feb", "ancho":70, "alinea":"right", "campo":"feb"});
	    titulos.push({"titulo":"Mar", "ancho":70, "alinea":"right", "campo":"mar"});
	    titulos.push({"titulo":"Apr", "ancho":70, "alinea":"right", "campo":"abr"});
	    titulos.push({"titulo":"May", "ancho":70, "alinea":"right", "campo":"may"});
	    titulos.push({"titulo":"Jun", "ancho":70, "alinea":"right", "campo":"jun"});
	    titulos.push({"titulo":"Jul", "ancho":70, "alinea":"right", "campo":"jul"});
	    titulos.push({"titulo":"Aug", "ancho":70, "alinea":"right", "campo":"ago"});
	    titulos.push({"titulo":"Sept", "ancho":70, "alinea":"right", "campo":"sep"});
	    titulos.push({"titulo":"Oct", "ancho":70, "alinea":"right", "campo":"oct"});
	    titulos.push({"titulo":"Nov", "ancho":70, "alinea":"right", "campo":"nov"});
	    titulos.push({"titulo":"Dic", "ancho":70, "alinea":"right", "campo":"dic"});

	}
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatosyear.datos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "cuentas", "cuentas", "");
}

function actualizar()
{
	$.each(cambios, function(i,item) {
		modificar(item);
	});
	refrescar();
}
