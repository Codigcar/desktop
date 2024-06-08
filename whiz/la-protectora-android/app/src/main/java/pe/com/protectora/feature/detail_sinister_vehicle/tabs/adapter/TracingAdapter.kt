package pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_car.view.*
import kotlinx.android.synthetic.main.item_policies_vehicle_car.view.stateText
import kotlinx.android.synthetic.main.item_sinister_vehicle_tracing.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Vehicle
import pe.com.protectora.model.sinister.TracingSinisterVehicle

class TracingAdapter : RecyclerView.Adapter<TracingAdapter.ItemViewHolder>() {

    var listTracing: MutableList<TracingSinisterVehicle>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_sinister_vehicle_tracing, parent, false)
        )

    override fun getItemCount(): Int = listTracing?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listTracing?.get(position)?.let {
            holder.bind(it)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(tracingSinisterVehicle: TracingSinisterVehicle) = with(itemView) {

            val fech_reg = tracingSinisterVehicle.fch_reg_fch_res.split("||")
            stateText.text = tracingSinisterVehicle.estado
            nrTracingText.text = tracingSinisterVehicle.id_ope.toString()
            dateActivityText.text = tracingSinisterVehicle.fch_act
            dateRegisterText.text = fech_reg.get(0)
            ejectText.text = tracingSinisterVehicle.ejecutivo
            descriptionText.text = tracingSinisterVehicle.descripcion
        }
    }
}