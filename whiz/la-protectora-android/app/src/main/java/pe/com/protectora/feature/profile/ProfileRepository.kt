package pe.com.protectora.feature.profile

import com.google.gson.JsonObject
import pe.com.protectora.model.login.RequestLogout
import pe.com.protectora.model.profile.ResponseProfileMark
import pe.com.protectora.network.OperationResult

/**
 * Created by William Quispe on 31,julio,2020
 * github : https://github.com/William2406
 */

interface ProfileRepository {
    suspend fun getRedesSociales(token: String): OperationResult<ResponseProfileMark>
    suspend fun logout(token: String, request: RequestLogout): OperationResult<JsonObject>
}