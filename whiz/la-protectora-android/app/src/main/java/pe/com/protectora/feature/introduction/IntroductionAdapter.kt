package pe.com.protectora.feature.introduction

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.startActivity
import androidx.core.graphics.drawable.DrawableCompat
import androidx.viewpager.widget.PagerAdapter
import kotlinx.android.synthetic.main.fragment_introduction.view.*
import kotlinx.android.synthetic.main.item_introduction.view.*
import pe.com.protectora.R
import pe.com.protectora.model.Introduction

class IntroductionAdapter(
    private val context: Context
) : PagerAdapter() {

    var onClickIntroductionAdapter: OnClickWelcomeAdapter? = null
    var list: MutableList<Introduction>? = null

    override fun instantiateItem(container: ViewGroup, position: Int): Any {
        val item = list?.get(position)
        val view = View.inflate(context, R.layout.item_introduction, null).apply {
            item?.let {
                titleText.text = it.title
                backgroundImage.setImageResource(it.background)
                when (it.type) {
                    1 -> {
                        ivDoctorgif.visibility = View.GONE
                        logoHeader.visibility = View.GONE
                        files.visibility = View.GONE
                        detailText.visibility = View.VISIBLE
                        cotizarButton.visibility = View.GONE
                        detailText.text = it.detail
                        btnOrientation.visibility = View.INVISIBLE
                    }
                    2 -> {
                        ivDoctorgif.visibility = View.GONE
                        logoHeader.visibility = View.GONE
                        files.visibility = View.GONE
                        detailText.visibility = View.GONE
                        cotizarButton.visibility = View.VISIBLE
                        btnOrientation.visibility = View.INVISIBLE

                    }

                    3 -> {
                        ivDoctorgif.visibility = View.VISIBLE
                        btnOrientation.visibility = View.VISIBLE
                        logoHeader.visibility = View.VISIBLE
                        files.visibility = View.VISIBLE
                        detailText.visibility = View.GONE
                        cotizarButton.visibility = View.VISIBLE
                    }
                }
                when (position) {
                    0 -> {

                        firstStepViewV2.setColorFilter(
                            ContextCompat.getColor(context, R.color.black),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        secondStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        thirdStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        quarterStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.gray
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )


                        firstStepViewV2.layoutParams.width = 16
                        firstStepViewV2.layoutParams.height = 16

                        firstStepView.layoutParams.width = 12
                        firstStepView.layoutParams.height = 12

                        secondStepView.layoutParams.width = 12
                        secondStepView.layoutParams.height = 12

                        thirdStepView.layoutParams.width = 12
                        thirdStepView.layoutParams.height = 12

                        quarterStepView.layoutParams.width = 12
                        quarterStepView.layoutParams.height = 12

                    }
                    1 -> {

                        firstStepViewV2.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.black
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        secondStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        thirdStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        quarterStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.gray
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepViewV2.layoutParams.width = 12
                        firstStepViewV2.layoutParams.height = 12

                        firstStepView.layoutParams.width = 16
                        firstStepView.layoutParams.height = 16

                        secondStepView.layoutParams.width = 12
                        secondStepView.layoutParams.height = 12

                        thirdStepView.layoutParams.width = 12
                        thirdStepView.layoutParams.height = 12

                        quarterStepView.layoutParams.width = 12
                        quarterStepView.layoutParams.height = 12

                    }
                    2 -> {

                        firstStepViewV2.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        secondStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.black),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        thirdStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        quarterStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.gray
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepViewV2.layoutParams.width = 12
                        firstStepViewV2.layoutParams.height = 12

                        firstStepView.layoutParams.width = 12
                        firstStepView.layoutParams.height = 12

                        secondStepView.layoutParams.width = 16
                        secondStepView.layoutParams.height = 16

                        thirdStepView.layoutParams.width = 12
                        thirdStepView.layoutParams.height = 12

                        quarterStepView.layoutParams.width = 12
                        quarterStepView.layoutParams.height = 12

                    }
                    3 -> {

                        firstStepViewV2.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        secondStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        thirdStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.black),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        quarterStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.gray
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepViewV2.layoutParams.width = 12
                        firstStepViewV2.layoutParams.height = 12

                        firstStepView.layoutParams.width = 12
                        firstStepView.layoutParams.height = 12

                        secondStepView.layoutParams.width = 12
                        secondStepView.layoutParams.height = 12

                        thirdStepView.layoutParams.width = 16
                        thirdStepView.layoutParams.height = 16

                        quarterStepView.layoutParams.width = 12
                        quarterStepView.layoutParams.height = 12
                    }
                    4 -> {

                        firstStepViewV2.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        secondStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        thirdStepView.setColorFilter(
                            ContextCompat.getColor(context, R.color.gray),
                            android.graphics.PorterDuff.Mode.SRC_IN
                        )
                        quarterStepView.setColorFilter(
                            ContextCompat.getColor(
                                context,
                                R.color.black
                            ), android.graphics.PorterDuff.Mode.SRC_IN
                        )

                        firstStepViewV2.layoutParams.width = 12
                        firstStepViewV2.layoutParams.height = 12

                        firstStepView.layoutParams.width = 12
                        firstStepView.layoutParams.height = 12

                        secondStepView.layoutParams.width = 12
                        secondStepView.layoutParams.height = 12

                        thirdStepView.layoutParams.width = 12
                        thirdStepView.layoutParams.height = 12

                        quarterStepView.layoutParams.width = 16
                        quarterStepView.layoutParams.height = 16
                    }
                    
                }
                cotizarButton.setOnClickListener { onClickIntroductionAdapter?.onClickCotizarButton() }
                btnOrientation.setOnClickListener { onClickIntroductionAdapter?.onClickOrientation() }
            }
        }
        container.addView(view)
        return view
    }

    override fun destroyItem(container: ViewGroup, position: Int, obj: Any) {
        container.removeView(obj as View)
    }

    override fun isViewFromObject(view: View, obj: Any) = view == obj

    override fun getCount() = list?.size ?: 0

    override fun getItemPosition(obj: Any) = POSITION_NONE

    interface OnClickWelcomeAdapter {
        fun onClickCotizarButton()
        fun onClickOrientation()
    }
}
