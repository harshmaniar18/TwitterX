// import Vue from 'vue';
import AddUser from './components/AddUser.js';
import AddTweet from './components/AddTweet.js';
import ReadTweets from './components/ReadTweets.js';

const app = Vue.createApp({
    components: {
        'add-user': AddUser,
        'add-tweet': AddTweet,
        'read-tweets': ReadTweets
      },
    data() {
        return {
            tweets: []
        }
    }
})

app.mount('#app')
