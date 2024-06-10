//
//  DetectID.h
//  didm_sdk
//
//  Created by Javier Silva on 12/10/14.
//  Copyright (c) 2014 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <didm_sdk/QR_Authentication_API.h>
#import <didm_sdk/Push_Authentication_API.h>
#import <didm_sdk/OTP_Authentication_API.h>
#import <didm_sdk/Face_Authentication_API.h>
#import <didm_sdk/Inbox_API.h>
#import <didm_sdk/CommonAPI.h>

@interface DetectID: CommonAPI

@property (strong, nonatomic) OTP_Authentication_API * _Nonnull OTP_API DEPRECATED_MSG_ATTRIBUTE("Use getOtpApi method instead.");
@property (strong, nonatomic) Push_Authentication_API * _Nonnull PUSH_API DEPRECATED_MSG_ATTRIBUTE("Use getPushApi method instead.");
@property (strong, nonatomic) QR_Authentication_API * _Nonnull QR_API DEPRECATED_MSG_ATTRIBUTE("Use getQrApi method instead.");
@property (strong, nonatomic) Face_Authentication_API * _Nonnull FACE_API DEPRECATED_MSG_ATTRIBUTE("Use getFaceApi method instead.");
@property (strong, nonatomic) Inbox_API * _Nonnull INBOX_API DEPRECATED_MSG_ATTRIBUTE("Use getInboxApi method instead.");

+ (id _Nonnull)sdk;
- (OTP_Authentication_API * _Nonnull)getOtpApi;
- (Push_Authentication_API * _Nonnull)getPushApi;
- (QR_Authentication_API * _Nonnull)getQrApi;
- (Face_Authentication_API * _Nonnull)getFaceApi;
- (Inbox_API * _Nonnull)getInboxApi;

@end
