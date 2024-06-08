export default
{
    template: `
        <div>
            <h2>Add Tweet</h2>
            <input type="text" v-model="username" placeholder="Enter username">
            <input type="text" v-model="tweet" placeholder="Enter tweet">
            <button @click="addTweet">Add Tweet</button>
        </div>
    `,

    data()
    {
        return {
            username: '',
            tweet: ''
        };
    },

    methods:
    {
        async addTweet()
        {
            if (this.username.trim() !== '' && this.tweet.trim() !== '')
            {
                console.log('Adding tweet:', this.tweet, 'for user', this.username);
                try
                {
                    const response = await fetch('http://localhost:3001/addTweet', {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                content: this.tweet,
                                username: this.username
                            })
                    });

                    if (response.ok)
                    {
                        alert('Tweet added successfully');
                    }
                    else
                    {
                        alert('Failed to add tweet');
                    }
                    this.username = '';
                    this.tweet = '';
                }
                catch (error)
                {
                    console.error('Error adding tweet: ', error);
                    alert('Error adding tweet');
                }
            }
        }
    }
};
