package com.example.myapplication.myapplication.networking

import Entities.PostEntity
import Interfaces.PlaceHolderApi
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class MainActivity : AppCompatActivity() {

    lateinit var postService: PlaceHolderApi

    private fun getList() {
        postService.getList().enqueue(object:Callback<List<PostEntity>>{
                override fun onResponse(call: Call<List<PostEntity>>, response: Response<List<PostEntity>>) {
                    val txtTitle = findViewById<TextView>(R.id.txtTitle)

                    val getUsers = response.body()
                    if (getUsers != null) {
                       for (user in getUsers) {
                           var texto:String = ""
                           texto += ("Id: ${user.id} \n")
                           texto += ("Title: ${user.title} \n")
                           texto += ("Body: ${user.body} \n\n")
                           txtTitle.append(texto)
                       }
                    }
                }

                override fun onFailure(call: Call<List<PostEntity>>, t: Throwable) {
                    t?.printStackTrace()
                }
            }
        )
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val retrofit = Retrofit.Builder()
            .baseUrl("https://jsonplaceholder.typicode.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        postService = retrofit.create<PlaceHolderApi>(PlaceHolderApi::class.java)

        getList()

    }


}