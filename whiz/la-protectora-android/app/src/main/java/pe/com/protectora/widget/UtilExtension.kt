package pe.com.protectora.widget

import android.app.Activity
import android.content.Context
import android.text.format.DateFormat
import android.view.View
import android.view.inputmethod.InputMethodManager
import androidx.core.widget.NestedScrollView
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity

fun Fragment.replaceFragment(content: Int, fragment: Fragment) {
    this.parentFragmentManager.beginTransaction().replace(content, fragment).commit()
}

fun FragmentActivity.replaceFragment(content: Int, fragment: Fragment) {
    this.supportFragmentManager.beginTransaction().replace(content, fragment).commit()
}


fun Fragment.hideKeyboard() {
    view?.let { activity?.hideKeyboard(it) }
}

fun Activity.hideKeyboard() {
    hideKeyboard(currentFocus ?: View(this))
}

fun Context.hideKeyboard(view: View) {
    val inputMethodManager = getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    inputMethodManager.hideSoftInputFromWindow(view.windowToken, 0)
}

fun Context.convertDate(dateInMilliseconds: String, dateFormat: String?): String? {
    return DateFormat.format(dateFormat, dateInMilliseconds.toLong()).toString()
}

inline fun NestedScrollView.onEndless(crossinline onEndless: () -> Unit) {
    setOnScrollChangeListener { v: NestedScrollView, scrollX: Int, scrollY: Int, oldScrollX: Int, oldScrollY: Int ->
        if (v.getChildAt(v.childCount - 1) != null) {
            if (scrollY >= v.getChildAt(v.childCount - 1)
                    .measuredHeight - v.measuredHeight &&
                scrollY > oldScrollY
            ) {
                onEndless()
            }
        }

    }
}