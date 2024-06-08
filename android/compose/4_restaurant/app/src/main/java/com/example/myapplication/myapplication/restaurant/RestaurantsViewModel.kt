package com.example.myapplication.myapplication.restaurant

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RestaurantsViewModel(private val stateHandle: SavedStateHandle): ViewModel() {

    private lateinit var restInterface: RestaurantsApiServices
    private lateinit var restaurantsCall: Call<List<Restaurant>>
    private val errorHandler = CoroutineExceptionHandler{ _, exception ->
        exception.printStackTrace()
    }

    // TODO-> inicializar el valor con la lista dummy
    //val state = mutableStateOf(dummyRestaurant)

    // TODO-> inicializar el valor con la lista vacia
    val state = mutableStateOf(emptyList<Restaurant>())

    init {
        instanceRetrofit()
        Log.d("hello", "hola como estas?")

    }

    fun instanceRetrofit() {
        val retrofit: Retrofit = Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl("https://restaurant-jetpack-default-rtdb.firebaseio.com/")
            .build()

        restInterface = retrofit.create(RestaurantsApiServices::class.java)
        getRestaurantsByAPI()
    }

    fun getRestaunts() = dummyRestaurant
    private fun getRestaurantsByAPI() {
        /*restInterface.getRestaurants().execute().body()?.let {
            restaurants -> state.value = restaurants
        }*/

        /*
        TODO -> config with Retrofit and Retrofit.Call
        */
        /*
        restaurantsCall = restInterface.getRestaurants()
        restaurantsCall.enqueue(
            object: Callback<List<Restaurant>> {
                override fun onResponse(call: Call<List<Restaurant>>, response: Response<List<Restaurant>>) {
                    response.body()?.let {
                        restaurants -> state.value = restaurants
                    }
                }

                override fun onFailure(call: Call<List<Restaurant>>, t: Throwable) {
                    t.printStackTrace()
                }
            }
        )
        */

        /* TODO -> create coroutines */
        viewModelScope.launch(errorHandler) {
            val restaurants = getRemoteRestaurants()
            Log.d("hello2", "$restaurants")
            state.value = restaurants.restoreSelections()
        }
    }

    private suspend fun getRemoteRestaurants() : List<Restaurant> {
        return withContext(Dispatchers.IO) {
            restInterface.getRestaurants()
        }
    }

    /*
    override fun onCleared() {
        super.onCleared()
        restaurantsCall.cancel()
    }
    */

    fun toggleFavorite(id: Int) {
        val restaurants = state.value.toMutableList()
        val itemIndex = restaurants.indexOfFirst{ it.id == id }
        val item = restaurants[itemIndex]
        restaurants[itemIndex] = item.copy(isFavorite = !item.isFavorite)
        state.value = restaurants
    }

    private fun List<Restaurant>.restoreSelections(): List<Restaurant> {
        stateHandle.get<List<Int>?>(FAVORITES)?.let { selectedIts ->
            Log.d("selectedIts", "$selectedIts")
            val restaurantsMap = this.associateBy { it.id }
            selectedIts.forEach { id ->
                restaurantsMap[id]?.isFavorite = true
            }
            return restaurantsMap.values.toList()
        }
        return this
    }

    companion object {
        const val FAVORITES = "favorites"
    }

}
