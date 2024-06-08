package pe.com.protectora.network

import com.google.gson.JsonObject
import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.RequestUser
import pe.com.protectora.model.ResponseGroup
import pe.com.protectora.model.ResponseUser
import pe.com.protectora.model.executive.*
import pe.com.protectora.model.home.ResponseLinkCotizador
import pe.com.protectora.model.pronostik.LinkDetail
import pe.com.protectora.model.login.*
import pe.com.protectora.model.login.Data
import pe.com.protectora.model.policy_car.RequestPolicyCar
import pe.com.protectora.model.policy_car.ResponsePolicyCar
import pe.com.protectora.model.policy_car_detail.*
import pe.com.protectora.model.profile.ResponseProfileMark
import pe.com.protectora.model.profile_personal.RequestProfileUbigeo
import pe.com.protectora.model.profile_personal.RequestUpdatePass
import pe.com.protectora.model.profile_personal.ResponseProfileUbigeo
import pe.com.protectora.model.profile_personal.ResponseUpdatePass
import pe.com.protectora.model.pronostik.EncryptionRequest
import pe.com.protectora.model.pronostik.EncryptionResponse
import pe.com.protectora.model.sinister.*
import pe.com.protectora.model.sms.RequestVerifyCode
import pe.com.protectora.model.sms.ResponseSms
import pe.com.protectora.model.sos.RequestSos
import pe.com.protectora.model.sos.RequestSosVehicle
import pe.com.protectora.model.sos.ResponseSosCellphone
import pe.com.protectora.model.sos.ResponseSosVehicle
import retrofit2.Response
import retrofit2.http.*

interface Services {

    @POST("mobile/login/dni/pass")
    suspend fun login(
        @Body requestLogin: RequestLogin?
    ): Response<ResponseLogin?>?

    @POST("mobile/polizas/id/grupo/riesgo")
    suspend fun getPolicies(
        @Header("Authorization") token: String,
        @Body requestPolicyCar: RequestPolicyCar
    ): Response<ResponsePolicyCar?>?

    @POST("mobile/menu/polizas")
    suspend fun getGroups(
        @Header("Authorization") token: String,
        @Body requestClient: RequestClient
    ): Response<ResponseGroup?>?

    @POST("mobile/menu/siniestros")
    suspend fun getGroupsSinister(
        @Header("Authorization") token: String,
        @Body requestClient: RequestClient
    ): Response<ResponseGroup?>?

    @POST("mobile/menu/ejecutivos")
    suspend fun getGroupsExecutives(
        @Header("Authorization") token: String,
        @Body requestClient: RequestClient
    ): Response<ResponseExecutiveGroup?>?

    @POST("mobile/poliza/resumen")
    suspend fun getResume(
        @Header("Authorization") token: String,
        @Body requestResume: RequestPolicyCarDetail
    ): Response<ResponseResume?>?

    @POST("mobile/polizas/vehi/aseg/1")
    suspend fun getVehicles(
        @Header("Authorization") token: String,
        @Body requestVehicle: RequestPolicyCarDetail
    ): Response<ResponseVehicle?>?

    @POST("mobile/polizas/primas")
    suspend fun getPrimas(
        @Header("Authorization") token: String,
        @Body requestPrima: RequestPolicyCarDetail
    ): Response<ResponsePrima?>?

    @POST("mobile/polizas/documentos")
    suspend fun getDocument(
        @Header("Authorization") token: String,
        @Body requestDocument: RequestPolicyCarDetail
    ): Response<ResponseDocument?>?

    @POST("mobile/siniestros/polizas")
    suspend fun getSinister(
        @Header("Authorization") token: String,
        @Body requestDocument: RequestPolicyCarDetail
    ): Response<ResponseSiniestro?>?

    @POST("mobile/grupo/riesgo/siniestros")
    suspend fun getGroupSinister(
        @Header("Authorization") token: String,
        @Body requestClient: RequestClient
    ): Response<ResponseSinister>

    @POST("mobile/polizas/endosos")
    suspend fun getEndorsements(
        @Header("Authorization") token: String,
        @Body requestEndorsements: RequestEndorsements
    ): Response<ResponseEndorsements?>?

    @POST("mobile/documentos/siniestro")
    suspend fun getDocumentSinister(
        @Header("Authorization") token: String,
        @Body requestSinister: RequestSinister
    ): Response<ResponseSinisterDocument>

    @POST("mobile/cuponera/idfinanciamiento")
    suspend fun getCuponera(
        @Header("Authorization") token: String,
        @Body requestCuponPrima: RequestCuponPrima
    ): Response<ResponseCuponPrima?>?

    @POST("mobile/registro")
    suspend fun register(
        @Header("Authorization") token: String,
        @Body requestRegister: RequestRegister
    ): Response<ResponseRegister?>?

