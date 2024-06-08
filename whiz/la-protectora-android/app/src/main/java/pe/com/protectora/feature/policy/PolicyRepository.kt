package pe.com.protectora.feature.policy

import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.network.OperationResult

interface PolicyRepository {
    suspend fun getGroups(token: String, requestClient: RequestClient): OperationResult<ResponseGroup?>
}