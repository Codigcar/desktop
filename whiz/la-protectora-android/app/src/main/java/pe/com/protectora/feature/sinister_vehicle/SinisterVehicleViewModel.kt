package pe.com.protectora.feature.sinister_vehicle

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.policy_car.PolicyCar
import pe.com.protectora.model.sinister.RequestSinisterVehicle
import pe.com.protectora.model.sinister.SinisterVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.exception.getErrorMessage
import pe.com.protectora.session.SessionRepository

class SinisterVehicleViewModel(
    private val sinisterVehicleRepository: SinisterVehicleRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val listSinisterVehicle = MutableLiveData<MutableList<SinisterVehicle>>()

    val errorMessage = MutableLiveData<Any>()
    val showProgress = MutableLiveData<Boolean>()
    val showEmpty = MutableLiveData<String>()

    private val emptyMessage = "No existen datos"

    fun getListSinisterVehicle(ID_GRUPO: Int) {
        try {
            viewModelScope.launch {
                showProgress.postValue(true)
                val requestSinisterVehicle = RequestSinisterVehicle(
                    sessionRepository.getUser().codigoCliente.toString(),
                    ID_GRUPO
                )
                val responseSinisterVehicle =
                    withContext(Dispatchers.IO) {
                        sinisterVehicleRepository.getSinisterVehicle(
                            sessionRepository.getToken(),
                            requestSinisterVehicle
                        )
                    }
                when (responseSinisterVehicle) {
                    is OperationResult.Success -> {
                        responseSinisterVehicle.result?.run {
                            if (data.isNotEmpty()) {
                                showProgress.postValue(false)
                                listSinisterVehicle.postValue(data[0])
                            } else {
                                showProgress.postValue(false)
                                showEmpty.postValue(emptyMessage)
                            }
                        }

                    }
                    is OperationResult.Error -> {
                        showProgress.postValue(false)
                        errorMessage.postValue(responseSinisterVehicle.exception)
                    }
                }
            }
        } catch (e: Exception) {
            showProgress.postValue(false)
            errorMessage.postValue(e.message)
        }
    }

}