    @POST("mobile/siniestro/gruporiesgo")
    suspend fun getSinisterVehicle(
        @Header("Authorization") token: String,
        @Body requestSinisterVehicle: RequestSinisterVehicle
    ): Response<ResponseSinisterVehicle?>?

    @POST("mobile/resumen/siniestros")
    suspend fun getResumeSinisterVehicle(
        @Header("Authorization") token: String,
        @Body requestSinister: RequestSinister
    ): Response<ResponseResumeSinisterVehicle?>?

    @POST("mobile/seguimiento/siniestro")
    suspend fun getTracingSinisterVehicle(
        @Header("Authorization") token: String,
        @Body requestSinister: RequestSinister
    ): Response<ResponseTracingSinisterVehicle?>?

    @POST("mobile/documentos/siniestro")
    suspend fun getDocumentSinisterVehicle(
        @Header("Authorization") token: String,
        @Body requestSinister: RequestSinister
    ): Response<ResponseDocumentSinisterVehicle?>?

    @POST("mobile/polizas/vehiculo")
    suspend fun getSosVehicle(
        @Header("Authorization") token: String,
        @Body requestSosVehicle: RequestSosVehicle
    ): Response<ResponseSosVehicle?>?

    @POST("mobile/polizas/vehi/aseg/2")
    suspend fun getPolizasClient(
        @Header("Authorization") token: String,
        @Body requestDocument: RequestPolicyCarDetail
    ): Response<ResponseClient?>?

    @POST("mobile/actualiza/datos/id_cliente")
    suspend fun sendUpdateUser(
        @Header("Authorization") token: String,
        @Body requestUser: RequestUser
    ): Response<ResponseUser>

    @POST("mobile/filtros/ubigeo/ubigeo")
    suspend fun getUbigeo(
        @Header("Authorization") token: String,
        @Body requestProfileUbigeo: RequestProfileUbigeo
    ): Response<ResponseProfileUbigeo>

    @POST("iosandroid/recover_password")
    suspend fun sendRecoveryPassword(
        @Header("Authorization") token: String,
        @Body requestRecoveryPassword: RequestRecoveryPassword
    ): Response<ResponseRecoveryPassword>

    @POST("mobile/actualiza/pass")
    suspend fun updatePassword(
        @Header("Authorization") token: String,
        @Body requestUpdatePass: RequestUpdatePass
    ): Response<ResponseUpdatePass>

    @GET("phone/verify?")
    suspend fun getCodeSms(
        @Query("phone") number: Int
    ): Response<ResponseSms>

    @POST("phone/code")
    suspend fun verifyCodeSms(
        @Body requestVerifyCode: RequestVerifyCode
    ): Response<JsonObject>

    @POST("mobile/ejecutivos/siniestros/cliente")
    suspend fun getExecutiveSinister(
        @Header("Authorization") token: String,
        @Body requestExecutive: RequestExecutive
    ): Response<ResponseExecutive>

    @POST("mobile/ejecutivos/grupo/riesgo")
    suspend fun getExecutiveGroup(
        @Header("Authorization") token: String,
        @Body requestExecutiveGroup: RequestExecutiveGroup
    ): Response<ResponseExecutive>

    @POST("mobile/riesgos/ejecutivos")
    suspend fun getExecutiveIcon(
        @Header("Authorization") token: String,
        @Body requestExecutiveIcon: RequestExecutiveIcon
    ): Response<ResponseExecutiveIcon>

    @POST("mobile/contactanos/call_center")
    suspend fun getDataCallCenter(
        @Header("Authorization") token: String
    ): Response<ResponseCallCenter>

    @POST("mobile/tipo/siniestros")
    suspend fun getCellphoneEmergency(
        @Header("Authorization") token: String
    ): Response<ResponseSosCellphone>

    @POST("evopremium/sos/registry")
    suspend fun registerSos(
        @Header("Authorization") token: String,
        @Body requestSos: RequestSos
    ): Response<JsonObject>

    @POST("mobile/redes_sociales")
    suspend fun getRedesSociales(
        @Header("Authorization") token: String
    ): Response<ResponseProfileMark>

    @POST("/api/oauth/refresh")
    suspend fun getNewCredentials(
        @Body requestRefreshToken: RequestRefreshToken
    ): Response<ResponseRefreshToken>

    @POST("oauth/logout")
    suspend fun logout(
        @Header("Authorization") token: String,
        @Body request: RequestLogout
    ): Response<JsonObject>

    @GET("mobile/link/cotizador")
    suspend fun getLinkCotizador(
        @Header("Authorization") token: String
    ): Response<ResponseLinkCotizador>

    @GET("mobile/link/pronostik")
    suspend fun getLinkPronostik(
        @Header("Authorization") token: String
    ): Response<LinkDetail>

    @POST("mobile/encriptar/parametros/pronostik")
    suspend fun encryptData(@Header("Authorization") token: String, @Body encryptionRequest: EncryptionRequest): Response<EncryptionResponse>


}