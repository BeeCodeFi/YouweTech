import { Router } from 'express';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
} from '../controllers/project.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Clients see their own projects; admins see all (filtered in controller)
router.get('/', listProjects);
router.get('/:id', getProject);

// Admin only
router.post('/', requireRole('ADMIN'), createProject);
router.patch('/:id', requireRole('ADMIN'), updateProject);

export { router as projectRouter };
