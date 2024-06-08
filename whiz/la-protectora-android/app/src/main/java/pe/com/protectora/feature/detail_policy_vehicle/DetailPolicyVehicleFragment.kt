package pe.com.protectora.feature.detail_policy_vehicle

import android.app.Dialog
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.activity_home.titleText
import kotlinx.android.synthetic.main.fragment_detail_policy.*
import kotlinx.android.synthetic.main.fragment_detail_policy.endorsementLayout
import kotlinx.android.synthetic.main.fragment_detail_policy.endorsementRecycler
import kotlinx.android.synthetic.main.fragment_detail_policy.insuredRecycler
import kotlinx.android.synthetic.main.fragment_detail_policy.primaRecycler
import kotlinx.android.synthetic.main.fragment_detail_policy.sinisterRecycler
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter.*
import pe.com.protectora.feature.detail_sinister_vehicle.DetailSinisterVehicleFragment
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.policy_car_detail.*
import pe.com.protectora.widget.CustomDialog


class DetailPolicyVehicleFragment : Fragment() {

    companion object {
        fun getInstance(): DetailPolicyVehicleFragment = DetailPolicyVehicleFragment()
    }

    private val viewModel: DetailPolicyVehicleViewModel by viewModel()
    private val adapter: TypeAdapter by inject()

    private val adapterEndorsement: EndorsementAdapter by inject()
    private val adapterInsured: InsuredAdapter by inject()
    private val adapterVehicle: VehicleAdapter by inject()
    private val adapterPrima: PrimaAdapter by inject()
    private val adapterCupon: CuponAdapter by inject()
    private val adapterDocument: DocumentAdapter by inject()
    private val adapterSinister: SinisterAdapter by inject()

    private var actualView: ConstraintLayout? = null
    private var actualNameView: String = ""

    private var idGroup: String? = ""
    private var request: RequestPolicyCarDetail? = null

    private var listEndorsement: MutableList<Endorsements>? = null
    private var newEndorsementFilterList: MutableList<Endorsements>? = null

    private var listInsured: MutableList<Client>? = null
    private var newInsuredFilterList: MutableList<Client>? = null

    private var listVehicles: MutableList<Vehicle>? = null
    private var newVehicleFilterList: MutableList<Vehicle>? = null

    private var listPrima: MutableList<Prima>? = null
    private var newPrimaFilterList: MutableList<Prima>? = null

    private var listDocument: MutableList<Document>? = null
    private var newDocumentFilterList: MutableList<Document>? = null

    private var listSinister: MutableList<Sinister>? = null
    private var newSinisterFilterList: MutableList<Sinister>? = null

    private var emptyText = "No se encontraron registros"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_detail_policy, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        setViewModel()

