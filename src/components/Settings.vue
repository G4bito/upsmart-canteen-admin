<template>
  <section class="settings-section">
    <div class="settings-container">
      <h2 class="section-title">SETTINGS & CONFIGURATION</h2>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'Settings',
  emits: ['save-settings']
}
</script>

<style scoped>
.settings-section {
  flex: 1;
  padding: 40px;
  background: var(--cream);
  overflow-y: auto;
}

.settings-container {
  width: 100%;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 48px;
  color: var(--upang-green);
  letter-spacing: -2px;
  margin-bottom: 32px;
  border-bottom: 4px solid var(--upang-green);
  padding-bottom: 16px;
}

@media (max-width: 768px) {
  .settings-section {
    padding: 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }
}
</style>
