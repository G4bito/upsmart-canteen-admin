<template>
  <div class="App" :class="{ 'admin-mode': isAdminLoggedIn }">
    <!-- Login Page -->
    <Login v-if="!isLoggedIn && !isAdminLoggedIn" @login="handleLogin" @admin-login="handleAdminLogin" />

    <!-- Admin Dashboard (React Component) -->
    <AdminAppWrapper v-else-if="isAdminLoggedIn" @logout="handleAdminLogout" />

    <!-- Regular User Dashboard -->
    <template v-else>
      <TopBar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <div class="admin-layout">
        <Sidebar 
          :activeMenu="activeMenu" 
          :isOpen="sidebarOpen"
          @change-menu="activeMenu = $event"
        />
        <main :class="['admin-content', { 'sidebar-open': sidebarOpen }]">
          <Header @logout="handleLogout" />
          <Dashboard 
            v-if="activeMenu === 'dashboard'"
            :stats="dashboardStats"
            :recent-orders="recentOrders"
            :top-items="topItems"
            @navigate="activeMenu = $event"
          />
          <Orders 
            v-if="activeMenu === 'orders'"
            :orders="allOrders"
            @update-status="updateOrderStatus"
            @cancel-order="cancelOrder"
          />
          <MenuManagement 
            v-if="activeMenu === 'menu'"
            :menu-items="menuItems"
            @edit-item="editMenuItem"
            @delete-item="deleteMenuItem"
            @add-item="addMenuItem"
          />
          <Analytics v-if="activeMenu === 'analytics'" :stats="null" />
          <Settings v-if="activeMenu === 'settings'" @save-settings="saveSettings" />
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AdminAppWrapper from './components/AdminAppWrapper.vue'
import Login from './components/Login.vue'
import TopBar from './components/TopBar.vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'
import MenuManagement from './components/MenuManagement.vue'
import Orders from './components/Orders.vue'
import Analytics from './components/Analytics.vue'
import Settings from './components/Settings.vue'

