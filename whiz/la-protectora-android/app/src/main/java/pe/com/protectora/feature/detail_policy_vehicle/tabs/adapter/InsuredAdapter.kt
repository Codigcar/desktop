package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_insured.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Client

class InsuredAdapter : RecyclerView.Adapter<InsuredAdapter.ItemViewHolder>() {

    var listInsured: MutableList<Client>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_insured, parent, false)
        )

    override fun getItemCount(): Int = listInsured?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listInsured?.get(position)?.let {
            holder.bind(it)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(client: Client) = with(itemView) {
            titularText.text = client.titular
            clientText.text = client.asegurado
            inclusionDateText.text = client.fecha_inclusion
            dependencieText.text = client.dependiente
            ageText.text = client.edad
        }
    }
}