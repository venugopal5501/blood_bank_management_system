<template>
    <div>
        <Navbar />
       
        <div class="bg-image"></div>
        
        </div>
    </template>
<script>
import { getUser } from '@/services/auth';
import api from '@/services/api';
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Navbar
    },
    data() {
         return {
        user: getUser(), 
        posts:[]
    }
    },
    async mounted() {
        const response = await api.get("/posts");
        this.posts = response.data;
    }
}
</script>

<style scoped>
.bg-image {
    background-image: url('@/assets/bgimage.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
}

.logout-button {
    position: absolute;
    top: 80px;
    right: 20px;
    padding: 10px 15px;
    background-color: #ff4b5c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}
</style>