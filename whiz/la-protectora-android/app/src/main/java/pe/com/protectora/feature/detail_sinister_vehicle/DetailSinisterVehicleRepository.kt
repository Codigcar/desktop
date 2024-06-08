package pe.com.protectora.feature.detail_sinister_vehicle

import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResponseDocumentSinisterVehicle
import pe.com.protectora.model.sinister.ResponseResumeSinisterVehicle
import pe.com.protectora.model.sinister.ResponseTracingSinisterVehicle
import pe.com.protectora.network.OperationResult

interface DetailSinisterVehicleRepository {
    suspend fun getResumeDetailSinisterVehicle(token:String,requestSinister: RequestSinister):OperationResult<ResponseResumeSinisterVehicle?>
    suspend fun getTracingDetailSinisterVehicle(token: String,requestSinister: RequestSinister):OperationResult<ResponseTracingSinisterVehicle?>
    suspend fun getDocumentDetailSinisterVehicle(token: String,requestSinister: RequestSinister):OperationResult<ResponseDocumentSinisterVehicle?>
}