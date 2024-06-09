// import { createRouter, createWebHistory } from 'vue-router';

import AddUser from '../components/AddUser.js';
import AddTweet from '../components/AddTweet.js';
import ReadTweets from '../components/ReadTweets.js';
import Home from '../components/Home.js';

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: Home
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
        path: '/readTweets',
        name: 'ReadTweets',
        component: ReadTweets
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router
