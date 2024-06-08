package pe.com.protectora.feature.soscall

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.sos.Cellphone
import pe.com.protectora.model.sos.RequestSos
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

/**
 * Created by williamdaniel24 on 22,June,2020
 */

class SosCallViewModel(
    private val sosCallRepository: SosCallRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val sosCallList = MutableLiveData<MutableList<Cellphone>>()

    val loading = MutableLiveData<Boolean>()
    val callCellphone = MutableLiveData<Boolean>()

    fun getSosCall() {
        CoroutineScope(Dispatchers.IO).launch {
            val response = sosCallRepository.getSosCellphone(sessionRepository.getToken())
            when (response) {
                is OperationResult.Success -> {
                    sosCallList.postValue(response.result!!.data[0])
                }
                is OperationResult.Error -> {

                }
            }
        }
    }

    fun registerSosCall(lat: String, lng: String, type: String, plaque: String) {
        loading.postValue(true)
        CoroutineScope(Dispatchers.IO).launch {
            val request = RequestSos(
                sessionRepository.getUser().codigoCliente.toString(),
                lat,
                lng,
                type,
                plaque
            )
            val response = withContext(Dispatchers.IO) {
                sosCallRepository.registerSos(
                    sessionRepository.getToken(),
                    request
                )
            }
            when (response) {
                is OperationResult.Success -> {
                    loading.postValue(false)
                    callCellphone.postValue(true)
                }
                is OperationResult.Error -> {
                    loading.postValue(false)
                    callCellphone.postValue(false)

                }
            }
        }
    }
}