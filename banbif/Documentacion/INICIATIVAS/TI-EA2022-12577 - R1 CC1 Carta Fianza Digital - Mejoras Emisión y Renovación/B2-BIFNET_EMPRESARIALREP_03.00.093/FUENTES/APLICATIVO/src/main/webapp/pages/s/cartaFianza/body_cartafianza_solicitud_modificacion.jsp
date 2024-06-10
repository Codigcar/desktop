<%@page import="java.net.URLDecoder"%>
<%@page import="com.datapro.dibs.modules.cartaFianza.vo.JBDatoSolicitudCFianzaVO"%>
<%@page import="com.datapro.dibs.modules.cartaFianza.vo.JBLineaCreditoVO"%>
<%@page import="com.datapro.dibs.modules.cartaFianza.vo.JBOficinaVO"%>
<%try {%>
<%response.setHeader("Pragma", "No-cache");
response.setDateHeader("Expires", 0);
response.setHeader("Cache-Control", "no-cache");%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 FINAL//EN">
<HTML> 
<HEAD>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">
<META NAME="Author" CONTENT="Datapro">
<META NAME="Generator" CONTENT="NetObjects Fusion 4.0.1 for Windows">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">

<link rel="stylesheet" href="<%= request.getContextPath() %>/pages/css/style.css">
<script language="JavaScript" src="<%= request.getContextPath() %>/pages/s/javascripts/numpad_img.js"></script> 

<TITLE>Sistema de Banca por Internet: Solicitar Carta Fianza</TITLE>

<jsp:useBean id="error" class="com.datapro.dibs.messages.ELEERRMessage" scope="session" />
<jsp:useBean id="summarybeanC" class="com.datapro.dibs.beans.JBSummaryC" scope="session" />	
<jsp:useBean id="messagebean" class="com.datapro.dibs.beans.JBMessages" scope="session" />
<jsp:useBean id="summarybeanS" class="com.datapro.dibs.modules.pagoServicioTC.vo.JBSummaryS" scope="session"/>
<jsp:useBean id="listaOficinasModif" class="com.datapro.generic.beanutil.BeanList" scope="session" />
<jsp:useBean id="listaLineaCreditoModif" class="com.datapro.generic.beanutil.BeanList" scope="session" />
<jsp:useBean id="cumstvo" class="com.datapro.dibs.modules.common.bean.CumstVO" scope="session"/>

<!--////////////////////////////////////////////////-->
<%@page import="com.datapro.dibs.modules.cartaFianza.vo.*" %>
<%@page import="java.util.ArrayList"%> 
<jsp:useBean id="solVOModif" class="com.datapro.dibs.modules.cartaFianza.vo.JBDatoSolicitudCFianzaVO" scope="session" />
<jsp:useBean id="errorBean" class="com.datapro.dibs.modules.common.bean.DcErroresBean" scope="session" />
<jsp:useBean id="userbean"      class="com.datapro.dibs.beans.JBUser"  scope="session"/>
<jsp:useBean id="validaciondto"      class="com.datapro.dibs.modules.common.dto.ValidacionDTO"  scope="session"/>
<jsp:useBean id="msgbean" class="com.datapro.dibs.beans.JBMessage" scope="session"/>


<!--////////////////////////////////////////////////-->

<SCRIPT SRC="<%=request.getContextPath()%>/pages/s/javascripts/error.js"> </SCRIPT>
<SCRIPT SRC="<%=request.getContextPath()%>/pages/s/javascripts/dibs.js"></SCRIPT>

<SCRIPT LANGUAGE="JavaScript">
<!--- hide script from old browsers
var envio = "no"
var AccNum = ""

 function doPrint(){
    if (!window.print) {
      var msg =       "Estimado Cliente:\n";
          msg = msg + "para utilizar el botón de impresión,\n";
          msg = msg + "debe actualizar su navegador.";

      alert(msg);

      return;
    }
    window.focus();
    window.print();
    return;
  }
  
  function Imprimir(){
   doPrint();
  }
  

function showAyudaTerminos(name){
	var page = "<%= request.getContextPath() %>/pages/s/"+ name;
	window.showModalDialog(page,"","dialogHeight: 350px;dialogWidth: 657px; center:Yes; help: No; resizable: No; status: No;scroll: No;")
}

function sendBack(){  	

	f = document.filesender;
	pbValue          = "?PB=130";
	languageValue    = "&LNG=s/";
	servletNameValue =	"/DCIBS_BIFNET/servlet/com.datapro.dibs.servlets.validacion.JSValidacionList";     
	actionValue =servletNameValue + pbValue+languageValue;
	
	if (window.frames["listfileerror"] != null){
	 window.frames["listfileerror"].document.write("");
	}
	 
	f.action = actionValue;
	f.method = "post";
	f.target = "_self";
	f.submit();
	          	          
};
<%//FIN de Agregado%>
function ValInt(num)
{ 
  if(num.value == '0' || num.value == '0.00'){
     return true
   }
   else{
     var newnum = parseFloat(num.value)
     if (isNaN(newnum)){
       alert("Numero Invalido")
	   num.focus()
	   num.value = "0"
	   return false
     }
   }	 	 
   return true
}

function getBeginDate(){
   
        f = document.filesender;
        
        day   = f.DDD.value;
        month = f.DMM.value;
        year  = f.DYY.value;
        
        date = year + month + day;
        
        return date;
  };
  
  function getEndDate(){
        f = document.filesender;
        
        day   = f.VDD.value;
        month = f.VMM.value;
        year  = f.VYY.value;
        
        date = year + month + day;
        
        return date;
  };

function sendAprobar(){  	

	f = document.filesender;
	pbValue          = "?PB=130";
	
	pb1Value = "&PB1=A";
	numApr = "&NUMAPR="+"<%=userbean.getCFIAPPLVL()%>";
	sts = "&STS="+"<%=userbean.getSTS()%>";
	dcibsref = "&DCIBS_REF="+"<%=validaciondto.getDCIBS_REF()%>";
	oUser = "&OUSER="+"<%=validaciondto.getOUSER()%>";
	vUser = "&VUSER="+"<%=validaciondto.getVUSER()%>";
	languageValue    = "&LNG=s/";
	
	MODALIDAD=lrtrim(document.forms[0].MODALIDADCF.value)
	//alert(NOMBRE111);
	
	NOMBRE=lrtrim(document.forms[0].NOMBRE.value)
	DIRECCION=lrtrim(document.forms[0].DIRECCION.value)
	CORREO=lrtrim(document.forms[0].CORREO.value)
	IMPORTE=document.forms[0].IMPORTE.value
	MONEDA=lrtrim(document.forms[0].MONEDA.value)
	GARANTIA=lrtrim(document.forms[0].GARANTIA.value)
	
	DDD=lrtrim(document.forms[0].DDD.value)
	DMM=lrtrim(document.forms[0].DMM.value)
	DYY=lrtrim(document.forms[0].DYY.value)
	VDD=lrtrim(document.forms[0].VDD.value)
	VMM=lrtrim(document.forms[0].VMM.value)
	VYY=lrtrim(document.forms[0].VYY.value)
	
	NOMBREAUTORIZA=lrtrim(document.forms[0].NOMBREAUTORIZA.value)
	NRODOI=lrtrim(document.forms[0].NRODOI.value)
	OFICINA=lrtrim(document.forms[0].OFICINA.value)
	CUENTACTE=lrtrim(document.forms[0].CUENTACTE.value)
	LINEACREDITO=lrtrim(document.forms[0].LINEACREDITO.value)
	FILENAMEESPECIAL=lrtrim(document.forms[0].FILENAMEESPECIAL.value)
	FILENAMEOTRO1=lrtrim(document.forms[0].FILENAMEOTRO1.value)
	FILENAMEOTRO2=lrtrim(document.forms[0].FILENAMEOTRO2.value)
	FILENAMEOTRO3=lrtrim(document.forms[0].FILENAMEOTRO3.value)
	
	NOMBRE = reemplazaCaracteresExtranios(NOMBRE);
	NOMBRE1 = "&NOMBRE=" + NOMBRE;
	//
	DIRECCION = reemplazaCaracteresExtranios(DIRECCION);
	DIRECCION1 = "&DIRECCION=" + DIRECCION;
	CORREO1 = "&CORREO=" + CORREO;
	IMPORTE1 = "&IMPORTE=" + IMPORTE;
	MONEDA1 = "&MONEDA=" + MONEDA;
	//
	//GARANTIA = reemplazaCaracteresExtranios(GARANTIA);
	GARANTIA = encodeURIComponent(GARANTIA);
	GARANTIA1 = "&GARANTIA=" + GARANTIA;
	DDD1 = "&DDD=" + DDD;
	DMM1 = "&DMM=" + DMM;
	DYY1 = "&DYY=" + DYY;
	VDD1 = "&VDD=" + VDD;
	VMM1 = "&VMM=" + VMM;
	VYY1 = "&VYY=" + VYY;
	//
	NOMBREAUTORIZA = reemplazaCaracteresExtranios(NOMBREAUTORIZA);
	NOMBREAUTORIZA1 = "&NOMBREAUTORIZA=" + NOMBREAUTORIZA;
	NRODOI1 = "&NRODOI=" + NRODOI;
	OFICINA1 = "&OFICINA=" + OFICINA;
	CUENTACTE1 = "&CUENTACTE=" + CUENTACTE;
	LINEACREDITO1 = "&LINEACREDITO=" + LINEACREDITO;
	FILENAMEESPECIAL1 = "&FILENAMEESPECIAL=" + FILENAMEESPECIAL;
	MODALIDAD1 = "&MODALIDADCF=" + MODALIDAD;
	
	servletNameValue =	"&servletname=/DCIBS_BIFNET/servlet/com.datapro.dibs.servlets.validacion.JSValidacionSub";
	actionValue = "/DCIBS_BIFNET/pages/s/cartaFianza/body_cartafianza_process_wait.jsp";
	     
	actionValue = actionValue + pbValue + pb1Value + numApr + sts + dcibsref + oUser + vUser + languageValue+ servletNameValue + 
	NOMBRE1+DIRECCION1+CORREO1+IMPORTE1+MONEDA1+GARANTIA1+DDD1+DMM1+DYY1+VDD1+VMM1+VYY1+NOMBREAUTORIZA1+NRODOI1+OFICINA1+CUENTACTE1+LINEACREDITO1+FILENAMEESPECIAL1+MODALIDAD1;
	
	//alert(actionValue);
	
	//servletNameValue =	"&servletname=/DCIBS_BIFNET/servlet/com.datapro.dibs.servlets.validacion.JSValidacionSub";     
	
	//actionValue = "/DCIBS_BIFNET/pages/s/cartaFianza/body_cartafianza_solicitud.jsp";
	//--actionValue = actionValue + pbValue + languageValue + servletNameValue + pb1Value + numApr + sts + dcibsref + oUser + vUser;
	
	if (window.frames["listfileerror"] != null){
	 window.frames["listfileerror"].document.write("");
	}


if(NOMBRE == ""){
     alert("Debe ingresar el campo Nombre")
     document.forms[0].NOMBRE.focus()
     return false   	
   }
   
   if(DIRECCION == ""){
     alert("Debe ingresar el campo Dirección")
     document.forms[0].DIRECCION.focus()
     return false   	
   }

   if(DIRECCION.indexOf("°")>-1){
		alert("El campo para dirección tiene caracteres especiales no permitidos.\n Por favor eliminelos y vuelva a intentarlo.\n Puede ver los caracteres permitidos en la palabra 'Ayuda'");
		document.forms[0].DIRECCION.focus()
		return false;
	}
   
   if(CORREO == ""){
     alert("El usuario debe contar con un correo")
     document.forms[0].CORREO.focus()
     return false   	
   }

	expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   	     
   	     if ( !expr.test(CORREO) ){
   	        alert("La dirección de correo " + CORREO + " es incorrecta.");
	   	    document.forms[0].CORREO.focus();
		    return false;
         }
	
   
    var newnum = parseInt(IMPORTE)
   if(document.forms[0].IMPORTE.value == "00.00" || document.forms[0].IMPORTE.value == "" || document.forms[0].IMPORTE.value == "0" || newnum == 0){
     alert("Importe no puede ser 0")
     document.forms[0].IMPORTE.focus()
     return false
   }
   
   if(setDecimal()){
     alert("Por favor ingresar un monto de importe válido (Ejm: 99,999.00)");
     document.forms[0].IMPORTE.focus()
     return false   	
   }
   
   if(MONEDA == "X"){
     alert("Debe seleccionar una moneda")
     document.forms[0].MONEDA.focus()
     return false   	
   }
   
    if(GARANTIA == ""){
     alert("Debe ingresar una descripción para el campo Para garantizar")
     document.forms[0].GARANTIA.focus()
     return false   	
   }
   
	var iChars = "!\"#$%&'()*+,-./:;=?@[]^_{|}ÁÉÍÓÚÄËÏÖÜÑ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	
	for (var i = 0; i < document.forms[0].GARANTIA.value.length; i++) {
	    if (!(iChars.indexOf(document.forms[0].GARANTIA.value.toUpperCase().charAt(i)) != -1)) {
	        alert ("El campo para garantizar tiene caracteres especiales no permitidos.\nPor favor eliminelos y vuelva a intentarlo.\nPuede ver los caracteres especiales permitidos en la palabra 'Ayuda'");
	        return false;
	    }
	}
 
	var iChars2 = "#$%&'()*+,-./:;=?@[]_{|}Ñ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	for (var i = 0; i < document.forms[0].DIRECCION.value.length; i++) {
	    if (!(iChars2.indexOf(document.forms[0].DIRECCION.value.toUpperCase().charAt(i)) != -1)) {
	        alert ("El campo dirección tiene caracteres especiales no permitidos.\nPor favor eliminelos y vuelva a intentarlo.\nPuede ver los caracteres especiales permitidos en la palabra 'Ayuda'");
	        return false;
	    }
	}
    
   //1920
   var tamanio = GARANTIA.length
   if(tamanio>1920){
   	alert("El texto del campo Para garantizar no puede exceder los 1920 caracteres")
   	document.forms[0].GARANTIA.focus()
    return false   	
   }
   
   //validamos la garantia
   
    if (document.forms[0].DDD.value=="" || document.forms[0].DMM.value=="" || document.forms[0].DYY.value==""){
	      alert("Favor de ingresar Fecha desde") ;
		  document.forms[0].VDD.focus();
	      return false;
	 }
	 
	  if (document.forms[0].VDD.value=="" || document.forms[0].VMM.value=="" || document.forms[0].VYY.value==""){
	      alert("Favor de ingresar Fecha de vencimiento") ;
		  document.forms[0].VDD.focus();
	      return false;
	 }
	 
	 beginDate = getBeginDate();	     
	 endDate   = getEndDate();
		
	 if(beginDate > endDate){
	 	alert("La Fecha desde no puede ser mayor que la Fecha de vencimiento");
	    return false;
	 }
   
   if(NOMBREAUTORIZA == ""){
     alert("Debe ingresar el campo Nombre a autorizar")
     document.forms[0].NOMBREAUTORIZA.focus()
     return false   	
   }

	if(NRODOI == ""){
     alert("Debe ingresar el campo Nro DNI")
     document.forms[0].NRODOI.focus()
     return false   	
   }
   
   if(OFICINA == ""){
     alert("Debe ingresar el campo Oficina")
     document.forms[0].OFICINA.focus()
     return false   	
   }
   
   if(CUENTACTE == ""){
     alert("Debe ingresar el campo Cuenta corriente")
     document.forms[0].CUENTACTE.focus()
     return false   	
   }
   
   if(LINEACREDITO == ""){
     alert("Debe ingresar el campo Linea de crédito")
     document.forms[0].LINEACRED.focus()
     return false   	
   }
   
   /*if (document.forms[0].FILENAMEESPECIAL.value==""){
      alert("Por favor de seleccionar el Archivo") ;
	  document.forms[0].FILENAMEESPECIAL.focus();
      return false;
 }*/
 
 //document.forms[0].FILENAMEESPECIAL
 
 	if(comprueba_extension(f,FILENAMEESPECIAL)==0){
 		return false;
	};

	if(comprueba_extension(f,FILENAMEOTRO1)==0){
		return false;
	};
	
	if(comprueba_extension(f,FILENAMEOTRO2)==0){
		return false;
	};
	
	if(comprueba_extension(f,FILENAMEOTRO3)==0){
		return false;
	};

/*if(!document.forms[0].ACEPTO.checked){
	     alert("Por Favor Acepte los términos y condiciones");
	     document.forms[0].ACEPTO.focus();
	     return false;
	 }*/
	 
	 if(f.UserPass!=undefined){        
		long = f.UserPass.value.length;
	 	if (long == 0){
			alert("Debe ingresar su contraseña");
			f.UserPass.focus();
			return false;
	 	}
 	}
 	// KGarcia se agrega para evitar el reenvío de la txn
 	if (envio == "si"){
 		alert("Usted ya procesó esta transacción");
 		return false;
 	}
	 
	 
	 var cuentaCargo 	= CUENTACTE;
  	 var y = cuentaCargo.length;  	 
  	
  	var posi2=cuentaCargo.lastIndexOf(".");
   	var numeroCuenta="";
  	if(cuentaCargo.substring(0,2)=="TC"){
  		var listaTC	=new Array();
   		listaTC=cuentaCargo.split(".");	
  		numeroCuenta=listaTC[1];
  	}else{
  		numeroCuenta=cuentaCargo.substring(0,posi2);
  	}
  	var monedaCuenta 	= cuentaCargo.substring(posi2+1, y); 
	 
	 var monedacf 		= MONEDA;
	 var monto 			= IMPORTE; 
	
	 if (monedacf == "SOL") moneda2 = "S/";
	 else if (monedacf == "USD") moneda2 = "US$.";
	
	 
	<%
    System.out.println("El valor de FLAG ["+validaciondto.getFLAG()+"]");
	if((!validaciondto.getFLAG().equals("ACTUALIZARTODO"))&& (!userbean.getROLE().equals("0"))){%>
		if (!confirm("Esta seguro que desea modificar la solicitud de carta fianza."+  "\n"+"El monto: "+moneda2+" "+monto+ "\n"+"Cuenta de cargo: "+numeroCuenta+" "+monedaCuenta)){
	 	 	return false;
	 	} 
	
	<% 
	}else{%> 
		if (!confirm("Esta seguro que desea modificar esta solicitud de carta fianza."+	 "\n"+"El monto: "+moneda2+" "+monto+	 "\n"+"Cuenta de cargo: "+numeroCuenta+" "+monedaCuenta)){
			return false;
	 	}
	 <% 
	 }%>
	
	 
	 
	f.action = encodeURI(actionValue);
	//--alert(actionValue);
	f.method = "post";
	f.target = "_self";
	f.submit();
	          	          
};

