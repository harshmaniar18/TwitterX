export default
{
    template: `
    <div v-if="users.length > 0">
        <div class="container mt-5 mb-5">
            <div v-for="user in users" :key="user._id" class="user-box">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 border p-4 text-center">
                        <div class="user-header d-flex flex-column align-items-center">
                            <div class="user-header">
                                <b>{{ user.firstName }} {{ user.lastName }}</b>
                                    <span class="d-inline-block bg-white rounded-circle text-center text-black"
                                        style="width: 1em; height: 1em; font-size: 20px;">&bull;</span>
                                    <router-link :to="{ name: 'ReadTweets', params: { username: user.username, firstName: user.firstName } }" 
                                        class="user-username text-muted">@{{ user.username }}</router-link>
                            </div>
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
            users: []
        };
    },

    created()
    {
        this.fetchUsers()
    },

    methods:
    {
        async fetchUsers()
        {  
            console.log('Fetching all user accounts');
            try
            {
                const response = await fetch('http://localhost:3001/users/');
                if (response.ok)
                {
                    this.users = await response.json();
                    console.log(`Fetched all user accounts ${this.users.length}`);
                }
                else
                {
                    this.users = [];
                    alert('Failed to fetch users');
                }
            }
            catch (error)
            {
                console.error('Error fetching users: ', error);
                this.users = [];
                alert('Error fetching users');
            }
        }
    }
};
