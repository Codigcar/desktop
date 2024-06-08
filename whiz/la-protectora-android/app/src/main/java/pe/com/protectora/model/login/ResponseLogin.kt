package pe.com.protectora.model.login

import com.google.gson.JsonObject

data class ResponseLogin(
    val access_token: String,
    val data: List<List<JsonObject>>,
    val expire_time: Int,
    val expire_time_rt: Int,
    val refresh_token: String,
    val status: Boolean
)