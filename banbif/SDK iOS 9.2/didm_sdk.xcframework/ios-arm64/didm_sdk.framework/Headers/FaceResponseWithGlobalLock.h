//
//  FaceResponseWithGlobalLock.h
//  didm_auth_sdk_iOS
//
//  Created by Gerardo Tarazona on 12/5/18.
//  Copyright © 2018 appgate Inc. All rights reserved.
//

#import <didm_sdk/FaceResponse.h>
#import <didm_sdk/GlobalLock.h>

NS_ASSUME_NONNULL_BEGIN

@interface FaceResponseWithGlobalLock : FaceResponse

@property (nonatomic, strong, readwrite) GlobalLock *globalLock;

@end

NS_ASSUME_NONNULL_END
