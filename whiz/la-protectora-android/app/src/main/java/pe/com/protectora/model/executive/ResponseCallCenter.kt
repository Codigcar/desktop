package pe.com.protectora.model.executive

data class ResponseCallCenter(
    val data: List<MutableList<Callcenter>>,
    val status: Boolean
)