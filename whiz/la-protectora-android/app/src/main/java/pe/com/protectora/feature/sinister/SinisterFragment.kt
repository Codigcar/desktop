package pe.com.protectora.feature.sinister

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_policies.*
import kotlinx.android.synthetic.main.fragment_sinister.*
import kotlinx.android.synthetic.main.fragment_sinister.emptyText
import kotlinx.android.synthetic.main.fragment_sinister.progress_circular
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.sinister_vehicle.SinisterVehicleFragment
import pe.com.protectora.model.Group


class SinisterFragment : Fragment() {

    companion object {
        fun getInstance(): SinisterFragment = SinisterFragment()
    }

    private val viewModel: SinisterViewModel by viewModel()
    private val adapter: SinisterAdapter by inject()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sinister, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setViewModel()
        initToolbar()
        setRecycler()
        setOnClick()

    }

    private fun setOnClick() {
        adapter.onClick = object : SinisterAdapter.OnClick {
            override fun getGroup(group: Group) {
                val b = Bundle()
                b.putInt("ID_GROUP", group.ID_GRUPORIESGO)
                b.putString("image",group.rutaImagenGrupoRiesgo)

                val fragmentReturn = SinisterVehicleFragment.getInstance()
                fragmentReturn.arguments = b
                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_SINISTER,
                    fragmentReturn,
                    true
                )
            }
        }
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.GONE
        activity?.logotype?.visibility = View.VISIBLE
    }

    private fun setRecycler() {
        sinisterRecycler.layoutManager = GridLayoutManager(context, 2)
        sinisterRecycler.adapter = adapter
    }

    private fun setViewModel() {
        viewModel.apply {
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
