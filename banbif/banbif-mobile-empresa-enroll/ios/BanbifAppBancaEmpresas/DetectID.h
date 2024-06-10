#import <React/RCTBridgeModule.h>

#import <didm_sdk/didm_sdk.h>



@interface _DetectID : NSObject <RCTBridgeModule, DeviceRegistrationServerResponseDelegate>

@property (strong, nonatomic) DetectID *didSdk;
@property (strong, nonatomic) RCTPromiseResolveBlock resolveCodeBlock;

@end
