package pe.com.protectora.model.executive

data class Executive(
    val Codigo: Int,
    val cargoEjecutivo: String,
    val celularEjecutivo: String,
    val correoEjecutivo: String,
    val nombreEjecutivo: String,
    val rutaLogoEjecutivo: String,
    val telefonoEjecutivo: String,
    val telefonoFijoEjecutivo: String,
    var imagenesRiesgosEjecutivos: String?
)