package pe.com.protectora.feature.executive.sinister

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.feature.executive.ExecutiveRepository
import pe.com.protectora.model.executive.Executive
import pe.com.protectora.model.executive.RequestExecutive
import pe.com.protectora.model.executive.ResponseExecutive
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class ExecutiveSinisterViewModel(
    private val repository: ExecutiveRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val showLoading = MutableLiveData<Boolean>()
    val showError = MutableLiveData<Any>()

    val executiveSinisterList = MutableLiveData<MutableList<Executive>>()

    fun getSinister() {
        showLoading.postValue(true)
        viewModelScope.launch {
            val request =
                RequestExecutive(sessionRepository.getUser().codigoCliente.toString(), "2")
            val response = withContext(Dispatchers.IO) {
                repository.getExecutiveSinister(sessionRepository.getToken(), request)
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
}