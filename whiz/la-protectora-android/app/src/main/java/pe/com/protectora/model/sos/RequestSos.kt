package pe.com.protectora.model.sos

data class RequestSos(
    val par_code_client: String,
    val par_lat: String,
    val par_long: String,
    val par_sos_type: String,
    val par_vehicle_plate: String
)