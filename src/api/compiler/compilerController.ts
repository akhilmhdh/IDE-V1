import { RequestHandler } from 'express';

const codeSubmission: RequestHandler = (req, res, next) => {
    res.send({ hello: 'world' });
    next();
};

export default {
    codeSubmission
};
