package pe.com.protectora.feature.sos_vehicle

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_sos_vehicle.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.sos.SosFragment
import pe.com.protectora.feature.soscall.SosCallFragment
import pe.com.protectora.model.sos.SosVehicle

class SosVehicleFragment : Fragment() {

    companion object {
        fun getInstance(): SosVehicleFragment = SosVehicleFragment()
    }

    private val viewModel: SosVehicleViewModel by viewModel()
    private val adapter: SosVehicleAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sos_vehicle, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initToolbar()
        setViewModel()
        setRecyclerView()
        setOnClick()
    }

    private fun setOnClick() {
        adapter.onClick = object : SosVehicleAdapter.OnClick {
            override fun getSosVehicle(sos: SosVehicle) {
                val b = Bundle()
                b.putString("plaque", sos.nro_placa)
                b.putString("telf",sos.cia_telefono_emergencia)

                val detailFragment = SosCallFragment.getInstance()
                detailFragment.arguments = b

                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_HOME,
                    detailFragment,
                    true
                )
            }
        }
    }
    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "S.O.S"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }


    private fun setRecyclerView() {
        policiesRecycler.layoutManager = LinearLayoutManager(context)
        policiesRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
            showProgress.observe(viewLifecycleOwner, observerProgress())
            listSosVehicle.observe(viewLifecycleOwner, observerSosVehicle())
            getSosVehicle()
        }
    }

    private fun observerProgress() = Observer<Boolean> {
        progress_circular.visibility = if (it) View.VISIBLE else View.GONE
    }

    private fun observerSosVehicle() = Observer<MutableList<SosVehicle>> {
        adapter.listTracing = it
        adapter.notifyDataSetChanged()
    }
}