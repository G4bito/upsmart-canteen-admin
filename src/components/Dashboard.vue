<template>
  <section class="dashboard-section">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2 class="section-title">ADMIN DASHBOARD</h2>
        <p class="date-display">{{ currentDate }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-label">Total Orders</h3>
            <span class="stat-emoji" aria-hidden="true">🛒</span>
          </div>
          <p class="stat-value">{{ stats.totalOrders }}</p>
          <p class="stat-subtext">Today's orders</p>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-label">Completed</h3>
            <span class="stat-emoji" aria-hidden="true">✅</span>
          </div>
          <p class="stat-value">{{ stats.completed }}</p>
          <p class="stat-subtext">Ready & picked up</p>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-label">In Progress</h3>
            <span class="stat-emoji" aria-hidden="true">⏳</span>
          </div>
          <p class="stat-value">{{ stats.preparing }}</p>
          <p class="stat-subtext">Pending & preparing</p>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-label">Today's Revenue</h3>
            <span class="stat-emoji" aria-hidden="true">💰</span>
          </div>
          <p class="stat-value">₱{{ stats.totalRevenue }}</p>
          <p class="stat-subtext">Avg: ₱{{ stats.avgOrderValue }}/order</p>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="section-card">
          <h3 class="section-card-title">Recent Orders</h3>
          <div class="orders-list">
            <div v-for="order in recentOrders" :key="order.id" class="order-item">
              <div class="order-info">
                <div class="order-id">{{ order.id }}</div>
                <div class="order-details">
                  <p class="student-name">{{ order.student }}</p>
                  <p class="order-items">{{ order.items.map(i => i.name).join(' + ') }}</p>
                  <p class="order-time">{{ order.time }}</p>
                </div>
              </div>
              <div class="order-amount">
                <span class="amount-value">₱{{ order.total }}</span>
                <span :class="['status-badge', order.status]">{{ formatStatus(order.status) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-card-title">Top Selling Items</h3>
          <div class="items-list">
            <div v-for="(item, index) in topItems" :key="index" class="item-row">
              <div class="item-rank">{{ index + 1 }}</div>
              <div class="item-name">{{ item.name }}</div>
              <div class="item-qty">{{ item.qty }} orders</div>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h3 class="quick-actions-title">Quick Actions</h3>
        <div class="actions-grid">
          <button class="action-btn action-orders"><span class="action-emoji">🛒</span> View All Orders</button>
          <button class="action-btn action-menu"><span class="action-emoji">🍽️</span> Manage Menu</button>
          <button class="action-btn action-stock"><span class="action-emoji">📦</span> Check Inventory</button>
          <button class="action-btn action-settings"><span class="action-emoji">⚙️</span> Settings</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Dashboard',
  props: {
    stats: Object,
    recentOrders: Array,
    topItems: Array
  },
  setup() {
    const currentDate = computed(() => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString('en-US', options);
    });

    const formatStatus = (status) => {
      const statusMap = {
        'pending': 'PENDING',
        'preparing': 'PREPARING',
        'ready': 'READY',
        'completed': 'COMPLETED',
        'cancelled': 'CANCELLED'
      };
      return statusMap[status] || status;
    };

    return {
      currentDate,
      formatStatus
    };
  }
}
</script>

<style scoped>
.dashboard-section {
  flex: 1;
  padding: 40px;
  background: var(--cream);
  overflow-y: auto;
}

.dashboard-container {
  max-width: 1600px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 32px;
  border-bottom: 4px solid var(--upang-green);
  padding-bottom: 16px;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: var(--upang-green);
  letter-spacing: -2px;
  line-height: 1;
  margin: 0 0 8px 0;
}

.date-display {
  color: var(--mid-gray);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 32px;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--upang-green);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-label {
  font-size: 14px;
  color: var(--mid-gray);
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-emoji {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: var(--upang-green);
  letter-spacing: -1px;
  margin: 0 0 8px 0;
}

.stat-subtext {
  font-size: 13px;
  color: var(--mid-gray);
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

.section-card {
  background: white;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  padding: 24px;
}

.section-card-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 19px;
  color: var(--upang-green);
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  background: var(--cream);
  padding: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid var(--upang-green);
}

.order-info {
  display: flex;
  gap: 12px;
  flex: 1;
}

.order-id {
  font-weight: 800;
  color: var(--upang-green);
  min-width: 90px;
  font-size: 13px;
}

.order-details {
  flex: 1;
}

.student-name {
  font-weight: 600;
  color: var(--charcoal);
  margin: 0 0 4px 0;
  font-size: 14px;
}

.order-items {
  color: var(--mid-gray);
  font-size: 12px;
  margin: 0 0 4px 0;
}

.order-time {
  color: var(--mid-gray);
  font-size: 11px;
  margin: 0;
}

.order-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.amount-value {
  font-family: 'Archivo Black', sans-serif;
  font-size: 18px;
  color: var(--charcoal);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #FF9800;
}

.status-badge.preparing {
  background: rgba(156, 39, 176, 0.2);
  color: #9C27B0;
}

.status-badge.ready {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.status-badge.completed {
  background: rgba(33, 150, 243, 0.2);
  color: #2196F3;
}

.status-badge.cancelled {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-row {
  display: grid;
  grid-template-columns: 40px 1fr 80px;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--cream);
  border-radius: 6px;
  border-bottom: 2px solid var(--upang-gold);
}

.item-row:last-child {
  border-bottom: none;
}

.item-rank {
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
  color: var(--upang-green);
  text-align: center;
}

.item-name {
  font-weight: 600;
  color: var(--charcoal);
  font-size: 13px;
}

.item-qty {
  font-size: 12px;
  color: var(--mid-gray);
  text-align: right;
}

.quick-actions {
  background: white;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  padding: 24px;
}

.quick-actions-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 19px;
  color: var(--upang-green);
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.action-btn {
  padding: 16px;
  border: 2px solid var(--charcoal);
  background: transparent;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-emoji {
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  transform: translateY(-3px);
}

.action-orders:hover {
  background: rgba(45, 80, 22, 0.1);
  border-color: var(--upang-green);
}

.action-menu:hover {
  background: rgba(200, 169, 97, 0.1);
  border-color: var(--upang-gold);
}

.action-stock:hover {
  background: rgba(76, 175, 80, 0.1);
  border-color: #4CAF50;
}

.action-settings:hover {
  background: rgba(33, 150, 243, 0.1);
  border-color: #2196F3;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .dashboard-section {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
