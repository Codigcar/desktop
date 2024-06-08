package pe.com.protectora.feature.callcenter

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import pe.com.protectora.model.executive.Callcenter
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class CallCenterViewModel(
    private val repository: CallCenterRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val callCenter = MutableLiveData<Callcenter>()

    fun getCallCenter() {
        viewModelScope.launch {
            val responseCallCenter = repository.getCallCenter(sessionRepository.getToken())
            when (responseCallCenter) {
                is OperationResult.Success -> {
                    val data = responseCallCenter.result?.data?.get(0)?.get(0)
                    callCenter.postValue(data)
                }
                is OperationResult.Error -> {

                }
            }
        }
    }
}