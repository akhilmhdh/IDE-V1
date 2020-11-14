import { RequestHandler } from 'express';
import compilerValidator from './compilerValidator';

const codeSubmission: RequestHandler = (req, res, next) => {
    try {
        // validate req body
        const { error, value } = compilerValidator.submit.validate(req.body);
        if (error) next({ statusCode: 417, message: 'Validation failed' });

        res.send({ hello: 'world' });
    } catch (error) {
        next({ statusCode: 500, message: error });
    }
};

export default {
    codeSubmission
};
