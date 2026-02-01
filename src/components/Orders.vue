<template>
  <section class="orders-section">
    <div class="orders-container">
      <div class="orders-header">
        <h2 class="section-title">ORDERS MANAGEMENT</h2>
        <p class="static-notice">📌 Dashboard</p>
      </div>

      <div class="orders-stats">
        <div class="stat-mini">
          <span class="stat-mini-label">Pending</span>
          <span class="stat-mini-value">{{ pendingCount }}</span>
        </div>
        <div class="stat-mini">
          <span class="stat-mini-label">Preparing</span>
          <span class="stat-mini-value">{{ preparingCount }}</span>
        </div>
        <div class="stat-mini">
          <span class="stat-mini-label">Ready</span>
          <span class="stat-mini-value">{{ readyCount }}</span>
        </div>
        <div class="stat-mini">
          <span class="stat-mini-label">Completed</span>
          <span class="stat-mini-value">{{ completedCount }}</span>
        </div>
      </div>
      
      <div class="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Teacher</th>
              <th>Teacher ID</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id" :class="['order-row', order.status]">
              <td class="order-id-cell">{{ order.id }}</td>
              <td>{{ order.teacher }}</td>
              <td class="teacher-id">{{ order.teacherId }}</td>
              <td class="items-cell">
                <div v-for="item in order.items" :key="item.name" class="item-badge">
                  {{ item.name }} x{{ item.qty }}
                </div>
              </td>
              <td class="amount-cell">₱{{ order.total }}</td>
              <td>{{ order.time }}</td>
              <td>
                <span :class="['status-badge', order.status]">
                  {{ order.status.toUpperCase() }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-view" disabled title="Disabled in static view">View</button>
                <button class="btn-cancel" disabled title="Disabled in static view">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filteredOrders.length === 0" class="empty-state">
          <p>No orders found</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Orders',
  props: {
    orders: Array
  },
  emits: ['update-status', 'cancel-order'],
  setup(props, { emit }) {
    const searchQuery = ref('');
    const filterStatus = ref('all');

    const filteredOrders = computed(() => {

      if (!props.orders) return [];
      return props.orders.filter(o => {
        if (filterStatus.value !== 'all' && o.status !== filterStatus.value) return false;
        if (searchQuery.value && !o.teacher.toLowerCase().includes(searchQuery.value.toLowerCase())) return false;
        return true;
      });
    });

    const pendingCount = computed(() => props.orders.filter(o => o.status === 'pending').length);
    const preparingCount = computed(() => props.orders.filter(o => o.status === 'preparing').length);
    const readyCount = computed(() => props.orders.filter(o => o.status === 'ready').length);
    const completedCount = computed(() => props.orders.filter(o => o.status === 'completed').length);

    const updateStatus = (orderId, newStatus) => {
   
    };

    const cancelOrderConfirm = (orderId) => {
     
    };

    const viewDetails = (order) => {
      
    };

    return {
      searchQuery,
      filterStatus,
      filteredOrders,
      pendingCount,
      preparingCount,
      readyCount,
      completedCount,
      updateStatus,
      cancelOrderConfirm,
      viewDetails
    };
  }
}
</script>

<style scoped>
.orders-section {
  flex: 1;
  padding: 40px;
  background: var(--cream);
  overflow-y: auto;
}

.orders-container {
  max-width: 1600px;
  margin: 0 auto;
}

.orders-header {
  margin-bottom: 32px;
  border-bottom: 4px solid var(--upang-green);
  padding-bottom: 16px;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: var(--upang-green);
  letter-spacing: -2px;
  margin: 0 0 16px 0;
}

.filters {
  display: flex;
  gap: 16px;
}

.search-input,
.filter-select {
  padding: 12px 16px;
  border: 2px solid var(--charcoal);
  border-radius: 4px;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--upang-green);
  background: rgba(45, 80, 22, 0.05);
}

.orders-stats {
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

.orders-table {
  background: white;
  border: 3px solid var(--charcoal);
  border-radius: 8px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--charcoal);
  color: white;
}

th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 13px;
  text-transform: uppercase;
}

td {
  padding: 16px;
  border-bottom: 1px solid var(--cream);
  font-size: 13px;
}

tbody tr:hover {
  background: rgba(200, 169, 97, 0.05);
}

.order-row.completed {
  opacity: 0.7;
}

.order-row.cancelled {
  opacity: 0.5;
}

.order-id-cell {
  font-weight: 700;
  color: var(--upang-green);
}

.teacher-id {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--mid-gray);
}

.items-cell {
  max-width: 250px;
}

.item-badge {
  display: inline-block;
  background: var(--cream);
  padding: 4px 8px;
  border-radius: 3px;
  margin: 2px;
  font-size: 12px;
  border-left: 3px solid var(--upang-gold);
}

.amount-cell {
  font-weight: 700;
  color: var(--charcoal);
}

.status-select {
  padding: 6px 8px;
  border: 2px solid var(--charcoal);
  border-radius: 4px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

.status-select.pending {
  background: rgba(255, 193, 7, 0.15);
  border-color: #FF9800;
  color: #FF9800;
}

.status-select.preparing {
  background: rgba(156, 39, 176, 0.15);
  border-color: #9C27B0;
  color: #9C27B0;
}

.status-select.ready {
  background: rgba(76, 175, 80, 0.15);
  border-color: #4CAF50;
  color: #4CAF50;
}

.status-select.completed {
  background: rgba(33, 150, 243, 0.15);
  border-color: #2196F3;
  color: #2196F3;
}

.status-select.cancelled {
  background: rgba(244, 67, 54, 0.15);
  border-color: #F44336;
  color: #F44336;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-view,
.btn-cancel {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view {
  background: var(--upang-green);
  color: white;
}

.btn-view:hover {
  background: var(--upang-dark-green);
}

.btn-cancel {
  background: #F44336;
  color: white;
}

.btn-cancel:hover {
  background: #D32F2F;
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: var(--mid-gray);
  font-weight: 600;
}

@media (max-width: 1200px) {
  .orders-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  table {
    font-size: 12px;
  }

  th, td {
    padding: 12px;
  }
}

@media (max-width: 768px) {
  .orders-section {
    padding: 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .orders-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .stat-mini {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 12px;
  }

  .actions-cell {
    flex-direction: column;
    gap: 4px;
  }

  .btn-view,
  .btn-cancel {
    width: 100%;
  }
}
</style>
