package pe.com.protectora.model.sinister

data class ResponseSinisterDocument(
    val data: List<List<Document>>,
    val status: Boolean
)