<template>
  <section class="menu-section">
    <div class="menu-header">
      <h2 class="section-title">MENU MANAGEMENT</h2>
    </div>

    <div class="search-bar-container">
      <input 
        v-model="searchQuery"
        type="text" 
        class="search-bar"
        placeholder="🔍 Search food items..."
      >
    </div>

    <div class="menu-stats">
      <div class="stat-mini">
        <span class="stat-mini-label">Total Items</span>
        <span class="stat-mini-value">{{ menuItems.length }}</span>
      </div>
      <div class="stat-mini">
        <span class="stat-mini-label">Low Stock</span>
        <span class="stat-mini-value">{{ lowStockCount }}</span>
      </div>
      <div class="stat-mini">
        <span class="stat-mini-label">Meals</span>
        <span class="stat-mini-value">{{ categoryCount('meals') }}</span>
      </div>
      <div class="stat-mini">
        <span class="stat-mini-label">Snacks</span>
        <span class="stat-mini-value">{{ categoryCount('snacks') }}</span>
      </div>
      <div class="stat-mini">
        <span class="stat-mini-label">Drinks</span>
        <span class="stat-mini-value">{{ categoryCount('drinks') }}</span>
      </div>
      <div class="stat-mini">
        <span class="stat-mini-label">Desserts</span>
        <span class="stat-mini-value">{{ categoryCount('desserts') }}</span>
      </div>
    </div>

    <div class="menu-grid">
      <button class="add-item-btn" @click="handleAddItem">
        <span class="add-icon">+</span>
        <span class="add-text">Add Menu</span>
      </button>
      <div v-for="item in filteredMenuItems" :key="item.id" class="menu-item-card">
        <div class="item-image-container">
          <img v-if="item.image" :src="item.image" :alt="item.name" class="item-image">
          <div v-else class="item-image-placeholder">
            📸 No Image
          </div>
        </div>

        <div class="item-header">
          <div class="item-meta">
            <h3 class="item-name">{{ item.name }}</h3>
            <span class="item-category">{{ item.category.toUpperCase() }}</span>
          </div>
          <button 
            class="availability-badge" 
            :class="{ 'available': item.available, 'unavailable': !item.available }"
            @click="toggleAvailability(item.id)"
            :title="item.available ? 'Click to mark as unavailable' : 'Click to mark as available'"
          >
            {{ item.available ? '✓ Available' : '✗ Unavailable' }}
          </button>
        </div>
        <div class="item-details">
          <div class="detail-row">
            <label>Price:</label>
            <span class="detail-value">₱{{ item.price }}</span>
          </div>
          <div class="detail-row">
            <label>Stock:</label>
            <span :class="['detail-value', { 'low-stock': item.stock < 20 }]">
              {{ item.stock }}
            </span>
          </div>
          <div class="detail-row">
            <label>Tag:</label>
            <span class="detail-value tag">{{ item.tag || 'Standard' }}</span>
          </div>
        </div>

        <div v-if="item.stock < 20" class="stock-warning">
          ⚠️ Low Stock
        </div>

        <div class="item-actions">
          <button class="btn-delete" @click="handleDeleteItem(item.id)" title="Delete this menu item">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Add New Menu Item</h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <form @submit.prevent="submitAddItem" class="modal-form">
          <div class="form-group">
            <label for="itemName">Item Name *</label>
            <input 
              id="itemName"
              v-model="newItem.name" 
              type="text" 
              placeholder="e.g., Pork Sisig"
              @input="handleNameInput"
              required
            >
          </div>
          <div class="form-group">
            <label for="itemPrice">Price (₱) *</label>
            <input 
              id="itemPrice"
              v-model.number="newItem.price" 
              type="number" 
              placeholder="e.g., 85"
              min="1"
              max="99999"
              @input="handlePriceInput"
              required
            >
          </div>
          <div class="form-group">
            <label for="itemCategory">Category *</label>
            <select id="itemCategory" v-model="newItem.category" required>
              <option value="">Select category</option>
              <option value="meals">Meals</option>
              <option value="snacks">Snacks</option>
              <option value="drinks">Drinks</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
          <div class="form-group">
            <label for="itemStock">Stock *</label>
            <input 
              id="itemStock"
              v-model.number="newItem.stock" 
              type="number" 
              placeholder="e.g., 50"
              min="1"
              max="99999"
              @input="handleStockInput"
              required
            >
          </div>
          <div class="form-group">
            <label for="itemTag">Tag</label>
            <input 
              id="itemTag"
              v-model="newItem.tag" 
              type="text" 
              placeholder="e.g., BESTSELLER"
              @input="handleTagInput"
            >
          </div>
          <div class="form-group">
            <label for="itemImage">Food Picture</label>
            <div class="image-upload-area">
              <input 
                id="itemImage"
                type="file" 
                accept="image/*"
                @change="handleImageUpload"
                class="image-input"
              >
              <label for="itemImage" class="image-upload-label">
                <span class="upload-icon">📸</span>
                <span class="upload-text">Click to select image</span>
              </label>
            </div>
            <div v-if="newItem.image" class="image-preview">
              <img :src="newItem.image" :alt="newItem.name || 'Preview'" class="preview-img">
              <button type="button" class="remove-image" @click="removeImage">Remove</button>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-submit">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'MenuManagement',
  props: {
    menuItems: Array
  },
  emits: ['edit-item', 'delete-item', 'add-item'],
  setup(props, { emit }) {
    const showAddModal = ref(false);
    const searchQuery = ref('');
    const newItem = ref({
      name: '',
      price: '',
      category: '',
      stock: '',
      tag: '',
      image: null,
      available: true
    });

    const lowStockCount = computed(() => {
      return props.menuItems.filter(item => item.stock < 20).length;
    });

    const categoryCount = (category) => {
      return props.menuItems.filter(item => item.category === category).length;
    };

    const filteredMenuItems = computed(() => {
      if (!searchQuery.value.trim()) {
        return props.menuItems;
      }
      return props.menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });

    const toggleAvailability = (itemId) => {
      const item = props.menuItems.find(i => i.id === itemId);
      if (item) {
        item.available = !item.available;
      }
    };

    const handleNameInput = (event) => {
      // Remove any digits from the input
      newItem.value.name = event.target.value.replace(/[0-9]/g, '');
    };

    const handlePriceInput = () => {
      // Limit to 5 digits maximum
      const priceStr = String(newItem.value.price).replace(/\D/g, ''); // Remove non-numeric characters
      if (priceStr.length > 5) {
        newItem.value.price = parseInt(priceStr.substring(0, 5));
      }
    };

    const handleStockInput = () => {
      // Limit to 5 digits maximum
      const stockStr = String(newItem.value.stock).replace(/\D/g, ''); // Remove non-numeric characters
      if (stockStr.length > 5) {
        newItem.value.stock = parseInt(stockStr.substring(0, 5));
      }
    };

    const handleTagInput = (event) => {
      // Remove any digits from the tag input
      newItem.value.tag = event.target.value.replace(/[0-9]/g, '');
    };

    const handleAddItem = () => {
      showAddModal.value = true;
    };

    const closeModal = () => {
      showAddModal.value = false;
      newItem.value = {
        name: '',
        price: '',
        category: '',
        stock: '',
        tag: '',
        image: null,
        available: true
      };
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newItem.value.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const removeImage = () => {
      newItem.value.image = null;
    };

    const submitAddItem = () => {
      if (newItem.value.name && newItem.value.price && newItem.value.category && newItem.value.stock) {
        emit('add-item', {
          name: newItem.value.name,
          price: parseInt(newItem.value.price),
          category: newItem.value.category,
          stock: parseInt(newItem.value.stock),
          tag: newItem.value.tag || null,
          available: true,
          image: newItem.value.image || null
        });
        closeModal();
      } else {
        alert('Please fill in all required fields');
      }
    };

    const handleDeleteItem = (itemId) => {
      emit('delete-item', itemId);
    };

    return {
      lowStockCount,
      categoryCount,
      filteredMenuItems,
      toggleAvailability,
      handleNameInput,
      handlePriceInput,
      handleStockInput,
      handleTagInput,
      handleAddItem,
      showAddModal,
      searchQuery,
      newItem,
      closeModal,
      submitAddItem,
      handleImageUpload,
      removeImage,
      handleDeleteItem
    };
  }
}
</script>

