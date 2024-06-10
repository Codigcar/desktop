//
//  Inbox_API.h
//  didm_auth_sdk_iOS
//
//  Created by Mauricio Vivas on 10/20/16.
//  Copyright © 2016 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <didm_core/didm_core.h>

@interface Inbox_API : NSObject

+ (id _Nonnull)instance;

#pragma mark - Enable Response Alerts

- (void)resetBadgeNumber DEPRECATED_MSG_ATTRIBUTE("The method resetBadgeNumber is no longer supported, it will be removed in the next major release.");

- (void)automaticResetBadgeNumber:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method automaticResetBadgeNumber:(BOOL)enable is no longer supported, it will be removed in the next major release.");

- (void)displayTransactionDialog:(TransactionInfo * _Nonnull)transaction DEPRECATED_MSG_ATTRIBUTE("The method displayTransactionDialog:(TransactionInfo *)transaction is no longer supported, it will be removed in the next major release.");

/// Configure URLs to request Inbox transactions
///
/// This method allows you to configure the URLs of the DetectID Transaction Query API.
///
/// ```objc
/// [[[DetectID sdk] getInboxApi] setupTransactionInbox:urlPushAlert urlPushAuth:urlPushAuth urlPushBiometric:urlPushBiometric];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getInboxApi().setupTransactionInbox(urlPushAlert, urlPushAuth: urlPushAuth, urlPushBiometric: urlPushBiometric)
/// ```
/// - Parameters:
///   - urlPushAlert: The URL for querying alert notifications.
///   - urlPushAuth: The URL for querying Push transactions
///   - urlPushBiometric: The URL for querying transactions using biometrics.
- (void)setupTransactionInbox:(NSString * _Nonnull)urlPushAlert urlPushAuth:(NSString * _Nonnull)urlPushAuth urlPushBiometric:(NSString * _Nonnull)urlPushBiometric;

/// Get all transactions by type for specific account.
///
/// This method returns Push objects in ascending order by received date in an object NSArray, TransactionInfo filtered according to their transaction type ``TransactionType`` and by associated account. The consulted transaction list comes from the block of which also forms part of the query parameters.
///
/// ```objc
/// [[[DetectID sdk] getInboxApi] getAllTransactionsByType:account type:type page:pageTransaction onResponseSuccessfull:^(NSArray *arrayTransactionInfo, int totalPages, int totalRecords){
///
/// } onResponseFail:^(NSString *result) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getInboxApi().getAllTransactions(byType: account, type: transactionType, page: page, onResponseSuccessfull: { transactionList, totalPages, totalRecords in
///
/// }) { error in
///
/// }
/// ```
/// - Parameters:
///   - account: account associated with the query.
///   - transactionType: type of transaction to query.
///   - pageTransaction: page number to query, the first value must be 1 to query the total pages and with this value, you should perform next queries.
///   - onResponseSuccessfull: This block is the method called when the consult is successful as a NSArray transaction list found.
///   - onResponseFail: This method is called when the DetectID request fails returning a NSString error response code.
- (void)getAllTransactionsByType:(Account * _Nonnull)account type:(TransactionType)transactionType page:(int)pageTransaction onResponseSuccessfull:(void (^ _Nullable)(NSArray * _Nonnull, int, int))onResponseSuccessfull onResponseFail:(void (^ _Nullable)(NSString * _Nonnull))onResponseFail;

/// Get all transactions by type and status for specific account.
///
/// This method is delivered according to the transaction status. The list of transactions comes in a listener named ``TransactionInfo``, which also forms part of the query parameters.
///
/// ```objc
/// [[[DetectID sdk] getInboxApi] getAllTransactionsByType:account type:type withStatus:status page:pageTransaction onResponseSuccessfull:^(NSArray *arrayTransactionInfo, int totalPages, int totalRecords){
///
/// } onResponseFail:^(NSString *result) {
///
/// }];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getInboxApi().getAllTransactions(byType: account, type: transactionType, with: transactionStatus, page: page, onResponseSuccessfull: { transactionList, totalPages, totalRecords in
///
/// }) { error in
///
/// }
/// ```
/// - Parameters:
///   - account: account associated with the query.
///   - transactionType: type of transaction to query.
///   - status: Transaction’s consulting status used by the ``TransactionStatus`` enumerator.
///   - pageTransaction: page number to query, the first value must be 1 to query the total pages and with this value, you should perform next queries.
///   - onResponseSuccessfull: This block is the method called when the consult is successful as a NSArray transaction list found.
///   - onResponseFail: This method is called when the DetectID request fails returning a NSString error response code.
- (void)getAllTransactionsByType:(Account * _Nonnull)account type:(TransactionType)transactionType withStatus:(TransactionStatus)status page:(int)pageTransaction onResponseSuccessfull:(void (^ _Nullable)(NSArray * _Nonnull, int, int))onResponseSuccessfull onResponseFail:(void (^ _Nullable)(NSString * _Nonnull))onResponseFail;

@end
