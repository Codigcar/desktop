package pe.com.protectora.model.sinister

data class ResponseSinister(
    val data: List<MutableList<TypeSinister>>,
    val status: Boolean
)