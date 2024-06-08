package pe.com.protectora.model.sinister

data class TracingSinisterVehicle(
    val descripcion: String,
    val ejecutivo: String,
    val estado: String,
    val fch_act: String,
    val fch_reg_fch_res: String,
    val id_ope: Int
)