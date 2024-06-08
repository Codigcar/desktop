package pe.com.protectora.session.di

import android.content.Context
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module
import pe.com.protectora.session.SessionManager
import pe.com.protectora.session.SessionManagerImp
import pe.com.protectora.session.SessionRepository
import pe.com.protectora.session.SessionRepositoryImp

val sessionModule = module {
    single<SessionManager> {
        SessionManagerImp(
            androidContext().getSharedPreferences(
                SessionManagerImp.PREFERENCE_NAME,
                Context.MODE_PRIVATE
            )
        )
    }

    single<SessionRepository> { SessionRepositoryImp(get()) }
}