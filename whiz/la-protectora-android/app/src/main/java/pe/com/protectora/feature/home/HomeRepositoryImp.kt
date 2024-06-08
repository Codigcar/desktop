package pe.com.protectora.feature.home

import android.util.Log
import pe.com.protectora.model.home.ResponseLinkCotizador
import pe.com.protectora.model.login.RequestRefreshToken
import pe.com.protectora.model.login.ResponseRefreshToken
import pe.com.protectora.model.pronostik.EncryptionRequest
import pe.com.protectora.model.pronostik.EncryptionResponse
import pe.com.protectora.model.pronostik.LinkDetail
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services


class HomeRepositoryImp(private val apiService: Services) : HomeRepository {

    override suspend fun getNewCredentials(request: RequestRefreshToken): OperationResult<ResponseRefreshToken> {
        return try {
            val response = apiService.getNewCredentials(request)
            if (response.isSuccessful) {
                val data = response.body()
                OperationResult.Success(data!!)
            } else {
                val error = response.errorBody().toString()
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.localizedMessage)
        }
    }

    override suspend fun getLinkCotizador(token: String): OperationResult<ResponseLinkCotizador> {
        return try {
            val response = apiService.getLinkCotizador(token)
            if (response.isSuccessful) {
                OperationResult.Success(response.body()!!)
            } else {
                val error = response.errorBody().toString()
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.localizedMessage)
        }
    }

    override suspend fun getLinkPronostik(token: String): OperationResult<LinkDetail> {
        return try {
            val response = apiService.getLinkPronostik(token)
            when {
                response.isSuccessful -> {
                    val data = response.body()
                    OperationResult.Success(data!!)
                }
                else -> {
                    val error = response.raw().toString()
                    OperationResult.Error(error)
                }
            }
        } catch (e: Exception) {
            OperationResult.Error(e.localizedMessage)
        }
    }

    override suspend fun encryptData(
        token: String,
        encryptionRequest: EncryptionRequest
    ): OperationResult<EncryptionResponse> {
        return try {
            val response = apiService.encryptData(token, encryptionRequest)
            when {
                response.isSuccessful -> {
                    val data = response.body()
                    OperationResult.Success(data!!)
                }
                else -> {
                    val error = response.errorBody().toString()
                    Log.d("[ERROR-PRONOSTIKA]", response.raw().toString())
                    OperationResult.Error(error)
                }
            }
        } catch (e: java.lang.Exception) {
            OperationResult.Error(e.localizedMessage)
        }
    }
}