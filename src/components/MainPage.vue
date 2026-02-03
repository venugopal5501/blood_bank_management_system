<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="title">Create Account</h2>
      <p class="tagline">Join the Blood & Organ Donation Community</p>

      <!-- Username -->
      <div class="input-group">
        <span class="icon">👤</span>
        <input v-model="username" placeholder="Username" />
      </div>

      <!-- Password -->
      <div class="input-group">
        <span class="icon">🔒</span>
        <input v-model="password" type="password" placeholder="Password" />
      </div>

      <!-- Confirm Password -->
      <div class="input-group">
        <span class="icon">🔒</span>
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
      </div>

      <!-- Register Button -->
      <button @click="handleRegister" class="register-btn">Create Account</button>

      <!-- Error Message -->
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Footer -->
      <p class="footer-text">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  </div>
</template>

<script>
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
    handleRegister() {
      this.error = "";
      if (!this.username || !this.password || !this.confirmPassword) {
        this.error = "All fields are required!";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match!";
        return;
      }
      // Call your registration API here
      alert(`Account created for ${this.username}!`);
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff4b5c, #ff758c);
  font-family: 'Segoe UI', sans-serif;
}

.register-card {
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

.register-btn {
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

.register-btn:hover {
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
