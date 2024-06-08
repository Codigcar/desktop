package pe.com.protectora.feature.sinister_vehicle

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_policies_vehicle.*

import kotlinx.android.synthetic.main.fragment_sinister_vehicle.*
import kotlinx.android.synthetic.main.fragment_sinister_vehicle.browserText
import kotlinx.android.synthetic.main.fragment_sinister_vehicle.policyImage
import kotlinx.android.synthetic.main.fragment_sinister_vehicle.titleText
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.detail_sinister_vehicle.DetailSinisterVehicleFragment
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.sinister.SinisterVehicle
import pe.com.protectora.widget.CustomDialog

class SinisterVehicleFragment : Fragment() {

    companion object {
        fun getInstance(): SinisterVehicleFragment = SinisterVehicleFragment()
    }

    private val viewModel: SinisterVehicleViewModel by viewModel()
    private val sinisterVehicleAdapter: SinisterVehicleAdapter by inject()

    private var listSinisterVehicle: MutableList<SinisterVehicle>? = null
    private var newFilterList: MutableList<SinisterVehicle>? = null

    private var idGroup: Int? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sinister_vehicle, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        setViewModel()
        setRecycler()
        setOnClick()
        browser()
    }

    private fun initView() {
        idGroup = arguments?.getInt("ID_GROUP")
        val image = arguments?.getString("image").toString()

        Picasso.get().load(image).into(policyImage)
        when (idGroup) {
            1 -> {
                titleText.text = "Siniestros Generales"
            }
            2 -> {
                titleText.text = "Siniestros Humanos"
            }
            3 -> {
                titleText.text = "Siniestros Vehiculares"
            }
        }
    }

    private fun browser() {
        browserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newFilterList =
                    listSinisterVehicle?.filter { it.SiniestroLP.toString().contains(sequence) }
                        ?.toMutableList()
                sinisterVehicleAdapter.listSinisterVehicle = newFilterList
                sinisterVehicleAdapter.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

    }

    private fun setOnClick() {
        sinisterVehicleAdapter.onClick = object : SinisterVehicleAdapter.OnClick {

            override fun getSinisterVehicle(sinisterVehicle: SinisterVehicle) {
                val b = Bundle()
                b.putInt("LOCAL_ID_POLIZA", sinisterVehicle.SiniestroLP)
                b.putInt("type", idGroup!!)
                Log.i("Sinister - Detalle", idGroup.toString())

                val detailFragment = DetailSinisterVehicleFragment.getInstance()
                detailFragment.arguments = b

                (activity as HomeActivity?)?.pushFragments(
                    HomeActivity.TAB_SINISTER,
                    detailFragment,
                    true
                )
            }
        }
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Siniestros"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun setRecycler() {
        sinisterVehicleRecycler.layoutManager = LinearLayoutManager(context)
        sinisterVehicleRecycler.adapter = sinisterVehicleAdapter
    }

    private fun setViewModel() {
        viewModel.apply {
            listSinisterVehicle.observe(viewLifecycleOwner, observerListSinisterVehicle())
            errorMessage.observe(viewLifecycleOwner, observerError())
            showEmpty.observe(viewLifecycleOwner, observerEmpty())
            showProgress.observe(viewLifecycleOwner, observerDialog())
            getListSinisterVehicle(idGroup!!)
        }
    }

    private fun observerDialog() = Observer<Boolean> {
        if (it) {
            progress_circular.visibility = View.VISIBLE
            emptyText.visibility = View.GONE
        } else {
            progress_circular.visibility = View.GONE
        }
    }

    private fun observerEmpty() = Observer<String> {
        emptyText.visibility = View.VISIBLE
        emptyText.text = it
    }

    private fun observerListSinisterVehicle() = Observer<MutableList<SinisterVehicle>> {
        listSinisterVehicle = it
        sinisterVehicleAdapter.listSinisterVehicle = it
        sinisterVehicleAdapter.notifyDataSetChanged()
    }

    private fun observerError() = Observer<Any> {
        CustomDialog.getInstance(context!!).showMessage(it.toString())
    }
}