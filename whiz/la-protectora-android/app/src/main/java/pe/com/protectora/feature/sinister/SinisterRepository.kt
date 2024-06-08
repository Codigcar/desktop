package pe.com.protectora.feature.sinister

import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResponseSinisterDocument
import pe.com.protectora.network.OperationResult

interface SinisterRepository{
    suspend fun getDocumentSinister(token:String,requestSinister: RequestSinister):ResponseSinisterDocument?
    suspend fun getGroups(token: String, requestClient: RequestClient): OperationResult<ResponseGroup?>

}