package pe.com.protectora.model.blog

data class ResponseCategories(
    val data: List<CategoryBlog>,
    val links: Links,
    val message: Boolean,
    val meta: Meta,
    val status: Boolean
)