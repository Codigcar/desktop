#import "DetectID.h"

@implementation _DetectID

RCT_EXPORT_MODULE(DetectID);

RCT_EXPORT_METHOD(deviceRegistrationByCode:(NSString *)urlAndCode resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  [[DetectID sdk] didRegistrationWithUrl:urlAndCode onSuccess:^{
      resolve(@"200");
      //Enrollment successfully, you can use the new account.
  } onFailure:^(AGSDKError *error) {
    NSInteger code = error.code;
    NSString *codeString = [@(code) stringValue];
    resolve(codeString);
      //Enrollment failed, check error.domain and error.code values to handle error.
  }];
}

-(void)onRegistrationResponse:(NSString *) resultCode {
  self.resolveCodeBlock(resultCode);
}


RCT_EXPORT_METHOD(getTokenValue:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSArray *accounts = [[DetectID sdk] getAccounts];

  if (accounts.count > 0) {

    Account *account = accounts[0];
    NSString* tokenValue = [[[DetectID sdk] OTP_API] getTokenValue:account];
    resolve(tokenValue);
  } else {
    NSError *error = nil;
    reject(@"no_cuentas", @"No cuentas", error);
  }
}

RCT_EXPORT_METHOD(removeAccount:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSArray *accounts = [[DetectID sdk] getAccounts];

  if (accounts.count > 0) {

    Account *account = accounts[0];
    [[DetectID sdk] removeAccount:account];
    resolve(@"OK");
  } else {
    resolve(@"No tiene cuentas");
  }
}

RCT_EXPORT_METHOD(getTokenTimeStepValue:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
  {
    NSArray *accounts = [[DetectID sdk] getAccounts];
    if (accounts.count > 0) {
      Account *account = accounts[0];
      NSInteger progress = [[[DetectID sdk] OTP_API] getTokenTimeStepValue:account];
      NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
      formatter.numberStyle = NSNumberFormatterDecimalStyle;
      NSString *progressString = [formatter stringFromNumber:@(progress)];


      resolve(progressString);
    } else {
      NSError *error = nil;
      reject(@"no_cuentas", @"No cuentas", error);
    }
  }

@end
