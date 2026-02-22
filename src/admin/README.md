# Admin Dashboard Setup Guide

## Overview
This is a React-based admin dashboard for the UpSmart Canteen system. The admin can:
- Log in with admin credentials
- Create vendor accounts
- Manage user lists
- View dashboard analytics

## Features

### 1. Admin Login
- Email validation (emails containing "admin" are recognized as admin accounts)
- Password authentication
- Session persistence using localStorage

### 2. Dashboard Overview
- Total vendors count
- Total users count
- Active orders count
- Revenue statistics
- Quick action buttons

### 3. Vendor Management
- Create new vendor accounts
- Set vendor details (name, email, phone, address)
- Set vendor credentials (password)
- View existing vendors list
- Edit vendor information
- Delete vendors
- Toggle vendor status (Active/Inactive)

### 4. User Management
- View all users in the system
- Search users by name or email
- Filter users by role (Student, Staff, Faculty)
- View detailed user information
- Change user status (Active/Inactive/Suspended)
- Delete users

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install React and all required dependencies.

### 2. Run the Development Server
```bash
npm run dev
```

The app will start on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Usage

### Accessing the Admin Dashboard

1. Navigate to the admin dashboard (you can set this as your main route)
2. Log in with admin credentials:
   - **Email**: any email containing "admin" (e.g., `admin@upangmail.com`)
   - **Password**: any password (currently uses mock authentication)

### Creating a Vendor

1. Click "Create Vendor" in the sidebar
2. Fill in the vendor details:
   - Vendor Name
   - Email Address
   - Phone Number
   - Address
   - Password & Confirm Password
3. Click "Create Vendor" to submit

### Managing Users

1. Click "User List" in the sidebar
2. Use the search bar to find users by name or email
3. Filter by role using the dropdown
4. Click "View" to see detailed user information
5. Change user status using the status dropdown
6. Delete users using the "Delete" button

## Project Structure

```
src/admin/
├── AdminApp.jsx              # Main React app component
├── components/
│   ├── AdminLogin.jsx        # Login screen
│   ├── AdminDashboard.jsx    # Main dashboard
│   ├── AdminHeader.jsx       # Top navigation
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── VendorCreation.jsx    # Vendor management
│   └── UserList.jsx          # User management
├── styles/
│   └── admin.css             # All styling
└── README.md                 # This file
```

## Authentication

Currently, the admin system uses mock authentication. To integrate with a real authentication system:

### Update AdminLogin.jsx
```javascript
// Replace the mock authentication logic with your API call
const response = await fetch('/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const data = await response.json()
if (data.success) {
  onLogin(data.admin)
}
```

### Update API Endpoints

Replace the TODO comments in the following files with real API endpoints:
- **VendorCreation.jsx**: Line 45 - Create vendor endpoint
- **UserList.jsx**: Initial state - Fetch users endpoint

## API Integration Examples

### Vendor Creation
```javascript
// VendorCreation.jsx - Replace mock with real API
const response = await fetch('/api/vendors/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Fetch Users
```javascript
// UserList.jsx - Replace initial state with API call
useEffect(() => {
  const fetchUsers = async () => {
    const response = await fetch('/api/users/list')
    const data = await response.json()
    setUsers(data)
  }
  fetchUsers()
}, [])
```

## Styling

The admin dashboard uses a custom CSS system with CSS variables for easy theming. Update colors in `admin.css`:

```css
:root {
  --admin-primary: #4F46E5;      /* Main color */
  --admin-secondary: #10B981;    /* Success color */
  --admin-danger: #EF4444;       /* Error color */
  --admin-warning: #F59E0B;      /* Warning color */
  /* ... more variables */
}
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Data is stored in component state (not persisted to backend)
- For production, integrate with a real backend API
- Implement proper role-based access control (RBAC)
- Add proper error handling and validation
- Use a state management solution (Redux, Zustand) for large-scale apps
- Implement proper authentication and JWT tokens

## Future Enhancements

- [ ] Real backend API integration
- [ ] Advanced user permissions
- [ ] Vendor analytics
- [ ] User activity logs
- [ ] Export data to CSV/Excel
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Audit trail
