package pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_sinister_vehicle_document.view.*
import pe.com.protectora.R
import pe.com.protectora.model.sinister.DocumentSinisterVehicle

class DocumentAdapter : RecyclerView.Adapter<DocumentAdapter.ItemViewHolder>() {

    var listDocument: MutableList<DocumentSinisterVehicle>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_sinister_vehicle_document, parent, false)
        )

    override fun getItemCount(): Int = listDocument?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listDocument?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(documentSinisterVehicle: DocumentSinisterVehicle, onClick: OnClick?) = with(itemView) {
            nroDocText.text = documentSinisterVehicle.idDocumento.toString()
            typeText.text = documentSinisterVehicle.VALTIP
            nameRouteText.text = documentSinisterVehicle.nombre_archivo
            documentButton.setOnClickListener { onClick?.showDocument(documentSinisterVehicle) }
        }
    }

    interface OnClick {
        fun showDocument(documentSinisterVehicle: DocumentSinisterVehicle)
    }
}