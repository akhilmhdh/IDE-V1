import express from 'express';
import dotenv from 'dotenv';
import expressPinoLogger from 'express-pino-logger';
import logger from './utils/logger';

import CompilerRouter from './components/compiler';

dotenv.config();

const app = express();
app.use(expressPinoLogger({ logger }));

app.use('/code', CompilerRouter);
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

export default app;
