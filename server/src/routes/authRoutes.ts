import express from 'express';
import { register, login } from '../controllers/authController';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
