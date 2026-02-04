<template>
    
      
  <div class="login-container">
    <div class="login-image">
      <img src="@/assets/banner.jpg" alt="Login Image" /> 
    </div>
    <div class="login-form">
      <h2>Sign In</h2>
      <p class="subtitle">Please login to your account</p>

      <input
        v-model="username"
        type="text"
        placeholder="Username"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
      />

      <button @click="handleLogin">Login</button>

      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>

      <p v-if="error" class="error">{{ error }}</p>
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

    // validation FIRST
    if (this.username == '') {
      this.error = "Please enter username!";
      return;
    }

    if (this.password == '') {
      this.error = "Please enter password!";
      return;
    }

    try {
      
await login(this.username, this.password);

       
    this.$router.push("/dashboard");
    }
    catch (error) {
      this.error = error.message;
    }
  }
}

    }
    </script>  
   
<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* Left side */
.login-image {
  flex: 1;
  background: #f4f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-image img {
  width: 70%;
  max-width: 400px;
}

/* Right side */
.login-form {
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form h2 {
  margin-bottom: 5px;
  font-size: 28px;
}

.subtitle {
  color: #777;
  margin-bottom: 30px;
}

.login-form input {
  padding: 12px;
  margin-bottom: 15px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.login-form input:focus {
  outline: none;
  border-color: #4f46e5;
}

.login-form button {
  padding: 12px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.login-form button:hover {
  background: #4338ca;
}

.error {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-image {
    height: 40vh;
  }
}
</style>
