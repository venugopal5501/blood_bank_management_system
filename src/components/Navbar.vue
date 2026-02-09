<template>
  <div class="navbar">
    <router-link to="/dashboard" class="nav-home">
      <i class="fas fa-home"></i>
      <span>Home</span>
    </router-link>
    <div class="user-dropdown">
      <button class="user-btn" @click="toggleDropdown">
        <i class="fas fa-user-circle"></i>
        <span class="username">{{ usernames }}</span>
        <i class="fas fa-chevron-down"></i>
      </button>
      <div v-if="showDropdown" class="dropdown-content">
        <button @click="logoutUser" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, getUser } from '@/services/auth';

export default {
  name: "NavBar",
  data() {
    return {
      usernames: getUser().username,
      showDropdown: false
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logoutUser() {
      logout();
      this.showDropdown = false;
      this.$router.push("/login");
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
}

.nav-home {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-home:hover {
  background: #f8f9fa;
  color: #3498db;
}

.nav-home i {
  font-size: 18px;
}

.user-dropdown {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  transition: all 0.2s;
  min-width: 140px;
}

.user-btn i:first-child {
  font-size: 18px;
  color: #7f8c8d;
}

.username {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-btn .fa-chevron-down {
  font-size: 12px;
  transition: transform 0.2s;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  border: 1px solid #eaeaea;
  overflow: hidden;
  z-index: 1000;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;
}

.logout-btn i {
  font-size: 16px;
  width: 20px;
}
</style>