package pe.com.protectora.feature.detail_sinister_vehicle

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.model.sinister.DocumentSinisterVehicle
import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResumeSinisterVehicle
import pe.com.protectora.model.sinister.TracingSinisterVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository
import java.lang.Exception

class DetailSinisterVehicleViewModel(
    private val detailSinisterVehicleRepository: DetailSinisterVehicleRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    private val message = "No existen datos"

    val showResumeSinisterVehicle = MutableLiveData<ResumeSinisterVehicle>()
    val showTracingSinisterVehicle = MutableLiveData<MutableList<TracingSinisterVehicle>>()
    val showDocumentSinisterVehicle = MutableLiveData<MutableList<DocumentSinisterVehicle>>()

    val errorMessage = MutableLiveData<String>()
    val showProgress = MutableLiveData<Boolean>()
    val showEmpty = MutableLiveData<String>()

    fun getResumeSinisterVehicle(requestSinister: RequestSinister) {
        try {
            viewModelScope.launch {
                val resumeSinisterVehicle = withContext(Dispatchers.IO) {
                    detailSinisterVehicleRepository
                        .getResumeDetailSinisterVehicle(
                            sessionRepository.getToken(),
                            requestSinister
                        )
                }
                when (resumeSinisterVehicle) {
                    is OperationResult.Success -> {
                        showResumeSinisterVehicle.postValue(resumeSinisterVehicle.result!!.data[0][0])
                    }
                    is OperationResult.Error -> {
                        errorMessage.postValue(resumeSinisterVehicle.exception)
                    }
                }
            }
        } catch (e: Exception) {
            errorMessage.postValue(e.message)
        }
    }

    fun getTracingSinisterVehicle(requestSinister: RequestSinister) {
        try {
            viewModelScope.launch {
                showProgress.postValue(true)
                val tracingSinisterVehicle = withContext(Dispatchers.IO) {
                    detailSinisterVehicleRepository
                        .getTracingDetailSinisterVehicle(
                            sessionRepository.getToken(),
                            requestSinister
                        )
                }
                when (tracingSinisterVehicle) {
                    is OperationResult.Success -> {
                        val data = tracingSinisterVehicle.result!!.data[0]
                        showTracingSinisterVehicle.postValue(data)
                    }
                    is OperationResult.Error -> {
                        errorMessage.postValue(tracingSinisterVehicle.exception)
                    }
                }
            }
        } catch (e: Exception) {
            errorMessage.postValue(e.message)
        }
    }

    fun getDocumentSinisterVehicle(requestSinister: RequestSinister) {
        try {

            viewModelScope.launch {
                showProgress.postValue(true)
                val documentSinisterVehicle = withContext(Dispatchers.IO) {
                    detailSinisterVehicleRepository
                        .getDocumentDetailSinisterVehicle(
                            sessionRepository.getToken(),
                            requestSinister
                        )
                }
                when (documentSinisterVehicle) {
                    is OperationResult.Success -> {
                        val data = documentSinisterVehicle.result!!.data[0]
                            showDocumentSinisterVehicle.postValue(data)
                        }
                    is OperationResult.Error -> {
                        errorMessage.postValue(documentSinisterVehicle.exception)
                    }
                }
            }
        } catch (e: Exception) {
            errorMessage.postValue(e.message)
        }
    }

}