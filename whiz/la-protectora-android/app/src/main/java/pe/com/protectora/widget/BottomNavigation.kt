package pe.com.protectora.widget

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.widget.LinearLayout
import kotlinx.android.synthetic.main.bottom_navigation.view.*
import pe.com.protectora.R

class BottomNavigation(
    context: Context,
    attributeSet: AttributeSet
) :
    LinearLayout(context, attributeSet) {

    var onClickBottomBar: OnClickBottomBar? = null

    init {
        intiView()
    }

    private fun intiView() {
        View.inflate(context, R.layout.bottom_navigation, this)
        setOnClick()
    }

    private fun setOnClick() {
        homeNav.setOnClickListener {
            homeIndicator.visibility = View.VISIBLE
            policyIndicator.visibility = View.GONE
            sinisterIndicator.visibility = View.GONE
            moreIndicator.visibility = View.GONE
            onClickBottomBar?.onClickHome()
        }

        policyNav.setOnClickListener {
            homeIndicator.visibility = View.GONE
            policyIndicator.visibility = View.VISIBLE
            sinisterIndicator.visibility = View.GONE
            moreIndicator.visibility = View.GONE
            onClickBottomBar?.onClickPolicy()
        }

        sinisterNav.setOnClickListener {
            homeIndicator.visibility = View.GONE
            policyIndicator.visibility = View.GONE
            sinisterIndicator.visibility = View.VISIBLE
            moreIndicator.visibility = View.GONE
            onClickBottomBar?.onClickSinister()
        }

        moreNav.setOnClickListener {
            homeIndicator.visibility = View.GONE
            policyIndicator.visibility = View.GONE
            sinisterIndicator.visibility = View.GONE
            moreIndicator.visibility = View.VISIBLE
            onClickBottomBar?.onClickMore()
        }
    }

    interface OnClickBottomBar {
        fun onClickHome()
        fun onClickPolicy()
        fun onClickQuote()
        fun onClickSinister()
        fun onClickMore()
    }
}