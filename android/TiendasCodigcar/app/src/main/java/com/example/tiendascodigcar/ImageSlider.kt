package com.example.tiendascodigcar

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@ExperimentalMaterial3Api
@Composable
fun ImageSlider(images: List<Any>) {
    var currentImageIndex = remember { mutableStateOf(0) }
    var isAnimation = remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()
    Column(modifier = Modifier.fillMaxSize()) {
        Box(modifier = Modifier
            .weight(1f)
            .height(100.dp)
            .fillMaxWidth()
            .padding(16.dp)) {
            LazyRow(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
              itemsIndexed(images) {
                  index, image ->
                  Card( modifier = Modifier
                      .width(300.dp)
                      .height(200.dp)
                      .clickable {
                          if (index != currentImageIndex.value && !isAnimation.value) {
                              isAnimation.value = true
                              coroutineScope.launch {
                                  val delayMillis = 500L
                                  delay(delayMillis / 2)
                                  currentImageIndex.value = index
                              }
                          }
                      }) {
                      AsyncImage(model = image as String, contentDescription = "" )
                      /* NetworkImage(
                          contentDescription = "",
                          url = image as String,
                          width = 300,
                          height = 200
                      )*/
                  }
              }
            }
        }

    }

}


