package pe.com.protectora.model.blog

data class ResponseSubCategory(
    val data: List<SubCategory>,
    val links: Links,
    val message: Boolean,
    val meta: Meta,
    val status: Boolean
)