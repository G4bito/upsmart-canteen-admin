import React, { useState } from 'react'

export default function UserList() {
  const [users, setUsers] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
      setSelectedUser(null)
    }
  }

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  return (
    <div className="admin-users-section">
      <div className="admin-section-header">
        <h2 className="admin-section-title">User Management</h2>
        <div className="admin-user-stats">
          <span className="admin-stat-badge">Total: {users.length}</span>
          <span className="admin-stat-badge active">
            Active: {users.filter(u => u.status === 'Active').length}
          </span>
        </div>
      </div>

      <div className="admin-users-filters">
        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>


      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dateJoined).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className={`admin-status-select ${user.status.toLowerCase()}`}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="admin-table-btn-view"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="admin-table-btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="admin-no-results">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="admin-user-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="admin-user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="admin-modal-close">
                ✕
              </button>
            </div>
            <div className="admin-modal-content">
              <div className="admin-modal-field">
                <label>Name:</label>
                <p>{selectedUser.name}</p>
              </div>
              <div className="admin-modal-field">
                <label>Email:</label>
                <p>{selectedUser.email}</p>
              </div>
              <div className="admin-modal-field">
                <label>Date Joined:</label>
                <p>{new Date(selectedUser.dateJoined).toLocaleDateString()}</p>
              </div>
              <div className="admin-modal-field">
                <label>Status:</label>
                <p>{selectedUser.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
