import React from 'react'

export default function AdminHeader({ adminUser, onLogout }) {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-header-logo">UpSmart Admin</h1>
      </div>

      <div className="admin-header-right">
        <div className="admin-user-info">
          <span className="admin-user-icon">👤</span>
          <div className="admin-user-details">
            <p className="admin-user-label">Admin</p>
            <p className="admin-user-email">{adminUser?.email}</p>
          </div>
        </div>

        <button onClick={onLogout} className="admin-logout-btn">
          Sign Out
        </button>
      </div>
    </header>
  )
}
