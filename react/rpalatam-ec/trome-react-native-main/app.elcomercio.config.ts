const config = {
  APP_IDENTIFIER: 'com.elcomercio.ElComercioiPhone',
  PACKAGE_NAME: 'com.gec.elcomercio',
  PRODUCT_FLAVOR: 'elcomercio',
  SCHEMA: 'ElComercio',
  FIREBASE_ANDROID_APP_ID: '1:690467688102:android:13e3db47f3dd4ba94b6e67',
  FIREBASE_IOS_APP_ID: '1:690467688102:ios:0d87a87899026c294b6e67',
  HUAWEI_APP_ID: '101673999',
  VERSION_CODE: process.env.CI_PIPELINE_IID,
}

export default config
