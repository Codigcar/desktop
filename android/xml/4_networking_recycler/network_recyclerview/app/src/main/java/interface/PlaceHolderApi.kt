package `interface`

import entities.UserEntity
import retrofit2.Call
import retrofit2.http.GET

interface PlaceHolderApi {
    @GET("listado.php")
    fun getUserList():Call<List<UserEntity>>
}