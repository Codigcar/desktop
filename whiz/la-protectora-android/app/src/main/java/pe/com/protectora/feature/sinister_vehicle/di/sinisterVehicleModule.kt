package pe.com.protectora.feature.sinister_vehicle.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.sinister_vehicle.SinisterVehicleAdapter
import pe.com.protectora.feature.sinister_vehicle.SinisterVehicleRepository
import pe.com.protectora.feature.sinister_vehicle.SinisterVehicleRepositoryImp
import pe.com.protectora.feature.sinister_vehicle.SinisterVehicleViewModel

val sinisterVehicleModule = module {
    single<SinisterVehicleRepository> { SinisterVehicleRepositoryImp(get(), androidContext()) }
    factory { SinisterVehicleAdapter() }
    viewModel { SinisterVehicleViewModel(get(),get()) }
}