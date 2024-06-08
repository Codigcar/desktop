package pe.com.protectora.feature.policy_vehicle

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_policies_vehicle.view.*
import pe.com.protectora.R
import pe.com.protectora.model.policy_car.PolicyCar


class PolicyVehicleAdapter : RecyclerView.Adapter<PolicyVehicleAdapter.ItemPolicyCar>() {

    var listPoliciesCar: MutableList<PolicyCar>? = null
    var onClick: OnClick? = null
    var idGroup = 4

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemPolicyCar =
        ItemPolicyCar(
            LayoutInflater.from(parent.context).inflate(R.layout.item_policies_vehicle, parent, false)
        )

    override fun getItemCount(): Int = listPoliciesCar?.size ?: 0

    override fun onBindViewHolder(holder: ItemPolicyCar, position: Int) {
        listPoliciesCar?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    inner class ItemPolicyCar(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(policyCar: PolicyCar, onClick: OnClick?) = with(itemView) {
            val car: List<String> = if (policyCar.detalle != null) {
                policyCar.detalle.split(" ")
            } else {
                mutableListOf("Sin Modelo", "")
            }

            when(idGroup){
                1 -> {vehicleConstraint.visibility=View.GONE}
                2 -> {vehicleConstraint.visibility=View.GONE}
                3 -> {vehicleConstraint.visibility=View.VISIBLE}
            }

            nroPolicyText.text = "N. Póliza : ${policyCar.NroPoliza}"
            carrierText.text = policyCar.ASEGURADORA
            rageText.text = policyCar.nombre_riesgo
            stateText.text = policyCar.ESTADO
            carrierText.setTextColor(Color.parseColor(policyCar.colorAseguradora))
            detailText.text = car[0]
            officialNameText.text = policyCar.nombre_corto_funcionario
            cellphoneOfficialText.text = policyCar.telefono_funcionario
            policyContainer.setOnClickListener { onClick?.navigateDetail(policyCar) }
        }
    }

    interface OnClick {
        fun navigateDetail(policyCar: PolicyCar)
    }
}