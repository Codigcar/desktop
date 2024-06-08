package pe.com.protectora.feature.sos_vehicle.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.sos_vehicle.SosVehicleAdapter
import pe.com.protectora.feature.sos_vehicle.SosVehicleRepository
import pe.com.protectora.feature.sos_vehicle.SosVehicleRepositoryImp
import pe.com.protectora.feature.sos_vehicle.SosVehicleViewModel

val sosVehicleModule = module {
    viewModel { SosVehicleViewModel(get(), get()) }
    single<SosVehicleRepository> { SosVehicleRepositoryImp(get(), get()) }
    factory { SosVehicleAdapter() }
}