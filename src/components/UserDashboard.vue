<template  v-slot="{ bloodCount }">
  <div class="dashboard-page">
    <Navbar />
    <CountCards v-bind:bloodCount = "totalBloodCount"/>
    <div class="bg-image"></div>
    <div class="card-buttons">
      <h1 style="position: absolute; top: -214%;color: #535151">Blood & Organ Dontation Manangement System</h1>
      <a href="#" class="card" @click="$bus.$emit('open-registration')">
        <i class="fa-solid fa-hand-holding-droplet"></i>
        <p>Donate Registration</p>
      </a>
      <router-link to="/donars" class="card">
        <i class="fa-solid fa-users"></i>
        <p>View Donors</p>
      </router-link>
      <router-link to="/stocks" class="card">
        <i class="fa-solid fa-boxes-stacked"></i>
        <p>Stock Inventory</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: { Navbar
   },
};
</script>

<style scoped>
.dashboard-page {
  position: relative;
  min-height: 100vh;
}
</style>
