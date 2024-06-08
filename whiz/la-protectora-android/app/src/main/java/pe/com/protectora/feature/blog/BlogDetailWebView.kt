package pe.com.protectora.feature.blog

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.fragment.app.Fragment
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.fragment_blog_detail_webview.*
import kotlinx.android.synthetic.main.item_blog_category.view.*
import pe.com.protectora.R
import pe.com.protectora.feature.home.HomeActivity
import pe.com.protectora.model.blog.Blog


class BlogDetailWebView : Fragment() {

    companion object {
        fun getInstance(): BlogDetailWebView = BlogDetailWebView()
    }

    private var blog: Blog? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_blog_detail_webview, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        blog = arguments?.getSerializable("blog") as Blog?
        initToolbar()
        val webSettings: WebSettings = webViewBlog.settings
        webViewBlog.webViewClient = object : WebViewClient() {
            override fun onPageCommitVisible(view: WebView?, url: String?) {
                super.onPageCommitVisible(view, url)
                progress_circular_webview.visibility = View.GONE
            }
        }

        webSettings.setAllowFileAccess(true)
        webSettings.setJavaScriptEnabled(true);
        imageFile.visibility = View.GONE
        if (blog!!.type == "video") {
            webViewBlog.loadUrl(blog?.video!!)
            webViewBlog.visibility = View.VISIBLE
        } else if (blog?.type == "file") {
            Log.i("fileSinNADA->", blog?.file!!)
            if (blog?.file?.contains("pdf")!!) {
                Log.i("file->", blog?.getFilePdf()!!)
                webViewBlog.loadUrl(blog?.getFilePdf()!!)
            }
            if (blog?.file?.contains("png")!!) {
                webViewBlog.visibility = View.GONE
                progress_circular_webview.visibility = View.GONE
                imageFile.visibility = View.VISIBLE
                Picasso.get().load(blog?.getFileImage()).into(imageFile)

            }
        } else {
            Log.i("", "")
        }

    }

    private fun initToolbar() {
        activity!!.titleConstraint.visibility = View.VISIBLE
        activity!!.logotype.visibility = View.GONE
        activity!!.titleText.text = blog?.subcategory
        activity!!.backButton.setOnClickListener {
            (activity as HomeActivity?)?.popFragments()
        }
    }
}