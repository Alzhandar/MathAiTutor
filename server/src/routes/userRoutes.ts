import express from 'express';
import { getProfile } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);

export default router;
