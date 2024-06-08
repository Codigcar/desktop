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
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_blog.*
import org.koin.android.ext.android.inject
import org.koin.android.viewmodel.ext.android.viewModel
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.feature.policy_vehicle.PolicyVehicleFragment
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.model.blog.CategoryBlog
import pe.com.protectora.widget.CustomDialog
import pe.com.protectora.widget.LoaderDialog
import pe.com.protectora.widget.onEndless

class BlogFragment : Fragment() {

    companion object {
        fun getInstance(): BlogFragment = BlogFragment()
    }

    private val blogAdapter: BlogAdapter by inject()
    private val categoriesAdapter: BlogCategoriesAdapter by inject()
    private val newsAdapter: BlogNewsAdapter by inject()

    private val viewModel: BlogViewModel by viewModel()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_blog, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initViewModel()
        initToolbar()
        initRecycler()
        setOnClick()
    }

    private fun initViewModel() {
        viewModel.apply {
            listBlog.observe(viewLifecycleOwner, observerListBlog())
            listCategoryBlog.observe(viewLifecycleOwner, observerCategoryBlog())
            listRecentPost.observe(viewLifecycleOwner, observerRecentPost())
            showLoading.observe(viewLifecycleOwner, observerLoading())
            getPostTop()
            getCategories()
            getRecentPost()
        }
    }

    private fun observerLoading() = Observer<Boolean> {
        if (it) LoaderDialog.getInstance(context!!).show()
        else LoaderDialog.getInstance(context!!).hide()
    }

    private fun observerRecentPost() = Observer<List<Blog>> {
        newsAdapter.addPost(it.toMutableList())
    }

    private fun observerListBlog() = Observer<List<Blog>> {
        blogAdapter.listBlog = it
        blogAdapter.notifyDataSetChanged()
    }

    private fun observerCategoryBlog() = Observer<List<CategoryBlog>> {
        categoriesAdapter.listCategoryBlog = it.filter { it.posts > 0 }
        categoriesAdapter.notifyDataSetChanged()
    }

    private fun initRecycler() {
        recyclerBlog.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        recyclerBlog.adapter = blogAdapter

        recyclerCategories.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        recyclerCategories.adapter = categoriesAdapter

        recyclerNews.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
        recyclerNews.adapter = newsAdapter

        nestedBlog.onEndless {
            viewModel.getRecentPost()
        }

    }

    private fun setOnClick() {
        categoriesAdapter.onClick = BlogCategoriesAdapter.OnClick {
            val b = Bundle()
            b.putString("id", it.id.toString())
            b.putString("title", it.name)


            val fragmentReturn = BlogCategoryDetailFragment.getInstance()
            fragmentReturn.arguments = b

            (activity as HomeActivity?)?.pushFragments(
                HomeActivity.TAB_MORE,
                fragmentReturn,
                true
            )
        }

        blogAdapter.onClick = BlogAdapter.OnClick {
            val b = Bundle()
            b.putSerializable("blog", it)
            b.putSerializable("titleCategory", it.subcategory)

            val fragmentReturn = BlogDetailFragment.getInstance()
            fragmentReturn.arguments = b

            (activity as HomeActivity?)?.pushFragments(
                HomeActivity.TAB_MORE,
                fragmentReturn,
                true
            )
        }

        newsAdapter.onClick = BlogNewsAdapter.OnClick {
            when (it.type) {
                "article" -> {
                    val b = Bundle()
                    b.putSerializable("blog", it)
                    b.putString("titleCategory", "Blog Saludable")

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
                    b.putString("titleCategory", "Blog Saludable")
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
                    b.putString("titleCategory", "Blog Saludable")
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
    }
}