export default
{
    template: `
    <div>
        <div class="container mt-5 mb-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 border p-4">
                    <form @submit.prevent="addTweet">
                        <div class="mb-3">
                            <label for="newTweet" class="form-label">What's on your mind?</label>
                            <div class="mt-3">
                                <input type="text" v-model="newTweet" class="form-control" id="newTweet" required>
                                <div class="mt-2 form-text text-center text-muted" style="font-size: 0.8rem;">
                                    (Max 280 characters)
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary">Tweet</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Horizontal line with inline styles for margin -->
        <hr class="my-4">

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

    <!-- Main div end -->
    </div>
    `,

    data()
    {
        return {
            newTweet: '',
            tweets: [],
            username: '',
            firstName:''
        }
    },

    created()
    {
        this.username = this.$route.params.username;
        this.firstName = this.$route.params.firstName;
        this.$router.replace({ params: { username: null, firstName: null } });
        
        console.log('Username:', this.username);
        console.log('Tweets:', this.tweets);

        if (this.username)
        {
            this.feed();
        }
        else
        {
            alert('This app does not maintain sessions, please access your feed via log in')
            this.$router.push('/');
        }
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
        async feed()
        {
            if (this.username.trim() !== '')
            {
                console.log('Fetching tweets for user', this.username);
                try
                {
                    const response = await fetch(`http://localhost:3001/users/${this.username}/tweets`);
                    if (response.ok)
                    {
                        this.tweets = await response.json()
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
                    alert('Error fetching tweet');
                }
            }
        },

        async addTweet()
        {
            console.log('Adding new tweet for user', this.username);
            this.$router.push({ name: 'AddTweet', params: { username: this.username, tweet: this.newTweet, firstName: this.firstName } });
        }
    }
};
