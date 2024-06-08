package pe.com.protectora.feature.auth

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings.Secure
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.lifecycle.Observer
import kotlinx.android.synthetic.main.activity_auth.*
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.auth.tabs.InsuranceActivity
import pe.com.protectora.feature.callcenter.CallCenterViewModel
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.executive.Callcenter
import pe.com.protectora.model.login.RequestRegister
import pe.com.protectora.model.sms.RequestVerifyCode
import pe.com.protectora.widget.CustomDialog
import pe.com.protectora.widget.hideKeyboard


class AuthActivity : AppCompatActivity() {

    companion object {
        const val REQUEST_STORAGE_CODE = 12
    }

    private val viewModel: AuthViewModel by viewModel()
    private val viewModelCall: CallCenterViewModel by viewModel()

    private var requestRegister: RequestRegister? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)
        initView()
        setViewModel()
        setOnClick()
    }


    private fun initView() {
        val android_id = Secure.getString(this.contentResolver, Secure.ANDROID_ID)
        viewModel.saveLocalId(android_id)
        registerConstraint.setOnClickListener {
            hideKeyboard()
        }
    }

    private fun setOnClick() {
        insureButton.setOnClickListener {
            startActivity(Intent(this@AuthActivity, InsuranceActivity::class.java))
        }

        sigInButton2.setOnClickListener {
            val dni = dniText.text.toString()
            val password = passwordText.text.toString()

            if (validate(dni, password)) {
                viewModel.login(dni, password)
            }
        }
        registerLinearLayout.setOnClickListener {
            topDetailGuideLine.setGuidelinePercent(0.25f)
            registerConstraint.visibility = View.VISIBLE
            loginConstraint.visibility = View.GONE
        }

        backLogin.setOnClickListener {
            topDetailGuideLine.setGuidelinePercent(0.3f)
            registerConstraint.visibility = View.GONE
            loginConstraint.visibility = View.VISIBLE
        }

        termsButton.setOnClickListener {
            downloadFile()
        }

        sigUpButton.setOnClickListener {
            val dni = dniText2.text.toString()
            val name = nameText.text.toString()
            val lastname = lastNameText.text.toString()
            val email = emailText.text.toString()
            val pass = passwordText2.text.toString()
            if (switch_button.isChecked) {
                if (validateRegister(dni, name, lastname, email, pass)) {
                    requestRegister = RequestRegister(lastname, email, name, "x", dni, pass)
                    topDetailGuideLine.setGuidelinePercent(0.3f)
                    smsConstraint.visibility = View.VISIBLE
                    registerConstraint.visibility = View.GONE
                }
            } else {
                Toast.makeText(this, "Acepte los terminos y Condiciones", Toast.LENGTH_SHORT).show()
            }
        }

        recoveryButton.setOnClickListener {
            val email = emailrecoveryText.text.toString()
            viewModel.recoveryPassword(email)
        }

        forgotPasswordText.setOnClickListener {
            topDetailGuideLine.setGuidelinePercent(0.3f)
            recoveryPasswordConstraint.visibility = View.VISIBLE
            loginConstraint.visibility = View.GONE
        }

        loginButton.setOnClickListener {
            topDetailGuideLine.setGuidelinePercent(0.3f)
            recoveryPasswordConstraint.visibility = View.GONE
            loginConstraint.visibility = View.VISIBLE
        }

        smsButton.setOnClickListener {
            requestRegister?.LOCAL_TELEFONO = telfSmsText.text.toString()
            viewModel.sendSms(telfSmsText.text.toString().toInt())
        }

        codeButton.setOnClickListener {
            val requestVerifyCode =
                RequestVerifyCode(codeSmsText.text.toString(), telfSmsText.text.toString())
            viewModel.verifySms(requestVerifyCode)
        }

        telfButton.setOnClickListener {
            val i = Intent(Intent.ACTION_CALL)
            i.data = Uri.parse("tel:" + "017431111")
            if (ActivityCompat.checkSelfPermission(
                    this,
                    Manifest.permission.CALL_PHONE
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                startActivity(i)
            }
        }
    }

    private fun downloadFile() {

        val uriUrl =
            Uri.parse("http://aws2.laprotectora.com.pe/aws/document/Autorizacion_tratamiento_de_Datos_Personales.pdf")
        val launchBrowser = Intent(Intent.ACTION_VIEW, uriUrl)
        startActivity(launchBrowser)
    }

    /** View Model & Observers  **/

    private fun setViewModel() {
        viewModel.apply {
            loginSuccessful.observe(this@AuthActivity, observerSuccessful())
            loginError.observe(this@AuthActivity, observerError())
            showDialog.observe(this@AuthActivity, observerDialog())
            recoveryMessage.observe(this@AuthActivity, observerRecovery())
            registeredSuccessful.observe(this@AuthActivity, observerRegistered())
            showViewSmsCode.observe(this@AuthActivity, observerSmsCode())
            register.observe(this@AuthActivity, observerIsRegister())
            errorMessage.observe(this@AuthActivity, observerErrorMessage())
        }

    }


    private fun observerSmsCode() = Observer<Boolean> {
        if (it) {
            smsButton.visibility = View.GONE
            codeButton.visibility = View.VISIBLE

            codeSmsText.visibility = View.VISIBLE
            telfSmsText.visibility = View.GONE
        }

    }

    private fun observerErrorMessage() = Observer<String> {
        CustomDialog.getInstance(this@AuthActivity).showMessage(it)
    }

    private fun observerIsRegister() = Observer<Boolean> {
        if (it) viewModel.register(requestRegister!!)
    }

    private fun observerRecovery() = Observer<String> {
        CustomDialog.getInstance(this@AuthActivity).showMessage(it)
        clean()
        recoveryPasswordConstraint.visibility = View.GONE
        loginConstraint.visibility = View.VISIBLE
        topDetailGuideLine.setGuidelinePercent(0.3f)
    }

    private fun observerRegistered() = Observer<String> {
        CustomDialog.getInstance(this@AuthActivity).showMessage(it)
        clean()
        smsConstraint.visibility = View.GONE
        loginConstraint.visibility = View.VISIBLE
        topDetailGuideLine.setGuidelinePercent(0.3f)
    }

    private fun observerSuccessful() = Observer<Boolean> {
        if (it) {
            startActivity(Intent(this@AuthActivity, HomeActivity::class.java))
            finish()
        }
    }

    private fun observerDialog() = Observer<Boolean> {
        if (it) CustomDialog.getInstance(this@AuthActivity).showLoading()
        else CustomDialog.getInstance(this@AuthActivity).hide()
    }

    private fun observerError() = Observer<String> {
        CustomDialog.getInstance(this@AuthActivity).showMessage(it)
    }

    private fun validate(dni: String, password: String): Boolean {
        return if (dni == "" || password == "") {
            CustomDialog.getInstance(this@AuthActivity).showMessage("Existen Campos por llenar")
            false
        } else {
            true
        }
    }

    private fun validateRegister(
        dni: String,
        name: String,
        lastname: String,
        email: String,
        pass: String
    ): Boolean {
        return if (dni == "" || name == "" || lastname == "" || email == "" || pass == "") {
            CustomDialog.getInstance(this@AuthActivity).showMessage("Existen Campos por llenar")
            false
        } else {
            true
        }
    }

    fun clean() {
        dniText2.setText("")
        nameText.setText("")
        lastNameText.setText("")
        emailText.setText("")
        passwordText2.setText("")
    }
}
