export default {
  template: `
    <div>
      <h2>Add Tweet</h2>
      <input type="text" v-model="tweet" placeholder="Enter tweet">
      <button @click="addTweet">Add Tweet</button>
    </div>
  `,
  data() {
    return {
      tweet: ''
    };
  },
  methods: {
    addTweet() {
      if (this.tweet.trim() !== '') {
        console.log('Adding tweet:', this.tweet);
        // Add tweet logic here
        this.tweet = '';
      }
    }
  }
};
