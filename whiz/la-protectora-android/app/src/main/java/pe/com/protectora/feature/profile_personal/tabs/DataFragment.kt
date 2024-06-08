package pe.com.protectora.feature.profile_personal.tabs

import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import kotlinx.android.synthetic.main.dialog_logout.*
import kotlinx.android.synthetic.main.dialog_logout.acceptButton
import kotlinx.android.synthetic.main.dialog_logout.messageText
import kotlinx.android.synthetic.main.dialog_message.*
import kotlinx.android.synthetic.main.fragment_personal_data.*
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R

import pe.com.protectora.model.User
import pe.com.protectora.model.profile_personal.RequestProfileUbigeo
import pe.com.protectora.model.profile_personal.Ubigeo
import pe.com.protectora.widget.CustomDialog
import java.util.*

class DataFragment : Fragment() {

    companion object {
        fun getInstance(): DataFragment = DataFragment()
    }

    private val viewModel: DataViewModel by viewModel()

    private var idDepartment: String? = null
    private var idProvince: String? = null
    private var idDistrict: String? = null

    private var user: User? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_personal_data, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setViewModel()
        setOnClick()
        setSpinners()
        getData()
    }

    private fun setOnClick() {
        personalDataButton.setOnClickListener {
            updateProfileLayout.visibility =
                if (updateProfileLayout.visibility == View.VISIBLE) View.GONE else View.VISIBLE
            personalDataButton.rotation = if (personalDataButton.rotation == 90f) 270f else 90f
        }

        passwordButton.setOnClickListener {
            passwordLayout.visibility =
                if (passwordLayout.visibility == View.VISIBLE) View.GONE else View.VISIBLE
            passwordButton.rotation = if (passwordButton.rotation == 90f) 270f else 90f

        }

        dataButton.setOnClickListener {
            val cel = celText.text.toString()
            val direction = directionText.text.toString()
            val email = emailText.text.toString()
            val telf = telfText.text.toString()
            viewModel.sendUpdateUser(
                cel,
                idDepartment!!,
                direction,
                idDistrict!!,
                email,
                viewModel.getUser().fechaNaciCliente,
                idProvince!!,
                telf
            )
        }
        updatePasswordButton.setOnClickListener {
            val pass = firstPasswordText.text.toString()
            val confirmPass = confirmPasswordText.text.toString()
            val beforePass = beforePasswordText.text.toString()
            if (pass == confirmPass) {
                viewModel.updatePassword(beforePass,confirmPass)
            } else {
                Toast.makeText(context!!, "Las contraseñas a actualizar no coinciden", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun setViewModel() {
        viewModel.apply {
            showDepartment.observe(viewLifecycleOwner, observerDepartement())
            showResponse.observe(viewLifecycleOwner, observerResponse())
            showProvince.observe(viewLifecycleOwner, observerProvince())
            showProgress.observe(viewLifecycleOwner, observerProgress())
            showDistrics.observe(viewLifecycleOwner, observerDistricts())
        }
    }

    private fun observerResponse() = Observer<String> {
        showDialog(it)
        beforePasswordText.setText("")
        firstPasswordText.setText("")
        confirmPasswordText.setText("")
    }

    private fun setSpinners() {
        val requestProfileUbigeo = RequestProfileUbigeo("", "1")
        viewModel.getUbigeo(requestProfileUbigeo)
    }

    private fun observerDepartement() = Observer<MutableList<Ubigeo>> {
        val adapter = ArrayAdapter(context!!, android.R.layout.simple_spinner_item, it)
        val ubigeo = it.find { ubigeo -> ubigeo.codigo == user?.idDepCliente!! }
        val index = it.indexOf(ubigeo)
        departmentSpinner.adapter = adapter
        departmentSpinner.setSelection(index)

        departmentSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?, view: View?, position: Int, id: Long
            ) {
                idDepartment = it[position].codigo
                val requestProfileUbigeo = RequestProfileUbigeo(it[position].codigo, "2")
                viewModel.getUbigeo(requestProfileUbigeo)
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

    private fun observerProvince() = Observer<MutableList<Ubigeo>> {
        val adapter = ArrayAdapter(context!!, android.R.layout.simple_spinner_item, it)
        val codigoNew = "${user?.idDepCliente}${user?.idProvCliente}"
        val ubigeo = it.find { ubigeo -> ubigeo.codigo == codigoNew }
        val index = it.indexOf(ubigeo)
        provinceSpinner.adapter = adapter
        provinceSpinner.setSelection(index)

        provinceSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?, view: View?, position: Int, id: Long
            ) {
                val codigo = it[position].codigo.substring(it[position].codigo.length - 2)
                idProvince = codigo
                val requestProfileUbigeo = RequestProfileUbigeo(it[position].codigo, "3")
                viewModel.getUbigeo(requestProfileUbigeo)
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

    private fun observerDistricts() = Observer<MutableList<Ubigeo>> {
        val adapter = ArrayAdapter(context!!, android.R.layout.simple_spinner_item, it)
        val codigoNew = "${user?.idDepCliente}${user?.idProvCliente}${user?.idDisCliente}"
        val ubigeo = it.find { ubigeo -> ubigeo.codigo == codigoNew }
        val index = it.indexOf(ubigeo)
        districtSpinner.adapter = adapter
        districtSpinner.setSelection(index)

        districtSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>?, view: View?, position: Int, id: Long
            ) {
                val codigo = it[position].codigo.substring(it[position].codigo.length - 2)
                idDistrict = codigo
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

    private fun observerProgress() = Observer<Boolean> {
        if (it) CustomDialog.getInstance(context!!).showLoading()
        else CustomDialog.getInstance(context!!).dismiss()
    }

    private fun getData() {
        user = viewModel.getUser()
        when (user?.tipoDocCliente) {
            "R.U.C." -> {
                negocioText.isEnabled = false
                tipoPersonaText.isEnabled = false
                tipoPersonaText2.isEnabled = false
                nameText.isEnabled = false
                lastNameText.isEnabled = false
                fechnacText.isEnabled = false
                directionText.isEnabled = false
                telfText.isEnabled = false
                celText.isEnabled = false
                emailText.isEnabled = false
                departmentSpinner.isEnabled = false
                provinceSpinner.isEnabled = false
                districtSpinner.isEnabled = false
            }
            "D.N.I." -> {
                negocioText.isEnabled = false
                tipoPersonaText.isEnabled = false
                tipoPersonaText2.isEnabled = false
                nameText.isEnabled = false
                lastNameText.isEnabled = false
                fechnacText.isEnabled = false
                celText.isEnabled = false
                emailText.isEnabled = false

            }
        }
        when (user?.idUniNegCliente) {
            2 -> {
                primerText.text = "Razon Social"
                tipoPersonaText.setText(user?.nombreCortoCliente)
                nameConstraint.visibility = View.GONE
                fechaConstraint.visibility = View.GONE
                celConstraint.visibility = View.GONE
                emailConstraint.visibility = View.GONE
                dataButton.visibility = View.GONE
            }
        }

        negocioText.setText(user?.NombreUniNegCliente)
        tipoPersonaText.setText(user?.tipCliente)
        tipoPersonaText2.setText(user?.nroDocCliente)
        nameText.setText(user?.nomCliente)
        lastNameText.setText(user?.apePatCliente)
        fechnacText.setText(user?.getDateTime())
        directionText.setText(user?.dirCliente)
        telfText.setText(user?.telfCliente)
        celText.setText(user?.celCliente?.get(0))
        emailText.setText(user?.emailCliente)
        tipoDocText.text = user?.tipoDocCliente
    }

    fun showDialog(message: String) {
        val dialog = Dialog(context!!)
        dialog.setContentView(R.layout.dialog_message)
        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setCancelable(false)
        dialog.dialogProgress.visibility = View.GONE
        dialog.messageText.text = message
        dialog.acceptButton.setOnClickListener {
            dialog.dismiss()
        }

        dialog.show()
    }
}