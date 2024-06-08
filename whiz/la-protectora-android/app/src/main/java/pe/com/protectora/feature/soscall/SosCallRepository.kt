package pe.com.protectora.feature.soscall

import com.google.gson.JsonObject
import pe.com.protectora.model.sos.RequestSos
import pe.com.protectora.model.sos.ResponseSosCellphone
import pe.com.protectora.network.OperationResult

/**
 * Created by williamdaniel24 on 22,June,2020
 */
interface SosCallRepository {
    suspend fun getSosCellphone(token: String): OperationResult<ResponseSosCellphone?>
    suspend fun registerSos(token:String,requestSos: RequestSos):OperationResult<JsonObject?>
}