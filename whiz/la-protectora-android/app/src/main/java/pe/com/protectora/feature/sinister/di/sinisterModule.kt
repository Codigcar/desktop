package pe.com.protectora.feature.sinister.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.sinister.SinisterAdapter
import pe.com.protectora.feature.sinister.SinisterRepository
import pe.com.protectora.feature.sinister.SinisterRepositoryImp
import pe.com.protectora.feature.sinister.SinisterViewModel

val sinisterModule = module {
    viewModel { SinisterViewModel(get(), get()) }
    factory { SinisterAdapter() }
    single<SinisterRepository> { SinisterRepositoryImp(get(), androidContext()) }
}