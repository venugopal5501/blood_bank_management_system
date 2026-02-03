<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">Blood & Organ Donation Portal</h2>
      <p class="tagline">Save lives by connecting donors and recipients</p>
      
      <div class="input-group">
        <span class="icon">👤</span>
        <input v-model="username" placeholder="Username" />
      </div>

      <div class="input-group">
        <span class="icon">🔒</span>
        <input v-model="password" type="password" placeholder="Password" />
      </div>

      <button @click="handleLogin" class="login-btn">Login</button>
      
      <p v-if="error" class="error">{{ error }}</p>
      
      <p class="footer-text">Don't have an account? <a href="/register">Register here</a></p>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/auth';

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      this.error = "";
      try {
        const user = await login(this.username, this.password);
        alert(`Welcome ${user.username}, Role: ${user.role}`);
        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.message || "Login failed! Please try again.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff4b5c, #ff758c);
  font-family: 'Segoe UI', sans-serif;
}

.login-card {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  width: 350px;
  text-align: center;
}

.title {
  margin-bottom: 0.2rem;
  color: #d32f2f;
}

.tagline {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}

.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-group .icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #d32f2f;
}

.input-group input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;
}

.input-group input:focus {
  border-color: #d32f2f;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #b71c1c;
}

.error {
  color: #b71c1c;
  margin-top: 1rem;
}

.footer-text {
  margin-top: 1.5rem;
  font-size: 0.85rem;
}

.footer-text a {
  color: #d32f2f;
  text-decoration: none;
}
</style>
