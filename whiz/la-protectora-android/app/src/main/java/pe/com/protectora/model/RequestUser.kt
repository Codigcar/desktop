package pe.com.protectora.model

data class RequestUser(
    val CELULAR: String,
    val COD_CLIENTE: String,
    val DEPARTAMENTO: String,
    val DIRECCION: String,
    val DISTRITO: String,
    val EMAIL: String,
    val FECHA_NACIMIENTO: String,
    val PROVINCIA: String,
    val TELEFONO: String
)