package pe.com.protectora.feature.blog

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_blog_category.view.*

import pe.com.protectora.R
import pe.com.protectora.model.blog.SubCategory

class BlogSubCategoryAdapter : RecyclerView.Adapter<BlogSubCategoryAdapter.ViewHolder>() {

    var listBlogSubCategory: List<SubCategory>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_blog_category, parent, false)
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        listBlogSubCategory?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    override fun getItemCount(): Int = listBlogSubCategory?.size ?: 0

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(subCategory: SubCategory, onClick: OnClick?) = with(itemView) {
            setOnClickListener { onClick?.goToDetail(subCategory) }
            textTitle.text = subCategory.name
            textPost.text = "${subCategory.posts} posts"
            Picasso.get().load(subCategory.getImageCard()).into(imageCategory)
        }
    }

    fun interface OnClick {
        fun goToDetail(subCategory: SubCategory)
    }
}