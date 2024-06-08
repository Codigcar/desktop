package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_endorsements.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Endorsements

class EndorsementAdapter : RecyclerView.Adapter<EndorsementAdapter.ItemViewHolder>() {

    var listEndorsements: MutableList<Endorsements>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_endorsements, parent, false)
        )

    override fun getItemCount(): Int = listEndorsements?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listEndorsements?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(endorsements: Endorsements, onClick: OnClick?) = with(itemView) {
            val date = endorsements.vigencia!!.split("-")
            nroEndorText.text = endorsements.nro_endoso
            liquidText.text = endorsements.nro_liquidacion
            fromDateText.text = date[0]
            toDateText.text = date[1]
            detailText.text = endorsements.detalle
            endorsementsButton.setOnClickListener { onClick?.showEndorsement(endorsements) }
        }
    }

    interface OnClick {
        fun showEndorsement(endorsements: Endorsements)
    }
}