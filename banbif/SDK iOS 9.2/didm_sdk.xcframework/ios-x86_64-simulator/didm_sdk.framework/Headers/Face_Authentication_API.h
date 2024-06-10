//
//  Face_Authentication_API.h
//  didm_auth_sdk_iOS
//
//  Created by Daniel Ayala on 2/29/16.
//  Copyright © 2016 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <didm_sdk/FaceTransactionViewProperties.h>
#import <didm_sdk/FaceRegistrationViewProperties.h>
#import <didm_sdk/FaceRegistrationServerResponseDelegate.h>
#import <didm_sdk/FaceRegistrationOpenDelegate.h>
#import <didm_sdk/FaceTransactionServerResponseDelegate.h>
#import <didm_sdk/FaceTransactionOpenDelegate.h>
#import <didm_sdk/FaceRecognitionViewProperties.h>
#import <didm_sdk/FaceNotFoundDelegate.h>


@interface Face_Authentication_API : NSObject

+ (id)instance;

#pragma mark - Face Authentication API Delegates
@property (weak, nonatomic) id<FaceRegistrationServerResponseDelegate> faceRegistrationServerResponseDelegate;
@property (weak, nonatomic) id<FaceTransactionServerResponseDelegate> faceTransactionServerResponseDelegate;
@property (weak, nonatomic) id<FaceRegistrationOpenDelegate> faceRegistrationOpenDelegate;
@property (weak, nonatomic) id<FaceTransactionOpenDelegate> faceTransactionOpenDelegate;
@property (weak, nonatomic) id<FaceNotFoundDelegate> faceNotFoundDelegate;

#pragma mark - Enable Response Alerts

- (void)enableFaceRegistrationServerResponseAlerts:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enableFaceRegistrationServerResponseAlerts:(BOOL)enable is no longer supported, it will be removed in the next major release.");

/// Include custom information in Face Authentication responses.
///
/// This method includes additional information to the Face authentication answer being executed by the users on their mobile devices. For example, if a company wants to send the exact hour in which the Push authentication is being accepted or declined, it could be sent this value as additional information. (Additional Info). Receives as a parameter a NSDictionary kind object
///
/// ```objc
/// [[[DetectID sdk] getFaceApi] setFaceAuthenticationResponseAdditionalInfo:data];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getFaceApi().setFaceAuthenticationResponseAdditionalInfo(data)
/// ```
/// - Parameters:
///   - data: Dictionary where the key value attributes to be included to the transaction response are received.
- (void)setFaceAuthenticationResponseAdditionalInfo:(NSDictionary *)data;

- (void)enableFaceTransactionServerResponseAlerts:(BOOL)enable DEPRECATED_MSG_ATTRIBUTE("The method enableFaceTransactionServerResponseAlerts:(BOOL)enable is no longer supported, it will be removed in the next major release.");

/// Set object to customize the appearance of the default Face Transaction onbarding view.
///
/// Set custom properties for the Face Transaction onboarding view with the ``FaceTransactionViewProperties`` object.
///
/// ```objc
/// [[[DetectID sdk] getFaceApi] setFaceTransactionViewProperties:properties];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getFaceApi().setFaceTransactionViewProperties(properties)
/// ```
/// - Parameters:
///   - properties: ``FaceTransactionViewProperties`` object with the custom adjustment Face Transaction onbarding view.
- (void)setFaceTransactionViewProperties:(FaceTransactionViewProperties *)properties;

/// Set object to customize the appearance of the default Face Registration view.
///
/// Set custom properties for the Face Registration view with the ``FaceRegistrationViewProperties`` object.
///
/// ```objc
/// [[[DetectID sdk] getFaceApi] setFaceRegistrationViewProperties:properties];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getFaceApi().setFaceRegistrationViewProperties(properties)
/// ```
/// - Parameters:
///   - properties: ``FaceTransactionViewProperties`` object with the custom adjustment Face Registration view.
- (void)setFaceRegistrationViewProperties:(FaceRegistrationViewProperties *)properties;

/// Set object to customize the appearance of the default Face Authentication dialog.
///
/// Set custom properties for the Face Authentication dialog with the ``FaceRegistrationViewProperties`` object.
///
/// ```objc
/// [[[DetectID sdk] getFaceApi] setFaceRecognitionViewProperties:properties];
/// ```
/// ```swift
/// (DetectID.sdk() as! DetectID).getFaceApi().setFaceRecognitionViewProperties(properties)
/// ```
/// - Parameters:
///   - properties: ``FaceRecognitionViewProperties`` object with the custom adjustment Face Authentication dialog.
- (void)setFaceRecognitionViewProperties:(FaceRecognitionViewProperties *)properties;

@end

