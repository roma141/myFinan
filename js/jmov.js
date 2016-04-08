/**
 * @author botpi
 */

function inicioMov()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
	poneDatePicker("#fecha", "", new Date());
	refrescar();
}

function refrescar()
{
	cambios = [];
	$("#valor").val("");
	$("#concepto").val("");	
	$("#concepto").focus();
	CuentasF(new Date($("#fecha").val()), dibujaCuentas);
}

function dibujaCuentas(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gdatos = datos;
	$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
	dibujaCuadroCuentas();
	//$('#cuentas').html( cadTabla(datos, "cuentas", "leeEntradasySalidas"));
	llenaSelector(gdatos.datos, "cuentaOrigen");
	llenaSelector(gdatos.datos, "cuentaDestino");

	if (typeof gIDcuenta=='undefined' || gIDcuenta==null || gIDcuenta==0)
		gIDcuenta=gdatos.datos[0].ID;

	if (typeof gIDcuentaOrigen=='undefined' || gIDcuentaOrigen==null || gIDcuentaOrigen==0)
		gIDcuentaOrigen=gdatos.datos[0].ID;

	if (typeof gIDcuentaDestino=='undefined' || gIDcuentaDestino==null || gIDcuentaDestino==0)
		if (gdatos.datos.length)
			gIDcuentaDestino=gdatos.datos[1].ID;
		else
			gIDcuentaDestino=gdatos.datos[0].ID;

    leeEntradasySalidas(gIDcuenta);
    poneSelector(gIDcuentaOrigen, "cuentaOrigen");
    poneSelector(gIDcuentaDestino, "cuentaDestino");
}

function leeEntradasySalidas(IDcuenta)
{
	if (IDcuenta)
		gIDcuenta=IDcuenta;
	else
		IDcuenta=gIDcuenta;
		
	seleccionaRenglon(gdatos, "cuentas", IDcuenta);
	EntradasySalidasF(new Date($("#fecha").val()), IDcuenta, dibujaMovimientos);	
}

function dibujaMovimientos(datos)
{
	if (datos) {
		gdatosmov = datos;
		//$('#entradas').html( cadTabla(gdatosmov.entradas, "entradas", ""));
		//$('#salidas').html( cadTabla(gdatosmov.salidas, "salidas", ""));
		dibujaCuadroEntradas();
		dibujaCuadroSalidas();
	}

}

function agregar()
{
	if ($("#cuentaOrigen").val()==$("#cuentaDestino").val()) {
		alert("Las cuentas deben ser diferentes");
		return;		
	}
	if ($("#valor").val()=="") {
		alert("Debe introducir un valor");		
		return;		
	}
	if ($("#valor").val()<=0) {
		alert("El valor debe ser mayor que cero");		
		return;		
	}
	if ($("#concepto").val()=="") {
		alert("Debe escribir un concepto");		
		return;		
	}
	
	gIDcuentaOrigen=$("#cuentaOrigen").val();
	gIDcuentaDestino=$("#cuentaDestino").val();
	
	var valor = $("#valor").val().replace("$","").replace(",","").replace(",","");
	AgregaMovimientoF($("#cuentaOrigen").val(), $("#cuentaDestino").val(), $("#concepto").val(), valor, new Date($("#fecha").val()), refrescar);
}

function eliminar(ID)
{
	EliminaMovimientoF(ID, refrescar);
}

function actualizar()
{
	$.each(cambios, function(i,item) {
		modificar(item);
	});
	refrescar();
}

function anotar(IDcuenta)
{
	var noesta=true;
	$.each(cambios, function(i,item) {
		if (item==IDcuenta)
			noesta=false;
	});
	if (noesta)
		cambios.push(IDcuenta);
}

function anotars(IDcuenta)
{
	var noesta=true;
	$.each(cambios, function(i,item) {
		if (item==-IDcuenta)
			noesta=false;
	});
	if (noesta)
		cambios.push(-IDcuenta);
}

