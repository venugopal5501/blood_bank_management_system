<template>
    <div class="donors-container">
        <Navbar />
        <h1>Donar Details</h1>
        <div class="search-filters">
            <input type="text" v-model="searchCity" placeholder="Search by city" />
            <input type="text" v-model="searchBlood" placeholder="Search by blood/organ " />
            <button @click="applyFilters">Search</button>
        </div>

        <PageSizeSelector v-model.number="pageSize" :sizes="pageSizes" />

        <DataTable :headers="tableHeaders" :rows="tableRows">

            <template v-if="currentUser" v-slot:DonationStatus="{ row }">
                <span v-if="row.DonationStatus === 'pending'" @click="toggleDonationStatus(row)" class="status-emoji">
                    ⏳
                </span>
                <span v-else @click="toggleDonationStatus(row)" class="status-emoji">
                    ✅
                </span>
            </template>

            <template v-if="currentUser" v-slot:actions="{ row }">
                <div class="action-buttons">
                    <button class="action-btn edit" @click="editDonor(row)">
                        <i class="fas fa-edit"></i>
                    </button>

                    <button class="action-btn delete" @click="deleteDonor(row)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </template>

        </DataTable>
        <PaginationVue :currentPage="currentPage" :totalPages="totalPages" @prev="prevPage" @next="nextPage" />
    </div>
</template>

<script>
import { fetchAllDonarDetails, isAdmin } from '@/services/auth';
import Navbar from '../components/Navbar.vue'
import api from '@/services/api';
import store from '@/store';
import DataTable from '@/components/Table.vue'
import PageSizeSelector from '@/components/PageSizeSelector.vue'
import PaginationVue from '@/components/Pagination.vue'

export default {
    name: 'RegisteredDonars',
    components: {
        Navbar,
        DataTable,
        PageSizeSelector,
        PaginationVue
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
            currentUser: true
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
        },
        tableHeaders() {
            const headers = [
                { label: 'Name', key: 'Name' },
                { label: 'Age', key: 'Age' },
                { label: 'City', key: 'City' },
                { label: 'Blood Type', key: 'BloodType' }
            ];

            if (this.currentUser) {
                headers.push(
                    { label: 'Donation Status', key: 'DonationStatus' },
                    { label: 'Action', key: 'actions' }
                );
            }
            return headers;
        },
        tableRows() {
            return this.paginatedDonors.map(donor => ({
                ...donor,
                id: donor.id,
                Name: donor.firstName + ' ' + donor.lastName,
                Age: this.calculateAge(donor.dob),
                City: donor.city,
                BloodType: donor.bloodType,
                DonationStatus: donor.donationStatus
            }));
        }
    },
    async created() {
        this.donors = await fetchAllDonarDetails();
        this.currentUser = isAdmin();
    },
    methods: {
        calculateAge(dob) {
            if (!dob) return '-';
            const birthDate = new Date(dob);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        async editDonor(donor) {
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
                this.$toast.success("Donation Status Updated Successfully");
                donor.donationStatus = newStatus;
                let change = 0;
                if (newStatus === 'completed') {
                    change = donor.quantity || 1;
                } else if (newStatus === 'pending') {
                    change = -(donor.quantity || 1);
                }

                await store.dispatch('updateStockCount', { itemType: donor.bloodType, change });
                this.donors = await fetchAllDonarDetails();

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
                    this.$toast.success("Donation Details Deleted Successfully");
                }
                if (this.currentPage > this.totalPages) {
                    this.currentPage = this.totalPages;
                }
            } catch (err) {
                console.error(err);
                this.$toast.error(err);
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


.empty {
    text-align: center;
    color: #999;
    font-size: 16px;
    padding: 30px 0;
}

.status-emoji {
    cursor: pointer;
}
</style>