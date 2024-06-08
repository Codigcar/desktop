package pe.com.protectora.feature.home

import pe.com.protectora.model.home.ResponseLinkCotizador
import pe.com.protectora.model.login.RequestRefreshToken
import pe.com.protectora.model.login.ResponseRefreshToken
import pe.com.protectora.model.pronostik.EncryptionRequest
import pe.com.protectora.model.pronostik.EncryptionResponse
import pe.com.protectora.model.pronostik.LinkDetail
import pe.com.protectora.network.OperationResult

interface HomeRepository {
    suspend fun getNewCredentials(request: RequestRefreshToken): OperationResult<ResponseRefreshToken>
    suspend fun getLinkCotizador(token: String): OperationResult<ResponseLinkCotizador>
    suspend fun getLinkPronostik(token: String): OperationResult<LinkDetail>
    suspend fun encryptData(
        token: String,
        encryptionRequest: EncryptionRequest
    ): OperationResult<EncryptionResponse>
}