package pe.com.protectora.model.sinister

data class Document(
    val estado_descrip: String,
    val estado_id: String,
    val ext: String,
    val fch_reg: String,
    val id_documento: Int,
    val nombre: String,
    val ruta: String,
    val rutadesc: String,
    val tipo: String
)