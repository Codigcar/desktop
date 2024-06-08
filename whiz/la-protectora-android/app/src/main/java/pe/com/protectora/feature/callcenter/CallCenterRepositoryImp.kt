package pe.com.protectora.feature.callcenter

import android.content.Context
import pe.com.protectora.model.executive.ResponseCallCenter
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

class CallCenterRepositoryImp(private val restApi: Services, private val context: Context) :
    CallCenterRepository {

    override suspend fun getCallCenter(token: String): OperationResult<ResponseCallCenter?> {
        return try {
            val responseCallCenter = restApi.getDataCallCenter(token)
            if (responseCallCenter.isSuccessful) {
                OperationResult.Success(responseCallCenter.body())
            } else {
                val errorMessage = responseCallCenter.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }
}