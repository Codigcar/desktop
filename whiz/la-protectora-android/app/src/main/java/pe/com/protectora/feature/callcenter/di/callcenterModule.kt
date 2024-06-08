package pe.com.protectora.feature.callcenter.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.callcenter.CallCenterRepository
import pe.com.protectora.feature.callcenter.CallCenterRepositoryImp
import pe.com.protectora.feature.callcenter.CallCenterViewModel

val callCenterModule = module {
    viewModel { CallCenterViewModel(get(), get()) }
    single<CallCenterRepository> { CallCenterRepositoryImp(get(), get()) }
}