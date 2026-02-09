<template>
  <div class="donors-container">
    <Navbar />
    <h1>Donar Details</h1>
    <div class="search-filters">
      <input type="text" v-model="searchCity" placeholder="Search by city" />
      <input type="text" v-model="searchBlood" placeholder="Search by blood/organ " />
      <button @click="applyFilters">Search</button>
    </div>

    <div class="page-size-selector">
      <select id="pageSize" v-model.number="pageSize" @change="currentPage = 1">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <div v-if="filteredDonors.length" class="table-wrapper">
      <table class="donors-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Blood Type</th>
            <th>Donation Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(donor, index) in paginatedDonors" :key="donor.id">
            <td>{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td>{{ donor.firstName }} {{ donor.lastName }}</td>
            <td>{{ calculateAge(donor.dob) }}</td>
            <td>{{ donor.city }}</td>
            <td>
              <span class="blood-badge">{{ donor.bloodType }}</span>
            </td>
            <td class="status-cell" style="cursor: pointer;">
              <span v-if="donor.donationStatus === 'pending'" @click="toggleDonationStatus(donor)" class="status-emoji"
                title="Pending">⏳</span>
              <span v-else-if="donor.donationStatus === 'completed' || donor.donationStatus === 'done'"
                @click="toggleDonationStatus(donor)" class="status-emoji" title="Completed">✅</span>
            </td>
            <td class="actions">
              <button class="action-btn edit" @click="editDonor(donor)" title="Edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete" @click="deleteDonor(donor)" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button :disabled="currentPage == 1" @click="prevPage">‹ Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage == totalPages" @click="nextPage">Next ›</button>
      </div>
    </div>

    <div v-else class="empty">No donors found.</div>
  </div>
</template>

<script>
import { fetchAllDonarDetails } from '@/services/auth';
import Navbar from './Navbar.vue';
import api from '@/services/api';
import store from '@/store';

export default {
  name: 'RegisteredDonars',
  components: {
    Navbar
  },
  data() {
    return {
      donors: [],
      searchCity: '',
      searchBlood: '',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10, 15, 20],
    }
  },
  computed: {
    filteredDonors() {
      return this.donors.filter(d => {
        const cityMatch = d.city?.toLowerCase().includes(this.searchCity.toLowerCase());
        const bloodMatch = this.searchBlood ? d.bloodType.toLowerCase().includes(this.searchBlood.toLowerCase()) : true;
        return cityMatch && bloodMatch;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredDonors.length / this.pageSize) || 1;
    },
    paginatedDonors() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredDonors.slice(start, start + this.pageSize);
    }
  },
  async created() {
    this.donors = await fetchAllDonarDetails();
  },
  methods: {
    calculateAge(dob) {
      if (!dob) return '-';
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - birthYear;
    },
    editDonor(donor) {
      if (this.$bus && this.$bus.$emit) {
        this.$bus.$emit('open-registration', donor);
      } else if (this.$root && this.$root.$emit) {
        this.$root.$emit('open-registration', donor);
      }
    },
    async toggleDonationStatus(donor) {
      const newStatus = donor.donationStatus === 'pending' ? 'completed' : 'pending';
      const ok = confirm(`Mark as "${newStatus}"?`);
      if (!ok) {
        return;
      }

      try {
        await api.patch(`/registeredDonars/${donor.id}`, { donationStatus: newStatus });
        donor.donationStatus = newStatus;
        let change = 0;
        if (newStatus === 'completed') {
          change = donor.quantity || 1;
        } else if (newStatus === 'pending') {
          change = -(donor.quantity || 1);
        }

        await store.dispatch('updateStockCount', { itemType: donor.bloodType, change });

      } catch (err) {
        console.error(err);
        alert('Update failed');
      }
    },
    async deleteDonor(donor) {
      const ok = confirm(`Delete donor ${donor.firstName} ${donor.lastName}?`);
      if (!ok) {
        return;
      }
      try {
        if (donor.id) {
          await api.delete(`/registeredDonars/${donor.id}`);
          this.donors = this.donors.filter(d => d.id !== donor.id);
        }
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      } catch (err) {
        console.error(err);
      }
    },
    applyFilters() {
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    }
  }
}
</script>

<style scoped>
.donors-container {
  max-width: 950px;
  margin: 30px auto;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial;
  padding: 0 10px;
}

.search-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.search-filters input,
.search-filters select {
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.2s;
}

.search-filters button {
  padding: 10px 18px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.search-filters button:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.page-size-selector {
  display: flex;
  align-items: flex-end;
  justify-content: end;
  gap: 8px;
  margin-bottom: 15px;
}

.page-size-selector select {
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.donors-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.donors-table th,
.donors-table td {
  padding: 12px 15px;
  text-align: left;
}

.donors-table thead {
  background: #f7f7f7;
  font-weight: 600;
}

.donors-table tbody tr {
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.donors-table tbody tr:hover {
  background: #fafafa;
}

.blood-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f44336;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
  font-size: 13px;
}

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

.empty {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 30px 0;
}
</style>