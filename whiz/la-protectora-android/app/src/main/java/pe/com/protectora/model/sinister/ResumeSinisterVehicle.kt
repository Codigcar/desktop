package pe.com.protectora.model.sinister

data class ResumeSinisterVehicle(
    val aseguradora: String,
    val cobertura: String,
    val deducible: String,
    val riesgo:String,
    val detalle: String,
    val fecha_ocurrencia: String,
    val indemnizado: String,
    val nroPoliza: String,
    val colorAseguradora:String,
    val perdida: String,
    val vc_sini_cel_ejec: String,
    val vc_sini_email_ejec: String,
    val vc_sini_nombre_ejec: String,
    val vc_sini_telf_ejec: String,
    val vc_sini_telf_fijo_ejec: String,
    val descripcion_ultimo_seguimiento:String,
    val fch_recepcion:String
)
