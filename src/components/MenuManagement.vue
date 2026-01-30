<template>
  <section class="menu-section">
    <div class="menu-header">
      <h2 class="section-title">MENU MANAGEMENT</h2>
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
        <span class="stat-mini-label">Snacks & Drinks</span>
        <span class="stat-mini-value">{{ categoryCount('snacks') + categoryCount('drinks') }}</span>
      </div>
    </div>

    <div class="menu-grid">
      <div v-for="item in menuItems" :key="item.id" class="menu-item-card">
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
        </div>

        <div class="item-details">
          <div class="detail-row">
            <label>Price:</label>
            <span class="detail-value">₱{{ item.price }}</span>
          </div>
          <div class="detail-row">
            <label>Stock:</label>
            <span :class="['detail-value', { 'low-stock': item.stock < 20 }]">
              {{ item.stock }} units
            </span>
          </div>
          <div class="detail-row">
            <label>Tag:</label>
            <span class="detail-value tag">{{ item.tag || 'Standard' }}</span>
          </div>
        </div>


        <div v-if="item.stock < 20" class="stock-warning">
          ⚠️ Low Stock Alert
        </div>
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
    const lowStockCount = computed(() => {
      return props.menuItems.filter(item => item.stock < 20).length;
    });

    const categoryCount = (category) => {
      return props.menuItems.filter(item => item.category === category).length;
    };

    return {
      lowStockCount,
      categoryCount
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
  border-bottom: 4px solid var(--upang-green);
  padding-bottom: 16px;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: var(--upang-green);
  letter-spacing: -2px;
  margin: 0;
}

.btn-add-item {
  background: var(--upang-green);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-item:hover {
  background: var(--upang-dark-green);
  transform: translateY(-2px);
}

.add-item-form {
  background: white;
  border: 3px solid var(--charcoal);
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.add-item-form h3 {
  margin: 0 0 16px 0;
  color: var(--upang-green);
  font-family: 'Archivo Black', sans-serif;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.add-item-form input,
.add-item-form select {
  padding: 12px;
  border: 2px solid var(--charcoal);
  border-radius: 4px;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
}

.add-item-form input:focus,
.add-item-form select:focus {
  outline: none;
  border-color: var(--upang-green);
  background: rgba(45, 80, 22, 0.05);
}

.form-buttons {
  display: flex;
  gap: 12px;
}

.btn-submit {
  background: var(--upang-green);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-submit:hover {
  background: var(--upang-dark-green);
}

.btn-cancel {
  background: transparent;
  border: 2px solid var(--charcoal);
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: var(--cream);
}

.menu-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
}

.menu-item-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--upang-green);
}

.item-header {
  display: block;
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
