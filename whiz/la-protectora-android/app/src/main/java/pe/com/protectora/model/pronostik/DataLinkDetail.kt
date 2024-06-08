package pe.com.protectora.model.pronostik

data class DataLinkDetail(
    val CodigoExternoEmpresaExterna: String,
    val CodigoMensaje: Int,
    val IdCanal: String,
    val linkPronostik: String,
    val RespuestaMensaje: String
)