export const myContextMocked = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: '',
  functionVersion: '',
  invokedFunctionArn: '',
  memoryLimitInMB: '',
  awsRequestId: '',
  logGroupName: '',
  logStreamName: '',
  getRemainingTimeInMillis: function (): number {
    return 1;
  },
  done: function (error?: Error | undefined, result?: any): void {},
  fail: function (error: string | Error): void {},
  succeed: function (messageOrObject: any): void {},
};
