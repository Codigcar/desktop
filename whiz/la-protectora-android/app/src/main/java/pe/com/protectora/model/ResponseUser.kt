package pe.com.protectora.model

data class ResponseUser(
    val data: MutableList<MutableList<Data>>,
    val status: Boolean
)