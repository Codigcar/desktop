package pe.com.protectora.model.policy_car_detail

data class ResponseVehicle(
    val data: MutableList<MutableList<Vehicle>>,
    val status: Boolean
)