import { NodePostgres } from '../connection/pg.conn';

import { responseMessage } from '../helper/response_message_constant';
import { BaseService } from './service.base';
import { ResponseHandler } from '../helper/response_handler';
import { Success, Failed } from '../helper/operation_result_helper';
import { Request, Response } from 'express';
import { UserModel } from '../model/model.user';
import { token } from '../middleware/jwt';
import Redis from '../middleware/redis';
const CryptoJS = require('crypto-js');

export class AuthService extends BaseService {
  constructor (req: Request, res: Response) {
    super(req, res);
  }

  async login (): Promise<void> {
    try {
      const conn: NodePostgres = new NodePostgres();
      const client: any = conn.getPoolConnection();
      const userModel: UserModel = new UserModel(client);
      const user: any = await userModel.checkUser(this.req.body.email);
      if (user.rowCount === 1) {
        const passwordHashed:string = CryptoJS.HmacSHA256(CryptoJS.MD5(this.req.body.password).toString(), 'weecara' + this.req.body.email).toString();
        if (user.rows[0].password === passwordHashed) {
          const tokenJwt: string = await this.generateToken(user.rows[0].id);
          ResponseHandler.send(this.res,
            Success({
              message: responseMessage.SUCCESS,
              data: {
                fullname: user.rows[0].name,
                token: tokenJwt,
                user_id: user.rows[0].id
              }
            })
            , 200);
        } else {
          ResponseHandler.send(this.res, Failed(responseMessage.USER_NOT_FOUND), 400);
        }
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

  async generateToken (user_id: string): Promise<string> {
    const tokenJwt: any = token({ user_id });
    const userSessionData = {
      token: tokenJwt
    };

    const redisSession = new Redis();
    await redisSession.updateValue(user_id, userSessionData, 60000);
    return tokenJwt;
  }
}
