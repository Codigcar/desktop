package pe.com.protectora.network.di

import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module
import pe.com.protectora.network.*
import pe.com.protectora.network.common.Connectivity
import pe.com.protectora.network.common.ConnectivityImpl


val networkModule = module {
    single<Services> { ApiConfiguration.getInstance()!! }
    single<Connectivity> { ConnectivityImpl(androidContext()) }
    single<ServicesBlog> { ApiConfigurationBlog.getInstance()!! }

}