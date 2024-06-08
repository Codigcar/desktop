package pe.com.protectora.session

import pe.com.protectora.model.User
import pe.com.protectora.model.login.TokenManager
import pe.com.protectora.model.login.UserTemp

class SessionRepositoryImp(private val sessionManager: SessionManager) : SessionRepository {

    override fun saveTokenManager(token: TokenManager) {
        sessionManager.tokenManager = token
        sessionManager.token = token.access_token
    }

    override fun getTokenManager(): TokenManager {
        return sessionManager.tokenManager
    }

    override fun getToken() = "Bearer ${sessionManager.token}"

    override fun saveUser(user: User) {
        sessionManager.user = user
    }

    override fun getUser(): User = sessionManager.user

    override fun saveLogged(value: Boolean) {
        sessionManager.logged = value
    }

    override fun getLogged(): Boolean = sessionManager.logged

    override fun setType(type: Int) {
        sessionManager.type = type
    }

    override fun getType(): Int = sessionManager.type

    override fun getUserTemp(): UserTemp = sessionManager.userTemp

    override fun setUserTemp(user: UserTemp) {
        sessionManager.userTemp = user
    }

    override fun getBirthdayNotification(): Boolean {
        return sessionManager.createNotification
    }

    override fun setBirthdayNotification(value: Boolean) {
        sessionManager.createNotification = value
    }

    override fun getLocalID(): String = sessionManager.localId

    override fun saveLocalID(identifier: String) {
        sessionManager.localId = identifier
    }
}