package pe.com.protectora.model.login

data class RequestLogin(
    val ws_user: String,
    val ws_password: String,
    val LOCAL_NRO_DOCUMENTO: String,
    val LOCAL_PASS: String,
    val LOCAL_DEVICE_TOKEN: String,
    val LOCAL_DEVICE_TYPE: String = "android"
)