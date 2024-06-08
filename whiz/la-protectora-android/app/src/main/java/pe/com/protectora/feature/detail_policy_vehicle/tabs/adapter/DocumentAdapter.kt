package pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle_document.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car_detail.Document

class DocumentAdapter : RecyclerView.Adapter<DocumentAdapter.ItemViewHolder>() {

    var listDocument: MutableList<Document>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle_document, parent, false)
        )

    override fun getItemCount(): Int = listDocument?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listDocument?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(document: Document, onClick: OnClick?) = with(itemView) {
            nroDocText.text = document.idDocumento
            typeText.text = document.VALTIP
            fileText.text = document.nombre_archivo
            documentButton.setOnClickListener { onClick?.showDocument(document) }
        }
    }

    interface OnClick {
        fun showDocument(document: Document)
    }
}