/**
 * @author botpi
 */

function inicioConsulta()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	pagina = "fnmov";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	leeServidor();
	poneDatePicker("#desde", "", new Date());
	poneDatePicker("#hasta", "", new Date());
	LeeCuentasF(dibujaCuentas);
}

function dibujaCuentas(datos)
{
	if (datos)
		llenaSelector(datos.cuentas, "cuenta");
	else
		window.location.assign("index.html");
}

function dibujaConsulta(datos)
{
	if (datos) {
		gdatos=datos;
		$('#consulta').html( cadTabla(armaCuadro(gdatos), "consulta", ""));
	}
}

function ejecutar()
{
	MovimientosF($("#cuenta").val(), new Date($("#desde").val()), new Date($("#hasta").val()), dibujaConsulta);
}

function armaCuadro(datos)
{
	
	var saldo=0;
	$.each(datos, function(i,item) {
		saldo += item.entrada - item.salida;
		item["saldo"] = saldo.formatMoney(0);
		
		if (item.entrada>0)
			item.entrada = item.entrada.formatMoney(0);
		else
			item.entrada="";

		if (item.salida>0)
			item.salida = item.salida.formatMoney(0);
		else
			item.salida = "";
	});	

    response = {};
    titulos = [];
    titulos.push({"titulo":"Fecha", "ancho":90, "alinea":"center", "campo":"fecha"});
    titulos.push({"titulo":"Concepto", "ancho":300, "alinea":"left", "campo":"concepto"});
    titulos.push({"titulo":"Entradas", "ancho":70, "alinea":"right", "campo":"entrada"});
    titulos.push({"titulo":"Salidas", "ancho":70, "alinea":"right", "campo":"salida"});
    titulos.push({"titulo":"Saldo", "ancho":70, "alinea":"right", "campo":"saldo"});
    titulos.push({"titulo":"Contra", "ancho":160, "alinea":"left", "campo":"contra"});
    response["datos"] = datos;
    response["titulos"] = titulos;
    response["totales"] = [];
    return response;
	
}
