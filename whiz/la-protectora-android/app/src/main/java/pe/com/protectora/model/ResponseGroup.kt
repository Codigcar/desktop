package pe.com.protectora.model

data class ResponseGroup(
    val data: MutableList<MutableList<Group>>,
    val status: Boolean
)