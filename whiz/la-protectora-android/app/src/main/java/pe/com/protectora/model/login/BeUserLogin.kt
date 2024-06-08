package pe.com.protectora.model.login

data class BeUserLogin(
    val new_password: String,
    val transaction_code: Int,
    val transaction_message: String
)