package pe.com.protectora.feature.auth.tabs

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_insurance.*
import pe.com.protectora.R

class InsuranceActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_insurance)

        backButton.setOnClickListener {
            finish()
        }
    }
}