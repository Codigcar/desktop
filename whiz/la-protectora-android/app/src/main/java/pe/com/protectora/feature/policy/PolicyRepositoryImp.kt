package pe.com.protectora.feature.policy

import android.content.Context
import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage

class PolicyRepositoryImp(private val restApi: Services, private val context: Context) :
    PolicyRepository {

    override suspend fun getGroups(
        token: String, requestClient: RequestClient
    ): OperationResult<ResponseGroup?> {
        return try {
            val responseGroup = restApi.getGroups(token, requestClient)
            if (responseGroup!!.isSuccessful) {
                OperationResult.Success(responseGroup.body())
            } else {
                val errorMessage = responseGroup.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }
}