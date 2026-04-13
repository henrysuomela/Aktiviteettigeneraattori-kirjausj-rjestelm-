import { Router } from 'express';
import { getAllSuggestions, getSuggestionById, generateSuggestion, acceptSuggestion } from '../controllers/suggestions.js';

const router = Router();

router.get('/', getAllSuggestions);
router.get('/:id', getSuggestionById);
router.post('/', generateSuggestion);
router.patch('/:id/accept', acceptSuggestion);

export default router;