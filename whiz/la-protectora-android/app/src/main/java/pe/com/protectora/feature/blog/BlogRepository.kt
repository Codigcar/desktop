package pe.com.protectora.feature.blog

import pe.com.protectora.model.blog.Blog
import pe.com.protectora.model.blog.CategoryBlog
import pe.com.protectora.model.blog.SubCategory
import pe.com.protectora.network.OperationResult

interface BlogRepository {
    suspend fun getTopBlog(): OperationResult<List<Blog>>
    suspend fun getSubCategory(id: String): OperationResult<List<SubCategory>>
    suspend fun getPostxSubCategory(id: String): OperationResult<List<Blog>>
    suspend fun getRecentPost(start: Int, range: Int): OperationResult<List<Blog>>
    suspend fun getRecentPostxSubCategory(
        categoryId: String,
        start: Int,
        range: Int
    ): OperationResult<List<Blog>>

    suspend fun getCategories(): OperationResult<List<CategoryBlog>>
}