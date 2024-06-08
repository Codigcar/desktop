package pe.com.protectora.model.executive

data class Callcenter(
    val codigo: Int,
    val correoElectronico: String,
    val descripcion: String,
    val mensajeDedicatoria: String,
    val mensajeTelefonoFijo: String,
    val respuestaMsg: String,
    val telefonoFijo: String,
    val telefonoMovil: String
)