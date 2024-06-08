package com.example.myapplication.myapplication.network_recyclerview

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import entities.UserEntity
import `interface`.PlaceHolderApi
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class MainActivity : AppCompatActivity() {

    lateinit var service: PlaceHolderApi

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val retrofit = Retrofit.Builder()
            .baseUrl("https://dev.formandocodigo.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        service = retrofit.create<PlaceHolderApi>(PlaceHolderApi::class.java)

        getList()
    }

    private fun getList(){
        service.getUserList().enqueue(object: Callback<List<UserEntity>>{
            override fun onResponse(call: Call<List<UserEntity>>, response: Response<List<UserEntity>>) {
                val getUserList = response.body()
                var usersList = mutableListOf<UserEntity>()
                if (getUserList != null) {
                   for ( userItem in getUserList) {
                       usersList.add(
                           UserEntity(
                               userItem.codigo,
                               userItem.nombre,
                               userItem.edad,
                               userItem.correo,
                               userItem.pass,
                               userItem.foto
                           )
                       )
                    }
                    val recycler = findViewById<RecyclerView>(R.id.recyclerUserList)
                    recycler.layoutManager = LinearLayoutManager(applicationContext)
                    recycler.adapter = Adapter(usersList)
                }

            }

            override fun onFailure(call: Call<List<UserEntity>>, t: Throwable) {
                t?.printStackTrace()
            }

        })
    }
}