//
//  UserBlocked.h
//  didm_auth_sdk_iOS
//
//  Created by Gerardo Tarazona on 12/5/18.
//  Copyright © 2018 appgate Inc. All rights reserved.
//

#import <didm_sdk/FaceMatchingResponse.h>
#import <didm_sdk/FaceResponseWithGlobalLock.h>

NS_ASSUME_NONNULL_BEGIN

@interface UserBlocked : FaceMatchingResponse

@property (nonatomic, strong, readwrite) FaceResponseWithGlobalLock *faceResponse;

@end

NS_ASSUME_NONNULL_END
