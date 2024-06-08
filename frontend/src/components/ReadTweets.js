export default {
  template: `
    <div>
      <h2>Read Tweets</h2>
      <ul>
        <li v-for="(tweet, index) in tweets" :key="index">{{ tweet }}</li>
      </ul>
    </div>
  `,
  props: ['tweets']
};
