package pe.com.protectora.feature.callcenter

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_contact.*
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.executive.Callcenter

class CallCenterFragment : Fragment() {

    companion object {
        fun getInstance(): CallCenterFragment = CallCenterFragment()
    }

    private val viewModel: CallCenterViewModel by viewModel()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_contact, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initToolbar()
        setViewModel()
    }

    private fun setViewModel() {
        viewModel.apply {
            callCenter.observe(viewLifecycleOwner, observerCallcenter())
            getCallCenter()
        }
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Contacto"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun observerCallcenter() = Observer<Callcenter> {
        val telf = it.telefonoFijo
        telfFijoText.text = "+01 $telf"

        val cel = it.telefonoMovil
        celText.text =  "+51 $cel"

        val email = it.correoElectronico
        emailText.text = it.correoElectronico

        celImage.setOnClickListener {
            val i = Intent(Intent.ACTION_CALL)
            i.data = Uri.parse("tel:" + cel)
            if (ActivityCompat.checkSelfPermission(
                    context!!,
                    Manifest.permission.CALL_PHONE
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                startActivity(i)
            }
        }

        emailImage.setOnClickListener {
            val intent =
                Intent(Intent.ACTION_VIEW, Uri.parse("mailto:" + email))
            startActivity(intent)
        }

        telfFijoImage.setOnClickListener {
            val i = Intent(Intent.ACTION_CALL)
            i.data = Uri.parse("tel:" + "01" + telf)
            if (ActivityCompat.checkSelfPermission(
                    context!!,
                    Manifest.permission.CALL_PHONE
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                startActivity(i)
            }
        }
    }

}