package pe.com.protectora.feature.blog

import android.content.Context
import pe.com.protectora.model.blog.Blog
import pe.com.protectora.model.blog.CategoryBlog
import pe.com.protectora.model.blog.SubCategory
import pe.com.protectora.network.OperationResult
import pe.com.protectora.network.ServicesBlog
import pe.com.protectora.network.exception.getErrorMessage
import java.lang.Exception

class BlogRepositoryImp(
    private val services: ServicesBlog,
    private val context: Context
) : BlogRepository {

    override suspend fun getTopBlog(): OperationResult<List<Blog>> {
        return try {
            val response = services.getBlogTop()
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getSubCategory(id: String): OperationResult<List<SubCategory>> {
        return try {
            val response = services.getSubCategory(id)
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getPostxSubCategory(id: String): OperationResult<List<Blog>> {
        return try {
            val response = services.getPostOfSubCategory(id)
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getRecentPost(start: Int, range: Int): OperationResult<List<Blog>> {
        return try {
            val response = services.getRecentBlog(start, range)
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getRecentPostxSubCategory(
        categoryId: String,
        start: Int,
        range: Int
    ): OperationResult<List<Blog>> {
        return try {
            val response = services.getRecentBlogxSubCategory(categoryId, start, range)
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

    override suspend fun getCategories(): OperationResult<List<CategoryBlog>> {
        return try {
            val response = services.getCategories()
            if (response.isSuccessful) {
                val data = response.body()!!.data
                OperationResult.Success(data)
            } else {
                val error = response.errorBody().getErrorMessage(context)
                OperationResult.Error(error)
            }
        } catch (e: Exception) {
            OperationResult.Error(e.getErrorMessage(context))
        }
    }

}