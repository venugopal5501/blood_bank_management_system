<template>
    <div>
    <div class="modal-overlay" :class="{ active: showModal }" @click.self="closeModal">
    <div class="registration-modal">
      <div class="modal-header">
        <button class="close-modal" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <h2>Donar Registration</h2>
      </div>
      
      <div class="modal-body">
        <p>{{ errors }}</p>
        <!-- Step Indicator -->
        <div class="step-indicator">
          <div class="step active" id="step1">1</div>
          <div class="step-line"></div>
          <div class="step" id="step2">2</div>
          <div class="step-line"></div>
          <div class="step" id="step3">3</div>
        </div>
        
        <!-- Step 1: Personal Information -->
        <div class="form-step active" id="step1Form">
          <h3 class="form-title">Personal Information</h3>
          
          <div class="form-row">
            <div class="form-group required">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" v-model="form.firstName" placeholder="Enter your first name" required>
            </div>
            
            <div class="form-group required">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" v-model="form.lastName" placeholder="Enter your last name" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group required">
              <label for="dob">Date of Birth</label>
              <input type="date" id="dob" v-model="form.dob" required>
            </div>
            
            <div class="form-group required">
              <label for="gender">Gender</label>
              <select id="gender" v-model="form.gender" required style="width: 338px;">
                <option value="" disabled selected>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>


          <div class="form-row">
            <div class="form-group required">
              <label for="email">Email Address</label>
              <input type="email" id="email" v-model="form.email" placeholder="Enter your email address" required>
            </div>
            
            <div class="form-group required">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" v-model="form.phone" placeholder="Enter your phone number" required>
            </div>
          </div>
          
          
          
          <div class="form-navigation">
            <div></div> <!-- Empty div for spacing -->
            <button class="btn-next" @click="nextStep(1)">Next</button>
            <!-- <button class="btn-next" data-next="step2">Next <i class="fas fa-arrow-right"></i></button> -->
          </div>
        </div>

        <!-- SINGLE Step 2 container -->
        <div class="form-step" id="step2Form">
          <h3 class="form-title">Medical & Donation Information</h3>

          <div class="form-row">
            <div class="form-group required">
              <label for="donationCategory">Donation category</label>
              <select id="donationCategory" v-model="form.donationCategory" required>
                <option value="" disabled>Select your Donation category</option>
                <option value="Blood">Blood</option>
                <option value="Organ">Organ</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

              <div v-if="form.donationCategory === 'Other'">
            <div class="form-row">
              <div class="form-group required">
              <label for="donationType">Donation</label>
              <input type="text" id="donationType" v-model="form.bloodType" placeholder="Enter your donation type" required>
            </div>

              <div class="form-group">
                <label for="lastDonation">Last Donation Date (if any)</label>
                <input type="date" id="lastDonation" v-model="form.lastDonation">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group required">
                <label for="healthStatus">Current Health Status</label>
                <select id="healthStatus" v-model="form.healthStatus" required>
                  <option value="" disabled>Select your health status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="recent-illness">Recently recovered from illness</option>
                </select>
              </div>

              <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" v-model="form.weight" min="45" placeholder="Minimum 45 kg required">
              </div>
            </div>

            <div class="form-group">
              <label for="medicalHistory">Medical History (if any)</label>
              <textarea id="medicalHistory" rows="3" v-model="form.medicalHistory" placeholder="Any relevant medical conditions, surgeries, or allergies"></textarea>
            </div>
          </div>

          <!-- Blood-only fields (rendered when category is Blood) -->
          <div v-if="form.donationCategory === 'Blood'">
            <div class="form-row">
              <div class="form-group required">
                <label for="bloodType">Blood Type</label>
                <select id="bloodType" v-model="form.bloodType" required>
                  <option value="" disabled>Select your blood type</option>
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
              </div>

              <div class="form-group">
                <label for="lastDonation">Last Donation Date (if any)</label>
                <input type="date" id="lastDonation" v-model="form.lastDonation">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group required">
                <label for="healthStatus">Current Health Status</label>
                <select id="healthStatus" v-model="form.healthStatus" required>
                  <option value="" disabled>Select your health status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="recent-illness">Recently recovered from illness</option>
                </select>
              </div>

              <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" v-model="form.weight" min="45" placeholder="Minimum 45 kg required">
              </div>
            </div>

            <div class="form-group">
              <label for="medicalHistory">Medical History (if any)</label>
              <textarea id="medicalHistory" rows="3" v-model="form.medicalHistory" placeholder="Any relevant medical conditions, surgeries, or allergies"></textarea>
            </div>
          </div>


          <div v-if="form.donationCategory === 'Organ'">
            <div class="form-row">
              <div class="form-group required">
                <label for="organName">Organ Name</label>
                <select id="organName" v-model="form.bloodType" required>
               <option value="" disabled>Select your organ</option>
                  <option value="Heart">Heart</option>
                  <option value="Liver">Liver</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Lung">Lung</option>
                  <option value="I don't know">I don't know</option>
                </select>
              </div>

              <div class="form-group">
                <label for="lastDonation">Last Donation Date (if any)</label>
                <input type="date" id="lastDonation" v-model="form.lastDonation">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group required">
                <label for="healthStatus">Current Health Status</label>
                <select id="healthStatus" v-model="form.healthStatus" required>
                  <option value="" disabled>Select your health status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="recent-illness">Recently recovered from illness</option>
                </select>
              </div>

              <div class="form-group">
                <label for="weight">Weight (kg)</label>
                <input type="number" id="weight" v-model="form.weight" min="45" placeholder="Minimum 45 kg required">
              </div>
            </div>

            <div class="form-group">
              <label for="medicalHistory">Medical History (if any)</label>
              <textarea id="medicalHistory" rows="3" v-model="form.medicalHistory" placeholder="Any relevant medical conditions, surgeries, or allergies"></textarea>
            </div>
          </div>
          <div class="form-navigation">
            <button class="btn-prev" data-prev="step1" @click="prevStep()"><i class="fas fa-arrow-left"></i> Previous</button>
            <button class="btn-next" data-next="step3" @click="nextStep(2)">Next <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
        
        <!-- Step 3: Location & Preferences -->
        <div class="form-step" id="step3Form">
          <h3 class="form-title">Location & Preferences</h3>
          
          <div class="form-row">
            <div class="form-group required">
              <label for="city">City</label>
              <input type="text" id="city" placeholder="Enter your city" v-model="form.city" required>
            </div>
            
            <div class="form-group required">
              <label for="state">State/Province</label>
              <input type="text" id="state" placeholder="Enter your state/province" v-model="form.state" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group required">
              <label for="country">Country</label>
              <input type="text" id="country" placeholder="Enter your country" v-model="form.country" required>
            </div>
            
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input type="text" id="postalCode" placeholder="Enter your postal code" v-model="form.postalCode">
            </div>
          </div>
          
          <div class="form-group">
            <label for="preferredCenter">Preferred Donation Center</label>
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
            <button class="btn-prev" data-prev="step2" @click="prevStep()"><i class="fas fa-arrow-left"></i> Previous</button>
            <button class="btn-submit" @click="nextStep(3)"  id="submitForm" >Submit Registration</button>
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
      terms: false,
      newsletter: false,
      donationStatus: 'pending',
      donationCategory: ''
    },
    errors: '' // store validation messages
  }
},


  mounted() {
    // listen for event and accept optional donor payload
    if (this.$bus && this.$bus.$on) {
      this.$bus.$on('open-registration', this.openModal)
    } else if (this.$root && this.$root.$on) {
      this.$root.$on('open-registration', this.openModal)
    }
  },

  beforeDestroy() {
    if (this.$bus && this.$bus.$off) {
      this.$bus.$off('open-registration', this.openModal)
    } else if (this.$root && this.$root.$off) {
      this.$root.$off('open-registration', this.openModal)
    }
  },

 methods: {
  openModal(donor) {
    this.errors = ''
    this.currentStep = 1
    if (donor) {
      // fill form with donor data for editing
      this.form = {
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
        terms: donor.terms || false,
        newsletter: donor.newsletter || false,
        donationStatus: donor.donationStatus || 'pending',
        donationCategory: donor.donationCategory || '',
      }
      this.editing = true
    } else {
      this.resetForm()
      this.editing = false
    }
    this.showModal = true
    // ensure UI step visibility
    this.showStep && this.showStep(this.currentStep)
  },
  closeModal() {
    this.showModal = false;
  },

  async nextStep(step) {
    const valid = await this.validateStep(step);
    if (valid) {
      this.currentStep++;
      this.showStep(this.currentStep);
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
      this.errors = ''; // clear previous errors when going back
    }
  },

  showStep(step) {
    // hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));

    // show current step
    const current = document.getElementById(`step${step}Form`);
    if (current) current.classList.add('active');
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
      if (!this.form.bloodType) { this.errors = 'Blood type is required'; return false; }
      if (!this.form.healthStatus) { this.errors = 'Health status is required'; return false; }
      if (!this.form.weight) { this.errors = 'Weight is required'; return false; }
      if (this.form.weight < 45) { this.errors = 'Minimum weight is 45 kg'; return false; }
    }

    if (step === 3) {
      if (!this.form.city) { this.errors = 'City is required'; return false; }
      if (!this.form.state) { this.errors = 'State is required'; return false; }
      if (!this.form.country) { this.errors = 'Country is required'; return false; }
      try {
        if (this.form.id) {
          // update existing donor
          await api.put(`/registeredDonars/${this.form.id}`, { ...this.form })
        } else {
          await registerDonar(this.form);
        }
        // notify list to refresh
        if (this.$bus && this.$bus.$emit) this.$bus.$emit('donor-saved')
        else if (this.$root && this.$root.$emit) this.$root.$emit('donor-saved')
      } catch (error) {
        this.errors = error.message || 'Save failed';
        return false;
      }
    }
    return true; // all good
  },

  calculateAge(dob) {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  ,
  resetForm() {
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
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
      terms: false,
      newsletter: false,
      donationStatus: 'pending'
    }
    this.currentStep = 1
    this.errors = ''
    this.editing = false
  }
}


}

