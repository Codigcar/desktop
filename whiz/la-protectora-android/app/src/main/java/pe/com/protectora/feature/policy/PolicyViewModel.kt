package pe.com.protectora.feature.policy

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.R
import pe.com.protectora.model.Group
import pe.com.protectora.model.RequestClient
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class PolicyViewModel(
    private val policyRepository: PolicyRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val listGroups = MutableLiveData<MutableList<Group>>()

    val showLoading = MutableLiveData<Boolean>()
    val showError = MutableLiveData<Any>()
    val showEmpty = MutableLiveData<String>()

    fun setPolicies() {
        try {
            viewModelScope.launch {
                showLoading.postValue(true)
                val requestClient =
                    RequestClient(sessionRepository.getUser().codigoCliente.toString())
                val responseGroup =
                    withContext(Dispatchers.IO) {
                        Log.i("token",sessionRepository.getToken())
                        policyRepository.getGroups(
                            sessionRepository.getToken(),
                            requestClient
                        )
                    }
                when (responseGroup) {
                    is OperationResult.Success -> {
                        showLoading.postValue(false)
                        responseGroup.result?.run {
                            if (this.data[0].size != 0){
                                listGroups.postValue(data[0])
                            }else{
                                showEmpty.postValue("No se encontraron datos")
                            }
                        }
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