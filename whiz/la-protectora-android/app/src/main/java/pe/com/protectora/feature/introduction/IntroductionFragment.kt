package pe.com.protectora.feature.introduction

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_introduction.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.home.HomeViewModel
import pe.com.protectora.feature.sos.SosFragment
import pe.com.protectora.model.Introduction
import pe.com.protectora.model.pronostik.EncryptionRequest

class IntroductionFragment : Fragment() {

    companion object {
        fun getInstance(): IntroductionFragment = IntroductionFragment()
    }

    private val viewModel: IntroductionViewModel by viewModel()
    private val homeViewModel: HomeViewModel by viewModel()
    private val adapter: IntroductionAdapter by inject()

    private var link = ""

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_introduction, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initToolbar()
        setViewModel()
        setLink()
        setViewPager()
        setOnClick()
    }


    private fun setLink() {
        homeViewModel.linkPronostik.observe(viewLifecycleOwner) {
            link = it
            Log.d("Introduction", link)
        }
    }

    private fun setViewPager() {
        viewPager.adapter = adapter
    }

    private fun setOnClick() {
        sosButton.setOnClickListener {
            (activity as HomeActivity?)?.pushFragments(
                HomeActivity.TAB_HOME,
                SosFragment.getInstance(),
                true
            )
        }
        adapter.onClickIntroductionAdapter = object : IntroductionAdapter.OnClickWelcomeAdapter {
            override fun onClickCotizarButton() {
                val browserIntent =
                    Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("https:/www.t-aseguro.com")
                    )
                startActivity(browserIntent)
            }

            override fun onClickOrientation() {
                val browserIntent =
                    Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse(link)
                    )
                startActivity(browserIntent)
            }
        }

    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.GONE
        activity?.logotype?.visibility = View.VISIBLE
    }

    private fun setViewModel() {
        viewModel.apply {
            showIntroductionViews.observe(viewLifecycleOwner, observeShowIntroductionData())
            getData()
        }
    }

    private fun observeShowIntroductionData() = Observer<MutableList<Introduction>> {
        adapter.list = it
        adapter.notifyDataSetChanged()
    }
}
