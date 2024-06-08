package pe.com.protectora.feature.sos_vehicle

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_sos_vehicle.view.*
import pe.com.protectora.R
import pe.com.protectora.model.sos.SosVehicle

class SosVehicleAdapter : RecyclerView.Adapter<SosVehicleAdapter.ItemViewHolder>() {

    var listTracing: MutableList<SosVehicle>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_sos_vehicle, parent, false)
        )

    override fun getItemCount(): Int = listTracing?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listTracing?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(sos: SosVehicle, onClick: OnClick?) = with(itemView) {
            plaqueText.text = sos.nro_placa
            Picasso.get().load(sos.logoASG2).into(aseguradoraImage)
            view.setOnClickListener { onClick?.getSosVehicle(sos) }
        }
    }

    interface OnClick {
        fun getSosVehicle(sos: SosVehicle)
    }
}