package pe.com.protectora.model.profile_personal

data class Ubigeo(
    val codigo: String,
    val descrip: String
){
    override fun toString(): String {
        return descrip
    }
}