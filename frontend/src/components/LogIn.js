export default
{
    template: `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 border p-4">
                <form @submit.prevent="logIn">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                        <input type="username" v-model="username" class="form-control" id="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                        <input type="password" v-model="password" class="form-control" id="password" required>
                    </div>
                    <div class="mt-4 d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
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
                        // alert('Log in successful!');
                        const firstName = await response.text();
                        this.$router.push({ name: 'Feed', params: { username: this.username, firstName } });
                        this.username = '';
                        this.password = '';
                    }
                    else
                    {
                        alert('Failed to log in, please check your credentials');
                    }
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
