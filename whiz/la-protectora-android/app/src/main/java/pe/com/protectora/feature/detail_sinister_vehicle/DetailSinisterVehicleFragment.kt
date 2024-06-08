package pe.com.protectora.feature.detail_sinister_vehicle

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
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_detail_sinister.*
import kotlinx.android.synthetic.main.fragment_detail_sinister.resumeCarrierText
import kotlinx.android.synthetic.main.fragment_detail_sinister.resumeRiskText
import kotlinx.android.synthetic.main.fragment_detail_sinister.tracingRecycler
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter.DocumentAdapter
import pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter.TracingAdapter
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.sinister.DocumentSinisterVehicle
import pe.com.protectora.model.sinister.RequestSinister
import pe.com.protectora.model.sinister.ResumeSinisterVehicle
import pe.com.protectora.model.sinister.TracingSinisterVehicle
import pe.com.protectora.widget.CustomDialog


class DetailSinisterVehicleFragment : Fragment() {

    companion object {
        fun getInstance(): DetailSinisterVehicleFragment = DetailSinisterVehicleFragment()
    }

    private val detailSinisterVehicleViewModel: DetailSinisterVehicleViewModel by viewModel()
    private val tracingAdapter: TracingAdapter by inject()
    private val documentAdapter: DocumentAdapter by inject()

    private var request: RequestSinister? = null

    private var idSinister: Int? = 0
    private var idGroup: Int? = 0

    private var listTracing: MutableList<TracingSinisterVehicle>? = null
    private var newTracingFilterList: MutableList<TracingSinisterVehicle>? = null

    private var listDocument: MutableList<DocumentSinisterVehicle>? = null
    private var newDocumentFilterList: MutableList<DocumentSinisterVehicle>? = null

    private var emptyText = "No se encontraron registros"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_detail_sinister, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        setOnClick()
        setViewModel()
        setRecycler()
        browser()
    }

    private fun initView() {
        idSinister = arguments?.getInt("LOCAL_ID_POLIZA")
        idGroup = arguments?.getInt("type")
        request = RequestSinister(idSinister.toString())
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
        tracingRecycler.layoutManager = LinearLayoutManager(context)
        tracingRecycler.adapter = tracingAdapter

        documentRecycler.layoutManager = LinearLayoutManager(context)
        documentRecycler.adapter = documentAdapter
    }

    private fun setOnClick() {
        detailConstraint.setOnClickListener {
            detailIndicatorView.visibility = View.VISIBLE
            tracingIndicatorView.visibility = View.GONE
            documentIndicatorView.visibility = View.GONE

            tracingLayout.visibility = View.GONE
            resumeLayout.visibility = View.VISIBLE
            documentLayout.visibility = View.GONE

            indicatorCircleDetailView.visibility = View.VISIBLE
            indicatorCircleTracingView.visibility = View.GONE
            indicatorCircleDocView.visibility = View.GONE
        }

        tracingConstraint.setOnClickListener {
            detailIndicatorView.visibility = View.GONE
            tracingIndicatorView.visibility = View.VISIBLE
            documentIndicatorView.visibility = View.GONE

            tracingLayout.visibility = View.VISIBLE
            resumeLayout.visibility = View.GONE
            documentLayout.visibility = View.GONE

            indicatorCircleDetailView.visibility = View.GONE
            indicatorCircleTracingView.visibility = View.VISIBLE
            indicatorCircleDocView.visibility = View.GONE
        }

        docConstraint.setOnClickListener {
            detailIndicatorView.visibility = View.GONE
            tracingIndicatorView.visibility = View.GONE
            documentIndicatorView.visibility = View.VISIBLE

            tracingLayout.visibility = View.GONE
            resumeLayout.visibility = View.GONE
            documentLayout.visibility = View.VISIBLE

            indicatorCircleDetailView.visibility = View.GONE
            indicatorCircleTracingView.visibility = View.GONE
            indicatorCircleDocView.visibility = View.VISIBLE
        }

        documentAdapter.onClick = object : DocumentAdapter.OnClick {
            override fun showDocument(documentSinisterVehicle: DocumentSinisterVehicle) {
                CustomDialog.getInstance(context!!).showLoading()
                if (documentSinisterVehicle.ruta.isNotEmpty() || documentSinisterVehicle.ruta.isNotBlank()) {
                    CustomDialog.getInstance(context!!).hide()

                    val uri = Uri.parse("https://${documentSinisterVehicle.ruta}")
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                } else {
                    CustomDialog.getInstance(context!!)
                        .showMessage("No existen datos")
                }
            }
        }
    }

    private fun browser() {
        tracingBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newTracingFilterList =
                    listTracing?.filter { it.id_ope.toString().contains(sequence) }
                        ?.toMutableList()
                tracingAdapter.listTracing = newTracingFilterList
                tracingAdapter.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

        documentBrowserText.addTextChangedListener(object : TextWatcher {
            override fun onTextChanged(
                sequence: CharSequence, start: Int, before: Int, count: Int
            ) {
                newDocumentFilterList =
                    listDocument?.filter { it.idDocumento.contains(sequence) }
                        ?.toMutableList()
                documentAdapter.listDocument = newDocumentFilterList
                documentAdapter.notifyDataSetChanged()
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}

            override fun afterTextChanged(s: Editable?) {}
        })

    }

    private fun setViewModel() {
        detailSinisterVehicleViewModel.apply {
            showResumeSinisterVehicle.observe(viewLifecycleOwner, observerShowResume())
            showTracingSinisterVehicle.observe(viewLifecycleOwner, observerShowTracing())
            showDocumentSinisterVehicle.observe(viewLifecycleOwner, observerShowDocument())
            errorMessage.observe(viewLifecycleOwner, observerError())
            getResumeSinisterVehicle(request!!)
            getTracingSinisterVehicle(request!!)
            getDocumentSinisterVehicle(request!!)
        }
    }

    private fun observerShowResume() = Observer<ResumeSinisterVehicle> {
        resumeCarrierText.text = it.aseguradora
        resumeCarrierText.setTextColor(Color.parseColor(it.colorAseguradora))
        resumeDateOcuText.text = it.fecha_ocurrencia
        resumeCoberturaText.text = it.cobertura
        resumeRiskText.text = it.riesgo
        resumeDetailText.text = it.detalle
        resumeExpenseText.text = it.perdida
        resumeDeductibleText.text = it.deducible
        resumeAmountText.text = it.indemnizado
        resumePolicyText.text = it.nroPoliza
        resumeSiniestroText.text = it.vc_sini_nombre_ejec
        resumeReceptionText.text = it.fch_recepcion
        resumeIdPolizaText.text = idSinister.toString()
        resumeLastStepText.text = it.descripcion_ultimo_seguimiento
        if (idGroup == 3) {
            resumeLastStepConstraint.visibility = View.GONE
        } else {
            resumeLastStepConstraint.visibility = View.VISIBLE
        }
    }

    private fun observerShowTracing() = Observer<MutableList<TracingSinisterVehicle>> {
        listTracing = it
        tracingAdapter.listTracing = it
        tracingAdapter.notifyDataSetChanged()
        if (it.size == 0) {
            tracingEmptyText.text = emptyText
        }
    }

    private fun observerShowDocument() = Observer<MutableList<DocumentSinisterVehicle>> {
        listDocument = it
        documentAdapter.listDocument = it
        documentAdapter.notifyDataSetChanged()
        if (it.size == 0) {
            documentEmptyText.text = emptyText
        }
    }

    private fun observerError() = Observer<String> {
        CustomDialog.getInstance(context!!).showMessage(it)
    }
}