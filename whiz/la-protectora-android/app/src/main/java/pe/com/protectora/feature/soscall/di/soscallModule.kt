package pe.com.protectora.feature.soscall.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.soscall.SosCallAdapter
import pe.com.protectora.feature.soscall.SosCallRepository
import pe.com.protectora.feature.soscall.SosCallRepositoryImp
import pe.com.protectora.feature.soscall.SosCallViewModel

/**
 * Created by williamdaniel24 on 22,June,2020
 */

val soscallModule = module {
    factory { SosCallAdapter() }
    single<SosCallRepository> { SosCallRepositoryImp(get(), get()) }
    viewModel { SosCallViewModel(get(),get()) }
}