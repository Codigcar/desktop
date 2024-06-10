//
//  SDK_DID.h
//  SDK DetectID
//
//  Created by Jonathan Alonso on 6/09/13.
//  Copyright (c) 2013 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <didm_sdk/TokenViewProperties.h>

@interface OTP_Authentication_API : NSObject

@property (weak, nonatomic) id<OnClientArgumentsErrors> _Nullable onClientArgumentsDelegate;
@property (weak, nonatomic) id<OnServerParametersErrors> _Nullable onServerParametersErrorsDelegate;

#pragma mark - OTP Actions

/// OTP View to specific account
///
/// Returns the Token as a UIView object for the specified Account. The returned view can be added as a subview, resizes itself depending on the type of device used, and its location on the screen can be customized.
///
/// ```objc
/// UIView *otpView = [[[DetectID sdk] getOtpApi] getTokenView:account];
/// ```
/// ```swift
/// let otpView = (DetectID.sdk() as! DetectID).getOtpApi().getTokenView(account)
/// ```
/// - Parameters:
///  - account: The account associated to the Token.
/// - Returns: A UIView  containing the visual representation of the Token.
- (UIView * _Nonnull)getTokenView:(Account * _Nonnull)account;

/// OTP String value to specific account
///
/// This method returns the Token’s current value as a NSString for the specified account.
///
/// ```objc
/// NSString *otpStringValue = [[[DetectID sdk] getOtpApi] getTokenValue:account];
/// ```
/// ```swift
/// let otpStringValue = (DetectID.sdk() as! DetectID).getOtpApi().getTokenValue(account)
/// ```
/// - Parameters:
///  - account: The account associated to the Token.
/// - Returns: A NSString containing the representation of the Token.
- (NSString * _Nonnull)getTokenValue:(Account * _Nonnull)account;

/// Time Step to specific account for the current One-Time Password
///
/// Returns an integer number between 0 and 99, indicating the progress of the bar for the specified account.
///
/// ```objc
/// int timeStepValue = [[[DetectID sdk] getOtpApi] getTokenTimeStepValue:account];
/// ```
/// ```swift
/// let timeStepValue = (DetectID.sdk() as! DetectID).getOtpApi().getTokenTimeStepValue(account)
/// ```
/// - Parameters:
///  - account: The account associated to the Token.
/// - Returns: A integer number between 0 to 99.
- (int)getTokenTimeStepValue:(Account * _Nonnull)account;

#pragma mark - OTP Configuration

/// Customize the OTP View returned in the method ``getTokenView:``
///
/// Method that receives  the object ``TokenViewProperties`` to configure the OTP user interface.
///
/// ```objc
/// TokenViewProperties *tokenViewProperties = [TokenViewProperties new];
/// [[[DetectID sdk] OTP_API] setTokenViewProperties:tokenViewProperties];
/// ```
/// ```swift
/// let tokenViewProperties = TokenViewProperties()
/// (DetectID.sdk() as! DetectID).getOtpApi().setTokenViewProperties(tokenViewProperties)
/// ```
/// - Parameters:
///  - properties: TokenViewProperties object with the custom configurations.
- (void)setTokenViewProperties:(TokenViewProperties * _Nonnull)properties;

/// Challenge OTP String value to specific account
///
/// This method returns the OTP associated to the provided account and the answer to the challenge presented by the SDK.
///
/// ```objc
/// NSString *otpStringValue = [[[DetectID sdk] getOtpApi] getChallengeQuestionOtpWithAccount:account answer:@"YOUR_ANSWER"];
/// ```
/// ```swift
/// let otpStringValue = (DetectID.sdk() as! DetectID).getOtpApi().getTokenView(account)
/// ```
/// - Parameters:
///  - account: The account associated to the Token.
///  - answer: Answer to get Challenge OTP value.
/// - Returns: A NSString containing the representation of the Token.
- (NSString * _Nonnull)getChallengeQuestionOtpWithAccount:(Account * _Nonnull)account answer:(NSString * _Nonnull)answer;

- (long)getInterval:(Account * _Nonnull)account;

@end


