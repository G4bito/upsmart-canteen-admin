import React, { useState, createContext, useContext } from 'react'
import AdminDashboard from './components/AdminDashboard'
import './styles/admin.css'

// Create Auth Context
export const AdminAuthContext = createContext()

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}

export default function AdminApp({ onLogout }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  const handleAdminLogin = (adminData) => {
    setAdminUser(adminData)
    setIsAuthenticated(true)
    // Store in localStorage for session persistence
    localStorage.setItem('adminAuth', JSON.stringify(adminData))
  }

  const handleAdminLogout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    localStorage.removeItem('adminAuth')
    // Call the Vue parent component's logout handler to redirect to Login.vue
    if (onLogout) {
      onLogout()
    }
  }

  // Check for existing auth on mount
  React.useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth')
    if (storedAuth) {
      try {
        const adminData = JSON.parse(storedAuth)
        setAdminUser(adminData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to restore auth:', error)
        localStorage.removeItem('adminAuth')
      }
    }
  }, [])

  const authContextValue = {
    isAuthenticated,
    adminUser,
    handleAdminLogin,
    handleAdminLogout
  }

  return (
    <AdminAuthContext.Provider value={authContextValue}>
      <AdminDashboard />
    </AdminAuthContext.Provider>
  )
}
