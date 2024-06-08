package pe.com.protectora.feature.executive.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.executive.ExecutiveRepository
import pe.com.protectora.feature.executive.ExecutiveRepositoryImp
import pe.com.protectora.feature.executive.ExecutiveAdapter
import pe.com.protectora.feature.executive.ExecutiveViewModel
import pe.com.protectora.feature.executive.risk.ExecutiveGroupAdapter
import pe.com.protectora.feature.executive.risk.ExecutiveIconAdapter
import pe.com.protectora.feature.executive.risk.RiskViewModel
import pe.com.protectora.feature.executive.sinister.ExecutiveSinisterViewModel

val moduleExecutive = module {
    viewModel { ExecutiveSinisterViewModel(get(), get()) }
    viewModel { RiskViewModel(get(), get()) }
    viewModel { ExecutiveViewModel(get()) }

    single<ExecutiveRepository> { ExecutiveRepositoryImp(get(), androidContext()) }
    factory { ExecutiveAdapter(get()) }
    factory { ExecutiveGroupAdapter() }
    factory { ExecutiveIconAdapter() }

}