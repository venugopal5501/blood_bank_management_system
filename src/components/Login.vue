<template>
    <div class="login-container">
        <div class="login-image">
            <h1 style="position: absolute;top: 15%">Blood & Organ Donation Manangement System</h1>
            <img src="@/assets/banner.png" alt="Login Image" />
        </div>
        <div class="login-form">
            <div class="login-card">
                <h2>Sign In</h2>
                <p class="subtitle">Please login to your account</p>
                <p v-if="error" class="error">{{ error }}</p>
                <input v-model="username" type="text" placeholder="Username" />
                <input v-model="password" type="password" placeholder="Password" />
                <button @click="handleLogin">Login</button>
                <p>Don't have an account? <router-link to="/register">Signup</router-link></p>

            </div>
        </div>
    </div>

</template>

<script>
import { login } from '@/services/auth';

export default {
    name: "loginPage",
    data() {
        return {
            username: "",
            password: "",
            error: ""
        };
    },
    methods: {
        async handleLogin() {
            if (this.username === '') {
                this.error = "Please enter username!";
                return;
            }
            if (this.password === '') {
                this.error = "Please enter password!";
                return;
            }

            try {
                await login(this.username, this.password);
                this.$router.push("/dashboard");
            } catch (error) {
                this.error = error.message;
            }
        }
    }
}
</script>
