package pe.com.protectora.model.sos

data class ResponseSosVehicle(
    val data: MutableList<MutableList<SosVehicle>>,
    val status: Boolean
)