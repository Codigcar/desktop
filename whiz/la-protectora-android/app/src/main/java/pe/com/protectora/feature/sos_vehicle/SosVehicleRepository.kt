package pe.com.protectora.feature.sos_vehicle

import pe.com.protectora.model.sos.RequestSosVehicle
import pe.com.protectora.model.sos.ResponseSosVehicle
import pe.com.protectora.network.OperationResult

interface SosVehicleRepository {
    suspend fun getSosVehicle(
        token: String,
        requestSosVehicle: RequestSosVehicle
    ): OperationResult<ResponseSosVehicle?>
}