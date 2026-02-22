import React, { useState } from 'react'
import { useAdminAuth } from '../AdminApp'
import Sidebar from './Sidebar'
import VendorCreation from './VendorCreation'
import UserList from './UserList'
import AdminHeader from './AdminHeader'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const { adminUser, handleAdminLogout } = useAdminAuth()

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'vendors':
        return <VendorCreation />
      case 'users':
        return <UserList />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="admin-dashboard-container">
      <AdminHeader 
        adminUser={adminUser} 
        onLogout={handleAdminLogout}
      />
      
      <div className="admin-main-content">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <div className="admin-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function DashboardOverview() {
  const [dashboardStats] = useState({
    totalVendors: 12,
    totalUsers: 245,
    activeOrders: 38,
    revenue: '$2,450.00'
  })

  return (
    <div className="admin-dashboard-overview">
      <h2 className="admin-section-title">Dashboard Overview</h2>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Total Vendors</p>
            <p className="admin-stat-value">{dashboardStats.totalVendors}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">👨‍👩‍👧‍👦</div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Total Users</p>
            <p className="admin-stat-value">{dashboardStats.totalUsers}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">📦</div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Active Orders</p>
            <p className="admin-stat-value">{dashboardStats.activeOrders}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">💰</div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Total Revenue</p>
            <p className="admin-stat-value">{dashboardStats.revenue}</p>
          </div>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h3>Quick Actions</h3>
        <div className="admin-action-buttons">
          <button className="admin-action-btn">Generate Report</button>
          <button className="admin-action-btn">View Analytics</button>
          <button className="admin-action-btn">System Settings</button>
        </div>
      </div>
    </div>
  )
}
