package pe.com.protectora.model.sinister

data class SinisterVehicle(
    val Aseguradora: String,
    val ESTADOSINI: String,
    val EjecutivoSiniestro: String,
    val NroPoliza: String,
    val NroSiniestro: String,
    val SiniestroLP: Int,
    val colorAseguradora:String,
    val datosEjecutivoSiniestro: String,
    val descripcion: String,
    val fechaOcurrencia: String,
    val idPoliza: Int,
    val idRiesgo: Int,
    val riesgo: String,
    val telefonoEjecutivoSiniestro: String,
    val ubicacion: String
)