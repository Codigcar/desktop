package pe.com.protectora.feature.sinister

import android.content.Context
import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResponseSinisterDocument
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.ResponseException
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

class SinisterRepositoryImp(private val restApi: Services, private val context: Context) :
    SinisterRepository {

    override suspend fun getDocumentSinister(token: String, requestSinister: RequestSinister)
            : ResponseSinisterDocument? {
        return try {
            val responseDocument = restApi.getDocumentSinister(token, requestSinister)
            if (responseDocument.isSuccessful) {
                responseDocument.body()
            } else {
                val errorMessage = responseDocument.errorBody().getErrorMessage(context)
                throw ResponseException(errorMessage)
            }
        } catch (e: Exception) {
            null
        }
    }

    override suspend fun getGroups(
        token: String,
        requestClient: RequestClient
    ): OperationResult<ResponseGroup?> {
        return try {
            val responseGroup = restApi.getGroupsSinister(token, requestClient)
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