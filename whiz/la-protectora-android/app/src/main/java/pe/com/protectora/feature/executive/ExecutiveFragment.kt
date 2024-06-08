package pe.com.protectora.feature.executive

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_executive.*
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.executive.risk.ExecutiveRiskFragment
import pe.com.protectora.feature.executive.risk.RiskFragment
import pe.com.protectora.feature.executive.sinister.ExecutiveSinisterFragment
import pe.com.protectora.feature.home.HomeActivity

class ExecutiveFragment : Fragment() {

    companion object {
        fun getInstance(): ExecutiveFragment = ExecutiveFragment()
    }

    private val viewModel: ExecutiveViewModel by viewModel()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_executive, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        intiToolbar()
        executiveSinisterButton.setOnClickListener {
            (activity as HomeActivity?)?.pushFragments(
                HomeActivity.TAB_MORE,
                ExecutiveSinisterFragment.getInstance(),
                true
            )
        }

        executiveButton.setOnClickListener {
            if (viewModel.getUser().idUniNegCliente != 1) {
                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_MORE,
                    RiskFragment.getInstance(),
                    true
                )
            } else {
                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_MORE,
                    ExecutiveRiskFragment.getInstance(),
                    true
                )
            }
        }

    }

    private fun intiToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Ejecutivos"
        activity?.dataPersonalButton?.visibility = View.GONE

        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    override fun onResume() {
        super.onResume()
        intiToolbar()
    }
}