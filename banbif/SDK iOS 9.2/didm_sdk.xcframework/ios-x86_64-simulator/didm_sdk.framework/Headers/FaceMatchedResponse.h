//
//  FaceMatchedResponse.h
//  didm_auth_sdk_iOS
//
//  Created by Gerardo Tarazona on 12/5/18.
//  Copyright © 2018 appgate Inc. All rights reserved.
//

#import <didm_sdk/FaceMatchingResponse.h>
#import <didm_sdk/FaceResponseWithAttempts.h>
#import <didm_sdk/FaceAuthenticationInfo.h>
#import <didm_sdk/AuthenticationInfoProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface FaceMatchedResponse : FaceMatchingResponse <AuthenticationInfoProtocol>

@property (nonatomic, strong, readwrite) FaceResponseWithAttempts *faceResponse;
@property (nonatomic, strong, readwrite) FaceAuthenticationInfo *authInfo;

@end

NS_ASSUME_NONNULL_END