        initRecyclerView()
        setOnClick()
        browser()
    }

    private fun initView() {
        val idPoliza = this.arguments?.getInt("LOCAL_ID_POLIZA")
        idGroup = this.arguments?.getString("ID_GROUP")
        request = RequestPolicyCarDetail(idPoliza.toString())

    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Pólizas"

        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }

    private fun setOnClick() {
        adapter.onClick = object : TypeAdapter.OnClick {
            override fun getType(type: Type) {
                actualView?.visibility = View.GONE
                when (type.title) {
                    "Detalle" -> {
                        resumeLayout.visibility = View.VISIBLE
                        actualNameView = "Detalle"
                        actualView = resumeLayout
                    }
                    "Endosos" -> {
                        endorsementLayout.visibility = View.VISIBLE
                        actualNameView = "Endosos"
                        actualView = endorsementLayout
                    }
                    "Asegurados" -> {
                        insuredLayout.visibility = View.VISIBLE
                        actualNameView = "Asegurados"
                        actualView = insuredLayout
                    }
                    "Vehiculos" -> {
                        vehicleLayout.visibility = View.VISIBLE
                        actualNameView = "Vehiculos"
                        actualView = vehicleLayout
                    }
                    "Prima" -> {
                        primaLayout.visibility = View.VISIBLE
                        actualNameView = "Prima"
                        actualView = primaLayout
                    }
                    "Documentos" -> {
                        documentLayout.visibility = View.VISIBLE
                        actualNameView = "Documentos"
                        actualView = documentLayout
                    }
                    "Siniestros" -> {
                        sinisterLayout.visibility = View.VISIBLE
                        actualNameView = "Siniestros"
                        actualView = sinisterLayout
                    }
                }
            }
        }


        adapterEndorsement.onClick = object : EndorsementAdapter.OnClick {
            override fun showEndorsement(endorsements: Endorsements) {
                CustomDialog.getInstance(context!!).showLoading()
                if (endorsements.ruta != null) {
                    CustomDialog.getInstance(context!!).hide()

                    val uri = Uri.parse("https://${endorsements.ruta}")
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                } else {
                    CustomDialog.getInstance(context!!)
                        .showMessage("No existen datos")
                }
            }
        }

        adapterPrima.onClick = object : PrimaAdapter.OnClick {
            override fun getCupon(prima: Prima) {
                if (prima.Financiamiento == 0) {
                    CustomDialog.getInstance(context!!).showMessage("No existen datos")
                } else {
                    val requestCupon = RequestCuponPrima(prima.Financiamiento.toString())
                    showDialog(requestCupon)

                }
            }
        }

        adapterDocument.onClick = object : DocumentAdapter.OnClick {
            override fun showDocument(document: Document) {
                CustomDialog.getInstance(context!!).showLoading()
                if (document.ruta!!.isNotEmpty() || document.ruta!!.isNotBlank()) {
                    CustomDialog.getInstance(context!!).hide()

                    val uri = Uri.parse("https://${document.ruta}")
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                } else {
                    CustomDialog.getInstance(context!!)
                        .showMessage("No existen datos")
                }
            }
        }

        adapterSinister.onClick = object : SinisterAdapter.OnClick {
            override fun getSinister(sinister: Sinister) {
                val b = Bundle()
                b.putInt("LOCAL_ID_POLIZA", sinister.Siniestro)

                val detailFragment = DetailSinisterVehicleFragment.getInstance()
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

    private fun browser() {
        endorsementBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newEndorsementFilterList =
                    listEndorsement?.filter { it.nro_endoso!!.contains(sequence) }?.toMutableList()
                adapterEndorsement.listEndorsements = newEndorsementFilterList
                adapterEndorsement.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        insuredBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newInsuredFilterList =
                    listInsured?.filter { it.titular!!.startsWith(sequence) }?.toMutableList()
                adapterInsured.listInsured = newInsuredFilterList
                adapter.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        vehicleBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newVehicleFilterList =
                    listVehicles?.filter { it.placa!!.contains(sequence) }?.toMutableList()
                adapterVehicle.listVehicles = newVehicleFilterList
                adapterVehicle.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        primaBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newPrimaFilterList =
                    listPrima?.filter { it.DocumentoPrima!!.contains(sequence) }?.toMutableList()
                adapterPrima.listPrima = newPrimaFilterList
                adapterPrima.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        documentBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newDocumentFilterList =
                    listDocument?.filter { it.idDocumento.toString().contains(sequence) }
                        ?.toMutableList()
                adapterDocument.listDocument = newDocumentFilterList
                adapterDocument.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        sinisterBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newSinisterFilterList =
                    listSinister?.filter { it.Siniestro.toString().contains(sequence) }
                        ?.toMutableList()
                adapterSinister.listSinister = newSinisterFilterList
                adapterSinister.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })
    }

    private fun initRecyclerView() {
        categoryRecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        categoryRecycler.adapter = adapter

        endorsementRecycler.layoutManager = LinearLayoutManager(context)
        endorsementRecycler.adapter = adapterEndorsement

        insuredRecycler.layoutManager = LinearLayoutManager(context)
        insuredRecycler.adapter = adapterInsured

        vehicleRecycler.layoutManager = LinearLayoutManager(context)
        vehicleRecycler.adapter = adapterVehicle

        primaRecycler.layoutManager = LinearLayoutManager(context)
        primaRecycler.adapter = adapterPrima

        documentRecycler.layoutManager = LinearLayoutManager(context)
        documentRecycler.adapter = adapterDocument

        sinisterRecycler.layoutManager = LinearLayoutManager(context)
        sinisterRecycler.adapter = adapterSinister

    }

    private fun setViewModel() {
        viewModel.apply {
            listCategories.observe(viewLifecycleOwner, observerCategories())
            showResume.observe(viewLifecycleOwner, observerResume())
            showEndorsements.observe(viewLifecycleOwner, observerEndorsements())
            showClient.observe(viewLifecycleOwner, obseverInsured())
            showVehicle.observe(viewLifecycleOwner, observerVehicle())
            showPrima.observe(viewLifecycleOwner, observerPrima())
            showCupon.observe(viewLifecycleOwner, observerListCupon())
            showDocument.observe(viewLifecycleOwner, observerDocument())
            showSinister.observe(viewLifecycleOwner, observerSinister())
            showDialogError.observe(viewLifecycleOwner, observerError())
            getData(idGroup!!, request!!)

        }
    }

    private fun observerCategories() = Observer<MutableList<Type>> {
        adapter.listType = it
        adapter.notifyDataSetChanged()
    }

    private fun observerResume() = Observer<Resume> {
        val funcionario = it.funcionario!!.split("<br>")
        resumeNroPolicyText.text = it.NroPoliza
        resumeCarrierText.text = it.ASEGURADORA
        resumeCarrierText.setTextColor(Color.parseColor(it.colorAseguradora ?: "#FFFFFF"))
        resumeRiskText.text = it.etiqueta
        resumeTimeText.text = it.VIGENCIA
        resumeUnegocioText.text = this.arguments!!.getString("unidNegocio")
        resumeExecutiveText.text = funcionario[0]
    }

    private fun observerEndorsements() = Observer<MutableList<Endorsements>> {
        listEndorsement = it
        adapterEndorsement.listEndorsements = it
        adapterEndorsement.notifyDataSetChanged()
        if (it.size == 0) {
            endorsementEmpty.text = emptyText
        }
    }

    private fun obseverInsured() = Observer<MutableList<Client>> {
        listInsured = it
        adapterInsured.listInsured = it
        adapterInsured.notifyDataSetChanged()
        if (it.size == 0) {
            insuredEmpty.text = emptyText
        }
    }

    private fun observerVehicle() = Observer<MutableList<Vehicle>> {
        listVehicles = it
        adapterVehicle.listVehicles = it
        adapterVehicle.notifyDataSetChanged()
        if (it.size == 0) {
            vehicleEmpty.text = emptyText
        }
    }

    private fun observerPrima() = Observer<MutableList<Prima>> {
        listPrima = it
        adapterPrima.listPrima = it
        adapterPrima.notifyDataSetChanged()
        if (it.size == 0) {
            primaEmpty.text = emptyText
        }
    }

    private fun observerListCupon() = Observer<MutableList<Cupon>> {
        adapterCupon.listCupons = it
        adapterCupon.notifyDataSetChanged()
    }

    private fun observerDocument() = Observer<MutableList<Document>> {
        listDocument = it
        adapterDocument.listDocument = it
        adapterDocument.notifyDataSetChanged()
        if (it.size == 0) {
            documentEmpty.text = emptyText
        }
    }

    private fun observerSinister() = Observer<MutableList<Sinister>> {
        listSinister = it
        adapterSinister.listSinister = it
        adapterSinister.notifyDataSetChanged()
        if (it.size == 0) {
            sinisterEmpty.text = emptyText
        }
    }

    private fun observerError() = Observer<String> {
        CustomDialog.getInstance(context!!).showMessage(it)
    }

    override fun onResume() {
        super.onResume()
        when (actualNameView) {
            "Detalle" -> {
                resumeLayout.visibility = View.VISIBLE
                actualNameView = "Detalle"
                actualView = resumeLayout
            }
            "Endosos" -> {
                endorsementLayout.visibility = View.VISIBLE
                actualNameView = "Endosos"
                actualView = endorsementLayout
            }
            "Asegurados" -> {
                insuredLayout.visibility = View.VISIBLE
                actualNameView = "Asegurados"
                actualView = insuredLayout
            }
            "Vehiculos" -> {
                vehicleLayout.visibility = View.VISIBLE
                actualNameView = "Vehiculos"
                actualView = vehicleLayout
            }
            "Prima" -> {
                primaLayout.visibility = View.VISIBLE
                actualNameView = "Prima"
                actualView = primaLayout
            }
            "Documentos" -> {
                documentLayout.visibility = View.VISIBLE
                actualNameView = "Documentos"
                actualView = documentLayout
            }
            "Siniestros" -> {
                sinisterLayout.visibility = View.VISIBLE
                actualNameView = "Siniestros"
                actualView = sinisterLayout
            }

        }
    }

    private fun showDialog(requestCupon: RequestCuponPrima) {
        val dialog = Dialog(context!!)
        dialog.setCancelable(false)
        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setContentView(R.layout.dialog_recycler)
        val recycler = dialog.findViewById(R.id.cuponRecycler) as RecyclerView
        viewModel.getCuponera(requestCupon)
        recycler.layoutManager = LinearLayoutManager(context)
        recycler.adapter = adapterCupon


        val yesBtn = dialog.findViewById(R.id.closeButton) as ImageView
        yesBtn.setOnClickListener {
            dialog.dismiss()
        }
        dialog.show()
    }
}