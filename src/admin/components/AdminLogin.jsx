import React, { useState } from 'react'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email || !password) {
        setErrorMessage('Please enter both email and password')
        setIsLoading(false)
        return
      }

      // Admin account credentials
      const ADMIN_EMAIL = 'admin@upang.com'
      const ADMIN_PASSWORD = '12345'

      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        onLogin({
          email: email,
          role: 'admin',
          loginTime: new Date().toISOString()
        })
      } else if (email.toLowerCase() === ADMIN_EMAIL) {
        setErrorMessage('Incorrect password')
      } else {
        setErrorMessage('Only admin accounts can access this dashboard')
      }
    } catch (error) {
      setErrorMessage('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-logo-circle">
            <span className="admin-logo-icon">👨‍💼</span>
          </div>
          <h1 className="admin-login-title">Admin Dashboard</h1>
          <p className="admin-login-subtitle">UpSmart Canteen Management</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email" className="admin-form-label">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-form-input"
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password" className="admin-form-label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-form-input"
              placeholder="Enter password"
              required
            />
          </div>

          {errorMessage && (
            <p className="admin-error-message">{errorMessage}</p>
          )}

          <button type="submit" className="admin-login-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in as Admin'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p className="admin-footer-text">© 2026 UpSmart Canteen. All rights reserved.</p>
          <p className="admin-demo-note">Admin Credentials - Email: admin@upang.com | Password: 12345</p>
        </div>
      </div>

      <div className="admin-background-decoration"></div>
    </div>
  )
}
