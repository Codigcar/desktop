package pe.com.protectora.session

import android.content.SharedPreferences
import com.google.gson.Gson
import pe.com.protectora.BuildConfig
import pe.com.protectora.model.User
import pe.com.protectora.model.login.TokenManager
import pe.com.protectora.model.login.UserTemp

class SessionManagerImp(
    private val sharedPreferences: SharedPreferences
) : SessionManager {

    companion object {
        const val PREFERENCE_NAME = BuildConfig.APPLICATION_ID

        private const val TOKEN = "token"
        private const val USER = "user"
        private const val TOKEN_MANAGER = "token_manager"
        private const val LOGGED = "logged"
        private const val TYPE = "type"
        private const val NOTIFICATION_BIRTHDAY = "notification_birthday"
        private const val LOCAL_ID = "local_id"
    }

    private fun setValue(key: String, value: Any?) {
        when (value) {
            is String -> sharedPreferences.edit().putString(key, value).apply()
            is Int -> sharedPreferences.edit().putInt(key, value).apply()
            is Boolean -> sharedPreferences.edit().putBoolean(key, value).apply()
        }
    }

    override var tokenManager: TokenManager
        get() = Gson().fromJson(
            sharedPreferences.getString(TOKEN_MANAGER, ""),
            TokenManager::class.java
        )
        set(value) {
            setValue(TOKEN_MANAGER, Gson().toJson(value))
        }

    override var type: Int
        get() = sharedPreferences.getInt(TYPE, 0)
        set(value) {
            setValue(TYPE, value)
        }

    override var token: String
        get() = sharedPreferences.getString(TOKEN, "") ?: ""
        set(value) {
            setValue(TOKEN, value)
        }

    override var user: User
        get() = Gson().fromJson(sharedPreferences.getString(USER, ""), User::class.java)
        set(value) {
            setValue(USER, Gson().toJson(value))
        }

    override var logged: Boolean
        get() = sharedPreferences.getBoolean(LOGGED, false)
        set(value) {
            setValue(LOGGED, value)
        }

    override var userTemp: UserTemp
        get() = Gson().fromJson(sharedPreferences.getString(USER, ""), UserTemp::class.java)
        set(value) {
            setValue(USER, Gson().toJson(value))
        }

    override var createNotification: Boolean
        get() = sharedPreferences.getBoolean(NOTIFICATION_BIRTHDAY, false)
        set(value) {
            setValue(NOTIFICATION_BIRTHDAY, value)
        }

    override var localId: String
        get() = sharedPreferences.getString(LOCAL_ID, "") ?: ""
        set(value) {
            setValue(LOCAL_ID, value)
        }
}