import { Router } from 'express';
import compilerController from './compilerController';

const router = Router();

router.post('/compile', compilerController.codeSubmission);

export default router;
