/**
 * @author botpi
 */

function inicioCuentas()
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
	cambios = [];
	$("#nombre").val("");
	$("#continua").attr("checked", false);	
	$("#esgasto").attr("checked", true);
	$("#nombre").focus();
	CuentasEditorF(dibujaCuentas);
}

function dibujaCuentas(datos)
{
	if (!datos) {
		document.cookie = "pagpend=" + document.URL;			
		window.location.assign("index.html");		
	}
	gdatos = datos;
/*	$('#usuario').html("Bienvenido " + gdatos.usuario.nombre);
*/	dibujaCuadro();
}

function dibujaCuadro()
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
	    titulos.push({"titulo":"Nombre de la Cuenta", "ancho":300, "alinea":"left", "campo":"nombre", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Saldo Inicial", "ancho":60, "alinea":"rigth", "campo":"saldo", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Fecha Saldo", "ancho":100, "alinea":"center", "campo":"fechasaldo", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Pasa Saldo", "ancho":70, "alinea":"center", "campo":"esContinua", "input":"", "funcioninput":"anotar", "aviso": "el saldo se pasa entre meses"});
	    titulos.push({"titulo":"Es Gasto", "ancho":60, "alinea":"center", "campo":"esgasto", "input":"", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Activo", "ancho":60, "alinea":"center", "campo":"activo", "input":"", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Orden", "ancho":40, "alinea":"rigth", "campo":"orden", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"", "ancho":10, "alinea":"left", "campo":"eliminar", "linktext": "#", "link": "", "funcion":"funcion", "aviso": "eliminar"});
	}
	else {
	    titulos.push({"titulo":"Account name", "ancho":300, "alinea":"left", "campo":"nombre", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Opening balance", "ancho":60, "alinea":"rigth", "campo":"saldo", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Balance day", "ancho":100, "alinea":"center", "campo":"fechasaldo", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Keep balance", "ancho":70, "alinea":"center", "campo":"esContinua", "input":"", "funcioninput":"anotar", "aviso": "el saldo se pasa entre meses"});
	    titulos.push({"titulo":"It's Expense", "ancho":60, "alinea":"center", "campo":"esgasto", "input":"", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Show", "ancho":60, "alinea":"center", "campo":"activo", "input":"", "funcioninput":"anotar"});
	    titulos.push({"titulo":"Order", "ancho":40, "alinea":"rigth", "campo":"orden", "input":"normal", "funcioninput":"anotar"});
	    titulos.push({"titulo":"", "ancho":10, "alinea":"left", "campo":"eliminar", "linktext": "#", "link": "", "funcion":"funcion", "aviso": "eliminar"});
	}
	
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
	datos["datos"] = gdatos.datos;
	datos["totales"] = [];
	
	dibujaTabla(datos, "cuentas", "cuentas", "");
}

function agregar()
{
	if ($("#nombre").val()=="") {
		alert("Debe introducir un valor");		
		return;		
	}
	AgregaCuentaF($("#nombre").val(), refrescar);
	$("#nombre").val("");
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

function modificar(IDcuenta)
{
	ModificaCuentaF(IDcuenta, $("#nombre-" + IDcuenta).val()
					, $("#saldo-" + IDcuenta).val(), $("#fechasaldo-" + IDcuenta).val()
					, $("#esContinua-" + IDcuenta).is(':checked') ? 1:0, $("#esgasto-" + IDcuenta).is(':checked') ? 1:0
					, $("#orden-" + IDcuenta).val(), $("#activo-" + IDcuenta).is(':checked') ? 1:0, refrescar);
}

function eliminar(IDcuenta)
{
	EliminaCuentaF(IDcuenta, refrescar);
}

function actualizar()
{
	$.each(cambios, function(i,item) {
		modificar(item);
	});
	refrescar();
}
