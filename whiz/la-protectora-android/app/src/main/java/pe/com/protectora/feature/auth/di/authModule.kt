package pe.com.protectora.feature.auth.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.auth.AuthRepository
import pe.com.protectora.feature.auth.AuthRepositoryImp
import pe.com.protectora.feature.auth.AuthViewModel

val authModule = module {
    viewModel { AuthViewModel(get(), get(), androidContext()) }
    single<AuthRepository> { AuthRepositoryImp(get(), androidContext()) }
}