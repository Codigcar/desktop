package pe.com.protectora.feature.blog

import android.content.res.Resources
import android.os.Bundle
import android.util.DisplayMetrics
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.text.HtmlCompat
import androidx.fragment.app.Fragment
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_blog_detail.*
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.widget.ImageGetterCustom
import pe.com.protectora.widget.ListTagHandler


class BlogDetailFragment : Fragment() {

    companion object {
        fun getInstance(): BlogDetailFragment = BlogDetailFragment()
    }

    private var blog: Blog? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_blog_detail, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initView()
        initToolbar()
        initBanner()
    }

    private fun initBanner() {
        guideLineBanner.setGuidelineBegin((getScreenWidth() / 1.7).toInt())
    }

    fun getScreenWidth(): Int {
        return Resources.getSystem().displayMetrics.widthPixels
    }

    private fun initView() {
        blog = arguments?.getSerializable("blog") as Blog?
        val imageGetter = ImageGetterCustom(resources, textFormBlog)
        blog?.let {
            Picasso.get().load(it.getImageMain()).into(imageCoverBlog)
            textDateBlog.text = it.created_at
            textTitle.text = it.title
            textFormBlog.text = HtmlCompat.fromHtml(
                it.long_text, HtmlCompat.FROM_HTML_MODE_LEGACY,
                imageGetter, ListTagHandler()
            )

        }

    }

    private fun initToolbar() {
        activity?.titleConstraint?.visibility = View.VISIBLE
        activity?.logotype?.visibility = View.GONE
        activity?.titleText?.text = blog?.subcategory
        activity?.backButton?.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }


}