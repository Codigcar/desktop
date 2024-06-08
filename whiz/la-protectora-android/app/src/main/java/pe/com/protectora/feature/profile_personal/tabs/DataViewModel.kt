package pe.com.protectora.feature.profile_personal.tabs

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.feature.auth.AuthRepository
import pe.com.protectora.model.RequestUser
import pe.com.protectora.model.User
import pe.com.protectora.model.login.RequestLogin
import pe.com.protectora.model.profile_personal.RequestProfileUbigeo
import pe.com.protectora.model.profile_personal.RequestUpdatePass
import pe.com.protectora.model.profile_personal.Ubigeo
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class DataViewModel(
    private val repositoryImp: DataRepository,
    private val sessionRepository: SessionRepository,
    private val authRepository: AuthRepository
) : ViewModel() {

    val showResponse = MutableLiveData<String>()

    val showProgress = MutableLiveData<Boolean>()
    val showDepartment = MutableLiveData<MutableList<Ubigeo>>()
    val showProvince = MutableLiveData<MutableList<Ubigeo>>()
    val showDistrics = MutableLiveData<MutableList<Ubigeo>>()

    fun getUser(): User = sessionRepository.getUser()

    fun sendUpdateUser(
        CELULAR: String,
        DEPARTAMENTO: String,
        DIRECCION: String,
        DISTRITO: String,
        EMAIL: String,
        FECHA_NACIMIENTO: String,
        PROVINCIA: String,
        TELEFONO: String
    ) {
        val requestUser = RequestUser(
            CELULAR,
            sessionRepository.getUser().codigoCliente.toString(),
            DEPARTAMENTO,
            DIRECCION,
            DISTRITO,
            EMAIL,
            FECHA_NACIMIENTO,
            PROVINCIA,
            TELEFONO
        )
        showProgress.postValue(true)
        viewModelScope.launch {
            val responseUser =
                repositoryImp.updatePersonalData(sessionRepository.getToken(), requestUser)
            when (responseUser) {
                is OperationResult.Success -> {
                    val data = responseUser.result!!.data[0][0]
                    showResponse.postValue(data.respuestaMsg)
                    showProgress.postValue(false)
                    //updateUser(sessionRepository.getUser().usu, sessionRepository.getUser().pass)
                    //getUser()
                }
                is OperationResult.Error -> {

                }
            }
        }
    }

    fun getUbigeo(requestProfileUbigeo: RequestProfileUbigeo) {
        showProgress.postValue(true)
        viewModelScope.launch {
            val responseProfileUbigeo =
                repositoryImp.getUbigeo(sessionRepository.getToken(), requestProfileUbigeo)
            when (responseProfileUbigeo) {
                is OperationResult.Success -> {
                    responseProfileUbigeo.run {
                        val data = result!!.data[0]
                        if (requestProfileUbigeo.OPTION == "1") {
                            showProgress.postValue(false)
                            showDepartment.postValue(data)
                        } else if (requestProfileUbigeo.OPTION == "2") {
                            showProvince.postValue(data)
                            showProgress.postValue(false)
                        } else {
                            showDistrics.postValue(data)
                            showProgress.postValue(false)
                        }
                    }
                }
                is OperationResult.Error -> {
                }
            }
        }
    }

    /*fun updateUser(username: String, password: String) {
        try {
            showProgress.postValue(true)
            viewModelScope.launch {
                val requestLogin = RequestLogin(username, password,0)
                val responseLogin =
                    withContext(Dispatchers.IO) {
                        authRepository.login(sessionRepository.getToken(), requestLogin)
                    }
                when (responseLogin) {
                    is OperationResult.Success -> {
                        val user =
                            Gson().fromJson(responseLogin.result.data[0][0], User::class.java)

                        showProgress.postValue(false)
                        if (user.salida == 1) {
                            sessionRepository.saveUser(user)
                            sessionRepository.saveLogged(true)
                        }
                    }
                    is OperationResult.Error -> {
                    }
                }

            }
        } catch (e: Exception) {

        }
    }*/

    fun updatePassword(beforePassword: String, password: String) {
        try {
            showProgress.postValue(true)
            viewModelScope.launch {
                val requestUpdatePass = RequestUpdatePass(
                    beforePassword,
                    sessionRepository.getUser().usu,
                    password
                )
                val responseUpdatePass =
                    withContext(Dispatchers.IO) {
                        repositoryImp.updatePassword(
                            sessionRepository.getToken(),
                            requestUpdatePass
                        )
                    }
                when (responseUpdatePass) {
                    is OperationResult.Success -> {
                        showProgress.postValue(false)
                        showResponse.postValue(responseUpdatePass.result!!.data[0][0].RespuestaMensaje)
                    }

                    is OperationResult.Error -> {
                        showProgress.postValue(false)
                    }
                }
            }
        } catch (e: Exception) {

        }
    }
}