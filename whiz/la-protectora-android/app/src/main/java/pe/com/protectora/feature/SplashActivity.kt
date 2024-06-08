package pe.com.protectora.feature

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import org.koin.android.ext.android.inject
import pe.com.protectora.R
import pe.com.protectora.feature.auth.AuthActivity
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.session.SessionRepository

class SplashActivity : AppCompatActivity() {

    private val sessionRepository: SessionRepository by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        Handler().postDelayed({
            validate()
            finish()
        }, 2000)
    }

    private fun validate() {
        if (sessionRepository.getLogged()) {
            startActivity(Intent(this, HomeActivity::class.java))
        } else {
            startActivity(Intent(this, AuthActivity::class.java))
        }
    }
}
