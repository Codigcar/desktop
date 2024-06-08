package pe.com.protectora.feature.sos

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import pe.com.protectora.R
import pe.com.protectora.feature.sos.Sos
import pe.com.protectora.feature.sos_vehicle.SosVehicleRepository
import pe.com.protectora.model.sos.RequestSosVehicle
import pe.com.protectora.network.OperationResult
import pe.com.protectora.session.SessionRepository

class SosViewModel(
    private val repositoryVehicle: SosVehicleRepository,
    private val sessionRepository: SessionRepository
) : ViewModel() {

    val listsos = MutableLiveData<MutableList<Sos>>()

    fun getData() {
        viewModelScope.launch {
            val list = mutableListOf<Sos>()
            if (validateWithShowVehicle()) {
                list.add(
                    Sos(
                        R.drawable.emergency_1,
                        "Siniestro Vehicular",
                        "Llama por Choque/Robo/Atropello\n/Asistencia Mecánica.",
                        0,
                        ""
                    )
                )
            }
            list.add(
                Sos(
                    R.drawable.emergency_2,
                    "Policia Nacional 105",
                    "El Sistema de Atención Móvil de \n" + "Policia nacional del Perú",
                    1,
                    "tel:105"
                )
            )
            list.add(
                Sos(
                    R.drawable.emergency_3,
                    "Ambulancia del SAMU 106",
                    "El Sistema de Atención Móvil de \n" + "Urgencia del Ministerio de Salud del Perú.",
                    1,
                    "tel:106"
                )
            )
            list.add(
                Sos(
                    R.drawable.emergency_4,
                    "Bomberos 116",
                    "El Sistema de Atención Móvil de\n" + "Cuerpo General de Bomberos del Perú",
                    1,
                    "tel:116"
                )
            )
            list.add(
                Sos(
                    R.drawable.emergency_5,
                    "SUTRAN 0800-12345",
                    "Superintendencia de Transporte Terrestre de Personas, Carga y Mercancías",
                    1,
                    "tel:080012345"

                )
            )
            listsos.postValue(list)
        }
    }

    private suspend fun validateWithShowVehicle(): Boolean {

        var value: Boolean? = null
        when (sessionRepository.getType()) {
            1 -> {
                val requestSosVehicle =
                    RequestSosVehicle(sessionRepository.getUser().codigoCliente.toString())
                val response =
                    repositoryVehicle.getSosVehicle(sessionRepository.getToken(), requestSosVehicle)
                when (response) {
                    is OperationResult.Success -> {
                        val data = response.result!!
                        if (data.data.size != 0) {
                            value = data.status
                        }

                    }
                    is OperationResult.Error -> {
                        value = false
                    }
                }
            }
            0 -> {
                value = false
            }
        }

        return value ?: false
    }
}