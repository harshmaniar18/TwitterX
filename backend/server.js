import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { loggerMiddleware } from './helpers/middleware/logger.js'
import User from './models/user.js'
import Tweet from './models/tweet.js'

const PORT = 3001
const MONGO_DB_URL = 'mongodb+srv://harshmaniar18:jIYZ2FvxB7asqSoM@twitterx.jtbulu3.mongodb.net/?retryWrites=true&w=majority&appName=TwitterX'

const app = express()
app.use(express.json());
app.use(cors())
app.use(loggerMiddleware)

async function addNewUser(req, res)
{
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
}

async function addNewTweet(req, res)
{
    const { content, username } = req.body;
    console.log(`Trying to add tweet "${content}" for ${username}`)

    if (!username || !content)
    {
        return res.status(400).send('Username and tweet are required!');
    }

    const user = await User.findOne({ username });
    if (!user)
    {
        return res.status(404).send('User not found, cannot write tweet');
    }

    try
    {
        const tweet = new Tweet({ content, user: user._id });
        await tweet.save();

        user.tweets.push(tweet._id);
        await user.save();
        res.status(201).send('Tweet written successfully!');
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Error wrting tweet');
    }
}

async function fetchTweets(req, res)
{
    const { username } = req.params;
    try
    {
        const user = await User.findOne({ username }).populate('tweets')
        if (!user)
        {
            return res.status(404).send('User not found');
        }

        res.send(user.tweets);
    }
    catch (error)
    {
        console.error('Error fetching tweets:', error)
        res.status(500).send('Error fetching tweets')
    }
}

async function main() {
    await mongoose.connect(MONGO_DB_URL).then(() => console.log('Database Connected!'))

    app.post('/addUser', addNewUser)

    app.post('/addTweet', addNewTweet)

    app.get('/users/:username/tweets', fetchTweets)

    app.get('/', async (req, res) => {
        res.send('Welcome to TwitterX Backend!')
    })

    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))

}

main()
