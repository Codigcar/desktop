package pe.com.protectora.feature.sos_vehicle

import android.content.Context
import pe.com.protectora.model.sos.RequestSosVehicle
import pe.com.protectora.model.sos.ResponseSosVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage

class SosVehicleRepositoryImp(private val restApi:Services,private val context:Context): SosVehicleRepository {
    override suspend fun getSosVehicle(
        token: String,
        requestSosVehicle: RequestSosVehicle
    ): OperationResult<ResponseSosVehicle?> {
        return try {
            val responseSosVehicle = restApi.getSosVehicle(token, requestSosVehicle)
            if (responseSosVehicle!!.isSuccessful) {
                OperationResult.Success(responseSosVehicle.body())
            } else {
                val errorMessage = responseSosVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (ex: Exception) {
            OperationResult.Error(ex.getErrorMessage(context))
        }
    }
}