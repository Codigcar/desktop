package pe.com.protectora.model.blog

data class SubCategory(
    val category: String,
    val id: Int,
    val image_card: String?,
    val image_inner: String?,
    val name: String,
    val posts: Int
) {
    fun getImageCard(): String? {
        return "https://cdn.whiz.pe/api/v2/image/${image_card}/png"
    }
}