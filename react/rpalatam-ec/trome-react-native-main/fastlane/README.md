fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios installCocoapods
```
fastlane ios installCocoapods
```
Install Cocoapods
### ios buildDebug
```
fastlane ios buildDebug
```
Build Dev
### ios distribute
```
fastlane ios distribute
```
Distribute app with Firebase
### ios buildRelease
```
fastlane ios buildRelease
```
Build Prod
### ios internal
```
fastlane ios internal
```
Submit a new Internal Build to TestFlight
### ios promote_internal_to_production
```
fastlane ios promote_internal_to_production
```
Promote TestFlight to Production

----

## Android
### android upload_crashlytics_symbols
```
fastlane android upload_crashlytics_symbols
```
Upload crashlytics symbols to Firebase
### android buildDebug
```
fastlane android buildDebug
```
Build APK
### android distribute
```
fastlane android distribute
```
Distribute app with Firebase
### android buildRelease
```
fastlane android buildRelease
```
Build AAB
### android internal
```
fastlane android internal
```
Submit a new Internal Build to Play Store
### android promote_internal_to_production
```
fastlane android promote_internal_to_production
```
Promote Internal to Production
### android upload_to_appgallery
```
fastlane android upload_to_appgallery
```
Upload to AppGallery Connect
### android submit_for_review_to_appgallery
```
fastlane android submit_for_review_to_appgallery
```
Submit for review to AppGallery Connect

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
