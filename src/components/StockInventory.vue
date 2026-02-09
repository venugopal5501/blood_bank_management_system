<template>
  <div class="stock-container">
    <Navbar />
    <div class="header">
      <h1>Stock Inventory</h1>
      <button class="add-btn" @click="openModal">
        <i class="fas fa-plus"></i> Add New Item
      </button>
    </div>

    <div class="total-blood">
      Total Blood Units: <span class="badge">{{ totalBloodCount }}</span>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <StockInventoryModal :initial-item="editingItem" @close="onModalClose" @inventory-added="onInventoryAdded" />
      </div>
    </div>

    <div class="table-wrapper">
      <table class="stock-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stockItems" :key="item.id">
            <td>{{ item.itemType }}</td>
            <td>
              <span class="type-badge" :class="item.inventoryType">
                {{ item.inventoryType }}
              </span>
            </td>
            <td>
              <div class="quantity-cell">
                <span class="quantity">{{ item.quantity }}</span>
                <span class="unit"> units/bags</span>
              </div>
            </td>
            <td class="actions">
              <button class="action-btn edit" @click="editItem(item)" title="Edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete" @click="deleteItem(item)" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StockInventoryModal from './StockInventoryModal.vue';
import api from '@/services/api';
import Navbar from './Navbar.vue';
// import CountCards from '@/components/CountCards.vue'
export default {
  name: "StockInventory",
  components: { StockInventoryModal, Navbar },
  data() {
    return {
      showModal: false,
      editingItem: null
    }
  },
  computed: {
    stockItems() {
      return this.$store.state.stockInventory;
    },
    totalBloodCount() {
      return this.stockItems.filter(item => item.inventoryType === 'blood').reduce((sum, item) => sum + item.quantity, 0);
    },
  },
  async created() {
    await this.$store.dispatch('loadStock');
  },
  methods: {
    openModal() {
      this.editingItem = null;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async onInventoryAdded() {
      await this.$store.dispatch('loadStock');
      this.showModal = false;
      this.editingItem = null;
    },
    editItem(item) {
      this.editingItem = item;
      this.showModal = true;
    },
    async deleteItem(item) {
      await api.delete(`/stockInventory/${item.id}`);
      await this.$store.dispatch('loadStock');
    },
    onModalClose() {
      this.showModal = false;
      this.editingItem = null;
    }
  }
}
</script>

<style scoped>
.stock-container {
  max-width: 950px;
  margin: 30px auto;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial;
  padding: 0 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.add-btn {
  background-color: #d32f2f;
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn i {
  margin-right: 6px;
}

.add-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.total-blood {
  font-size: 20px;
  margin-bottom: 15px;
}

.badge {
  background-color: #4caf50;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.quantity-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #2196f3;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
  font-size: 13px;
}

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
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
}

.modal-close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #333;
  font-size: 22px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.modal-close-btn:hover {
  background: rgba(211, 47, 47, 0.8);
  color: #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
