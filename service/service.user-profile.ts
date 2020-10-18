import { NodePostgres } from '../connection/pg.conn';

import { atob } from 'atob';
import { responseMessage } from '../helper/response_message_constant';
import { BaseService } from './service.base';
import { ResponseHandler } from '../helper/response_handler';
import { Success, Failed } from '../helper/operation_result_helper';
import { Request, Response } from 'express';

export class UserProfileService extends BaseService {
  constructor (req: Request, res: Response) {
    super(req, res);
  }

  async getUserProfile (): Promise<void> {
    ResponseHandler.send(this.res,
      Success({
        message: responseMessage.SUCCESS,
        data: {
          profile_information: {
            full_name: 'Guest User',
            email: null,
            phone_number: null,
            date_of_birth: null,
            gender: 'MALE',
            ava_url: 'https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'
          },
          membership_status: 'FREE_MEMBER',
          is_registered: false
        }

      })
      , 200);
  }
}
