package pe.com.protectora.model.policy_car_detail

data class Cupon(
    val ESTADO: String,
    val FechaFactura2: String,
    val Financiamiento: Int,
    val NroCupon: String,
    val codEstado: Int,
    val correlativo: String,
    val fecCancela2: String,
    val fecVencimi2: String,
    val monto: Double
)