package pe.com.protectora.feature.soscall

import android.content.Context
import android.util.Log
import com.google.gson.JsonObject
import pe.com.protectora.model.sos.RequestSos
import pe.com.protectora.model.sos.ResponseSosCellphone
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

/**
 * Created by williamdaniel24 on 22,June,2020
 */
class SosCallRepositoryImp(private val restApi: Services, private val context: Context) :
    SosCallRepository {

    override suspend fun getSosCellphone(token: String): OperationResult<ResponseSosCellphone?> {
        return try {
            val responseCellphone = restApi.getCellphoneEmergency(token)
            if (responseCellphone.isSuccessful) {
                OperationResult.Success(responseCellphone.body())
            } else {
                val errorMessage = responseCellphone.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun registerSos(
        token: String,
        requestSos: RequestSos
    ): OperationResult<JsonObject?> {
        return try {
            val responseSos = restApi.registerSos(token, requestSos)
            Log.i("SoscallclASS","X")
            Log.i("Soscall",responseSos.body().toString())
            if (responseSos.isSuccessful) {
                OperationResult.Success(responseSos.body())
            } else {
                val errorMessage = responseSos.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }
}