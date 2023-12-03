<template>
    <div>
        <h2>Registrar</h2>
        <form @submit.prevent="submitForm">
            <label for="username">Usuário:</label>
            <input type="text" v-model="username" required />
            <br />
            <label for="password">Senha:</label>
            <input type="password" v-model="password" required />
            <br />
            <label for="email">Endereço de email:</label>
            <input type="email" v-model="email" required />
            <br />
            <button type="submit">Registrar</button>

            <div v-if="errorMessages.length > 0">
                <ul>
                    <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
                </ul>
            </div>
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
            password: '',
            email: '',
            errorMessages: []
        }
    },
    methods: {
        submitForm() {
            const formData = {
                username: this.username,
                password: this.password,
                email: this.email
            };
            
            this.errorMessages = [];

            getAPI
                .post('core/register/', formData)
                .then(response => {
                    localStorage.setItem('registrationSuccess', 'true');
                    this.$router.push('/login');
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        const responseData = error.response.data;

                        if (Array.isArray(responseData)) {
                            this.errorMessages = responseData;
                        } else if (typeof responseData === 'string') {
                            this.errorMessages = [responseData];
                        } else if (responseData.error) {
                            this.errorMessages = [responseData.error];
                        } else if (responseData.non_field_errors) {
                            this.errorMessages = responseData.non_field_errors;
                        } else {
                            this.errorMessages = ['Ocorreu um erro ao realizar o login'];
                        }
                    }
                })
        }
    }
};
</script>
  