package pe.com.protectora.feature.detail_policy_vehicle

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import pe.com.protectora.R
import pe.com.protectora.feature.sinister.SinisterRepository
import pe.com.protectora.model.policy_car_detail.*
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository
import pe.com.protectora.model.sinister.Document as DocSinister

class DetailPolicyVehicleViewModel(
    private val repository: DetailPolicyVehicleRepository,
    private val session: SessionRepository
) : ViewModel() {

    val listCategories = MutableLiveData<MutableList<Type>>()

    private val _showResume = MutableLiveData<Resume>()
    val showResume: LiveData<Resume> = _showResume

    private val _showVehicle = MutableLiveData<MutableList<Vehicle>>()
    val showVehicle: LiveData<MutableList<Vehicle>> = _showVehicle

    private val _showPrima = MutableLiveData<MutableList<Prima>>()
    val showPrima: LiveData<MutableList<Prima>> = _showPrima

    private val _showDocument = MutableLiveData<MutableList<Document>>()
    val showDocument: LiveData<MutableList<Document>> = _showDocument

    private val _showSinister = MutableLiveData<MutableList<Sinister>>()
    val showSinister: LiveData<MutableList<Sinister>> = _showSinister

    private val _showEndorsements = MutableLiveData<MutableList<Endorsements>>()
    val showEndorsements: LiveData<MutableList<Endorsements>> = _showEndorsements

    private val _showCupon = MutableLiveData<MutableList<Cupon>>()
    val showCupon: LiveData<MutableList<Cupon>> = _showCupon

    private val _showClient = MutableLiveData<MutableList<Client>>()
    val showClient: LiveData<MutableList<Client>> = _showClient

    val showEmpty = MutableLiveData<String>()
    val showDialogError = MutableLiveData<String>()

    private val emptyMessage = "No existen datos"

    fun getData(ID_GROUP: String, request: RequestPolicyCarDetail) {
        val list = mutableListOf<Type>()
        list.add(Type(R.drawable.ic_doc, "Detalle"))
        getResume(request)
        list.add(Type(R.drawable.ic_doc_2, "Endosos"))
        getEndorsements(request)
        if (ID_GROUP == "2") {
            list.add(Type(R.drawable.ic_man, "Asegurados"))
            getInsured(request)
        } else if (ID_GROUP == "3") {
            list.add(Type(R.drawable.ic_car, "Vehiculos"))
            getVehicle(request)
        }
        list.add(Type(R.drawable.ic_money, "Prima"))
        getPrima(request)
        list.add(Type(R.drawable.ic_files, "Documentos"))
        getDocument(request)
        list.add(Type(R.drawable.ic_alert, "Siniestros"))
        getSinister(request)
        listCategories.postValue(list)
    }

    private fun getResume(requestResume: RequestPolicyCarDetail) {
        try {
            viewModelScope.launch {

                val responseResume = withContext(Dispatchers.IO) {
                    repository.getResume(
                        session.getToken(),
                        requestResume
                    )
                }
                when (responseResume) {
                    is OperationResult.Success -> {
                        responseResume.result?.run {
                            _showResume.postValue(data[0][0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseResume.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch {
                showDialogError.postValue(e.message)
            }
        }
    }

    private fun getVehicle(requestVehicle: RequestPolicyCarDetail) {
        try {
            viewModelScope.launch {
                val responseVehicle = withContext(Dispatchers.IO) {
                    repository.getVehicles(
                        session.getToken(),
                        requestVehicle
                    )
                }
                when (responseVehicle) {
                    is OperationResult.Success -> {
                        responseVehicle.result?.run {
                            _showVehicle.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseVehicle.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch { showDialogError.postValue(e.message) }
        }
    }

    private fun getPrima(requestPrima: RequestPolicyCarDetail) {
        try {
            CoroutineScope(Dispatchers.IO).launch {
                val responsePrima =
                    withContext(Dispatchers.IO) {
                        repository.getPrimas(session.getToken(), requestPrima)
                    }
                when (responsePrima) {
                    is OperationResult.Success -> {
                        responsePrima.result?.run {
                            _showPrima.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responsePrima.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch {
                showDialogError.postValue(e.message)
            }
        }
    }

    private fun getDocument(requestDocument: RequestPolicyCarDetail) {
        try {
            viewModelScope.launch {
                val responseDocument = withContext(Dispatchers.IO) {
                    repository.getDocument(
                        session.getToken(),
                        requestDocument
                    )
                }
                when (responseDocument) {
                    is OperationResult.Success -> {
                        responseDocument.result?.run {
                            _showDocument.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseDocument.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch { showDialogError.postValue(e.message) }
        }
    }

    private fun getSinister(requestSinister: RequestPolicyCarDetail) {
        try {
            CoroutineScope(Dispatchers.IO).launch {
                val responseSinister =
                    withContext(Dispatchers.IO) {
                        repository.getSinister(session.getToken(), requestSinister)
                    }
                when (responseSinister) {
                    is OperationResult.Success -> {
                        responseSinister.result?.run {
                            _showSinister.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseSinister.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch { showDialogError.postValue(e.message) }
        }
    }

    private fun getEndorsements(request: RequestPolicyCarDetail) {
        try {
            viewModelScope.launch {
                val requestEndorsements =
                    withContext(Dispatchers.IO) { RequestEndorsements(request.LOCAL_ID_POLIZA, "") }
                val responseEndorsements =
                    repository.getEndorsements(session.getToken(), requestEndorsements)
                when (responseEndorsements) {
                    is OperationResult.Success -> {
                        responseEndorsements.result?.run {
                            _showEndorsements.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseEndorsements.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch {
                showDialogError.postValue(e.message)
            }
        }
    }

    fun getCuponera(requestCuponPrima: RequestCuponPrima) {
        try {
            CoroutineScope(Dispatchers.IO).launch {
                val responseCuponera = withContext(Dispatchers.IO) {
                    repository.getCuponPrima(session.getToken(), requestCuponPrima)
                }
                when (responseCuponera) {
                    is OperationResult.Success -> {
                        responseCuponera.result?.run {
                            _showCupon.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseCuponera.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch {
                showDialogError.postValue(e.message)
            }
        }
    }

    private fun getInsured(requestSinister: RequestPolicyCarDetail) {
        try {
            viewModelScope.launch {
                val responseClients = withContext(Dispatchers.IO) {
                    repository.getClients(
                        session.getToken(),
                        requestSinister
                    )
                }
                when (responseClients) {
                    is OperationResult.Success -> {
                        responseClients.result?.run {
                            _showClient.postValue(data[0])
                        }
                    }
                    is OperationResult.Error -> {
                        showDialogError.postValue(responseClients.exception)
                    }
                }
            }
        } catch (e: Exception) {
            CoroutineScope(Dispatchers.IO).launch { showDialogError.postValue(e.message) }
        }
    }

}