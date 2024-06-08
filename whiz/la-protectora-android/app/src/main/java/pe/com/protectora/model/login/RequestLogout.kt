package pe.com.protectora.model.login

data class RequestLogout(
    val LOCAL_DEVICE_TOKEN: String,
    val LOCAL_DEVICE_TYPE: String = "android",
    val LOCAL_NRO_DOCUMENTO: String
)