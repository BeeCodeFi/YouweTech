import { Router } from 'express';
import { getProfile, updateProfile, listClients } from '../controllers/user.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.get('/', requireRole('ADMIN'), listClients);

export { router as userRouter };
