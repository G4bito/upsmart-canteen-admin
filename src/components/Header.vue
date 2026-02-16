<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-area">
        <img src="/images/UPANGLOGO.png" alt="PHINMA UPang Logo" class="seal-logo" />
        <div class="brand">
          UPSMART CANTEEN
          <span>VENDOR DASHBOARD</span>
        </div>
      </div>

      <nav class="nav-links">
        <a class="active">DASHBOARD</a>
      </nav>

      <div class="user-section">
        <div class="profile-section">
          <div class="profile-circle" @click="toggleDropdown">👤</div>
          <div v-if="isDropdownOpen" class="profile-dropdown">
            <div class="dropdown-item" @click="toggleDropdown">Edit Profile</div>
            <div class="dropdown-item" @click="toggleDropdown">Settings</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item logout-btn" @click="handleLogout">Logout</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  emits: ['logout'],
  setup(props, { emit }) {
    const isDropdownOpen = ref(false)

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const handleLogout = () => {
      isDropdownOpen.value = false
      emit('logout')
    }

    return {
      isDropdownOpen,
      toggleDropdown,
      handleLogout
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--off-white);
  border-bottom: 4px solid var(--upang-green);
  position: static;
  z-index: 100;
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px 40px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 32px;
}

.logo-area {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 19px;
}

.seal-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.brand {
  margin-top: 18px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 29px;
  color: var(--upang-green);
  line-height: 1;
  letter-spacing: -1px;
}

.brand span {
  display: block;
  font-size: 10px;
  color: var(--upang-gold);
  letter-spacing: 2px;
  margin-top: 5px;
  font-weight: 800;
}

.nav-links {
  margin-top: 18px;
  display: flex;
  gap: 40px;
  justify-self: center;
}

.nav-links a {
  color: var(--charcoal);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--upang-green);
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--upang-gold);
}

.user-section {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 24px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}


.profile-section {
  position: relative;
}

.profile-circle {
  background: var(--upang-green);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  border: 2px solid var(--upang-gold);
}

.profile-circle:hover {
  transform: scale(1.05);
  background: var(--upang-dark-green);
}

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--off-white);
  border: none;
  border-radius: 12px;
  min-width: 200px;
  margin-top: 16px;
  box-shadow: 0 8px 24px rgba(45, 80, 22, 0.12);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.profile-dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 16px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid var(--off-white);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 13px 16px;
  color: var(--charcoal);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

.dropdown-item:first-child {
  border-radius: 12px 12px 0 0;
}

.dropdown-item:hover {
  background: rgba(45, 80, 22, 0.06);
  color: var(--upang-green);
  padding-left: 20px;
}

.logout-btn {
  color: #d32f2f;
  font-weight: 600;
  border-radius: 0 0 12px 12px;
}

.logout-btn:hover {
  background: rgba(211, 47, 47, 0.08);
  color: #c62828;
  padding-left: 20px;
}

.dropdown-divider {
  margin: 6px 12px;
  height: 1px;
  background: rgba(45, 80, 22, 0.1);
  border: none;
}

@media (max-width: 768px) {
  .header-content {
    grid-template-columns: auto 1fr;
    gap: 16px;
    padding: 16px 20px;
  }

  .nav-links {
    display: none;
  }

  .user-section {
    gap: 12px;
  }

  .status-indicator {
    display: none;
  }
  
}
</style>
