//
//  SdkSupportVersionResposeDelegate.h
//  didm_auth_sdk_iOS
//
//  Created by Juan Pablo Combariza on 4/26/18.
//  Copyright © 2018 Easy Solutions, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#define DEPRECATED_MESSAGE "This protocol is no longer supported, it will be removed in the next major release"
@protocol SdkSupportVersionResposeDelegate <NSObject>

@required

- (void)onSuccessResponse:(BOOL)supported DEPRECATED_MSG_ATTRIBUTE("The method onSuccessResponse:(BOOL)supported is no longer supported");
- (void)onFailedResponse DEPRECATED_MSG_ATTRIBUTE("The method onFailedResponse is no longer supported");

@end
