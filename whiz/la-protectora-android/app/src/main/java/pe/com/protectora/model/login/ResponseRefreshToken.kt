package pe.com.protectora.model.login

data class ResponseRefreshToken(
    val access_token: String,
    val expire_time: Int,
    val expire_time_rt: Int,
    val refresh_token: String,
    val status: Boolean
)