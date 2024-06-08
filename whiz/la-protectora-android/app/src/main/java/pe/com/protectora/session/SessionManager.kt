package pe.com.protectora.session

import pe.com.protectora.model.User
import pe.com.protectora.model.login.TokenManager
import pe.com.protectora.model.login.UserTemp

interface SessionManager {

    var token: String
    var user: User
    var logged: Boolean
    var type: Int
    var userTemp: UserTemp
    var createNotification: Boolean
    var tokenManager: TokenManager
    var localId: String
}