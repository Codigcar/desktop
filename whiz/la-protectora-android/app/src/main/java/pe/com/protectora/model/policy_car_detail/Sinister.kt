package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Sinister(
    @PrimaryKey var id: Int,
    var ESTADO: String,
    var FECHAINDEMNIZACION: String,
    var FECOCU: String,
    var ID_GRUPORIESGO: Int,
    var MONEDA: String,
    var RIESGO: String,
    var Siniestro: Int,
    var asegurado: String,
    var logoASG: String,
    var monto_perdida: String,
    var tiposiniestro: String
)