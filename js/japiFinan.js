/**
 * @author botpi
 */

/*-------------------- index
*/    
function LoginF(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LoginF(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function AgregaClienteF(nombre, funcion)
{
	var datos = {};
	datos.nombre = nombre;
	datos.d1 = "myfinan@gtienda.com";
	datos.d2 = "gtienda";
	var userLang = navigator.language || navigator.userLanguage; 
       if (userLang.indexOf("es") >= 0) {
       	lang = "es";
       }
       else {
       	lang = "en";
       }

	$.post( "http://" + servidor + "/functiond/AgregaClienteF(" + encabezado + ",'"+ lang +"')?pagina=" + pagina, JSON.stringify(datos))
	 	.success(function(datos){
	 		funcion(datos);
	 	});
}

/*-------------------- movimientos
*/    
function LeeCuentasF(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeCuentasF(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function CuentasF(fecha, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	$.ajax({
		url: "http://" + servidor + "/function/CuentasF(" + encabezado + ",'" + f + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function EntradasySalidasF(fecha, IDcuenta, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	$.ajax({
		url: "http://" + servidor + "/function/EntradasySalidasF(" + encabezado + ",'" + f + "'," + IDcuenta + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function EliminaMovimientoF(ID, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/EliminaMovimientoF(" + encabezado + "," + ID + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function AgregaMovimientoF(IDcuentaorigen, IDcuentadestino, concepto, valor, fecha, funcion) //falta
{
	var datos = {};
	datos.IDcuentamenos = IDcuentaorigen;
	datos.IDcuentamas = IDcuentadestino;
	datos.concepto = concepto;
	datos.valor = valor;
	datos.fecha = $.datepicker.formatDate("yy-mm-dd", fecha);	

	$.post( 'http://' + servidor + '/functiond/AgregaMovimientoF(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		funcion();
	 	});
}
    
function MovimientosF(IDcuenta, desde, hasta, tags, funcion)
{
	var d = $.datepicker.formatDate("yy-mm-dd", desde);
	var h = $.datepicker.formatDate("yy-mm-dd", hasta);
	$.ajax({
		url: "http://" + servidor + "/function/MovimientosF(" + encabezado + "," + IDcuenta + ",'" + d + "','" + h + "','" + tags + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function ModificaMovF(IDmov, fecha, concepto, valor, IDcuentamas, IDcuentamenos, funcion)
{
	var datos = {};
	datos.IDmov = IDmov;
	datos.fecha = fecha;
	datos.concepto = concepto;
	datos.valor = valor;
	datos.IDcuentamas = IDcuentamas;
	datos.IDcuentamenos = IDcuentamenos;

	$.post( 'http://' + servidor + '/functiond/ModificaMovF(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.success(function(datos){
	 		funcion(datos);
	 	});
}

/*-------------------- cuentas
*/    
function CuentasEditorF(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CuentasEditorF(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function AgregaCuentaF(nombre, funcion)
{
	var datos = {};
	datos.nombre = nombre;

	$.post( 'http://' + servidor + '/functiond/AgregaCuentaF(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.success(function(datos){
	 		funcion(datos);
	 	});
}

function ModificaCuentaF(IDcuenta, nombre, saldo, fechasaldo, esContinua, esgasto, orden, activo, funcion)
{
	var datos = {};
	datos.IDcuenta = IDcuenta;
	datos.nombre = nombre;
	datos.saldo = saldo;
	datos.fechasaldo = fechasaldo;
	datos.esContinua = esContinua;
	datos.esgasto = esgasto;
	datos.orden = orden;
	datos.activo = activo;

	$.post( 'http://' + servidor + '/functiond/ModificaCuentaF(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.success(function(datos){
	 		funcion(datos);
	 	});
}

function EliminaCuentaF(IDcuenta, funcion) /*//falta*/
{
	var datos = {};
	datos.IDcuenta = IDcuenta;

	$.post( 'http://' + servidor + '/functiond/EliminaCuentaF(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	 	.success(function(datos){
	 		funcion(datos);
	 	});
}

/*-------------------- anual
*/    
function YearsF(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/YearsF(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function YearF(year, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/YearF(" + encabezado + "," + year + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
