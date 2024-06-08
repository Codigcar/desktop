package pe.com.protectora.model.sms

data class RequestVerifyCode(
    val code: String,
    val phone: String
)