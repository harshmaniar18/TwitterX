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
            return res.status(404).send('AUTH failed! Username does not exist');
        }

        if (password == user.password)
        {
            res.status(200).send(`${user.firstName}`);
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
    const { firstName, lastName, username, email, password } = req.body;
    console.log(`Trying to add: ${username}`)

    // Validate input
    if (!firstName || !email || !username || !password) {
        return res.status(400).send('Username, email, first name and password are required');
    }
    try
    {
        const userByUsername = await User.findOne({ username })
        if (userByUsername)
        {
            return res.status(422).send('Username already exists, please select a different username');
        }
        const userByEmail = await User.findOne({ email })
        if (userByEmail)
        {
            return res.status(422).send('Email already exists, please select a different email');
        }

        const newUser = new User({ firstName, lastName, username, email, password });
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
