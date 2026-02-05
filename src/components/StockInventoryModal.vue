<template>
    <div class="container">
        <!-- Form Header -->
        <div class="form-header">
            <h1>
                <i class="fas fa-plus-circle"></i>
                Add New Inventory
            </h1>
            <p>Select type and enter details to add to inventory</p>
        </div>

        <!-- Form Content -->
        <div class="form-content">
            <!-- Step 1: Select Type -->
            <div class="form-section">
                <h2 class="section-title">
                    <i class="fas fa-vial"></i>
                    Step 1: Select Inventory Type
                </h2>
                
                <div class="radio-group" id="typeGroup">
                    <!-- Blood Option -->
                    <div class="radio-option">
                        <input 
                            type="radio" 
                            id="typeBlood" 
                            name="inventoryType" 
                            value="blood"
                            @change="onTypeChange('blood')"
                        >
                        <label for="typeBlood" class="radio-label">
                            <div class="radio-icon blood-icon">
                                <i class="fas fa-tint"></i>
                            </div>
                            <div class="radio-content">
                                <div class="radio-title">Blood</div>
                                <div class="radio-description">Whole blood, platelets, plasma, red cells</div>
                            </div>
                        </label>
                    </div>

                    <!-- Organ Option -->
                    <div class="radio-option">
                        <input 
                            type="radio" 
                            id="typeOrgan" 
                            name="inventoryType" 
                            value="organ"
                            @change="onTypeChange('organ')"
                        >
                        <label for="typeOrgan" class="radio-label">
                            <div class="radio-icon organ-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="radio-content">
                                <div class="radio-title">Organ</div>
                                <div class="radio-description">Heart, kidney, liver, lungs, cornea</div>
                            </div>
                        </label>
                    </div>

                    <!-- Other Option -->
                    <div class="radio-option">
                        <input 
                            type="radio" 
                            id="typeOther" 
                            name="inventoryType" 
                            value="other"
                            @change="onTypeChange('other')"
                        >
                        <label for="typeOther" class="radio-label">
                            <div class="radio-icon other-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="radio-content">
                                <div class="radio-title">Other</div>
                                <div class="radio-description">Medical supplies, equipment, accessories</div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Conditional Section for Blood -->
            <div v-if="selectedType === 'blood'" id="bloodSection" class="conditional-section">
                <h2 class="section-title">
                    <i class="fas fa-tint"></i>
                    Blood Details
                </h2>
                
                <div class="form-group">
                    <label for="bloodType" class="required">Blood Type</label>
                    <div class="select-with-other">
                        <select 
                            id="bloodType" 
                            required
                            v-model="selectedBloodType"
                            @change="onBloodTypeChange($event.target.value)"
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="other">Other (Specify)</option>
                        </select>
                        
                        <!-- Other Blood Type Input -->
                        <div v-if="showOtherBloodType" id="otherBloodTypeGroup" class="other-input-group">
                            <label for="otherBloodType" class="required">Specify Blood Type</label>
                            <input 
                                type="text" 
                                id="otherBloodType" 
                                v-model="otherBloodTypeValue"
                                placeholder="Enter specific blood type (e.g., Rare Type)"
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conditional Section for Organ -->
            <div v-if="selectedType === 'organ'" id="organSection" class="conditional-section">
                <h2 class="section-title">
                    <i class="fas fa-heartbeat"></i>
                    Organ Details
                </h2>
                
                <div class="form-group">
                    <label for="organType" class="required">Organ Type</label>
                    <div class="select-with-other">
                        <select 
                            id="organType" 
                            required
                            v-model="selectedOrganType"
                            @change="onOrganTypeChange($event.target.value)"
                        >
                            <option value="">Select Organ</option>
                            <option value="heart">Heart</option>
                            <option value="kidney">Kidney</option>
                            <option value="liver">Liver</option>
                            <option value="lung">Lung</option>
                            <option value="pancreas">Pancreas</option>
                            <option value="cornea">Cornea</option>
                            <option value="skin">Skin</option>
                            <option value="bone">Bone Marrow</option>
                            <option value="other">Other (Specify)</option>
                        </select>
                        
                        <!-- Other Organ Input -->
                        <div v-if="showOtherOrganType" id="otherOrganTypeGroup" class="other-input-group">
                            <label for="otherOrganType" class="required">Specify Organ Type</label>
                            <input 
                                type="text" 
                                id="otherOrganType" 
                                v-model="otherOrganTypeValue"
                                placeholder="Enter specific organ type"
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conditional Section for Other -->
            <div v-if="selectedType === 'other'" id="otherSection" class="conditional-section">
                <h2 class="section-title">
                    <i class="fas fa-box"></i>
                    Other Item Details
                </h2>
                
                <div class="form-group">
                    <label for="otherType" class="required">Item Type</label>
                    <input 
                        type="text" 
                        id="otherType" 
                        v-model="selectedOtherType"
                        placeholder="Enter item type (e.g., Medical Equipment, Supplies, Accessories)"
                    >
                </div>
            </div>

            <!-- Quantity Section (Shows after type is selected) -->
            <div v-if="selectedType" id="quantitySection" class="form-section">
                <h2 class="section-title">
                    <i class="fas fa-hashtag"></i>
                    Step 2: Enter Quantity
                </h2>
                
                <div class="form-group">
                    <label for="quantity" class="required">Quantity</label>
                    <div class="quantity-input-group">
                        <input 
                            type="number" 
                            id="quantity" 
                            v-model.number="quantity"
                            min="0" 
                            step="1"
                            placeholder="Enter quantity"
                            required
                        >
                        <span class="unit-label" id="unitLabel">units</span>
                    </div>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ errorMessage }}
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
                <button type="button" class="btn-cancel" @click="resetForm">
                    Reset Form
                </button>
                <button type="button" class="btn-submit" @click="submitForm" :disabled="!selectedType">
                    Add to Inventory
                </button>
            </div>

            <!-- Success Message -->
            <div class="success-message" id="successMessage">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Inventory Added Successfully!</h3>
                <p id="successDetails">Your item has been added to the inventory system.</p>
                <button class="btn-submit">
                    Add Another Item
                </button>
            </div>
        </div>
    </div>
    </template>

    <script>
    export default {
  name: 'StockInventoryModal',
  data() {
    return {
      selectedType: '',
      selectedBloodType: '',
      selectedOrganType: '',
      selectedOtherType: '',
      otherBloodTypeValue: '',
      otherOrganTypeValue: '',
      quantity: null,
      showOtherBloodType: false,
      showOtherOrganType: false,
      errorMessage: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onTypeChange(type) {
      this.selectedType = type;
      this.selectedBloodType = '';
      this.selectedOrganType = '';
      this.selectedOtherType = '';
      this.quantity = null;
      this.showOtherBloodType = false;
      this.showOtherOrganType = false;
      this.errorMessage = '';
    },
    onBloodTypeChange(value) {
      this.selectedBloodType = value;
      this.showOtherBloodType = value === 'other';
      this.errorMessage = '';
    },
    onOrganTypeChange(value) {
      this.selectedOrganType = value;
      this.showOtherOrganType = value === 'other';
      this.errorMessage = '';
    },
    validateForm() {
      // Check if type is selected
      if (!this.selectedType) {
        this.errorMessage = 'Please select an inventory type';
        return false;
      }

      // Check based on type
      if (this.selectedType === 'blood') {
        if (!this.selectedBloodType) {
          this.errorMessage = 'Please select a blood type';
          return false;
        }
        if (this.selectedBloodType === 'other' && !this.otherBloodTypeValue.trim()) {
          this.errorMessage = 'Please specify the blood type';
          return false;
        }
      }

      if (this.selectedType === 'organ') {
        if (!this.selectedOrganType) {
          this.errorMessage = 'Please select an organ type';
          return false;
        }
        if (this.selectedOrganType === 'other' && !this.otherOrganTypeValue.trim()) {
          this.errorMessage = 'Please specify the organ type';
          return false;
        }
      }

      if (this.selectedType === 'other') {
        if (!this.selectedOtherType.trim()) {
          this.errorMessage = 'Please enter the item type';
          return false;
        }
      }

      // Check quantity
      if (!this.quantity || this.quantity <= 0) {
        this.errorMessage = 'Please enter a valid quantity (greater than 0)';
        return false;
      }

      return true;
    },
    submitForm() {
      if (this.validateForm()) {
        this.errorMessage = '';
        console.log('Form submitted:', {
          type: this.selectedType,
          bloodType: this.selectedBloodType,
          otherBloodType: this.otherBloodTypeValue,
          organType: this.selectedOrganType,
          otherOrganType: this.otherOrganTypeValue,
          otherType: this.selectedOtherType,
          quantity: this.quantity
        });
        // TODO: Send to API
        alert('Item added successfully!');
        this.resetForm();
      }
    },
    resetForm() {
      this.selectedType = '';
      this.selectedBloodType = '';
      this.selectedOrganType = '';
      this.selectedOtherType = '';
      this.otherBloodTypeValue = '';
      this.otherOrganTypeValue = '';
      this.quantity = null;
      this.showOtherBloodType = false;
      this.showOtherOrganType = false;
      this.errorMessage = '';
    }
  }
}
    </script>

    <style scoped>
    .container {
            max-width: 800px;
            width: 100%;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }

        /* Header */
        .form-header {
            background: linear-gradient(135deg, #d32f2f, #b71c1c);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .form-header h1 {
            font-size: 32px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .form-header p {
            font-size: 16px;
            opacity: 0.9;
            margin-top: 10px;
        }

        /* Form Content */
        .form-content {
            padding: 40px;
        }

        /* Section Styling */
        .form-section {
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 2px solid #f0f4f8;
        }

        .form-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .section-title {
            font-size: 20px;
            color: #2c3e50;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title i {
            color: #d32f2f;
            width: 30px;
            text-align: center;
        }

        /* Radio Group */
        .radio-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 10px;
        }

        .radio-option {
            position: relative;
        }

        .radio-option input[type="radio"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
        }

        .radio-label {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 3px solid #e0e0e0;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s;
            background: white;
            height: 100%;
        }

        .radio-label:hover {
            border-color: #d32f2f;
            background: #fff5f5;
            transform: translateY(-3px);
        }

        .radio-option input[type="radio"]:checked + .radio-label {
            border-color: #d32f2f;
            background: linear-gradient(135deg, #fff5f5, #ffebee);
            box-shadow: 0 10px 25px rgba(211, 47, 47, 0.15);
        }

        .radio-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: white;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .blood-icon {
            background: linear-gradient(135deg, #d32f2f, #ff6b6b);
        }

        .organ-icon {
            background: linear-gradient(135deg, #2e7d32, #4caf50);
        }

        .other-icon {
            background: linear-gradient(135deg, #1565c0, #2196f3);
        }

        .radio-content {
            flex: 1;
        }

        .radio-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .radio-description {
            font-size: 13px;
            color: #7f8c8d;
            line-height: 1.4;
        }

        /* Conditional Sections */
        .conditional-section {
            margin-top: 30px;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 4px solid #d32f2f;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Form Groups */
        .form-group {
            margin-bottom: 25px;
        }

        .form-group:last-child {
            margin-bottom: 0;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            color: #444;
            margin-bottom: 10px;
            font-size: 15px;
        }

        .form-group label.required::after {
            content: ' *';
            color: #d32f2f;
        }

        /* Select and Input Styling */
        select, input[type="text"], input[type="number"] {
            width: 100%;
            padding: 16px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s;
            background: white;
        }

        select:focus, input[type="text"]:focus, input[type="number"]:focus {
            outline: none;
            border-color: #d32f2f;
            box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
        }

        /* Select with dropdown arrow */
        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23666' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 20px center;
            padding-right: 50px;
        }

        /* Other Input Group */
        .other-input-group {
            margin-top: 20px;
            animation: fadeIn 0.3s ease;
        }

        /* Quantity Input Group */
        .quantity-input-group {
            position: relative;
            display: flex;
            align-items: center;
        }

        .quantity-input-group input {
            padding-right: 100px;
        }

        .unit-label {
            position: absolute;
            right: 20px;
            color: #666;
            font-weight: 500;
            font-size: 15px;
            background: #f8f9fa;
            padding: 5px 15px;
            border-radius: 8px;
            pointer-events: none;
            border: 2px solid #e0e0e0;
        }

        /* Form Actions */
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #e0e0e0;
        }

        .error-message {
            background: #ffebee;
            border: 2px solid #f44336;
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 25px;
            color: #c62828;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideDown 0.3s ease;
        }

        .error-message i {
            font-size: 20px;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .btn-cancel, .btn-submit {
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
            min-width: 150px;
        }

        .btn-cancel {
            background: #f5f5f5;
            color: #666;
            border: 2px solid #e0e0e0;
        }

        .btn-cancel:hover {
            background: #e0e0e0;
            transform: translateY(-2px);
        }

        .btn-submit {
            background: linear-gradient(135deg, #d32f2f, #b71c1c);
            color: white;
        }

        .btn-submit:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(211, 47, 47, 0.3);
        }

        .btn-submit:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Success Message */
        .success-message {
            text-align: center;
            padding: 40px;
            display: none;
        }

        .success-icon {
            font-size: 80px;
            color: #2e7d32;
            margin-bottom: 20px;
        }

        .success-message h3 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .success-message p {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                max-width: 95%;
            }
            
            .form-content {
                padding: 30px 20px;
            }
            
            .radio-group {
                grid-template-columns: 1fr;
            }
            
            .form-actions {
                flex-direction: column;
            }
            
            .btn-cancel, .btn-submit {
                width: 100%;
            }
            
            .conditional-section {
                padding: 20px;
            }
        }

        @media (max-width: 480px) {
            .form-header {
                padding: 25px 20px;
            }
            
            .form-header h1 {
                font-size: 26px;
            }
            
            .radio-label {
                padding: 15px;
            }
            
            .radio-icon {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
            
            select, input[type="text"], input[type="number"] {
                padding: 14px 16px;
                font-size: 15px;
            }
        }
    </style>