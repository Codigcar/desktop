package pe.com.protectora.model.sinister

data class ResponseSinisterVehicle(
    val data: MutableList<MutableList<SinisterVehicle>>,
    val status: Boolean
)