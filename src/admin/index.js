/**
 * Admin App Entry Point
 * 
 * This file shows how to integrate the Admin Dashboard into your main application.
 * 
 * Usage Example 1: Standalone Admin Route
 * ========================================
 * If using React Router, add this route:
 * 
 * import AdminApp from './admin/AdminApp'
 * 
 * <Route path="/admin" element={<AdminApp />} />
 * 
 * Usage Example 2: Direct Import
 * ========================================
 * import AdminApp from './admin/AdminApp'
 * 
 * function App() {
 *   return <AdminApp />
 * }
 * 
 * export default App
 * 
 * Usage Example 3: Conditional Rendering Based on User Role
 * ==========================================================
 * import AdminApp from './admin/AdminApp'
 * import MainApp from './MainApp'
 * 
 * function App({ userRole }) {
 *   if (userRole === 'admin') {
 *     return <AdminApp />
 *   }
 *   return <MainApp />
 * }
 * 
 * export default App
 */

// Export the Admin App for use in your main application
export { default as AdminApp } from './AdminApp'
export { default as AdminLogin } from './components/AdminLogin'
export { default as AdminDashboard } from './components/AdminDashboard'
export { default as VendorCreation } from './components/VendorCreation'
export { default as UserList } from './components/UserList'
export { useAdminAuth } from './AdminApp'
