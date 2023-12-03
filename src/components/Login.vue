<template>
    <div>
        <h2>Login</h2>
        <div v-if="registrationSuccess">
            Usuário registrado com sucesso!
        </div>
        <form @submit.prevent="submitForm">
            <label for="username">Usuário:</label>
            <input type="text" v-model="username" required />
            <br />
            <label for="password">Senha:</label>
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
            password: '',
            registrationSuccess: false,
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
                    localStorage.setItem('loginSuccess', 'true');
                    this.$router.push('/player-recommender')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    created() {
        const registrationSuccess = localStorage.getItem('registrationSuccess');
        if (registrationSuccess === 'true') {
            this.registrationSuccess = true;
            localStorage.removeItem('registrationSuccess');
        }
    },
};
</script>
  