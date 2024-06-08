package pe.com.protectora.feature.blog

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.activity_home.titleText
import kotlinx.android.synthetic.main.fragment_blog_category_detail.*
import kotlinx.android.synthetic.main.fragment_policies_vehicle.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.model.blog.SubCategory
import pe.com.protectora.widget.LoaderDialog
import pe.com.protectora.widget.onEndless
import java.util.*

class BlogCategoryDetailFragment : Fragment() {

    companion object {
        fun getInstance(): BlogCategoryDetailFragment = BlogCategoryDetailFragment()
    }

    private val subCategoriesAdapter: BlogSubCategoryAdapter by inject()
    private val newsAdapter: BlogNewsSubCategoryAdapter by inject()

    private val viewModel: BlogViewModel by viewModel()

    private var id: String? = ""
    private var name: String? = ""

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_blog_category_detail, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        id = arguments!!.getString("id")
        name = arguments!!.getString("title")
        initToolbar()
        initRecycler()
        initViewModel()
        setOnClick()
    }

    private fun initViewModel() {
        viewModel.apply {
            listSubCategoryBlog.observe(viewLifecycleOwner, observerListSubCategories())
            listRecentPostSubCategory.observe(viewLifecycleOwner, observerListRecenteSubCategory())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            getSubCategories(id!!)
            getRecentPostCategory(id!!)
        }
    }

    private fun observerLoading() = Observer<Boolean> {
        if (it) LoaderDialog.getInstance(context!!).show()
        else LoaderDialog.getInstance(context!!).hide()
    }

    private fun observerListSubCategories() = Observer<List<SubCategory>> {
        subCategoriesAdapter.listBlogSubCategory = it.filter { it.posts > 0 }
        subCategoriesAdapter.notifyDataSetChanged()
    }

    private fun observerListRecenteSubCategory() = Observer<List<Blog>> {
        newsAdapter.addPost(it.toMutableList())
    }

    private fun initRecycler() {
        recyclerSubCategory.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        recyclerSubCategory.adapter = subCategoriesAdapter

        recyclerNews.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
        recyclerNews.adapter = newsAdapter

        nestedSubCategory.onEndless {
            viewModel.getRecentPostCategory(id!!)
        }
    }

    private fun setOnClick() {
        subCategoriesAdapter.onClick = BlogSubCategoryAdapter.OnClick {
            val b = Bundle()
            b.putString("id", it.id.toString())
            b.putString("title", it.name)
            b.putString("titleCategory", name)

            val fragment = BlogSubCategoryFragment.getInstance()
            fragment.arguments = b

            (activity as HomeActivity?)?.pushFragments(
                HomeActivity.TAB_MORE,
                fragment,
                true
            )
        }

        newsAdapter.onClick = BlogNewsSubCategoryAdapter.OnClick {
            when (it.type) {
                "article" -> {
                    val b = Bundle()
                    b.putSerializable("blog", it)
                    b.putString("titleCategory", name)

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
                    b.putString("titleCategory", name)

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
                    b.putString("titleCategory", name)

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

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = "Blog Saludable"
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }

        titleText.text = name
    }
}