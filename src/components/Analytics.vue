<template>
  <section class="analytics-section">
    <div class="analytics-container">
      <h2 class="section-title">ANALYTICS & REPORTS</h2>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'Analytics',
  props: {
    stats: Object
  }
}
</script>

<style scoped>
.analytics-section {
  flex: 1;
  padding: 40px;
  background: var(--cream);
  overflow-y: auto;
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
  .analytics-section {
    padding: 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }
}
</style>
