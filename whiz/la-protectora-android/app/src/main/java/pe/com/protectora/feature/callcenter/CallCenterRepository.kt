package pe.com.protectora.feature.callcenter

import okhttp3.Response
import pe.com.protectora.model.executive.ResponseCallCenter
import pe.com.protectora.network.OperationResult

interface CallCenterRepository {
    suspend fun getCallCenter(token: String): OperationResult<ResponseCallCenter?>
}