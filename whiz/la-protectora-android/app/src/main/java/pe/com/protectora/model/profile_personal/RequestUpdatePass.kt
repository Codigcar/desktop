package pe.com.protectora.model.profile_personal

data class RequestUpdatePass(
    val LOCAL_ANTERIOR_PASS: String,
    val LOCAL_NRO_DOCUMENTO: String,
    val LOCAL_NUEVO_PASS: String
)