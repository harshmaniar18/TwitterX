// AddUser.js

export default {
  template: `
    <div>
      <h2>Add User</h2>
      <input type="text" v-model="username" placeholder="Enter username">
      <button @click="addUser">Add User</button>
    </div>
  `,
  data() {
    return {
      username: ''
    };
  },
  methods: {
    addUser() {
      if (this.username.trim() !== '') {
        console.log('Adding user:', this.username);
        // Add user logic here
        alert(`User "${this.username}" added!`);
        this.username = '';
      }
    }
  }
};
