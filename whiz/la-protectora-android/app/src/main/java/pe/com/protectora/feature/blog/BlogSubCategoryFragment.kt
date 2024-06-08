package pe.com.protectora.feature.blog

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
import kotlinx.android.synthetic.main.fragment_blog_sub_category.*
import kotlinx.android.synthetic.main.activity_home.titleText
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.widget.LoaderDialog

class BlogSubCategoryFragment : Fragment() {

    companion object {
        fun getInstance(): BlogSubCategoryFragment = BlogSubCategoryFragment()
    }

    private val viewModel: BlogViewModel by viewModel()
    private val adapter: BlogSubCategoryPostAdapter by inject()

    private var id: String? = ""
    private var name: String? = ""

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(
            R.layout.fragment_blog_sub_category, container, false
        )
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        id = arguments?.getString("id")
        name = arguments?.getString("title")
        adapter.category = arguments?.getString("titleCategory")?:""
        initToolbar()
        initRecycler()
        initViewModel()
        setOnClick()
    }

    private fun setOnClick() {
        adapter.onClick = BlogSubCategoryPostAdapter.OnClick {
            when (it.type) {
                "article" -> {
                    val b = Bundle()
                    b.putSerializable("blog", it)
                    b.putString("titleCategory",name)

                    val fragmentReturn = BlogDetailFragment.getInstance()
                    fragmentReturn.arguments = b

                    (activity as HomeActivity?)?.pushFragments(
                        HomeActivity.TAB_MORE,
                        fragmentReturn,
                        true
                    )
                }
                "video" -> {
                    val b = Bundle()
                    b.putSerializable("blog", it)
                    b.putString("titleCategory",name)

                    val fragmentReturn = BlogDetailWebView.getInstance()
                    fragmentReturn.arguments = b

                    (activity as HomeActivity?)?.pushFragments(
                        HomeActivity.TAB_MORE,
                        fragmentReturn,
                        true
                    )
                }
                "file" -> {
                    val b = Bundle()
                    b.putSerializable("blog", it)
                    b.putString("titleCategory",name)

                    val fragmentReturn = BlogDetailWebView.getInstance()
                    fragmentReturn.arguments = b

                    (activity as HomeActivity?)?.pushFragments(
                        HomeActivity.TAB_MORE,
                        fragmentReturn,
                        true
                    )
                }
            }
        }
    }

    private fun initRecycler() {
        recyclerBlogSubCategory.layoutManager = LinearLayoutManager(context)
        recyclerBlogSubCategory.adapter = adapter
    }

    private fun initViewModel() {
        viewModel.apply {
            listPostxSubCategory.observe(viewLifecycleOwner, observerListSubCategory())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            getPostxSubCategory(id!!)
        }
    }

    private fun observerLoading() = Observer<Boolean> {
        if (it) LoaderDialog.getInstance(context!!).show()
        else LoaderDialog.getInstance(context!!).hide()
    }

    private fun observerListSubCategory() = Observer<List<Blog>> {
        adapter.listBlog = it
        adapter.notifyDataSetChanged()
    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text  = arguments?.getString("titleCategory")
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }

        titleText.text = name
    }
}