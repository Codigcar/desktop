package pe.com.protectora.feature.sos

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_emergency.view.*
import pe.com.protectora.R

class SosAdapter : RecyclerView.Adapter<SosAdapter.ItemViewHolder>() {

    var listSos: MutableList<Sos>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_emergency, parent, false)
        )

    override fun getItemCount(): Int = listSos?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listSos?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(sos: Sos, onClick: OnClick?) = with(itemView) {
            indicatorImage.setImageResource(sos.image)
            titleText.text = sos.title
            descriptionText.text = sos.description
            when (sos.type) {
                0 -> {
                    cellphoneBtn.visibility = View.GONE
                    nextBtn.visibility = View.VISIBLE
                }
                1 -> {
                    cellphoneBtn.visibility = View.VISIBLE
                    nextBtn.visibility = View.GONE
                }
                           }
            itemConstraint.setOnClickListener { onClick?.getSos(sos) }
        }
    }

    interface OnClick {
        fun getSos(sos: Sos)
    }
}

data class Sos(
    var image: Int,
    var title: String,
    var description: String,
    var type: Int,
    var number: String
)
