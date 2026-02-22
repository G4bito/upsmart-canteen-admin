import React from 'react'

export default function Sidebar({ activeSection, onSectionChange }) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'vendors', label: 'Create Vendor', icon: '➕' },
    { id: 'users', label: 'User List', icon: '👥' }
  ]

  return (
    <aside className="admin-sidebar">
      <nav className="admin-nav">
        <ul className="admin-nav-list">
          {sidebarItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`admin-nav-button ${activeSection === item.id ? 'active' : ''}`}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar-footer">
        <p className="admin-version">v1.0.0</p>
      </div>
    </aside>
  )
}
