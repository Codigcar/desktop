package pe.com.protectora.feature.auth

import com.google.gson.JsonObject
import pe.com.protectora.model.login.*
import pe.com.protectora.model.sms.RequestVerifyCode
import pe.com.protectora.model.sms.ResponseSms
import pe.com.protectora.network.OperationResult

interface AuthRepository {

    suspend fun login(requestLogin: RequestLogin): OperationResult<ResponseLogin>
    suspend fun register(
        token: String,
        requestRegister: RequestRegister
    ): OperationResult<ResponseRegister>

    suspend fun sendRecoveryPassword(
        token: String,
        requestRecoveryPassword: RequestRecoveryPassword
    ): OperationResult<ResponseRecoveryPassword?>

    suspend fun sendSms(telf: Int): OperationResult<ResponseSms?>
    suspend fun verifySms(
        requestVerifyCode: RequestVerifyCode
    ): OperationResult<JsonObject?>
}