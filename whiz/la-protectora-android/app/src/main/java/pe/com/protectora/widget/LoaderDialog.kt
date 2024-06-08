package pe.com.protectora.widget

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.view.Window
import pe.com.protectora.R

class LoaderDialog(context: Context) : Dialog(context) {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initDialog()

    }

    private fun initDialog() {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        setContentView(R.layout.dialog_loader)
        window?.setLayout(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        setCancelable(false)
    }

    companion object {

        private var instance: LoaderDialog? = null
        private var context: Context? = null

        @Synchronized
        fun getInstance(context: Context): LoaderDialog {

            if (this.context == null) {
                this.context = context
            }

            val isFinish = (this.context as Activity).isFinishing

            if (instance == null || isFinish || this.context != context) {
                this.context = context
                instance = LoaderDialog(context)
            }
            return instance!!
        }
    }
}