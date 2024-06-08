package pe.com.protectora.feature.detail_policy_vehicle.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.detail_policy_vehicle.*
import pe.com.protectora.feature.detail_policy_vehicle.tabs.adapter.*

val detailPolicyVehicleModule = module {
    viewModel { DetailPolicyVehicleViewModel(get(), get()) }
    factory { TypeAdapter() }
    factory { VehicleAdapter() }
    factory { PrimaAdapter() }
    factory { DocumentAdapter() }
    factory { SinisterAdapter() }
    factory { EndorsementAdapter() }
    factory { InsuredAdapter() }
    factory { CuponAdapter() }
    single<DetailPolicyVehicleRepository> { DetailPolicyVehicleRepositoryImp(get(), androidContext()) }
}