//
//  GeneralFaceResponse.h
//  didm_auth_sdk_iOS
//
//  Created by Gerardo Tarazona on 12/7/18.
//  Copyright © 2018 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <didm_sdk/FaceMatchingResponse.h>
#import <didm_sdk/FaceResponse.h>

NS_ASSUME_NONNULL_BEGIN

@interface GeneralFaceResponse : FaceMatchingResponse

@property (nonatomic, strong, readwrite) FaceResponse *faceResponse;

@end

NS_ASSUME_NONNULL_END
