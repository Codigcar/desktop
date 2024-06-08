package pe.com.protectora.model.policy_car

data class PolicyCar(
    val ASEGURADORA: String,
    val ESTADO: String,
    val ID_GRUPORIESGO: Int,
    val NroPoliza: String,
    val VIGENCIA: String,
    val detalle: String,
    val colorAseguradora:String,
    val idPoliza: Int,
    val idUniNeg: Int,
    val logoASG: String,
    val nombre_cliente: String,
    val nombre_corto_funcionario: String,
    val nombre_riesgo: String,
    val telefonoFijoEjecutivo: String,
    val telefono_funcionario: String,
    val unidadNegocio:String
)