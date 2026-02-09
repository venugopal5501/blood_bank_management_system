<template>
  <div class="stock-container">
    <Navbar />

    <div class="header">
      <h1>Stock Inventory</h1>
      <button class="add-btn" @click="openModal">
        <i class="fas fa-plus"></i> Add New Item
      </button>
    </div>
    <div style="display: flex;justify-content: center; gap :5%">
      <div class="total-blood">
        Total Blood Units: <span class="badge">{{ totalBloodCount }}</span>
      </div>
      <div class="total-blood">
        Avaliable Organs: <span class="badge">{{ totalOrganCount }}</span>
      </div>
      <div class="total-blood">
        Others: <span class="badge">{{ totalOtherCount }}</span>
      </div>
    </div>
    <PageSizeSelector v-model="pageSize" :sizes="pageSizes" />
    <DataTable :headers="tableHeaders" :rows="tableRows">
      <template v-slot:actions="{ row }">
        <div class="action-buttons">
          <button class="action-btn edit" @click="editItem(row)">
            <i class="fas fa-edit"></i>
          </button>

          <button class="action-btn delete" @click="deleteItem(row)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </template>
    </DataTable>

    <PaginationVue :currentPage="currentPage" :totalPages="totalPages" @prev="prevPage" @next="nextPage" />

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <StockInventoryModal :initial-item="editingItem" @close="onModalClose" @inventory-added="onInventoryAdded" />
      </div>
    </div>

  </div>
</template>

<script>
import StockInventoryModal from '@/components/StockInventoryModal.vue'
import Navbar from '../components/Navbar.vue'
import DataTable from '@/components/Table.vue'
import PageSizeSelector from '@/components/PageSizeSelector.vue'
import PaginationVue from '@/components/Pagination.vue'
import api from '@/services/api'

export default {
  name: "StockInventorys",

  components: {
    StockInventoryModal,
    Navbar,
    DataTable,
    PageSizeSelector,
    PaginationVue
  },

  data() {
    return {
      showModal: false,
      editingItem: null,

      stockItems: [],
      totalItems: 0,

      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10, 15, 20]
    }
  },

  computed: {
    totalPages() {
      if (!this.totalItems || !this.pageSize) return 1
      return Math.max(1, Math.ceil(this.totalItems / this.pageSize))
    },
    totalBloodCount() {
      return this.stockItems.filter(item => item.inventoryType === 'blood').reduce((sum, item) => sum + item.quantity, 0);
    },
    totalOrganCount() {
      return this.stockItems.filter(item => item.inventoryType === 'organ').reduce((sum, item) => sum + item.quantity, 0);
    },
    totalOtherCount() {
      return this.stockItems.filter(item => item.inventoryType === 'other').reduce((sum, item) => sum + item.quantity, 0);
    },
    tableHeaders() {
      return [
        { label: 'Item Name', key: 'itemType' },
        { label: 'Type', key: 'inventoryType' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Actions', key: 'actions' }
      ]
    },

    tableRows() {
      return this.stockItems.map(item => ({
        id: item.id,
        itemType: item.itemType,
        inventoryType: item.inventoryType,
        quantity: item.quantity
      }))
    }
  },

  created() {
    this.fetchStock()
  },

  watch: {
    currentPage() {
      this.fetchStock()
    },

    pageSize() {
      this.currentPage = 1
      this.fetchStock()
    }
  },


  methods: {
    async fetchStock() {
      try {
        const response = await api.get('/stockInventory')
        const allData = response.data
        this.totalItems = allData.length
        const start = (this.currentPage - 1) * this.pageSize
        const end = start + this.pageSize
        this.stockItems = allData.slice(start, end)
      } catch (error) {
        console.error("Fetch error:", error)
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    openModal() {
      this.editingItem = null
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    },

    editItem(item) {
      this.editingItem = item
      this.showModal = true
    },

    async deleteItem(item) {
      await api.delete(`/stockInventory/${item.id}`)
      this.$toast.success("Deleted Successfully");

      if (this.currentPage > 1 && this.stockItems.length === 1) {
        this.currentPage--
      }

      await this.fetchStock()
    },

    async onInventoryAdded() {
      this.showModal = false
      await this.fetchStock()
      this.editingItem = null
    },

    onModalClose() {
      this.showModal = false
      this.editingItem = null
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