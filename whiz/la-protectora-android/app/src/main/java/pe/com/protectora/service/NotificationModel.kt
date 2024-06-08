package pe.com.protectora.service

data class NotificationModel(
    val device_type: String,
    val device_token: String,
    val title: String,
    val message: String
) {
}