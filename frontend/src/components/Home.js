export default
{
    template: `
        <div class="d-flex justify-content-center mt-4">
            <button @click="addUser" type="button" class="btn btn-primary mr-2">Log In</button>
            <button @click="addUser" type="button" class="btn btn-success">Sign up</button>
        </div>
    `,

    methods: {
        addUser()
        {
            this.$router.push('/addUser');
        }
    },
};
