package pe.com.protectora.feature.auth

import android.app.Application
import android.content.Context
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.gson.Gson
import com.google.gson.JsonObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.User
import pe.com.protectora.model.login.*
import pe.com.protectora.model.sms.RequestVerifyCode
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.exception.getErrorMessage
import pe.com.protectora.session.SessionRepository

class AuthViewModel(
    private val repositoryImp: AuthRepository,
    private val sessionRepository: SessionRepository,
    private val context: Context
) : ViewModel() {

    val loginSuccessful = MutableLiveData<Boolean>()
    val showDialog = MutableLiveData<Boolean>()
    val loginError = MutableLiveData<String>()
    val showViewSmsCode = MutableLiveData<Boolean>()

    val recoveryMessage = MutableLiveData<String>()
    val errorMessage = MutableLiveData<String>()
    val register = MutableLiveData<Boolean>()

    val registeredSuccessful = MutableLiveData<String>()

    fun saveLocalId(identifier: String) {
        return sessionRepository.saveLocalID(identifier)
    }

    fun login(username: String, password: String) {
        try {
            showDialog.postValue(true)
            viewModelScope.launch {
                val requestLogin =
                    RequestLogin(
                        "laprotectora",
                        "wspr0t3ct0ra",
                        username,
                        password,
                        sessionRepository.getLocalID()
                    )
                val responseLogin =
                    withContext(Dispatchers.IO) {
                        repositoryImp.login(requestLogin)
                    }
                when (responseLogin) {
                    is OperationResult.Success -> {
                        showDialog.postValue(false)

                        val userJson = responseLogin.result.data[0][0]
                        val user: User = Gson().fromJson(userJson, User::class.java)

                        if (user.CodigoMensaje == 1) {
                            var tokenManager: TokenManager
                            responseLogin.result.let {
                                tokenManager = TokenManager(
                                    it.access_token,
                                    it.refresh_token,
                                    it.expire_time,
                                    it.expire_time_rt
                                )
                            }
                            sessionRepository.saveTokenManager(tokenManager)

                            when (user.RespuestaMensaje) {
                                "LOGUEO EXITOSO, ES CLIENTE." -> {
                                    sessionRepository.saveUser(user)
                                    sessionRepository.setBirthdayNotification(true)
                                    sessionRepository.setType(1)
                                    sessionRepository.saveLogged(true)
                                    loginSuccessful.postValue(true)
                                }
                                "LOGUEO EXITOSO, NO ES CLIENTE." -> {
                                    sessionRepository.saveLogged(true)
                                    loginSuccessful.postValue(true)
                                    val userTemp: UserTemp =
                                        Gson().fromJson(userJson, UserTemp::class.java)
                                    sessionRepository.setUserTemp(userTemp)
                                    sessionRepository.setType(0)
                                }
                            }
                        } else {
                            showDialog.postValue(false)
                            loginError.postValue(user.RespuestaMensaje)
                        }
                    }
                    is OperationResult.Error -> {
                        showDialog.postValue(false)
                        loginError.postValue(responseLogin.exception)
                    }
                }
            }
        } catch (e: Exception) {
            viewModelScope.launch {
                showDialog.postValue(false)
                loginError.postValue(e.getErrorMessage(context))
            }
        }
    }

    fun register(requestRegister: RequestRegister) {
        try {
            showDialog.postValue(true)
            CoroutineScope(Dispatchers.IO).launch {
                val responseRegister =
                    repositoryImp.register(sessionRepository.getToken(), requestRegister)
                when (responseRegister) {
                    is OperationResult.Success -> {
                        val data = responseRegister.result.data[0][0]
                        if (data.codigo == 0) {
                            loginError.postValue(data.respuestaMsg)
                        } else {
                            registeredSuccessful.postValue(data.respuestaMsg)
                        }
                    }
                    is OperationResult.Error -> {
                        showDialog.postValue(false)
                        loginError.postValue(responseRegister.exception)
                    }
                }
            }
        } catch (e: Exception) {
            viewModelScope.launch {
                showDialog.postValue(false)
                loginError.postValue(e.getErrorMessage(context))
            }
        }
    }

    fun recoveryPassword(email: String) {
        showDialog.postValue(true)
        val requestRecoveryPassword = RequestRecoveryPassword(email)
        viewModelScope.launch {
            val responseRecoveryPassword =
                repositoryImp.sendRecoveryPassword(
                    sessionRepository.getToken(),
                    requestRecoveryPassword
                )
            when (responseRecoveryPassword) {
                is OperationResult.Success -> {
                    showDialog.postValue(false)
                    val data = responseRecoveryPassword.result!!.data.be_user_login
                    if (data?.transaction_code == 0 || data == null) {
                        recoveryMessage.postValue("El e-mail ingresado no coincide con ningún usuario")
                    } else {
                        recoveryMessage.postValue("Contraseña cambiada exitosamente. \nPor favor, revise el email ingresado")
                    }

                }
                is OperationResult.Error -> {
                    showDialog.postValue(false)
                    errorMessage.postValue(responseRecoveryPassword.exception)
                }
            }
        }
    }

    fun sendSms(telf: Int) {
        showDialog.postValue(true)
        viewModelScope.launch {
            val responseSms = repositoryImp.sendSms(telf)
            when (responseSms) {
                is OperationResult.Success -> {
                    showDialog.postValue(false)
                    showViewSmsCode.postValue(true)
                }
                is OperationResult.Error -> {
                    showDialog.postValue(false)
                    showViewSmsCode.postValue(false)
                    errorMessage.postValue(responseSms.exception)
                }
            }
        }
    }

    fun verifySms(requestVerifyCode: RequestVerifyCode) {
        showDialog.postValue(true)
        viewModelScope.launch {
            val responseSms =
                repositoryImp.verifySms(requestVerifyCode)
            when (responseSms) {
                is OperationResult.Success -> {
                    val response = responseSms.result!!
                    showDialog.postValue(false)
                    if (response.get("status").asBoolean) {
                        register.postValue(true)
                    } else {
                        register.postValue(false)
                        errorMessage.postValue("Verifique su codigo")
                    }
                }
                is OperationResult.Error -> {
                    showDialog.postValue(false)
                    errorMessage.postValue(responseSms.exception)
                }
            }
        }
    }
}