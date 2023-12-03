<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submitForm">
            <label for="username">Username:</label>
            <input type="text" v-model="username" required />
            <br />
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
            <br />
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import { getAPI } from '../../api-axios.js';

export default {
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            const formData = {
                username: this.username,
                password: this.password,
                email: this.email
            }

            getAPI
                .post('users/', formData)
                .then(response => {
                    this.$router.push('/login')
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>
  