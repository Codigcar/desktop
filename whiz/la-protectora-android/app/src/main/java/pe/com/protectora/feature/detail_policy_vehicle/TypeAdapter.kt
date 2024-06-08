package pe.com.protectora.feature.detail_policy_vehicle

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_vehicle_detail.view.*
import pe.com.protectora.R

class TypeAdapter : RecyclerView.Adapter<TypeAdapter.ItemViewHolder>() {

    var listType: MutableList<Type>? = null
    var onClick: OnClick? = null
    var selectPosition = 0

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_vehicle_detail, parent, false)
        )

    override fun getItemCount(): Int = listType?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listType?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(type: Type, onClick: OnClick?) = with(itemView) {
            itemImage.setBackgroundResource(type.image)
            titleText.text = type.title

            if (selectPosition == adapterPosition) {
                indicatorView.visibility = View.VISIBLE
                indicatorCircleView.visibility= View.VISIBLE
            } else {
                indicatorView.visibility = View.GONE
                indicatorCircleView.visibility=View.GONE
            }

            categoryContainer.setOnClickListener {
                onClick?.getType(type)
                if (selectPosition >= 0) notifyItemChanged(selectPosition)
                selectPosition = adapterPosition
                notifyItemChanged(selectPosition)
            }
        }
    }

    interface OnClick {
        fun getType(type: Type)
    }
}

data class Type(val image: Int, val title: String)