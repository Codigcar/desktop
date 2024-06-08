package pe.com.protectora.feature.profile_personal.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.profile_personal.tabs.DataRepository
import pe.com.protectora.feature.profile_personal.tabs.DataRepositoryImp
import pe.com.protectora.feature.profile_personal.tabs.DataViewModel

val profilePersonalModule = module {
    viewModel { DataViewModel(get(),get(),get()) }
    single<DataRepository> { DataRepositoryImp(get(), androidContext()) }
}