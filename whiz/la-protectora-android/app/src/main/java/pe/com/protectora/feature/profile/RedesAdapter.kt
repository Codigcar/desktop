package pe.com.protectora.feature.profile

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.DrawableRes
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_redes.view.*
import pe.com.protectora.R
import pe.com.protectora.model.profile.Data

class RedesAdapter : RecyclerView.Adapter<RedesAdapter.ItemViewHolder>() {

    var listRedes: MutableList<Data>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_redes, parent, false)
        )

    override fun getItemCount(): Int = listRedes?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listRedes?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(red: Data, onClick: OnClick?) = with(itemView) {
            Picasso.get().load(red.rutaImagenRedes).into(iconImage)
            container.setOnClickListener { onClick?.getRed(red) }
        }
    }

    interface OnClick {
        fun getRed(red: Data)
    }
}
