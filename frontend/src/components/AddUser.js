export default
{
    template: `
        <div>
            <h2>Add User</h2>
            <input type="text" v-model="username" placeholder="Enter username">
            <input type="text" v-model="password" placeholder="Enter password">
            <button @click="addUser">Add User</button>
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
        async addUser()
        {
            if (this.username.trim() !== '' && this.password.trim() !== '')
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
                                username: this.username,
                                password: this.password
                            })
                    });

                    if (response.ok)
                    {
                        alert('User added successfully');
                    }
                    else
                    {
                        alert('Failed to add user');
                    }
                    this.username = '';
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
                alert('ERROR! Invalid username or password');
            }
        }
    }
};
