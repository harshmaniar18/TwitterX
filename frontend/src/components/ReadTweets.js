export default
{
    template: `
        <div v-if="tweets.length > 0">
            <div class="container mt-5 mb-5">
                <div v-for="tweet in tweets" :key="tweet._id" class="tweet-box">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-8 col-lg-6 border p-4">
                            <div class="tweet-header">
                                <b>{{ firstName }}</b> <span class="tweet-username text-muted">@{{ username }}</span>
                                    <span class="d-inline-block bg-white rounded-circle text-center text-black"
                                        style="width: 1em; height: 1em; font-size: 20px;">&bull;</span>
                                    <span class="tweet-time text-muted">{{ formattedDateTime(tweet.dateTime) }}</span>
                            </div>
                            <div class="tweet-content">
                                {{ tweet.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    data()
    {
        return {
            username: '',
            firstName: '',
            tweets: [],
        };
    },

    created()
    {
        this.username = this.$route.params.username;
        this.firstName = this.$route.params.firstName;
        this.fetchTweets()
    },

    computed:
    {
        formattedDateTime() {
            return (dateTime) => {
                // Parse the datetime string into a JavaScript Date object
                const createdAtDate = new Date(dateTime);

                // Format the date as "MM/DD" (assuming the desired format)
                const formattedDate = `${(createdAtDate.getMonth() + 1).toString().padStart(2,'0')}/` +
                                       `${createdAtDate.getDate().toString().padStart(2,'0')}`;

                // Format the time as "HH:MM:SS" (assuming the desired format)
                const formattedTime = `${createdAtDate.getHours().toString().padStart(2,'0')}:` +
                                       `${createdAtDate.getMinutes().toString().padStart(2,'0')}:` +
                                       `${createdAtDate.getSeconds().toString().padStart(2,'0')}`;

                // Combine the formatted date and time
                return `${formattedDate} @ ${formattedTime}`;
            };
        }
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
                        this.tweets = this.tweets.reverse()
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
