package pe.com.protectora.app

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin
import pe.com.protectora.feature.auth.di.authModule
import pe.com.protectora.feature.blog.BlogCategoriesAdapter
import pe.com.protectora.feature.blog.di.blogModule
import pe.com.protectora.feature.callcenter.di.callCenterModule
import pe.com.protectora.feature.detail_policy_vehicle.di.detailPolicyVehicleModule
import pe.com.protectora.feature.detail_sinister_vehicle.di.detailSinisterVehicleModule
import pe.com.protectora.feature.executive.di.moduleExecutive
import pe.com.protectora.feature.home.di.homeModule
import pe.com.protectora.feature.introduction.di.introductionModule
import pe.com.protectora.feature.policy.di.policyModule
import pe.com.protectora.feature.policy_vehicle.di.policyVehicleModule
import pe.com.protectora.feature.profile.di.profileModule
import pe.com.protectora.feature.profile_personal.di.profilePersonalModule
import pe.com.protectora.feature.sinister.di.sinisterModule
import pe.com.protectora.feature.sinister_vehicle.di.sinisterVehicleModule
import pe.com.protectora.feature.sos.di.sosModule
import pe.com.protectora.feature.sos_vehicle.di.sosVehicleModule
import pe.com.protectora.feature.soscall.di.soscallModule
import pe.com.protectora.network.di.networkModule
import pe.com.protectora.session.di.sessionModule

class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidContext(this@MainApplication)
            modules(
                authModule,
                networkModule,
                sessionModule,
                policyModule,
                policyVehicleModule,
                detailPolicyVehicleModule,
                sinisterModule,
                introductionModule,
                sosModule,
                sinisterVehicleModule,
                detailSinisterVehicleModule,
                homeModule,
                sosVehicleModule,
                profileModule,
                profilePersonalModule,
                moduleExecutive,
                callCenterModule,
                soscallModule,
                blogModule
            )
        }
    }

}