import React, { useEffect } from 'react';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import i18nConfig from '../constants/i18n';
import Script from 'next/script';
import * as gtag from 'src/libs/gtag';

import { ProfileProvider } from '@contexts/user-profile/ProfileProvider';
import { AuthProvider } from '@contexts/auth';
import { NearProvider } from '@contexts/near/NearProvider';
import '../styles/app.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { authReducer } from '../contexts/auth/authReducer';
import { profileReducer } from '../contexts/user-profile/profileReducer';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  const AnyComponent = Component as any;

  const rootReducer = combineReducers({
    authReducer,
    profileReducer,
  });

  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return (
    <React.StrictMode>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Head>
          {/* <title>Darshana</title> */}
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <ProfileProvider>
                <NearProvider>
                  <NextNProgress color="#19a79b" height={8} />
                  <AnyComponent {...pageProps} />
                </NearProvider>
              </ProfileProvider>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </SWRConfig>
    </React.StrictMode>
  );
}

export default appWithTranslation(MyApp, i18nConfig);
