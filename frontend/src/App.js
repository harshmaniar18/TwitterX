// import Vue from 'vue';
import AddUser from './components/AddUser.js'; // Import your AddUser component
import AddTweet from './components/AddTweet.js'; // Import your AddTweet component
import ReadTweets from './components/ReadTweets.js'; // Import your ReadTweets component

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
