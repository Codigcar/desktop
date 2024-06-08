package pe.com.protectora.model.policy_car_detail

data class ResponseDocument(
    val data: MutableList<MutableList<Document>>,
    val status: Boolean
)