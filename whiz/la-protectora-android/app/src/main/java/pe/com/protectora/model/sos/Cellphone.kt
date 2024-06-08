package pe.com.protectora.model.sos

data class Cellphone(
    val codigo: Int,
    val codigoTipoSiniestro: String,
    val imagenRutaTipoSiniestro: String,
    val nombreTipoSiniestro: String,
    val respuestaMsg: String
)