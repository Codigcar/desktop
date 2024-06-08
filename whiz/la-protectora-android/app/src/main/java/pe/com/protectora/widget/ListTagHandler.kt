package pe.com.protectora.widget

import android.text.Editable

import android.text.Html.TagHandler
import org.xml.sax.XMLReader


class ListTagHandler : TagHandler {
    var first = true
    override fun handleTag(opening: Boolean, tag: String, output: Editable, xmlReader: XMLReader?) {

        // TODO Auto-generated method stub
        if (tag == "li") {
            var lastChar = 0.toChar()
            if (output.length > 0) lastChar = output[output.length - 1]
            first = if (first) {
                if (lastChar == '\n') output.append("\t•  ") else output.append("\n\t•  ")
                false
            } else {
                true
            }
        }
    }
}