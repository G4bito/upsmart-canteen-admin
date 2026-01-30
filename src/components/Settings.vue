<template>
  <section class="settings-section">
    <div class="settings-container">
      <h2 class="section-title">SETTINGS & CONFIGURATION</h2>
      
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Settings',
  emits: ['save-settings'],
  setup(props, { emit }) {
    const settings = ref({
      name: 'UPSmart Canteen',
      location: 'PHINMA University of Pangasinan',
      phone: '+63 975 123 4567',
      openingTime: '10:00',
      closingTime: '16:00',
      peakHoursStart: '11:30',
      peakHoursEnd: '13:30',
      paymentMethods: {
        cash: true,
        gcash: true,
        bank: true,
        studentAccount: true
      },
      notifications: {
        email: true,
        sms: false,
        lowStock: true,
        dailyReports: true
      },
      lowStockLevel: 20,
      minOrderValue: 0,
      maxDailyOrders: 0,
      adminName: 'Admin User',
      adminEmail: 'admin@upsmart.edu'
    });

    const saveSetting = (category) => {
    
    };

    const changePassword = () => {
    
    };

    const resetDailyData = () => {
 
    };

    const backupData = () => {
   
    };

    const clearAllData = () => {
   
    };

    return {
      settings,
      saveSetting,
      changePassword,
      resetDailyData,
      backupData,
      clearAllData
    };
  }
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

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.settings-card {
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0;
}

.settings-card.danger-card {
  border-color: #F44336;
}

.card-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 19px;
  color: var(--upang-green);
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.danger-card .card-title {
  color: #F44336;
}

.danger-warning {
  font-size: 13px;
  color: #F44336;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--charcoal);
  font-size: 13px;
}

.setting-item input {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--charcoal);
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
}

.setting-item input:focus {
  outline: none;
  border-color: var(--upang-green);
  background: rgba(45, 80, 22, 0.05);
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--cream);
  font-size: 13px;
}

.toggle-item label {
  margin: 0;
  font-weight: 600;
  color: var(--charcoal);
}

.toggle-item input[type="checkbox"] {
  width: 40px;
  height: 20px;
  cursor: pointer;
}

.toggle-item:last-child {
  border-bottom: none;
}

.static-item {
  pointer-events: none;
}

.static-value {
  display: block;
  padding: 8px;
  background: var(--cream);
  border-radius: 4px;
  color: var(--charcoal);
  font-weight: 500;
}

.static-notice {
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(45, 80, 22, 0.1);
  border-left: 3px solid var(--upang-gold);
  font-size: 12px;
  color: var(--mid-gray);
  border-radius: 2px;
}

.save-btn {
  width: 100%;
  background: var(--upang-green);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
  font-family: 'Work Sans', sans-serif;
}

.save-btn:hover {
  background: var(--upang-dark-green);
  transform: translateY(-2px);
}

.change-password-btn {
  width: 100%;
  background: var(--upang-gold);
  color: var(--upang-dark-green);
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
  margin-bottom: 8px;
  font-family: 'Work Sans', sans-serif;
}

.change-password-btn:hover {
  background: rgba(200, 169, 97, 0.8);
}

.danger-btn {
  width: 100%;
  background: transparent;
  color: #F44336;
  border: 2px solid #F44336;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  font-family: 'Work Sans', sans-serif;
}

.danger-btn:hover {
  background: rgba(244, 67, 54, 0.1);
}

.danger-btn.danger-delete:hover {
  background: #F44336;
  color: white;
}

@media (max-width: 1200px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .settings-section {
    padding: 20px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