contenido_textarea = "" 
num_caracteres_permitidos = 1920

function validaLongitud_ParaGarantizar(){ 
   num_caracteres = document.forms[0].GARANTIA.value.length

   if (num_caracteres > num_caracteres_permitidos){
      document.forms[0].GARANTIA.value = contenido_textarea
   }else{
      contenido_textarea = document.forms[0].GARANTIA.value
   }

   /*if (num_caracteres >= num_caracteres_permitidos){
      document.forms[0].caracteres.style.color="#ff0000";
   }else{
      document.forms[0].caracteres.style.color="#000000";
   }*/

   cuentaParaGarantizar() 
} 
function cuentaParaGarantizar(){ 
   //--document.forms[0].caracteres.value=document.forms[0].GARANTIA.value.length 
   document.getElementById('caracteres').innerText = ''+document.forms[0].GARANTIA.value.length;
} 



function cantidadDeDias(){ 

	DDD=lrtrim(document.forms[0].DDD.value)
	DMM=lrtrim(document.forms[0].DMM.value)
	DYY=lrtrim(document.forms[0].DYY.value)
	VDD=lrtrim(document.forms[0].VDD.value)
	VMM=lrtrim(document.forms[0].VMM.value)
	VYY=lrtrim(document.forms[0].VYY.value)


	/*alert('#'+DDD+'#');
	alert('#'+DMM+'#');
	alert('#'+DYY+'#');
	alert('#'+VDD+'#');
	alert('#'+VMM+'#');
	alert('#'+VYY+'#');*/
	
	/*alert('#'+DDD.value+'#');
	alert('#'+DMM.value+'#');
	alert('#'+DYY.value+'#');
	alert('#'+VDD.value+'#');
	alert('#'+VMM.value+'#');
	alert('#'+VYY.value+'#');*/

	var process=false;
	if (DDD=="" || DMM=="" || DYY==""){
		//alert(1.1);
	     process=false;
	 }else{
	 	//alert(1.2);
	 	process=true;
	 }
	if (VDD=="" || VMM=="" || VYY==""){
		//alert(1.3);
	     process=false;
	 }else{
	 	//alert(1.4);
	 	process=true;
	 }
	var dias=0;
	if(process){
		//alert('20'+DYY+'-'+ DMM+'-'+ DDD);
		//alert('20'+VYY+'-'+ VMM+'-'+ VDD);
		//alert(1);
		var fFecha1 = Date.UTC('20'+DYY,eval(DMM)-1,DDD);
		//alert(2);
	 	var fFecha2 = Date.UTC('20'+VYY,eval(VMM)-1,VDD);
	 	//alert(3);
	 	var dif = fFecha2 - fFecha1;
	 	//alert(dif);
	 	dias = Math.round(dif / (1000*60*60*24));
	 	//alert(5);
	 	//-alert(dif / (1000*60*60*24));
	 	//alert(dias);
		
	}else{
	//alert(6);
		dias=0;
	}
//alert(7);
	if(dias<0){
	//alert(8);
		dias=0;
	}
	//alert(9);

	document.getElementById('nrodias').innerText = ''+dias;
} 

