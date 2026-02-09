<template>
    <div class="container">

        <div class="form-header">
            <h1>{{ modalTitle }}</h1>
        </div>

        <div class="form-content">
            <div class="form-section">
                <h2 class="section-title">
                    <span class="step-number">1</span>
                    Select Inventory Type
                </h2>

                <div class="radio-group">
                    <div class="radio-option">
                        <input type="radio" id="typeBlood" value="blood" v-model="selectedType" @change="onTypeChange">
                        <label for="typeBlood">
                            <i class="fas fa-tint"></i>
                            <span>Blood</span>
                        </label>
                    </div>

                    <div class="radio-option">
                        <input type="radio" id="typeOrgan" value="organ" v-model="selectedType" @change="onTypeChange">
                        <label for="typeOrgan">
                            <i class="fas fa-heart"></i>
                            <span>Organ</span>
                        </label>
                    </div>

                    <div class="radio-option">
                        <input type="radio" id="typeOther" value="other" v-model="selectedType" @change="onTypeChange">
                        <label for="typeOther">
                            <i class="fas fa-box"></i>
                            <span>Other</span>
                        </label>
                    </div>
                </div>
            </div>

            <div v-if="selectedType === 'blood'" class="form-section">
                <h2 class="section-title">
                    <span class="step-number">2</span>
                    Blood Details
                </h2>

                <div class="input-row">
                    <div class="form-group">
                        <label for="bloodType" class="required">Blood Type</label>
                        <select id="bloodType" v-model="selectedBloodType"
                            @change="onBloodTypeChange($event.target.value)">
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div v-if="showOtherBloodType" class="form-group">
                        <label for="otherBloodType" class="required">Specify Type</label>
                        <input type="text" id="otherBloodType" v-model="otherBloodTypeValue"
                            placeholder="Enter blood type">
                    </div>

                    <div class="form-group">
                        <label for="quantity" class="required">Quantity</label>
                        <div class="quantity-input">
                            <input type="number" id="quantity" v-model.number="quantity" min="1" step="1"
                                placeholder="0">
                            <span class="unit">units</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="selectedType === 'organ'" class="form-section">
                <h2 class="section-title">
                    <span class="step-number">2</span>
                    Organ Details
                </h2>

                <div class="input-row">
                    <div class="form-group">
                        <label for="organType" class="required">Organ Name</label>
                        <select id="organType" v-model="selectedOrganType"
                            @change="onOrganTypeChange($event.target.value)">
                            <option value="">Select Organ</option>
                            <option value="heart">Heart</option>
                            <option value="kidney">Kidney</option>
                            <option value="liver">Liver</option>
                            <option value="lung">Lung</option>
                            <option value="pancreas">Pancreas</option>
                            <option value="cornea">Cornea</option>
                            <option value="skin">Skin</option>
                            <option value="bone">Bone Marrow</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div v-if="showOtherOrganType" class="form-group">
                        <label for="otherOrganType" class="required">Specify Organ</label>
                        <input type="text" id="otherOrganType" v-model="otherOrganTypeValue"
                            placeholder="Enter organ name">
                    </div>

                    <div class="form-group">
                        <label for="quantity" class="required">Quantity</label>
                        <div class="quantity-input">
                            <input type="number" id="quantity" v-model.number="quantity" min="1" step="1"
                                placeholder="0">
                            <span class="unit">units</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="selectedType === 'other'" class="form-section">
                <h2 class="section-title">
                    <span class="step-number">2</span>
                    Item Details
                </h2>

                <div class="input-row">
                    <div class="form-group">
                        <label for="otherType" class="required">Item Type</label>
                        <input type="text" id="otherType" v-model="selectedOtherType" placeholder="Enter item type">
                    </div>

                    <div class="form-group">
                        <label for="quantity" class="required">Quantity</label>
                        <div class="quantity-input">
                            <input type="number" id="quantity" v-model.number="quantity" min="1" step="1"
                                placeholder="0">
                            <span class="unit">units</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="errorMessage" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <span>{{ errorMessage }}</span>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-submit" @click="submitForm" :disabled="!isFormValid">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { createStockInventory } from '@/services/auth';
import api from '@/services/api';

