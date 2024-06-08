package pe.com.protectora.feature.executive

import androidx.lifecycle.ViewModel
import pe.com.protectora.model.User
import pe.com.protectora.session.SessionRepository

class ExecutiveViewModel(private val sessionManager: SessionRepository) : ViewModel() {

    fun getUser(): User = sessionManager.getUser()
}