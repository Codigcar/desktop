package com.example.myapplication.myapplication.network_recyclerview

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import entities.UserEntity

class Adapter(val userList: List<UserEntity>): RecyclerView.Adapter<UserViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        /* hidratar la data */
        val layoutInflater = LayoutInflater.from(parent.context)
        return UserViewHolder(layoutInflater.inflate(R.layout.item,parent, false))
    }

    override fun getItemCount(): Int {
        /* return cantidad de elementos */
        /* ver cantidad de elementos que tiene el recycler */
        return userList.size
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        /* lo que se hará por cada item del listado */
        /* llenar con datos cada uno de los layouts generados */
        val item = userList[position]
        holder.render(item)
    }
}