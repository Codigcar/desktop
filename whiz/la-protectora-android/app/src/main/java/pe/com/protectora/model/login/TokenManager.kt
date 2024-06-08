package pe.com.protectora.model.login

data class TokenManager(
    var access_token: String,
    var refresh_token: String,
    var expire_time: Int,
    var expire_time_rt: Int
)