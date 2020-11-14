import { Router } from 'express';
import compilerController from './compilerController';

const router = Router();

router.get('/compile', compilerController.codeSubmission);

export default router;
