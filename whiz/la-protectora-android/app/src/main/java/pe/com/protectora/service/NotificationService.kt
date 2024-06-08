package pe.com.protectora.service

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.media.AudioAttributes
import android.media.RingtoneManager
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.google.gson.Gson
import kotlinx.coroutines.*
import org.java_websocket.WebSocket
import org.java_websocket.client.WebSocketClient
import org.java_websocket.framing.Framedata
import org.java_websocket.handshake.ServerHandshake
import org.koin.android.ext.android.inject
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.session.SessionRepository
import pe.com.protectora.worker.NotificationWorker
import java.lang.Exception
import java.net.URI

class NotificationService : Service() {

    lateinit var mWebSocketClient: WebSocketClient
    val session: SessionRepository by inject()

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val uri = URI("wss://protectora-api.whiz.pe/api/ws")
        mWebSocketClient = object : WebSocketClient(uri) {
            override fun onOpen(handshakedata: ServerHandshake?) {
                Log.i("SOCKET", "CONNECTO")
                Log.i("SOCKET", "${session.getLocalID()}")
                mWebSocketClient.send("device_token:${session.getLocalID()}")
            }

            override fun onMessage(message: String?) {
                if (message != "ping") {
                    val objectJson = Gson().fromJson(message, Array<NotificationModel>::class.java)
                    val intent = Intent(applicationContext, HomeActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK

                    val notificationManager =
                        applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

                    val titleNotification = objectJson[0].title
                    val subtitleNotification = objectJson[0].message
                    val pendingIntent = PendingIntent.getActivity(applicationContext, 0, intent, 0)
                    val notification = NotificationCompat.Builder(
                        applicationContext,
                        NotificationWorker.NOTIFICATION_CHANNEL
                    )
                        .setColor(ContextCompat.getColor(applicationContext, R.color.red))
                        .setSmallIcon(R.drawable.ic_cut_logotype)
                        .setContentTitle(titleNotification)
                        .setStyle(
                            NotificationCompat.BigTextStyle()
                                .bigText(subtitleNotification)
                        )
                        .setDefaults(NotificationCompat.DEFAULT_ALL).setContentIntent(pendingIntent)
                        .setAutoCancel(true)

                    notification.priority = NotificationCompat.PRIORITY_MAX

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        notification.setChannelId(NotificationWorker.NOTIFICATION_CHANNEL)

                        val ringtoneManager =
                            RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
                        val audioAttributes =
                            AudioAttributes.Builder()
                                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build()

                        val channel =
                            NotificationChannel(
                                NotificationWorker.NOTIFICATION_CHANNEL,
                                NotificationWorker.NOTIFICATION_NAME,
                                NotificationManager.IMPORTANCE_HIGH
                            )

                        channel.enableLights(true)
                        channel.lightColor = Color.RED
                        channel.enableVibration(true)
                        channel.vibrationPattern =
                            longArrayOf(100, 200, 300, 400, 500, 400, 300, 200, 400)
                        channel.setSound(ringtoneManager, audioAttributes)
                        notificationManager.createNotificationChannel(channel)
                    }
                    notificationManager.notify(1, notification.build())
                }
            }

            override fun onClose(code: Int, reason: String?, remote: Boolean) {
                Log.i("SOCKET", "CERRO")
                CoroutineScope(Dispatchers.IO).launch {
                    delay(10000)
                    mWebSocketClient.reconnect()
                }
            }

            override fun onError(ex: Exception) {
                Log.i("SOCKET", ex.printStackTrace().toString())
            }

            override fun onWebsocketPing(conn: WebSocket?, f: Framedata?) {
                super.onWebsocketPing(conn, f)
                Log.i("SOCKET", "PING")
            }

            override fun onWebsocketPong(conn: WebSocket?, f: Framedata?) {
                super.onWebsocketPong(conn, f)
                Log.i("SOCKET", "PONG")
            }

        }
        mWebSocketClient.connect()

        return START_NOT_STICKY
    }
}