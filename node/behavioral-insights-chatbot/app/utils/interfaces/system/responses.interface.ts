export interface ResponsesInterface {
  status?: boolean;
  statusCode?: number;
  data?: object | object[];
  meta?: MetaDataInterface;
  message?: string;
  code?: string | number;
}

export interface ResponsesErrorInterface {
  status: false;
  statusCode: 500 | number;
  name?: string;
  error?: object | object[];
}

export interface MetaDataInterface {
  where?: object;
  page?: number;
  limit?: number;
  count?: number;
  lastPage?: number;
}
