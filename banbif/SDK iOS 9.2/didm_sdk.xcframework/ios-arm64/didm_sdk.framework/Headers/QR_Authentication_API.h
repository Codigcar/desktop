//
//
//  Created by Javier Silva on 9/17/14.
//  Copyright (c) 2014 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <didm_core/didm_core-Swift.h>

#import <didm_sdk/QRCodeTransactionViewProperties.h>

#pragma mark - QR Transaction Delegate

__attribute__ ((deprecated))
@protocol QRCodeScanTransactionDelegate <NSObject>

@required
- (void)onQRCodeScanTransaction:(TransactionInfo *_Nonnull)transaction;

@end

__attribute__ ((deprecated))
@protocol QRCodeTransactionActionDelegate <NSObject>

@required
- (void)onConfirmQRCodeTransaction:(TransactionInfo *_Nonnull)transaction;
@required
- (void)onDeclineQRCodeTransaction:(TransactionInfo *_Nonnull)transaction;

@end

__attribute__ ((deprecated))
@protocol QRCodeTransactionServerResponseDelegate <NSObject>

@required
- (void)onQRCodeTransactionServerResponse:(NSString *_Nonnull)response;

@end

@interface QR_Authentication_API : NSObject

#pragma mark - QR Authentication API Delegate
@property (strong, nonatomic) id<QRCodeScanTransactionDelegate> _Nonnull QRCodeScanTransactionDelegate DEPRECATED_MSG_ATTRIBUTE("The property QRCodeTransactionServerResponseDelegate is no longer supported, it will be removed in the next major release.");
@property (strong, nonatomic) id<QRCodeTransactionServerResponseDelegate> _Nonnull QRCodeTransactionServerResponseDelegate DEPRECATED_MSG_ATTRIBUTE("The property QRCodeTransactionServerResponseDelegate is no longer supported, it will be removed in the next major release.");
@property (strong, nonatomic) id<QRCodeTransactionActionDelegate> _Nonnull QRCodeTransactionActionDelegate DEPRECATED_MSG_ATTRIBUTE("The delegate QRCodeTransactionActionDelegate is no longer supported, it will be removed in the next major release.");;

+ (id _Nonnull)instance;

#pragma mark - QR Code Actions

- (void)qrAuthenticationProcess:(Account *_Nonnull)account withQrContent:(NSString *_Nonnull)qrContent DEPRECATED_MSG_ATTRIBUTE("The method qrAuthenticationProcess is no longer supported, it will be removed in the next major release. Please use [[[DetectID sdk] getQrApi] qrAuthenticationProcess: withQrContent: onSucess: onFailure:] instead.");

- (void)qrAuthenticationProcess:(Account *_Nonnull)account withQrContent:(NSString *_Nonnull)qrContent
                      onSuccess:(void (^ _Nullable)(TransactionInfo * _Nonnull))completionSuccess
                      onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;


#pragma mark - QR Code Configuration

- (void)setQRCodeTransactionViewProperties:(QRCodeTransactionViewProperties *_Nonnull)properties DEPRECATED_MSG_ATTRIBUTE("The method setQRCodeTransactionViewProperties:(QRCodeTransactionViewProperties *)properties is no longer supported, it will be removed in the next major release.");

#pragma mark - Native Dialog Configuration

- (void)enableQRCodeTransactionDefaultDialog:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enableQRCodeTransactionDefaultDialog:(BOOL)enable is no longer supported, it will be removed in the next major release.");

#pragma mark - Server Actions

- (void)confirmQRCodeTransactionAction:(TransactionInfo *_Nonnull)transaction DEPRECATED_MSG_ATTRIBUTE("The method confirmQRTransactionAction:(TransactionInfo *)transaction is no longer supported, it will be removed in the next major release. Use confirmQRCodeTransactionAction:(TransactionInfo *)transaction onSuccess: onFailure instead.");

- (void)declineQRCodeTransactionAction:(TransactionInfo *_Nonnull)transaction DEPRECATED_MSG_ATTRIBUTE("The method confirmQRTransactionAction:(TransactionInfo *)transaction is no longer supported, it will be removed in the next major release. Use declineQRCodeTransactionAction:(TransactionInfo *)transaction onSuccess: onFailure instead.");

/// Confirm a QR Transaction.
///
/// This method executes the action to decline the received transaction; it is useful to implement or control the visualization of the QR transaction. This method will receive as parameter the TransactionInfo object in order to identify what transaction decline among all those received. Use the onSuccess and onFailure callbacks to handle the Server response.
///
/// ```objc
/// [[[DetectID sdk] getQrApi] confirmQRCodeTransactionAction:transaction onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getQrApi().confirmQRCodeTransactionAction(transaction, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - transaction: ``TransactionInfo`` object that contains all the information required by DetectID Mobile to process a transaction.
///   - completionSuccess: Callback called when when authentication process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when authentication process failed.
-(void)confirmQRCodeTransactionAction:(TransactionInfo * _Nonnull)transaction onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

/// Decline a QR Transaction.
///
/// This method executes the action to decline the received transaction; it is useful to implement or control the visualization of the QR transaction. This method will receive as parameter the TransactionInfo object in order to identify what transaction decline among all those received. Use the onSuccess and onFailure callbacks to handle the Server response.
///
/// ```objc
/// [[[DetectID sdk] getQrApi] declineQRCodeTransactionAction:transaction onSuccess:^{
///
/// } onFailure:^(AGSDKError * _Nonnull error) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getQrApi().declineQRCodeTransactionAction(transaction, onSuccess: {
///
/// }, onFailure: { error in
///
/// })
/// ```
/// - Parameters:
///   - transaction: ``TransactionInfo`` object that contains all the information required by DetectID Mobile to process a transaction.
///   - completionSuccess: Callback called when when authentication process was succesfull.
///   - completionFailure: Callback with a ``AGSDKError`` when authentication process failed.
-(void)declineQRCodeTransactionAction:(TransactionInfo * _Nonnull)transaction onSuccess:(void (^ _Nullable)(void))completionSuccess onFailure:(void (^ _Nullable)(AGSDKError * _Nonnull))completionFailure;

/// Include custom information in QR Authentication responses.
///
/// This method includes additional information to the QR authentication answer being executed by the users on their mobile devices. For example, if a company wants to send the exact hour in which the QR authentication is being accepted or declined, it could be sent this value as additional information. (Additional Info). Receives as a parameter a NSDictionary kind object
///
/// ```objc
/// [[[DetectID sdk] getQrApi] setQRAuthenticationResponseAdditionalInfo:data];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getQrApi().setQRAuthenticationResponseAdditionalInfo(data)
/// ```
/// - Parameters:
///   - data: Dictionary where the key value attributes to be included to the transaction response are received.
- (void)setQRAuthenticationResponseAdditionalInfo:(NSDictionary *_Nonnull)data;

#pragma mark - Enable Response Alerts

- (void)enableQRCodeTransactionServerResponseAlerts:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enableQRCodeTransactionServerResponseAlerts:(BOOL)enable is no longer supported, it will be removed in the next major release.");

@end
