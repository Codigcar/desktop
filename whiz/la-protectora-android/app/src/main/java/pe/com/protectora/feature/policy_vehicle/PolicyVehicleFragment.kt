package pe.com.protectora.feature.policy_vehicle

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_policies_vehicle.*
import kotlinx.android.synthetic.main.fragment_policies_vehicle.titleText
import kotlinx.android.synthetic.main.item_detail.view.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.detail_policy_vehicle.DetailPolicyVehicleFragment
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.policy_car.PolicyCar

class PolicyVehicleFragment : Fragment() {

    companion object {
        fun getInstance(): PolicyVehicleFragment = PolicyVehicleFragment()
    }

    private val policyCarViewModel: PolicyVehicleViewModel by viewModel()
    private val adapter: PolicyVehicleAdapter by inject()

    private var listPolicy: MutableList<PolicyCar>? = null
    private var newFilterList: MutableList<PolicyCar>? = null

    private var idGroup: String? = null
    private var id_tab: String? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_policies_vehicle, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        setViewModel()
        initRecycler()
        setOnClick()
        browser()
    }

    private fun initView() {
        idGroup = this@PolicyVehicleFragment.arguments?.getInt("ID_GROUP").toString()
        id_tab = this.arguments?.getString("navigate")

        val image = this@PolicyVehicleFragment.arguments?.getString("image").toString()
        Picasso.get().load(image).into(policyImage)
        when (idGroup) {
            "1" -> {
                titleText.text = "Pólizas Generales"
            }
            "2" -> {
                titleText.text = "Pólizas Humanos"
            }
            "3" -> {
                titleText.text = "Pólizas Vehiculares"
            }
        }

    }

    private fun initRecycler() {
        policyCarRecycler.layoutManager = LinearLayoutManager(context)
        policyCarRecycler.adapter = adapter
        adapter.idGroup = idGroup!!.toInt()
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Pólizas"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun browser() {
        browserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int

            ) {
                newFilterList =
                    listPolicy?.filter { it.NroPoliza.contains(sequence) }?.toMutableList()
                adapter.listPoliciesCar = newFilterList
                adapter.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

    }


    private fun setOnClick() {
        adapter.onClick = object : PolicyVehicleAdapter.OnClick {
            override fun navigateDetail(policyCar: PolicyCar) {
                val b = Bundle()
                b.putInt("LOCAL_ID_POLIZA", policyCar.idPoliza)
                b.putString("ID_GROUP", idGroup!!)
                b.putString("unidNegocio",policyCar.unidadNegocio)

                val detailFragment = DetailPolicyVehicleFragment.getInstance()
                detailFragment.arguments = b
                when ((activity as HomeActivity).actual_id_tab) {
                    "tab_more" -> {
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_MORE,
                            detailFragment,
                            true
                        )
                    }
                    "tab_policy" -> {
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_POLICY,
                            detailFragment,
                            true
                        )
                    }
                    "tab_profile" -> {
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_PROFILE,
                            detailFragment,
                            true
                        )
                    }
                }

            }
        }
    }

    private fun setViewModel() {
        policyCarViewModel.apply {
            listPoliciesCar.observe(viewLifecycleOwner, observerPolicies())
            showProgress.observe(viewLifecycleOwner, observerProgress())
            getPoliciesCar(idGroup!!)
        }
    }

    private fun observerProgress() = Observer<Boolean> {
        circularProgress.visibility = if (it) View.VISIBLE else View.GONE

    }

    private fun observerPolicies() = Observer<MutableList<PolicyCar>> {
        listPolicy = it
        adapter.listPoliciesCar = it
        adapter.notifyDataSetChanged()
    }
}