<style scoped>
.menu-section {
  flex: 1;
  padding: 40px;
  background: var(--cream);
  overflow-y: auto;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  border-bottom: 4px solid #2D5016;
  padding-bottom: 16px;
  background: transparent;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: #2D5016;
  letter-spacing: -2px;
  margin: 0;
  font-weight: 900;
}

.search-bar-container {
  margin-bottom: 24px;
}

.search-bar {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--charcoal);
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s;
  background: white;
}

.search-bar:focus {
  outline: none;
  border-color: var(--upang-green);
  box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
}

.search-bar::placeholder {
  color: var(--mid-gray);
}

.menu-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-mini {
  background: white;
  padding: 16px;
  border: 2px solid var(--charcoal);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-mini-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--mid-gray);
  text-transform: uppercase;
}

.stat-mini-value {
  font-family: 'Archivo Black', sans-serif;
  font-size: 28px;
  color: var(--upang-green);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.menu-item-card {
  background: white;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--upang-green);
}

.availability-badge {
  display: inline-block;
  padding: 6px 14px;
  border: 2px solid var(--charcoal);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.availability-badge.available {
  background: #4CAF50;
  color: white;
  border-color: #2E7D32;
}

.availability-badge.available:hover {
  background: #388E3C;
  transform: scale(1.05);
}

.availability-badge.unavailable {
  background: #F44336;
  color: white;
  border-color: #C62828;
}

.availability-badge.unavailable:hover {
  background: #D32F2F;
  transform: scale(1.05);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.item-emoji {
  font-size: 32px;
}

.item-image-container {
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--light-gray);
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-image-placeholder {
  font-size: 14px;
  color: var(--mid-gray);
  text-align: center;
}

.item-meta {
  flex: 1;
}

.item-name {
  font-family: 'Archivo Black', sans-serif;
  font-size: 18px;
  color: var(--upang-green);
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.item-category {
  display: inline-block;
  background: var(--upang-gold);
  color: var(--upang-dark-green);
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.item-details {
  background: var(--cream);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
}

.detail-row label {
  font-weight: 600;
  color: var(--mid-gray);
}

.detail-value {
  color: var(--charcoal);
  font-weight: 600;
}

.detail-value.low-stock {
  color: #FF6B6B;
  font-weight: 700;
}

.detail-value.tag {
  background: var(--upang-gold);
  color: var(--upang-dark-green);
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 10px;
  border: 2px solid var(--charcoal);
  background: transparent;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: rgba(45, 80, 22, 0.1);
  border-color: var(--upang-green);
}

.btn-delete:hover {
  background: rgba(244, 67, 54, 0.1);
  border-color: #F44336;
}

.stock-warning {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FF6B6B;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
}

.item-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--light-gray);
}

.btn-delete {
  flex: 1;
  padding: 10px;
  border: 2px solid #F44336;
  background: rgba(244, 67, 54, 0.05);
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: #F44336;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-delete:hover {
  background: rgba(244, 67, 54, 0.15);
  border-color: #D32F2F;
  transform: translateY(-2px);
}

.btn-delete:active {
  transform: translateY(0);
}

.add-item-btn {
  background: white;
  border: 3px dashed var(--upang-green);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 300px;
  font-family: 'Archivo Black', sans-serif;
  font-weight: 900;
}

.add-item-btn:hover {
  background: rgba(45, 80, 22, 0.05);
  border-color: var(--upang-dark-green);
  transform: scale(1.02);
}

.add-icon {
  font-size: 48px;
  color: var(--upang-green);
  font-weight: 900;
  line-height: 1;
}

.add-text {
  font-size: 16px;
  color: var(--upang-green);
  letter-spacing: -0.5px;
  text-align: center;
}

/* Modal Styles */
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
  z-index: 2000;
}

.modal-content {
  background: white;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--light-gray);
}

