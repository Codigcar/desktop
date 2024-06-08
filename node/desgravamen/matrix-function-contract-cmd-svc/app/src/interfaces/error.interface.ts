export interface IErrorMessage {
  code: string;
  message: string;
  details: IMessage[];
}

export interface IMessage {
  message: string;
}
