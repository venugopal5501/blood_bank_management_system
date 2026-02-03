<template>
    <div>
        </div>
    </template>


<script>
import { getUser, logout } from '@/services/auth';
import api from '@/services/api';
export default {
    data() {
         return {
        user: getUser(), 
        posts:[]
    }
    },
    async mounted() {
        const response = await api.get("/posts");
        this.posts = response.data;
    },
    methods: {
        logoutUser() {
            logout();
            this.$$router.push("/login");
        }
    }
}
</script>