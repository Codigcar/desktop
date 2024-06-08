package pe.com.protectora.feature.soscall

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_sos_cellphone.view.*
import pe.com.protectora.R
import pe.com.protectora.model.sos.Cellphone

class SosCallAdapter : RecyclerView.Adapter<SosCallAdapter.ItemViewHolder>() {

    var listCellphone: MutableList<Cellphone>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.item_sos_cellphone, parent, false)
        )

    override fun getItemCount(): Int = listCellphone?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listCellphone?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(cellphone: Cellphone, onClick: OnClick?) = with(itemView) {
            Picasso.get().load(cellphone.imagenRutaTipoSiniestro).into(cellphoneImage)
            nameSos.text = cellphone.nombreTipoSiniestro
            buttonCall.setOnClickListener { onClick?.getCellPhone(cellphone) }
        }
    }

    interface OnClick {
        fun getCellPhone(cellphone: Cellphone)
    }
}