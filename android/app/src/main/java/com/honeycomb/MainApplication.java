package com.honeycomb;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cardio.RNCardIOPackage;
import com.beefe.picker.PickerViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.wonday.pdf.RCTPdfView;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
//import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.auth0.react.A0Auth0Package;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCardIOPackage(),
            new PickerViewPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RCTPdfView(),
            new ReactMaterialKitPackage(),
            new PickerPackage(),
            new FIRMessagingPackage(),
            new RNDeviceInfo(),
              new MapsPackage(),
//            new ReactNativePushNotificationPackage(),
            new A0Auth0Package()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
