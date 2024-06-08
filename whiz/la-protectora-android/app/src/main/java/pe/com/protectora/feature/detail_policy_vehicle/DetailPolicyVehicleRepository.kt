package pe.com.protectora.feature.detail_policy_vehicle

import pe.com.protectora.model.policy_car_detail.*
import pe.com.protectora.network.OperationResult

interface DetailPolicyVehicleRepository {
    suspend fun getResume(token: String, requestResume: RequestPolicyCarDetail): OperationResult<ResponseResume?>
    suspend fun getVehicles(token: String, requestVehicle: RequestPolicyCarDetail): OperationResult<ResponseVehicle?>
    suspend fun getPrimas(token: String, requestPrimas: RequestPolicyCarDetail): OperationResult<ResponsePrima?>
    suspend fun getDocument(token: String, requestDocument: RequestPolicyCarDetail): OperationResult<ResponseDocument?>
    suspend fun getSinister(token: String, requestSinister: RequestPolicyCarDetail): OperationResult<ResponseSiniestro?>
    suspend fun getEndorsements(token:String,requestEndorsements: RequestEndorsements):OperationResult<ResponseEndorsements?>
    suspend fun getCuponPrima(token:String,requestCuponPrima: RequestCuponPrima):OperationResult<ResponseCuponPrima?>
    suspend fun getClients(token: String,requestClient:RequestPolicyCarDetail):OperationResult<ResponseClient?>
}