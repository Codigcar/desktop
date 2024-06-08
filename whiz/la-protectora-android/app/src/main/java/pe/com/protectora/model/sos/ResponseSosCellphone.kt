package pe.com.protectora.model.sos

data class ResponseSosCellphone(
    val data: MutableList<MutableList<Cellphone>>,
    val status: Boolean
)