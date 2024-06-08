package pe.com.protectora.model.policy_car_detail

data class ResponseEndorsements(
    val data: List<MutableList<Endorsements>>,
    val status: Boolean
)