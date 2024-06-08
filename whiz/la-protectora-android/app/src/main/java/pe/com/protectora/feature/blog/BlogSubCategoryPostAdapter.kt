package pe.com.protectora.feature.blog

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_blog_detail.view.*
import pe.com.protectora.R
import pe.com.protectora.model.blog.Blog

class BlogSubCategoryPostAdapter : RecyclerView.Adapter<BlogSubCategoryPostAdapter.ViewHolder>() {

    var listBlog: List<Blog>? = null
    var onClick: OnClick? = null
    var category:String = ""

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_blog_detail, parent, false)
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
            textTitle.text = blog.title
            textDescription.text = blog.category
            textDateBlog.text = blog.created_at
            textSubCategory.text = blog.subcategory
            Picasso.get().load(blog.getImageMain()).into(imagePost)
            setOnClickListener { onClick?.goToDetail(blog) }
        }
    }

    fun interface OnClick {
        fun goToDetail(blog: Blog)
    }
}