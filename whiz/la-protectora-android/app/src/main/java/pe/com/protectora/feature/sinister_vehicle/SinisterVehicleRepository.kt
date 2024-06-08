package pe.com.protectora.feature.sinister_vehicle

import pe.com.protectora.model.sinister.RequestSinisterVehicle
import pe.com.protectora.model.sinister.ResponseSinisterVehicle
import pe.com.protectora.network.OperationResult

interface SinisterVehicleRepository {
    suspend fun getSinisterVehicle(token:String,requestSinisterVehicle: RequestSinisterVehicle): OperationResult<ResponseSinisterVehicle?>
}