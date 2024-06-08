package pe.com.protectora.feature.sinister_vehicle

import android.content.Context
import pe.com.protectora.model.sinister.RequestSinisterVehicle
import pe.com.protectora.model.sinister.ResponseSinisterVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage


class SinisterVehicleRepositoryImp(private val restApi: Services, private val context: Context) :
    SinisterVehicleRepository {

    override suspend fun getSinisterVehicle(
        token: String,
        requestSinisterVehicle: RequestSinisterVehicle
    ): OperationResult<ResponseSinisterVehicle?> {
        return try {
            val responseSinisterVehicle = restApi.getSinisterVehicle(token, requestSinisterVehicle)
            if (responseSinisterVehicle!!.isSuccessful) {
                OperationResult.Success(responseSinisterVehicle.body())
            } else {
                val errorMessage = responseSinisterVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (ex: Exception) {
            OperationResult.Error(ex.getErrorMessage(context))
        }
    }
}