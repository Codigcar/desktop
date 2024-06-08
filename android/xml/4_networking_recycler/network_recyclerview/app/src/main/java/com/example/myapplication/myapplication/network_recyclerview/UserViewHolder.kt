package com.example.myapplication.myapplication.network_recyclerview

import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import entities.UserEntity

class UserViewHolder(view: View): RecyclerView.ViewHolder(view) {

    val userImg = view.findViewById<ImageView>(R.id.imgUser)
    val txtName = view.findViewById<TextView>(R.id.txtName)
    val txtCode = view.findViewById<TextView>(R.id.txtCode)
    val txtEmail = view.findViewById<TextView>(R.id.txtEmail)

    fun render(user: UserEntity){
        txtName.text = user.nombre
        txtCode.text = user.codigo
        txtEmail.text = user.correo
        Picasso.get().load(user.foto)
            .resize(250,250)
            .centerCrop()
            .into(userImg)
    }
}