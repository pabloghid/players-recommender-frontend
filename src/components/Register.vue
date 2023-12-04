<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-6">
            <div class="card px-5 py-5" style="background-color: rgb(225, 236, 236);">
                <div class="form-data">
                    <form @submit.prevent="submitForm" class="forms-inputs mb-4" style="text-align: start;">
                        <div class="mb-3">
                            <label for="username" class="form-label">Usuário:</label>
                            <input class='form-control' type="text" v-model="username" required />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Endereço de email:</label>
                            <input class='form-control' type="email" v-model="email" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Senha:</label>
                            <input class='form-control' type="password" v-model="password" required />
                        </div>
                        <button class="btn btn-dark w-100" type="submit">Registrar</button>
                    </form>
                    <div v-if="errorMessages.length > 0" class="alert alert-danger">
                        <ul class="mb-0">
                            <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
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
  