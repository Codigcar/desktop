package pe.com.protectora.session

import pe.com.protectora.model.User
import pe.com.protectora.model.login.TokenManager
import pe.com.protectora.model.login.UserTemp

interface SessionRepository {
    fun saveTokenManager(token: TokenManager)
    fun getToken(): String
    fun getTokenManager(): TokenManager
    fun saveUser(user: User)
    fun getUser(): User
    fun saveLogged(value: Boolean)
    fun getLogged(): Boolean
    fun getType(): Int
    fun setType(type: Int)
    fun setUserTemp(user: UserTemp)
    fun getUserTemp(): UserTemp
    fun getBirthdayNotification(): Boolean
    fun setBirthdayNotification(value: Boolean)
    fun saveLocalID(identifier:String)
    fun getLocalID():String
}