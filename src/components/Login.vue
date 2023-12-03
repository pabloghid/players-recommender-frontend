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
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import { getAPI } from '../../api-axios.js';

export default {
    name: 'LoginPage',
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
            }

            getAPI
                .post('token/', formData)
                .then(response => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('isAuth', true)
                    console.log(localStorage)
                    this.$router.push('/players')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
};
</script>
  