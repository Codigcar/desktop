package pe.com.protectora.model.policy_car_detail

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Document(
    @PrimaryKey var id: Int,
    var VALTIP: String? = "",
    var documento: Int,
    var ext: String? = "",
    var idDocumento: String? = "",
    var nombre_archivo: String? = "",
    var nombre_archivo_ftp: String? = "",
    var ruta: String? = "",
    var rutadesc: String? = ""
)