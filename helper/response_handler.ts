/* eslint-disable no-unused-expressions */
export class ResponseHandler {
    status: any;
    message: any;
    errorCode: any;
    data: any;
    flag: any;
    route: any;

    constructor () {
      this.status;
      this.message;
      this.errorCode;
      this.data;
      this.flag;
      this.route;
    }

    setResponse (status: any, message: any, data: any, flag: any) {
      this.status = status;
      this.message = message;
      this.data = data;
      this.flag = flag;
    }

    setError (message: any) {
      this.status = 'NOK';
      this.message = message.name;
      this.errorCode = message.code;
    }

    toJson () {
      return {
        status: this.status,
        message: this.message,
        errorCode: this.errorCode,
        data: this.data
      };
    }

    static send (res: any, responseHandler: any, code: number = 200) {
      responseHandler.status = responseHandler.status ? 'SUCCESS' : 'FAILED';
      const httpCodeStatus: number = responseHandler.httpCodeStatus ? responseHandler.httpCodeStatus : code;
      delete responseHandler.httpCodeStatus;
      res.status(httpCodeStatus).json(responseHandler);
    }
}
