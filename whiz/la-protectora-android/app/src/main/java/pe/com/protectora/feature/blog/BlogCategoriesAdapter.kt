package pe.com.protectora.feature.blog

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_blog_category.view.*
import pe.com.protectora.R
import pe.com.protectora.model.blog.CategoryBlog

class BlogCategoriesAdapter : RecyclerView.Adapter<BlogCategoriesAdapter.ViewHolder>() {

    var onClick: OnClick? = null
    var listCategoryBlog: List<CategoryBlog>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_blog_category, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        listCategoryBlog?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    override fun getItemCount(): Int = listCategoryBlog?.size ?: 0

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(categoryBlog: CategoryBlog, onClick: OnClick?) = with(itemView) {
            viewContainer.setOnClickListener { onClick?.goToDetail(categoryBlog) }
            textTitle.text = categoryBlog.name
            textPost.text = "${categoryBlog.posts} posts"
            Picasso.get().load(categoryBlog.getImageUrl()).into(imageCategory)
            if (categoryBlog.posts < 1) {
                viewContainer.visibility = View.GONE
            }
        }
    }

    fun interface OnClick {
        fun goToDetail(categoryBlog: CategoryBlog)
    }

}