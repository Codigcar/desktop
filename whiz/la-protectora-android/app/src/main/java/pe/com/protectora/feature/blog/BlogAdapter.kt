package pe.com.protectora.feature.blog

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_blog.view.*
import pe.com.protectora.R
import pe.com.protectora.model.blog.Blog

class BlogAdapter : RecyclerView.Adapter<BlogAdapter.ViewHolder>() {

    var listBlog: List<Blog>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_blog, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        listBlog?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    override fun getItemCount(): Int = listBlog?.size ?: 0

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(blog: Blog, onClick: OnClick?) = with(itemView) {
            setOnClickListener { onClick?.goToDetail(blog) }
            textTitle.text = blog.title
            textCategory.text = blog.category
            textSubCategory.text = blog.subcategory
            Picasso.get().load(blog.getImageBack()).into(imageBackgroundBlog)
        }
    }

    fun interface OnClick {
        fun goToDetail(blog: Blog)
    }
}