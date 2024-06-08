package pe.com.protectora.widget

import android.app.Activity
import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.view.Window
import kotlinx.android.synthetic.main.dialog_message.*
import pe.com.protectora.R

class CustomDialog(context: Context) : Dialog(context) {

    var onClick: OnClick? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initDialog()
        setOnClick()
    }

    private fun initDialog() {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        setContentView(R.layout.dialog_message)
        window?.setLayout(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        setCancelable(false)
    }

    private fun setOnClick() {
        acceptButton.setOnClickListener {
            cancel()
            onClick?.onClickOk()
        }
    }

    fun setMessage(message: String) {
        messageText.text = message
    }

    private fun hideLoading() {
        messageView.visibility = View.VISIBLE
        dialogProgress.visibility = View.GONE
    }

    fun showLoading() {
        show()
        messageView.visibility = View.GONE
        dialogProgress.visibility = View.VISIBLE
    }
    fun showMessage(message: String) {
        show()
        setMessage(message)
        messageView.visibility = View.VISIBLE
        dialogProgress.visibility = View.GONE
    }

    fun showMessage(message: String, onClickOk: () -> Unit) {
        show()
        setOnClick {
            onClickOk()
        }
        setMessage(message)
        messageView.visibility = View.VISIBLE
        dialogProgress.visibility = View.GONE
    }

    inline fun setOnClick(crossinline onClickOk: () -> Unit) {
        this.onClick = object : OnClick {
            override fun onClickOk() {
                onClickOk()
            }
        }
    }
    interface OnClick {
        fun onClickOk()
    }

    companion object {

        private var instance: CustomDialog? = null
        private var context: Context? = null

        @Synchronized
        fun getInstance(context: Context): CustomDialog {

            if (this.context == null) {
                this.context = context
            }

            val isFinish = (this.context as Activity).isFinishing

            if (instance == null || isFinish || this.context != context) {
                this.context = context
                instance = CustomDialog(context)
            }
            return instance!!
        }
    }
}