<template>
  <div>
    <div class="modal-overlay" :class="{ active: showModal }" @click.self="closeModal">
      <div class="registration-modal">
        <div class="modal-header">
          <h2>{{ message }}</h2>
          <button class="close-modal" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <p v-if="errors" class="error-message">{{ errors }}</p>
          <div class="form-step" v-show="currentStep === 1">
            <h3 class="form-title">Personal Information</h3>

            <div class="form-grid">
              <div class="form-group required">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="form.firstName" placeholder="Enter your first name">
              </div>

              <div class="form-group required">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="form.lastName" placeholder="Enter your last name">
              </div>

              <div class="form-group required">
                <label for="email">Email Address</label>
                <input type="email" id="email" v-model="form.email" placeholder="Enter your email">
              </div>

              <div class="form-group required">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="form.phone" placeholder="Enter your phone number">
              </div>

              <div class="form-group required">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" v-model="form.dob">
              </div>

              <div class="form-group required">
                <label for="gender">Gender</label>
                <select id="gender" v-model="form.gender">
                  <option value="" disabled selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div class="form-navigation">
              <div></div>
              <button class="btn-next" @click="nextStep(1)">Next</button>
            </div>
          </div>

          <div class="form-step" v-show="currentStep === 2">
            <h3 class="form-title">Donation Information</h3>

            <div class="form-group required">
              <label for="donationCategory">Donation Category</label>
              <select id="donationCategory" v-model="form.donationCategory" @change="handleCategoryChange">
                <option value="" disabled>Select category</option>
                <option value="Blood">Blood</option>
                <option value="Organ">Organ</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div v-if="form.donationCategory" class="form-grid">
              <div class="form-group required">
                <label v-if="form.donationCategory === 'Blood'">Blood Type</label>
                <label v-else-if="form.donationCategory === 'Organ'">Organ Name</label>
                <label v-else>Donation Type</label>

                <select v-if="form.donationCategory === 'Blood'" v-model="form.bloodType">
                  <option value="" disabled>Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="unknown">I don't know</option>
                </select>

                <select v-else-if="form.donationCategory === 'Organ'" v-model="form.bloodType">
                  <option value="" disabled>Select organ</option>
                  <option value="Heart">Heart</option>
                  <option value="Liver">Liver</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Lung">Lung</option>
                  <option value="I don't know">I don't know</option>
                </select>

                <input v-else type="text" v-model="form.bloodType" placeholder="Enter donation type">
              </div>

              <div class="form-group">
                <label for="lastDonation">Last Donation Date (Optional)</label>
                <input type="date" id="lastDonation" v-model="form.lastDonation">
              </div>

              <div class="form-group required">
                <label for="healthStatus">Health Status</label>
                <select id="healthStatus" v-model="form.healthStatus">
                  <option value="" disabled>Select health status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="recent-illness">Recently recovered</option>
                </select>
              </div>

              <div class="form-group required">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" v-model="form.weight" min="45" placeholder="Minimum 45 kg">
              </div>
            </div>

            <div class="form-group">
              <label for="medicalHistory">Medical History (Optional)</label>
              <textarea id="medicalHistory" rows="3" v-model="form.medicalHistory"
                placeholder="Any medical conditions, surgeries, or allergies"></textarea>
            </div>

            <div class="form-navigation">
              <button class="btn-prev" @click="prevStep()">
                <i class="fas fa-arrow-left"></i> Previous
              </button>
              <button class="btn-next" @click="nextStep(2)">Next <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>

          <!-- Step 3: Location & Preferences -->
          <div class="form-step" v-show="currentStep === 3">
            <h3 class="form-title">Location & Preferences</h3>

            <div class="form-grid">
              <div class="form-group required">
                <label for="city">City</label>
                <input type="text" id="city" v-model="form.city" placeholder="Enter your city">
              </div>

              <div class="form-group required">
                <label for="state">State/Province</label>
                <input type="text" id="state" v-model="form.state" placeholder="Enter state/province">
              </div>

              <div class="form-group required">
                <label for="country">Country</label>
                <input type="text" id="country" v-model="form.country" placeholder="Enter your country">
              </div>

              <div class="form-group">
                <label for="postalCode">Postal Code</label>
                <input type="text" id="postalCode" v-model="form.postalCode" placeholder="Enter postal code">
              </div>
            </div>

            <div class="form-group">
              <label for="preferredCenter">Preferred Donation Center (Optional)</label>
              <select id="preferredCenter" v-model="form.preferredCenter">
                <option value="" selected>Select preferred center</option>
                <option value="central">Central Blood Bank</option>
                <option value="north">North City Hospital</option>
                <option value="south">South Medical Center</option>
                <option value="east">East Community Clinic</option>
                <option value="west">West General Hospital</option>
              </select>
            </div>

            <input type="hidden" v-model="form.donationStatus">

            <div class="form-navigation">
              <button class="btn-prev" @click="prevStep()">
                <i class="fas fa-arrow-left"></i> Previous
              </button>
              <button class="btn-submit" @click="nextStep(3)">Submit Registration</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerDonar } from '@/services/auth';
import api from '@/services/api';

