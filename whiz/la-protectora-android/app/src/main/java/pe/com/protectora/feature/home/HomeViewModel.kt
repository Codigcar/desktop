package pe.com.protectora.feature.home

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import pe.com.protectora.model.User
import pe.com.protectora.model.home.Data
import pe.com.protectora.model.login.RequestRefreshToken
import pe.com.protectora.model.login.TokenManager
import pe.com.protectora.model.pronostik.DataLinkDetail
import pe.com.protectora.model.pronostik.EncryptionRequest
import pe.com.protectora.model.pronostik.EncryptionResponse
import pe.com.protectora.model.pronostik.LinkDetail
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class HomeViewModel(
    private val sessionRepository: SessionRepository,
    private val homeRepository: HomeRepository
) : ViewModel() {

    private val _validateNotification = MutableLiveData<Boolean>()
    val validateNotification: LiveData<Boolean> = _validateNotification

    private val _logoutSession = MutableLiveData<Boolean>()
    val logoutSession: LiveData<Boolean> = _logoutSession

    private val _linkCotizador = MutableLiveData<String>()
    val linkCotizador: LiveData<String> = _linkCotizador

    private val _linkDetail = MutableLiveData<DataLinkDetail>()
    val linkDetail: LiveData<DataLinkDetail> = _linkDetail

    private val _linkPronostik = MutableLiveData<String>()
    val linkPronostik: MutableLiveData<String> = _linkPronostik

    init {
        getLinkDetailPronostik()
    }

    fun getName(): String {
        var name: String = " "
        when (getType()) {
            1 -> {
                val nombre = sessionRepository.getUser().nomCliente.get(0)
                val apellido = sessionRepository.getUser().apePatCliente.get(0)
                name = nombre.toString() + apellido.toString()
            }
            0 -> {
                val nombre = sessionRepository.getUserTemp().nombre.get(0)
                val apellido = sessionRepository.getUserTemp().apellidos.get(0)
                name = nombre.toString() + apellido.toString()
            }
        }

        return name
    }

    fun refreshToken() {
        val currentTime = System.currentTimeMillis() / 1000
        if (currentTime.toInt() >= sessionRepository.getTokenManager().expire_time) {
            viewModelScope.launch {
                var request: RequestRefreshToken
                sessionRepository.getTokenManager().let {
                    request = RequestRefreshToken(it.access_token, it.refresh_token)
                }
                val response = homeRepository.getNewCredentials(request)
                when (response) {
                    is OperationResult.Success -> {
                        if (response.result.status) {
                            val token: TokenManager
                            response.result.let {
                                token = TokenManager(
                                    it.access_token,
                                    it.refresh_token,
                                    it.expire_time,
                                    it.expire_time_rt
                                )
                            }
                            sessionRepository.saveTokenManager(token)
                        } else {
                            sessionRepository.saveLogged(false)
                            _logoutSession.postValue(false)
                        }
                    }
                    is OperationResult.Error -> {

                    }
                }
            }
        }
    }

    fun getUser(): User = sessionRepository.getUser()

    fun getType(): Int = sessionRepository.getType()

    fun validationNotification() {
        _validateNotification.postValue(sessionRepository.getBirthdayNotification())
    }

    fun updateValidateNotification(value: Boolean) {
        sessionRepository.setBirthdayNotification(value)
    }

    fun getLinkCotizador() {
        viewModelScope.launch {
            when (val response = homeRepository.getLinkCotizador(sessionRepository.getToken())) {
                is OperationResult.Success -> {
                    val data = response.result.data[0][0].linkCotizador
                    _linkCotizador.postValue(data)
                }
                is OperationResult.Error -> {

                }
            }
        }

    }

    private fun getLinkDetailPronostik() {
        viewModelScope.launch {
            when (val response = homeRepository.getLinkPronostik(sessionRepository.getToken())) {
                is OperationResult.Success -> {
                    val data = response.result.data[0][0]
                    getLinkPronostik(
                        EncryptionRequest(
                            data.CodigoExternoEmpresaExterna,
                            data.IdCanal,
                            "http://dev-pronostik.laprotectora.com.pe:8087/Home/Index",
                            getUser().idTipoDocCliente,
                            getUser().nombreCortoCliente,
                            getUser().nroDocCliente
                        )
                    )
                }
                is OperationResult.Error -> {

                }
            }
        }
    }

    fun getLinkPronostik(encryptionRequest: EncryptionRequest) {
        viewModelScope.launch {
            when (val response =
                homeRepository.encryptData(sessionRepository.getToken(), encryptionRequest)) {
                is OperationResult.Success -> {
                    val data = response.result.data
                    _linkPronostik.postValue(data)

                }
                is OperationResult.Error -> {

                }
            }
        }
    }

}