//
//  FaceMatchingResponse.h
//  didm_auth_sdk_iOS
//
//  Created by Gerardo Tarazona on 12/5/18.
//  Copyright © 2018 appgate Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <didm_core/didm_core.h>

NS_ASSUME_NONNULL_BEGIN


@interface FaceMatchingResponse: NSObject

@property (nonatomic, strong, readwrite)TransactionInfo *transactionInfo;

@end

NS_ASSUME_NONNULL_END
