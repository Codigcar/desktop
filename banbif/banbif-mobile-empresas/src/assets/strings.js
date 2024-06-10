export default {
    noInternet: {
        noInternet: "Por favor, asegúrate de estar conectado a Internet y vuelva a intentarlo"
    },
    redirectToLogin: {
        textButton: "Salir",
        textScreen: "Su sesión ya venció "
    },
    networkVerification: {
        texButtonSoftToken: "Token Digital",
        texButtonReitentar: "Reintentar"
    },

    login: {
        inputEntidadPlaceholder: "Entidad",
        inputNombrePlaceholder: "Usuario",
        inputContrasenaPlaceholder: "Contraseña",
        checkBoxText: "Recordarme",
        buttonLogin: "Ingresar",
        forgotPassword: "Olvido la contraseña",
        butonSofttoken: "Token Digital",
    },

    consolidatedPosition: {
        title: 'Mis Productos',
        searchBarPlaceholder: 'Buscar'
    },
    logout: {
        title: ''
    },
    mainMenu: {
        accountNumber: 'Nro. de Cuenta',
        products: 'MIS PRODUCTOS',
        softtoken: 'ENROLAMIENTO AL TOKEN DIGITAL',
        autorizations: 'APROBACIONES PENDIENTES'
    },
    accountDetais: {
        details: "DETALLE DEL PRODUCTO",
        movements: "MOVIMIENTOS DE PRODUCTO",
    },

    frequentQuestions: {
        title: 'Preguntas Frecuentes'
    },

    messages:
    {
        error: "Ocurrió un error, por favor póngase en contacto con el Banco.",
        enrolamientoSoftToken: {
            "936": "Su petición anterior aún está en procesamiento, por favor, aguarde algunos instantes.",
            "97": "Su usuario no está habilitado para enrolarse al Token Digital. Por favor, póngase en contacto con el banco.",
            "956": "El cliente ya ha alcanzado el límite de dispositivos registrados.",
            codes: {
                softTokenProcessing: "936"
            }
        },

        enrolamientoCodigoActivacion: {
            "936": "Su petición anterior aún está en procesamiento, por favor, aguarde algunos instantes.",
            "426": "Sistema operativo no soportado",
            "404": "El código de activación no existe",
            "410": "El código de activación esta expirado",
            "417": "El cliente ha alcanzado el número máximo de dispositivos permitidos",
            "409": "El dispositivo ya está registrado",
            codes: {
                softokenEnrolledSuccessfully: "200"
            }
        },

        respuestaValidacionOTP: {
            "801": 'El OTP es válido.',
            "802": 'El OTP es inválido.',
            "806": 'Token deshabilitado.',
            "808": 'El PIN de autenticación enviado con el OTP, no corresponde con el asignado al token; este código aplica solo para los tokens basado en Hardware.',
            "811": 'El cliente no tiene un token asignado.',
            "814": 'El Tiempo de espera durante conexión a RADIUS se ha agotado.',
            "815": 'El token necesita ser sincronizado.',
            "816": 'El PIN de autenticación asignado no cumple con las políticas establecidas, o el cliente no tiene PIN de autenticación asignado; este código aplica solo para los tokens basado en Hardware.',
            "97": 'El cliente representado por el DNI no existe.',
            "99": 'Error en el servidor. Un error grave ocurrió en el servidor o se presentó un problema de comunicación entre la aplicación y el servidor.',
            "1022": 'El cliente ha sido bloqueado al superar el límite de intentos fallidos permitidos.',
            "1001": 'El servicio de autenticación de OTP de softoken no se encuentra habilitado.'
        }
    }







}
