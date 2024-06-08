package pe.com.protectora.model.blog

data class CategoryBlog(
    val id: Int,
    val image: String,
    val name: String,
    val subcategories: Int,
    val reorder: Int,
    val posts: Int
) {
    fun getImageUrl(): String {
        return "https://cdn.whiz.pe/api/v2/image/${image}/png"
    }
}
