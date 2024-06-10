//
//  CommonAPI.h
//  didm_sdk
//
//  Created by Javier Silva on 12/10/14.
//  Copyright (c) 2014 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <didm_core/didm_core.h>

#import <didm_sdk/FingerprintTransactionViewProperties.h>
#import <didm_sdk/FingerprintRegistrationViewProperties.h>

#import <UserNotifications/UserNotifications.h>

__attribute__ ((deprecated))
@protocol DeviceRegistrationServerResponseDelegate <NSObject>

@required
- (void)onRegistrationResponse:(NSString * _Nonnull)result;

@end

@interface CommonAPI : NSObject

@property (nonatomic, assign) id<DeviceRegistrationServerResponseDelegate> _Nullable deviceRegistrationServerResponseDelegate DEPRECATED_MSG_ATTRIBUTE("The property deviceRegistrationServerResponseDelegate is no longer supported, it will be removed in the next major release.");

- (void)didInit DEPRECATED_MSG_ATTRIBUTE("The method didInit is no longer supported, it will be removed in the next major release.");

- (void)didRegistrationWithUrl:(NSString * _Nonnull)url DEPRECATED_MSG_ATTRIBUTE("The method didRegistrationWithUrl is no longer supported, it will be removed in the next major release. Please use [[DetectID sdk] didRegistrationWithUrl: onSuccess: onFailure:] instead.");

 /// Enroll an account with DetectID Server.
 ///
 /// For use all DetectedID SDK you need enroll an account, this is a relationship
 /// between user with unique mobile application.
 ///
 ///
 /// ```objc
 /// NSString url *url = @"http://YOUR_URL/path?code?=activationCode";
 /// [[DetectID sdk] didRegistrationWithUrl:url onSuccess:^{
///
 /// } onFailure:^(AGSDKError *error) {
///
 /// }];
 /// ```
 /// ```swift
 /// let url = "http://YOUR_URL/path?code?=activationCode"
 /// (DetectID.sdk() as! DetectID).didRegistration(withUrl: url, onSuccess: {
///
 /// }, onFailure: { error in
///
 /// })
 /// ```
 /// - Parameters:
 ///   - url: DetectID to enroll with activation code concatenate with a query string called code.
 ///   - completionSuccess: Callback called when enroll process was succesfull.
 ///   - completionFailure: Callback with a ``AGSDKError`` when enroll process failed.
 /// > Note:  The service retrieveMobileActivationCode, which is necessary to send the activation code to the SDK, depends on the configuration of DetectID Server. To learn more about this service, refer to the DetectID Integration Manual.
-(void)didRegistrationWithUrl:(NSString * _Nonnull) url onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

 /// Update global configuration to a specific account.
 ///
 /// You can sync global configuration from DetectID server like OTP/Challenge OTP lenght or duration
 /// for a specific account.
 ///
 /// ```objc
 /// [[DetectID sdk] updateGlobalConfig:account];
 /// ```
 /// ```swift
 /// (DetectID.sdk() as! DetectID).updateGlobalConfig(account)
 /// ```
 /// - Parameters:
 ///   - account: account to update global configurations.
- (void)updateGlobalConfig:(Account * _Nonnull)account;

 /// Method to receive the token from APNS.
 ///
 /// This method receives the token assigned by the Apple Push Notification Service for the device.
 /// This way, DetectID Server knows which device to send the corresponding notification to.
 ///
 /// ```objc
 /// [[DetectID sdk] receivePushServiceId:tokenId];
 /// ```
 /// ```swift
 /// (DetectID.sdk() as! DetectID).receivePushServiceId(tokenId)
 /// ```
 /// - Parameters:
 ///   - tokenId: This token is delivered by the Apple Push Notification Service through the method didRegisterForRemoteNotificationsWithDeviceToken.
- (void)receivePushServiceId:(NSData * _Nonnull)_tokenId;

 /// mobileID to identify a device as unique.
 ///
 /// This method returns an identifier used for identifying the app and device even after uninstalling the app so customers can create a deny list of devices that they want t
 ///
 /// ```objc
 /// [[DetectID sdk] getMobileID];
 /// ```
 /// ```swift
 /// (DetectID.sdk() as! DetectID).getMobileID()
 /// ```
/// - Returns: NSString with the getMobileID.
- (NSString * _Nonnull)getMobileID;

 /// MaskedAppInstanceID used in all transactions with DetectID server.
 ///
 /// This method returns an identifier used for identifying a single instance of the application on a mobile device. It can be used by customers for all requests or transactions with DetectID Server API.
 ///
 /// ```objc
 /// [[DetectID sdk] getMaskedAppInstanceID];
 /// ```
 /// ```swift
 /// (DetectID.sdk() as! DetectID).getMaskedAppInstanceID()
 /// ```
/// - Returns: NSString with the maskedAppInstanceID.
- (NSString * _Nonnull)getMaskedAppInstanceID;


- (NSString * _Nonnull)getDeviceID DEPRECATED_MSG_ATTRIBUTE("The method getDeviceID is no longer supported, it will be removed in the next major release.");

