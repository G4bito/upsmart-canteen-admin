<template>
  <aside :class="['sidebar', { 'sidebar-closed': !isOpen }]">
    <nav class="sidebar-nav">
      <div class="nav-group">
        <h3 class="nav-group-title">MENU</h3>
        <a 
          href="#" 
          :class="['nav-item', { active: activeMenu === 'dashboard' }]"
          @click.prevent="$emit('change-menu', 'dashboard')"
        >
          <span class="nav-emoji" aria-hidden="true">🏠</span> Dashboard
        </a>
        <a 
          href="#" 
          :class="['nav-item', { active: activeMenu === 'menu' }]"
          @click.prevent="$emit('change-menu', 'menu')"
        >
          <span class="nav-emoji" aria-hidden="true">🍽️</span> Menu Management
        </a>
        <a 
          href="#" 
          :class="['nav-item', { active: activeMenu === 'orders' }]"
          @click.prevent="$emit('change-menu', 'orders')"
        >
          <span class="nav-emoji" aria-hidden="true">🛒</span> Orders
        </a>
      </div>

      <div class="nav-group">
        <h3 class="nav-group-title">ANALYTICS</h3>
        <a 
          href="#" 
          :class="['nav-item', { active: activeMenu === 'analytics' }]"
          @click.prevent="$emit('change-menu', 'analytics')"
        >
          <span class="nav-emoji" aria-hidden="true">📈</span> Analytics
        </a>
      </div>

      <div class="nav-group">
        <h3 class="nav-group-title">SETTINGS</h3>
        <a 
          href="#" 
          :class="['nav-item', { active: activeMenu === 'settings' }]"
          @click.prevent="$emit('change-menu', 'settings')"
        >
          <span class="nav-emoji" aria-hidden="true">⚙️</span> Settings
        </a>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    activeMenu: String,
    isOpen: Boolean
  },
  emits: ['change-menu']
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: var(--upang-dark-green);
  padding: 24px 0;
  border-right: 3px solid var(--upang-gold);
  height: auto;
  position: fixed;
  left: 0;
  top: 48px;
  bottom: 0;
  z-index: 999;
  transform: translateX(0);
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.sidebar.sidebar-closed {
  transform: translateX(-100%);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
}

.nav-group {
  padding: 0 16px;
}

.nav-group-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 12px;
  color: var(--upang-gold);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 12px;
  padding-left: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  margin-bottom: 8px;
}

.nav-emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 20px;
  line-height: 1;
  flex-shrink: 0;
}

.nav-item:hover {
  color: white;
  background: rgba(200, 169, 97, 0.2);
  border-left-color: var(--upang-gold);
  padding-left: 20px;
}

.nav-item.active {
  color: var(--upang-gold);
  background: rgba(200, 169, 97, 0.25);
  border-left-color: var(--upang-gold);
  font-weight: 600;
}

.nav-item.active .nav-emoji {
  filter: brightness(1.1);
}

.nav-item.active {
  color: var(--upang-gold);
  background: rgba(200, 169, 97, 0.15);
  border-left-color: var(--upang-gold);
  font-weight: 600;
}
</style>
