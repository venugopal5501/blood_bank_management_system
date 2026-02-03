<template>
  <div id="app">
   <!-- <loginPage />
   <dashboardPage /> -->
    <registerPage />
  </div>
</template>

<script>

// import loginPage from './components/Login.vue'
// import dashboardPage from './components/UserDashboard.vue'
import registerPage from './components/MainPage.vue'
export default {
  name: 'App',
  components: {
    // loginPage,
    // dashboardPage,
    registerPage

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
  margin-top: 60px;
}
</style>
