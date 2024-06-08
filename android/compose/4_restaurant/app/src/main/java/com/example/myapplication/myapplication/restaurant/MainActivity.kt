package com.example.myapplication.myapplication.restaurant

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Place
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.wear.compose.material3.ContentAlpha
import androidx.wear.compose.material3.LocalContentAlpha
import com.example.myapplication.myapplication.restaurant.ui.theme.RestaurantTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RestaurantTheme {
                // A surface container using the 'background' color from the theme
                //Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                //    Greeting("Android")
                //}
                RestaurantScreen()
            }
        }
    }
}

@Composable
fun RestaurantIcon(icon: ImageVector, modifier: Modifier, onClick: () -> Unit = {}) {
    Image(
        imageVector = icon,
        contentDescription = "icon",
        modifier = modifier.padding(8.dp).clickable { onClick() },
    )
}

@Composable
fun RestaurantDetails(title:String, description: String, modifier: Modifier) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.headlineLarge
        )
        CompositionLocalProvider(
            LocalContentAlpha provides ContentAlpha.medium)
        {
            Text(text = description, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@SuppressLint("RememberReturnType")
@Composable
fun FavoriteIcon(modifier: Modifier, icon:ImageVector, onClick: () -> Unit) {
    Image(
        imageVector = icon,
        contentDescription = "Favorite restaurant icon",
        modifier = modifier.padding(8.dp).clickable { onClick() }
    )
}

@Composable
fun RestaurantItem (item: Restaurant, onClick: (id: Int) -> Unit) {
    Card ( modifier = Modifier.padding(8.dp) ) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(8.dp)) {
            //val favoriteState = remember { mutableStateOf(false) }
            //val icon = if (favoriteState.value) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder
            val icon = if (item.isFavorite) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder

            RestaurantIcon(
                icon = Icons.Filled.Place,
                modifier = Modifier.weight(0.15f),
            )
            RestaurantDetails(
                title = item.title,
                description = item.description,
                modifier = Modifier.weight(0.85f)
            )
            /*FavoriteIcon(
                modifier = Modifier.weight(0.15f),
                icon = icon,
            )*/
            RestaurantIcon(
                icon,
                Modifier.weight(0.15f),
                onClick = { onClick(item.id) }
            )
        }
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_2)
@Composable
fun RestaurantScreen() {
    val viewModel: RestaurantsViewModel = viewModel()
    //val state: MutableState<List<Restaurant>> = remember { mutableStateOf(viewModel.getRestaunts()) }

    LazyColumn {
        /*item {
            dummyRestaurant.map { restaurant -> RestaurantItem(restaurant) }
        }*/
        /*
        items(viewModel.getRestaunts()) {
           restaurant -> RestaurantItem(restaurant, )
        }
       */
        /*
        items(state.value) {
            restaurant -> RestaurantItem(restaurant, onClick = { id ->
            val restaurants = state.value.toMutableList()
            val itemIndex = restaurants.indexOfFirst{ it.id == id }
            val item = restaurants[itemIndex]
            restaurants[itemIndex] = item.copy(isFavorite = !item.isFavorite)
            state.value = restaurants
            })
        }*/

        items(viewModel.state.value) {
            restaurant -> RestaurantItem(restaurant, onClick = { id ->
                viewModel.toggleFavorite(id)
            })
        }

    }
}
















