<template>
  <section class="analytics-section">
    <div class="analytics-container">
      <h2 class="section-title">ANALYTICS & REPORTS</h2>
      
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Analytics',
  props: {
    stats: Object
  },
  setup(props) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const formatHour = (hour) => {
      const hourNum = 10 + hour;
      return hourNum > 12 ? (hourNum - 12) + 'PM' : hourNum + 'AM';
    };

    const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const getPaymentColor = (method) => {
      const colors = {
        cash: '#2D5016',
        gcash: '#4CAF50',
        bank: '#2196F3'
      };
      return colors[method] || '#666';
    };

    const formatDepartmentLabel = (dept) => {
      const labels = {
        CAHS: 'CAHS',
        CAS: 'CAS',
        CITE: 'CITE',
        CEA: 'CEA',
        others: 'Others'
      };
      return labels[dept] || dept;
    };

    const totalOrders = computed(() => props.stats.dailyOrders.reduce((a, b) => a + b, 0));
    const totalRevenue = computed(() => props.stats.dailyRevenue.reduce((a, b) => a + b, 0));
    const avgOrderValue = computed(() => Math.round(totalRevenue.value / totalOrders.value));
    const bestDay = computed(() => {
      const maxIndex = props.stats.dailyRevenue.indexOf(Math.max(...props.stats.dailyRevenue));
      return daysOfWeek[maxIndex];
    });

    return {
      daysOfWeek,
      formatHour,
      capitalizeFirst,
      getPaymentColor,
      formatDepartmentLabel,
      totalOrders,
      totalRevenue,
      avgOrderValue,
      bestDay
    };
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

.analytics-container {
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

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.chart-card,
.summary-card {
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0;
}

.chart-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 19px;
  color: var(--upang-green);
  margin: 0 0 20px 0;
  letter-spacing: -0.5px;
}

.chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: 8px;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
}

.bar {
  flex: 1;
  width: 100%;
  background: linear-gradient(180deg, var(--upang-green) 0%, var(--upang-gold) 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
  min-height: 20px;
}

.bar:hover {
  filter: brightness(1.2);
}

.bar-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--mid-gray);
  margin-top: 8px;
}

.bar-value {
  font-size: 11px;
  color: var(--charcoal);
  font-weight: 700;
}

.revenue-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.revenue-row {
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  align-items: center;
  gap: 12px;
}

.revenue-day {
  font-size: 12px;
  font-weight: 600;
  color: var(--mid-gray);
}

.revenue-bar-container {
  height: 24px;
  background: var(--cream);
  border-radius: 4px;
  overflow: hidden;
}

.revenue-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--upang-green) 0%, var(--upang-gold) 100%);
  border-radius: 4px;
  transition: all 0.3s;
}

.revenue-amount {
  font-size: 13px;
  font-weight: 700;
  color: var(--charcoal);
}

.hours-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 150px;
  gap: 4px;
}

.hour-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.hour-bar {
  width: 100%;
  background: var(--upang-gold);
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}

.hour-bar:hover {
  background: var(--upang-green);
}

.hour-label {
  font-size: 10px;
  color: var(--mid-gray);
  margin-top: 6px;
  font-weight: 600;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.payment-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--charcoal);
}

.payment-percent {
  font-size: 13px;
  font-weight: 700;
  color: var(--upang-green);
}

.progress-bar {
  height: 20px;
  background: var(--cream);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: all 0.3s;
}

.year-levels {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.year-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.year-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--charcoal);
}

.year-count {
  font-size: 12px;
  color: var(--mid-gray);
}

.year-bar {
  height: 16px;
  background: var(--cream);
  border-radius: 8px;
  overflow: hidden;
}

.year-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--upang-gold) 0%, var(--upang-green) 100%);
  border-radius: 8px;
}

.summary-card {
  display: flex;
  flex-direction: column;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex: 1;
}

.summary-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: var(--cream);
  border-radius: 6px;
  text-align: center;
  border-left: 4px solid var(--upang-gold);
}

.summary-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--mid-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.summary-value {
  font-family: 'Archivo Black', sans-serif;
  font-size: 24px;
  color: var(--upang-green);
}

@media (max-width: 1200px) {
  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .summary-card {
    grid-column: 1;
  }

  .summary-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .analytics-section {
    padding: 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .chart {
    height: 150px;
  }

  .summary-stats {
    grid-template-columns: 1fr;
  }
}
</style>