export default {
  components: {
    AdminAppWrapper,
    Login,
    TopBar,
    Header,
    Sidebar,
    Dashboard,
    MenuManagement,
    Orders,
    Analytics,
    Settings
  },
  setup() {
    const isLoggedIn = ref(false);
    const isAdminLoggedIn = ref(false);
    const activeMenu = ref('dashboard');
    const sidebarOpen = ref(true);

    const menuItems = ref([
      { id: 1, name: 'PORK SISIG', price: 85, category: 'meals', stock: 45, emoji: '🍲', tag: 'BESTSELLER', stall: 'Filipino Cuisine', available: true },
      { id: 2, name: 'ADOBO MEAL', price: 70, category: 'meals', stock: 32, emoji: '🍗', tag: null, stall: 'Filipino Cuisine', available: true },
      { id: 3, name: 'BEEF TAPA', price: 95, category: 'meals', stock: 28, emoji: '🥩', tag: 'NEW', stall: 'Filipino Cuisine', available: true },
      { id: 4, name: 'PALABOK', price: 60, category: 'meals', stock: 40, emoji: '🍜', tag: null, stall: 'Filipino Cuisine', available: true },
      { id: 5, name: 'CLUBHOUSE', price: 75, category: 'snacks', stock: 35, emoji: '🥪', tag: 'POPULAR', stall: 'Sandwich Bar', available: true },
      { id: 6, name: 'BUKO JUICE', price: 35, category: 'drinks', stock: 50, emoji: '🥥', tag: null, stall: 'Beverage Station', available: true },
      { id: 7, name: 'PANCIT CANTON', price: 55, category: 'meals', stock: 38, emoji: '🍝', tag: null, stall: 'Noodle Stall', available: true },
      { id: 8, name: 'LUMPIA', price: 40, category: 'snacks', stock: 42, emoji: '🥟', tag: null, stall: 'Filipino Cuisine', available: true },
      { id: 9, name: 'HALO-HALO', price: 50, category: 'snacks', stock: 55, emoji: '🍧', tag: 'POPULAR', stall: 'Dessert Corner', available: true }
    ]);

    const allOrders = ref([
      { id: '#ORD-001', teacher: 'Juan De La Cruz', teacherId: '2024-001234', items: [{ name: 'PORK SISIG', qty: 1, price: 85 }], total: 85, status: 'completed', time: '11:30 AM', date: '2026-01-30' },
      { id: '#ORD-002', teacher: 'Maria Santos', teacherId: '2024-005678', items: [{ name: 'BEEF TAPA', qty: 1, price: 95 }, { name: 'BUKO JUICE', qty: 2, price: 35 }], total: 165, status: 'ready', time: '11:45 AM', date: '2026-01-30' },
      { id: '#ORD-003', teacher: 'Carlos Reyes', teacherId: '2024-009012', items: [{ name: 'CLUBHOUSE', qty: 1, price: 75 }], total: 75, status: 'preparing', time: '12:00 PM', date: '2026-01-30' },
      { id: '#ORD-004', teacher: 'Ana Cruz', teacherId: '2024-003456', items: [{ name: 'PANCIT CANTON', qty: 2, price: 55 }, { name: 'LUMPIA', qty: 1, price: 40 }], total: 150, status: 'pending', time: '12:05 PM', date: '2026-01-30' },
      { id: '#ORD-005', teacher: 'Pedro Gomez', teacherId: '2024-007890', items: [{ name: 'HALO-HALO', qty: 3, price: 50 }], total: 150, status: 'pending', time: '12:08 PM', date: '2026-01-30' },
      { id: '#ORD-006', teacher: 'Sofia Torres', teacherId: '2024-002345', items: [{ name: 'ADOBO MEAL', qty: 1, price: 70 }, { name: 'BUKO JUICE', qty: 1, price: 35 }], total: 105, status: 'ready', time: '12:10 PM', date: '2026-01-30' }
    ]);

    const dashboardStats = computed(() => {
      const today = allOrders.value.filter(o => o.date === '2026-01-30');
      const completed = today.filter(o => o.status === 'completed').length;
      const preparing = today.filter(o => o.status === 'preparing' || o.status === 'pending').length;
      const totalRevenue = today.reduce((sum, o) => sum + o.total, 0);
      const topItem = 'PORK SISIG (BESTSELLER)';
      
      return {
        totalOrders: today.length,
        completed,
        preparing,
        totalRevenue,
        topItem,
        avgOrderValue: today.length > 0 ? Math.round(totalRevenue / today.length) : 0
      };
    });

    const recentOrders = computed(() => {
      return allOrders.value.slice(-5).reverse();
    });

    const topItems = computed(() => {
      const itemCount = {};
      allOrders.value.forEach(order => {
        order.items.forEach(item => {
          itemCount[item.name] = (itemCount[item.name] || 0) + item.qty;
        });
      });
      return Object.entries(itemCount)
        .map(([name, qty]) => ({ name, qty }))
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5);
    });

    const updateOrderStatus = (orderId, newStatus) => {
      const order = allOrders.value.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
      }
    };

    const cancelOrder = (orderId) => {
      const order = allOrders.value.find(o => o.id === orderId);
      if (order && confirm('Are you sure you want to cancel this order?')) {
        order.status = 'cancelled';
      }
    };

    const editMenuItem = (itemId, updatedData) => {
      const item = menuItems.value.find(i => i.id === itemId);
      if (item) {
        Object.assign(item, updatedData);
      }
    };

    const deleteMenuItem = (itemId) => {
      if (confirm('Are you sure you want to delete this item?')) {
        const index = menuItems.value.findIndex(i => i.id === itemId);
        if (index > -1) {
          menuItems.value.splice(index, 1);
        }
      }
    };

    const addMenuItem = (newItem) => {
      const newId = Math.max(...menuItems.value.map(i => i.id || 0), 0) + 1;
      menuItems.value.push({
        ...newItem,
        id: newId
      });
    };

    const saveSettings = (settings) => {
      console.log('Settings saved:', settings);
      alert('Settings saved successfully!');
    };

    const handleLogin = (credentials) => {
      console.log('Login attempt with email:', credentials.email);
      isLoggedIn.value = true;
    };

    const handleAdminLogin = (adminCredentials) => {
      console.log('Admin login with email:', adminCredentials.email);
      // Store admin auth in localStorage so React can read it
      localStorage.setItem('adminAuth', JSON.stringify({
        email: adminCredentials.email,
        role: 'admin',
        loginTime: adminCredentials.loginTime
      }))
      isAdminLoggedIn.value = true;
    };

    const handleLogout = () => {
      isLoggedIn.value = false;
      isAdminLoggedIn.value = false;
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('userAuth');
      console.log('User logged out');
    };

    const handleAdminLogout = () => {
      isAdminLoggedIn.value = false;
      localStorage.removeItem('adminAuth');
      console.log('Admin logged out');
    };

    return {
      isLoggedIn,
      isAdminLoggedIn,
      activeMenu,
      sidebarOpen,
      menuItems,
      allOrders,
      dashboardStats,
      recentOrders,
      topItems,
      updateOrderStatus,
      cancelOrder,
      editMenuItem,
      deleteMenuItem,
      addMenuItem,
      saveSettings,
      handleLogin,
      handleAdminLogin,
      handleLogout,
      handleAdminLogout
    };
  }
}
</script>

<style scoped>
.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.App.admin-mode {
  height: 100vh;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.admin-layout {
  display: flex;
  flex: 1;
  position: relative;
  margin-top: 0;
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.admin-content.sidebar-open {
  margin-left: 250px;
}
</style>