- (void)didRegistrationByQRCode:(NSString * _Nonnull)data fromUrl:(NSString * _Nonnull)url DEPRECATED_MSG_ATTRIBUTE("The method didRegistrationByQRCode: fromUrl: is no longer supported, it will be removed in the next major release. Please use [[DetectID sdk] didRegistrationByQRCode: fromUrl: onSuccess: onFailure:] instead.");

/// Enroll an account with DetectID Server through QR code.
///
/// For use all DetectedID SDK you need enroll an account, this is a relationship
/// between user with unique mobile application.
///
///
/// ```objc
/// NSString url *url = @"http://YOUR_URL/path?code?=activationCode";
/// [[DetectID sdk] didRegistrationByQRCode:code fromUrl:url onSuccess:^{
///
/// } onFailure:^(AGSDKError * error) {
///
/// }];
/// ```
/// ```swift
/// let url = "http://YOUR_URL/path?code?=activationCode"
/// (DetectID.sdk() as! DetectID).didRegistration(byQRCode: code, fromUrl: url, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - data: json string obtained from decoding the QR code.
///   - url: URL for the registration process.
///   - completionSuccess: Callback called when enroll process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when enroll process failed.
- (void)didRegistrationByQRCode:(NSString * _Nonnull)data fromUrl:(NSString * _Nonnull)url onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

/// Set the application name used during enrollment of accounts.
///
/// This method allows set application name to DetectID Server.
///
/// ```objc
/// [[DetectID sdk] setApplicationName:@"YOUR_APPLICATION_NAME"];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).setApplicationName("YOUR_APPLICATION_NAME")
/// ```
/// - Parameters:
///   - name: Name of application that will report to DetectID Server in each account enrolled.
- (void)setApplicationName:(NSString * _Nonnull)name;

/// Get all accounts enrolled in the application.
///
/// This method returns a list with all the accounts registered in the application.
///
/// ```objc
/// NSArray *account = [DetectID sdk] getAccounts];
/// ```
/// ```swift
/// let acconts = (DetectID.sdk() as! DetectID).getAccounts()
/// ```
/// - Returns: NSArray with all account objects enrolled in the aplication.
- (NSArray * _Nonnull)getAccounts;

- (BOOL)existAccounts DEPRECATED_MSG_ATTRIBUTE("The method existAccounts is no longer supported, it will be removed in the next major release.");

/// Remove a specific account from the application.
///
/// This method deletes the account data associated to a registered device.
///
/// ```objc
/// [[DetectID sdk] removeAccount:acccount];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).removeAccount(acccount)
/// ```
/// - Parameters:
///   - account: account object to removed.
- (void)removeAccount:(Account * _Nonnull)account;

/// Set an account name to a specific account.
///
/// This method assigns a customized name to the user account sent as parameter. This value is empty by default; that the company is responsible for defining whether it assigns or not this value to the end user.
///
/// ```objc
/// [[DetectID sdk] setAccountUsername:@"YOUR_USER_NAME" forAccount:account];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).setAccountUsername("YOUR_USER_NAME", for:account)
/// ```
/// - Parameters:
///   - userName: new user name.
///   - account: account object to update userName property.
- (void)setAccountUsername:(NSString * _Nonnull)username forAccount:(Account * _Nonnull)account;


- (void)setFingerprintRegistrationViewProperties:(FingerprintRegistrationViewProperties * _Nonnull)properties DEPRECATED_MSG_ATTRIBUTE("The method setFingerprintRegistrationViewProperties is no longer supported, it will be removed in the next major release.");

/// Set object to customize the appearance of the default local biometrics validation view used in authentication transactions.
///
/// As part of the library adaptability, the SDK offers the possibility to customize the appearance of the fingerprint validation default view.
///
/// ```objc
/// FingerprintTransactionViewProperties *properties = [FingerprintTransactionViewProperties new];
/// [[DetectID sdk] setFingerprintTransactionViewProperties:properties];
/// ```
/// ```swift
/// let properties = FingerprintTransactionViewProperties()
/// (DetectID.sdk() as! DetectID).setFingerprintTransactionViewProperties(properties)
/// ```
/// - Parameters:
///   - properties: ``FingerprintTransactionViewProperties`` object with the custom adjustment for local biometrics validation UI view.
- (void)setFingerprintTransactionViewProperties:(FingerprintTransactionViewProperties * _Nonnull)properties;

/// subscribePayload to recevied the token from APNS.
///
/// After the method ``isValidPayload`` determines that a push message comes from DetectID, it is necessary to subscribe that push message, so the SDK can administrate the message from that point forward. The method subscribePayload should be used to subscribe certified DetectID push messages and have the SDK administrate them.
///
/// ```objc
/// [[DetectID sdk] subscribePayload:notification];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).subscribePayload(notificationInfo)
/// ```
/// - Parameters:
///   - notificationInfo: Dictionary that receives the value key attributes of the notification.
- (void)subscribePayload:(NSDictionary * _Nonnull)notificationInfo;

