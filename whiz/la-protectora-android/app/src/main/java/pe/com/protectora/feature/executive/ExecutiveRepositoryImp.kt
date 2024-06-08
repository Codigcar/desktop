package pe.com.protectora.feature.executive

import android.content.Context
import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.executive.*
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage

class ExecutiveRepositoryImp(private val restApi: Services, private val context: Context) :
    ExecutiveRepository {

    override suspend fun getExecutiveSinister(
        token: String,
        requestExecutive: RequestExecutive
    ): OperationResult<ResponseExecutive?> {
        return try {
            val responseExecutiveSinister = restApi.getExecutiveSinister(token, requestExecutive)
            if (responseExecutiveSinister.isSuccessful) {
                OperationResult.Success(responseExecutiveSinister.body())
            } else {
                val errorMessage = responseExecutiveSinister.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getExecuteGroup(
        token: String,
        requestExecutiveGroup: RequestExecutiveGroup
    ): OperationResult<ResponseExecutive?> {
        return try {
            val responseExecutiveGroup = restApi.getExecutiveGroup(token, requestExecutiveGroup)
            if (responseExecutiveGroup.isSuccessful) {
                OperationResult.Success(responseExecutiveGroup.body())
            } else {
                val errorMessage = responseExecutiveGroup.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getExecuteIcon(
        token: String,
        requestExecutiveIcon: RequestExecutiveIcon
    ): ResponseExecutiveIcon? {
        return restApi.getExecutiveIcon(token,requestExecutiveIcon).body()
    }

    override suspend fun getExecutiveGroup(
        token: String,
        requestClient: RequestClient
    ): OperationResult<ResponseExecutiveGroup?> {
        return try {
            val responseGroup = restApi.getGroupsExecutives(token, requestClient)
            if (responseGroup!!.isSuccessful) {
                OperationResult.Success(responseGroup.body())
            } else {
                val errorMessage = responseGroup.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: java.lang.Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }
}