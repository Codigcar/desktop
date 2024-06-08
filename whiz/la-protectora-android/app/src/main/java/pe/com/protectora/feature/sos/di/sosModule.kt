package pe.com.protectora.feature.sos.di

import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.sos.SosAdapter
import pe.com.protectora.feature.sos.SosViewModel

val sosModule = module {
    factory { SosAdapter() }
    viewModel { SosViewModel(get(),get()) }
}