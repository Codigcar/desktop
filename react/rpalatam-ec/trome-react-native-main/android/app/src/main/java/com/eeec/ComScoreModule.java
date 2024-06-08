package com.eeec;

import java.util.HashMap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;

import com.comscore.Analytics;
import com.comscore.PublisherConfiguration;
import com.comscore.UsagePropertiesAutoUpdateMode;

public class ComScoreModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    ComScoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNComScore";
    }

    @ReactMethod
    public void initialize(ReadableMap options, Promise promise) {
        try {
            String comScorePublisherID = options.getString("publisherID");
            String comScoreAppName = options.getString("appName");

            PublisherConfiguration config = new PublisherConfiguration
                    .Builder()
                    .publisherId(comScorePublisherID)
                    .build();

            Analytics.getConfiguration().setUsagePropertiesAutoUpdateMode(UsagePropertiesAutoUpdateMode.FOREGROUND_ONLY);
            Analytics.getConfiguration().setApplicationName(comScoreAppName);
            Analytics.getConfiguration().addClient(config);

            if (BuildConfig.DEBUG) {
                Analytics.getConfiguration().enableImplementationValidationMode();
            }

            Analytics.start(reactContext);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

}
