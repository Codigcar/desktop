package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Client(
    @PrimaryKey var id: Int,
    var asegurado: String? = "",
    var codigo: Int,
    var dependiente: String? = "",
    var edad: String? = "",
    var fecha_inclusion: String? = "",
    var grupo_familiar_asegurado: String? = "",
    var nro: String? = "",
    var plan_asegurado: String? = "",
    var sexo: String? = "",
    var titular: String? = ""
)