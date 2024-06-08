package pe.com.protectora.feature.auth

import android.content.Context
import com.google.gson.JsonObject
import pe.com.protectora.model.login.*
import pe.com.protectora.model.sms.RequestVerifyCode
import pe.com.protectora.model.sms.ResponseSms
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.Services
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.RuntimeException
import kotlin.Exception

class AuthRepositoryImp(
    private val restApi: Services,
    private val context: Context
) : AuthRepository {

    override suspend fun login(
        requestLogin: RequestLogin
    ): OperationResult<ResponseLogin> {
        return try {
            val responseLogin = restApi.login( requestLogin)
            if (responseLogin!!.isSuccessful) {
                OperationResult.Success(responseLogin.body()!!)
            } else {
                OperationResult.Error("El usuario o la contraseña son incorrectos.")
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun register(token: String, requestRegister: RequestRegister)
            : OperationResult<ResponseRegister> {
        return try {
            val responseRegister = restApi.register(token, requestRegister)
            if (responseRegister!!.isSuccessful) {
                OperationResult.Success(responseRegister.body()!!)
            } else {
                OperationResult.Error("Datos Incorrectos")
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun sendRecoveryPassword(
        token: String,
        requestRecoveryPassword: RequestRecoveryPassword
    ): OperationResult<ResponseRecoveryPassword?> {
        return try {
            val responseRecovery = restApi.sendRecoveryPassword(token, requestRecoveryPassword)
            if (responseRecovery.isSuccessful) {
                OperationResult.Success(responseRecovery.body())
            } else {
                val errorMessage = responseRecovery.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun sendSms(telf: Int): OperationResult<ResponseSms?> {
        return try {
            val responseRecovery = restApi.getCodeSms(telf)
            if (responseRecovery.isSuccessful) {
                OperationResult.Success(responseRecovery.body())
            } else {
                val errorMessage = responseRecovery.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun verifySms(
        requestVerifyCode: RequestVerifyCode
    ): OperationResult<JsonObject?> {
        return try {
            val responseRecovery = restApi.verifyCodeSms(requestVerifyCode)
            if (responseRecovery.isSuccessful) {
                OperationResult.Success(responseRecovery.body())
            } else {
                val errorMessage = responseRecovery.errorBody().getErrorMessage(context)
                OperationResult.Error(errorMessage)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }
}