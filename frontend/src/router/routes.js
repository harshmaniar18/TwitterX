// import { createRouter, createWebHistory } from 'vue-router';

import LogIn from '../components/LogIn.js';
import AddUser from '../components/AddUser.js';
import AddTweet from '../components/AddTweet.js';
import ReadTweets from '../components/ReadTweets.js';
import Home from '../components/Home.js';
import Feed from '../components/Feed.js';
import Users from '../components/Users.js';

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/logIn',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/addUser',
        name: 'AddUser',
        component: AddUser
    },
    {
        path: '/addTweet',
        name: 'AddTweet',
        component: AddTweet
    },
    {   
        path: '/users/:username/tweets',
        name: 'ReadTweets',
        component: ReadTweets
    },
    {   
        path: '/feed',
        name: 'Feed',
        component: Feed
    },
    {   
        path: '/users',
        name: 'Users',
        component: Users
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
