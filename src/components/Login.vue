<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-6">
            <div class="card px-5 py-5" style="background-color: rgb(225, 236, 236);">
                <div class="form-data">
                    <div v-if="registrationSuccess" class="alert alert-success mb-1">
                        Usuário registrado com sucesso!
                    </div>
                    <form @submit.prevent="submitForm" class="forms-inputs mb-4" style="text-align: start;">
                        <div class="mb-3">
                            <label for="username" class="form-label">Usuário:</label>
                            <input class='form-control' type="text" v-model="username" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Senha:</label>
                            <input class='form-control' type="password" v-model="password" required />
                        </div>
                        <button class="btn btn-dark w-100" type="submit">Login</button>
                    </form>
                    <div v-if="errorMessage" class="alert alert-danger mb-3">
                        {{ errorMessage }}
                    </div>
                </div>
            </div>
        </div>
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
            errorMessage: ''
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
                if (error.response) {
                    if (error.response.status === 400) {
                        this.errorMessage = 'Usuário ou senha inválidos.';
                    }
                    else {
                        this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
                    }
                }
            })
                
        },
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