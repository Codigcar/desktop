package pe.com.protectora.feature.profile

import android.app.Dialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.activity_home.titleText
import kotlinx.android.synthetic.main.dialog_logout.*
import kotlinx.android.synthetic.main.fragment_profile.*
import kotlinx.android.synthetic.main.fragment_profile.nameText
import kotlinx.android.synthetic.main.fragment_sinister_vehicle.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.auth.AuthActivity
import pe.com.protectora.feature.blog.BlogFragment
import pe.com.protectora.feature.callcenter.CallCenterFragment
import pe.com.protectora.feature.executive.ExecutiveFragment
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.profile_personal.PersonalFragment
import pe.com.protectora.feature.sinister.SinisterFragment
import pe.com.protectora.model.profile.Data
import pe.com.protectora.widget.CustomDialog
import pe.com.protectora.widget.replaceFragment

class ProfileFragment : Fragment() {

    companion object {
        fun getInstance(): ProfileFragment = ProfileFragment()
    }

    private val viewModel: ProfileViewModel by viewModel()
    private val adapter: ProfileAdapter by inject()
    private val adapterRedes: RedesAdapter by inject()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initToolbar()
        setViewModel()
        setRecycler()
        setOnClick()
        getInfo()
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.GONE
        activity?.logotype?.visibility = View.VISIBLE
        activity?.titleText?.text = "Datos Personales"
    }

    private fun setOnClick() {
        adapter.onClick = object : ProfileAdapter.OnClick {
            override fun getProfile(profile: Profile) {
                when (profile.title) {
                    "Datos Personales" -> {
                        when (viewModel.getType()) {
                            0 -> {
                                CustomDialog.getInstance(context!!)
                                    .showMessage("Usted aún no es usuario activo de La Protectora.")
                            }
                            1 -> {
                                val b = Bundle()
                                b.putString("navigate", "tab_more")

                                val fragmentReturn = PersonalFragment.getInstance()
                                fragmentReturn.arguments = b

                                (activity as HomeActivity?)?.pushFragments(
                                    HomeActivity.TAB_MORE,
                                    fragmentReturn,
                                    true
                                )
                            }
                        }
                    }
                    "Ejecutivos" -> {
                        when (viewModel.getType()) {
                            0 -> {
                                CustomDialog.getInstance(context!!)
                                    .showMessage("Usted aún no es usuario activo de La Protectora.")
                            }
                            1 -> {
                                (activity as HomeActivity?)?.pushFragments(
                                    HomeActivity.TAB_MORE,
                                    ExecutiveFragment.getInstance(),
                                    true
                                )
                            }
                        }
                    }
                    "Contacto" -> {
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_MORE,
                            CallCenterFragment.getInstance(),
                            true
                        )
                    }
                    "Notificaciones" -> {
                        CustomDialog.getInstance(context!!)
                            .showMessage("El servicio de Notificaciones aún no está disponible")
                    }
                    "Blog Saludable" -> {
                        (activity as HomeActivity?)?.pushFragments(
                            HomeActivity.TAB_MORE,
                            BlogFragment.getInstance(),
                            true
                        )
                    }

                    "Cerrar sesión" -> {
                        showDialog()
                    }
                }
            }
        }

        adapterRedes.onClick = object : RedesAdapter.OnClick {
            override fun getRed(red: Data) {
                val browserIntent =
                    Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse(red.lnkRedes)
                    )
                startActivity(browserIntent)
            }
        }
    }

    private fun setRecycler() {
        tabsRecycler.layoutManager = LinearLayoutManager(context)
        tabsRecycler.adapter = adapter

        redesRecyclerView.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        redesRecyclerView.adapter = adapterRedes

    }

    private fun setViewModel() {
        viewModel.apply {
            listTabs.observe(viewLifecycleOwner, observerListTabs())
            listRedes.observe(viewLifecycleOwner, observerListRedes())
            showProgress.observe(viewLifecycleOwner, observerProgress())
            showProgressRequest.observe(viewLifecycleOwner, observerProgressRequest())
            logout.observe(viewLifecycleOwner, observerLogout())
            getTabs()
            getRedes()
        }
    }

    private fun observerProgressRequest() = Observer<Boolean> {
        if (it) CustomDialog.getInstance(context!!).showLoading()
        else CustomDialog.getInstance(context!!).dismiss()
    }

    private fun observerLogout() = Observer<Boolean> {
        if (it) {
            startActivity(Intent(context!!, AuthActivity::class.java))
            activity?.finish()
        }
    }

    private fun observerProgress() = Observer<Boolean> {
        if (it == false) {
            loaderConstraint.visibility = View.GONE
        }
    }

    private fun observerListRedes() = Observer<MutableList<Data>> {
        adapterRedes.listRedes = it
        adapterRedes.notifyDataSetChanged()
    }

    private fun observerListTabs() = Observer<MutableList<Profile>> {
        adapter.listProfile = it
        adapter.notifyDataSetChanged()
    }

    private fun getInfo() {
        when (viewModel.getType()) {
            0 -> {
                val user = viewModel.getUserTemp()
                nameText.text = user.nombre
                emailText.text = user.email
                initialNameText.text = user.nombre.get(0).toString() +
                        user.apellidos.get(0).toString()
            }
            1 -> {
                val user = viewModel.getUser()
                nameText.text = user.nomCliente
                emailText.text = user.emailCliente
                initialNameText.text = user.nombreCliente.get(0).toString() +
                        user.apePatCliente.get(0).toString()

            }
        }

    }

    fun showDialog() {
        val dialog = Dialog(context!!)
        dialog.setContentView(R.layout.dialog_logout)
        dialog.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        dialog.setCancelable(false)

        dialog.acceptButton.setOnClickListener {
            viewModel.logout()
            dialog.dismiss()
        }

        dialog.cancelButton.setOnClickListener {
            dialog.dismiss()
        }

        dialog.show()
    }
}