package pe.com.protectora.network

import pe.com.protectora.model.blog.*
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query

interface ServicesBlog {

    @GET("post?featured")
    suspend fun getBlogTop(): Response<ResponseTopBlog>

    @GET("subcategory/")
    suspend fun getSubCategory(
        @Query("category_id") id: String
    ): Response<ResponseSubCategory>

    @GET("post")
    suspend fun getPostOfSubCategory(
        @Query("subcategory_id") id: String
    ): Response<ResponsePostxSubCategory>

    @GET("post")
    suspend fun getRecentBlog(
        @Query("start") start: Int,
        @Query("length") size: Int
    ): Response<ResponseRecentPost>

    @GET("post")
    suspend fun getRecentBlogxSubCategory(
        @Query("category_id") categoryId: String,
        @Query("start") start: Int,
        @Query("length") size: Int
    ): Response<ResponseRecentPostxSubCategory>

    @GET("category")
    suspend fun getCategories(): Response<ResponseCategories>
}