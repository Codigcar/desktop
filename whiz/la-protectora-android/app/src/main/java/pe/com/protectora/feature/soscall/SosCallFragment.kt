package pe.com.protectora.feature.soscall

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat.getSystemService
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_sos_call.*
import kotlinx.android.synthetic.main.fragment_sos_call.titleText
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.sos.Cellphone
import pe.com.protectora.widget.CustomDialog

class SosCallFragment : Fragment() {

    companion object {
        fun getInstance(): SosCallFragment = SosCallFragment()
    }

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var mlocation: Location

    private var plaque: String = ""
    private var cellphoneArg: String = ""
    private var validationView: Int = 0
    private val viewModel: SosCallViewModel by viewModel()
    private val adapter: SosCallAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sos_call, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        getLocation()
        setRecycler()
        setViewModel()
        setOnClick()
    }

    private fun initView() {
        plaque = this.arguments?.getString("plaque")!!
        cellphoneArg = this.arguments?.getString("telf")!!
        titleText.text = plaque
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(context!!)
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "S.O.S"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    @SuppressLint("MissingPermission")
    private fun getLocation() {
        try {
            fusedLocationClient.lastLocation
                .addOnSuccessListener { location: Location? ->
                    if (location != null) {
                        mlocation = location
                    } else {
                        val manager: LocationManager =
                            context!!.getSystemService(Context.LOCATION_SERVICE) as LocationManager
                        if (!manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                            CustomDialog.getInstance(context!!)
                                .showMessage("Necesitamos que active su GPS") {
                                    (activity as HomeActivity?)?.popFragments()
                                    val intent = Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
                                    startActivity(intent)
                                }
                        }
                    }

                }
        } catch (e: Exception) {
            e.printStackTrace()
        }

    }

    private fun setOnClick() {
        adapter.onClick = object : SosCallAdapter.OnClick {
            override fun getCellPhone(cellphone: Cellphone) {
                val i = Intent(Intent.ACTION_CALL)
                i.data = Uri.parse("tel:" + cellphoneArg)
                if (ActivityCompat.checkSelfPermission(
                        context!!,
                        Manifest.permission.CALL_PHONE
                    ) == PackageManager.PERMISSION_GRANTED
                ) {
                    startActivity(i)
                }

                viewModel.registerSosCall(
                    mlocation.latitude.toString(),
                    mlocation.longitude.toString(),
                    cellphone.codigoTipoSiniestro,
                    plaque
                )
            }
        }
    }

    private fun setRecycler() {
        cellphoneRecycler.layoutManager = LinearLayoutManager(context)
        cellphoneRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
            sosCallList.observe(viewLifecycleOwner, observerSosList())
            loading.observe(viewLifecycleOwner, observerDialog())
            callCellphone.observe(viewLifecycleOwner, observerCall())
            getSosCall()
        }
    }

    private fun observerSosList() = Observer<MutableList<Cellphone>> {
        adapter.listCellphone = it
        adapter.notifyDataSetChanged()
    }

    private fun observerDialog() = Observer<Boolean> {
        if (it) CustomDialog.getInstance(context!!).showLoading()
        else CustomDialog.getInstance(context!!).hide()
    }

    private fun observerCall() = Observer<Boolean> {

    }
}