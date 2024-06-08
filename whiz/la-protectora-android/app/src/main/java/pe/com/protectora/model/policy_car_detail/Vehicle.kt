package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Vehicle(
    @PrimaryKey var id: Int,
    var anio: String? = "",
    var clase: String? = "",
    var codigo: Int,
    var estado: String? = "",
    var marca: String? = "",
    var modelo: String? = "",
    var nombre_cliente: String? = "",
    var nro: String? = "",
    var placa: String? = ""
)