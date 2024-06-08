package pe.com.protectora.feature.profile_personal.tabs

import pe.com.protectora.model.RequestUser
import pe.com.protectora.model.ResponseUser
import pe.com.protectora.model.profile_personal.RequestProfileUbigeo
import pe.com.protectora.model.profile_personal.RequestUpdatePass
import pe.com.protectora.model.profile_personal.ResponseProfileUbigeo
import pe.com.protectora.model.profile_personal.ResponseUpdatePass
import pe.com.protectora.network.OperationResult

interface DataRepository {
    suspend fun updatePersonalData(token: String, requestUser: RequestUser):OperationResult<ResponseUser?>
    suspend fun getUbigeo(token:String,requestProfileUbigeo: RequestProfileUbigeo):OperationResult<ResponseProfileUbigeo?>
    suspend fun updatePassword(token:String,requestUpdatePass: RequestUpdatePass):OperationResult<ResponseUpdatePass?>
}