<template>
  <div id="app">
    <add-user @add-user="addUser"></add-user>
    <add-tweet @add-tweet="addTweet"></add-tweet>
    <read-tweets :tweets="tweets"></read-tweets>
  </div>
</template>

<script>
import AddUser from './components/AddUser.vue';
import AddTweet from './components/AddTweet.vue';
import ReadTweets from './components/ReadTweets.vue';

export default {
  name: 'App',
  components: {
    AddUser,
    AddTweet,
    ReadTweets
  },
  data() {
    return {
      tweets: []
    };
  },
  methods: {
    addUser(username) {
      // Here you would make an API call to add the user to the backend
      console.log('Adding user:', username);
    },
    addTweet(tweet) {
      // Here you would make an API call to add the tweet to the backend
      console.log('Adding tweet:', tweet);
      this.tweets.push(tweet);
    }
  }
};
</script>
