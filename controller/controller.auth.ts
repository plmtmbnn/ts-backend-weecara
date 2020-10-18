import { AuthService } from '../service/service.auth';
import * as Joi from 'joi';
import { responseMessage } from '../helper/response_message_constant';
import { ResponseHandler } from '../helper/response_handler';
import { Success, Failed } from '../helper/operation_result_helper';
import { Request, Response } from 'express';

export class AuthController {
  async login (req: Request, res: Response): Promise<void> {
    const initialSchema: any = {
      email: Joi.string().required(),
      password: Joi.string().required()
    };
    const validation: any = Joi.validate(req.body, initialSchema);
    if (validation.error === null) {
      const authService: AuthService = new AuthService(req, res);
      await authService.login();
    } else {
      console.log('[AuthController][login] ', req.headers, validation.error);
      ResponseHandler.send(res, Failed(responseMessage.MISSING_REQUIRED_DATA), 400);
    }
  }
}

export const authController = new AuthController();
