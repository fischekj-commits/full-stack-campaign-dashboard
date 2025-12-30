import { Router } from 'express';
import { campaignController } from '../controllers/campaignController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', campaignController.getAll);
router.get('/stats', campaignController.getStats);
router.get('/:id', campaignController.getById);
router.post('/', campaignController.create);
router.put('/:id', campaignController.update);
router.delete('/:id', campaignController.delete);

export default router;
