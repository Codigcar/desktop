package pe.com.protectora.model.profile

data class ResponseProfileMark(
    val data: MutableList<MutableList<Data>>,
    val status: Boolean
)