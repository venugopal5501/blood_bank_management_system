<template>
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="$emit('prev')">
            ‹ Prev
        </button>

        <span>
            Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button :disabled="currentPage === totalPages" @click="$emit('next')">
            Next ›
        </button>
    </div>
</template>

<script>
export default {
    name: "PaginationVue",
    props: {
        currentPage: Number,
        totalPages: Number
    }
};
</script>

<style>
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.pagination button {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
    background-color: #d32f2f;
    color: white;
}
</style>
