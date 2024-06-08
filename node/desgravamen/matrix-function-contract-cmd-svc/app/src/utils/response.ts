export class HttpResponse {

  static okResponse(statusCode = 200, code: string, message = {}, details?: any) {
    return {
      statusCode,
      body: JSON.stringify(message),
    };
  }

  static defineResponse(statusCode = 502, code: string, message = {}, details?: any) {
    return {
      statusCode,
      body: JSON.stringify({ code, message, details }),
    };
  }

  static _200(message: any) {
    return this.okResponse(200, 'OK', message);
  }

  static _202(message: any) {
    return this.okResponse(202, 'ACCEPTED', message);
  }

  static _204(message: any) {
    return this.okResponse(204, 'NO_CONTENT', message);
  }

  static _400(code: any, message: any, details = []) {
    return this.defineResponse(400, code ? code : 'BAD_REQUEST', message, details);
  }

  static _401(code: any, message: any, details = []) {
    return this.defineResponse(401, code ? code : 'UNAUTHORIZED', message, details);
  }

  static _403(code: any, message: any, details = []) {
    return this.defineResponse(403, code ? code : 'FORBIDDEN', message, details);
  }

  static _412(code: any, message: any, details = []) {
    return this.defineResponse(412, code ? code : 'PRECONDITION_FAILED', message, details);
  }

  static _404(code: any, message: any, details = []) {
    return this.defineResponse(404, code ? code : 'NOT_FOUND', message, details);
  }

  static _500(message: any, details = []) {
    return this.defineResponse(500, 'INTERNAL_SERVER_ERROR', message, details);
  }

  static _custom(statusCode: number, code: string, message = {}, details = []) {
    return this.defineResponse(statusCode, code ? code : 'INTERNAL_SERVER_ERROR', message, details);
  }
}

export class JsonResponse {
  static okResponse(code: string, message = {}, details?: any) {
    return message;
  };

  static defineResponse(code: string, message = {}, details?: any) {
    return {
      code,
      message,
      details
    }
  };

  static _200(message: any) {
    return this.okResponse('OK', message);
  }

  static _201(message: any) {
    return this.okResponse('CREATED', message);
  }

  static _202(message: any) {
    return this.okResponse('ACCEPTED', message);
  }

  static _204(message: any) {
    return this.okResponse('NO_CONTENT', message);
  }

  static _400(code: any, message: any, details = []) {
    return this.defineResponse(code ? code : 'BAD_REQUEST', message, details);
  }

  static _401(code: any, message: any, details = []) {
    return this.defineResponse(code ? code : 'UNAUTHORIZED', message, details);
  }

  static _403(code: any, message: any, details = []) {
    return this.defineResponse(code ? code : 'FORBIDDEN', message, details);
  }

  static _412(code: any, message: any, details = []) {
    return this.defineResponse(code ? code : 'PRECONDITION_FAILED', message, details);
  }

  static _404(code: any, message: any, details = []) {
    return this.defineResponse(code ? code : 'NOT_FOUND', message, details);
  }

  static _500(message: any, details = []) {
    return this.defineResponse('INTERNAL_SERVER_ERROR', message, details);
  }

  static _custom(statusCode: number, code: string, message = {}, details = []) {
    return this.defineResponse(code ? code : 'INTERNAL_SERVER_ERROR', message, details);
  }
}
