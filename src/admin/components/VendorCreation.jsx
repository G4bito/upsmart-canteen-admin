import React, { useState } from 'react'

export default function VendorCreation() {
  const [vendors, setVendors] = useState([])

  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showForm, setShowForm] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      // Validation
      if (!formData.vendorName || !formData.email || !formData.password) {
        setErrorMessage('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match')
        setIsSubmitting(false)
        return
      }

      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters')
        setIsSubmitting(false)
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Replace with actual API endpoint
      const newVendor = {
        id: vendors.length + 1,
        name: formData.vendorName,
        email: formData.email,
        status: 'Active',
        createdAt: new Date().toISOString()
      }

      setVendors([...vendors, newVendor])
      setSuccessMessage(`Vendor "${formData.vendorName}" created successfully!`)
      
      // Reset form
      setFormData({
        vendorName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      setShowForm(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrorMessage('Failed to create vendor. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-vendor-section">
      <div className="admin-section-header">
        <h2 className="admin-section-title">Vendor Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="admin-btn-primary"
        >
          {showForm ? 'Cancel' : '+ Create New Vendor'}
        </button>
      </div>

      {successMessage && (
        <div className="admin-success-message">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="admin-error-message">{errorMessage}</div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-vendor-form">
          <h3>Create New Vendor Account</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="vendorName">Vendor Name *</label>
              <input
                id="vendorName"
                type="text"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                placeholder="Enter vendor name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Vendor'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-vendors-list">
        <h3>Existing Vendors</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>
                  <span className={`admin-status-badge ${vendor.status.toLowerCase()}`}>
                    {vendor.status}
                  </span>
                </td>
                <td>
                  <button className="admin-table-btn-edit">Edit</button>
                  <button className="admin-table-btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
