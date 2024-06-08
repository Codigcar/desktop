package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_cupon.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Cupon

class CuponAdapter : RecyclerView.Adapter<CuponAdapter.ItemViewHolder>() {

    var listCupons: MutableList<Cupon>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_cupon, parent, false)
        )

    override fun getItemCount(): Int = listCupons?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listCupons?.get(position)?.let {
            holder.bind(it)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(cupon: Cupon) = with(itemView) {
            stateText.text = cupon.ESTADO
            nroCuponText.text = cupon.NroCupon
            nroText.text = cupon.correlativo
            venciText.text = cupon.fecVencimi2
            cancelText.text = cupon.fecCancela2
            montText.text = "$${cupon.monto}"
        }
    }
}