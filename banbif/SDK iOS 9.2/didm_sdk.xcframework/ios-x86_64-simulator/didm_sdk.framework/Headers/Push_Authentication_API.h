//
//  Push_Authentication_API.h
//  Push_Authentication_API
//
//  Created by Jonathan Alonso on 12/12/13.
//  Copyright (c) 2023 appgate, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>
#import <UserNotificationsUI/UserNotificationsUI.h>

#import <didm_core/didm_core.h>
#import <didm_sdk/PushTransactionViewProperties.h>
#import <didm_sdk/PushAlertViewProperties.h>

#pragma mark - Push Transaction Delegates
@protocol PushTransactionOpenDelegate <NSObject>

@required
- (void)onPushTransactionOpen:(TransactionInfo * _Nonnull)transaction;

@end

@protocol PushTransactionActionDelegate <NSObject>

@required
- (void)onConfirmPushTransaction:(TransactionInfo * _Nonnull)transaction;
@required
- (void)onDeclinePushTransaction:(TransactionInfo * _Nonnull)transaction;

@end

__attribute__ ((deprecated))
@protocol PushTransactionServerResponseDelegate <NSObject>

@required
- (void)onPushTransactionServerResponse:(NSString * _Nonnull)response;

@end

#pragma mark - Push Alert Delegates
@protocol PushAlertOpenDelegate <NSObject>

@required
- (void)onPushAlertOpen:(TransactionInfo * _Nonnull)transaction;

@end

@interface Push_Authentication_API : NSObject

#pragma mark - Push Authentication API Delegates

@property (strong, nonatomic) id<PushTransactionOpenDelegate> _Nullable pushTransactionOpenDelegate;
@property (strong, nonatomic) id<PushAlertOpenDelegate> _Nullable pushAlertOpenDelegate;
@property (strong, nonatomic) id<PushTransactionActionDelegate> _Nullable pushTransactionActionDelegate;
@property (strong, nonatomic) id<PushTransactionServerResponseDelegate> _Nullable pushTransactionServerResponseDelegate DEPRECATED_MSG_ATTRIBUTE("The property pushTransactionServerResponseDelegate is no longer supported, it will be removed in the next major release.");

+ (id _Nonnull)instance;

#pragma mark - Native Dialog Configuration

- (void)setPushTransactionViewProperties:(PushTransactionViewProperties *_Nonnull)viewProperties DEPRECATED_MSG_ATTRIBUTE("The method setPushTransactionViewProperties:(PushTransactionViewProperties *)viewProperties is no longer supported, it will be removed in the next major release.");

- (void)setPushAlertViewProperties:(PushAlertViewProperties *_Nonnull)viewProperties DEPRECATED_MSG_ATTRIBUTE("The method setPushAlertViewProperties:(PushAlertViewProperties *)viewProperties is no longer supported, it will be removed in the next major release.");

- (void)enablePushTransactionDefaultDialog:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enablePushTransactionDefaultDialog:(BOOL)enable is no longer supported, it will be removed in the next major release.");

- (void)enablePushAlertDefaultDialog:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enablePushAlertDefaultDialog:(BOOL)enable is no longer supported, it will be removed in the next major release.");

#pragma mark - Custom View Controller

- (void)confirmPushTransactionAction:(TransactionInfo *_Nonnull)transaction DEPRECATED_MSG_ATTRIBUTE("The method confirmPushTransactionAction:(TransactionInfo *)transaction is no longer supported, it will be removed in the next major release. Use confirmPushTransactionAction:(TransactionInfo *)transaction onSuccess: onFailure instead.");

- (void)declinePushTransactionAction:(TransactionInfo *_Nonnull)transaction DEPRECATED_MSG_ATTRIBUTE("The method declinePushTransactionAction:(TransactionInfo *)transaction is no longer supported, it will be removed in the next major release. Use declinePushTransactionAction:(TransactionInfo *)transaction onSuccess: onFailure instead.");

/// Confirm a Push Transaction.
///
/// This method executes the action to decline the received transaction; it is useful to implement or control the visualization of the Push transaction. This method will receive as parameter the TransactionInfo object in order to identify what transaction decline among all those received. Use the onSuccess and onFailure callbacks to handle the Server response.
///
/// ```objc
/// [[[DetectID sdk] getPushApi] confirmPushTransactionAction:transaction onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getPushApi().confirmPushTransactionAction(transaction, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - transaction: ``TransactionInfo`` object that contains all the information required by DetectID Mobile to process a transaction.
///   - completionSuccess: Callback called when when authentication process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when authentication process failed.
-(void)confirmPushTransactionAction:(TransactionInfo * _Nonnull) transaction onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

/// Decline a Push Transaction.
///
/// This method executes the action to decline the received transaction; it is useful to implement or control the visualization of the Push transaction. This method will receive as parameter the TransactionInfo object in order to identify what transaction decline among all those received. Use the onSuccess and onFailure callbacks to handle the Server response.
///
/// ```objc
/// [[[DetectID sdk] getPushApi] declinePushTransactionAction:transaction onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getPushApi().declinePushTransactionAction(transaction, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - transaction: ``TransactionInfo`` object that contains all the information required by DetectID Mobile to process a transaction.
///   - completionSuccess: Callback called when when authentication process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when authentication process failed.
-(void)declinePushTransactionAction:(TransactionInfo * _Nonnull) transaction onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

///
/// Approves the current Push Alert. This method can be called as an action at any point of the custom transaction view.
///
/// This method executes the action to approve the received alert, it is useful to implement or control the Push Alert visualization. The delegate will return a TransactionInfo object, which will contain the information necessary to handle one or multiple received alerts.
///
/// ```objc
/// [[[DetectID sdk] getPushApi] approvePushAlertAction:transaction];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getPushApi().approvePushAlertAction(transaction)
/// ```
/// - Parameters:
///   - transaction: ``TransactionInfo`` object that contains all the information required by DetectID Mobile to process a transaction.
- (void)approvePushAlertAction:(TransactionInfo * _Nonnull)transaction;

/// Include custom information in Push Authentication responses.
///
/// This method includes additional information to the Push authentication answer being executed by the users on their mobile devices. For example, if a company wants to send the exact hour in which the Push authentication is being accepted or declined, it could be sent this value as additional information. (Additional Info). Receives as a parameter a NSDictionary kind object
///
/// ```objc
/// [[[DetectID sdk] getPushApi] setPushAuthenticationResponseAdditionalInfo:data];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getPushApi().setPushAuthenticationResponseAdditionalInfo(data)
/// ```
/// - Parameters:
///   - data: Dictionary where the key value attributes to be included to the transaction response are received.
- (void)setPushAuthenticationResponseAdditionalInfo:(NSDictionary * _Nonnull)data;


#pragma mark - Enable Response Alerts

- (void)enablePushTransactionServerResponseAlerts:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enablePushTransactionServerResponseAlerts:(BOOL)enable is no longer supported, it will be removed in the next major release.");

@end

