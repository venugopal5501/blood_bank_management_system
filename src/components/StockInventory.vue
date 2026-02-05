<template>
    <div>
        <h1>Stock Inventory</h1>
        <button class="add-btn" @click="openModal">
            <i class="fas fa-plus"></i> Add New Item
        </button>

        <!-- Modal Overlay -->
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <button class="modal-close-btn" @click="closeModal">
                    <i class="fas fa-times"></i>
                </button>
                <StockInventoryModal @close="closeModal" />
            </div>
        </div>
    </div>
</template>

  <script>
import StockInventoryModal from './StockInventoryModal.vue';

export default {
  name: "StockInventory",
  components: {
    StockInventoryModal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>


<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
    width : 90%;
}

.modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    transition: all 0.3s;
}


</style>
