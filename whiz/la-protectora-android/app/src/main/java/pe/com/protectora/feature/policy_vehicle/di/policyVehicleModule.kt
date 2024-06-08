package pe.com.protectora.feature.policy_vehicle.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.policy_vehicle.*

val policyVehicleModule = module {
    single<PolicyVehicleRepository> { PolicyVehicleRepositoryImp(get(), androidContext()) }
    factory { PolicyVehicleAdapter() }
    viewModel { PolicyVehicleViewModel(get(),get()) }
}