package pe.com.protectora.feature.policy.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.policy.PolicyAdapter
import pe.com.protectora.feature.policy.PolicyRepository
import pe.com.protectora.feature.policy.PolicyRepositoryImp
import pe.com.protectora.feature.policy.PolicyViewModel

val policyModule = module {
    viewModel { PolicyViewModel(get(),get()) }
    factory { PolicyAdapter() }
    single<PolicyRepository> { PolicyRepositoryImp(get(), androidContext()) }
}