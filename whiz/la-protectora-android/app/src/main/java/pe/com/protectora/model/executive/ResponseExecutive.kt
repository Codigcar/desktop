package pe.com.protectora.model.executive

data class ResponseExecutive(
    val data: List<MutableList<Executive>>,
    val status: Boolean
)