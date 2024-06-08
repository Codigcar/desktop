package pe.com.protectora.feature.executive.sinister

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_executive_sinister.*

import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.executive.ExecutiveAdapter
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.executive.Executive

class ExecutiveSinisterFragment : Fragment() {

    companion object {
        fun getInstance(): ExecutiveSinisterFragment = ExecutiveSinisterFragment()
    }

    private val viewModel: ExecutiveSinisterViewModel by viewModel()
    private val adapter: ExecutiveAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_executive_sinister, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setViewModel()
        setRecycler()
        initToolbar()
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.dataPersonalButton?.visibility = View.GONE

        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun setRecycler() {
        executiveSinisterRecycler.layoutManager = LinearLayoutManager(context)
        executiveSinisterRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
            showLoading.observe(viewLifecycleOwner, observerLoading())
            executiveSinisterList.observe(viewLifecycleOwner, observerExecutiveList())
            getSinister()
        }
    }

    private fun observerExecutiveList() = Observer<MutableList<Executive>> {
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