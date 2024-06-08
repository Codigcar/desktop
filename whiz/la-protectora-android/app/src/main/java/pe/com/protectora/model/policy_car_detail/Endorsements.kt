package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Endorsements(
    @PrimaryKey var id: Int,
    var FinVigAnexo: String? = "",
    var detalle: String? = "",
    var nro: String? = "",
    var nro_endoso: String? = "",
    var nro_liquidacion: String? = "",
    var ruta: String? = "",
    var vigencia: String? = ""
)