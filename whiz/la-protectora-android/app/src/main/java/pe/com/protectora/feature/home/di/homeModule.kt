package pe.com.protectora.feature.home.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.home.HomeRepository
import pe.com.protectora.feature.home.HomeRepositoryImp
import pe.com.protectora.feature.home.HomeViewModel

val homeModule = module {
    viewModel { HomeViewModel(get(), get()) }
    single<HomeRepository> { HomeRepositoryImp(get()) }
}