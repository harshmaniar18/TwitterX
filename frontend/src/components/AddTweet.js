export default
{
    template: `
        <div>
        </div>
    `,

    data()
    {
        return {
            username: '',
            tweet: '',
            dateTime: new Date()
        };
    },

    created()
    {
        this.username = this.$route.params.username;
        this.tweet = this.$route.params.tweet;

        if (this.username)
        {
            this.addTweet();
        }
        else
        {
            // alert('Please sign up or log in to add new tweet!')
            this.$router.push('/');
        }
    },

    methods:
    {
        async addTweet()
        {
            if (this.username.trim() !== '' && this.tweet.trim() !== '')
            {
                console.log('Adding tweet for user', this.username);
                try
                {
                    this.dateTime = new Date()
                    const response = await fetch('http://localhost:3001/addTweet', {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                content: this.tweet,
                                username: this.username,
                                dateTime: this.dateTime.toISOString(),
                            })
                    });

                    if (response.ok)
                    {
                        // alert('Tweet added successfully');
                        const firstName = this.$route.params.firstName
                        this.$router.push({ name: 'Feed', params: { username: this.username, firstName } });
                    }
                    else
                    {
                        alert('Failed to add tweet');
                        this.$router.push('/');
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
