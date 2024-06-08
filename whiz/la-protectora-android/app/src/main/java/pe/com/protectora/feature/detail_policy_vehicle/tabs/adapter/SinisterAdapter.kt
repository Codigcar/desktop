package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_detail.view.*
import kotlinx.android.synthetic.main.item_policies_vehicle_sinister.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Sinister

class SinisterAdapter : RecyclerView.Adapter<SinisterAdapter.ItemViewHolder>() {

    var listSinister: MutableList<Sinister>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_sinister, parent, false)
        )

    override fun getItemCount(): Int = listSinister?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listSinister?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(sinister: Sinister, onClick: OnClick?) = with(itemView) {
            nroSiniText.text = sinister.Siniestro.toString()
            typeText.text = sinister.tiposiniestro
            stateText.text = sinister.ESTADO
            Picasso.get().load(sinister.logoASG).into(carrierImage)
            dateText.text = sinister.FECOCU
            documentButton.setOnClickListener { onClick?.getSinister(sinister) }
        }
    }

    interface OnClick {
        fun getSinister(sinister: Sinister)
    }
}