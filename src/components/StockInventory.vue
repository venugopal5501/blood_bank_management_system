<template>
  <div class="stock-container">
    <Navbar/>
    <!-- Header -->
    <div class="header">
      <h1>Stock Inventory</h1>
      <button class="add-btn" @click="openModal">
        <i class="fas fa-plus"></i> Add New Item
      </button>
    </div>

    <!-- Total Blood Count -->
    <div class="total-blood">
      Total Blood Units: <span class="badge">{{ totalBlood }}</span>
    </div>

    <!-- Modal Overlay -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <StockInventoryModal
          :initial-item="editingItem"
          @close="onModalClose"
          @inventory-added="onInventoryAdded"
        />
      </div>
    </div>

    <!-- Stock Items Table -->
    <div class="table-wrapper">
      <table class="stock-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stockItems" :key="item.id">
            <td>{{ item.itemType }}</td>
            <td><span class="quantity-badge">{{ item.quantity }}</span></td>
            <td>
              <button class="icon edit" @click="editItem(item)" title="Edit">✎</button>
              <button class="icon delete" @click="deleteItem(item)" title="Delete">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StockInventoryModal from './StockInventoryModal.vue';
import { fetchAllStockInventory } from '../services/auth';
import api from '@/services/api';
import Navbar from './Navbar.vue';

export default {
  name: "StockInventory",
  components: { StockInventoryModal, Navbar },
  data() {
    return {
      showModal: false,
      stockItems: [],
      editingItem: null
    }
  },
  computed: {
    totalBlood() {
      return this.$store.getters.totalBloodCount;
    }
  },
  async created() {
    this.stockItems = await fetchAllStockInventory();
  },
  methods: {
    openModal() { this.editingItem = null; this.showModal = true; },
    closeModal() { this.showModal = false; },
    onInventoryAdded(item) {
      this.stockItems = [item].concat(this.stockItems || []);
      this.showModal = false; this.editingItem = null;
    },
    editItem(item) { this.editingItem = item; this.showModal = true; },
    async deleteItem(item) {
      await api.delete(`/stockInventory/${item.id}`);
      this.stockItems = this.stockItems.filter(i => i.id !== item.id);
    },
    onModalClose() { this.showModal = false; this.editingItem = null; }
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

/* Header */
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

.add-btn i { margin-right: 6px; }

.add-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

/* Total Blood */
.total-blood {
  font-size: 16px;
  margin-bottom: 15px;
}

.badge {
  background-color: #4caf50;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.stock-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.stock-table th,
.stock-table td {
  padding: 12px 15px;
  text-align: left;
}

.stock-table thead {
  background: #f7f7f7;
  font-weight: 600;
}

.stock-table tbody tr {
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.stock-table tbody tr:hover {
  background: #fafafa;
}

/* Quantity Badge */
.quantity-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #2196f3;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
  font-size: 13px;
}

/* Action Buttons */
.actions .icon {
  background: #fff;
  border: 1px solid #ccc;
  padding: 5px 8px;
  margin-right: 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.actions .icon.edit:hover {
  background: #e3f2fd;
  border-color: #2196f3;
}

.actions .icon.delete:hover {
  background: #ffebee;
  border-color: #f44336;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
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
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
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

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive Table */
@media(max-width: 768px) {
  .stock-table thead { display: none; }
  .stock-table tbody tr {
    display: block;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .stock-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    border: none;
  }
  .stock-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
  }
}
</style>
