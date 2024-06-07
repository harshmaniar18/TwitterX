import express from 'express'
import cors from 'cors'
import { loggerMiddleware } from './helpers/middleware/logger.js'
import { client } from './client/index.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(loggerMiddleware)

app.get('/todos', async (req, res) => {
    // Proxy JSON Placeholder's API
    const todos = await client.fetch('get', '/todos')
    res.send(todos)
})

app.get('/', async (req, res) => {
    res.send('Welcome to TwitterX Backend')
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
