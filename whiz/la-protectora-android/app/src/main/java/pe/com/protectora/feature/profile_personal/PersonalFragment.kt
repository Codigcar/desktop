package pe.com.protectora.feature.profile_personal

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_personal.*
import kotlinx.android.synthetic.main.fragment_personal.policiesRecycler
import kotlinx.android.synthetic.main.fragment_policies.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.policy.PolicyAdapter
import pe.com.protectora.feature.policy.PolicyFragment
import pe.com.protectora.feature.policy.PolicyViewModel
import pe.com.protectora.feature.policy_vehicle.PolicyVehicleFragment
import pe.com.protectora.feature.profile_personal.tabs.DataFragment
import pe.com.protectora.model.Group
import pe.com.protectora.widget.replaceFragment

class PersonalFragment : Fragment() {

    companion object {
        fun getInstance(): PersonalFragment = PersonalFragment()
    }

    private val policyViewModel: PolicyViewModel by viewModel()
    private val adapter: PolicyAdapter by inject()

    private var navigate: String? = ""
    private var returnView: Boolean? = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_personal, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        setOnclick()
        initRecycler()
        setViewModel()

    }

    fun initView() {
        navigate = arguments?.getString("navigate")!!

        if(returnView!!){
            secureText.setTextColor(ContextCompat.getColor(context!!, R.color.black))
            secureView.visibility = View.VISIBLE

            contentPersonalView.visibility = View.GONE
            policiesRecycler.visibility = View.VISIBLE

            dataText.setTextColor(ContextCompat.getColor(context!!, R.color.gray))
            dataView.visibility = View.GONE
        }else{
            replaceFragment(R.id.contentPersonalView, DataFragment.getInstance())
        }

        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.backButton?.visibility = View.VISIBLE
    }

    private fun initToolbar() {
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun setOnclick() {
        secureConstraint.setOnClickListener {
            dataText.setTextColor(ContextCompat.getColor(context!!, R.color.black))
            dataView.visibility = View.VISIBLE
            replaceFragment(R.id.contentPersonalView, DataFragment.getInstance())
            contentPersonalView.visibility = View.VISIBLE
            policiesRecycler.visibility = View.GONE

            secureText.setTextColor(ContextCompat.getColor(context!!, R.color.gray))
            secureView.visibility = View.GONE
        }

        dataConstraint.setOnClickListener {
            secureText.setTextColor(ContextCompat.getColor(context!!, R.color.black))
            secureView.visibility = View.VISIBLE

            contentPersonalView.visibility = View.GONE
            policiesRecycler.visibility = View.VISIBLE

            dataText.setTextColor(ContextCompat.getColor(context!!, R.color.gray))
            dataView.visibility = View.GONE

        }

        adapter.onClick = object : PolicyAdapter.OnClick {
            override fun getGroup(group: Group) {
                val b = Bundle()
                b.putInt("ID_GROUP", group.ID_GRUPORIESGO)
                b.putString("image", group.rutaImagenGrupoRiesgo)
                b.putString("navigate", navigate)

                when (navigate) {
                    "tab_more" -> {
                        val fragmentReturn = PolicyVehicleFragment.getInstance()
                        fragmentReturn.arguments = b
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_MORE,
                            fragmentReturn,
                            true
                        )
                    }
                }
            }
        }
    }

    private fun initRecycler() {
        policiesRecycler.layoutManager = GridLayoutManager(context, 2)
        policiesRecycler.adapter = adapter
    }

    private fun setViewModel() {
        policyViewModel.apply {
            listGroups.observe(viewLifecycleOwner, observerListGroups())
            setPolicies()
        }
    }

    private fun observerListGroups() = Observer<MutableList<Group>> {
        adapter.listGroups = it
        adapter.notifyDataSetChanged()
    }

    override fun onPause() {
        super.onPause()
        returnView = true
    }

}