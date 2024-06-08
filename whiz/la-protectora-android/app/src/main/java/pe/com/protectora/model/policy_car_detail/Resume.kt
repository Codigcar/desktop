package pe.com.protectora.model.policy_car_detail



data class Resume(
    var ASEGURADORA: String? = "",
    var ESTADO: String? = "",
    var ID_GRUPORIESGO: Int,
    var NroPoliza: String? = "",
    var VIGENCIA: String? = "",
    var detalle: String? = "",
    var colorAseguradora: String? = "",
    var etiqueta: String? = "",
    var funcionario: String? = "",
    var idPoliza: Int,
    var idUniNeg: Int,
    var logoASG: String? = "",
    var nombre_cliente: String? = "",
    var telefonoFijoEjecutivo: String? = "",
    var unidadNegocio: String? = ""
)