<template>
  <div id="app">
    <router-view />
    <RegistrationForm message="Donor Registration Form" />
  </div>
</template>
<script>

import RegistrationForm from './components/RegistrationForm.vue';
export default {
  name: 'App',
  components: {
    RegistrationForm,
  },
  async mounted() {
    await this.$store.dispatch('loadStock');
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
