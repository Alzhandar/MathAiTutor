import { Router } from 'express';
import { createTestCategory, getTestCategories } from '../controllers/testCategoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.route('/').post(authMiddleware, createTestCategory).get(authMiddleware, getTestCategories);

export default router;