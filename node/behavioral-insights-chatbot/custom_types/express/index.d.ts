
declare namespace Express {
  export interface Request {
    locals: {
      user?: false|object;
      model?: any|false;
      models?: object;
      tokenData?: {
        type?: string;
        landId?: number;
        user?: {
          id: number;
          deletedAt?: Date;
          cratedAt?: Date;
          updatedAt?: Date;
          //
          password: string;
          email: string;
          altEmail: string;
          username: string;
          active: boolean;
          name: string;
          surname: string;
          completeName: string;
          comments?: string;
          companyName: string;
        };
        lot?: object;
      };
      navigation: {
        where: object|any;
        limit?: number;
        offset?: number;
        order?: any[]|undefined;
        attributes?: string[];
      }
    };
  }
  export interface Response{
    locals: {
      navigation?: {
        where?: object;
        limit?: number;
        offset?: number;
        order?: string[]|undefined;
      }
      navigationMeta?: object;
      response?: object|object[];
      extra?: object;
      data?: {
        rows?: object|object[];
        count?: number;
      } | object;
      user?: false|object;
      status?: boolean;
      tokenData?: object;
    }
  }
}