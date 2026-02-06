<template>
  <div class="login-container">
    <div class="login-image">
      <h1 style="position: absolute;top: 15%">Blood & Organ Donation Manangement System</h1>
      <img src="@/assets/banner.png" alt="Login Image" />
    </div>
    <div class="login-form">
      <div class="login-card">
        <h2 style="margin-bottom: 10%;">Create Account</h2>
        <p v-if="error" class="error">{{ error }}</p>
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="handleRegister">Register</button>
      </div>
    </div>
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
