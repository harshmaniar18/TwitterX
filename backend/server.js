import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { loggerMiddleware } from './helpers/middleware/logger.js'
import User from './models/user.js'

const PORT = 3001
const MONGO_DB_URL = 'mongodb+srv://harshmaniar18:jIYZ2FvxB7asqSoM@twitterx.jtbulu3.mongodb.net/?retryWrites=true&w=majority&appName=TwitterX'

const app = express()
app.use(express.json());
app.use(cors())
app.use(loggerMiddleware)

async function main() {
    await mongoose.connect(MONGO_DB_URL).then(() => console.log('Database Connected!'))

    // Add a new user
    app.post('/addUser', async (req, res) => {
        const { username, password } = req.body;
        console.log(`Trying to add: ${username} - ${password}`)

        // Validate input
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }
        try
        {
            const email = username
            const newUser = new User({ username, password, email });
            await newUser.save();
            res.status(201).send('User created successfully');
        }
        catch (error)
        {
            console.error(error);
            res.status(500).send('Error creating user');
        }
    });

    app.get('/', async (req, res) => {
        res.send('Welcome to TwitterX Backend!')
    })

    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))

}

main()
