package pe.com.protectora.model.sinister

data class DocumentSinisterVehicle(
    val VALTIP: String,
    val documento: Int,
    val estado_descrip: String,
    val ext: String,
    val fch_reg: String,
    val idDocumento: String,
    val nombre_archivo: String,
    val nombre_archivo_ftp: String,
    val nombre_asesor: String,
    val ruta: String,
    val rutadesc: String
)