function completa(){
		  
	document.forms[0].IMPORTE.value = lrtrim(document.forms[0].IMPORTE.value); 
	VALORIMPORTE = document.forms[0].IMPORTE.value;
	long = VALORIMPORTE.length;
		  
	if ((long > 0) && (long <= 2)) {    
		document.forms[0].IMPORTE.value = document.forms[0].IMPORTE.value + ".00";
	}
		    	
}

//
	function setDecimal() {
	
		var texto = document.forms[0].IMPORTE.value;
		//--var er = /^(?!0|\.00)[0-9]+(,\d{3})*(.[0-9]{0,2})$/;
		var er = /^\d{1,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
		if (er.test(texto)) {
		
			var arr = texto.split(".");  // declaro el array  
			var entero1= arr[0]; 
			//alert(entero1);
			var decimal1= arr[1];
			//alert(decimal1);
			var texto1 = texto.replace(new RegExp(',', 'g'),'');
			//alert(texto1);
		
			document.forms[0].IMPORTE.value = parseFloat(texto1).toFixed(2);
			//alert(document.forms[0].IMPORTE.value);
			
			var arr2 = document.forms[0].IMPORTE.value.split(".");  // declaro el array  
			var entero2= arr2[0]; 
			//alert(entero2);
			var decimal2= arr2[1];
			//alert(decimal2);
			document.forms[0].IMPORTE.value = ''+entero1+'.'+decimal2;
		
			//alert("");
			return false;
		} else {
			//alert("El formato de número no es válido. (Ejm: 99,999.00)");
			return true;
		}
	
	}
//

      function onlyLettersAndNumbers(e){
         var key;
         var keychar;

         if (window.event){
             key = window.event.keyCode;
         }else{
             if(e){
               key = e.which;
             }else{
               return true;
             }
         }

         if ((key > 96) && (key < 123)){
             window.event.keyCode = key - 32;
         }

         if (key ==241){
             window.event.keyCode = 209;
         }
                                 
         keychar = String.fromCharCode(key);
         keychar = keychar.toLowerCase();
         
         // block enter
         if(key ==13){
            return false;
         }
         
         // control keys
         if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27)){
             return true;
         }    
        
         if (((" abcdefghijklmnñopqrstuvwxyz0123456789").indexOf(keychar) > -1)){         
            return true;
         }
         
         return false;
      };

	function comprueba_extension(formulario, archivo) { 
		   extensiones_permitidas = new Array(".docx", ".doc", ".xlsx", ".xls", ".txt", ".pdf"); 
		   mierror = ""; 
		   if (!archivo) {
		      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario 
		       mierror = "No has seleccionado ningún archivo"; 
		       return 1;
		   }else{ 
		      //recupero la extensión de este nombre de archivo 
		      extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase(); 
		      //alert (extension); 
		      //compruebo si la extensión está entre las permitidas 
		      permitida = false; 
		      for (var i = 0; i < extensiones_permitidas.length; i++) { 
		         if (extensiones_permitidas[i] == extension) { 
		         permitida = true; 
		         break; 
		         } 
		      } 
		      if (!permitida) { 
		         mierror = "Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join(); 
		       }else{ 
		         //submito! 
		         //alert ("Todo correcto. Voy a submitir el formulario."); 
		         //formulario.submit(); 
		         return 1; 
		       } 
		   } 
		   //si estoy aqui es que no se ha podido submitir 
		   if(archivo){
		   	alert (mierror);
		   }
		   return 0; 
	  } 
	  
	 function onkeyup(e) {
    var code;
    if (!e) var e = window.event; // some browsers don't pass e, so get it from the window
    if (e.keyCode) code = e.keyCode; // some browsers use e.keyCode
    else if (e.which) code = e.which;  // others use e.which

    if (code == 8 || code == 46)
        return false;
}

	/*function cargarArchivosAdjuntos(){
	
		archTE="<%=solVOModif.getNombreTextoEspecial()%>";
		archOtro1="<%=solVOModif.getNombreOtro()%>";
		archOtro2="<%=solVOModif.getNombreOtro()%>";
		archOTro3="<%=solVOModif.getNombreOtro3()%>";
	
		document.getElementById('textoespecial').text = 'sdfsffsf'+archTE;
		document.getElementById('otro1').text = ''+archOtro1;
		document.getElementById('otro2').text = ''+archOtro2;
		document.getElementById('otro3').text = ''+archOTro3;
	}*/

