package com.banbifbancaempresasapp;

import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.appgate.didm_auth.DetectID;
import com.appgate.didm_auth.common.account.entities.Account;
import com.appgate.didm_auth.common.handler.EnrollmentResultHandler;
import com.appgate.appgate_sdk.encryptor.exceptions.SDKException;

import java.util.Base64;
import java.util.List;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class DetectIdModule extends ReactContextBaseJavaModule {

  private ReactApplicationContext context;
  public static final int GCM_TAG_LENGTH = 16;

  public DetectIdModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
  }

  @ReactMethod
  public void deviceRegistrationByCode(String urlAndCode, Promise promise) {
    DetectID.sdk(context).didRegistration(urlAndCode, new EnrollmentResultHandler() {
      @Override
      public void onSuccess () {
        promise.resolve("200"); //Code successfully
      }
      @Override
      public void onFailure(SDKException exception) {
        promise.resolve(exception.getCode());
      }
    });
  }

  @ReactMethod
  public void getTokenValue(Promise promise) {
    List<Account> accounts = DetectID.sdk(context).getAccounts();

    if (accounts.size() > 0) {
      Account account = accounts.get(0);

      String value = DetectID.sdk(context).getOtpApi().getTokenValue(account);

      promise.resolve(value);
    } else {
      promise.reject("No se encontraron cuentas.");
    }
  }

  @ReactMethod
  public void removeAccount(Promise promise) {
    List<Account> accounts = DetectID.sdk(context).getAccounts();
    
   if (accounts.size() > 0) {
      Account account = accounts.get(0);
      DetectID.sdk(context).removeAccount(account);
      promise.resolve(accounts.size());
    } else {
      promise.resolve("No se encontraron cuentas");
    }
  }

  @ReactMethod
  public void getTokenTimeStepValue(Promise promise) {
    List<Account> accounts = DetectID.sdk(context).getAccounts();
    
    if (accounts.size() > 0) {
      Account account = accounts.get(0);

      int stepValue = DetectID.sdk(context).getOtpApi().getTokenTimeStepValue(account);

      promise.resolve(stepValue);
    } else {
      promise.reject("No se encontraron cuentas.");
    }
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public void encrypt(String data, String key, String iv, Promise promise)throws Exception {
    //data byte
    byte[] plaintext = data.getBytes();

    // Get Cipher Instance
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

    // Create SecretKeySpec
    SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");

    // Create GCMParameterSpec
    GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, iv.getBytes());

    // Initialize Cipher for ENCRYPT_MODE
    cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec);

    // Perform Encryption
    byte[] cipherText = cipher.doFinal(plaintext);

    promise.resolve(Base64.getEncoder().encodeToString(cipherText));
  }

  @Override
  public String getName() {
    return "DetectID";
  }
}