function modificar(IDmov)
{	if (IDmov>0)
		ModificaMovF(IDmov, $("#fecha-" + IDmov).val(), $("#concepto-" + IDmov).val(), $("#valorf-" + IDmov).val().replace(/,/g, ""), $("#contra-" + IDmov).val(), gIDcuenta, refrescar);
	else {
		IDmov=-IDmov;
		ModificaMovF(IDmov, $("#fechas-" + IDmov).val(), $("#conceptos-" + IDmov).val(), $("#valorfs-" + IDmov).val().replace(/,/g, ""), gIDcuenta, $("#contras-" + IDmov).val(), refrescar);
	}
}

function dibujaCuadroCuentas()
{
	var titulos = [];
    titulos.push({"titulo":"Cuenta", "ancho":200, "alinea":"left", "campo":"nombre"});
    titulos.push({"titulo":"Saldo Anterior", "ancho":160, "alinea":"right", "campo":"saldoant"});
    titulos.push({"titulo":"Entradas", "ancho":100, "alinea":"right", "campo":"entradas"});
    titulos.push({"titulo":"Salidas", "ancho":100, "alinea":"right", "campo":"salidas"});
    titulos.push({"titulo":"Saldo", "ancho":100, "alinea":"right", "campo":"saldo"});
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatos.datos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "cuentas", "cuentas", "leeEntradasySalidas");
}

function dibujaCuadroEntradas()
{
	var titulos = [];
    titulos.push({"titulo":"Fecha", "ancho":110, "alinea":"center", "campo":"fecha", "input":"normal", "funcioninput":"anotar"});
    titulos.push({"titulo":"Concepto", "ancho":300, "alinea":"left", "campo":"concepto", "input":"normal", "funcioninput":"anotar"});
    titulos.push({"titulo":"Valor", "ancho":70, "alinea":"right", "campo":"valorf", "input":"normal", "funcioninput":"anotar"});
    titulos.push({"titulo":"Us", "ancho":20, "alinea":"left", "campo":"nombrecorto"});
    titulos.push({"titulo":"Contra", "ancho":160, "alinea":"left", "campo":"contra", "input":"select", "datos": gdatos.datos, "funcioninput":"anotar"});
    titulos.push({"titulo":"", "ancho":70, "alinea":"left", "campo":"eliminar", "linktext": "#", "link": "", "funcion":"funcion"});

	$.each(gdatos.datos, function(i,item) {
		if (item.borrable==1) {
			item["eliminar"] = "X";
			item["funcion"] = 'onclick="eliminar('+ item.ID + ')"';
		}
		else
			item["eliminar"] = "";
	});	
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatosmov.entradas;
	datos["totales"] = [];
	
	dibujaTabla(datos, "entradas", "entradas", "");
}

function dibujaCuadroSalidas()
{
	var titulos = [];
    titulos.push({"titulo":"Fecha", "ancho":110, "alinea":"center", "campo":"fechas", "input":"normal", "funcioninput":"anotars"});
    titulos.push({"titulo":"Concepto", "ancho":300, "alinea":"left", "campo":"conceptos", "input":"normal", "funcioninput":"anotars"});
    titulos.push({"titulo":"Valor", "ancho":70, "alinea":"right", "campo":"valorfs", "input":"normal", "funcioninput":"anotars"});
    titulos.push({"titulo":"Us", "ancho":20, "alinea":"left", "campo":"nombrecortos"});
    titulos.push({"titulo":"Contra", "ancho":160, "alinea":"left", "campo":"contras", "input":"select", "datos": gdatos.datos, "funcioninput":"anotars"});
    titulos.push({"titulo":"", "ancho":70, "alinea":"left", "campo":"eliminars", "linktext": "#", "link": "", "funcion":"funcion"});

	$.each(gdatos.datos, function(i,item) {
		if (item.borrable==1) {
			item["eliminars"] = "X";
			item["funcion"] = 'onclick="eliminar('+ item.ID + ')"';
		}
		else
			item["eliminar"] = "";
	});	
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = gdatosmov.salidas;
	datos["totales"] = [];
	
	dibujaTabla(datos, "salidas", "salidas", "");
}