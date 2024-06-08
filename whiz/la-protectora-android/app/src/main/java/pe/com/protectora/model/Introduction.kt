package pe.com.protectora.model

import androidx.annotation.DrawableRes

data class Introduction(
    var title: String,
    var detail: String,
    var type: Int,
    @DrawableRes var background: Int
)