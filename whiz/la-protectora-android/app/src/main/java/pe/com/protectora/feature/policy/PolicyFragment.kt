package pe.com.protectora.feature.policy

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_policies.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.policy_vehicle.PolicyVehicleFragment
import pe.com.protectora.model.Group

class PolicyFragment : Fragment() {

    companion object {
        fun getInstance(): PolicyFragment = PolicyFragment()
    }

    private val policyViewModel: PolicyViewModel by viewModel()
    private val adapter: PolicyAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_policies, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setViewModel()
        initToolbar()
        initRecycler()
        setOnClick()
    }

    private fun setOnClick() {
        adapter.onClick = object : PolicyAdapter.OnClick {
            override fun getGroup(group: Group) {
                val b = Bundle()
                b.putInt("ID_GROUP", group.ID_GRUPORIESGO)
                b.putString("image", group.rutaImagenGrupoRiesgo)

                val fragmentReturn = PolicyVehicleFragment.getInstance()
                fragmentReturn.arguments = b
                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_POLICY,
                    fragmentReturn,
                    true
                )
            }
        }
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.GONE
        activity?.logotype?.visibility = View.VISIBLE
        activity?.titleText?.text = "Polizas"
    }

    private fun initRecycler() {
        policiesRecycler.layoutManager = GridLayoutManager(context, 2)
        policiesRecycler.adapter = adapter
    }

    private fun setViewModel() {
        policyViewModel.apply {
            listGroups.observe(viewLifecycleOwner, observerListGroups())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            showEmpty.observe(viewLifecycleOwner,observerEmpty())
            setPolicies()
        }
    }

    private fun observerEmpty() = Observer<String> {
        emptyText.text = it
    }

    private fun observerListGroups() = Observer<MutableList<Group>> {
        adapter.listGroups = it
        adapter.notifyDataSetChanged()
    }

    private fun observerLoading() = Observer<Boolean> {
        progress_circular.visibility = if (it) View.VISIBLE else View.GONE
    }

}