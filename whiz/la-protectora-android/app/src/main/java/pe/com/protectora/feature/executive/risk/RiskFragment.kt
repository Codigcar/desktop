package pe.com.protectora.feature.executive.risk

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_executive_risk.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.policy.PolicyAdapter
import pe.com.protectora.model.Group
import pe.com.protectora.model.executive.ExecutiveGroup

class RiskFragment : Fragment() {

    companion object {
        fun getInstance(): RiskFragment = RiskFragment()
    }

    private val viewModelP: RiskViewModel by viewModel()
    private val adapter: ExecutiveGroupAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_executive_risk, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initToolbar()
        setViewModel()
        initRecycler()
        setOnClick()
    }

    private fun setOnClick() {
        adapter.onClick = object : ExecutiveGroupAdapter.OnClick {
            override fun getGroup(group: ExecutiveGroup) {
                val b = Bundle()
                b.putInt("ID_GROUP", group.codigo)
                //b.putString("NAME", group.GRUPO_RIESGO)

                val fragmentReturn = ExecutiveRiskFragment.getInstance()
                fragmentReturn.arguments = b
                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_MORE,
                    fragmentReturn,
                    true
                )
            }
        }
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Ejecutivos"
        activity?.dataPersonalButton?.visibility = View.GONE

        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun initRecycler() {
        executiveRiskRecycler.layoutManager = GridLayoutManager(context, 2)
        executiveRiskRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModelP.apply {
            listGroups.observe(viewLifecycleOwner, observerListGroups())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            setPolicies()
        }
    }

    private fun observerListGroups() = Observer<MutableList<ExecutiveGroup>> {
        adapter.listGroups = it
        adapter.notifyDataSetChanged()
    }

    private fun observerLoading() = Observer<Boolean> {
        progress_circular.visibility = if (it) View.VISIBLE else View.GONE
    }

}
