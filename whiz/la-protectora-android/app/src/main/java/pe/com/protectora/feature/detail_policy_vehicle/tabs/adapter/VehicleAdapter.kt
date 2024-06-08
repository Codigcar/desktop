package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_car.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Vehicle

class VehicleAdapter : RecyclerView.Adapter<VehicleAdapter.ItemViewHolder>() {

    var listVehicles: MutableList<Vehicle>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_car, parent, false)
        )

    override fun getItemCount(): Int = listVehicles?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listVehicles?.get(position)?.let {
            holder.bind(it)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(vehicle: Vehicle) = with(itemView) {
            plaqueText.text = vehicle.placa
            clientText.text = vehicle.nombre_cliente
            classText.text = vehicle.clase
            marqueText.text = vehicle.marca
            modeText.text = vehicle.modelo
            anioText.text = vehicle.anio
        }
    }
}