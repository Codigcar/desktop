-------------- Insert Param_Servicios
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_esDirectorioCompartido', '1');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_sftpHost', 'BIF3BPIPJ14');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_sftpPort', '22');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_rutaDirectorio', '/files/15052-H2W/');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_usuarioDirectorio', 'admgoanywhuat@dombif.peru');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_usuarioPwd', 'Q096Z3RtcmQ5JQ==');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_asuntoError', 'Carga NO exitosa Host To Web');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_asuntoExito', 'Carga exitosa Host To Web');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_templateExito', '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>BanBif Empresas</title> <style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }a:link, a:visited, a:active { text-decoration:none;font-weight: bold; font-size: 14px; color: #20A6FF; line-height: 16px; } img { border: 0; outline: none; text-decoration: none; } body{ font-family: Arial, Helvetica, sans-serif; margin: 0 !important; padding: 0 !important; width: 100% !important; } .content { max-width: 600px; margin: auto; background: #ffffff; } .content-detalle{ padding: 40px 32px; box-shadow: 0px 6px 9px 0px rgba(42, 71, 126, 0.15); border-radius: 10px; border: 2px solid #E5E5E5; } .title{ font-weight: bold; font-size: 20px; color: #20A6FF; line-height: 16px; text-align: center; padding-bottom: 24px; }.title2{ font-weight: bold; font-size: 14px; color: #20A6FF; line-height: 16px; text-align: center; padding-bottom: 24px; } .subtitle{ color: #162C56; font-size: 16px; text-align: center; padding-bottom: 24px; } .campo-first{ font-size: 14px; color: #162C56; font-weight: bold; } .campo-second{ font-size: 14px; color: #696F72; font-weight: bold; } .separator { height: 14px; } .separator-2 { height: 20px; } @media all and (max-width:639px) { .wrapper{ width: 320px !important; } .wrapper-header{ width: 100% !important; } .mobile{ width: 300px !important; display: block !important; padding: 0 !important; text-align: center; margin: auto; } .content-detalle{ padding: 40px 8px; } .subtitle{ font-size: 14px; } .wrapper2{ width: 300px; } .mobile-none{ display: none !important; } .mobile-view{ display: block !important; } .monto{ font-size: 28px !important; } .altura-campo{ line-height: 20px; } .mobile-footer{ width: 290px !important; display: block !important; padding: 0 !important; text-align: center; margin: auto; } } </style></head><body> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="content"> <tbody> <tr> <td align="center" valign="top"> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="800" class="wrapper2"> <tbody> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" class="wrapper-header"> <tr> <td height="32">&nbsp;</td> </tr> <tr> <td align="center" valign="top" > <img src="https://www.banbif.com.pe/Portals/0/home/empresas/mailing/BXI/img/logo.png" alt=""> </td> </tr> <tr> <td height="32">&nbsp;</td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="750" align="center" class="wrapper2 content-detalle" > <tbody> <tr> <td align="center" valign="top" colspan="2" style="font-weight: bold; font-size: 16px; color:#162C56">¡Hola ${ParametroNombreUsuario}! </td> </tr> <tr> <td height="24">&nbsp;</td> </tr> <tr> <td class="title" align="center" valign="top" colspan="2">Host to Web</td> </tr> <tr> <td align="center" valign="top" style="padding: 0 0 24px 0" colspan="2"> <span style="vertical-align: middle;display: inline-block; line-height: 1.25; font-size: 14px; font-family: Arial, Helvetica, sans-serif;font-weight: normal;color: #162C56;">El archivo de carga de <strong>${ParametroTipoPago}</strong> nro de referencia <strong>${ParametroReferencia}</strong> se proces&oacute; correctamente. </span> </td> </tr><tr><td align="center" valign="top" style="padding: 0 0 24px 0" colspan="2"><span style="vertical-align: middle;display: inline-block; line-height: 1.25; font-size: 14px; font-family: Arial, Helvetica, sans-serif;font-weight: normal;color: #162C56;">Para aprobar la operaci&oacute;n ingresa a la </span> <span class="title2"> <a href="https://bancaporinternetempresas.banbif.com.pe/DCIBS_BIFNET/pages/s/login.html"> Banca por Internet Empresas.</a> </span></td></tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo" height="30" colspan="2">Detalle del archivo</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Archivo: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroNombreArchivo}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cargado por:</td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroUsuario}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Fecha y hora de carga: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroFechaHora}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Tipo de pago: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroTipoPago}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Nro. de referencia: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroReferencia}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cantidad de registros: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroCantidadReg}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Moneda: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroMoneda}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Importe: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroImporte}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cuenta de cargo: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroCuentaCargo}</param> </td> </tr> <tr> <td height="40">&nbsp;</td> </tr> <tr> <td align="center" valign="top" colspan="2" style="color:#5B5B5B;font-size: 12px;" class="mobile-footer"> <p>En caso no hayas realizado esta operaci&oacute;n comun&iacute;cate con nuestra</p> <p>Banca Telef&oacute;nica Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457</p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="420" align="center" class="wrapper" > <tr> <td height="30">&nbsp;</td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" class="wrapper"> <tr> <td style="padding: 0; border-collapse: collapse;height: 1px; background:#BFBFBF;"></td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" style="color: #696F72; font-size:10px; line-height: 12px;">La informaci&oacute;n enviada en este correo es confidencial, reservada y de uso exclusivo de su destinatario. Es responsabilidad del cliente y del destinatario no reenviar o compartir el contenido de este correo con cualquier tercero. </td> </tr> <tr> <td height="40">&nbsp;</td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('h2w_templateError', '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>BanBif Empresas</title> <style> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } img { border: 0; outline: none; text-decoration: none; } body{ font-family: Arial, Helvetica, sans-serif; margin: 0 !important; padding: 0 !important; width: 100% !important; } .content { max-width: 600px; margin: auto; background: #ffffff; } .content-detalle{ padding: 40px 32px; box-shadow: 0px 6px 9px 0px rgba(42, 71, 126, 0.15); border-radius: 10px; border: 2px solid #E5E5E5; } .title{ font-weight: bold; font-size: 20px; color: #20A6FF; line-height: 16px; text-align: center; padding-bottom: 24px; }.title2{ font-weight: bold; font-size: 14px; color: #20A6FF; line-height: 16px; text-align: center; padding-bottom: 24px; } .subtitle{ color: #162C56; font-size: 16px; text-align: center; padding-bottom: 24px; } .campo-first{ font-size: 14px; color: #162C56; font-weight: bold; } .campo-second{ font-size: 14px; color: #696F72; font-weight: bold; } .separator { height: 14px; } .separator-2 { height: 20px; } @media all and (max-width:639px) { .wrapper{ width: 320px !important; } .wrapper-header{ width: 100% !important; } .mobile{ width: 300px !important; display: block !important; padding: 0 !important; text-align: center; margin: auto; } .content-detalle{ padding: 40px 8px; } .subtitle{ font-size: 14px; } .wrapper2{ width: 300px; } .mobile-none{ display: none !important; } .mobile-view{ display: block !important; } .monto{ font-size: 28px !important; } .altura-campo{ line-height: 20px; } .mobile-footer{ width: 290px !important; display: block !important; padding: 0 !important; text-align: center; margin: auto; } } </style></head><body> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="content"> <tbody> <tr> <td align="center" valign="top"> <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="800" class="wrapper2"> <tbody> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" class="wrapper-header"> <tr> <td height="32">&nbsp;</td> </tr> <tr> <td align="center" valign="top" > <img src="https://www.banbif.com.pe/Portals/0/home/empresas/mailing/BXI/img/logo.png" alt=""> </td> </tr> <tr> <td height="32">&nbsp;</td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="750" align="center" class="wrapper2 content-detalle" > <tbody> <tr> <td align="center" valign="top" colspan="2" style="font-weight: bold; font-size: 16px; color:#162C56">¡Hola ${ParametroNombreUsuario}! </td> </tr> <tr> <td height="24">&nbsp;</td> </tr> <tr> <td class="title" align="center" valign="top" colspan="2">Host to Web</td> </tr> <tr> <td align="center" valign="top" style="padding: 0 0 24px 0" colspan="2"> <span style="vertical-align: middle;display: inline-block; line-height: 1.25; font-size: 14px; font-family: Arial, Helvetica, sans-serif;font-weight: normal;color: #162C56;">El archivo de carga de <strong>${ParametroTipoPago}</strong> no se ha procesado. </span> </td> </tr><tr><td align="center" valign="top" style="padding: 0 0 24px 0" colspan="2"><span style="vertical-align: middle;display: inline-block; line-height: 1.25; font-size: 14px; font-family: Arial, Helvetica, sans-serif;font-weight: normal;color: #162C56;">Para revisar los errores del archivo ingresa a la ruta SFTP/OUTPUT_HOSTTOWEB </span></td></tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo" height="30" colspan="2">Detalle del archivo</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Archivo: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroNombreArchivo}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cargado por:</td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroUsuario}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Fecha y hora de carga: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroFechaHora}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Tipo de pago: </td> <td align="left" valign="top" class="campo-second mobile"> <param name="Parametro">${ParametroTipoPago}</param> </td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cantidad de registros: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroCantidadReg}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Moneda: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroMoneda}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Importe: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroImporte}</param> </td> </tr><tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo">Cuenta de cargo: </td> <td align="left" valign="top" class="campo-second mobile" > <param name="Parametro">${ParametroCuentaCargo}</param> </td> </tr><tr> <td height="20" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr><tr> <td align="left" valign="top" class="campo-first mobile altura-campo" colspan="2">Errores: </td> </tr><tr><td align="left" valign="top" class="campo-second mobile" style="font-size:10px" colspan="2"> <param name="Parametro">${ParametroErrores}</param> </td></tr> <tr> <td height="40">&nbsp;</td> </tr> <tr> <td align="center" valign="top" colspan="2" style="color:#5B5B5B;font-size: 12px;" class="mobile-footer"> <p>En caso no hayas realizado esta operaci&oacute;n comun&iacute;cate con nuestra</p><p>Banca Telef&oacute;nica Empresas: Lima (01) 625-3333 Provincias 0-801-0-0457</p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="420" align="center" class="wrapper" > <tr> <td height="30">&nbsp;</td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" class="wrapper"> <tr> <td style="padding: 0; border-collapse: collapse;height: 1px; background:#BFBFBF;"></td> </tr> <tr> <td height="16" style="font-size:10px; line-height:16px;">&nbsp;</td> </tr> <tr> <td align="left" valign="top" style="color: #696F72; font-size:10px; line-height: 12px;">La informaci&oacute;n enviada en este correo es confidencial, reservada y de uso exclusivo de su destinatario. Es responsabilidad del cliente y del destinatario no reenviar o compartir el contenido de este correo con cualquier tercero. </td> </tr> <tr> <td height="40">&nbsp;</td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>');

INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('client_id_envio_correo', '741eaeb1');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('client_secret_envio_correo', '134af743e27875ffda67ce8d2bbdb17b');
INSERT INTO DCIBS_BIFNET.dbo.DC_PARAM_SERVICIOS (CODIGO, DESCRIPCION) VALUES('service_enviar_correo_url', 'https://api-correspondence.uatapps.dombif.peru:443/api-email/v1/enviarCorreo'); 