</script>

<style scoped>
/* ===== REGISTRATION MODAL ===== */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
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
      max-width: 800px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      transform: scale(0.9);
      transition: transform 0.3s ease;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-overlay.active .registration-modal {
      transform: scale(1);
    }

    .modal-header {
      background: linear-gradient(135deg, #d32f2f, #b71c1c);
      color: white;
      padding: 30px;
      text-align: center;
      position: relative;
    }

    .modal-header h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .modal-header p {
      opacity: 0.9;
      font-size: 16px;
    }

    .close-modal {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: white;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }

    .close-modal:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }

    .modal-body {
      padding: 40px;
    }

    .form-step {
      display: none;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-step.active {
      display: block;
    }

    .form-title {
      font-size: 24px;
      color: #0d1b3e;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f4f8;
    }

    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 25px;
    }

    .form-group {
      flex: 1;
      min-width: 250px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #444;
      text-align: left;
      margin-left: 6px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 88%;
      padding: 14px 18px;
      border: 2px solid #e1e5eb;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s;
      background: #f9fafc;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #d32f2f;
      background: white;
      box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
    }

    .form-group.required label::after {
      content: ' *';
      color: #d32f2f;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .checkbox-group input {
      width: 18px;
      height: 18px;
    }

    .form-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 25px;
      border-top: 2px solid #f0f4f8;
    }

    .btn-next, .btn-prev, .btn-submit {
      padding: 14px 30px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
    }

    .btn-next {
      background: #d32f2f;
      color: white;
    }

    .btn-next:hover {
      background: #b71c1c;
      transform: translateY(-3px);
    }

    .btn-prev {
      background: #f0f4f8;
      color: #444;
    }

    .btn-prev:hover {
      background: #e1e5eb;
    }

    .btn-submit {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
      color: white;
      width: 100%;
    }

    .btn-submit:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(46, 204, 113, 0.2);
    }

    .step-indicator {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    .step {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f0f4f8;
      color: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      position: relative;
    }

    .step.active {
      background: #d32f2f;
      color: white;
    }

    .step.completed {
      background: #2ecc71;
      color: white;
    }

    .step-line {
      flex: 1;
      height: 3px;
      background: #f0f4f8;
      margin-top: 18px;
      max-width: 60px;
    }

    .step-line.completed {
      background: #2ecc71;
    }
</style>