/*function showErrors()
{
	var page = "<=request.getContextPath()%>/pages/s/error_viewer.jsp";
	listin = open(page, 'errors', 'toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,width=420,height=300');
}
*/
	function clear() {
		clear2(document.forms[0].UserPass )
	}
		
	function numKeyPressed(obj, id) {
		numKeyPressed2(obj, id, document.forms[0].UserPass )
	}
	
	function reemplazaCaracteresExtranios(cadena){
    	var retorno = "";
    	cadena = cadena.replace(new RegExp('%', 'g'),'*000*');
		cadena = cadena.replace(new RegExp('"', 'g'),'*001*');
		cadena = cadena.replace(new RegExp('&', 'g'),'*002*');
		cadena = cadena.replace(new RegExp('=', 'g'),'*004*');
		cadena = cadena.replace(new RegExp('\u201C', 'g'),'*005*');
		cadena = cadena.replace(new RegExp('\u201D', 'g'),'*006*');
		cadena = cadena.replace(new RegExp('\u2013', 'g'),'*007*');
		cadena = cadena.replace(new RegExp('\u2014', 'g'),'*008*');
		//tildes minusculas
		cadena = cadena.replace(new RegExp('\u00E1', 'g'),'*009*');//á
		cadena = cadena.replace(new RegExp('\u00E8', 'g'),'*010*');//é
		cadena = cadena.replace(new RegExp('\u00ED', 'g'),'*011*');//í
		cadena = cadena.replace(new RegExp('\u00F3', 'g'),'*012*');//ó
		cadena = cadena.replace(new RegExp('\u00FA', 'g'),'*013*');//ú
		//tildes mayusculas
    	cadena = cadena.replace(new RegExp('\u20C1', 'g'),'*014*');//Á
    	cadena = cadena.replace(new RegExp('\u20C9', 'g'),'*015*');//É
    	cadena = cadena.replace(new RegExp('\u20CD', 'g'),'*016*');//Í
    	cadena = cadena.replace(new RegExp('\u20D3', 'g'),'*017*');//Ó
    	cadena = cadena.replace(new RegExp('\u20DA', 'g'),'*018*');//Ú
    	//enies
    	cadena = cadena.replace(new RegExp('\u20F1', 'g'),'*019*');//ñ
    	cadena = cadena.replace(new RegExp('\u20D1', 'g'),'*020*');//Ñ
    	//simbolos
    	cadena = cadena.replace(new RegExp('\u20BF', 'g'),'*021*');//¿
    	cadena = cadena.replace(new RegExp('\u20A1', 'g'),'*022*');//¡
    	//
    	retorno = retorno + cadena;
    	
    	return retorno 
    }
	
	function mouseOver() {
		  document.getElementById("demo").innerText = "!\"#$%&'()*+,-./:;=?@[]^_{|}ÁÉÍÓÚÄËÏÖÜÑ ";
	}
	
	function mouseOut() {
		  document.getElementById("demo").innerText = "";
	}
	
	function mouseOver2() {
		  document.getElementById("demo2").innerText = "#$%&'()*+,-./:;=?@[]_{|}Ñ ";
	}
	
	function mouseOut2() {
		  document.getElementById("demo2").innerText = "";
	}
	
