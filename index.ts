import express from 'express'
import dotenv from 'dotenv'
import expressPinoLogger from 'express-pino-logger'
import logger from './components/utils/logger'

dotenv.config()

const app = express()
app.use(expressPinoLogger({ logger: logger }))

app.get('/', (req, res) => res.send('Express + TypeScript Server'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
