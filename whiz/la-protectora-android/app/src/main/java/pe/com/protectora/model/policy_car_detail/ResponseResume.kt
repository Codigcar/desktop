package pe.com.protectora.model.policy_car_detail

data class ResponseResume(
    val data: MutableList<MutableList<Resume>>,
    val status: Boolean
)