package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_prima.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Prima

class PrimaAdapter : RecyclerView.Adapter<PrimaAdapter.ItemViewHolder>() {

    var listPrima: MutableList<Prima>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_prima, parent, false)
        )

    override fun getItemCount(): Int = listPrima?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listPrima?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(prima: Prima, onClick: OnClick?) = with(itemView) {
            val date = prima.FECVIG!!.split("-")
            nroPrimaText.text = prima.DocumentoPrima
            carrierText.text = prima.aseguradora
            riskText.text = prima.riesgo
            fromDateText.text = "de ${date[0]}"
            toDateText.text = "al ${date[1]} "
            priceText.text = prima.prima_total
            primaButton.setOnClickListener { onClick?.getCupon(prima) }
        }
    }

    interface OnClick {
        fun getCupon(prima: Prima)
    }
}