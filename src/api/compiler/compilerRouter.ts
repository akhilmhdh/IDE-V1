import { Router } from 'express';

const router = Router();

router.get('/compile', (req, res) => {
    res.send({ hello: 'world' });
});

export default router;
