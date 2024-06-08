import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { loggerMiddleware } from './middleware/logger.js'
import userRouter from './routes/userRouter.js';
import tweetRouter from './routes/tweetRouter.js';


const PORT = 3001
const MONGO_DB_URL = 'mongodb+srv://harshmaniar18:jIYZ2FvxB7asqSoM@twitterx.jtbulu3.mongodb.net/?retryWrites=true&w=majority&appName=TwitterX'

const app = express()
app.use(express.json());
app.use(cors())
app.use(loggerMiddleware)

async function main() {
    await mongoose.connect(MONGO_DB_URL).then(() => console.log('Database Connected!'))

    app.use(userRouter);
    app.use(tweetRouter);

    app.get('/', async (req, res) => {
        res.send('Welcome to TwitterX Backend!')
    })

    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))

}

main()
