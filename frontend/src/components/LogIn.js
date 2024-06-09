export default
{
    template: `
        <div>
            <h2>Enter credentials below to Log In</h2>
            <input type="text" v-model="username" placeholder="Enter username">
            <input type="text" v-model="password" placeholder="Enter password">
            <button @click="logIn" type="button" class="btn btn-primary">Log In</button>
        </div>
    `,

    data()
    {
        return {
            username: '',
            password: ''
        };
    },

    methods:
    {
        async logIn()
        {
            if (this.username.trim() !== '' && this.password.trim() !== '')
            {
                console.log('Authenticating user: ', this.username);
                try
                {
                    const response = await fetch(
                        `http://localhost:3001/logIn?username=${this.username}&password=${this.password}`)

                    if (response.ok)
                    {
                        alert('Log in successful!');
                    }
                    else
                    {
                        alert('Failed to log in, please check your credentials');
                    }
                    this.username = '';
                    this.password = '';
                }
                catch (error)
                {
                    console.error('Error Authenticating user: ', error);
                    alert('Error authenticating user');
                }
                
            }
            else
            {
                alert('ERROR! Invalid username or password');
            }
        }
    }
};
