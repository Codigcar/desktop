package pe.com.protectora.model.login

data class RequestRefreshToken(
    val access_token: String,
    val refresh_token: String
)