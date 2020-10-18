import { Request, Response } from 'express';

// Controller
import { authController } from '../controller/controller.auth';
import { userProfileController } from '../controller/controller.user-profile';

// Middleware
import { middleware } from '../middleware/middleware';

const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'This API is running well'
  });
});

// ===== AUTHENTICATION
router.post('/auth/login', authController.login);

// ===== USER
router.post('/user/profile', middleware, userProfileController.getUserProfile);

module.exports = router;
