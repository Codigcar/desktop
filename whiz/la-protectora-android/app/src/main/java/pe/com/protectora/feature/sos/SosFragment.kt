package pe.com.protectora.feature.sos

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_sos.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.sos_vehicle.SosVehicleFragment

class SosFragment : Fragment() {

    companion object {
        fun getInstance(): SosFragment = SosFragment()
        private val RC_CALL_PHONE = 123
    }

    private val viewModel: SosViewModel by viewModel()
    private val adapter: SosAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sos, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        intiToolbar()
        checkPermission()
        setViewModel()
        setRecycler()
        setOnClick()
    }

    private fun intiToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "S.O.S"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun checkPermission() {
        val hasCellphonePermission =
            ContextCompat.checkSelfPermission(context!!, Manifest.permission.CALL_PHONE)
        if (hasCellphonePermission != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                activity!!,
                arrayOf(Manifest.permission.CALL_PHONE),
                RC_CALL_PHONE
            )
        }
    }

    private fun setOnClick() {
        adapter.onClick = object : SosAdapter.OnClick {
            override fun getSos(sos: Sos) {
                if (sos.number != "") {
                    val i = Intent(Intent.ACTION_CALL)
                    i.data = Uri.parse(sos.number)
                    if (ActivityCompat.checkSelfPermission(
                            context!!,
                            Manifest.permission.CALL_PHONE
                        ) == PackageManager.PERMISSION_GRANTED
                    ) {
                        startActivity(i)
                    }
                } else {
                    (activity as HomeActivity?)?.pushFragments(
                        HomeActivity.TAB_HOME,
                        SosVehicleFragment.getInstance(),
                        true
                    )
                }
            }
        }
    }

    private fun setRecycler() {
        emergencyRecycler.layoutManager = LinearLayoutManager(context)
        emergencyRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
            listsos.observe(viewLifecycleOwner, observerListSos())
            getData()
        }
    }

    private fun observerListSos() = Observer<MutableList<Sos>> {
        adapter.listSos = it
        adapter.notifyDataSetChanged()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        val permissionCheck =
            ContextCompat.checkSelfPermission(context!!, Manifest.permission.CALL_PHONE)
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                activity!!,
                arrayOf(Manifest.permission.CALL_PHONE),
                RC_CALL_PHONE
            )
        }
    }

    override fun onResume() {
        super.onResume()
        intiToolbar()
    }
}
