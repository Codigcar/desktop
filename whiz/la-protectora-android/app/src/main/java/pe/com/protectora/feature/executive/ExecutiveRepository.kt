package pe.com.protectora.feature.executive

import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.model.executive.*
import pe.com.protectora.network.OperationResult

interface ExecutiveRepository {

    suspend fun getExecutiveSinister(
        token: String,
        requestExecutive: RequestExecutive
    ): OperationResult<ResponseExecutive?>

    suspend fun getExecuteGroup(
        token: String,
        requestExecutiveGroup: RequestExecutiveGroup
    ): OperationResult<ResponseExecutive?>

    suspend fun getExecuteIcon(
        token: String,
        requestExecutiveIcon: RequestExecutiveIcon
    ): ResponseExecutiveIcon?

    suspend fun getExecutiveGroup(
        token: String,
        requestClient: RequestClient
    ): OperationResult<ResponseExecutiveGroup?>
}