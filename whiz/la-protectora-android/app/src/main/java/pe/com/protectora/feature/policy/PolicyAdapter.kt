package pe.com.protectora.feature.policy

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_detail.view.*
import pe.com.protectora.R
import pe.com.protectora.model.Group

class PolicyAdapter : RecyclerView.Adapter<PolicyAdapter.ItemViewHolder>() {

    var listGroups: MutableList<Group>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_detail, parent, false)
        )

    override fun getItemCount(): Int = listGroups?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listGroups?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(group: Group, onClick: OnClick?) = with(itemView) {

            Picasso.get().load(group.rutaImagenGrupoRiesgo).into(policyImage)
            titleText.text = group.grupo_riesgo_ivo
            cardview.setOnClickListener { onClick?.getGroup(group) }

        }
    }

    interface OnClick {
        fun getGroup(group: Group)
    }
}