export default {
    name: 'StockInventoryModal',

    props: {
        initialItem: {
            type: Object,
            default: null
        }
    },

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
            errorMessage: '',
            modalTitle: 'Add New Item',
            editingId: null
        }
    },
    computed: {
        form() {
            let itemType = '';

            if (this.selectedType === 'blood') {
                itemType = this.selectedBloodType === 'other'
                    ? this.otherBloodTypeValue
                    : this.selectedBloodType;
            } else if (this.selectedType === 'organ') {
                itemType = this.selectedOrganType === 'other'
                    ? this.otherOrganTypeValue
                    : this.selectedOrganType;
            } else if (this.selectedType === 'other') {
                itemType = this.selectedOtherType;
            }

            return {
                inventoryType: this.selectedType,
                itemType: itemType,
                quantity: this.quantity
            };
        },

        isFormValid() {
            if (!this.selectedType) return false;
            if (!this.quantity || this.quantity < 1) return false;

            if (this.selectedType === 'blood') {
                if (!this.selectedBloodType) return false;
                if (this.selectedBloodType === 'other' && !this.otherBloodTypeValue.trim()) return false;
            } else if (this.selectedType === 'organ') {
                if (!this.selectedOrganType) return false;
                if (this.selectedOrganType === 'other' && !this.otherOrganTypeValue.trim()) return false;
            } else if (this.selectedType === 'other') {
                if (!this.selectedOtherType.trim()) return false;
            }

            return true;
        }
    },

    watch: {
        initialItem: {
            immediate: true,
            handler(item) {
                if (!item) {
                    this.resetForm();
                    return;
                }

                this.editingId = item.id || null;
                this.quantity = item.quantity || null;
                this.selectedType = item.inventoryType;
                this.modalTitle = 'Edit Item';

                if (this.selectedType === 'blood') {
                    const knownBlood = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
                    if (knownBlood.includes(item.itemType)) {
                        this.selectedBloodType = item.itemType;
                        this.showOtherBloodType = false;
                    } else {
                        this.selectedBloodType = 'other';
                        this.showOtherBloodType = true;
                        this.otherBloodTypeValue = item.itemType;
                    }
                } else if (this.selectedType === 'organ') {
                    const knownOrgans = ['heart', 'kidney', 'liver', 'lung', 'pancreas', 'cornea', 'skin', 'bone'];
                    if (knownOrgans.includes(item.itemType)) {
                        this.selectedOrganType = item.itemType;
                        this.showOtherOrganType = false;
                    } else {
                        this.selectedOrganType = 'other';
                        this.showOtherOrganType = true;
                        this.otherOrganTypeValue = item.itemType;
                    }
                } else if (this.selectedType === 'other') {
                    this.selectedOtherType = item.itemType || '';
                }
            }
        }
    },

    methods: {
        onTypeChange() {
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
            if (!this.selectedType) {
                this.errorMessage = 'Please select an inventory type';
                return false;
            }

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

            if (!this.quantity || this.quantity <= 0) {
                this.errorMessage = 'Please enter a valid quantity (greater than 0)';
                return false;
            }

            return true;
        },

        async submitForm() {
            if (!this.validateForm()) return false;

            const payload = {
                ...this.form,
                createdAt: new Date().toISOString()
            };

            try {
                let result;
                if (this.editingId) {
                    const resp = await api.put(`stockInventory/${this.editingId}`, payload);
                    result = resp.data;
                    this.$toast.success("Stock Details Updated Successfully");
                } else {
                    result = await createStockInventory(payload);
                    this.$toast.success("Stock Details Added Successfully");
                }

                this.$emit('inventory-added', result);
                this.resetForm();
                return result;
            } catch (error) {
                this.$toast.error(error.message);
                return false;
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
            this.modalTitle = 'Add New Item';
            this.editingId = null;
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
    width: 100%;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-header {
    background: #dc3545;
    color: white;
    padding: 20px 24px;
}

.form-header h1 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
}

.form-header p {
    margin: 8px 0 0 0;
    opacity: 0.9;
    font-size: 0.9rem;
}

.form-content {
    padding: 24px;
}

.form-section {
    margin-bottom: 24px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 16px 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
}

.step-number {
    background: #dc3545;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
}

.radio-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.radio-option {
    flex: 1;
    min-width: 120px;
}

.radio-option input[type="radio"] {
    display: none;
}

.radio-option label {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
    text-align: center;
    min-height: 100px;
}

.radio-option label:hover {
    border-color: #adb5bd;
}

.radio-option input[type="radio"]:checked+label {
    border-color: #dc3545;
    background: #fff5f5;
}

.radio-option label i {
    font-size: 1.5rem;
    margin-bottom: 8px;
    color: #666;
}

.radio-option input[type="radio"]:checked+label i {
    color: #dc3545;
}

.radio-option label span {
    font-weight: 500;
    color: #333;
}

.input-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    align-items: end;
}

.form-group {
    flex: 1;
    min-width: 0;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #495057;
    font-size: 0.9rem;
    text-align: left;
}

.form-group label.required::after {
    content: ' *';
    color: #dc3545;
}

select,
input[type="text"],
input[type="number"] {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: border-color 0.2s;
    box-sizing: border-box;
}

select:focus,
input[type="text"]:focus,
input[type="number"]:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    background-color: white;
}

.quantity-input {
    position: relative;
}

.quantity-input input {
    padding-right: 50px;
}

.unit {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    font-size: 0.85rem;
    pointer-events: none;
}

.error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 10px 14px;
    border-radius: 4px;
    margin: 16px 0;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #f5c6cb;
}

.error-message i {
    font-size: 0.9rem;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
}

.btn-submit {
    padding: 8px 20px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
    min-width: 100px;
}
</style>