import { UserService } from '../service/service.user';

export class UserController {
  async login (req: Request, res: Response): Promise<void> {
    const userService: UserService = new UserService(req, res);
    await userService.login();
  }
}

export const userController = new UserController();
