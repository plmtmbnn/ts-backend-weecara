import { NodePostgres } from '../connection/pg.conn';


import { atob } from 'atob';
import { OpResult } from '../helper/operation_result';
import { responseMessage } from '../helper/response_message_constant';
import { BaseService } from './service.base';
import { ResponseHandler } from '../helper/response_handler';
const CryptoJS = require('crypto-js');

export class UserService extends BaseService {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  async login(): Promise<void> {
    if (this.req.headers.authorization) {
      const rawLogin = atob(this.req.headers.authorization).replace('basic ', '');
      const loginCredential = rawLogin.split(':');

      const payload = {
        username: loginCredential[0],
        password: loginCredential[1]
      };
      ResponseHandler.send(this.res, OpResult.success({
        message: responseMessage.SUCCESS,
        fullname: 'WEECARA',
        token: 'awfwaf@$523afaw32523523asfaf3534'
      }, false), 200);
      } else {
        ResponseHandler.send(this.res, OpResult.failed(responseMessage.MISSING_REQUIRED_DATA), 400);
      }
  }
}
