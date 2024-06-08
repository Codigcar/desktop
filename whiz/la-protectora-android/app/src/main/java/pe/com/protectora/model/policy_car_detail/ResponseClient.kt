package pe.com.protectora.model.policy_car_detail

data class ResponseClient(
    val data: MutableList<MutableList<Client>>,
    val status: Boolean
)