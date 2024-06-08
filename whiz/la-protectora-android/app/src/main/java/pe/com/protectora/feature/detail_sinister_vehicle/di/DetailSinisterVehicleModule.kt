package pe.com.protectora.feature.detail_sinister_vehicle.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.detail_sinister_vehicle.DetailSinisterVehicleRepository
import pe.com.protectora.feature.detail_sinister_vehicle.DetailSinisterVehicleRepositoryImp
import pe.com.protectora.feature.detail_sinister_vehicle.DetailSinisterVehicleViewModel
import pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter.DocumentAdapter
import pe.com.protectora.feature.detail_sinister_vehicle.tabs.adapter.TracingAdapter

val detailSinisterVehicleModule = module {
    single<DetailSinisterVehicleRepository> { DetailSinisterVehicleRepositoryImp(get(),androidContext())}
    viewModel { DetailSinisterVehicleViewModel(get(),get()) }
    factory { TracingAdapter() }
    factory { DocumentAdapter() }
}