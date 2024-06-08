package pe.com.protectora.model.sinister

data class ResponseDocumentSinisterVehicle(
    val data: MutableList<MutableList<DocumentSinisterVehicle>>,
    val status: Boolean
)