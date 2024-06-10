import strings from "../assets/strings";
import { enviroment } from "../utils/enviroments";
import { default as axios } from "./api";
import { StorageService } from "./storage";
import DetectID from '../modules/DetectID'

class SoftToken {

    async enviarCodigoEmail() {

        const documento = await StorageService.getItem('DNI');
        const user = await StorageService.getItem('user');
        const email = user.email;
        const nombre = user?.nombre;
        const tokenClient = await StorageService.getItem('token');
        if (documento === null ||
            documento === 'undefined' ||
            documento === '' ||
            email === null ||
            email === 'undefined' ||
            email === '') {
            throw 'DNI o correo electrónico no encontrado'
        }
        var payload = {
            documento: {
                numero: documento
            },
            contacto: {
                email: email
            },
            nombre: nombre

        };
        return (await axios.put("/api-banca-movil-empresas/v1/seguridadEmpresas/softToken",
            payload,
            {
                headers: {
                    'tokenClient': tokenClient,
                    'entidad': user.entidad,
                    'nombreUsuario': user.nombreLogin
                }
            }))
    }

    async validarCodigo({ code }) {
        try {
			const detectIdCodeResp = await DetectID.deviceRegistrationByCode(enviroment.detectIDUrl + code)

            const baseString = strings.messages.enrolamientoCodigoActivacion
			const successCode = baseString.codes.softokenEnrolledSuccessfully
            let message = ''

            if (detectIdCodeResp !== successCode) {
                message = baseString[detectIdCodeResp]
                if (typeof message === 'undefined') {
                    message = strings.messages.error
                }
                return { status: false, detectIdCodeResp, message: message ?? strings.messages.error }
            }
            
            console.log('OK')
			await StorageService.setItemStorage('hasSoftToken', 'true')

            return { status: true, detectIdCodeResp, message }
		} catch ( e ) {
            return { status: false, detectIdCodeResp: 0, message: strings.messages.error }
		}
    }
}

export const SoftTokenService = new SoftToken();