// end hiding from old browsers -->
</SCRIPT>

</HEAD>

<BODY topmargin="0" leftmargin="100" onload="cantidadDeDias()">

<!--<if (!error.getERRNUM().equals("0")) {
	error.setERRNUM("0");
	out.println("<SCRIPT Language=\"Javascript\">");
	out.println("       showErrors()");
	out.println("</SCRIPT>");
}%>-->
<%System.out.println("El valor de CFIAPPLVL ["+userbean.getCFIAPPLVL()+"]");%>
<%System.out.println("El valor de STS       ["+validaciondto.getSTS()+"]");%>
<FORM METHOD=POST NAME="filesender" enctype="multipart/form-data" >
<INPUT TYPE=HIDDEN NAME="PB" VALUE="130">
<INPUT TYPE=HIDDEN NAME="PB1" VALUE="A">
<INPUT TYPE=HIDDEN NAME="NUMAPR" VALUE=<%=userbean.getCFIAPPLVL()%>>
<INPUT TYPE=HIDDEN NAME="STS" VALUE=<%= validaciondto.getSTS() %>>
<INPUT TYPE=HIDDEN NAME="DCIBS_REF" VALUE=<%= validaciondto.getDCIBS_REF() %>>
<INPUT TYPE=HIDDEN NAME="OUSER" VALUE=<%= validaciondto.getOUSER() %>>
<INPUT TYPE=HIDDEN NAME="VUSER" VALUE=<%= validaciondto.getVUSER() %>>
<INPUT TYPE=HIDDEN NAME="LNG" VALUE="s/">
<INPUT TYPE=HIDDEN NAME="Tipo" VALUE="<%= request.getParameter("Tipo") %>">
<INPUT TYPE=HIDDEN NAME="CantCheqXChequera" VALUE="">
<INPUT TYPE=HIDDEN NAME="MODALIDADCF" VALUE="<%= solVOModif.getModalidad() %>">
<!--<INPUT TYPE=HIDDEN NAME="CORREO" VALUE="<%= userbean.getEMAIL()%>">-->

