import { UserProfileService } from '../service/service.user-profile';
import * as Joi from 'joi';
import { responseMessage } from '../helper/response_message_constant';
import { ResponseHandler } from '../helper/response_handler';
import { Success, Failed } from '../helper/operation_result_helper';
import { Request, Response } from 'express';

export class UserProfileController {
  async getUserProfile (req: Request, res: Response): Promise<void> {
    const initialSchema: any = {
      user_id: Joi.string().required()
    };
    const validation: any = Joi.validate(req.body, initialSchema);
    if (validation.error === null) {
      const userProfile: UserProfileService = new UserProfileService(req, res);
      await userProfile.getUserProfile();
    } else {
      console.log('[UserProfileController][getUserProfile] ', req.headers, validation.error);
      ResponseHandler.send(res, Failed(responseMessage.MISSING_REQUIRED_DATA), 400);
    }
  }
}

export const userProfileController = new UserProfileController();
