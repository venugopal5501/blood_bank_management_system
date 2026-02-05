<template>
  <div class="donors-container">
<Navbar />
    <!-- Search Filters -->
    <div class="search-filters">
      <input type="text" v-model="searchCity" placeholder="Search by city" />
      <select v-model="searchBlood">
        <option value="">All Blood Types</option>
        <option v-for="type in bloodTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <button @click="applyFilters">Search</button>
    </div>

    <!-- Donors Table -->
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
            <td>{{ index + 1 + (currentPage-1)*pageSize }}</td>
            <td>{{ donor.firstName }} {{ donor.lastName }}</td>
            <td>{{ calculateAge(donor.dob) }}</td>
            <td>{{ donor.city }}</td>
            <td>
              <span class="blood-badge">{{ donor.bloodType }}</span>
            </td>
            <td class="status-cell"> <span v-if="donor.donationStatus === 'pending'" @click="toggleDonationStatus(donor)" class="status-emoji" title="Pending">⏳</span> <span v-else-if="donor.donationStatus === 'completed' || donor.donationStatus === 'done'" @click="toggleDonationStatus(donor)" class="status-emoji" title="Completed">✅</span> </td> <td class="actions"> <button class="icon edit" @click="editDonor(donor)" title="Edit"> ✎ </button> <button class="icon delete" @click="deleteDonor(donor)" title="Delete"> 🗑 </button> </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage">‹ Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Next ›</button>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="empty">No donors found.</div>
  </div>
</template>

<script>
import { fetchAllDonarDetails } from '@/services/auth';
import Navbar from './Navbar.vue';
import api from '@/services/api';


export default {
  name: 'RegisteredDonarsEnhanced',
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
    }
  },
  computed: {
    filteredDonors() {
      return this.donors.filter(d => {
        const cityMatch = d.city?.toLowerCase().includes(this.searchCity.toLowerCase());
        const bloodMatch = this.searchBlood ? d.bloodType === this.searchBlood : true;
        return cityMatch && bloodMatch;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredDonors.length / this.pageSize);
    },
    paginatedDonors() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredDonors.slice(start, start + this.pageSize);
    }
  },
  async mounted() {
    this.donors = await fetchAllDonarDetails();
  },
  methods: {
    calculateAge(dob) {
      if (!dob) return '-';
      const birthDate = new Date(dob);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    editDonor(donor) {
      if (this.$bus && this.$bus.$emit) {
        this.$bus.$emit('open-registration', donor)
      } else if (this.$root && this.$root.$emit) {
        this.$root.$emit('open-registration', donor)
      }
    },
    async toggleDonationStatus(donor) {
      const newStatus =
        donor.donationStatus === 'pending' ? 'completed' : 'pending';
      const ok = confirm(`Mark as "${newStatus}"?`);
      if (!ok) return;
      try {
        await api.patch(`/registeredDonars/${donor.id}`, { donationStatus: newStatus });
        this.$store.dispatch('UPDATE_STOCK_COUNT', {
          itemType: donor.bloodType,
          change: newStatus === 'completed' ? +1 : -1
        });
        await this.$store.dispatch('updateStockCount', {
          itemType: donor.bloodType,
          change: newStatus === 'completed' ? +1 : -1
        });
        donor.donationStatus = newStatus;
      } catch (err) {
        console.error(err);
        alert('Update failed');
      }
    },
    async deleteDonor(donor) {
      const ok = confirm(`Delete donor ${donor.firstName} ${donor.lastName}?`);
      if (!ok) return;
      try {
        if (donor.id) await api.delete(`/registeredDonars/${donor.id}`);
        this.donors = this.donors.filter(d => d.id !== donor.id);
        if (this.$bus && this.$bus.$emit) this.$bus.$emit('donor-deleted', donor.id);
        else if (this.$root && this.$root.$emit) this.$root.$emit('donor-deleted', donor.id);
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      } catch (err) {
        console.error('Failed to delete donor', err);
        alert('Failed to delete donor');
      }
    },
    applyFilters() {
      this.currentPage = 1;
    },
    prevPage() { if (this.currentPage > 1) this.currentPage--; },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
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

/* Search Filters */
.search-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
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

.search-filters input:focus,
.search-filters select:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 5px rgba(211, 47, 47, 0.4);
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

/* Table */
.table-wrapper {
  overflow-x: auto;
}

.donors-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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

/* Blood badge */
.blood-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: #f44336;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
  font-size: 13px;
}

/* Status badge */
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.status-badge.pending {
  background: #ff9800;
  color: #fff;
}

.status-badge.completed {
  background: #4caf50;
  color: #fff;
}

.status-badge:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

/* Action buttons */
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

/* Pagination */
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

/* No results */
.empty {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 30px 0;
}

/* Responsive */
@media(max-width: 768px) {
  .donors-table thead {
    display: none;
  }

  .donors-table tbody tr {
    display: block;
    margin-bottom: 15px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .donors-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    border: none;
  }

  .donors-table tbody td::before {
    content: attr(data-label);
    font-weight: 600;
  }
}
</style>
