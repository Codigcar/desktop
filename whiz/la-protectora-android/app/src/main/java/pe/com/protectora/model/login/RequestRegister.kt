package pe.com.protectora.model.login

data class RequestRegister(
    val LOCAL_APELLIDOS: String,
    val LOCAL_EMAIL: String,
    val LOCAL_NOMBRE: String,
    var LOCAL_TELEFONO:String,
    val LOCAL_NRO_DOCUMENTO: String,
    val LOCAL_PASS: String
)