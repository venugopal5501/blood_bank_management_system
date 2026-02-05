<!-- <template>
<div class="navbar-container">
    
   <nav id="mainNav">
  <router-link to="/dashboard">Home</router-link> -->
  <!-- <router-link to="/about">About Us</router-link>
  <router-link to="/blood-types">Blood Types</router-link>
  <router-link to="/contact">Contact</router-link>
  <a href="#" class="btn" @click.prevent="openRegistration">Donate Blood</a>
  <router-link to="/donars" class="btn">View Donars</router-link>
  <router-link to="/stocks" class="btn">Stock Inventory</router-link> -->
  <!-- <div class="user-dropdown">
    <a href = "#" @click="toggleDropdown"> {{ usernames }} ⌄</a>
    <div v-if="showDropdown" class="dropdown-menu">
      <button @click="logoutUser">Logout</button>
    </div>
</div>
</nav>
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

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    logoutUser() {
      logout();
      this.showDropdown = false;
      this.$router.push("/login");
    },

    openRegistration() {
      this.showDropdown = false;
      this.$bus.$emit('open-registration');
    }
  }
}

    </script> -->

    <!-- <style lang="css" scoped>
    .navbar-container {
        display: flex;
        justify-content: end;
        margin-bottom: 10px;
    }

      nav {
      display: flex;
      align-items: center;
    }

    nav a {
      margin: 0 15px;
      text-decoration: none;
      font-weight: 500;
      color: #333;
      transition: color 0.3s;
      position: relative;
    }

    nav a:hover {
      color: #d32f2f;
    }

    nav a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #d32f2f;
      transition: width 0.3s;
    }

    nav a:hover::after {
      width: 100%;
    }

    nav a.btn {
      background: #d32f2f;
      color: #fff;
      padding: 10px 20px;
      border-radius: 30px;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.2);
    }

    nav a.btn:hover {
      background: #b71c1c;
      transform: translateY(-2px);
    }

    nav a.btn::after {
      display: none;
    }
.user-dropdown {
  position: relative;
  margin-left: 15px;
}

.user-btn {
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: #333;
}

.user-btn:hover {
  color: #d32f2f;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  background: #fff;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.dropdown-menu button {
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.dropdown-menu button:hover {
  background: #f5f5f5;
}
    </style> -->

    <template>
  <div class="navbar-container">
    <nav id="mainNav">
      <!-- Home Button with Icon -->
      <router-link to="/dashboard" class="nav-btn">
        <i class="fa-solid fa-house"></i> Home
      </router-link>

      <!-- User Dropdown -->
      <div class="user-dropdown">
        <button class="user-btn" @click="toggleDropdown">
          <i class="fa-solid fa-user"></i> {{ usernames }} ⌄
        </button>
        <div v-if="showDropdown" class="dropdown-menu">
          <button @click="logoutUser">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </nav>
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
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logoutUser() {
      logout();
      this.showDropdown = false;
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
/* Navbar Container */
.navbar-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-radius: 12px;
  margin: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Navbar Flex */
nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Navbar buttons */
.nav-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 20px;
  background: #d32f2f;
  color: #fff;
  font-weight: 500;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.2);
}

.nav-btn:hover {
  background: #b71c1c;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(183, 28, 28, 0.3);
}

/* User Dropdown */
.user-dropdown {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 20px;
  border: none;
  border-radius: 25px;
  background: #f5f5f5;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}

.user-btn:hover {
  background: #eee;
  transform: translateY(-1px);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 120%;
  background: #fff;
  border-radius: 12px;
  min-width: 150px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  overflow: hidden;
  z-index: 10;
}

.dropdown-menu button {
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.dropdown-menu button:hover {
  background: #f5f5f5;
}

/* Icons */
i {
  font-size: 1em;
}
</style>
