package pe.com.protectora.model.sinister

data class ResponseTracingSinisterVehicle(
    val data: MutableList<MutableList<TracingSinisterVehicle>>,
    val status: Boolean
)