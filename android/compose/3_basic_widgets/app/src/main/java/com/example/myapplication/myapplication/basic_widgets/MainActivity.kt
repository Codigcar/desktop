package com.example.myapplication.myapplication.basic_widgets

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Column {
                /*
                MyAppText()
                ClickableButton()
                */
                /* HorizontalNumbersList() */
                /*ColumnList()*/
                BoxWithButton()
            }
        }
    }

    @Preview(showBackground = true, name = "text", device = Devices.PIXEL_2 )
    @Composable
    fun MyAppText() {
        Text(
            text = stringResource(R.string.hola),
            textAlign = TextAlign.Center,
            color = Color.Magenta,
            fontWeight = FontWeight.ExtraBold,
            fontStyle = FontStyle.Italic,
            fontSize = 24.sp
        )
    }

    @Preview(showBackground = true, name ="button", device = Devices.PIXEL_2)
    @Composable
    fun ClickableButton() {
        Button(
            onClick = {},
            colors = ButtonDefaults.buttonColors(
                contentColor = Color.Red,
            ),
            elevation = ButtonDefaults.buttonElevation(
                defaultElevation = 10.dp,
                pressedElevation = 15.dp,
                disabledElevation = 0.dp,
            ),
            shape = MaterialTheme.shapes.large
        ) {
            Text("press me")
        }
    }

    @OptIn(ExperimentalMaterial3Api::class)
    @Preview(showBackground = true, name = "input", device = Devices.PIXEL_2)
    @Composable
    fun NameInput() {
         val textState = remember { mutableStateOf("") }
        TextField(
            value = textState.value,
            onValueChange = {
                newValue -> textState.value = newValue
            },
            label = { Text("Your name") }
        )
    }

    @Preview(showBackground = true, name ="image", device = Devices.NEXUS_5)
    @Composable
    fun BeatifulImage() {
        Image(
            painter = painterResource(R.drawable.ic_launcher_background),
            contentDescription = "My app icon",
            contentScale = ContentScale.Fit
        )
    }

    @Preview(showBackground = true, name = "box", device = Devices.PIXEL_2)
    @Composable
    fun BoxRed() {
        Box(modifier = Modifier
            .size(120.dp)
            .background(color = Color.Magenta)
            .padding(16.dp)
            .clip(RoundedCornerShape(size = 20.dp))
            .background(color = Color.Green)
        )
    }

    @Preview(showBackground = true, name = "Row", device = Devices.PIXEL_2)
    @Composable
    fun HorizontalNumbersList() {
        Box(
            modifier = Modifier.fillMaxSize().background(Color.Red)
        ) {
            Row(
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth().fillMaxHeight(),
            ) {
                Text("1", fontSize = 36.sp)
                Text("2", fontSize = 36.sp)
                Text("3", fontSize = 36.sp)
                Text("4", fontSize = 36.sp)

            }
        }
    }

    @Preview(showBackground = true, name = "Column", device = "spec:width=1080px,height=1920px")
    @Composable
    fun ColumnList() {
        Column(
            modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("10", fontSize = 36.sp)
            Text("20", fontSize = 36.sp)
            Text("30", fontSize = 36.sp)
            Text("40", fontSize = 36.sp)
            Text("50", fontSize = 36.sp)
            Text("60", fontSize = 36.sp)
        }
    }

    @Preview(showBackground = true, name = "Box", device = Devices.PIXEL_2)
    @Composable
    fun BoxWithButton() {
        Box {
            Surface(
                modifier = Modifier.size(32.dp),
                color = Color.Green,
                shape = CircleShape,
                content = {}
            )
            Text( text = "++", modifier = Modifier.align(Alignment.Center))
        }
    }
}

