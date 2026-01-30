<template>
  <div class="top-bar">
    <button class="burger-menu" @click="$emit('toggle-sidebar')" title="Toggle sidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="top-bar-content">
      PHINMA EDUCATION • PARTIA VIRTUS SCIENTIA •
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  emits: ['toggle-sidebar']
}
</script>

<style scoped>
.top-bar {
  background: #1a3308;
  color: #C8A961;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.top-bar-content {
  flex: 1;
  text-align: center;
}

.burger-menu {
  width: 44px;
  height: 44px;
  background: #C8A961;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin: 0;
  transition: all 0.2s;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

.burger-menu:hover {
  background: #d4a856;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}

.burger-menu:active {
  transform: scale(0.95);
}

.burger-menu span {
  width: 26px;
  height: 3px;
  background: #1a3308;
  border-radius: 2px;
  display: block;
}
</style>
