package pe.com.protectora.feature.profile.di

import org.koin.android.ext.koin.androidContext
import org.koin.android.viewmodel.dsl.viewModel
import org.koin.dsl.module
import pe.com.protectora.feature.profile.*
import kotlin.math.sin

val profileModule = module {
    factory { ProfileAdapter() }
    factory { RedesAdapter() }
    single<ProfileRepository> { ProfileRepositoryImp(androidContext(),get()) }
    viewModel { ProfileViewModel(get(),get()) }
}