<TABLE>
  <tr>
    <TD class="smWhite"><%=messagebean.getCName().trim()%></TD>
    </tr>
  <tr>
    <td height="10"></td>
  </tr>
      <TR> 
        <TD class="sectHeader">Solicitud de Carta Fianza</TD>
      </TR>
      <TR> 
        <TD WIDTH=9 height="12"></TD>
      </TR>
</TABLE>

<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=0 width="580">
  <TR class="rowerror">
    <td height="10"><%if((errorBean!=null)&&(errorBean.getCODIGO()!=null)){%><%= errorBean.getCODIGO() %><%}%>&nbsp;&nbsp;<%if((errorBean!=null)&&(errorBean.getDESCRIPCION()!=null)){%><%= errorBean.getDESCRIPCION() %><BR><%}%>	</td>
  </tr>
</TABLE>
	<%session.removeAttribute("error");%>
	<%session.removeAttribute("errorBean");%>

<TABLE>
      <TR> 
      <TD>       
	   		<TABLE>
            	<tr class="rowdark"> 
              		<td ALIGN="left" width="100%">
              		Le(s) agradeceré(mos) se sirvan emitir una carta fianza, solidaria, irrevocable, incondicionada, de realización automática y sin beneficio de exclusión, de acuerdo a los siguientes términos:
              		</td>
            	</tr>
            </TABLE>
            
            <BR>
            
            <TABLE>
  			<TR ALIGN=LEFT class="sectBody"> 
    			<TD COLSPAN="6" ALIGN=LEFT>Datos del Beneficiario</TD>
  			</TR>
            
  			<tr class="rowdark">
    			<td align="right" width="15%">Nombre :</td>
				<td align="left" width="75%" colspan="5" ><input type=TEXT name="NOMBRE" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getNombre()%>" size=50 maxlength=135 onKeypress="onlyLettersAndNumbers(event)" ></td>
					
  			</tr>
  			<tr class="rowdark"> 
    			<td align="right" width="15%">Dirección: </td>
    			<td align="left" width="75%" colspan="5" ><input type=TEXT name="DIRECCION"  style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getDireccion()%>" size=50 maxlength=100 >
    			<a onmouseover="mouseOver2()" onmouseout="mouseOut2()" ><font color="RED" >Caracteres especiales permitidos</font> </a><font color="RED" > <label id="demo2"  ></label></font>
    			</td>
  			</tr>  			
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Correo electrónico : </td>
		    	<td align="left" width="75%" colspan="5" >
		    	<!--<label id="CORREO_USUARIO" style="border:1px solid #bbb;background:#fff;font-size:12px;width:150px;height:20px;"><%=userbean.getEMAIL()%></label>-->	
		    	<input type=TEXT name="CORREO" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getCorreo()%>" size=50 maxlength=100 ></td>
		    	</td>
		  	</tr>
		  	
		  	<TR ALIGN=LEFT class="sectBody"> 
    			<TD COLSPAN="6" ALIGN=LEFT>Datos generales</TD>
  			</TR>
		  	
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Por el importe de: </td>
		    	<td align="left" width="35%" ><input type=TEXT name="IMPORTE" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getImporte()%>" size=50 maxlength=45  ></td>
		    	<td align="right" width="15%">Moneda: </td>
		    	<td align="left" width="35%" colspan="3" >
		    		<SELECT NAME="MONEDA" style="font-family:Arial, Verdana, Helvetica;font-size:10px;">
						<OPTION VALUE = "X" <%if(solVOModif.getMoneda().equals("")){%>selected="selected" <%}%>> Seleccione </OPTION>
						<OPTION VALUE="SOL" <%if(solVOModif.getMoneda().equals("SOL")){%>selected="selected" <%}%>>SOL</OPTION>
						<OPTION VALUE="USD" <%if(solVOModif.getMoneda().equals("USD")){%>selected="selected" <%}%>>USD</OPTION>
					</SELECT>
		    	</td>
		  	</tr>
		  	
		  	
		  	
		  	
		  	<tr class="rowlight"> 
            	<td ALIGN="left" width="100%" colspan="6">
             	Por todos los conceptos y obligaciones descritos a continuación:<a onmouseover="mouseOver()" onmouseout="mouseOut()" ><font color="RED" >Caracteres especiales permitidos</font> </a><font color="RED" > <label id="demo"  ></label></font>
              	</td>
            </tr>
            
            <tr class="rowdark"> 
		    	<td align="right" width="15%">Para garantizar: </td>
		    	<td align="left" width="75%" colspan="5">
		    		<TEXTAREA ID="GARANTIA" NAME="GARANTIA" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" ROWS="8" COLS="150"  onKeyDown="validaLongitud_ParaGarantizar()" onKeyUp="validaLongitud_ParaGarantizar()" ><%=URLDecoder.decode(solVOModif.getParaGarantizar(),"UTF-8")%></TEXTAREA>
		    		<label id="caracteres"></label> caracteres
		    	</td>
		  	</tr>
		  	
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Desde el: </td>
		    	<td align="left" width="25%">
		    	
		    		<font color="#FF0000" size="1">&nbsp;&nbsp;</font>
					<INPUT TYPE=TEXT NAME="DDD" id= "DDD" READONLY VALUE="<%= solVOModif.getDDD() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />/
	    			<INPUT TYPE=TEXT NAME="DMM" id= "DMM" READONLY VALUE="<%= solVOModif.getDMM() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />/
	    			<INPUT TYPE=TEXT NAME="DYY" id= "DYY" READONLY VALUE="<%= solVOModif.getDYY() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />&nbsp;(dd/mm/aa)&nbsp;
	        		<a href="javascript:DatePicker(document.forms[0].DDD,document.forms[0].DMM,document.forms[0].DYY)" ><img src="<%= request.getContextPath() %>/images/s/calendar.gif" alt=". . ." border="0" /></a>
		    	
		    	</td>
		    	<td align="right" width="15%">Con vencimiento el: </td>
		    	<td align="left" width="25%">
		    		<font color="#FF0000" size="1">&nbsp;&nbsp;</font>
					<INPUT TYPE=TEXT NAME="VDD" id= "VDD" READONLY VALUE="<%= solVOModif.getVDD() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />/
	    			<INPUT TYPE=TEXT NAME="VMM" id= "VMM" READONLY VALUE="<%= solVOModif.getVMM() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />/
	    			<INPUT TYPE=TEXT NAME="VYY" id= "VYY" READONLY VALUE="<%= solVOModif.getVYY() %>" SIZE=2 MAXLENGTH=2 onChange="cantidadDeDias()" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" />&nbsp;(dd/mm/aa)&nbsp;
	        		<a href="javascript:DatePicker(document.forms[0].VDD,document.forms[0].VMM,document.forms[0].VYY)" ><img src="<%= request.getContextPath() %>/images/s/calendar.gif" alt=". . ." border="0" /></a>
		    	
		    	</td>
		    	<td align="left" width="20%" colspan="2" >
		    		<label id="nrodias" style="padding-top:2px;border:1px solid #bbb;background:#fff;font-family:Arial, Verdana, Helvetica;font-size:10px;width:30px;height:20px;" ></label>&nbsp;Días 
		    	</td>
		    	
		    	
		  	</tr>
		  	
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Oficina de entrega: </td>
		    	<td align="left" width="75%" colspan="5">
		    		<SELECT NAME="OFICINA" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" >
						<%listaOficinasModif.initRow();
						while (listaOficinasModif.getNextRow()) {
							JBOficinaVO oficina;
							oficina = (JBOficinaVO) listaOficinasModif.getRecord();%> 
        				<OPTION VALUE="<%=oficina.getCodigo()%>" <%if(solVOModif.getOficina().equals(oficina.getCodigo())){%>selected="selected" <%}%> ><%=oficina.getDescripcion()%></OPTION>
						<%}%> 
					</SELECT>
		    	</td>
		  	</tr>
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Nombre de persona autorizada para la entrega: </td>
		    	<td align="left" width="75%" colspan="5"><input type=TEXT name="NOMBREAUTORIZA" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getPersonaAutorizada()%>" size=50 maxlength=45 onKeypress="onlyLettersAndNumbers(event)" ></td>
		  	</tr>
		  	
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Número de DNI: </td>
		    	<td align="left" width="75%" colspan="5"><input type=TEXT name="NRODOI" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" value="<%=solVOModif.getNroDOI()%>" size=50 maxlength=8 onKeypress="enterSoloNumeros()"  ></td>
		  	</tr>
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Cuenta corriente: </td>
		    	<td align="left" width="35%" >
		    		<SELECT NAME="CUENTACTE" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" >
						<% 
						summarybeanS.initRowS();
						while (summarybeanS.getNextRowS()) {
							if (!summarybeanS.getccyS().trim().equals("EUR")) {	
								if(summarybeanS.gettypeS().equals("NOW") || summarybeanS.gettypeS().equals("DDA") || summarybeanS.gettypeS().equals("MMK") ||summarybeanS.gettypeS().equals("CCCD") ||summarybeanS.gettypeS().equals("CCCS") ){
								/*if(summarybeanS.gettypeS().equals("DDA") || summarybeanS.gettypeS().equals("SAV") || 
									(summarybeanS.gettypeS().equals("NOW") && 
									(!summarybeanS.getprodS().equals("CGJS") && !summarybeanS.getprodS().equals("CGJD") && !summarybeanS.getprodS().equals("CGNS") && !summarybeanS.getprodS().equals("CGND"))) || 
						     		summarybeanS.gettypeS().equals("MMK") || 
						     		summarybeanS.gettypeS().equals("CTS")){*/
						%> 
        				<OPTION VALUE="<%= summarybeanS.getnumberS() + "." + summarybeanS.getccyS()%>" ><%= summarybeanS.getdescriptionS() %>&nbsp;:&nbsp;<%= summarybeanS.getnumberS() %>&nbsp;&nbsp;<%= summarybeanS.getccyS() %>&nbsp;&nbsp;<%= summarybeanS.getavailableS() %></OPTION>
						<%	}	
							}
						}
						%>
 
        			</SELECT>
		    	</td>
		    	<td align="right" width="15%">Línea de crédito : </td>
		    	<td align="left" width="35%" colspan="3" >
		    		
					<SELECT NAME="LINEACREDITO" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" >
						<%listaLineaCreditoModif.initRow();
						while (listaLineaCreditoModif.getNextRow()) {
							JBLineaCreditoVO lineaCredito;
							lineaCredito = (JBLineaCreditoVO) listaLineaCreditoModif.getRecord();%> 
        				<OPTION VALUE="<%=lineaCredito.getNroLinea()%>" <%if(solVOModif.getOficina().equals(lineaCredito.getNroLinea())){%>selected="selected" <%}%> >
        				<%=lineaCredito.getTipoLinea()%>  <%=lineaCredito.getNroLinea()%>  <%=lineaCredito.getMoneda()%>  <%=lineaCredito.getMontoDisponible()%></OPTION>
						<%}%> 
					</SELECT>
					
		    	</td>
		    	
		  	</tr>
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Texto especial guardado: </td>
		    	<td align="left" width="35%" >
		    		<label id="FILENAMEESPECIAL_LBL" style="padding-top:2px;font-family:Arial, Verdana, Helvetica;font-size:10px;width:150px;height:20px;"><%=solVOModif.getNombreTextoEspecial()%></label>
		    	</td>
		    	<td align="left" width="50%" colspan="4">
		    		<INPUT id="textoespecial" TYPE="FILE" NAME="FILENAMEESPECIAL" SIZE="50" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" VALUE="<%= solVOModif.getNombreTextoEspecial()%>" >
		    	</td>
		  	</tr>
		  	
		  	<tr class="rowlight"> 
            	<td ALIGN="left" width="100%" colspan="6">
             	Archivos adicionales guardados:
              	</td>
            </tr>
            
		  	
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Archivo adicional 1: </td>
		    	<td align="left" width="35%" >
		    		<label id="FILENAMEOTRO1_LBL" style="padding-top:2px;font-family:Arial, Verdana, Helvetica;font-size:10px;width:150px;height:20px;"><%=solVOModif.getNombreOtro()%></label>
		    		
		    	</td>
		    	<td align="left" width="50%" colspan="4">
		    		<INPUT id="otro1" TYPE="FILE" NAME="FILENAMEOTRO1" SIZE="50" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" VALUE="<%= solVOModif.getNombreOtro()%>" >
		    	</td>
		  	</tr>
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Archivo adicional 2: </td>
		    	<td align="left" width="35%" >
		    		<label id="FILENAMEOTRO2_LBL" style="padding-top:2px;font-family:Arial, Verdana, Helvetica;font-size:10px;width:150px;height:20px;"><%=solVOModif.getNombreOtro2()%></label>
		    	</td>
		    	<td align="left" width="50%" colspan="4">
		    		<INPUT id="otro2" TYPE="FILE" NAME="FILENAMEOTRO2" SIZE="50" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" VALUE="<%= solVOModif.getNombreOtro2()%>" >
		    	</td>
		  	</tr>
		  	<tr class="rowdark"> 
		    	<td align="right" width="15%">Archivo adicional 3: </td>
		    	<td align="left" width="35%" >
		    		<label id="FILENAMEOTRO3_LBL" style="padding-top:2px;font-family:Arial, Verdana, Helvetica;font-size:10px;width:150px;height:20px;"><%=solVOModif.getNombreOtro3()%></label>
		    	</td>
		    	<td align="left" width="50%" colspan="4">
		    		<INPUT id="otro3" TYPE="FILE" NAME="FILENAMEOTRO3" SIZE="50" style="font-family:Arial, Verdana, Helvetica;font-size:10px;" VALUE="<%= solVOModif.getNombreOtro3()%>" >
		    	</td>
		  	</tr>
		  			                 
       </TABLE>
       
       <BR>
       
       <!--
       <TABLE>
            	<tr class="rowlight"> 
		    		<td align="left" width="100%" colspan="6"><INPUT type="checkbox" name="ACEPTO">Acepto los términos y condiciones &nbsp;&nbsp;&nbsp;&nbsp; <a href="#" onClick="javascript:showAyudaTerminos('cartaFianza/body_cartafianza_terminos_condiciones.jsp')" style="color:#0000ff;"> Ver</a></td>
		  		</tr>  			
            </TABLE>
            -->
       