/// isValidPayload to recevied the token from APNS.
///
/// This method allows the SDK to determine whether a push message received by the app comes from DetectID or not. This method should be used when the app receives push messages from push messaging sources different from DetectID
///
/// ```objc
/// BOOL isValidPayload = [[DetectID sdk] isValidPayload:notificationInfo];
/// ```
/// ```swift
/// let isValidPayload = (DetectID.sdk() as! DetectID).isValidPayload(notificationInfo)
/// ```
/// - Parameters:
///   - notificationInfo: Dictionary that receives the value key attributes of the notification.
/// - Returns: Boolean if the notificationInfo is valid for SDK.
- (BOOL)isValidPayload:(NSDictionary * _Nonnull)userInfo;

- (void)handleActionWithIdentifier:(NSString * _Nonnull)identifier forNotification:(NSDictionary * _Nonnull)userInfo DEPRECATED_MSG_ATTRIBUTE("The method handleActionWithIdentifier: forNotification: is no longer supported, it will be removed in the next major release. Please use [[DetectID sdk] handleActionWithIdentifier: forNotification: onSuccess: onFailure:] instead.");

/// Handle push authentication actions from AppDelegate implementation.
///
/// Method to interpret the quick actions of the notifications.
///
/// ```objc
/// [[DetectID sdk] handleActionWithIdentifier:identifier forNotification:userInfo  onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).handleAction(withIdentifier: identifier, forNotification: notification, onSuccess: {
///
/// } , onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - identifier:String identifier from the method ``handleActionWithIdentifier``.
///   - userInfo: Dictionary that receives the value key attributes of the notification from the method ``handleActionWithIdentifier``.
///   - completionSuccess: Callback called when when quick action handler process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when quick action handler process failed.
- (void)handleActionWithIdentifier:(NSString * _Nonnull)identifier forNotification:(NSDictionary * _Nonnull)userInfo onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

/// subscribePayload to recevied the token from APNS.
///
/// After the method ``isValidPayload`` determines that a push message comes from DetectID, it is necessary to subscribe that push message, so the SDK can administrate the message from that point forward. The method subscribePayload should be used to subscribe certified DetectID push messages and have the SDK administrate them.
///
/// ```objc
/// [[DetectID sdk] subscribePayload:notification withCompletionHandler:completionHandler]
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).subscribePayload(notificationInfo, withCompletionHandler:completionHanldler)
/// ```
/// - Parameters:
///   - notification: UNNotification that receives the value key attributes of the notification from the method ``willPresentNotification``.
///   - completionHandler: UNNotificationPresentationOptions from the method ``willPresentNotification``.
- (void)subscribePayload:(UNNotification * _Nonnull)notification withCompletionHandler:(void (^ _Nonnull)(UNNotificationPresentationOptions options))completionHandler;

- (void)handleActionWithIdentifier:(UNNotificationResponse * _Nonnull)response DEPRECATED_MSG_ATTRIBUTE("The method handleActionWithIdentifier is no longer supported, it will be removed in the next major release. Please use [[DetectID sdk] handleActionWithIdentifier: onSuccess: onFailure:] instead.");

/// Handle push authentication actions from UNNotification implementation.
///
/// Method to interpret the quick actions of the notifications.
///
/// ```objc
/// [[DetectID sdk] handleActionWithIdentifier:response onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).handleAction(withIdentifier:response, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - response: UNNotificationResponse from the method ``didReceiveNotificationResponse``.
///   - completionSuccess: Callback called when when quick action handler process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when quick action handler process failed.
- (void)handleActionWithIdentifier:(UNNotificationResponse * _Nonnull)response onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

- (NSSet * _Nonnull)getUNNotificationActionCategoriesForNotifications DEPRECATED_MSG_ATTRIBUTE("The method getUNNotificationActionCategoriesForNotifications is no longer supported, it will be removed in the next major release. Please use [[DetectID sdk] getUNNotificationActionCategoriesForNotificationsWithAcceptTitle: andDeclineTitle:] instead.");

/// Handle push authentication actions from UNNotification implementation.
///
/// It returns NSSet to configure action categories for Push Authentication using Accept and Decline titles.
///
/// ```objc
/// [[DetectID sdk] getUNNotificationActionCategoriesForNotificationsWithAcceptTitle:@"YOUR_ACCEPT_TITLE" andDeclineTitle:@"YOUR_DECLINE_TITLE"];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getUNNotificationActionCategoriesForNotifications(withAcceptTitle: "YOUR_ACCEPT_TITLE", andDeclineTitle: "YOUR_DECLINE_TITLE")
/// ```
/// - Parameters:
///   - acceptTitle: String value to approved button in Push Authentication from action categories.
///   - declineTitle: String value to decline button in Push Authentication from action categories.
/// - Returns: NSSet to enable quick actions and use it in ``[[UNUserNotificationCenter currentNotificationCenter] setNotificationCategories: ];``
- (NSSet * _Nonnull)getUNNotificationActionCategoriesForNotificationsWithAcceptTitle:(NSString * _Nonnull)acceptTitle andDeclineTitle:(NSString * _Nonnull)declineTitle;

@end
