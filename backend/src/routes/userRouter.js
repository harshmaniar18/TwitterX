import express from 'express';
import User from '../models/user.js';

async function logIn(req, res)
{
    try
    {
        const { username, password } = req.query;
        if (!username || !password)
        {
            return res.status(400).send('Username and password are required');
        }
        const user = await User.findOne({ username });
        if (!user)
        {
            return res.status(404).send('AUTH failed! User does not exist');
        }

        if (password == user.password)
        {
            res.status(200).send('AUTH success! User authenticated');
        }
        else
        {
            res.status(401).send('AUTH failed! Incorrect password');
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send('Error authenticating user');
    }
}

async function addUser(req, res)
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

const userRouter = express.Router();

userRouter.post('/addUser', addUser)
userRouter.get('/logIn', logIn)

export default userRouter;
