package com.example.tiendascodigcar

import kotlinx.coroutines.delay

// Automatic Image Slider
fun LaunchedEffect(currentImageIndex) {
    while (true) {
        delay(5000L)
        if (!isAnimating) {
            val nextIndex = (currentImageIndex + 1) % images.size
            currentImageIndex = nextIndex
        }
    }
}