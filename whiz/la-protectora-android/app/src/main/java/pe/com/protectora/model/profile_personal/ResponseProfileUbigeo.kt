package pe.com.protectora.model.profile_personal

data class ResponseProfileUbigeo(
    val data: MutableList<MutableList<Ubigeo>>,
    val status: Boolean
)