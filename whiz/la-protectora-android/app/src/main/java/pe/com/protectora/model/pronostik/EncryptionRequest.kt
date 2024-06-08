package pe.com.protectora.model.pronostik

data class EncryptionRequest(
    val CodigoExternoEmpresaExterna: String?,
    val IdCanal: String?,
    val LinkPronostik: String?,
    val idTipoDocCliente: Int,
    val nombreCompletoCliente: String,
    val nroDocCliente: String
)