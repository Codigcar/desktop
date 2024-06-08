package pe.com.protectora.network.exception

import android.content.Context
import com.google.gson.JsonParser
import okhttp3.ResponseBody
import pe.com.protectora.R
import java.net.SocketException
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.net.ssl.SSLHandshakeException

fun ResponseBody?.getErrorMessage(context: Context): String {
    return try {
        if (this == null) {
            throw NullPointerException()
        } else {
            val jsonObject = JsonParser().parse(string()).asJsonObject
            jsonObject.get("message").asString
        }
    } catch (e: Exception) {
        e.printStackTrace()
        context.getString(R.string.default_error_message)
    }
}

fun Exception.getErrorMessage(context: Context): String {

    return when (this) {
        is ResponseException -> this.message!!
        is UnknownHostException -> context.getString(R.string.connection_message)
        is SocketTimeoutException -> context.getString(R.string.time_out_message)
        is SSLHandshakeException -> context.getString(R.string.connection_lost_message)
        is SocketException -> context.getString(R.string.socket_error)
        else -> context.getString(R.string.default_error_message)
    }
}