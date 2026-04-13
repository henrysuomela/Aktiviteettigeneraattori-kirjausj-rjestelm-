import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory } from '../controllers/categories.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);

export default router;