import {
  MetaDataInterface,
  ResponsesErrorInterface,
  ResponsesInterface,
} from './responses.interface';

export interface LocalsInterface {
  navigation?: {
    where?: object;
    limit?: number;
    offset?: number;
  };
  navigationMeta?: MetaDataInterface;
  response?: ResponsesInterface | ResponsesErrorInterface;
  extra?: object;
  data?: {
    rows?: object[];
    count?: number;
  };
}

export interface WhereInterface {
  [key: string]: string | string[];
}
