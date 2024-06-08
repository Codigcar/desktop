package pe.com.protectora.feature.executive.risk

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_executive_risk_detail.*
import kotlinx.android.synthetic.main.item_executive.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.executive.ExecutiveAdapter
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.executive.Data
import pe.com.protectora.model.executive.Executive


class ExecutiveRiskFragment : Fragment() {

    companion object {
        fun getInstance():ExecutiveRiskFragment = ExecutiveRiskFragment()
    }

    private val viewModel: RiskViewModel by viewModel()
    private val adapter: ExecutiveAdapter by inject()

    private var idRisk: Int? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_executive_risk_detail, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        initView()
        setViewModel()
        initRecycler()
        initToolbar()
    }

    private fun initView() {
        idRisk = this.arguments?.getInt("ID_GROUP")
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
        executiveRiskDetailRecycler.layoutManager = LinearLayoutManager(context)
        executiveRiskDetailRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
            executiveSinisterList.observe(viewLifecycleOwner, observerListGroups())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            iconList.observe(viewLifecycleOwner,observerIconList())
            getSinister(idRisk.toString())
        }
    }

    private fun observerIconList()=Observer<MutableList<Data>>{
        adapter.iconList = it
        adapter.notifyDataSetChanged()
    }

    private fun observerListGroups() = Observer<MutableList<Executive>> {
        adapter.executiveList = it
        adapter.notifyDataSetChanged()
    }

    private fun observerLoading() = Observer<Boolean> {
        progress_circular.visibility = if (it) View.VISIBLE else View.GONE
    }

    override fun onResume() {
        super.onResume()
        initToolbar()
    }
}