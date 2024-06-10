//
//  CommonAPI.h
//  didm_auth_sdk_1.0_iOS_6
//
//  Created by Javier Silva on 12/10/14.
//  Copyright (c) 2014 Easy Solutions Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Account.h"
#import "RegistrationViewProperties.h"
#import "FingerprintTransactionViewProperties.h"
#import "FingerprintRegistrationViewProperties.h"
#import <UserNotifications/UserNotifications.h>
#import <UserNotificationsUI/UserNotificationsUI.h>
#import "SdkSupportVersionResposeDelegate.h"
#import "InitParams.h"


@protocol DeviceRegistrationServerResponseDelegate <NSObject>

@required
- (void)onRegistrationResponse:(NSString *)result;

@end

@interface CommonAPI : NSObject

@property (nonatomic, assign) id<DeviceRegistrationServerResponseDelegate>deviceRegistrationServerResponseDelegate;

+ (id)instance;

- (id)initWithActivationController:(id) activationControllerParameter;

- (void)initDIDServerWithParams:(InitParams *)initParams DEPRECATED_MSG_ATTRIBUTE("the method initDIDServerWithParams:(InitParams *)initParams is no longer supported, please use instead didInit");

- (void)didInit;

- (void)didRegistrationWithUrl:(NSString *) url;

- (void)updateGlobalConfig:(Account *)account;

- (BOOL)isSdkVersionSupported DEPRECATED_MSG_ATTRIBUTE("The method isSdkVersionSupported is no longer supported, it will be removed in the next major release.");

- (void)receivePushServiceId:(NSData *)_tokenId;

- (NSString *)getDeviceID;

- (NSString *)getSharedDeviceID;

- (void)displayDeviceRegistrationDialog;

- (void)deviceRegistrationByCode:(NSString *)_code DEPRECATED_MSG_ATTRIBUTE("the method deviceRegistrationByCode:(NSString *)_code is no longer supported, please use instead didRegistrationWithUrl");

- (void)deviceRegistrationByQRCode:(UIViewController *)_currentView DEPRECATED_MSG_ATTRIBUTE("the method deviceRegistrationByQRCode:(UIViewController *)_currentView is no longer supported, please use instead didRegistrationByQRCode");

- (void)didRegistrationByQRCode:(UIViewController *)_currentView url: (NSString *) url;

- (void)setRegistrationViewProperties:(RegistrationViewProperties *)viewProperties;

- (NSArray *)getAccounts;

- (BOOL)existAccounts;

- (void)removeAccount:(Account *)account;

- (void)setAccountUsername:(NSString *)username forAccount:(Account *)account;

- (void)customLicenseAgreementPageTitle:(NSString *)title backButton:(NSString *)backButtonLabel backgroundBarColor:(UIColor *)colorBackground colorTitle:(UIColor *)colorTitle colorButton:(UIColor *)colorButton;

- (void)enableRegistrationServerResponseAlerts:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("the method enableRegistrationServerResponseAlerts:(BOOL)enable; is no longer supported");

- (void)configureSecurityCertificateConnection:(NSArray *)fileNames;

- (void)enableSecureCertificateValidationProtocol:(BOOL)enable;

- (void)setFingerprintRegistrationViewProperties:(FingerprintRegistrationViewProperties *)properties;

- (void)setFingerprintTransactionViewProperties:(FingerprintTransactionViewProperties *)properties;

- (void)subscribePayload:(NSDictionary *)notificationInfo;

- (BOOL)isValidPayload:(NSDictionary *)userInfo;

- (void)handleActionWithIdentifier:(NSString *)identifier forNotification:(NSDictionary *)userInfo;

- (void)subscribePayload:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler;

- (void)handleActionWithIdentifier:(UNNotificationResponse *)response;

- (NSSet *)getNotificationActionCategoriesForNotifications;

- (NSSet *)getUNNotificationActionCategoriesForNotifications;

@end
