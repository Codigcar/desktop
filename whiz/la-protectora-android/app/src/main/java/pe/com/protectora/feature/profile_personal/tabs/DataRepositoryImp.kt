package pe.com.protectora.feature.profile_personal.tabs

import android.content.Context
import pe.com.protectora.model.RequestUser
import pe.com.protectora.model.ResponseUser
import pe.com.protectora.model.profile_personal.RequestProfileUbigeo
import pe.com.protectora.model.profile_personal.RequestUpdatePass
import pe.com.protectora.model.profile_personal.ResponseProfileUbigeo
import pe.com.protectora.model.profile_personal.ResponseUpdatePass
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage

class DataRepositoryImp(private val restApi: Services, private val context: Context) :
    DataRepository {

    override suspend fun updatePersonalData(
        token: String,
        requestUser: RequestUser
    ): OperationResult<ResponseUser?> {
        return try {
            val responseUser = restApi.sendUpdateUser(token, requestUser)
            if (responseUser.isSuccessful) {
                OperationResult.Success(responseUser.body())
            } else {
                val errorMessage = responseUser.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getUbigeo(
        token: String,
        requestProfileUbigeo: RequestProfileUbigeo
    ): OperationResult<ResponseProfileUbigeo?> {
        return try {
            val responseUbigeo = restApi.getUbigeo(token, requestProfileUbigeo)
            if (responseUbigeo.isSuccessful) {
                OperationResult.Success(responseUbigeo.body())
            } else {
                val errorMessage = responseUbigeo.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun updatePassword(
        token: String,
        requestUpdatePass: RequestUpdatePass
    ): OperationResult<ResponseUpdatePass?> {
        return try {
            val responseUpdatePass = restApi.updatePassword(token, requestUpdatePass)
            if (responseUpdatePass.isSuccessful) {
                OperationResult.Success(responseUpdatePass.body())
            } else {
                val errorMessage = responseUpdatePass.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }
}