export default {
  name: 'RegistrationForm',
  props: {
    message: String,
  },
  data() {
    return {
      showModal: false,
      currentStep: 1,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        donationCategory: '',
        bloodType: '',
        lastDonation: '',
        healthStatus: '',
        weight: null,
        medicalHistory: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        preferredCenter: '',
        donationStatus: 'pending'
      },
      errors: ''
    }
  },
  mounted() {
    if (this.$bus && this.$bus.$on) {
      this.$bus.$on('open-registration', this.openModal);
    } else if (this.$root && this.$root.$on) {
      this.$root.$on('open-registration', this.openModal);
    }
  },
  beforeDestroy() {
    if (this.$bus && this.$bus.$off) {
      this.$bus.$off('open-registration', this.openModal);
    } else if (this.$root && this.$root.$off) {
      this.$root.$off('open-registration', this.openModal);
    }
  },
  methods: {
    openModal(donor) {
      this.errors = '';
      this.currentStep = 1;

      if (donor) {
        Object.assign(this.form, {
          id: donor.id,
          firstName: donor.firstName || '',
          lastName: donor.lastName || '',
          email: donor.email || '',
          phone: donor.phone || '',
          dob: donor.dob || '',
          gender: donor.gender || '',
          bloodType: donor.bloodType || '',
          lastDonation: donor.lastDonation || '',
          healthStatus: donor.healthStatus || '',
          weight: donor.weight || null,
          medicalHistory: donor.medicalHistory || '',
          city: donor.city || '',
          state: donor.state || '',
          country: donor.country || '',
          postalCode: donor.postalCode || '',
          preferredCenter: donor.preferredCenter || '',
          donationStatus: donor.donationStatus || 'pending',
          donationCategory: donor.donationCategory || '',

        });
      } else {
        this.resetForm();
      }

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    handleCategoryChange() {
      this.form.bloodType = '';
    },
    async nextStep(step) {
      const valid = await this.validateStep(step);
      if (valid) {
        if (step === 3) {
          await this.submitForm();
        } else {
          this.currentStep++;
        }
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.errors = '';
      }
    },
    async validateStep(step) {
      this.errors = '';

      if (step === 1) {
        if (!this.form.firstName) { this.errors = 'First name is required'; return false; }
        if (!this.form.lastName) { this.errors = 'Last name is required'; return false; }
        if (!this.form.email) { this.errors = 'Email is required'; return false; }
        if (!this.form.phone) { this.errors = 'Phone is required'; return false; }
        if (!this.form.dob) { this.errors = 'Date of Birth is required'; return false; }
        const age = this.calculateAge(this.form.dob);
        if (age < 18) { this.errors = 'Minimum age is 18'; return false; }
        if (!this.form.gender) { this.errors = 'Gender is required'; return false; }
      }

      if (step === 2) {
        if (!this.form.donationCategory) { this.errors = 'Donation category is required'; return false; }
        if (!this.form.bloodType) {
          this.errors = this.form.donationCategory === 'Other'
            ? 'Donation type is required'
            : `${this.form.donationCategory === 'Blood' ? 'Blood type' : 'Organ name'} is required`;
          return false;
        }
        if (!this.form.healthStatus) { this.errors = 'Health status is required'; return false; }
        if (!this.form.weight) { this.errors = 'Weight is required'; return false; }
        if (this.form.weight < 45) { this.errors = 'Minimum weight is 45 kg'; return false; }
      }

      if (step === 3) {
        if (!this.form.city) { this.errors = 'City is required'; return false; }
        if (!this.form.state) { this.errors = 'State is required'; return false; }
        if (!this.form.country) { this.errors = 'Country is required'; return false; }
      }

      return true;
    },
    async submitForm() {
      try {
        if (this.form.id) {
          await api.put(`/registeredDonars/${this.form.id}`, { ...this.form });
        } else {
          await registerDonar(this.form);
        }

        if (this.$bus && this.$bus.$emit) {
          this.$bus.$emit('donor-saved');
        } else if (this.$root && this.$root.$emit) {
          this.$root.$emit('donor-saved');
        }

        this.closeModal();
        this.resetForm();
      } catch (error) {
        this.errors = error.message || 'Save failed';
      }
    },
    calculateAge(dob) {
      const birthDate = new Date(dob);
      const diff = Date.now() - birthDate.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        donationCategory: '',
        bloodType: '',
        lastDonation: '',
        healthStatus: '',
        weight: null,
        medicalHistory: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        preferredCenter: '',
        donationStatus: 'pending'
      };
      this.currentStep = 1;
      this.errors = '';
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.registration-modal {
  background: white;
  width: 90%;
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateY(-20px);
  transition: transform 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-overlay.active .registration-modal {
  transform: translateY(0);
}

/* ===== HEADER ===== */
.modal-header {
  background: #dc3545;
  color: white;
  padding: 20px;
  position: relative;
  text-align: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 30px;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.form-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.form-title {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.form-group.required label::after {
  content: ' *';
  color: #dc3545;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-prev,
.btn-next,
.btn-submit {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-prev {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}

.btn-prev:hover {
  background: #e9ecef;
}

.btn-next {
  background: #dc3545;
  color: white;
}

.btn-next:hover {
  background: #c82333;
}

.btn-submit {
  background: #28a745;
  color: white;
}

.btn-submit:hover {
  background: #218838;
}

.btn-prev i,
.btn-next i {
  margin: 0 5px;
}
</style>