<BR>
<%if((!validaciondto.getFLAG().equals("ACTUALIZARTODO"))&& (!userbean.getROLE().equals("0"))){%>
<TABLE>
  <tr align="left" class="sectBody">
    <TD colspan="3" align="left" >Datos requeridos para confirmar esta operación :</TD>		
  </tr>
  <TR > 
      <TD align="right" width="28%"></TD>
      <TD valign="top" align="left" width="50"><SCRIPT language="javascript">
						 np_cc= new numpad('cc');
						 np_cc.show();
</SCRIPT></TD>     
	  <% if (userbean.getFlagSoftToken().equals("Y")) { %> 
	  <TD valign="top" align="left" width="72%" class="rowNota2">Ingrese su <b>token digital</b> <BR>con el teclado virtual :<BR><INPUT readonly TYPE="password" NAME="UserPass" VALUE="" SIZE=10 MAXLENGTH=10></TD>
      <% } else {%>    
      <TD valign="top" align="left" width="72%" class="rowNota2">Ingresa tu <b>Contraseña</b> <BR>con el teclado virtual :<BR><INPUT readonly TYPE="password" NAME="UserPass" VALUE="" SIZE=10 MAXLENGTH=10></TD>
      <% } %>    
  </TR>  
</TABLE>
<%}%>
<BR>
	<table border="0" cellspacing="0" cellpadding="0" width="580">
	  <tr> 
	  <%if(!validaciondto.getFLAG().equals("ACTUALIZARTODO")){%>
	  		<%if(!userbean.getROLE().equals("0")){%>
	    		<td width="33%" align="center"><INPUT class="DIBSBTN" type=button value="aprobar" onClick="javascript:sendAprobar()"></td>
	    	<%}else{%>
	    	    <td width="33%" align="center"><INPUT class="DIBSBTN" type=button value="procesar" name="Procesar" onClick="javascript:sendAprobar()"></td>
	    	<%}%>
	  <%}else{%>
	  	<td width="33%" align="center"><INPUT class="DIBSBTN" type=button value="modificar" onClick="javascript:sendAprobar()" ></td>
	    <TD WIDTH=25% ALIGN="CENTER"><input class="DIBSBTN" type=button value="imprimir" onClick="Imprimir()"></TD> 
	  <%}%> 
	  <%if(!userbean.getROLE().equals("0")){%>
	    <td width="34%" align="center"><input class="DIBSBTN"  type="button" value="atrás"            onClick="javascript:sendBack()"  ></td>
	  <%}else{%>
	    <td width="34%" align="center"><input class="DIBSBTN"  type="button" value="cancelar"            onClick="javascript:sendBack()"  ></td>	 
	  <%}%>
	  </tr>
	</table>          
</TABLE>
</FORM>
</BODY>
</HTML>
<%} catch (Exception e) {
	System.out.println("Error=" + e);
}%> 