.modal-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
  color: var(--upang-green);
  margin: 0;
  letter-spacing: -0.5px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--mid-gray);
  transition: color 0.2s;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--charcoal);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: var(--charcoal);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select {
  padding: 10px 12px;
  border: 2px solid var(--light-gray);
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--upang-green);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 12px;
  border: 2px solid var(--charcoal);
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-cancel {
  background: transparent;
  color: var(--charcoal);
}

.btn-cancel:hover {
  background: var(--cream);
  border-color: var(--mid-gray);
}

.btn-submit {
  background: var(--upang-green);
  color: white;
  border-color: var(--upang-green);
}

.btn-submit:hover {
  background: var(--upang-dark-green);
  border-color: var(--upang-dark-green);
  transform: translateY(-2px);
}

.image-input {
  display: none;
}

.image-upload-area {
  position: relative;
}

.image-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 2px dashed var(--upang-green);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(45, 80, 22, 0.02);
}

.image-upload-label:hover {
  background: rgba(45, 80, 22, 0.05);
  border-color: var(--upang-dark-green);
}

.upload-icon {
  font-size: 32px;
}

.upload-text {
  font-size: 13px;
  color: var(--upang-green);
  font-weight: 600;
  text-align: center;
}

.image-preview {
  margin-top: 12px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid var(--upang-green);
}

.preview-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.remove-image {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(244, 67, 54, 0.9);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-image:hover {
  background: #F44336;
  transform: scale(1.05);
}

@media (max-width: 1200px) {
  .menu-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .menu-section {
    padding: 20px;
  }

  .menu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .menu-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
