import { Router } from 'express';
import { getMessages, getMessageStats } from '../controllers/message.controller';

const router = Router();

router.get('/', getMessages);
router.get('/stats', getMessageStats);

export default router;