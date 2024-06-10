export default
{
    template: `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 border p-4">
                <form @submit.prevent="addUser">
                    <div class="row justify-content-center mt-2">
                        <div class="col-12 col-md-12 col-lg-12">
                            <div class="mb-3">
                                <label for="firstName" class="form-label">First Name<span class="text-danger">*</span></label>
                                <input type="text" v-model="firstName" class="form-control" id="firstName" required>
                            </div>
                            <div class="mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" v-model="lastName" class="form-control" id="lastName">
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username<span class="text-danger">*</span></label>
                                <input type="username" v-model="username" class="form-control" id="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email Address<span class="text-danger">*</span></label>
                                <input type="email" v-model="email" class="form-control" id="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password<span class="text-danger">*</span></label>
                                <input type="password" v-model="password" class="form-control" id="password" required>
                            </div>
                            <div class="mt-5 d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,

    data()
    {
        return {
            firstName: '',
            lastName: '',
            username: '',
            email:'',
            password: ''
        };
    },

    methods:
    {
        async addUser()
        {
            if (this.username.trim() !== '' && this.email.trim() !== '' && this.password.trim() !== '')
            {
                console.log('Adding user: ', this.username);
                try
                {
                    const response = await fetch('http://localhost:3001/addUser', {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                firstName: this.firstName,
                                lastName: this.lastName,
                                username: this.username,
                                email: this.email,
                                password: this.password
                            })
                    });

                    const message = await response.text();
                    if (response.ok)
                    {
                        alert('User added successfully');
                        this.$router.push({ name: 'Feed', params: { username: this.username, firstName: this.firstName } });
                    }
                    else if (response.status === 404 || response.status === 422)
                    {
                        alert(`ERROR!: ${message}`);
                    }

                    this.firstName = '';
                    this.lastName = '';
                    this.username = '';
                    this.email = '';
                    this.password = '';
                }
                catch (error)
                {
                    console.error('Error adding user: ', error);
                    alert('Error adding user');
                }
                
            }
            else
            {
                alert('ERROR! Invalid username/email or password');
            }
        }
    }
};
