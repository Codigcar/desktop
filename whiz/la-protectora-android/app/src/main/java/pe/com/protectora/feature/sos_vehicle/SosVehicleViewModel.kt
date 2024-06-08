package pe.com.protectora.feature.sos_vehicle

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.sos.RequestSosVehicle
import pe.com.protectora.model.sos.SosVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class SosVehicleViewModel(
    private val repository: SosVehicleRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val listSosVehicle = MutableLiveData<MutableList<SosVehicle>>()

    val showProgress = MutableLiveData<Boolean>()
    val showEmpty = MutableLiveData<String>()

    fun getSosVehicle() {
        showProgress.postValue(true)
        val requestSosVehicle =
            RequestSosVehicle(sessionRepository.getUser().codigoCliente.toString())
        CoroutineScope(Dispatchers.IO).launch {
            val responseSosVehicle =
                withContext(Dispatchers.IO) {
                    repository.getSosVehicle(
                        sessionRepository.getToken(),
                        requestSosVehicle
                    )
                }
            when (responseSosVehicle) {
                is OperationResult.Success -> {
                    val data = responseSosVehicle.result!!.data[0]
                    if(data.isNotEmpty()){
                        showProgress.postValue(false)
                        listSosVehicle.postValue(data)
                    }else {
                        showProgress.postValue(false)
                        showEmpty.postValue("No existen datos")
                    }

                }
                is OperationResult.Error -> {

                }
            }
        }
    }
}