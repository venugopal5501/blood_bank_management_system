<template>
  <div class="donors-container">

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
    <div v-if="filteredDonors.length">
      <table class="donors-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Blood Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(donor, index) in paginatedDonors" :key="donor.id">
            <td>{{ index + 1 + (currentPage-1)*pageSize }}</td>
            <td>{{ donor.firstName }} {{ donor.lastName }}</td>
            <td>{{ calculateAge(donor.dob) }}</td>  
            <td>{{ donor.city }}</td>
            <td>{{ donor.bloodType }}</td>
            <td class="actions">
              <button class="icon edit" @click="editDonor(donor)" title="Edit">
                ✎
              </button>
              <button class="icon delete" @click="deleteDonor(donor)" title="Delete">
                🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="empty">No donors found.</div>
  </div>
</template>

<script>
import { fetchAllDonarDetails } from '@/services/auth';
import api from '@/services/api';
export default {
  name: 'RegisteredDonarsEnhanced',
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
    // inside methods
editDonor(donor) {
  // publish the donor on the event-bus so the registration modal can open and receive it
  if (this.$bus && this.$bus.$emit) {
    this.$bus.$emit('open-registration', donor)
  } else if (this.$root && this.$root.$emit) {
  
    this.$root.$emit('open-registration', donor)
  }
},
// inside methods { ... }
async deleteDonor(donor) {
  const ok = confirm(`Delete donor ${donor.firstName} ${donor.lastName}?`);
  if (!ok) return;
  try {
    if (donor.id) {
      await api.delete(`/registeredDonars/${donor.id}`);
    }
    // remove locally for instant UI feedback
    this.donors = this.donors.filter(d => d.id !== donor.id);
    // notify others that list changed
    if (this.$bus && this.$bus.$emit) this.$bus.$emit('donor-deleted', donor.id);
    else if (this.$root && this.$root.$emit) this.$root.$emit('donor-deleted', donor.id);
    // ensure current page is valid
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  } catch (err) {
    console.error('Failed to delete donor', err);
    alert('Failed to delete donor');
  }
},
    applyFilters() {
      this.currentPage = 1; // Reset to first page on filter
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
  max-width: 900px;
  margin: 20px auto;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial;
}

.search-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-filters input,
.search-filters select {
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.search-filters button {
  padding: 8px 15px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.search-filters button:hover {
  background-color: #b71c1c;
}

.donors-table {
  width: 100%;
  border-collapse: collapse;
}

.donors-table th,
.donors-table td {
  padding: 10px 12px;
  border: 1px solid #eee;
  text-align: left;
}

.donors-table thead {
  background-color: #f0f0f0;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 6px 12px;
  border-radius: 4px;   
  border: 1px solid #ccc;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty {
  text-align: center;
  color: #666;
  padding: 20px 0;
}
</style>
