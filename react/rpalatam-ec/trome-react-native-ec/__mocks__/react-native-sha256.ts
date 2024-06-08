export const sha256 = jest.fn((input: string) =>
  Promise.resolve(Buffer.from(input).toString('hex')),
)
