import { Request, Response } from 'express';

// Middleware
// import { dashboardMiddleware } from '../middleware/middleware';

// Controller
import { userController } from '../controller/controller.user';

const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'This API is running well'
  });
});

// ===== AUTHENTICATION
router.post('/login', userController.login);


module.exports = router;
