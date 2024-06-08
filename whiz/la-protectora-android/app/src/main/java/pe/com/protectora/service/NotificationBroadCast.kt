package pe.com.protectora.service

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build

class NotificationBroadCast : BroadcastReceiver() {
    override fun onReceive(context: Context, p1: Intent) {
        val service = Intent(
            context.applicationContext,
            NotificationService::class.java
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(service)
        } else {
            context.startService(service)
        }
    }
}