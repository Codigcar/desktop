package com.banbifbancaempresasapp;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;
import okhttp3.CertificatePinner.Builder;

public class PinningClientFactory implements OkHttpClientFactory {

    @Override
    public OkHttpClient createNewNetworkModuleClient(){

        String hostName = " YOUR DOMAIN ";

        String certificatePublicKey1 = "sha256/< ADD KEY 01 >";
        String certificatePublicKey2 = "sha256/< ADD KEY 02 >";
        OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();

        CertificatePinner certificatePinner = new CertificatePinner.Builder()
            .add(hostName, certificatePublicKey1)
            .add(hostName, certificatePublicKey2)               
            .build();

        clientBuilder.certificatePinner(certificatePinner);
        clientBuilder.cookieJar(new ReactCookieJarContainer());
        return clientBuilder.build();
    }
}