/* eslint-disable no-unused-expressions */
export class ResponseHandler {
  static send (res: any, responseHandler: any, code: number) {
    const response: any = {
      status: code === 200 ? 'SUCCESS' : 'FAILED',
      ...responseHandler
    };
    res.status(code).json(response);
  }
}
