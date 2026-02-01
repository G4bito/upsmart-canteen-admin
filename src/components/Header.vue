<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-area">
        <img src="/images/UPANGLOGO.png" alt="PHINMA UPang Logo" class="seal-logo" />
        <div class="brand">
          UPSMART CANTEEN
          <span>ADMIN DASHBOARD</span>
        </div>
      </div>

      <nav class="nav-links">
        <a href="#" class="active">DASHBOARD</a>
      </nav>

      <div class="user-section">
        <div class="profile-section">
          <div class="profile-circle">👤</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    return {};
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

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 2px solid var(--upang-green);
  border-radius: 4px;
  min-width: 180px;
  margin-top: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.profile-menu.show {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.profile-menu::before {
  content: '';
  position: absolute;
  top: -12px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 12px solid var(--upang-green);
}

.profile-menu::after {
  content: '';
  position: absolute;
  top: -8px;
  right: 22px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 0px solid transparent;
  border-bottom: 10px solid white;
}

.profile-menu a {
  display: block;
  padding: 12px 16px;
  color: var(--charcoal);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.profile-menu a:hover {
  background: var(--cream);
  color: var(--upang-green);
  padding-left: 20px;
}

.profile-menu a:last-child {
  border-bottom: none;
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
