import express from 'express';
import Tweet from '../models/tweet.js';
import User from '../models/user.js';

async function addTweet(req, res)
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

const tweetRouter = express.Router();

tweetRouter.post('/addTweet', addTweet)

tweetRouter.get('/users/:username/tweets', fetchTweets)

export default tweetRouter;
