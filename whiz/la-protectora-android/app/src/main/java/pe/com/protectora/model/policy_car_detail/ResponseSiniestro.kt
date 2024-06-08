package pe.com.protectora.model.policy_car_detail

data class ResponseSiniestro(
    val data: MutableList<MutableList<Sinister>>,
    val status: Boolean
)