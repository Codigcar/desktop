package pe.com.protectora.model.blog

data class ResponsePostxSubCategory(
    val data: List<Blog>,
    val links: Links,
    val message: Boolean,
    val meta: Meta,
    val status: Boolean
)