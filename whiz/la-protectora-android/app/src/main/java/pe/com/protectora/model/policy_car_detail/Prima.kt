package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Prima(
    @PrimaryKey var id: Int,
    var DocumentoPrima: String? = "",
    var FECEMIF: String? = "",
    var FECVIG: String? = "",
    var Financiamiento: Int,
    var aseguradora: String? = "",
    var cant_letra: Int,
    var clase: String? = "",
    var factura: String? = "",
    var prima_total: String? = "",
    var riesgo: String? = ""
)