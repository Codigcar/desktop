package pe.com.protectora.feature.detail_policy_vehicle

import android.content.Context
import pe.com.protectora.model.policy_car_detail.*
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.ResponseException
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

class DetailPolicyVehicleRepositoryImp(
    private val restApi: Services,
    private val context: Context
) : DetailPolicyVehicleRepository {

    override suspend fun getResume(token: String, requestResume: RequestPolicyCarDetail)
            : OperationResult<ResponseResume?> {
        return try {
            val responseResume = restApi.getResume(token, requestResume)
            if (responseResume!!.isSuccessful) {
                OperationResult.Success(responseResume.body())
            } else {
                val errorMessage = responseResume.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getVehicles(token: String, requestVehicle: RequestPolicyCarDetail)
            : OperationResult<ResponseVehicle?> {
        return try {
            val responseVehicle = restApi.getVehicles(token, requestVehicle)
            if (responseVehicle!!.isSuccessful) {
                OperationResult.Success(responseVehicle.body())
            } else {
                val errorMessage = responseVehicle.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getPrimas(token: String, requestPrimas: RequestPolicyCarDetail)
            : OperationResult<ResponsePrima?> {
        return try {
            val responsePrima = restApi.getPrimas(token, requestPrimas)
            if (responsePrima!!.isSuccessful) {
                OperationResult.Success(responsePrima.body())
            } else {
                val errorMessage = responsePrima.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getDocument(token: String, requestDocument: RequestPolicyCarDetail)
            : OperationResult<ResponseDocument?> {
        return try {
            val responseDocument = restApi.getDocument(token, requestDocument)
            if (responseDocument!!.isSuccessful) {
                OperationResult.Success(responseDocument.body())
            } else {
                val errorMessage = responseDocument.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getSinister(token: String, requestSinister: RequestPolicyCarDetail)
            : OperationResult<ResponseSiniestro?> {
        return try {
            val responseSinister = restApi.getSinister(token, requestSinister)
            if (responseSinister!!.isSuccessful) {
                OperationResult.Success(responseSinister.body())
            } else {
                val errorMessage = responseSinister.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.message)
        }
    }

    override suspend fun getEndorsements(token: String, requestEndorsements: RequestEndorsements)
            : OperationResult<ResponseEndorsements?> {
        return try {
            val responseEndorsements = restApi.getEndorsements(token, requestEndorsements)
            if (responseEndorsements!!.isSuccessful) {
                OperationResult.Success(responseEndorsements.body())
            } else {
                val errorMessage = responseEndorsements.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getCuponPrima(token: String, requestCuponPrima: RequestCuponPrima)
            : OperationResult<ResponseCuponPrima?> {
        return try {
            val responseCupon = restApi.getCuponera(token, requestCuponPrima)
            if (responseCupon!!.isSuccessful) {
                OperationResult.Success(responseCupon.body())
            } else {
                val errorMessage = responseCupon.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getClients(
        token: String,
        requestClient: RequestPolicyCarDetail
    ): OperationResult<ResponseClient?> {
        return try {
            val responseClient = restApi.getPolizasClient(token, requestClient)
            if (responseClient!!.isSuccessful) {
                OperationResult.Success(responseClient.body())
            } else {
                val errorMessage = responseClient.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }
}