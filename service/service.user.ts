import { NodePostgres } from '../connection/pg.conn';

import { atob } from 'atob';
import { responseMessage } from '../helper/response_message_constant';
import { BaseService } from './service.base';
import { ResponseHandler } from '../helper/response_handler';
import { Success, Failed } from '../helper/operation_result_helper';
import { Request, Response } from 'express';
const CryptoJS = require('crypto-js');

export class UserService extends BaseService {
  constructor (req: Request, res: Response) {
    super(req, res);
  }

  async login (): Promise<void> {
    try {
      if (this.req.body.email === 'weecara' && this.req.body.password === 'weecara') {
        ResponseHandler.send(this.res,
          Success({
            message: responseMessage.SUCCESS,
            data: {
              fullname: 'WEECARA',
              token: 'awfwaf@$523afaw32523523asfaf3534'
            }
          })
          , 200);
      } else {
        ResponseHandler.send(this.res, Failed(responseMessage.USER_NOT_FOUND), 400);
      }
    } catch (error) {
      console.log(error);
      ResponseHandler.send(this.res, {
        message: responseMessage.PROCESSING_ERROR
      }, 200);
    }
  }
}
