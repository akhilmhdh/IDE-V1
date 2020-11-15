import { RequestHandler } from 'express';
import compilerValidator from './compilerValidator';
import compilerService from './compilerService';
import { ErrorHandler } from '../../utils/errorHandler';

const codeSubmission: RequestHandler = async (req, res, next) => {
    // validate req body
    const { error, value } = compilerValidator.submit.validate(req.body);
    try {
        if (error) throw new ErrorHandler(417, error.message);
        const compiledOutput = await compilerService.submit(value);
        res.send({ result: compiledOutput });
    } catch (error) {
        next(error);
    }
};

export default {
    codeSubmission
};
