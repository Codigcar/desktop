package pe.com.protectora.network

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import pe.com.protectora.BuildConfig
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit


object ApiConfigurationBlog {

    private var retrofit: Retrofit? = null

    fun getInstance(): ServicesBlog? {
        retrofit = Retrofit.Builder().baseUrl("https://blog.laprotectora.com.pe/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(getClient()!!)
            .build()

        return retrofit?.create(ServicesBlog::class.java)
    }

    private fun getClient(): OkHttpClient? {
        val okHttpClient = OkHttpClient().newBuilder()
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .writeTimeout(15, TimeUnit.SECONDS)
            .addInterceptor(getInterceptor()!!)
            .build()
        return okHttpClient
    }

    private fun getInterceptor(): HttpLoggingInterceptor? {
        val interceptor = HttpLoggingInterceptor()
        interceptor.level = HttpLoggingInterceptor.Level.BODY
        return interceptor
    }
}