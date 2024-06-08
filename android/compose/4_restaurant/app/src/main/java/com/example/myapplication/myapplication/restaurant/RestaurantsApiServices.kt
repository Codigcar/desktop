package com.example.myapplication.myapplication.restaurant

import retrofit2.http.GET
import retrofit2.Call

interface RestaurantsApiServices {
    @GET("restaurants.json")
    suspend fun getRestaurants(): List<Restaurant>
}
