package pe.com.protectora.model.policy_car_detail

data class ResponseCuponPrima(
    val data: List<MutableList<Cupon>>,
    val status: Boolean
)