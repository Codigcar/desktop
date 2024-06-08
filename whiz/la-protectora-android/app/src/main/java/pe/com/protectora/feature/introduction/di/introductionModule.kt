package pe.com.protectora.feature.introduction.di

import pe.com.protectora.feature.introduction.IntroductionAdapter
import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.introduction.IntroductionViewModel

val introductionModule = module {
    viewModel { IntroductionViewModel() }
    factory { IntroductionAdapter(androidContext()) }
}