import { Router } from 'express';
import { getAllActivities, getActivityById, createActivity, deleteActivity } from '../controllers/activities.js';

const router = Router();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.delete('/:id', deleteActivity);

export default router;