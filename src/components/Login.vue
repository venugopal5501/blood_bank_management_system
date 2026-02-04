<template>
    <div>
        <h2>Login</h2>
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p v-if="error">   {{ error }} </p>
    
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
            try {
                const user = await login(this.username, this.password);
                alert(`Welcome ${user.username}, Role: ${user.role}`);
                  this.$router.push("/dashboard");
            }
            catch(error) {
                this.error = error.message;
            }
          }   
        }
    }
    </script>  
   
