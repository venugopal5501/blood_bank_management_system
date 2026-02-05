<template>
  <div class="dashboard-page">
    <Navbar />

    <!-- Background image -->
    <div class="bg-image"></div>

    <!-- Centered card buttons -->
    <div class="card-buttons">
        <h1 style="position: absolute; top: -214%;color: #535151">Blood & Organ Dontation Manangement System</h1>
      <a href="#" class="card" @click.prevent="$bus.$emit('open-registration')">
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
  components: { Navbar },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.dashboard-page {
  position: relative;
  min-height: 100vh;
}



/* Centered card buttons */
.card-buttons {
  position: absolute;
  top: 50%; /* vertically center */
  left: 50%; /* horizontally center */
  transform: translate(-50%, -50%); /* true center */
  display: flex;
  gap: 100px; /* space between buttons */
  z-index: 10;
}

/* Card style */
.card {
  background: #836f6fad;
  color: white;
  width: 180px;
  height: 150px;
  text-align: center;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center; /* center content vertically */
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card i {
  font-size: 2em;
  margin-bottom: 10px;
}

.card p {
  font-weight: 600;
  margin: 0;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}


@media (max-width: 600px) {
  .card-buttons {
    flex-direction: column;
    transform: translate(-50%, -50%); /* stays centered */
  }
}
</style>
