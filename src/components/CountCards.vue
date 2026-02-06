<template>
    <div class="card-buttons">
        <a href="#" class="card">
            <i class="fa-solid fa-hand-holding-droplet"></i>
            <p>{{bloodCount}}</p>
        </a>
    </div>
</template>

<script>
export default {
    name : 'CountCards',
    props: {
        bloodCount: Number
    }
}
</script>

