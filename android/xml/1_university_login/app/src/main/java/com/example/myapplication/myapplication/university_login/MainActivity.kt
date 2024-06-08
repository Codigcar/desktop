package com.example.myapplication.myapplication.university_login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val submitBtn: Button = findViewById(R.id.submit_btn)
        submitBtn.setOnClickListener(){
            Toast.makeText(this, "Submit btn", Toast.LENGTH_LONG).show()
        }

    }
}