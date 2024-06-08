package pe.com.protectora.feature.blog.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.blog.*

val blogModule = module {
    factory { BlogAdapter() }
    factory { BlogCategoriesAdapter() }
    factory { BlogNewsAdapter() }
    factory { BlogSubCategoryAdapter() }
    factory { BlogSubCategoryPostAdapter() }
    factory { BlogNewsSubCategoryAdapter() }
    single<BlogRepository> { BlogRepositoryImp(get(), get()) }
    viewModel { BlogViewModel(get()) }
}