import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../middleware/jwt';
import Redis from '../middleware/redis';
import { responseMessage } from '../helper/response_message_constant';

export async function middleware (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.headers.authorization !== undefined) {
      const tokenHeader = req.headers.authorization;
      const jwtValue = verifyToken(tokenHeader);

      const user_id = jwtValue.user_id;
      const redisSession = new Redis();
      const resultUserToken: any = await redisSession.publishAll(user_id);
      if (resultUserToken.token === tokenHeader) {
        next();
      } else {
        res.status(401).json({
          status: responseMessage.FAILED,
          message: responseMessage.NOT_AUTHORIZED
        });
      }
    } else {
      res.status(401).json({
        status: responseMessage.FAILED,
        message: responseMessage.NOT_AUTHORIZED
      });
    }
  } catch (e) {
    res.status(401).json({
      status: responseMessage.FAILED,
      message: responseMessage.NOT_AUTHORIZED
    });
  }
}
