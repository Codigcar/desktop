package pe.com.protectora.feature.profile

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.DrawableRes
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.item_profile.view.*
import pe.com.protectora.R

class ProfileAdapter : RecyclerView.Adapter<ProfileAdapter.ItemViewHolder>() {

    var listProfile: MutableList<Profile>? = null
    var onClick: OnClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_profile, parent, false)
        )

    override fun getItemCount(): Int = listProfile?.size ?: 0

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        listProfile?.get(position)?.let {
            holder.bind(it, onClick)
        }
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(profile: Profile, onClick: OnClick?) = with(itemView) {
            iconImage.setImageResource(profile.icon)
            titleText.text = profile.title
            itemConstraint.setOnClickListener { onClick?.getProfile(profile) }
            if (adapterPosition == listProfile?.lastIndex) {
                nextButton.visibility = View.GONE
            }
        }
    }

    interface OnClick {
        fun getProfile(profile: Profile)
    }
}

data class Profile(@DrawableRes val icon: Int, val title: String)