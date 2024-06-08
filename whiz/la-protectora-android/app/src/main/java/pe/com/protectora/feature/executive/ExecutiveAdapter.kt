package pe.com.protectora.feature.executive

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.item_executive.view.*
import pe.com.protectora.R
import pe.com.protectora.feature.executive.risk.ExecutiveIconAdapter
import pe.com.protectora.model.executive.Data
import pe.com.protectora.model.executive.Executive


class ExecutiveAdapter(
    private val executiveIconAdapter: ExecutiveIconAdapter
) : RecyclerView.Adapter<ExecutiveAdapter.ItemViewHolder>() {

    var executiveList: MutableList<Executive>? = null
    var iconList: MutableList<Data>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_executive, parent, false)
        )

    override fun getItemCount(): Int = executiveList?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        executiveList?.get(position)?.let {
            holder.bind(it)
        }
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(executive: Executive) = with(itemView) {
            nameText.text = executive.nombreEjecutivo
            positionText.text = executive.cargoEjecutivo
            cellphoneText.text = executive.celularEjecutivo
            telfText.text = executive.telefonoEjecutivo
            emailText.text = executive.correoEjecutivo
            Picasso.get().load(executive.rutaLogoEjecutivo).into(profileImage)

            iconRecycler.layoutManager =
                LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)

            val list = mutableListOf<Data>()
            if (executive.imagenesRiesgosEjecutivos != null) {
                val listIcon = executive.imagenesRiesgosEjecutivos?.split(",")
                for ((index, value) in listIcon!!.withIndex()) {
                    list.add(Data(value, index, ""))
                }
                if (list.size != 1) {
                    executiveIconAdapter.executiveList = list
                    iconRecycler.adapter = executiveIconAdapter
                }

            }

            emailConstraint.setOnClickListener {
                val intent =
                    Intent(Intent.ACTION_VIEW, Uri.parse("mailto:" + executive.correoEjecutivo))
                context.startActivity(intent)
            }

            cellphoneConstraint.setOnClickListener {
                val i = Intent(Intent.ACTION_CALL)
                i.data = Uri.parse("tel:" + executive.celularEjecutivo)
                if (ActivityCompat.checkSelfPermission(
                        context!!,
                        Manifest.permission.CALL_PHONE
                    ) == PackageManager.PERMISSION_GRANTED
                ) {
                    context.startActivity(i)
                }
            }

            if (executive.celularEjecutivo.equals("") || executive.celularEjecutivo == null){
                cellphoneConstraint.visibility = View.GONE
            }

            if (executive.telefonoEjecutivo.equals("") || executive.telefonoEjecutivo == null){
                telefonoConstraint.visibility = View.GONE
            }

        }
    }
}