<template>
    <div>
        <h2>Register</h2>
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="handleRegister">Register</button>
        <p v-if="error" class="error">{{ error }}</p>
        </div>
</template>

<script>
import { register } from '@/services/auth';
export default {
    name: "RegisterPage",
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            error: ""
        };
    },
    methods: {
        async handleRegister() {
            this.error = "";
            if (!this.username || !this.password || !this.confirmPassword) {
                this.error = "All fields are required!";
                return;
            }
            if (this.password !== this.confirmPassword) {
                this.error = "Passwords do not match!";
                return;
            }
            try {
                await register(this.username, this.password);
                this.$router.push("/login");
            }
            catch (error) {
                this.error = error.message;
            }

        }
    }
}
</script>

