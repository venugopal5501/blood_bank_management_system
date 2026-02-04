<template>
  <div id="app">
   <router-view />
       <RegistrationForm />   <!-- MUST BE HERE -->



  </div>
</template>

<script>

import RegistrationForm  from './components/RegistrationForm.vue';
// import dashboardPage from './components/UserDashboard.vue'
// import registerPage from './components/MainPage.vue'
export default {
  name: 'App',
  components: {
    RegistrationForm
  },
  data() {
    return {
      showRegistration: false
    }
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
