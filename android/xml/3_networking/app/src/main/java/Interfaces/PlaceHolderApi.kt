package Interfaces

import Entities.PostEntity
import retrofit2.Call
import retrofit2.http.GET

interface PlaceHolderApi {

    @GET("posts")
    fun getList(): Call<List<PostEntity>>
}