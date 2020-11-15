import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import expressPinoLogger from 'express-pino-logger';

import logger from './utils/logger';
import { ErrorHandler, handleError } from './utils/errorHandler';

import CompilerRouter from './api/compiler';

dotenv.config();

const app = express();

/**
 * form parser middlewares
 */
app.use(express.json());
app.use(express.urlencoded());

/**
 * Middlewares
 */
app.use(expressPinoLogger({ logger }));

/**
 * Routes
 */
app.use('/code', CompilerRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

/**
 * Error handler middleware
 */
app.use(
    (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        handleError(err, res);
        next();
    }
);

export default app;
