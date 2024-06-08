// RCTComScoreModule.m
#import "RCTComScoreModule.h"
#import <ComScore/ComScore.h>

@implementation RCTComScoreModule

// To export a module named RNComScore
RCT_EXPORT_MODULE(RNComScore);

RCT_EXPORT_METHOD(initialize:(NSDictionary *)launchOptions
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    SCORPublisherConfiguration *publisherConfiguration = [SCORPublisherConfiguration publisherConfigurationWithBuilderBlock:^(SCORPublisherConfigurationBuilder *builder) {
      builder.publisherId = launchOptions[@"publisherID"];
    }];
    [SCORAnalytics configuration].applicationName = launchOptions[@"appName"];
    [[SCORAnalytics configuration] addClientWithConfiguration:publisherConfiguration];
    
    #if DEBUG
      [[SCORAnalytics configuration] enableImplementationValidationMode];
    #endif
    [SCORAnalytics start];
    resolve(nil);
  }
  @catch (NSException *exception) {
    reject(@"%@", exception.reason, nil);
  }
}

@end
