/**
 * Quick Start Guide for Admin Dashboard
 * 
 * To test the Admin Dashboard immediately:
 * 
 * 1. Replace your current main.jsx with the AdminApp
 * 2. Or add it as a route in your router configuration
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './admin/AdminApp'

// Simple entry point - replace this or integrate with your existing app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
)
