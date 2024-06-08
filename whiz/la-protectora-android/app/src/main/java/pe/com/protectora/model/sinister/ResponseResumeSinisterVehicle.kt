package pe.com.protectora.model.sinister

data class ResponseResumeSinisterVehicle(
    val data: List<List<ResumeSinisterVehicle>>,
    val status: Boolean
)