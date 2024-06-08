package pe.com.protectora.model.blog

import java.io.Serializable

data class Blog(
    val category: String,
    val created_at: String,
    val file: String,
    val id: Int,
    val image_cover: String,
    val image_main: String,
    val long_text: String,
    val reading_order: Int,
    val send_mail: Int,
    val send_mail_name: String,
    val subcategory: String,
    val title: String,
    val type: String,
    val type_name: String,
    val video: String
) : Serializable {
    fun getImageBack(): String {
        return "https://cdn.whiz.pe/api/v2/image/$image_cover/png"
    }

    fun getImageMain(): String {
        return "https://cdn.whiz.pe/api/v2/image/$image_main/png"
    }

    fun getFilePdf(): String {
        return "https://docs.google.com/viewer?embedded=true&url=https://blog.laprotectora.com.pe$file"
    }
    fun getFileImage(): String {
        return "https://blog.laprotectora.com.pe/$file"
    }
}