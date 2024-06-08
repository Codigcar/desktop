package pe.com.protectora.feature.sinister_vehicle

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_sinister_vehicle.view.*
import pe.com.protectora.R
import pe.com.protectora.model.sinister.SinisterVehicle

class SinisterVehicleAdapter : RecyclerView.Adapter<SinisterVehicleAdapter.ItemViewHolder>() {

    var listSinisterVehicle: MutableList<SinisterVehicle>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_sinister_vehicle, parent, false)
        )

    override fun getItemCount(): Int = listSinisterVehicle?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listSinisterVehicle?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(sinisterVehicle: SinisterVehicle, onClick: OnClick?) = with(itemView) {
            val date = sinisterVehicle.fechaOcurrencia.split("T")
            nroSinisterText.text = "N. Siniestro : ${sinisterVehicle.SiniestroLP}"
            carrierText.text = sinisterVehicle.Aseguradora
            carrierText.setTextColor(Color.parseColor(sinisterVehicle.colorAseguradora))
            stateText.text = sinisterVehicle.ESTADOSINI
            expirationText.text = "${date[0]}"
            riesgoText.text = sinisterVehicle.riesgo
            officialNameText.text = sinisterVehicle.EjecutivoSiniestro
            cellphoneOfficialText.text = sinisterVehicle.telefonoEjecutivoSiniestro
            sinisterContainer.setOnClickListener { onClick?.getSinisterVehicle(sinisterVehicle) }
        }
    }

    interface OnClick {
        fun getSinisterVehicle(sinisterVehicle: SinisterVehicle)
    }
}