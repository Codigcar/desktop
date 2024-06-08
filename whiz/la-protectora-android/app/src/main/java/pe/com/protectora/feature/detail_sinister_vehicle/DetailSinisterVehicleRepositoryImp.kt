package pe.com.protectora.feature.detail_sinister_vehicle

import android.content.Context
import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResponseDocumentSinisterVehicle
import pe.com.protectora.model.sinister.ResponseResumeSinisterVehicle
import pe.com.protectora.model.sinister.ResponseTracingSinisterVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage

class DetailSinisterVehicleRepositoryImp(
    private val restApi: Services,
    private val context: Context
) : DetailSinisterVehicleRepository {

    override suspend fun getResumeDetailSinisterVehicle(
        token: String, requestSinister: RequestSinister
    ): OperationResult<ResponseResumeSinisterVehicle?> {
        return try {
            val responseResumeSinisterVehicle =
                restApi.getResumeSinisterVehicle(token, requestSinister)
            if (responseResumeSinisterVehicle!!.isSuccessful) {
                OperationResult.Success(responseResumeSinisterVehicle.body())
            } else {
                val errorMessage =
                    responseResumeSinisterVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getTracingDetailSinisterVehicle(
        token: String,
        requestSinister: RequestSinister
    ): OperationResult<ResponseTracingSinisterVehicle?> {
        return try {
            val responseTracingSinisterVehicle =
                restApi.getTracingSinisterVehicle(token, requestSinister)
            if (responseTracingSinisterVehicle!!.isSuccessful) {
                OperationResult.Success(responseTracingSinisterVehicle.body())
            } else {
                val errorMessage =
                    responseTracingSinisterVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getDocumentDetailSinisterVehicle(
        token: String,
        requestSinister: RequestSinister
    ): OperationResult<ResponseDocumentSinisterVehicle?> {
        return try {
            val responseDocumentSinisterVehicle =
                restApi.getDocumentSinisterVehicle(token, requestSinister)
            if (responseDocumentSinisterVehicle!!.isSuccessful) {
                OperationResult.Success(responseDocumentSinisterVehicle.body())
            } else {
                val errorMessage =
                    responseDocumentSinisterVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }
}