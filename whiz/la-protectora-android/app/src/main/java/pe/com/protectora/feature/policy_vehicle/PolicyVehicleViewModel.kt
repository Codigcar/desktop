package pe.com.protectora.feature.policy_vehicle

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.policy_car.PolicyCar
import pe.com.protectora.model.policy_car.RequestPolicyCar
import pe.com.protectora.session.SessionRepository

class PolicyVehicleViewModel(
    private val repository: PolicyVehicleRepository,
    private val session: SessionRepository
) : ViewModel() {

    val listPoliciesCar = MutableLiveData<MutableList<PolicyCar>>()
    val showProgress = MutableLiveData<Boolean>()
    val errorMessage = MutableLiveData<String>()

    fun getPoliciesCar(LOCAL_ID_GRUPO: String) {
        try {
            viewModelScope.launch {
                showProgress.postValue(true)
                val requestPolicyCar =
                    RequestPolicyCar(session.getUser().codigoCliente.toString(), LOCAL_ID_GRUPO)
                val responsePolicyCar =
                    withContext(Dispatchers.IO) {
                        repository.getPolicies(
                            session.getToken(),
                            requestPolicyCar
                        )
                    }
                responsePolicyCar?.run {
                    showProgress.postValue(false)
                    listPoliciesCar.postValue(data[0])
                }
            }
        } catch (e: Exception) {
            viewModelScope.launch { errorMessage.postValue(e.message) }
        }
    }
}