package pe.com.protectora.feature.profile

import android.content.Context
import com.google.gson.JsonObject
import pe.com.protectora.model.login.RequestLogout
import pe.com.protectora.model.profile.ResponseProfileMark
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

/**
 * Created by William Quispe on 31,julio,2020
 * github : https://github.com/William2406
 */

class ProfileRepositoryImp(
    private val context: Context,
    private val services: Services
) : ProfileRepository {

    override suspend fun getRedesSociales(token: String): OperationResult<ResponseProfileMark> {
        return try {
            val response = services.getRedesSociales(token)
            if (response.isSuccessful) {
                OperationResult.Success(response.body()!!)
            } else {
                val errorMessage = response.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun logout(
        token: String,
        request: RequestLogout
    ): OperationResult<JsonObject> {
        return try {
            val response = services.logout(token, request)
            if (response.isSuccessful) {
                OperationResult.Success(response.body()!!)
            } else {
                val errorMessage = response.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }
}