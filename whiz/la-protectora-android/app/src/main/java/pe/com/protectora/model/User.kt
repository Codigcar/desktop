package pe.com.protectora.model

import java.text.SimpleDateFormat
import java.util.*

data class User(
    val CodigoMensaje: Int,
    val RespuestaMensaje:String,
    val NombreUniNegCliente: String,
    val apeMatCliente: String,
    val apePatCliente: String,
    val celCliente: List<String>,
    val codigoCliente: Int,
    val dirCliente: String,
    val emailCliente: String,
    val fechaNaciCliente: String,
    val idDepCliente: String,
    val idDisCliente: String,
    val idProvCliente: String,
    val idUniNegCliente: Int,
    val nomCliente: String,
    val nomDisCliente: String,
    val nombDeparCliente: String,
    val nombProvCliente: String,
    val nombreCliente: String,
    val nombreCortoCliente: String,
    val nroDocCliente: String,
    val pass: String,
    val salida: Int,
    val telfCliente: String,
    val tipCliente: String,
    val tipoDocCliente: String,
    val idTipoDocCliente:Int,
    val usu: String
) {
    fun getDateTime(): String {
        var newDate = ""
        if (fechaNaciCliente != null) {
            val dates = fechaNaciCliente.split("-")
            val day =dates.get(2).split("T")
            newDate = "${day.get(0)}/${dates.get(1)}/${dates.get(0)}"
        }
        return newDate
    }
}
