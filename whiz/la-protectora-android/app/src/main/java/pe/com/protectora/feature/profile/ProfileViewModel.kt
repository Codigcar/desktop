package pe.com.protectora.feature.profile

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.R
import pe.com.protectora.model.User
import pe.com.protectora.model.login.RequestLogout
import pe.com.protectora.model.login.UserTemp
import pe.com.protectora.model.profile.Data
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class ProfileViewModel(
    private val sessionRepository: SessionRepository,
    private val profileRepository: ProfileRepository
) : ViewModel() {

    val listTabs = MutableLiveData<MutableList<Profile>>()
    val listRedes = MutableLiveData<MutableList<Data>>()

    val logout = MutableLiveData<Boolean>()

    val showProgress = MutableLiveData<Boolean>()
    val showProgressRequest = MutableLiveData<Boolean>()

    fun getUser(): User = sessionRepository.getUser()

    fun getUserTemp(): UserTemp = sessionRepository.getUserTemp()

    fun getTabs() {
        val list = mutableListOf<Profile>()
        list.add(Profile(R.drawable.ic_person, "Datos Personales"))
        list.add(Profile(R.drawable.ic_ejecutivo, "Ejecutivos"))
        list.add(Profile(R.drawable.ic_cellphone, "Contacto"))
        list.add(Profile(R.drawable.ic_logout, "Cerrar sesión"))
        listTabs.postValue(list)
    }

    fun getRedes() {
        viewModelScope.launch {
            showProgress.postValue(true)
            val response =
                withContext(Dispatchers.IO) { profileRepository.getRedesSociales(sessionRepository.getToken()) }
            when (response) {
                is OperationResult.Success -> {
                    showProgress.postValue(false)
                    val data = response.result.data[0]
                    listRedes.postValue(data)
                }
                is OperationResult.Error -> {
                    showProgress.postValue(false)
                }
            }
        }
    }

    fun logout() {
        CoroutineScope(Dispatchers.IO).launch {
            showProgressRequest.postValue(true)
            var request: RequestLogout? = null
            when (sessionRepository.getType()) {
                0 -> {
                    request =
                        RequestLogout(
                            LOCAL_NRO_DOCUMENTO = sessionRepository.getUserTemp().usu,
                            LOCAL_DEVICE_TOKEN = sessionRepository.getLocalID()
                        )
                }
                1 -> {
                    request =
                        RequestLogout(
                            LOCAL_NRO_DOCUMENTO = sessionRepository.getUser().usu,
                            LOCAL_DEVICE_TOKEN = sessionRepository.getLocalID()
                        )
                }
            }

            val response = profileRepository.logout(sessionRepository.getToken(), request!!)
            when (response) {
                is OperationResult.Success -> {
                    val value = response.result.get("status").asBoolean
                    if (value) {
                        showProgressRequest.postValue(false)
                        sessionRepository.saveLogged(false)
                        logout.postValue(value)
                    }
                }
                is OperationResult.Error -> {
                    showProgressRequest.postValue(false)
                    Log.i("errorLogout", response.exception.toString())
                }
            }
        }
    }

    fun getType(): Int = sessionRepository.getType()
}