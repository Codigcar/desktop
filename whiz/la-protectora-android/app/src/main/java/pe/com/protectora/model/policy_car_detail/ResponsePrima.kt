package pe.com.protectora.model.policy_car_detail

data class ResponsePrima(
    val data: List<MutableList<Prima>>,
    val status: Boolean
)