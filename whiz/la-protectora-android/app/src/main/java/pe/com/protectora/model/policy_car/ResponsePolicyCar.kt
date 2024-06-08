package pe.com.protectora.model.policy_car

data class ResponsePolicyCar(
    val data: MutableList<MutableList<PolicyCar>>,
    val status: Boolean
)