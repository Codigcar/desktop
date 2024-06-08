package pe.com.protectora.feature.executive.risk

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_executive.view.*
import kotlinx.android.synthetic.main.item_executive_icon.view.*
import pe.com.protectora.R
import pe.com.protectora.model.executive.Data
import pe.com.protectora.model.executive.Executive

class ExecutiveIconAdapter : RecyclerView.Adapter<ExecutiveIconAdapter.ItemViewHolder>() {

    var executiveList: MutableList<Data>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_executive_icon, parent, false)
        )

    override fun getItemCount(): Int = executiveList?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        executiveList?.get(position)?.let {
            holder.bind(it)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(executive: Data) = with(itemView) {
            if (executive.RutaImagenRiesgo != "") {
                Picasso.get().load(executive.RutaImagenRiesgo).into(iconImage)
            }
        }
    }

}




