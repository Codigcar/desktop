const inAppMessaging = (): unknown => ({
  setMessagesDisplaySuppressed: jest.fn().mockResolvedValue(null),
  triggerEvent: jest.fn().mockResolvedValue(null),
})

export default inAppMessaging
