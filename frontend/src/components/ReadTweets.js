export default
{
    template: `
        <div>
            <h2>Read Tweets</h2>
            <input type="text" v-model="username" placeholder="Enter username to read tweets">
            <button @click="fetchTweets">Fetch Tweets</button>
            <div v-if="tweets.length > 0">
                <h3>Tweets for {{ username }}:</h3>
                <ul>
                    <li v-for="tweet in tweets" :key="tweet._id">{{ tweet.content }}</li>
                </ul>
            </div>
            <div v-else-if="username">
                <p>No tweets found for this user.</p>
            </div>
        </div>
    `,

    data()
    {
        return {
            username: '',
            tweets: [],
        };
    },

    methods:
    {
        async fetchTweets()
        {
            if (this.username.trim() !== '')
            {
                console.log('Reading tweets for: ', this.username);
                try
                {
                    const response = await fetch(`http://localhost:3001/users/${this.username}/tweets`);
                    if (response.ok)
                    {
                        this.tweets = await response.json();
                    }
                    else
                    {
                        this.tweets = [];
                        alert('Failed to fetch tweets');
                    }
                }
                catch (error)
                {
                    console.error('Error fetching tweets: ', error);
                    this.tweets = [];
                    alert('Error fetching tweets');
                }
            }
            else
            {
                alert('Please enter a username');
            }
        },
    },
};
