package pe.com.protectora.feature.executive.risk

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.feature.executive.ExecutiveRepository
import pe.com.protectora.model.Group
import pe.com.protectora.model.RequestClient
import pe.com.protectora.model.User
import pe.com.protectora.model.executive.*
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class RiskViewModel(
    private val repository: ExecutiveRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val showLoading = MutableLiveData<Boolean>()
    val showError = MutableLiveData<Any>()

    val executiveSinisterList = MutableLiveData<MutableList<Executive>>()
    val iconList = MutableLiveData<MutableList<Data>>()

    fun getSinister(groupRisk: String) {

        viewModelScope.launch {
            showLoading.postValue(true)
            val request =
                RequestExecutiveGroup(
                    sessionRepository.getUser().codigoCliente.toString(),
                    groupRisk,
                    sessionRepository.getUser().idUniNegCliente.toString()
                )
            val response = withContext(Dispatchers.IO) {
                repository.getExecuteGroup(sessionRepository.getToken(), request)
            }
            when (response) {
                is OperationResult.Success -> {
                    val data = response.result!!.data[0]
                    executiveSinisterList.postValue(data)
                    showLoading.postValue(false)
                }
                is OperationResult.Error -> {
                    showLoading.postValue(false)
                    showError.postValue(response.exception)
                }
            }
        }
    }

    val listGroups = MutableLiveData<MutableList<ExecutiveGroup>>()

    fun setPolicies() {
        try {

            viewModelScope.launch {
                showLoading.postValue(true)
                val requestClient = RequestClient(sessionRepository.getUser().codigoCliente.toString())
                val responseGroup =
                    withContext(Dispatchers.IO) {
                        repository.getExecutiveGroup(
                            sessionRepository.getToken(),
                            requestClient
                        )
                    }
                when (responseGroup) {
                    is OperationResult.Success -> {
                        showLoading.postValue(false)
                        responseGroup.result?.run { listGroups.postValue(data[0]) }
                    }
                    is OperationResult.Error -> {
                        showLoading.postValue(false)
                        showError.postValue(responseGroup.exception)
                    }
                }
            }
        } catch (e: Exception) {
            showError.postValue(e.message)
        }
    }
}