package pe.com.protectora.feature.policy_vehicle

import android.content.Context
import pe.com.protectora.model.policy_car.RequestPolicyCar
import pe.com.protectora.model.policy_car.ResponsePolicyCar
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.ResponseException
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

class PolicyVehicleRepositoryImp(
    private val restApi: Services,
    private val context: Context
) : PolicyVehicleRepository {

    override suspend fun getPolicies(token: String, requestPolicyCar: RequestPolicyCar)
            : ResponsePolicyCar? {
        return try {
            val responsePolicyCar = restApi.getPolicies(token, requestPolicyCar)
            if (responsePolicyCar!!.isSuccessful) {
                responsePolicyCar.body()
            } else {
                val errorMessage = responsePolicyCar.errorBody().getErrorMessage(context)
                throw ResponseException(errorMessage)
            }
        } catch (e: Exception) {
            null
        }
    }
}