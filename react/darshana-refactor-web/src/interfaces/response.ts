export interface IResponseLink {
  first:  string;
  last:   string;
  next:   string;
  prev:   string;
}

export interface IResponse {
  data:         Array<any>;
  links:        Array<IResponseLink>;
  message:      string;
  meta:         any;
  status:       boolean;
}
