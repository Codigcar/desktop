package pe.com.protectora.feature.introduction

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import pe.com.protectora.R
import pe.com.protectora.model.Introduction

class IntroductionViewModel : ViewModel() {

    val showIntroductionViews = MutableLiveData<MutableList<Introduction>>()

    fun getData() {
        viewModelScope.launch(Dispatchers.IO) {
            val list = mutableListOf(
                Introduction(
                    "Tus Pólizas \nsiempre contigo",
                    "Detalles, endosos, primas y muchos más",
                    1,
                    R.drawable.introduction_b_1
                ),
                Introduction(
                    "Asegúralos sin perder \nlos momentos en familia", " ", 2,
                    R.drawable.introduction_b_2
                ),
                Introduction(
                    "Te cuidamos con \nprácticos consejos",
                    "Tenemos nuevos consejos en nuestro blog",
                    1,
                    R.drawable.introduction_b_3
                ),
                Introduction(
                    "¿Sabes que hacer en un \nsiniestro o accidente?",
                    "Usa las guías de procedimiento correctas",
                    1,
                    R.drawable.introduction_b_4
                ),
                Introduction(
                    "Asesoramiento continuo \nCentral de Asistencia",
                    "Nuestra atención es 24 / 7",
                    1,
                    R.drawable.introduction_b_5
                )
            )
            launch(Dispatchers.Main) {
                showIntroductionViews.postValue(list)
            }
        }
    }


}